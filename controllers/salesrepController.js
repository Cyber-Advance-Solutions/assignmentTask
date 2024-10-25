// controllers/salesrepController.js
const Country = require('../models/Country.js');

exports.getSalesReps = async (req, res) => {
    try {
        const countries = await Country.find({});

        // Group countries by region
        const regions = {};
        countries.forEach((country) => {
            if (!regions[country.region]) regions[country.region] = [];
            regions[country.region].push(country.name);
        });

        // Calculate min and max sales reps for each region based on country count
        const result = Object.keys(regions).map((region) => {
            const countryCount = regions[region].length;
            const minSalesRep = Math.ceil(countryCount / 7); // Minimum: 7 countries per rep
            const maxSalesRep = Math.floor(countryCount / 3); // Maximum: 3 countries per rep
            return { region, minSalesReq: minSalesRep, maxSalesReq: maxSalesRep };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating sales reps', error });
    }
};
