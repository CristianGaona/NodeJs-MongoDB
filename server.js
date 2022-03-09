require('dotenv').config();
const express = require('express');
let app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser'); 
const socket = require('./socket');

const router = require('./network/routes');
const req = require('express/lib/request');
const db = require('./db');

// Conexión bd
db(process.env.DB_MONGO);

app.use(cors());

// Inicializar express

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));
socket.connect(server);


router(app);
app.use('/app', express.static('public'))
server.listen(process.env.PORT, function(){
    console.log('Server is running on : ', process.env.PORT);
});
