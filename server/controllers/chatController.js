const dataBase = require("../config/mysql")

exports.getUserChat = (req, res) => {
    let selectUserChatRequest = "SELECT DISTINCT c.id_conv, u.nom , u.prenom FROM conversation c INNER JOIN message m ON m.id_conversation = c.id_conv INNER JOIN utilisateur u on u.user_id = IF(c.user_id_1 = ?, c.user_id_2, c.user_id_1) WHERE c.user_id_1 = ? OR c.user_id_2 = ? GROUP BY(c.id_conv);";
    dataBase.query(selectUserChatRequest, [req.body.user_id, req.body.user_id, req.body.user_id], (error, result)=>{
        if (error) throw error;
        // console.log("Get user chat : ", result);
        res.status(201).json({conversation:result}).end();
    });
}

exports.getChatMessage = (req, res) => {
    let selectChatMessageRequest = "SELECT * FROM message m JOIN utilisateur u ON u.user_id = m.message_sender WHERE id_conversation = ? ORDER BY(id_mes);";
    
    dataBase.query(selectChatMessageRequest, [req.body.convId], (error, result)=>{
        if (error) throw error;
        // console.log(result);
        res.status(201).json({messages:result}).end();
    });
}

exports.createConversation = (req, res) => {
    // let verifyConversationRequest = "SELECT * FROM conversation WHERE  user_id_1 = ? AND user_id_2 = ? OR user_id_1 = ? AND user_id_2 = ?";
    let insertConverstionRequest = "INSERT INTO `conversation`(`user_id_1`, `user_id_2`) VALUES (?, ?);";
    dataBase.query(insertConverstionRequest, [req.body.author, req.body.receiver], (error, result) => {
        if (error) throw error;
        // console.log("Create conversation result: ", result);
        const convId = result.insertId;
        res.status(201).json({id_conv:convId});
        // console.log('ConvId inexistant', convId);
    })
    /* dataBase.query(verifyConversationRequest, [req.body.author, req.body.receiver, req.body.receiver, req.body.author], (error, result) => {
        if(error) throw error;
        }) */
        /* let insertMessageRequest = "INSERT INTO `message`(`text`, `media`, `message_sender`, `id_conversation`) VALUES (?, ?, ?, ?)";
        dataBase.query(insertMessageRequest, [req.body.text, req.body?.media, req.body.author, convId], (error, result) => {
            if(error) throw error;
            res.status(201).json({conv_id:convId})
        }) *//* else {
            const convId = result[0].id_conv;
            let insertMessageRequest = "INSERT INTO `message`(`text`, `media`, `message_sender`, `id_conversation`) VALUES (?, ?, ?, ?)";
            dataBase.query(insertMessageRequest, [req.body.text, req.body?.media, req.body.author, convId], (error, result) => {
                if(error){
                    console.log('ConvId existant************************************************', convId);
                    throw error;
                }                    
                res.status(201).json({conv_id:convId})
            })
        } */
       
}
