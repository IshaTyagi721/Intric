const mongoose = require('mongoose')
const validator = require('validator')

//Database url
mongoose.connect('mongodb+srv://user:user@cluster0.jduon.mongodb.net/Intric?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true
})





