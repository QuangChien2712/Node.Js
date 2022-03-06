require('dotenv').config()
import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoute from './route/web'

const app = express()
const port = process.env.PORT || 8080

configViewEngine(app);
initWebRoute(app);

// console.log(process.env);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})