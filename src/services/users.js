'use strict';

const { getNewId } = require('../utils/getNewId');
let users = [];

const backupUsers = () => {
  users = [];
};

const getAllUsers = () => {
  return users;
};

const getUser = (userId) => {
  return users.find(user => user.id === +userId);
};

const addUser = (name) => {
  const newUser = {
    name,
    id: getNewId(users),
  };

  users.push(newUser);

  return newUser;
};

const deleteUser = (userId) => {
  users = users.filter(user => user.id !== userId);
};

const patchUser = (userId, name) => {
  const foundedUser = getUser(userId);

  return Object.assign(foundedUser, { name });
};

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  backupUsers,
  patchUser,
};
