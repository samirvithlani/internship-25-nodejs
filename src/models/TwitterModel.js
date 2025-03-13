const mongoose = require('mongoose');

const TwitterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['trending', 'sports'], required: true },
    topics: [
        {
            topic: { type: String, required: true },
            posts: { type: String, default: 'N/A' },
            scrapedAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Twitter', TwitterSchema);
