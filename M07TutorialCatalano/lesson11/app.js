const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
//const dbURI = "mongodb://crstt:123Stella@localhost:27017/node-tutorial";

const dbURI = `mongodb+srv://SuperUser:l6e7JrrXzxYEPsjk@cluster0.zqw4cyc.mongodb.net/Blog?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.set('views', '/home/runner/SDEV255Node/M07TutorialCatalano/lesson11/views');
//app.set('public', '/home/runner/SDEV255Node/M07TutorialCatalano/lesson11/public');

// middleware & static files
//app.use(express.static('/public'));
app.use(express.static('M07TutorialCatalano/lesson11/public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});