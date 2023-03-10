const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { SESSION_SECRET } = require('../config');
const MemoryStore = require('memorystore')(session);

module.exports = (app) => {
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    app.set('trust proxy', 1);

    const store = new session.MemoryStore({
        checkPeriod: 86400000
    });

    app.use(
        session({
            secret: SESSION_SECRET,
            resave:false,
            saveUninitialized: true,
            store,
            cookie: {
                secure: true,
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 100,
                sameSite: 'none'
            }
        })
    );
    return app;
}