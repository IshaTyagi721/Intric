const mongoose = require('mongoose')
const validator = require('validator')

const Article = mongoose.model('Article', {
    title: { 
        type: String 
    },
    title_sub: { 
        type: String 
    },
    Content : {
        type : String,
        trim : true,
        required : true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    Completed : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
})

module.exports = Article