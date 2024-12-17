const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private')

router.post('/authenticate', service.authenticate)

router.get('/dashboard', private.checkJWT, service.getUsers);

router.post('/add', private.checkJWT, service.addUser);

router.get('/:id/update', private.checkJWT, service.getUserById);

router.post('/:id', private.checkJWT, service.updateUser);

router.post('/:id/delete', private.checkJWT, service.deleteUser);


module.exports = router;
