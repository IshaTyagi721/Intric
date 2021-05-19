const mongoose = require('mongoose')
const validator = require('validator')

const CommentSchema = new mongoose.Schema({
	comment: { 
        type: String 
    },
    date: {
        type: Date, 
        default: Date.now
    },    
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    article : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Article'
    }
})

 const Comment = mongoose.model('Comment', CommentSchema)

 module.exports = Comment
