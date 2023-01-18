//#####################################################################################################
const { messageGeneral } = require("../tools/messages");
//#####################################################################################################

//#####################################################################################################
global.acceso = async (req, res, next) => {
    //Control de acceso a las rutas con authorization en headers
    if (req.headers.hasOwnProperty("authorization")) {
        let token = req.headers.authorization.split("Bearer ")[1];

        if (!token) {
            return messageGeneral(res, 401, false, null, "Token no definido");
        }

        JWT.verify(token, process.env.API_JWT, async (error, payload) => {
            if (error) {
                return messageGeneral(
                    res,
                    401,
                    false,
                    null,
                    "No tienes acceso a este recurso"
                );
            }

            const { id } = payload;

            const user_found = await userSchema.findById(id);
            if (!user_found) {
                return messageGeneral(res, 401, false, null, "Token invalido");
            }
            req.session = { userid: id };
            next();
        });
    } else {
        return messageGeneral(res, 401, false, null, "Autorizacion faltante");
    }
};
//#####################################################################################################

//#####################################################################################################
module.exports = "Correcto-> Modulo De Autorizacion Cargado";
//#####################################################################################################
