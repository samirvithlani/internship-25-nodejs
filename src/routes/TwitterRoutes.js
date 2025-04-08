const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/twitter');

router.post('/scrape', twitterController.scrapeTwitter);
router.get('/analysis/:userId', twitterController.getTwitterAnalysis);

module.exports = router;
