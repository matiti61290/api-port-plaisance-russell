const Reservation = require('../models/reservation');
const Catway = require('../models/catway')
const { format } = require('date-fns');
const reservation = require('../models/reservation');

// Callback to find reservations
exports.getReservations = async(req, res, next) => {
    const catwayId = req.params.id

    try{
        let catway = await Catway.findById(catwayId)

        let reservations = await Reservation.find({ catwayNumber: catway.catwayNumber })

        if (reservations) {
            return res.status(200).json(reservations)
        }

        return res.status(404).json('Reservations_not_found')
    } catch (error){
        return res.status(500).json(error)
    }
}

exports.getReservation = async(req, res, next) => {
    const catwayId = req.params.id;
    const reservationId = req.params.idReservation;

    try {
        let catway = await Catway.findById(catwayId);

        let reservation = await Reservation.findOne({
            _id: reservationId,
            catwayNumber: catway.catwayNumber
        })

        if (reservation) {
            return res.status(200).json(reservation)
        }

        return res.status(404).json('Reservation_not_found')
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.addReservation = async (req, res, next) => {
    const catwayId = req.params.id;
    const { clientName, boatName, checkIn, checkOut } = req.body;

    try {
        // Vérifier si Catway existe
        const catway = await Catway.findById(catwayId);
        if (!catway) {
            return res.status(404).json('Catway_not_found');
        }

        // Fonction de formatage de la date
        const parseAndFormatDate = (dateString) => {
            const [day, month, year] = dateString.split('/');
            if (!day || !month || !year) {
                return res.status(400).json({ message: 'Date format is invalid' }); // Utilisation d'un code d'erreur plus précis
            }
            const formattedDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`);
            return format(formattedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        };

        // Vérification de la validité des dates
        const formattedCheckIn = parseAndFormatDate(checkIn);
        const formattedCheckOut = parseAndFormatDate(checkOut);

        // Créer la réservation
        const reservation = await Reservation.create({
            catwayNumber: catway.catwayNumber,
            clientName: clientName.trim(),
            boatName: boatName.trim(),
            checkIn: formattedCheckIn,
            checkOut: formattedCheckOut,
        });

        // Retourner la réponse avec la réservation créée
        return res.status(201).json(reservation);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la réservation:', error); // Ajout d'un log pour mieux comprendre l'erreur
        return res.status(500).json({ message: 'Server_error', error });
    }
};

exports.deleteReservation = async(req, res, next) => {
    const catwayId = req.params.id
    const reservationId = req.params.idReservation;

    try{
        const catway = await Catway.findById(catwayId);
        if (!catway) {
            return res.status(404).json('Catway_not_found');
        }
        
        await reservation.deleteOne({_id: reservationId })

        return res.status(201).json('Deleted_success')
    } catch (error) {
        return res.status(501).json(error)
    }
}