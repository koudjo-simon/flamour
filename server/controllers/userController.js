const dataBase = require("../config/mysql");
const bcrypt = require("bcrypt");

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
    res.json({...req.body});
}

/* exports.chat = (req, res) => {
    console.log(req.body);
    console.log("Chat route");
} */