import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';

dotenv.config();

const apiRoutes = require('./routes/api');

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/shortnr')
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err: Error) => console.error(`Error connecting to MongoDB: ${err.message}`));

const app = express();
app.use(mongoSanitize());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.all('/api/*', (_, _2, next) => {
  next(new Error('Route not found'));
});

app.use((err: Error, _: Request, res: Response, _2: NextFunction) => {
  const status = err.message === 'Route not found' ? 404 : 500;
  res.status(status).json({
    status: 'error',
    message: err.message ? err.message : 'An error occurred'
  });
});

const port = process.env.SHORTNR_PORT ?? 3001;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

export default app;
