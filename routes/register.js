import * as express from 'express';
import {hash} from 'bcrypt';
import {v4 as uuid} from 'uuid';
import {RegisterRecord} from "../records/registerRecord.js";

export const registerRouter = express.Router();


registerRouter

    .get('/register', (req, res) => {

        res.render('register')

    })


    .post('/register', async (req, res) => {

        const hashedPassword = await hash(req.body.password, 10);
        const user = {
            id: uuid(),
            login: req.body.login,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,

        }




        const newUser = new RegisterRecord(user);
        await newUser.register();


        res.render('register')

    })

