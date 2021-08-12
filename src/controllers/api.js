import express from 'express';
import ControleConta from '../models/controleConta.js';
import Biblioteca from '../models/biblioteca.js';
import Editora from '../models/editora.js';
import Validador from '../models/validador.js';
import connection from '../models/conectionMysql.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const api = express.Router();
const validador = new Validador();
api.use((req, res, next) => {
    api.use(cors);
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const controleConta = new ControleConta(connection, validador);
const biblioteca = new Biblioteca(connection, validador);
const editora = new Editora(connection, validador);

api.use(cookieParser());

api.post('/user/login/', function (req, res) {
    controleConta.facaLogin(req.body.email, req.body.senha)
        .then(dados => {
            res.cookie('credencial', dados.credencial);
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
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
api.get('/user/confirmecredencial/', function (req, res) {
    controleConta.confirmeChaveCredencial(req.cookies.credencial)
        .then(dados => {
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.post('/user/registro/', function (req, res) {
    controleConta.registre(req.body.nome, req.body.sobrenome, req.body.email, req.body.senha)
        .then(dados => {
            res.status(200).end();
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.get('/biblioteca/pushResumos/', function (req, res) {
    const data = req.query;
    biblioteca.resumaVariosArtigos(data.quantidadeArtigos, data.artigo)
        .then(dados => {
            res.send(dados);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
api.get('/biblioteca/meusArtigos/', function (req, res) {
    biblioteca.meusArtigos(req.cookies.credencial)
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