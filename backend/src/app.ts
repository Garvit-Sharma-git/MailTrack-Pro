import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';


const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (_req, res) => res.send('Email Tracker API'));
app.use('/api', routes);


app.use(errorHandler);


export default app;