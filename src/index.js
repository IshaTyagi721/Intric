const express = require('express')
const multer = require('multer')
const fs = require('fs')
// const path = require('path')
// const crypto = require('crypto')//to generate file name
// const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')
require('./db/mongoose')
const User = require('./models/user')
const Article = require('./models/article') 
const Comment = require('./models/comment')
const Image = require('./models/image')
const userRouter = require('./routers/user')
const articleRouter = require('./routers/article')
const commentRouter = require('./routers/comment')
const imageRouter = require('./routers/image')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(articleRouter)
app.use(commentRouter)
app.use(imageRouter)

app.listen(port, () => {
    console.log('Server is up on port'+" "+port)
})



