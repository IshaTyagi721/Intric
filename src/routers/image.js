const express = require('express')
const Image = require('../models/image')
const router = express.Router()
const Article = require('../models/article')
const multer = require('multer')


// var storage = multer.diskStorage({
//         destination: function(req,file,cb){
//                 cb(null,'./uploads')
//         },
//         filename: function(req,file,cb){
//                 cb(null,file.originalname)
//         }
// });

// const upload = multer({
//         storage: storage,
//         limits: {
//                 fileSize: 1000000
//         },
//         fileFilter: fileFilter
// }).single("demo_image")

// function fileFilter(req,res,cb){

//         const filetypes = /jpeg|jpg|png|gif/;

//         const extname = filetypes.test(path.extname(file.original).toLowerCase())
//         const mimetype = filetypes.test(file.mimetype)

//         if(mimetype && extname){
//                 return cb(null,true)
//         }
//         else{
//                 cb('Error: Images only!')
//         }
// }



const storage = multer.diskStorage({
        destination:function(req,file,cb){
                cb(null,'./uploads/');

        },
        filename: function(req,file,cb){

                cb(null,new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname );
        }

})


const fileFilter = (req,file,cb) =>{
        //accept or reject a file
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                cb(null,true)
        }
        else{
                cb(new Error('This file type is not supported. Please use .PNG or .JPEG files.'),false)
        }
}
const upload = multer(
        {
        storage: storage,
        limits:{
                fileSize: 1024*1024*5 
},
fileFilter: fileFilter
})

router.post('/articles/:id/image',upload.single('image'),async(req,res) =>{
        // console.log(req.file)

        const id = req.params.id;

        const image = new Image({
                //   text: req.body.comment,
                //   article: id
                     image: req.file.path,
                     article : id
               }) 
               try {
                await image.save()
                res.status(201).send(image)
            } catch (e) {
                res.status(500).send(e)
            }
})




module.exports = router 