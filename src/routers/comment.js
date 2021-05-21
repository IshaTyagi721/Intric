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

module.exports = router 