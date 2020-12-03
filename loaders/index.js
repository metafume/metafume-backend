const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const dbLoader = require('./db');

const initLoaders = app => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  dbLoader();
};

module.exports = initLoaders;
