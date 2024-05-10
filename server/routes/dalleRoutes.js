import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});

router.route('/').get((request, response) => {
    response.send('Hello from DALL-E AI');
})

router.route('/').post(async (request, response) => {
    try {
        const { prompt } = request.body;

        const aiResponse = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = aiResponse.data[0].b64_json;
        response.status(200).json({ photo: image });

    } catch (error) {
        console.log('Error in generating image', error);
        response.status(500).send({ message: 'Error in generating image' });
    }
});

export default router;