import * as express from 'express';
import {BookRecord} from "../records/bookRecord.js";
import {UsersBooksRecord} from "../records/usersBooksRecord.js";
import {MyBooksRecord} from "../records/myBooksRecord.js";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/JWT_SECRET.js";


const authenticateToken = (req, res, next) => {
    const token = req.body.userToken || req.query.userToken || req.headers['authorization'];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};


export const bookRouter = express.Router();


bookRouter
    .post('/addbook', async (req, res) => {
        try {
            const newBook = new BookRecord({
                title: req.body.title,
                isbn: req.body.isbn,
                autor: req.body.autor,
            });
            await newBook.insert();
            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })


    .get('/bookslist', (req, res) => {

        (async () => {

            const items = await BookRecord.show();

            res.json({
                data: items,
            })

        })();

    })


    .post('/borrow', authenticateToken, async (req, res) => {

        const userIdFromToken = req.user.id;

        try {
            const newUserBook = new UsersBooksRecord({
                userId: userIdFromToken,
                bookId: req.body.bookId,
            });
            await newUserBook.borrow();
            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }


    })


    .delete('/giveback/:id', async (req, res) => {

        const bookId = req.params.id;

        await UsersBooksRecord.giveBack(bookId);

        res.end();

    })


    .post('/mybooks', async (req, res) => {


        try {
            const myBooks = new MyBooksRecord({
                userId: req.body.userId,
            });
            await myBooks.show();

            res.json({
                data: myBooks.myBooks,
            })


            res.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }

    })
