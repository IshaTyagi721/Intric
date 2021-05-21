const express = require('express')
const Image = require('../models/image')
const router = express.Router()
const auth = require('../middleware/auth')
const Article = require('../models/article')
const multer = require('multer')

const storage = multer.diskStorage({
        destination:(req,file,cb) =>{
                cb(null,'uploads')
        },
        filename: (req,file,cb) => {
                cb(null,file.fieldname + '-' + Date.now())
        }

});

const upload = multer({ storage })

var imgModel = require('../models/image');

router.post("/articles/:id/uploadImage",upload.single('image'),(req,res,next) =>{
        var obj = {
                img: {
                        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                        contentType: 'image/jpg'
                    }

        }
        imgModel.create(obj, (err, item) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // item.save();
                    res.status(201).send(obj)
                }
}) 
})



router.get('/articles/:id/getImage', (req, res) => {
	imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.render('imagesPage', { items: items });
		}
	});
});







module.exports = router