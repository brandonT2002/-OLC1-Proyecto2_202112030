"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Interpreter_1 = require("../Routes/Interpreter");
var Files_1 = require("../Routes/Files");
var app = (0, express_1.default)();
var port = 3000;
var cors = require('cors');
app.use(cors());
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Hola mundo');
});
app.use('/interpreter', Interpreter_1.default);
app.use('/files', Files_1.default);
app.listen(port, function () {
    try {
        return console.log("Server is running in port ".concat(port));
    }
    catch (error) {
        return console.error(error);
    }
});
