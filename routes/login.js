import * as express from 'express';
import {compare} from 'bcrypt';
import {LoginRecord} from "../records/loginRecord.js";
import bodyParser from "body-parser";

export const loginRouter = express.Router();


loginRouter

    .get('/login', (req, res) => {

        if (req.session.loggedIn) {
            res.redirect('/home')
        } else {
            res.render('login')
        }
    })


    .post('/login',
        bodyParser.urlencoded(),
        async (req, res, next) => {


            const user = {
                login: req.body.login,
                password: req.body.password,
            }

            const loginUser = new LoginRecord(user);
            await loginUser.checkAccount();


            const passwordFromDataBase = await loginUser.checkAccount()

            compare(req.body.password, passwordFromDataBase, (err, result) => {
                if (err) {
                    // Obsługa błędu
                    console.error(err);
                    res.sendStatus(500); // Internal Server Error
                } else if (result) {
                    // Hasła są zgodne
                    req.session.loggedIn = true;
                    req.session.username = req.body.login;
                    console.log(req.session);
                    res.redirect('/home');
                } else {
                    // Hasła nie pasują
                    res.sendStatus(401); // Unauthorized
                }
            });


        })



