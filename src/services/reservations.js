const Reservation = require('../models/reservation');

// Callback to find reservations
exports.getReservations = async(req, res, next) => {
    const catwayId = req.params.id
    console.log(catwayId)

    try{
        const reservations = await Reservation.find({ catwayNumber: catwayId});
        if (reservations) {
            return res.status(200).json(reservations);
        }
        return res.status(404).json('reservations_not_found');
    } catch (error) {
        return res.status(500).json(error)
    }
}