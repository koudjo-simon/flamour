const dataBase = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
    const file = req.file;
    console.log("File ", file)
    let insertNewUserRequest = "INSERT INTO utilisateur(nom, prenom, email, pseudo, password, age, sexe, profession, pays, ville, photo_profil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const imageUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
    bcrypt.hash(req.body.mdp, 10, (error, hash) => {
        if (error) throw error
        console.log(hash); 
        dataBase.query(insertNewUserRequest, [
            req.body.nom,
            req.body.prenom,
            req.body.email,
            req.body.pseudo,
            hash,
            req.body.date,
            req.body.sexe,
            req.body.profession,
            req.body.pays,
            req.body.ville,
            imageUrl
        ], (error, result) =>{
            console.log("Exécution du serveur")
            if (error) throw error;
            res.status(201).json({
                message: "success"
            })
        });
    });
}

exports.login = (req, res) => {
    let selectUserRequest = "SELECT * from utilisateur WHERE pseudo = ?";
    dataBase.query(selectUserRequest, [req.body.pseudo], (error, result) => {
        if (error) throw error;
        if (result.length < 1){
            return res.status(401).json({
                message:"User not found"
            })
        }
        bcrypt.compare(req.body.mdp, result[0].password)
            .then((valid)=>{
                if (!valid) {
                    return res.status(401).json( 
                        {message:"Bad credentials"}
                    ).end();
                }
                let accessToken = jwt.sign(
                    {user_id: result[0].user_id},
                    "MY_TOKEN_SECRET",
                    {expiresIn:"1h"}
                );
                let userProfile = {
                    userId: result[0].user_id,
                    nom: result[0].nom,
                    prenom: result[0].prenom,
                    photo: result[0].photo_profil,
                    email: result[0].email,
                    pseudo: result[0].pseudo
                }
                console.log(accessToken);
                res.status(201).json({accessToken, userProfile})
            }).catch((error)=>{
                console.log(error);
            });
    });
}

exports.getAllUsers = (req, res) => {
    let selectAllUsersRequest = "SELECT * FROM utilisateur u WHERE NOT EXISTS (SELECT * FROM conversation c WHERE (c.user_id_1 = u.user_id AND c.user_id_2 = ?) OR (c.user_id_1 = ? AND c.user_id_2 = u.user_id)) AND u.user_id != ?;";
    dataBase.query(selectAllUsersRequest, [req.body.userId, req.body.userId, req.body.userId], (error, result) => {
        if (error) throw error;
        res.status(201).json({users:result}).end();
    })
}

/* exports.chat = (req, res) => {
    console.log(req.body);
    console.log("Chat route");
} */