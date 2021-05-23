const mongoose = require('mongoose')
const validator = require('validator')

const articleSchema = new mongoose.Schema({
    title: { 
        type: String 
    },
    title_sub: { 
        type: String 
    },
    Content : {
        type : String,
        trim : true,
        // required : true
    },

    image1:{
        type: String

    
    },

    image2:{
            type: String
    },

    image3:{
        type: String
    },
    image4S:{
        type: String
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
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }]
})
//New format of virtual
articleSchema.virtual('url').get(function(){
    return '/articles/' + this._id
 })
//Testing
//TEsting 2
module.exports = mongoose.model('Article', articleSchema);