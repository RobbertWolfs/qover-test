const express = require('express')
const router = express.Router()
const sha256 = require('js-sha256');

const { users } = require('../mockDB.json'); 

const secret = process.env.QOVER_SECRET;

if (!secret) {
    console.log("\x1b[31m", '\n \n ------ Please provide a "process.env.QOVER_SECRET". ------ \n \n');
    process.exit(1);
}

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ errors: { general: 'Please enter email and password.' } });
    }

    const user = users.find(u => u.email === email);

    if (!user || user.password !== sha256(`${password}${secret}`)) {
        return res.status(400).json({ errors: { general: 'Please provide valid login credentials.' } });
    }

    req.session.loggedIn = true;
    req.session.email = email;

    return res.json({
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
});

router.post('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.email = null;

    return res.status(200).end();
});

module.exports = router;
