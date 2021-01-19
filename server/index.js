const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const process = require('process');

const authRoutes = require('./auth')
const apiRoutes = require('./api')

const app = express();

// CORS SETUP
app.use(cors())

// BODY PARSER SETUP
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// SESSION SETUP
const session_secret = process.env.QOVER_SESSION_SECRET;

if (!session_secret) {
    console.log("\x1b[31m", '\n \n ------ Please provide a "process.env.QOVER_SESSION_SECRET". ------ \n \n');
    process.exit(1);
}

app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8*60*60*1000 },  // 8 hours
    name: "qover-sid",
}));

// ROUTE SETUP
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// All other undefined routes should return 404
app.route('*').all((req, res) => {
    return res.sendStatus(404);
});

// global error handling
app.use((error, req, res, next) => {
    let status = 500;

    if (error.message === 'Unauthorized') status = 401;

    return res
        .status(status).end();
});

app.listen(process.env.PORT || 8080, () => {
    console.log('App server upp and running! Listening on port 8080');
});
