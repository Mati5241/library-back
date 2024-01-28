import express from 'express';
import {compare} from 'bcrypt';
import {LoginRecord} from "../records/loginRecord.js";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';


export const loginRouter = express.Router();

loginRouter

    .post('/login',
        bodyParser.urlencoded(),
        async (req, res, next) => {
            const user = {
                login: req.body.login,
                password: req.body.password,
            }

            const loginUser = new LoginRecord(user);
            const userFromDataBase = await loginUser.checkAccount();



            compare(req.body.password, userFromDataBase.password, (err, response) => {
                if (err) {
                    res.json({auth: false, message: "no user exists"})
                    console.error(err);
                    res.sendStatus(500);
                } else if (response) {
                    const token = jwt.sign({ login: req.body.login }, 'tajnySekret', { // todo zmienic sekret
                        expiresIn: 1000,
                    })

                    res.json({auth: true, token: token, login: userFromDataBase.login, id: userFromDataBase.id, status: userFromDataBase.status})
                } else {
                    res.json({auth: false, message: "no user exists"})
                }
            });
        });
