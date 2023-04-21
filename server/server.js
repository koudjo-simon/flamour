const express = require ("express");
const cors = require('cors')


const app = express();

/* app.use((req, res) => {
    res.end("Hello");
}); */

app.use(cors());
app.use(express.json());

app.get("/user", (req, res) => {
    res.end("User route");
})

app.post("/chat", (req, res) => {
    console.log(req.body);
    console.log("Chat route");
})

app.listen(5000, () => {
    console.log("Serveur lancé");
});

