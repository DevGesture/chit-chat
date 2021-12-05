import postController from '../controllers/post.controller'
module.exports = async (router) => {
    router.get('/post', await postController.getPost); //get time line posts it will include all post of the current user and all posts of the followings
    router.get('/post/:id', await postController.getPostById);
    router.post('/post', await postController.addPost);
    router.put('/post/:id', await postController.updatePost);
    router.put('/post/:id/like-dislike', await postController.likeDislikePost);
    router.delete('/post/:id', await postController.deletePost);
}