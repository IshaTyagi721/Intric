const mongoose = require('mongoose')
const validator = require('validator')
const multer = require('multer')
const fs = require('fs')
// const path = require('path')
// const crypto = require('crypto')//to generate file name
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')



mongoose.connect('mongodb://127.0.0.1:27017/intric_copy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})

// let conn = mongoose.connection
// let gfs 
// conn.once('open',() =>{
//         gfs = Grid(conn.db,mongoose.mongo)
//         gfs.collection('imageUpload')
// })




