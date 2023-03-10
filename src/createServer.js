'use strict';

const express = require('express');
const cors = require('cors');
const { backupUsers } = require('./services/users');
const {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
} = require('./controllers/users');

function createServer() {
  backupUsers();

  const server = express();

  server.use(cors());

  server.get('/users', getAll);

  server.post('/users', express.json(), addOne);

  server.get('/users/:userId', express.json(), getOne);

  server.delete('/users/:userId', express.json(), deleteOne);

  server.patch('/users/:userId', express.json(), updateOne);

  return server;
}

module.exports = {
  createServer,
};
