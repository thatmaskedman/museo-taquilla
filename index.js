require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`App is running at ${PORT}`)
);
