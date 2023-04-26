const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'files')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        let mimeType = file.mimetype.split('/');
        const extension = mimeType[mimeType.length - 1];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('file');