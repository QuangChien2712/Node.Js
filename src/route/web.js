import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/about', (req, res) => {
        res.send('Tôi là Võ Quang Chiến!')
    })

    return app.use('/', router)
}

module.exports = initWebRoute