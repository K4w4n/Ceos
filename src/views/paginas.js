const express = require('express');
const paginas = express.Router();
paginas.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
paginas.get('/login/', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});
paginas.get('/sobre/', function (req, res) {
    res.sendFile(__dirname + '/sobre.html');
});
paginas.get('/painel/', function (req, res) {
    res.sendFile(__dirname + '/painel.html');
});
paginas.get('/artigos/', function (req, res) {
    res.sendFile(__dirname + '/artigos.html');
});
module.exports = paginas;