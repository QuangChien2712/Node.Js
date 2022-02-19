// const express = require('express')
import express from 'express'
import configViewEngine from './configs/viewEngine'

// const path = require('path')
const app = express()
const port = 8080

configViewEngine(app)


app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "./index.html"))
    res.render("index.ejs")
})

app.get('/about', (req, res) => {
    res.send('Toi la Chien!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})