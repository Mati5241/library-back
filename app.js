import express from 'express';
import cors from 'cors';
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import { logoutRouter } from "./routes/logout.js";
import bodyParser from "body-parser";
import {bookRouter} from "./routes/book.js";
import {deleteRouter} from "./routes/delete.js";



const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.use(bodyParser.json());


app.get('/logout', logoutRouter);

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
