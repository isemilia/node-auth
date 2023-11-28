const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const app = express();

// .env
dotenv.config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// testing cookies
app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');

  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got a cookie');
});


app.get('/read-cookies', (req, res) => {
  res.json(req.cookies)
});

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// auth
app.use(authRoutes);