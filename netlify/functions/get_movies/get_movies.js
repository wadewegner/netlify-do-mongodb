require("dotenv").config();

const { MongoClient } = require("mongodb");

exports.handler = async function(event, context) {
  console.log('Function `get_movies` invoked');

  // Check if MONGODB_URL is set
  if (!process.env.MONGODB_URL) {
    console.error('MONGODB_URL is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'MongoDB configuration error' })
    };
  }

  console.log('Attempting to connect to MongoDB');
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected successfully to MongoDB');

    // Access the "movies" database and "movies" collection
    const database = client.db("movies");
    const collection = database.collection("movies");

    console.log('Fetching movies from database');
    // Fetch all movies
    const movies = await collection.find({}).toArray();
    console.log(`Found ${movies.length} movies`);

    // Only return the necessary data
    const simplifiedMovies = movies.map(movie => ({
      title: movie.title,
      year: movie.year
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ movies: simplifiedMovies })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch movies' })
    };
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
};
