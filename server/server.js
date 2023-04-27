const express = require ("express");
const cors = require('cors');
const dataBase = require("./config/mysql");
const http = require('http');
const {Server} = require("socket.io");
const path = require('path');

const userRoute = require('./routes/userRoutes');
const chatRoute = require("./routes/chatRoutes");

const app = express();
app.use(cors());
app.use(express.json());

/* app.use((req, res) => {
    res.end("Hello");
}); */

app.use("/files", express.static(path.join(__dirname, "files")));

app.get("/user", (req, res) => {
    res.end("User route");
});
app.use("/chat", chatRoute); 
app.use("/user", userRoute);

// ****** Socket implementation ****
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`); 

    socket.on("joinConversation", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined the conversation: ${data}`)
    });
    socket.on("send_message", (data)=>{
        console.log("Message sending ... ", data);
        if (data?.room) {
            console.log("Message 2 ...");
            const insertMessageRequest = "INSERT INTO `message`(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
            // const convId = result[0].id_conv;
            dataBase.query(insertMessageRequest, [data.text, data.author, data?.room], (error, result) => {
                if(error) throw error;
                socket.emit("receive id", data.room);
                console.log("Room and Data : ", data.room, data );
                const idConv = data?.room
                socket.to(data?.room).emit("receive_message", idConv);
                socket.to(data?.room).emit("receive_message_chat_inter", {idConv:data?.room})

                    /* let getAllConversationMessages = "SELECT * FROM message WHERE id_conversation = ?";
                    dataBase.query(getAllConversationMessages, [data.room], (error, result) => {
                        console.log("Data.room", data.room);
                    }); */
                })
        }else {
            let verifyConversationRequest = "SELECT * FROM conversation WHERE user_id_1 = ? AND user_id_2 = ? OR user_id_1 = ? AND user_id_2 = ?;"
            dataBase.query(verifyConversationRequest, [data.author, data.receiver, data.receiver, data.author], (error, result) => {
                if (result.length < 1) {
                    console.log("No room");
                    let insertConverstionRequest = "INSERT INTO `conversation`(`user_id_1`, `user_id_2`) VALUES (?, ?);";
                    dataBase.query(insertConverstionRequest, [data.author, data.receiver], (error, result) => {
                        if (error) throw error;
                        // console.log("Create conversation result: ", result);
                        const convId = result.insertId;
                        socket.emit("send_id", convId);
                        const insertMessageRequest = "INSERT INTO `message`(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
                        console.log(data);
                        dataBase.query(insertMessageRequest, [data.text, data.author, convId], (error, result) => {
                            if(error) throw error;
                            socket.to(convId).emit("receive_message", data)
                        })
                    })
                }else {
                    const convId = result[0].id_conv;
                    socket.emit("send_conversation_to_chat_inter", convId)
                    const insertMessageRequest = "INSERT INTO message(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
                    dataBase.query(insertMessageRequest, [data.text, data.author, convId], (error, result) => {
                        if(error) throw error;
                        socket.to(convId).emit("receive_message", {...data, idConv:convId})
                        socket.to(convId).emit("receive_message_chat_inter", {idConv:convId})
                    })
                }
            })
        }
        /* if (!data?.room) {
            console.log("No room");
            let insertConverstionRequest = "INSERT INTO `conversation`(`user_id_1`, `user_id_2`) VALUES (?, ?);";
            dataBase.query(insertConverstionRequest, [data.author, data.receiver], (error, result) => {
            if (error) throw error;
            // console.log("Create conversation result: ", result);
            const convId = result.insertId;
            socket.emit("send_id", convId)
            res.status(201).json({id_conv:convId});
            // console.log('ConvId inexistant', convId);
            const insertMessageRequest = "INSERT INTO `message`(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
            console.log(data);
            dataBase.query(insertMessageRequest, [data.text, data.author, convId], (error, result) => {
            if(error) throw error;
            socket.to(convId).emit("receive_message", data)
        })
    })
        } */
        /* const insertMessageRequest = "INSERT INTO `message`(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
        console.log(data);
        dataBase.query(insertMessageRequest, [data.text, data.author, data.room], (error, result) => {
            if(error) throw error;
            socket.to(data.room).emit("receive_message", data)
        }) */
    });
    /* socket.on("send_message", (data)=>{
        const insertMessageRequest = "INSERT INTO `message`(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
        console.log(data);
        dataBase.query(insertMessageRequest, [data.text, data.author, data.room], (error, result) => {
            if(error) throw error;
            socket.to(data.room).emit("receive_message", data)
        })
    }); */
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Serveur lancé");
});