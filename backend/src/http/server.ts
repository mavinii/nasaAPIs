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
const nasaCache = new Map<string, { data: any, timestamp: number }>();
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

function isCacheValid(cacheEntry: { data: any, timestamp: number }) {
  return (Date.now() - cacheEntry.timestamp) < CACHE_EXPIRY;
}

app.get('/nasa-apod', async (req, res) => {
  try {
    const today = (new Date()).toDateString();
    const cacheKey = `apod-${today}`;

    // Check if the data is cached and still valid
    if (nasaCache.has(cacheKey)) {
      const cachedEntry = nasaCache.get(cacheKey);
      if (cachedEntry && isCacheValid(cachedEntry)) {
        console.log('Serving APOD data from cache');
        return res.json(cachedEntry.data);
      }
    }

    // If not cached, fetch the data from NASA API
    const NASA_KEY = process.env.VITE_NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
    
    // Cache the fetched data with the current timestamp
    nasaCache.set(cacheKey, { data: response.data, timestamp: Date.now() });

    // Send the fetched data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

app.get('/mars-photos', async (req, res) => {
  try {
    const today = (new Date()).toDateString();
    const cacheKey = `mars-${today}`;

    // Check if the data is cached and still valid
    if (nasaCache.has(cacheKey)) {
      const cachedEntry = nasaCache.get(cacheKey);
      if (cachedEntry && isCacheValid(cachedEntry)) {
        console.log('Serving Mars photos from cache');
        return res.json(cachedEntry.data);
      }
    }

    // If not cached or cache expired, fetch the data from NASA API
    const NASA_KEY = process.env.VITE_NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${NASA_KEY}`);
    
    // Cache the fetched data with the current timestamp
    nasaCache.set(cacheKey, { data: response.data, timestamp: Date.now() });

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
