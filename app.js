const express = require('express');

const { port } = require('./configs');
const initLoaders = require('./loaders');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const app = express();

initLoaders(app);

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(port || 5000, () => {
  console.log(`Server is running on ${port || 5000}`);
});
