const express = require('express')
const app = express()
require('./db/mongoose')
const User = require('./models/user')
const Article = require('./models/article') 
const Comment = require('./models/comment')
// const Image = require('./models/image')
const userRouter = require('./routers/user')
const articleRouter = require('./routers/article')
const commentRouter = require('./routers/comment')
// const imageRouter = require('./routers/image')



const port = process.env.PORT || 3000

app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(userRouter)
app.use(articleRouter)
app.use(commentRouter)
// app.use(imageRouter)


app.listen(port, () => {
    console.log('Server is up on port'+" "+port)
})

