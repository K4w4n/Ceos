import express from 'express';
import path from 'path';
import paginas from './src/views/paginas.js';
import api from './src/controllers/api.js';
import createEngine from 'express-react-views';
import cors from 'cors';

const __dirname = path.resolve();
const app = express();
const pastaPublica = path.join(__dirname, '/src/views/files/');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine.createEngine());

api.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', '86400');
    next();
});

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

const porta = process.env.PORT || 8080;
app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));