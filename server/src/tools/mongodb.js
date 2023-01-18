//##########################################################################################
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
//##########################################################################################

//##########################################################################################
module.exports = new Promise((resolve) => {
    global.mongo = mongoose.connect(
        process.env.hostMongoDB,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, db) => {
            if (err) resolve(`Error-> Conexion Con Mongo ${err}`);
            else resolve("Correcto-> Conectado Con Mongo");
        }
    );
});
//##########################################################################################
