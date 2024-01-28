import * as express from 'express';


export const logoutRouter = express.Router();


logoutRouter

    .get('/logout', (req, res) => {

        req.session.destroy((err) => {
        })
        res.redirect('/login')

    })
