const mongoose = require('mongoose')
const validator = require('validator')
const fs = require('fs')
const multer = require('multer')


mongoose.connect('mongodb://127.0.0.1:27017/intric_copy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})





