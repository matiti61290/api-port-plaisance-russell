const express = require('express');
const router = express.Router({ mergeParams: true });

const private = require('../middlewares/private');
const service = require('../services/reservations');



// router.get('/', (req, res) => {
//     console.log('ID de la catway dans reservations.js :', req.params.id); // Log ici
//     // Ici, tu peux appeler ta fonction service.getReservations
//     res.status(200).json({ message: 'Réservations pour la catway ' + req.params.id });
// });
router.get('/', private.checkJWT, service.getReservations)

router.get('/:idReservation', private.checkJWT, service.getReservation)

router.post('/reservations', private.checkJWT, service.addReservation)

router.delete('/:idReservation', private.checkJWT, service.deleteReservation)

module.exports = router