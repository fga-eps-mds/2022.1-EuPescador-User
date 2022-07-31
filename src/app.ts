import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import router from './routes/router';

require('dotenv').config();

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());

app.use(router);

export default app;
