'use strict';

const express = require('express');
const router = express.Router();

const {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
} = require('../controllers/users');

router.get('/', getAll);

router.get('/:userId', getOne);

router.post('', addOne);

router.delete('/:userId', deleteOne);

router.patch('/:userId', updateOne);

module.exports = router;
