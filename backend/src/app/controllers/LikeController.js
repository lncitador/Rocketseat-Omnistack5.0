const mongoose = require("mongoose");
const Tweet = require("../models/Tweet");

class LikeController {
  async store(req, res) {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id);

    tweet.set({ likes: tweet.likes + 1 });
    tweet.save();

    req.io.emit("like", tweet);

    return res.json(tweet);
  }
}

module.exports = new LikeController();
