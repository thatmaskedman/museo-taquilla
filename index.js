require('dotenv').config()

const app = require('express')();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`App is running at ${PORT}`)
);
