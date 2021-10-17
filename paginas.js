import express from 'express';
import path from 'path';
import Biblioteca from './src/biblioteca.js';
import { connection } from './src/conectionMysql.js';
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
paginas.get('/artigos/:id', function (req, res) {
    biblioteca.pegueArtigo(req.params.id)
        .then(dados => {
            res.render('artigo', dados);
        })
        .catch(err => {
            console.log('err:', err)
            res.status(500).send("Artigo não encontrado, sentimos muito, mas ninguem teve paciencia pra desenvolver uma tela de erro descente.");
        });
});
paginas.get('/artigosjson/:id', function (req, res) {
    biblioteca.pegueArtigo(req.params.id, req.cookies.credencial)
        .then(dados => {
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
export default paginas;