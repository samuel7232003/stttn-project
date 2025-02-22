require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const apiRoutes = require('./rountes/api');
const connection = require('./config/database');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const http = require("http");
const exp = require('constants');
const server = http.createServer(app);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

configViewEngine(app);

const webAPI = express.Router();

app.use("/", webAPI);

app.use('/api/v1', apiRoutes);

(async () => {
    try {
        await connection();

        server.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`);
        })
    } catch (error) {
        console.log(">>> Error connect tp DB: ", error);
    }
})()