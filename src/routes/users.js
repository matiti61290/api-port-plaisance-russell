const express = require('express');
const router = express.Router();

const service = require('../services/users');

router.get('/:id', service.getUserById);

router.put('/add', service.addUser);

router.patch('/:id', service.updateUser);

router.delete('/:id', service.deleteUser);

module.exports = router;
