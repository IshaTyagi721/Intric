// const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const userSchema = new mongoose.Schema({
//     name :{
//         type : String,
//         required : true,
//         trim : true
//     },
//     email :{
//         type : String,
//         unique : true,
//         required : true,
//         trim : true,
//         lowercase : true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email in invalid')
//             }
//         }
//     },
//     password :{
//         type : String,
//         required : true,
//         trim : true,
//         minLength : 7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password is invalid')
//             }
//         }
//     },
//     age :{
//         type : Number,
//         default : 0,
//         validate(value) {
//             if(value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     tokens: [{
//         token: {
//             type: String, 
//             required: true
//         }
//     }]
// })

// //We're telling Mongoose to map the _id (local field) for each user to 
// //the owner (foreign field) in each article. Now when we fetch the user, we can also fetch all of their articles.
// //its more like a primary key and foreign key in SQL ,_id in user is the primary key and its referenced in article where it acts as a foreign key
// userSchema.virtual('articles', {
//     ref: 'Article',
//     localField: '_id',
//     foreignField: 'owner'
//    })


// userSchema.methods.toJSON = function () {
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

// userSchema.methods.generateAuthToken = async function () {
//     const user = this
//     const token = jwt.sign({ _id : user._id.toString() }, 'thisismynewcourse')
//     user.tokens = user.tokens.concat({ token })
//     await user.save()
//     return token
// }

// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })
//     if(!user){
//         throw new Error('Unable to login')
//     }
//     const isMatch = await bcrypt.compare(password, user.password)

//     if(!isMatch){
//         throw new Error('Unable to login')
//     }
//     return user
// }

// //Hash the plaintext password before saving
// userSchema.pre('save', async function(next) {
//     const user = this
    
// if(user.isModified('password')){
//     user.password = await bcrypt.hash(user.password, 8)
// }
//     next()
// })

// const User = mongoose.model('User', userSchema)

// module.exports = User



const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email in invalid')
            }
        }
    },
    password :{
        type : String,
        required : true,
        trim : true,
        minLength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password is invalid')
            }
        }
    },
    age :{
        type : Number,
        default : 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String, 
            required: true
        }
    }]
})

//We're telling Mongoose to map the _id (local field) for each user to 
//the owner (foreign field) in each task. Now when we fetch the user, we can also fetch all of their articles.
//its more like a primary key and foreign key in SQL ,_id in user is the primary key and its referenced in article where it acts as a foreign key
userSchema.virtual('articles', {
    ref: 'Article',
    localField: '_id',
    foreignField: 'owner'
   })

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

//Hash the plaintext password before saving
userSchema.pre('save', async function(next) {
    const user = this
    
if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
}
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

