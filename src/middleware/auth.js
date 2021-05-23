const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        //req.header requires name of the header we wanna access
        //THE SPACE AFTER BEARER IS CRUCIAL
        const token = req.header('Authorization').replace('Bearer ', '')
        //console.log(token)
        const decoded = jwt.decode(token, 'intricprojectcopy')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token' : token })
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }
    catch(e){
        res.status(401).send({ error : 'Please authenticate.'})
    }
}
module.exports = auth
