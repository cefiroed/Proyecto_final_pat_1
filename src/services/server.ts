import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { ErrorRequestHandler } from 'express';


const app = express();

export const publicFolderPath = path.resolve(__dirname, '../../public');

app.use(express.static(publicFolderPath));

app.use(express.json());
app.use('/api', apiRouter)


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`THERE WAS A MISTAKE ${err}`);
    res.status(500).json({
      err: err.message,
    });
};
  
app.use(errorHandler);

const myServer = new http.Server(app);

export default myServer;