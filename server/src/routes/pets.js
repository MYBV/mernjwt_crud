//###################################################################################
const { Router } = require("express");
const router = Router();
const { messageGeneral } = require("../tools/messages");
//###################################################################################

//###################################################################################
let index = async (req, res, next) => {
    let { index } = require("../procedures/pets");
    let resultado = await index(req.session.userid);
    return messageGeneral(
        res,
        resultado.status,
        resultado.ok,
        resultado.data,
        resultado.message
    );
};
//###################################################################################
let create = async (req, res, next) => {
    if (!req.body.hasOwnProperty("name")) {
        return messageGeneral(res, 400, false, {}, "Falta Nombre Mascota");
    }

    if (!req.body.hasOwnProperty("type")) {
        return messageGeneral(res, 400, false, {}, "Falta Clase Mascota");
    }

    if (!req.body.hasOwnProperty("color")) {
        return messageGeneral(res, 400, false, {}, "Falta Color Mascota");
    }

    if (!req.body.hasOwnProperty("age")) {
        return messageGeneral(res, 400, false, {}, "Falta Edad Mascota");
    }

    let data = Object.assign({}, req.body);

    data.user = req.session.userid;

    let { create } = require("../procedures/pets");
    let resultado = await create(data);

    return messageGeneral(
        res,
        resultado.status,
        resultado.ok,
        resultado.data,
        resultado.message
    );
};
//###################################################################################
let update = async (req, res, next) => {
    if (!req.body.hasOwnProperty("name")) {
        return messageGeneral(res, 400, false, {}, "Falta Nombre Mascota");
    }

    if (!req.body.hasOwnProperty("type")) {
        return messageGeneral(res, 400, false, {}, "Falta Clase Mascota");
    }

    if (!req.body.hasOwnProperty("color")) {
        return messageGeneral(res, 400, false, {}, "Falta Color Mascota");
    }

    if (!req.body.hasOwnProperty("age")) {
        return messageGeneral(res, 400, false, {}, "Falta Edad Mascota");
    }

    let data = Object.assign({}, req.body);

    data.user = req.session.userid;

    let { update } = require("../procedures/pets");
    let resultado = await update(data, req.params.id);

    return messageGeneral(
        res,
        resultado.status,
        resultado.ok,
        resultado.data,
        resultado.message
    );
};
//###################################################################################
let del = async (req, res, next) => {

    let {del} = require('../procedures/pets')
    let resultado = await del(req.params.id);

    return messageGeneral(
        res,
        resultado.status,
        resultado.ok,
        resultado.data,
        resultado.message
    );
};
//###################################################################################

//###################################################################################
router.get("/", acceso, index);
router.post("/", acceso, create);
router.put("/:id", acceso, update);
router.delete("/:id", acceso, del);
//###################################################################################

//###################################################################################
module.exports = router;
//###################################################################################
