const express = require('express');
const router = express.Router();

const private = require('../middlewares/private');
const service = require('../services/reservations');



router.get('/', (req, res) => {
    console.log('ID de la catway dans reservations.js :', req.params.id); // Log ici
    // Ici, tu peux appeler ta fonction service.getReservations
    res.status(200).json({ message: 'Réservations pour la catway ' + req.params.id });
});
// router.get('/', private.checkJWT, service.getReservations)

module.exports = router