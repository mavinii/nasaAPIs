const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv')
var cors = require('cors')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())

// CORS setup
app.use(cors({
    origin: 'https://frontend-inky-xi.vercel.app',
    methods: ['GET', 'POST'],
}));

app.get("/nasa-apod", async (req, res) => {
    try {
        const NASA_KEY = process.env.VITE_NASA_API_KEY;
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching APOD data:", error);
        res.status(500).json({ error: "Failed to fetch data from NASA API" });
    }
});

app.get("/mars-photos", async (req, res) => {
    try {
        const NASA_KEY = process.env.VITE_NASA_API_KEY;
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${NASA_KEY}`);

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
        res.status(500).json({ error: "Failed to fetch data from NASA API" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});