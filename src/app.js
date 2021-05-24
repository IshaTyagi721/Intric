const cors = require('cors')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Article = require('./models/article') 
const Comment = require('./models/comment')
const userRouter = require('./routers/user')
const articleRouter = require('./routers/article')
const commentRouter = require('./routers/comment')

const app = express()
let allowlist = [
    'http://127.0.0.1:5500',
];
let corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(userRouter)
app.use(articleRouter)
app.use(commentRouter)

module.exports = app

