const express = require('express');
const app = express();
const cartRouter = require("./routes/CartRouter");

require('dotenv').config();

app.use(express.json());
app.use(cartRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () =>
    console.log(`Server Running at ${process.env.PORT}`)
);