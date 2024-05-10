import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// configure cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// get all posts

router.route('/').get(async (request, response) => {
    try {
        const posts = await Post.find({});
        response.status(200).json(posts);
    } catch (error) { 
        console.log('Error in getting posts', error);
        response.status(500).json({ success: false, message: error });
    }
});

// create a post

router.route('/').post(async (request, response) => {
    try {
        const { name, prompt, photo } = request.body;
        const result = await cloudinary.uploader.upload(photo, {
            upload_preset: 'dalle'
        });

        const newPost = new Post({
            name,
            prompt,
            photo: result.secure_url
        });

        await newPost.save();
        response.status(201).json(newPost);
    } catch (error) {
        console.log('Error in creating post', error);
        response.status(500).send({ message: 'Error in creating post' });
    }
})

export default router; 