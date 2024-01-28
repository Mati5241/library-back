import express from 'express';
import {BookRecord} from "../records/bookRecord.js";

export const deleteRouter = express.Router();


deleteRouter

    .delete('/delete/:id', async (req, res) => {

        const id = req.params.id;


        await BookRecord.delete(id);

        res.end();

    })
