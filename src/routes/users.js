const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private')


router.get('/:id', service.getUserById);

router.post('/add', private.checkJWT, service.addUser);

router.patch('/:id', private.checkJWT, service.updateUser);

router.post('/delete', private.checkJWT, service.deleteUser);

router.post('/authenticate', service.authenticate)

module.exports = router;
