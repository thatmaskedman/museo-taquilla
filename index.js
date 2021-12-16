require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 8080;
const router = require('./routes')

app.use(express.json());
app.use('/api', router);

app.listen(
    PORT,
    () => console.log(`App is running at ${PORT}`)
);
