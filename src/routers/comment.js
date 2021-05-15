const express = require('express')
const Comment = require('../models/comment')
const Article = require('../models/article')
const router = express.Router()
const auth = require('../middleware/auth')



router.post("/comments",auth,async(req,res)=>{
        const _id = req.params.id
        const article = await Article.findOne({ _id, owner: req.user._id })
        if(!article){
            return res.status(404).send()
        }
        else{
                const comment = new Comment({
                        comment: req.body,
                        owner: req.user._id

                })
                try {
                        await comment.save()
                        res.status(201).send(comment)
                    }
                    catch (e) {
                            res.status(500).send(e)}
}
       

})

router.get('/comments/:id', auth, async (req, res) => {
        const _id = req.params.id
        try {
            const comment = await Comment.findOne({  owner: req.user._id })
            if(!comment){
                return res.status(404).send()
            }
            res.send(comment)
        } catch (e) {
            res.status(500).send(e)
        }
    })


    router.delete('/comments/:id', auth, async (req, res) => {
        const _id = req.params.id
        try {
            const comment = await Comment.findOneAndDelete({ owner : req.user._id })
            if(!comment){
                return res.status(404).send()
            }
            res.send(comment)
        } catch (e) {
            res.status(500).send(e)
        }
    })
    
    module.exports = router    
