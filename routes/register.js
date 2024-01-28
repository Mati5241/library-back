import * as express from 'express';
import {hash} from 'bcrypt';
import {v4 as uuid} from 'uuid';
import {RegisterRecord} from "../records/registerRecord.js";
import {LoginRecord} from "../records/loginRecord.js";

export const registerRouter = express.Router();


registerRouter.post('/register', async (req, res) => {
    try {
        const hashedPassword = await hash(req.body.password, 10);

        const userToCheck = {
            login: req.body.login,
            password: hashedPassword,
        }

        const loginUser = new LoginRecord(userToCheck);
        const isLoginTaken = await loginUser.checkAccount();

        if (isLoginTaken) {
            res.status(400).json({
                success: false,
                message: 'Błąd rejestracji: Taki login jest zajęty.',
            });
        } else {
            const user = {
                id: uuid(),
                login: req.body.login,
                name: req.body.name,
                password: hashedPassword,
                status: req.body.status,
            };

            const newUser = new RegisterRecord(user);
            await newUser.register();

            res.status(200).json({
                success: true,
                message: 'Zarejestrowano pomyślnie.',
                data: { userId: newUser.id, login: newUser.login },
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Błąd rejestracji: Wewnętrzny błąd serwera.',
        });
    }
});

