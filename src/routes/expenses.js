'use strict';

const {
  addOne,
  deleteOne,
  getAll,
  getOne,
  patchOne,
} = require('../controllers/expenses');

const express = require('express');
const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.post('/', addOne);

router.delete('/:id', deleteOne);

router.patch('/:id', patchOne);

module.exports = router;
