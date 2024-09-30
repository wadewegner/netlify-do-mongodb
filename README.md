# Netlify and DigitalOcean MongoDB Integration Demo

This project demonstrates how to connect a Netlify serverless function to a MongoDB database hosted on DigitalOcean, showcasing a simple movie list application.

## Overview

This demo shows how to:
1. Set up a MongoDB database on DigitalOcean
2. Connect to this database from a Netlify serverless function
3. Display data from the database on a static website hosted by Netlify

## Prerequisites

- Node.js and npm installed
- A DigitalOcean account
- A Netlify account
- Netlify CLI installed (`npm install -g netlify-cli`)
- MongoDB Shell (mongosh) installed

## Setting up MongoDB on DigitalOcean

1. Log in to your DigitalOcean account
2. Navigate to Databases and create a new MongoDB cluster
3. Once the cluster is created, go to the "Connection Details" tab
4. Under "Connection Parameters", you'll find your connection string. It should look like this:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority
   ```
5. Replace `<username>`, `<password>`, and `<cluster-url>` with your actual credentials
6. Change `test` to `movies` in the connection string

This is your `MONGODB_URL` that you'll use in your Netlify function.

## Creating the Database and Loading Movies

1. Open a terminal and connect to your MongoDB using the connection string:
   ```
   mongosh "mongodb+srv://<username>:<password>@<cluster-url>/movies?retryWrites=true&w=majority"
   ```

2. Once connected, create the movies collection and insert some sample data:
   ```javascript
   use movies
   db.movies.insertMany([
     { title: "The Shawshank Redemption", year: 1994 },
     { title: "The Godfather", year: 1972 },
     { title: "The Dark Knight", year: 2008 },
     { title: "12 Angry Men", year: 1957 },
     { title: "Schindler's List", year: 1993 }
   ])
   ```

3. Verify the data was inserted correctly:
   ```javascript
   db.movies.find()
   ```

4. Exit the MongoDB shell:
   ```
   exit
   ```

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/wadewegner/netlify-do-mongodb
   cd netlify-do-mongodb
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   MONGODB_URL=your_mongodb_connection_string_from_digitalocean
   ```

4. Start the development server:
   ```
   netlify dev
   ```

5. Open `http://localhost:8888` in your browser to view the main application.

6. To test the Netlify function directly, open a new browser tab or use a tool like curl:
   ```
   curl http://localhost:8888/.netlify/functions/get_movies
   ```
   This will return the JSON response from your function, allowing you to verify that it's correctly fetching data from your MongoDB database.

## Deploying to Netlify

1. Log into your Netlify account and enable the DigitalOcean extension:
   - Go to the Netlify dashboard
   - Navigate to "Extensions"
   - Find and enable the DigitalOcean extension

2. In the DigitalOcean extension settings on Netlify:
   - Add your MongoDB URL
   - This will securely store your database connection string and make it available to your Netlify functions

3. Use the Netlify CLI to create a new site:
   ```
   netlify sites:create
   ```
   Follow the prompts to set up your new site.

4. Deploy your site using the Netlify CLI:
   ```
   netlify deploy
   ```
   This command will build your site and deploy it to Netlify.

5. After the deploy command completes, Netlify will provide you with a URL where you can view your live site.

Note: Make sure you're in your project directory when running these Netlify CLI commands. Also, ensure you're logged in to your Netlify account in the CLI (you can log in using `netlify login` if needed).

## Project Structure

- `netlify/functions/get_movies/get_movies.js`: Netlify Function that connects to MongoDB and fetches movies
- `index.html`: Displays the list of movies
- `README.md`: This file

## Troubleshooting

- Ensure your DigitalOcean MongoDB cluster is running and accessible
- Check that the `MONGODB_URL` is correctly set in your environment variables
- Verify that your DigitalOcean cluster's network settings allow connections from Netlify

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License, Version 2.0. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.