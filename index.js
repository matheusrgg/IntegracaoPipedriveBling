import express from "express";
import Router from './routes.js';

//---mongoose
require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});
require('./models/order');

const app = express();
app.use(express.json());

app.use("/", Router);

app.listen(3032, () => {
  console.log("Api Started");
});