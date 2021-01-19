const express = require('express')
const router = express.Router()

const { cars } = require('../mockDB.json'); 

function withAuth(req, res, next) {
    if (!req.session.loggedIn) {
        return next(new Error('Unauthorized'));
    }

    return next();
}

router.post('/quote', withAuth, (req, res) => {
    const { car, price, age } = req.body;
    const errors = {};

    if (!car) errors.car = "Please choose a car!";
    if (!price) errors.price = "Please enter a price!";
    if (!age) errors.age = "Please enter an age!";

    if (price && price < 5000) errors.price = "Sorry! The price of the car is too low!";
    if (age && age < 18) errors.age = "Sorry! The driver is too young!";
    if (car === "Porsche" && age < 25) errors.general = "Sorry! We can not accept this paricular risk!";

    if (Object.keys(errors).length) return res.status(400).json({
        errors
    });

    let globalPrice;
    let universalPrice;

    const selectedCar = cars.find(c => c.type === car);

    globalPrice = selectedCar.price;
    universalPrice = globalPrice + (price / 100 * selectedCar.percentage);

    const quote = {
        global: {
            yearPrice: globalPrice,
            monthPrice: globalPrice / 12,
            maxTravelDuration: 90,
            medicalExpenseReimbursement: 1000000,
            personalAssistance: 5000,
            travelAssistance: 1000,
            coverageDuration: 1,
        },
        universal: {
            yearPrice: universalPrice,
            monthPrice: universalPrice / 12,
            maxTravelDuration: 180,
            medicalExpenseReimbursement: 3000000,
            personalAssistance: 10000,
            travelAssistance: 2500,
            coverageDuration: 1,
        },
    };

    return res.json({
        quote,
    });
});

router.get('/cars', withAuth, (req, res) => {
    return res.json({
        cars: cars.map(c => ({
            type: c.type,
        })),
    });
});

module.exports = router
