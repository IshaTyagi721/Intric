const mongoose = require('mongoose')
const validator = require('validator')

//Database url
mongoose.connect('mongodb://127.0.0.1:27017/intric', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})





