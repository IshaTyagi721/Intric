const express = require('express')
const Comment = require('../models/comment')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/comments', auth, async (req, res) => {
    const comment = new Comment({
        ...req.body,
        owner : req.user._id,
        // article : req.article._id
    })
    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/comments', auth, async (req, res) => {
    try {
        await req.user.populate('comments').execPopulate()
        res.send(req.user.comments)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/comments/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const comment = await Comment.findOne({ _id, owner: req.user._id })
        if(!comment){
            return res.status(404).send()
        }
        res.send(comment)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/comments/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Description', 'Completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({ 'error' : 'Invalid Updates!' })
    }
    const _id = req.params.id

    try {
        const comment = await Comment.findOne({ _id : req.params.id, owner : req.user._id})
        if(!comment){
            res.status(404).send()
        }
        updates.forEach((update) => comment[update] = req.body[update])
        await comment.save()
        res.send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/comments/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const comment = await Comment.findOneAndDelete({ _id : req.params.id, owner : req.user._id })
        if(!comment){
            return res.status(404).send()
        }
        res.send(comment)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router
