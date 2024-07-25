
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Update 'FOOTBALL_DATA_API_KEY' with your API key from football-data.org
const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

// Middleware to parse JSON requests
app.use(express.json());

// Function to fetch data from the football-data.org API
const fetchFootballData = async (endpoint) => {
  try {
    const response = await axios.get(`https://api.football-data.org/${endpoint}`, {
      headers: { 'X-Auth-Token': API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Route to fetch and display football data
app.get('/standings', async (req, res) => {
  const data = await fetchFootballData('v4/competitions/WC');
  if (data) {
    res.json(data.currentSeason.winner);
  } else {
    res.status(500).send('Failed to fetch data');
  }
});

// Route for Chainlink external adapter
app.get('/winner', async (req, res) => {
  const jobId = req.body.id;
  const data = await fetchFootballData('v4/competitions/WC');
  if(data){
    res.json({
      jobRunID: jobId,
      // data: data.currentSeason.winner,
      data: {
        id: data.currentSeason.winner.id,
        name: data.currentSeason.winner.name,
        shortName: data.currentSeason.winner.shortName,
        tla: data.currentSeason.winner.tla,
        crest: data.currentSeason.winner.crest,
        address: data.currentSeason.winner.address,
        website: data.currentSeason.winner.website,
        founded: data.currentSeason.winner.founded,
        clubColors: data.currentSeason.winner.clubColors,
        venue: data.currentSeason.winner.venue,
        lastUpdated: data.currentSeason.winner.lastUpdated
      },
      statusCode: 200,
    })
  }else {
    res.status(500).json({
      jobRunID: jobId,
      status: 'errored',
      error: 'Failed to fetch data',
    });
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
