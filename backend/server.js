const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.connect(dbConfig.url,{dbName: 'myFirstDatabase'}).then(() => {
    console.log("Successfully connected to the database myFirstDatabase");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(express.static('public'));

app.use('/images', express.static(path.join('images')));

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin','http://localhost:4200');
    res.header('Access-Control-Allow-Origin', 'https://thecourierclub.herokuapp.com');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept');
    next();
  });

app.get('/', (req, res) => {
    res.json({"message": "Welcome to our site"});
});

const productRoutes = require("./app/routes/product.route.js");
const userRoute = require("./app/routes/user.route");
const claimRoute = require("./app/routes/claim.route");

productRoutes(app)
userRoute(app)
claimRoute(app)


// listen for requests
app.listen(3553, () => {
    console.log("Server is listening on port " + 3553);
});

module.exports = app;