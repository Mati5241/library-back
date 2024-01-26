import express from 'express';
import cors from 'cors';
import flash from 'express-flash';
import {registerRouter} from "./routes/register.js";
import {loginRouter} from "./routes/login.js";
import session from 'express-session';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use(flash());

app.use(express.urlencoded({extended: false}))

app.use(express.json());

app.set('view engine', 'ejs');

app.use(session({
    secret:'Keep it secret',
    name:'uniqueSessionID',
    saveUninitialized:false}))


app.get('/',(req,res) => {

    if(req.session.loggedIn)
        res.redirect('/home')
    else
        res.redirect('/login')
})


app.get('/home',(req,res) => {

    if(req.session.loggedIn)
    {
        // res.setHeader('Content-Type','text/html')
        // res.write('Welcome '+req.session.username+' to your dashboard')
        // res.write('<a href="/logout">Logout</a>')
        // res.end()
        res.render('home')
    }
    else
        res.redirect('/login')
})



// app.post('/authenticate',
//     bodyParser.urlencoded(),
//     (req,res,next) => {
//
// // Actual implementation would check values in a database
//         if(req.body.username=='foo'&&req.body.password=='bar')
//         {
//             res.locals.username = req.body.username
//             next()
//         }
//         else
//             res.sendStatus(401)
//     }
//     ,(req,res)=>
//     {
//         req.session.loggedIn = true
//         req.session.username = res.locals.username
//         console.log(req.session)
//         res.redirect('/home')
//     })



app.get('/logout',(req,res) => { //todo raczej to przerobic na post

    req.session.destroy((err)=>{})
    res.redirect('/login')

})





app.get('/register', registerRouter);

app.post('/register', registerRouter);

app.get('/login', loginRouter);

app.post('/login', loginRouter);


app.listen(3001, '0.0.0.0');
console.log('Listening on http://localhost:3001/')
