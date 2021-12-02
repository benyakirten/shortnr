const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const apiRoutes = require('./routes/api');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/shortnr')
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(`Error connecting to MongoDB: ${err.message}`));

const app = express();
app.use(mongoSanitize());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.all('/api/*', (_, _2, next) => {
  next(new Error('Route not found'));
});

app.use((err, _, res, _2) => {
  const status = err.message === 'Route not found' ? 404 : 500;
  res.status(status).json({
    status: 'error',
    message: err.message ? err.message : 'An error occurred'
  });
});

const port = process.env.GATHERLY_PORT || 3001;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
