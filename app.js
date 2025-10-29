import express from 'express'
import homeRouter from './routes/home.router.js'
import logger from './middleware/logger.middleware.js';
import studentRouter from './routes/student.router.js';
import userRouter from './routes/user.router.js'
import profileRouter from './routes/profile.router.js';
import { connectToMongoDB } from './config/db/connect.config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000
const ATLAS = false;
const ATLAS_URL = 'mongodb://127.0.0.1:27017/backend2'
//MIRAR CLASE 1 Y CONECTAR A MONGO ATLAS 

app.use (express.json());
app.use (logger);

app.use (
    session ({
        secret: 'clave_secreta',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create ({
            mongoUrl: ATLAS_URL,
            ttl: 60 * 60, // 1 hora en segundos
        }),

        //QUE CHAT GPT TE EXPLIQUE LO DE LA COOKIE LINEA POR LINEA
        cookie: {
            maxAge: 1 * 60 * 60 * 1000, //Esto tambien es una hora pero en milisegundos
            httpOnly: true,
        }
    }) 
);
app.use (cookieParser ('clave_secreta'));


app.use ('/', homeRouter)
app.use ('/student', studentRouter)
app.use ('/auth', userRouter)
app.use ('/auth/profile', profileRouter)

const startServer = async () => {
ATLAS ? await connectToMongoDBAtlas (): await connectToMongoDB ()
    app.listen (PORT, ()=> console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

await startServer ();