const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

class App {
  constructor() {
    this.app = express();
    this.server = require("http").Server(this.app);
    this.io = require("socket.io")(this.server);

    //this.app.set("io", this.io);

    this.middlewares();
    this.routes();
    this.mongo();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use((req, res, next) => {
      req.io = this.io;

      return next();
    });
    this.app.use(routes);
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/goweek5",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
  }
}

module.exports = new App().server;
