// controllers/countryController.js
const Country = require('../models/Country');

exports.getCountries = async (req, res) => {
    const { region } = req.query;
    try {
        const query = region ? { region } : {};
        const countries = await Country.find(query);
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries', error });
    }
};
