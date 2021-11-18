import paginas from './paginas.js';
import api from './api.js';
import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express();
const pastaPublica = path.join(__dirname, '/src/views/files/');
const pastaFiles = path.resolve(__dirname, 'src', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Implementação temporaria para facilitar a implementação das paginas
app.get('/index.html', (req, res) => {
    res.redirect('/');
});
app.get('/artigos.html', (req, res) => {
    res.redirect('/artigos');
});
app.get('/login.html', (req, res) => {
    res.redirect('/login');
});
app.get('/painel.html', (req, res) => {
    res.redirect('/painel');
});
app.get('/sobre.html', (req, res) => {
    res.redirect('/sobre');
});
app.get('/perfil.html', (req, res) => {
    res.redirect('/perfil');
});
app.get('/termos.html', (req, res) => {
    res.redirect('/termos');
});
//fim da gambiarra, delete isso depois pelo amor de Deus

app.use('/', paginas);
app.use('/api', api);
app.use('/files', express.static(pastaPublica));

app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(pastaFiles + '/erro_404.html');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

const porta = process.env.PORT || 8080;
app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));