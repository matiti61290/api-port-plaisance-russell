const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, service.getCatways);

router.get('/:id', private.checkJWT, service.getCatwayById);

router.post('/', private.checkJWT, service.addCatway);

router.patch('/:id', private.checkJWT, service.updateCatway);

router.delete('/:id', private.checkJWT, service.deleteCatway)

module.exports = router