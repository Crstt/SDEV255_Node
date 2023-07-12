const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('M07TutorialCatalano/NodeAuth/public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
app.set('views', '/home/runner/SDEV255Node-1/M07TutorialCatalano/NodeAuth/views');

// database connection
//const dbURI = "mongodb://localhost:27017/node-auth"
const dbURI = `mongodb+srv://SuperUser:l6e7JrrXzxYEPsjk@cluster0.zqw4cyc.mongodb.net/node-auth?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);