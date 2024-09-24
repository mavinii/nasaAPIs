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

// In-memory cache for NASA API data
const nasaCache = new Map<string, any>();

app.get('/nasa-apod', async (req, res) => {
  try {
    // Key based on the current date
    const today = (new Date()).toDateString();
    
    // Check if today's data is already cached
    if (nasaCache.has(today)) {
      console.log('Serving from cache');
      return res.json(nasaCache.get(today));
    }

    // If not cached, fetch the data from NASA API
    const NASA_KEY = process.env.VITE_NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
    
    // Cache the data with today's date as the key
    nasaCache.set(today, response.data);

    // Send the fetched data back to the frontend
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

app.get('/mars-photos', async (req, res) => {
  try {
    // Key based on the current date
    const today = (new Date()).toDateString();
    
    // Check if today's data is already cached
    if (nasaCache.has(today)) {
      console.log('Serving from cache');
      return res.json(nasaCache.get(today));
    }

    // If not cached, fetch the data from NASA API
    const NASA_KEY = process.env.VITE_NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${NASA_KEY}`);
    
    // Cache the data with today's date as the key
    nasaCache.set(today, response.data);

    // Send the fetched data back to the frontend
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
