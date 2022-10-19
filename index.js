const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cartRouter = require("./routes/CartRouter");
const bannerRouter = require("./routes/BannerRouter");

require("dotenv").config();

global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cartRouter, bannerRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => console.log(`Server Running at ${process.env.PORT}`));
