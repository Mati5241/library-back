const express = require('express');
const {TodoRecord} = require("../records/registerRecord.js");

const dateRouter = express.Router();


dateRouter


    .get('/favicon.ico', (req, res) => {
        return 'your faveicon'
    })


    .get('/date/:day', (req, res) => {

        const day = req.params.day;


        (async () => {

            const items = await TodoRecord.show(day);

            res.json({
                data: items,
            })

        })();

    })


    .post('/date/:day', (req, res) => {

        const day = req.params.day;


        const timeStart = req.body.timeStart;
        const timeEnd = req.body.timeEnd;
        const plan = req.body.title;



        (async () => {


            const todoItem = new TodoRecord({
                timeStart,
                timeEnd,
                title: plan,
            });

            await todoItem.insert(day);

            res.end()
        })();
    })


module.exports = {
    dateRouter,
}
