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
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        console.log("here 1")
        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log("here 2")

        const newPost = await new Post({
            name,
            prompt,
            photo: photoUrl.url,
        });

        await newPost.save();
        console.log("here 4")
        response.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.log('Error in creating post', error);
        response.status(500).json({ success: false, message: error});
    }
})

export default router; 