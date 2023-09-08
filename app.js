const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const taskRoute = require("./routes/task");

//mongoDB cluster connection
const password = process.env.MONGO_ATLAS_PW;
const MONGOB_URI = `mongodb+srv://mhpl:${password}@cluster0.xfapz.mongodb.net/taskDataBase?retryWrites=true&w=majority`;

mongoose.connect(MONGOB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.use(morgan("dev")); //for log the methods
//body-parser come default in express so there is no need to install body-parser
app.use(bodyparser.urlencoded({ extended: false })); // to make a urlencoded file in redable form so that we read it easily
app.use(bodyparser.json()); //to make a json file in redable form so that we read it easily

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes to access the APIs
app.use("/", taskRoute);

//if the request are not go in any route
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// for above error or any error while getting data from database or anything happen.
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

module.exports = app;
