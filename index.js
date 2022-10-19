const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cartRouter = require("./routes/CartRouter");
const bannerRouter = require("./routes/BannerRouter");

require("dotenv").config();

<<<<<<< HEAD
global.__basedir = __dirname;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cartRouter, bannerRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
=======
app.use(express.json());
app.use(cartRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
>>>>>>> 7761f1fcbb3e49e14a6e319e497dfc803d8eba75
});

app.listen(process.env.PORT, () => console.log(`Server Running at ${process.env.PORT}`));
