const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();

const db = require('./app/middleware/db');
const Users = require('./app/models/userModel');
const Category = require('./app/models/categoryModel');
const Contact = require('./app/models/contactModel');
const Testimonial = require('./app/models/testimonialModel')
const Portfolio = require('./app/models/portfolioModel')

Users.sync();
Category.sync();
Contact.sync();
Testimonial.sync();
Portfolio.sync();

const userRoutes = require('./app/routes/userRoutes');
const categoryRoutes = require('./app/routes/categoryRoutes');
const contactRoutes = require('./app/routes/contactRoutes');
const testRoutes = require('./app/routes/testimonialRoutes');
const portfolioRoutes = require('./app/routes/portfolioRoutes')

const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/',userRoutes);
app.use('/',categoryRoutes);
app.use('/',contactRoutes);
app.use('/',testRoutes);
app.use('/',portfolioRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
