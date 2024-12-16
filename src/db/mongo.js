const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser : true,
    dbName : 'apiportdeplaisancerussell'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
    } catch (error) {
        console.log(error);
        throw error;
    }
}