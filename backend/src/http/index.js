import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

app.get('/nasa-apod', async (req, res) => {
  try {
    const NASA_KEY = process.env.VITE_NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);

    // Send the fetched data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

app.get('/mars-photos', async (req, res) => {
  try {
    const NASA_KEY = process.env.VITE_NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${NASA_KEY}`);

    // Send the fetched data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
