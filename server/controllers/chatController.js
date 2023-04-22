const dataBase = require("../config/mysql")

exports.getUserChat = (req, res) => {
    let selectUserChatRequest = "SELECT * FROM conversation c JOIN message m ON c.id_conv = m.id_conversation WHERE c.user_id_1=? or c.user_id_2=?";
    dataBase.query(selectUserChatRequest, [req.body.user_id, req.body.user_id], (error, result)=>{
        if (error) throw error;
        console.log(result);
        res.status(201).json({conversation:result}).end();
    });
}