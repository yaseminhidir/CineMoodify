const express = require('express');


const moods = [
    "Happy",
    "Sad",
    "Excited",
    "Romantic",
    "Scary",
    "Funny",
    "Action-packed",
    "Thought-provoking",
    "Inspirational",
    "Adventurous",
    "Mysterious",
    "Thrilling",
    "Relaxing",
    "Nostalgic",
    "Dramatic",
    "Intense",
    "Feel-good",
    "Suspenseful",
    "Heartwarming",
    "Chilling"
  ];

var moodRouter = express.Router();
moodRouter.get("/moods", (req, res) => {
    res.json(moods)
})
module.exports = moodRouter;
