const dataBase = require("../config/mysql")

exports.getUserChat = (req, res) => {
    let selectUserChatRequest = "SELECT * FROM conversation c JOIN utilisateur u ON c.id_conv = u.user_id where c.user_id_1 = ? or c.user_id_2 = ?;";
    dataBase.query(selectUserChatRequest, [req.body.user_id, req.body.user_id], (error, result)=>{
        if (error) throw error;
        console.log(result);
        res.status(201).json({conversation:result}).end();
    });
}

exports.getChatMessage = (req, res) => {
    let selectChatMessageRequest = "SELECT * FROM message WHERE message.id_conversation = ?;";
    dataBase.query(selectChatMessageRequest, [req.body.convId], (error, result)=>{
        if (error) throw error;
        console.log(result);
        res.status(201).json({messages:result}).end();
    });
}