const express = require('express');
const { Configuration, OpenAIApi } = require('openai')

const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()
const port = 3000
const moodRouter = require('./moods');



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(moodRouter)

app.post('/getRecommendation', async (req, res) => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const mood = req.body.mood || '';
  console.log(mood)
  if (mood.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid mood",
      }
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": generatePrompt(mood) }]

    });
    var movies = JSON.parse(completion.data.choices[0].message.content);

    for (const movie of movies) {
      var found = await searchMovie(movie.title);
     
      var foundFirst=found.results[0];
      movie.title=foundFirst.original_title;
      movie.overview=foundFirst.overview;
      movie.poster_path="https://image.tmdb.org/t/p/original" + foundFirst.poster_path;
      movie.release_date=foundFirst.release_date;
      console.log(movie)
    }

    res.status(200).json({ result: movies });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function searchMovie(name) {
  const axios = require('axios');

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.MOVIEDB_API_KEY
    }
  };

  var movie = (await axios.request(options)).data;

  return movie;
}

function generatePrompt(category) {
  var prompt = `After "List:" text, suggest 4 movie titles in "${category}" category as Json array of objects each containing a title 
  List :
  `
  console.log(prompt)
  return prompt;
}