const rawData = [
    'WWE Speed', 'LIVE',
    'Trending in Sports', 'Real Madrid',
    '93.5K posts', 'Trending in Sports',
    'Jonathan David', '2,646 posts',
    'Trending in Sports', 'Hala Madrid',
    '6,614 posts', 'Trending in Sports',
    'Flacco', '1,997 posts',
    'Trending in Sports', 'Makar',
    '1,738 posts', 'Trending in Sports',
    'Addison', '10.1K posts',
    'Trending in Sports', 'Shaq',
    '16.7K posts', 'Trending in Sports',
    'Dortmund', '33.7K posts'
];

// Function to clean and structure data
function cleanSportsData(data) {
    const cleanedData = [];
    let i = 0;

    while (i < data.length) {
        if (data[i] !== 'Trending in Sports') {
            let topic = data[i];
            let posts = (i + 1 < data.length && /\d+(\.\d+)?[Kk]?\s+posts/.test(data[i + 1])) ? data[i + 1] : 'N/A';
            
            cleanedData.push({ topic, posts });
            i += posts !== 'N/A' ? 2 : 1;
        } else {
            i++;
        }
    }

    return cleanedData;
}

//const cleanedSportsTopics = cleanSportsData(rawData);

//console.log(JSON.stringify(cleanedSportsTopics, null, 2));


const rawData1 = [
    '1', '·', 'Entertainment industry · Trending', '#परमार्थ_की_अनोखी_मिसाल', '#परमार्थ_की_अनोखी_मिसाल', '230K posts',
    '2', '·', 'Entertainment industry · Trending', 'Social Reformer Sant RampalJi', '172K posts',
    '3', '·', 'Trending in India', '#NoSmokingDay', '#NoSmokingDay', '38.3K posts',
    '4', '·', 'Trending in India', 'Starlink', '75.9K posts',
    '5', '·', 'Trending in India', '#TrainHijack', '#TrainHijack', 'Balochistan', '46.4K posts',
    '6', '·', 'Trending in India', 'फूलन देवी', '31.1K posts',
    '7', '·', 'Entertainment industry · Trending', '#Holi2025', '#Holi2025', '9,199 posts',
    '8', '·', 'Trending in India', '#harshilagrotechsurge', '#harshilagrotechsurge', '11.6K posts',
    '9', '·', 'Trending in India', 'Airtel', '29K posts',
    '10', '·', 'Politics · Trending', 'Balochistan', '127K posts',
    '11', '·', 'Business & finance · Trending', 'Thar', '8,640 posts',
    '12', '·', 'Politics · Trending', 'Mauritius', '105K posts'
];

// Function to clean and structure data
function cleanTrendingData(data) {
    const cleanedData = [];
    let i = 0;

    while (i < data.length) {
        if (!/^\d+$/.test(data[i]) && data[i] !== '·') {
            let topic = data[i];
            let posts = (i + 1 < data.length && /\d+(\.\d+)?[Kk]?\s+posts/.test(data[i + 1])) ? data[i + 1] : 'N/A';

            cleanedData.push({ topic, posts });
            i += posts !== 'N/A' ? 2 : 1;
        } else {
            i++;
        }
    }

    return cleanedData;
}

// const cleanedTrendingTopics = cleanTrendingData(rawData1);

// console.log(JSON.stringify(cleanedTrendingTopics, null, 2));
module.exports = { cleanSportsData, cleanTrendingData };
