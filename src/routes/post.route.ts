import express from 'express';
const postController = require('../controllers/post.controller')

const router = express.Router();

router.get('/get-all-posts', postController.getAllPosts);
router.get('/get-post/:id', postController.getPostById);
router.post('/create-post', postController.createPost);
router.put('/update-post', postController.updatePost);
router.delete('/delete-post', postController.deletePost);


export default router;
