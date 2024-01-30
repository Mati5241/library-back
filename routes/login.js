import express from 'express';
import {compare} from 'bcrypt';
import {LoginRecord} from "../records/loginRecord.js";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config/JWT_SECRET.js";


export const loginRouter = express.Router();

loginRouter

    .post('/login', bodyParser.urlencoded(), async (req, res) => {
        try {
            const user = {
                login: req.body.login,
                password: req.body.password,
            }

            const loginUser = new LoginRecord(user);
            const userFromDataBase = await loginUser.checkAccount();

            if (!userFromDataBase) {
                res.status(401).json({auth: false, message: "Nieprawidłowy login lub hasło"});
                return;
            }

            compare(req.body.password, userFromDataBase.password, (err, response) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else if (response) {
                    const token = jwt.sign({login: req.body.login, id: userFromDataBase.id}, JWT_SECRET, {
                        expiresIn: 1000,
                    });

                    res.json({
                        auth: true,
                        token: token,
                        login: userFromDataBase.login,
                        id: userFromDataBase.id,
                        status: userFromDataBase.status
                    });
                } else {
                    res.status(401).json({auth: false, message: "Nieprawidłowy login lub hasło"});
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({auth: false, message: "Błąd serwera"});
        }
    });
