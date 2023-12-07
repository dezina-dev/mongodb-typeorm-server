import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';

const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;

        // Find the user by their ID
        const user = await User.findOne(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Create a new Post entity
        const newPost = new Post();
        newPost.title = title;
        newPost.content = content;
        newPost.user = user; // Assign the user directly

        // Save the new Post entity
        const result = await newPost.save();

        return res.status(200).json({
            success: true,
            message: 'Post created successfully',
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({
            relations: ['user'],
        });

        return res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
     
        const postId = req.params.id;
        // const post = await Post.findOne({where: {id: new ObjectId(postId)}});

        // if (!post) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Post not found.',
        //     });
        // }

        // return res.status(200).json({
        //     success: true,
        //     data: post,
        // });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const updatedPost = req.body;

        await Post.update(postId, updatedPost);

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully.',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;

        // const post = await Post.findOne({where: {id: new ObjectId(postId)}});

        // if (!post) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Post not found.',
        //     });
        // }

        // await Post.remove(post);

        // return res.status(200).json({
        //     success: true,
        //     message: 'Post deleted successfully.',
        // });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
}