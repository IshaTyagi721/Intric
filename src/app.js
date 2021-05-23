const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Article = require('./models/article') 
const Comment = require('./models/comment')
const userRouter = require('./routers/user')
const articleRouter = require('./routers/article')
const commentRouter = require('./routers/comment')

const app = express()
// const port = process.env.PORT 

app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(userRouter)
app.use(articleRouter)
app.use(commentRouter)

module.exports = app

