import * as express from 'express';


export const homeRouter = express.Router();


homeRouter

    .get('/home', (req, res) => {
        if (req.session.loggedIn) {
            res.render('home')
        } else
            res.redirect('/login')
    })
