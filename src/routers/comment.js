const express = require('express')
const Comment = require('../models/comment')
const router = express.Router()
const auth = require('../middleware/auth')
const Article = require('../models/article')

// router.post('/articles/:id/comment', async (req, res) => {
//     // find out which post you are commenting
//      const id = req.params.id;
//     // get the comment text and record post id
//      const comment = new Comment({
//    //   text: req.body.comment,
//    //   article: id
//         ...req.body,
//         article : id
//   })
//     // save comment
//  await comment.save();
//     // get this particular post
//  const postRelated = await Article.findById(id);
//     // push the comment into the post.comments array
//  postRelated.comments.push(comment);
//     // save and redirect...
//   res.status(201).send(comment)
//  await postRelated.save(function(err) {
//  if(err) {console.log(err)}
//  res.redirect('/')
//  })

// })

router.post('/articles/:id/comment', async (req, res) => {
   // find out which post you are commenting
    const id = req.params.id;
   // get the comment text and record post id
    const comment = new Comment({
  //   text: req.body.comment,
  //   article: id
       ...req.body,
       article : id
 })
   // save comment
await comment.save();
   // get this particular post
const postRelated = await Article.findById(id);
   // push the comment into the post.comments array
postRelated.comments.push(comment);
   // save and redirect...
await postRelated.save(function(err) {
if(err) {console.log(err)}
res.status(201).send(comment)
// res.redirect('/')
})

})

// router.post('/articles/:id/comment', async (req, res) => {
//    const id = req.params.id;
//     const comment = new Comment({
//        ...req.body,
//        article : id
//  })
//         await article.save()
//         const postRelated = await Article.findById(id);
//         postRelated.comments.push(comment);
//         res.status(201).send(article)
//     if (e) {
//         res.status(500).send(e)
//     }
// })

// router.get('/articles', auth, async (req, res) => {
//     try {
//         await req.user.populate('articles').execPopulate()
//         res.send(req.user.articles)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

// router.get('/articles/:id', auth, async (req, res) => {
//     const _id = req.params.id
//     try {
//         const article = await Article.findOne({ _id, owner: req.user._id })
//         if(!article){
//             return res.status(404).send()
//         }
//         res.send(article)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

// router.patch('/articles/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['title', 'title_sub', 'Content', 'date', 'Completed']
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//     if(!isValidOperation){
//         return res.status(400).send({ 'error' : 'Invalid Updates!' })
//     }
//     const _id = req.params.id

//     try {
//         const article = await Article.findOne({ _id : req.params.id, owner : req.user._id})
//         if(!article){
//             res.status(404).send()
//         }
//         updates.forEach((update) => article[update] = req.body[update])
//         await article.save()
//         res.send(article)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/articles/:id', auth, async (req, res) => {
//     const _id = req.params.id
//     try {
//         const article = await Article.findOneAndDelete({ _id : req.params.id, owner : req.user._id })
//         if(!article){
//             return res.status(404).send()
//         }
//         res.send(article)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

module.exports = router 