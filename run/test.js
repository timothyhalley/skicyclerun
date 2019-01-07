//Docs:
// --> JS API --> http://overapi.com/javascript
// --> Espres: https://dev.to/aurelkurtula/creating-a-basic-website-with-expressjs-j92
// https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
//import express from 'express';


'use strict';


const path = require('path');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const express = require('express');
const app = express();
//app.options('https://img.skicyclerun.com', cors());
// app.set('view engine', 'ejs');

const whitelist = ['https://localhost', 'https://skicyclerun']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// const corsOptions = {
//   origin: 'https://localhost'
// }

var certOptions = {
  key: fs.readFileSync(path.resolve('certs/server.key')),
  cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

app.use(express.static('../'))
app.use(express.static('../css'))
app.use(express.static('../js'))

app.get('/beta', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://img.skicyclerun.com');
    res.sendFile(path.join(__dirname + '/../alpha.html'));
})

app.get('/alpha', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://img.skicyclerun.com');
    res.sendFile(path.join(__dirname + '/../alpha.html'));
})
// app.listen(8080, () => {
//     console.log('http://localhost:8080')
// })

var server = https.createServer(certOptions, app).listen(443)
