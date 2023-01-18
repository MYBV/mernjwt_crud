//##############################################################################
const mongoose = require("mongoose");
//##############################################################################

//##############################################################################
global.userSchema = mongoose.model(
    "user",
    mongoose
        .Schema(
            {
                name: {
                    type: String,
                    require: true,
                    min: 6,
                    max: 100,
                },
                email: {
                    type: String,
                    require: true,
                    min: 6,
                    max: 255,
                },
                password: {
                    type: String,
                    require: true,
                    minlength: 6,
                },
                token: {
                    type: String,
                    max: 255,
                },
            },
            { timestamps: true }
        )
        .index({ email: 1 }, { unique: true })
);
//##############################################################################
global.petSchema = mongoose.model(
    "pet",
    mongoose.Schema(
        {
            name: {
                type: String,
                require: true,
                min: 6,
                max: 100,
            },
            type: {
                type: String,
                require: true,
                min: 6,
                max: 255,
            },
            color: {
                type: String,
                require: true,
            },
            age: {
                type: Number,
                require: true,
            },
            user: { type: mongoose.Schema.ObjectId, ref: "user" },
        },
        { timestamps: true }
    )
);
//##############################################################################

//##############################################################################
module.exports = "Correcto-> Modelos Cargados";
//##############################################################################
