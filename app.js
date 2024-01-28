import express from 'express';
import cors from 'cors';
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import { logoutRouter } from "./routes/logout.js";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import {bookRouter} from "./routes/book.js";
import {deleteRouter} from "./routes/delete.js";
import {jwt_secret} from "./config/jwt_secret.js";



const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(express.json());

app.use(bodyParser.json());

app.set('view engine', 'ejs');


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-acces-token"]

    if (!token) {
       res.send('There is no token')
    } else {
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                res.json({auth: false, message: 'You failed to authenticate'})
            } else {
                req.userID = decoded.id;
                next();
            }
        })
    }
}


// Middleware do weryfikacji tokena JWT
const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Brak autoryzacji' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Nieprawidłowy token' });
    }
};

// app.get('/isUserAuth', verifyJWT, (req, res) => {
//     res.send('You are authenticate');
// })
//
// app.get('/', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/home');
//     } else {
//         res.redirect('/login');
//     }
// });

app.get('/logout', authenticateToken, logoutRouter);

app.get('/register', registerRouter);

app.post('/register', registerRouter);

app.get('/login', loginRouter);

app.post('/login', loginRouter);

app.post('/addbook', bookRouter);

app.get('/bookslist', bookRouter);

app.delete('/delete/:id', deleteRouter);

app.post('/borrow', bookRouter);

app.delete('/giveback/:id', bookRouter);

app.post('/mybooks', bookRouter);

app.listen(3001, '0.0.0.0');
console.log('Listening on http://localhost:3001/');
