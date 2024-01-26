import express from 'express';
import cors from 'cors';
import flash from 'express-flash';
import {registerRouter} from "./routes/register.js";
import {loginRouter} from "./routes/login.js";
import session from 'express-session';
import {homeRouter} from "./routes/home.js";
import {logoutRouter} from "./routes/logout.js";


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


app.get('/home', homeRouter)


app.get('/logout', logoutRouter)

app.get('/register', registerRouter);

app.post('/register', registerRouter);

app.get('/login', loginRouter);

app.post('/login', loginRouter);


app.listen(3001, '0.0.0.0');
console.log('Listening on http://localhost:3001/')
