const dataBase = require("../config/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
    let insertNewUserRequest = "INSERT INTO utilisateur(nom, prenom, email, pseudo, password, age, sexe, profession, pays, ville, photo_profil) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    bcrypt.hash(req.body.mdp, 10, (error, hash) => {
        if (error) throw Error(error)
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
            req.body.photo_profil,
        ], (error, result) =>{
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
                    {expiresIn:"10s"}
                );
                console.log(accessToken);
                res.status(201).json({accessToken})
            }).catch((error)=>{
                console.log(error);
            });
    });
}

/* exports.chat = (req, res) => {
    console.log(req.body);
    console.log("Chat route");
} */