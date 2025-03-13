const Twitter = require('../models/TwitterModel');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { cleanSportsData, cleanTrendingData } = require('../utils/twittercleandata');

puppeteer.use(StealthPlugin());

/**
 * Start Twitter Scraping and Store in DB
 */


exports.scrapeTwitter = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const browser = await puppeteer.launch({
            headless: false, // Set to true for production
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
            defaultViewport: null,
        });

        const page = await browser.newPage();
        await page.goto('https://x.com', { waitUntil: 'networkidle2' });

        console.log("Waiting for user to log in manually...");
        await new Promise(r => setTimeout(r, 60000)); // 1-minute login wait

        // Navigate to "Explore"
        await page.waitForSelector('a[aria-label="Search and explore"]', { timeout: 60000 });
        await page.click('a[aria-label="Search and explore"]');
        await page.waitForFunction(() => window.location.href.includes('/explore'), { timeout: 60000 });

        // Extract trending topics
        await page.waitForSelector('a[href="/explore/tabs/trending"]', { timeout: 60000 });
        await page.click('a[href="/explore/tabs/trending"]');
        await page.waitForSelector('[aria-label="Timeline: Explore"]', { timeout: 60000 });

        const trendingTopics = await page.evaluate(() => {
            const timeline = document.querySelector('[aria-label="Timeline: Explore"]');
            if (!timeline) return [];
            return Array.from(timeline.querySelectorAll('span'))
                .map(el => el.innerText.trim())
                .filter(text => text.length > 0);
        });

        const cleanedTrendingData = cleanTrendingData(trendingTopics);
       await Twitter.create({ userId, category: 'trending', topics: cleanedTrendingData });

        // Extract sports topics
        await page.waitForSelector('a[href="/explore/tabs/sports"]', { timeout: 60000 });
        await page.click('a[href="/explore/tabs/sports"]');
        await page.waitForSelector('[aria-label="Timeline: Explore"]', { timeout: 60000 });

        const sportsTopics = await page.evaluate(() => {
            const timeline = document.querySelector('[aria-label="Timeline: Explore"]');
            if (!timeline) return [];
            return Array.from(timeline.querySelectorAll('span'))
                .map(el => el.innerText.trim())
                .filter(text => text.length > 0);
        });

        const cleanedSportsData = cleanSportsData(sportsTopics);
        
        console.log("Trending Topics:", cleanedTrendingData);
        console.log("Sports Topics:", cleanedSportsData);

        await Twitter.create({ userId, category: 'sports', topics: cleanedSportsData });

        await browser.close();

        res.status(200).json({ message: 'Scraping complete and data saved.', trendingTopics, sportsTopics });
    } catch (error) {
        console.error("Error occurred during scraping:", error);
        res.status(500).json({ message: 'Scraping failed', error });
    }
};


/**
 * Fetch Twitter Data for Analysis
 */
exports.getTwitterAnalysis = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const data = await Twitter.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch analysis data', error });
    }
};
