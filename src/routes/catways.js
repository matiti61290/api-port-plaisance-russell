const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');
const reservationRoutes = require('./reservations')

router.post('/:id/update', private.checkJWT, service.updateCatway);

router.post('/:id/delete', private.checkJWT, service.deleteCatway);

router.use('/:id/reservation', reservationRoutes);

router.get('/:id', private.checkJWT, service.getCatwayById);

router.get('/', private.checkJWT, service.getCatways);

router.post('/', private.checkJWT, service.addCatway);

module.exports = router