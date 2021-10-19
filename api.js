import express from 'express';
import ControleConta from './src/controleConta.js';
import Biblioteca from './src/biblioteca.js';
import Editora from './src/editora.js';
import Validador from './src/validador.js';
import { connection } from './src/conectionMysql.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const api = express.Router();

api.use(cookieParser());

api.use(cors());

api.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

const validador = new Validador();

const controleConta = new ControleConta(connection, validador);
const biblioteca = new Biblioteca(connection, validador);
const editora = new Editora(connection, validador);

api.post('/user/login/', function (req, res) {
    controleConta.facaLogin(req.body.email, req.body.senha)
        .then(usuario => {
            res.cookie('credencial', usuario.token, { httpOnly: true, maxAge: 5184000000, secure: true });/*Token com 60 dias */
            usuario.token = undefined;
            res.status(200).send(usuario);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});
api.delete('/user/logoff/', function (req, res) {
    controleConta.canceleChaveCredencial(req.cookies.credencial)
        .then(() => {
            res.clearCookie("credencial")
            res.status(200).end();
        }).catch(err => {
            res.status(500).send(err);
        });
});
api.get('/user/confirmetoken/', function (req, res) {
    controleConta.confirmeToken(req.cookies.credencial)
        .then(dados => {
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.post('/user/registro/', function (req, res) {
    controleConta.registre(req.body.nome, req.body.sobrenome, req.body.email, req.body.senha)
        .then(usuario => {
            res.cookie('credencial', usuario.token, { httpOnly: true, maxAge: 5184000000, secure: true });/*Token com 60 dias */
            usuario.token = undefined;
            res.status(200).send(usuario);
        })
        .catch(err => res.status(404).send(err));
});
api.get('/biblioteca/pushResumos/', function (req, res) {
    const data = req.query;
    biblioteca.resumaVariosArtigos(parseInt(data.quantidadeArtigos), parseInt(data.pagina))
        .then(dados => {
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.get('/biblioteca/meusArtigos/', function (req, res) {
    const data = req.query;
    biblioteca.meusArtigos(req.cookies.credencial, parseInt(data.quantidadeArtigos), parseInt(data.pagina))
        .then(dados => {
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.post('/editora/criarArtigo/', function (req, res) {
    const url = req.body.url;
    const credencial = req.cookies.credencial;
    editora.crieArtigo(url, credencial).then(() => {
        res.sendStatus(200);
    })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.post('/editora/salvarArtigo/', function (req, res) {
    editora.editeArtigo(req.body.url, req.body.artigo, req.cookies.credencial).then(() => {//url, artigo, credencial
        res.sendStatus(200);
    }).catch(err => {
        res.status(500).send(err);
    });
});
export default api;