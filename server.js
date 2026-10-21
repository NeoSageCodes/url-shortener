// Loading Express, Router
const express = require('express');
const router = require('./Router/router');

// Creating an Express App Instance
const app = express();

// Setting PORT No
const PORT = 1000;

// CREATING & REGISTERING an APP-LVL middleware as a body parser
app.use(express.json());

// REGISTERING Router
app.use(router);

// Making the Server listen and checking if it is
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
})