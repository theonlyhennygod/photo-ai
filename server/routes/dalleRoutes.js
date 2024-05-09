import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });

const openai = new OpenAIApi(configuration);

router.route('/').get((request, response) => {
    response.send('Hello from DALL-E AI');
})

router.route('/').post(async (request, response) => {
    try {
        const { prompt }  = request.body;

        const aiResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = aiResponse.data.data[0].b64_json;

        response.status(200).json({ photo: image });

        } catch (error) {
            console.log('Error in generating image', error);
            response.status(500).send({ message: 'Error in generating image' });
    }
});

export default router;