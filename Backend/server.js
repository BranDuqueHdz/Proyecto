const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

/*
* IMPORTAR LAS RUTAS
*/

const users = require('./routes/userRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-power-by');

app.set('port', port);

/*
* LLAMADO DE LAS RUTAS
*/

userRoutes(app);

server.listen(3000, '192.168.180.51' || 'localhost', function() {
    console.log(' Aplicacion de NodeJS ' + port + ' iniciada... ')
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

app.get('/test', (req, res) => {
    res.send('Este es la ruta test');
});

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});




//200 - Es una respuesta exitosa
//404 - Significa que la URL no existe
//500 - Es un error interno del servidor