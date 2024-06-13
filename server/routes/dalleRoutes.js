import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Hello World!');
    })
    .post(async(req, res) => {
        try {
            const { prompt } = req.body;
            console.log('Received prompt:', prompt);

            const response = await fetch(`https://api.limewire.com/api/image/generation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Version': 'v1',
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`
                },
                body: JSON.stringify({
                    prompt,
                    aspect_ratio: '1:1'
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Received data:', data);

            //const image = data.url; / / Ensure this is the correct path to the image URL
            res.status(200).json({ photo: data });
        } catch (error) {
            console.error('Error creating image:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    });

export default router;