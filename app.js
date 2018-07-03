const express = require("express");
const bodyParser = require("body-parser");
const pizzaRouter = require("./routes/pizzaRouter");
const indexRouter = require("./routes/indexRouter");
const app = express();
app.use(bodyParser());

app.use("/", indexRouter);
app.use("/pizzas", pizzaRouter);

app.use(function(req, res, next) {
  res.status(404).json("Not found!");
});

app.use(function(err, req, res, next) {
  res.status(500).json("Something broke!");
});

module.exports = app;
