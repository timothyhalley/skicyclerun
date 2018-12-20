//https://dev.to/aurelkurtula/creating-a-basic-website-with-expressjs-j92
//import express from 'express';

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(express.static('../'))
app.use(express.static('../css'))
app.use(express.static('../js'))

app.get('/', (req, res) => {
    res.send(alpha)
})
app.listen(8080, () => {
    console.log('http://localhost:8080')
})
