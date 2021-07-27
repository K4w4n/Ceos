import express from 'express';
import ControleConta from '../models/controleConta.js';
import Biblioteca from '../models/biblioteca.js';
import Validador from '../models/validador.js';
import connection from '../models/conectionMysql.js';
import cookieParser from 'cookie-parser';
import Editora from '../models/editora.js';

const api = express.Router();
const validador = new Validador();

const controleConta = new ControleConta(connection, validador);
const biblioteca = new Biblioteca(connection, validador);

api.use(cookieParser());

api.post('/user/login/', function (req, res) {
    controleConta.facaLogin(req.body.email, req.body.senha, (data) => {
        if (data.ok) {
            data.ok = undefined;
            res.cookie('credencial', data.credencial);
            res.send(data);
        } else {
            res.status(500).end();
        }
    });
});
api.delete('/user/logoff/', function (req, res) {
    controleConta.canceleChaveCredencial(req.cookies.credencial, (data) => {
        if (data) {
            res.clearCookie("credencial")
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    });
});
api.get('/user/confirmecredencial/', function (req, res) {
    controleConta.confirmeChaveCredencial(req.cookies.credencial, (data) => {
        if (data.ok) {
            data.ok = undefined;
            res.send(data);
        } else {
            res.status(500).end();
        }

    });
});
api.post('/user/registro/', function (req, res) {
    controleConta.registre(req.body.nome, req.body.sobrenome, req.body.email, req.body.senha, (data) => {
        if (data.ok) {
            data.ok = undefined;
            res.end();
        } else {
            res.status(500).end();
        }
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
api.get('/editora/abrirArtigo/', function (req, res) {
    const data = {
        url: req.query.url,
        credencial: req.cookies.credencial
    }
    res.send(data);
});
api.get('/editora/criarArtigo/', function (req, res) {
    const idArtigo = req.query.idArtigo;
    const credencialId = req.query.credencial;
    editora.crieArtigo(idArtigo, credencialId, (data) => res.send(data));;
});
api.get('/editora/salvarArtigo/', function (req, res) {
    const data = {
        artigo: req.query.artigo,
        credencial: req.query.credencial
    }
    res.send(data);
});
export default api;