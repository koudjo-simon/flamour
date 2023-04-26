const express = require("express");
const userCtrl = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const multer = require('../middleware/multer-config')
const path = require('path')
const router = express.Router();

/* const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../public/images/profiles')
    },
    filename: function (req, file, cb){
        const fileExtension = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension)
    }
});

const upload = multer({ storage,
    limits: function (req, file, cb) {
        // Filtre les fichiers pour n'accepter que les images
        if (!file.mimetype.startsWith('image/')) {
          cb(new Error('File type not supported'))
        } else {
          cb(null, true)
        }
      }
}); */

router.post("/signup", multer,  userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/getallusers", verifyToken, userCtrl.getAllUsers);

module.exports = router;