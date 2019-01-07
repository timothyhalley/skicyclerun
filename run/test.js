//Docs:
// --> JS API --> http://overapi.com/javascript
// --> Espres: https://dev.to/aurelkurtula/creating-a-basic-website-with-expressjs-j92
//import express from 'express';
const path = require('path');
const fs = require('fs');
const https = require('https');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
app.set('view engine', 'ejs');

var certOptions = {
  key: fs.readFileSync(path.resolve('certs/server.key')),
  cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

app.use(express.static('../'))
app.use(express.static('../css'))
app.use(express.static('../js'))

app.get('/alpha', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost');
    console.log('espress route: ', req, ' \n', res)
    res.send('WHAT IS THIS ROUTE?')
})
// app.listen(8080, () => {
//     console.log('http://localhost:8080')
// })

var server = https.createServer(certOptions, app).listen(443)
