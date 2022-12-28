const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT

const bankStatementController = require("./src/controllers/bankStatement.controller");
const authenticate = require("./src/middlewares/authenticate");

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "1000mb", extended: true, parameterLimit: 50000}))
app.use(authenticate);

app.use("/bankStatement", bankStatementController);

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})