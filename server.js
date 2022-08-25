import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import router from './router/routes.js';
import passport from 'passport';
import conectarDB from './config/db.js'
import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import cluster from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;
import logger from './utils/winston.js';


// Configuracion general
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

// Conectar a la base de datos
conectarDB();

// Configurar session 
app.use(session({
    secret:'contraseña',
    cookie:{
        httpOnly:false,
        secure:false,
        maxAge:60000 * 60,
    },
    resave:false,
    saveUninitialized:false,
    rolling:true,
})
);

// Autenticacion de passport
import './config/passport.js';
app.use(passport.initialize());
app.use(passport.session());


// Middlewares
app.use(cors(`${process.env.PORT}`));
app.use(cookieParser());


// Variable GLobal
const PORT = process.env.PORT;

// Rutas
router(app);


app.listen(PORT, () => {
    console.log('Servidor corriendo');
});