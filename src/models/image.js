const mongoose = require('mongoose')
const validator = require('validator')
const multer = require('multer')
const fs = require('fs')



const ImageSchema = new mongoose.Schema({
        img: {
                data: Buffer,
                contentType: String
        }
})

module.exports = mongoose.model('Image', ImageSchema);
