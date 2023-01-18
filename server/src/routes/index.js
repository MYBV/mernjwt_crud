//###############################################################################################################
const { Router } = require("express");
const router = Router();
const { messageGeneral } = require("../tools/messages");
//###############################################################################################################

//###############################################################################################################
let index = (req, res, next) => {
    return messageGeneral(res, 200, true, {}, process.env.Api_Nombre);
};
//###############################################################################################################
let login = async (req, res, next) => {
    if (!req.body.hasOwnProperty("email")) {
        return messageGeneral(res, 400, false, {}, "Falta Email Usuario");
    }

    if (!req.body.hasOwnProperty("password")) {
        return messageGeneral(res, 400, false, {}, "Falta Password Usuario");
    }

    let data = Object.assign({}, req.body);

    let { login } = require("../procedures/auth");
    let resultado = await login(data);

    return messageGeneral(
        res,
        resultado.status,
        resultado.ok,
        resultado.data,
        resultado.message
    );
};
//###############################################################################################################
let register = async (req, res, next) => {
    if (!req.body.hasOwnProperty("name")) {
        return messageGeneral(res, 400, false, {}, "Falta Nombre Usuario");
    }

    if (!req.body.hasOwnProperty("email")) {
        return messageGeneral(res, 400, false, {}, "Falta Email Usuario");
    }

    if (!req.body.hasOwnProperty("password")) {
        return messageGeneral(res, 400, false, {}, "Falta Password Usuario");
    }

    let data = Object.assign({}, req.body);

    let { validar_email } = require("../procedures/auth");

    let resultado = await validar_email(data.email);
    if (resultado.status != 200) {
        return messageGeneral(
            res,
            resultado.status,
            resultado.ok,
            resultado.data,
            resultado.message
        );
    }

    let { register } = require("../procedures/auth");
    resultado = await register(data);

    return messageGeneral(
        res,
        resultado.status,
        resultado.ok,
        resultado.data,
        resultado.message
    );
};
//###############################################################################################################

//###############################################################################################################
router.get("/", index);
router.post("/login", login);
router.post("/register", register);
//###############################################################################################################

//###############################################################################################################
module.exports = router;
//###############################################################################################################
