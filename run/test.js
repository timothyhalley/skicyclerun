//Docs:
// --> JS API --> http://overapi.com/javascript
// --> Espres: https://dev.to/aurelkurtula/creating-a-basic-website-with-expressjs-j92
// https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
// CORS: https://medium.com/@baphemot/understanding-cors-18ad6b478e2b

'use strict';

const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
const app = express();
// app.set('view engine', 'ejs');

const chromeLauncher = require('chrome-launcher');

var certOptions = {
  key: fs.readFileSync(path.resolve('certs/server.key')),
  cert: fs.readFileSync(path.resolve('certs/server.crt'))
}

app.use(express.static('../'))
app.use(express.static('../css'))
app.use(express.static('../js'))

app.get('/prod', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
})

app.get('/alpha', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../alpha.html'));
})

var server = https.createServer(certOptions, app).listen(443)

chromeLauncher.launch({
  startingUrl: 'https://localhost/alpha',
  chromeFlags: ['--disable-web-security', '--user-data-dir']
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);
});
