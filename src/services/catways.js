const catway = require('../models/catway');
const Catway = require('../models/catway');

// Callback to get all catways
exports.getCatways = async(req, res, next) => {
    try {
        const catways = await Catway.find().sort({ catwayNumber: 1});

        if (catways) {
            return res.render('catways', { catways });
        }
        
        return res.status(404).json("catways_not_found");
    } catch (error) {
        return res.status(501).json(error)
    }
};

// Callback to get a catway with ID
exports.getCatwayById = async (req, res, next) => {
    const id = req.params.id;

    try{
        let catway = await Catway.findById(id);

        if (catway) {
            return res.render('catwayDetails', {catway})
        }

        return res.status(404).json("catway_not_found")
    } catch (error) {
        return res.status(501).json(error)
    }
};

// Callback to add a catway
exports.addCatway = async(req, res, next) => {
    const { catwayNumber, type, catwayState} = req.body

    try{
        const existingCatway = await Catway.findOne({ catwayNumber })
        if (existingCatway) {
            return res.render('dashboard', {
                errorMessage: "Le catway a ce numero existe deja",
                formData: req.body,
                user: req.user,
                users: {}
            });
        }

        const catway = await Catway.create ({ catwayNumber, type, catwayState });
        
        return res.redirect(`/catways/${ catway.id }`)
    } catch (error) {
        return res.status(501).json(error)
    }
}

// Callback pour modifier
exports.updateCatway = async(req, res, next) => {
    const id = req.params.id
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    });

    try{
        let catway = await Catway.findOne({_id: id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key]
                }
            });

            await catway.save();
            return res.redirect(`/catways/${catway.id}`);
        }
        return res.status(404).json("catway_not_found")
    } catch (error) {
        return res.status(501).json(error)
    }
}

// Callback to delete a catway
exports.deleteCatway = async(req, res, next) => {
    const id = req.params.id

    try{
        await catway.deleteOne({_id: id});

        return res.redirect('/catways/')
    } catch (error) {
        return res.status(501).json(error)
    }
}