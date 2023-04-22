const express = require ("express");
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const chatRoute = require("./routes/chatRoutes")


const app = express();

/* app.use((req, res) => {
    res.end("Hello");
}); */


app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
    res.end("User route");
});

app.use("/chat", chatRoute);
app.use("/user", userRoute);

app.listen(5000, () => {
    console.log("Serveur lancé");
});