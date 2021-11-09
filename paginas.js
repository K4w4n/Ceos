import express from 'express';
import path from 'path';
import Biblioteca from './src/biblioteca.js';
import cookieParser from 'cookie-parser';

const biblioteca = new Biblioteca();

const paginas = express.Router();
const __dirname = path.resolve();
const pastaFiles = path.resolve(__dirname, 'src', 'views');

paginas.use(cookieParser());

paginas.get('/', function (req, res) {
    res.sendFile(pastaFiles + '/index.html');
});
paginas.get('/login/', function (req, res) {
    res.sendFile(pastaFiles + '/login.html');
});
paginas.get('/sobre/', function (req, res) {
    res.sendFile(pastaFiles + '/sobre.html');
});
paginas.get('/painel/', function (req, res) {
    res.sendFile(pastaFiles + '/painel.html');
});
paginas.get('/artigos/', function (req, res) {
    res.sendFile(pastaFiles + '/artigos.html');
});
paginas.get('/meus_artigos/', function (req, res) {
    res.sendFile(pastaFiles + '/meus_artigos.html');
});
paginas.get('/perfil/', function (req, res) {
    res.sendFile(pastaFiles + '/perfil.html');
});
paginas.get('/termos/', function (req, res) {
    res.sendFile(pastaFiles + '/termos.html');
});
paginas.get('/admin/', function (req, res) {
    res.sendFile(pastaFiles + '/perfil.html');
});
paginas.get('/artigos/:id', function (req, res, next) {
    biblioteca.pegueArtigo(req.params.id)
        .then(dados => res.sendFile(pastaFiles + '/artigos_completos.html'))
        .catch(err => next(err));
});
paginas.get('/search/', function (req, res) {
    res.sendFile(pastaFiles + '/search.html');
});
export default paginas;