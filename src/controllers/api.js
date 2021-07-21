import express from 'express'
import ControleConta from '../models/controleConta.js';
const api = express.Router();

api.post('/user/login/', function (req, res) {
    res.send(req.body);
    const email = req.body.email;
    const senha = req.body.senha;
    console.log(email, '\n' ,senha);

    /* controleConta.facaLogin(email, senha, (data) => res.send(data)); */
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
    editora.crieArtigo(idArtigo, credencialId, (data)=>res.send(data));;
});
api.get('/editora/salvarArtigo/', function (req, res) {
    const data = {
        artigo: req.query.artigo,
        credencial: req.query.credencial
    }
    res.send(data);
});
export default api;