import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));
reportWebVitals();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors())
dotenv.config();

// Connect to database
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,  useUnifiedTopology: true},
  () => {
    console.log("Connected to db!!!");
  }
);
app.use(express.json());
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
const authRoute = require("./Validation");
const postsRoute = require('./Posts');
app.use("/api/User", authRoute);
app.use('/shop',postsRoute);
app.listen(3001, () => console.log("Server is up"));
