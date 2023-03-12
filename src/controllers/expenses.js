'use strict';

const {
  addExpense,
  deleteExpense,
  getAllEpenses,
  getOneExpense,
  patchExpenses,
} = require('../services/expenses');
const {
  getUser,
} = require('../services/users');

const getAll = (req, res) => {
  const queryParams = req.query;

  const filteredExpenses = getAllEpenses(queryParams);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = getOneExpense(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addOne = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getUser(+userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpenses);
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const foundExpenses = getUser(+id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(+id);

  res.sendStatus(204);
};

const patchOne = (req, res) => {
  const { id } = req.params;
  const bodyParams = req.body;

  const foundExpenses = getOneExpense(+id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  if (Object.keys(bodyParams).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updatedExpenses = patchExpenses(bodyParams, foundExpenses);

  res.send(updatedExpenses);
};

module.exports = {
  addOne,
  deleteOne,
  getAll,
  getOne,
  patchOne,
};
