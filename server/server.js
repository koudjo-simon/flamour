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
    console.log(`User Connected: ${socket.id}`); 

    socket.on("joinConversation", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined the conversation: ${data}`)
    });
    socket.on("send_message", (data)=>{
        const insertMessageRequest = "INSERT INTO `message`(`text`, `message_sender`, `id_conversation`) VALUES (?, ?, ?)";
        console.log(data);
        dataBase.query(insertMessageRequest, [data.text, data.author, data.room], (error, result) => {
            if(error) throw error;
            socket.to(data.room).emit("receive_message", data)
        })
    });
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Serveur lancé");
});