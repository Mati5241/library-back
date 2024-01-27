import * as express from 'express';
import {BookRecord} from "../records/bookRecord.js";
import {UsersBooksRecord} from "../records/usersBooksRecord.js";
import {MyBooksRecord} from "../records/myBooksRecord.js";


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


    .post('/borrow', async (req, res) => {

        try {
            const newUserBook = new UsersBooksRecord({
                userId: req.body.userId,
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
