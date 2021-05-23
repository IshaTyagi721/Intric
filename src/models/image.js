const mongoose = require('mongoose');
const validator = require('validator')
const multer = require('multer')


const imageSchema = mongoose.Schema({

        image: {
                type: String
        },

        article: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Article'
        }

})


imageSchema.virtual('url').get(function(){
        return '/image/' + this._id
     })

module.exports = mongoose.model('Image', imageSchema);