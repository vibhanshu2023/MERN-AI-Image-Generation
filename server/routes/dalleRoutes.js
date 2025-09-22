import express from 'express';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
      }

      console.log('Received prompt:', prompt);

      // Create FormData
      const form = new FormData();
      form.append('prompt', prompt);

      const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        body: form,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Convert response to base64
      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');

      // Send back as data URL
      res.status(200).json({ photo: `data:image/png;base64,${base64Image}` });

    } catch (error) {
      console.error('Error creating image:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });

export default router;