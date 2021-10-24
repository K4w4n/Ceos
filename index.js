import paginas from './paginas.js';
import createEngine from 'express-react-views';
import api from './api.js';
import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express();
const pastaPublica = path.join(__dirname, '/src/views/files/');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine.createEngine());

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
//fim da gambiarra, delete isso depois pelo amor de Deus

app.use('/', paginas);
app.use('/api', api);
app.use('/files', express.static(pastaPublica));

app.get('*', function (req, res) {
    res.status(404).send('404 a pagina não existe');
});

const porta = process.env.PORT || 8080;
app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));