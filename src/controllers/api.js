import express from 'express'
import ControleConta from '../models/controleConta.js';
import Validador from '../models/validador.js';
import connection from '../models/conectionMysql.js';

const api = express.Router();
const validador = new Validador();
const controleConta = new ControleConta(connection, validador);

api.post('/user/login/', function (req, res) {
    controleConta.facaLogin(req.body.email, req.body.senha, (data) => {
        if (data.ok) {
            data.ok = undefined;
            res.cookie('credencial', data.credencial);
            res.send(data);
        } else {
            res.status(500).send('Erro nos dados');
        }
    });
});
api.get('/user/logoff/', function (req, res) {
    const credencial = req.query.credencial;
    controleConta.canceleChaveCredencial(credencial, (data) => res.send(data));
});
api.get('/user/registro/', function (req, res) {
    controleConta.registre(req.query.nome, req.query.sobrenome, req.query.email, req.query.senha, (data) => res.send(data));
});
api.get('/biblioteca/pushResumos/', function (req, res) {
    const data = {
        codArtigo: req.query.codArtigo,
        quantidadeArtigos: req.query.quantidadeArtigos
    }
    res.send(data);
});
api.get('/editora/abrirArtigo/', function (req, res) {
    const data = {
        idArtigo: req.query.idArtigo,
        credencial: req.query.credencial
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