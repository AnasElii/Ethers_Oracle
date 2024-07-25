# Football Data Provider

This folder contains a server application that provides football data to your smart contract. The server fetches data from the football-data.org API and serves it through HTTP endpoints. It is designed to work as a data provider for smart contracts, particularly with Chainlink external adapters.

## Features
- Fetches data from the football-data.org API.
- Provides football data through HTTP endpoints.
- Includes endpoints for general data retrieval and Chainlink external adapter compatibility.
- Easy to set up and run.

## Prerequisites
- Node.js (v12 or higher)
- npm (v6 or higher)
- An API key from football-data.org

## Getting Started

### 1. Set Up Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

```bash
FOOTBALL_DATA_API_KEY=your_football_data_api_key
```

### 2. Install Dependencies
Navigate to the Football Data Provider directory and install the required dependencies:

```bash
cd Football Data Provider
npm install
```

### 3. Run the Server
```bash
node server.js
```
This will start the server on http://localhost:3000.

## API Endpoints

### Fetch Standings
Endpoint: `/winner`

Method: GET

Description: Fetches and displays the current season's winner for the World Cup 2022.

Response:
```bash
{
    "id": 762,
    "name": "Argentina",
    "shortName": "Argentina",
    "tla": "ARG",
    "crest": "https://crests.football-data.org/762.png",
    "address": "Viamonte 1366/76 Buenos Aires, Buenos Aires 1053",
    "website": "http://www.afa.org.ar",
    "founded": 1893,
    "clubColors": "Sky Blue / White / Black",
    "venue": null,
    "lastUpdated": "2022-05-17T21:09:25Z"
}
```

### Chainlink External Adapter
Endpoint: /winner

Method: GET

Description: Provides data in a format compatible with Chainlink external adapters.

Request Body:
```bash
{
  "id": "job_id"
}
```
Response:

```bash
{
    "data": {
        "id": 762,
        "name": "Argentina",
        "shortName": "Argentina",
        "tla": "ARG",
        "crest": "https://crests.football-data.org/762.png",
        "address": "Viamonte 1366/76 Buenos Aires, Buenos Aires 1053",
        "website": "http://www.afa.org.ar",
        "founded": 1893,
        "clubColors": "Sky Blue / White / Black",
        "venue": null,
        "lastUpdated": "2022-05-17T21:09:25Z"
    },
    "statusCode": 200
}
```

If the data fetch fails, the response will be:

```bash
{
  "jobRunID": "job_id",
  "status": "errored",
  "error": "Failed to fetch data"
}
```

## License
This project is licensed under the MIT License.

```
Feel free to modify this project to suit your specific needs. Contributions and suggestions are welcome!
```