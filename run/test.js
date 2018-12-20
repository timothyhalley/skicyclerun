//https://dev.to/aurelkurtula/creating-a-basic-website-with-expressjs-j92
//import express from 'express';
const express = require('express');
const app = express()
app.get('/', (req, res) => {
    res.send('../default.html')
})
app.listen(8080, () => {
    console.log('http://localhost:8080')
})
