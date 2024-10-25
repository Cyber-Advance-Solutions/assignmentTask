// controllers/optimalController.js
const Country = require('../models/Country');

exports.getOptimalDistribution = async (req, res) => {
    try {
        const countries = await Country.find({});

        // Group countries by region
        const regions = {};
        countries.forEach((country) => {
            if (!regions[country.region]) regions[country.region] = [];
            regions[country.region].push(country.name);
        });

        const result = Object.keys(regions).map((region) => {
            const countryList = regions[region];
            const optimalDistribution = [];
            let i = 0;

            // Distribute countries into chunks of 3 to 7 for each sales representative
            while (i < countryList.length) {
                const chunkSize = Math.min(7, countryList.length - i);
                optimalDistribution.push(countryList.slice(i, i + chunkSize));
                i += chunkSize;
            }

            return {
                region,
                countryList: optimalDistribution.flat(),
                countryCount: countryList.length
            };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating optimal distribution', error });
    }
};
