'use strict';

const { getNewId } = require('../utils/getNewId');
let expenses = [];

const backupExpenses = () => {
  expenses = [];
};

const getAllEpenses = (queryParams) => {
  const { userId, categories, from, to } = queryParams;

  let filteredExpenses = [...expenses];

  const category = Array.isArray(categories)
    ? categories
    : [categories];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => category.includes(expense.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};

const getOneExpense = (id) => {
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense;
};

const addExpense = (userId, spentAt, title, amount, category, note) => {
  const expensesIds = expenses.map(expense => expense.id);

  const newExpenses = {
    id: getNewId(expensesIds),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const deleteExpense = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const patchExpenses = (bodyParams, foundExpenses) => {
  for (const param in bodyParams) {
    Object.assign(foundExpenses, bodyParams[param]);
  }

  return foundExpenses;
};

module.exports = {
  addExpense,
  deleteExpense,
  getAllEpenses,
  getOneExpense,
  patchExpenses,
  backupExpenses,
};
