// const express = require('express');
// const multer = require('multer');
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: "./public/uploads",
//     filename: (req, file, callback) => {
//         let ext = path.extname(file.originalname);
//         callback(null, `${file.fieldname}-${Date.now()}${ext}`);
//     }
// });

// const imageFileFilter = (req, file, cb) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error("You can upload only image files!"), false);
//     }
//     cb(null, true);
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: imageFileFilter
// })

// const uploadRouter = express.Router();

// uploadRouter.route('/')
//     .post(upload.single('imageFile'), (req, res) => {
//         res.json(req.file);
//     });

// module.exports = uploadRouter;

const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const productstorage = multer.diskStorage({
    destination: "./public/products",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const userstorage = multer.diskStorage({
    destination: "./public/users",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});




const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

router.route('/')
    .post(upload.single('imageFile'), (req, res) => {
        res.json(req.file);
    });


    const uploadproducts = multer({
        storage: productstorage,
        fileFilter: imageFileFilter
    })
    
    
router.route('/product')
        .post(uploadproducts.single('imageFile'), (req, res) => {
            res.json(req.file);
        });   


    const uploadusers = multer({
        storage: userstorage,
        fileFilter: imageFileFilter
    })
    
    
router.route('/user')
        .post(uploadusers.single('imageFile'), (req, res) => {
            res.json(req.file);
        });   


module.exports = router;