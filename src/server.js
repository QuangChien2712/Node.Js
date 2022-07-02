require("dotenv").config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import cors from "cors";

const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
// app.use(cors({ origin: true }));
app.use(cors());

app.use(morgan("combined"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});