const express = require('express')
const Comment = require('../models/comment')
const router = express.Router()
const auth = require('../middleware/auth')
const Article = require('../models/article')

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
router.delete("/comments/:articleId/:commentId", async function (req, res) {
   try {
     const article = await Article.findByIdAndUpdate(
       req.params.articleId,
       {
         $pull: { comments: req.params.commentId },
       },
       { new: true }
     );
 
     if (!article) {
       return res.status(400).send("article not found");
     }
 
     await Comment.findByIdAndDelete(req.params.commentId);
 
     res.send("Success");
   } catch (err) {
     console.log(err);
     res.status(500).send("Something went wrong");
   }
 });

module.exports = router 
