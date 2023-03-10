'use strict';

const {
  addUser,
  getAllUsers,
  getUser,
  deleteUser,
  patchUser,
} = require('../services/users');

const getAll = (req, res) => {
  const usersFromServer = getAllUsers();

  res.send(usersFromServer);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundedUser = getUser(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;

  const foundedUser = getUser(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  deleteUser(+userId);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  let foundedUser = getUser(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  foundedUser = patchUser(+userId, name);
  res.send(foundedUser);
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
