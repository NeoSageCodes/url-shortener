// Loading Express
const express = require('express');

// Importing Controller Logic, Validation Middleware
const controller = require('../Controller/user');
const validate = require("../Middleware/validate");


// Harnessing its routing capabilities
const router = express.Router();

// Creating API Endpoints
// Generating short URLs
router.post("/links", validate.validateURL ,controller.shortURL);
// Getting Visit Count
router.get("/links/:code/stats", validate.validateCode, controller.stats);
// Redirection to the original URL
router.get("/:code", validate.validateCode, controller.redirectToURL);


// Exporting the router
module.exports = router;