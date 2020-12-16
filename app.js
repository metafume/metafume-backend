const express = require('express');
const createError = require('http-errors');
const mongoose = require('mongoose');

const { port } = require('./configs');
const initLoaders = require('./loaders');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const { ROUTE } = require('./configs/constants');

const app = express();

initLoaders(app);

app.use(ROUTE.PRODUCTS.INDEX, productsRouter);
app.use(ROUTE.USERS.INDEX, usersRouter);
app.use(ROUTE.HEALTH, (req, res, next) => res.status(200).send('ok'));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (process.env.NODE_ENV === 'production') {
    if (err instanceof mongoose.Error) err = createError(500);
    err.stack = null;
  }

  res.status(err.status || 500);
  res.json(err);
});

app.listen(port || 5000, () => {
  console.log(`Server is running on ${port || 5000}`);
});
