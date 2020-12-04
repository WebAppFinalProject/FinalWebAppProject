//import json web token
const jwt = require('jsonwebtoken');

module.exports = {
    //this function will outhorized the routes that
    // the client will request
    authorizedRequest: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    },
    avoidLogin: async (req, res, next) => {
        const token = req.cookies.token;

        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                res.redirect('/app');
            });
        } else {
            next();
        }
    },
    Dashboard: async (req, res, next) => {
        const token = req.cookies.token;

        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.redirect('/signin');
        }
    },
    //this only for logout
    clearCookies: (req, res, next) =>{
        const token = req.cookies.token;
        if(token) {
            res.clearCookie('token');
        }
        next();
    }
}
