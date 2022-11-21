const express = require("express");
const connectToMongo = require("./db");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const ejs = require("ejs");
var cors = require('cors');

dotenv.config({ path: __dirname + '/config.env' });

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;
connectToMongo();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Available Routes
app.use("/admin",require('./routes/admin'));
app.use("/user",require('./routes/user'));

app.listen(port, ()=>{
    console.log(`backend listening at http://localhost:${port}`);
})