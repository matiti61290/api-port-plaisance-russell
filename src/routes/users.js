const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private')

router.post('/authenticate', service.authenticate)

router.get('/dashboard', private.checkJWT, service.getUsers);

router.get('/:id', service.getUserById);

router.post('/add', private.checkJWT, service.addUser);

router.patch('/:id', private.checkJWT, service.updateUser);

router.post('/delete', private.checkJWT, service.deleteUser);



module.exports = router;
