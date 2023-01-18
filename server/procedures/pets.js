//#######################################################################################
let Procedure = module.exports;
//#######################################################################################

//#######################################################################################
Procedure.index = async (userid) => {
    try {
        let resultado = await petSchema.find({ user: userid }).populate({
            path: "user",
            select: "-password, -token",
        });
        return { status: 200, ok: true, data: resultado, resultado, message: "" };
    } catch (error) {
        return {
            ok: false,
            data: {},
            status: 500,
            message: error.message,
        };
    }
};
//#######################################################################################
Procedure.create = async (data) => {
    try {
        let pet = new petSchema(data);
        await pet.save();
        return { status: 201, ok: true, data: pet, message: "Mascota creada" };
    } catch (error) {
        return {
            ok: false,
            data: {},
            status: 500,
            message: error.message,
        };
    }
};
//#######################################################################################
Procedure.update = async (data, id) => {
    try
    {
        let pet_found = await petSchema.findById(id)
        if(!pet_found)
        {
            return {
                ok: false,
                data: {},
                status: 404,
                message: "Mascota NO encontrada",
            };
        }

        await pet_found.updateOne(data)
        return { status: 200, ok: true, data: {}, message: "Mascota modificada" };
    }
    catch (error) {
        return {
            ok: false,
            data: {},
            status: 500,
            message: error.message,
        };
    }
};
//#######################################################################################
Procedure.del = async (id) => {
    try
    {
        let pet_found = await petSchema.findById(id)
        if(!pet_found)
        {
            return {
                ok: false,
                data: {},
                status: 404,
                message: "Mascota NO encontrada",
            };
        }

        await pet_found.deleteOne()
        return { status: 200, ok: true, data: {}, message: "Mascota eliminada" };
    }
    catch (error) {
        return {
            ok: false,
            data: {},
            status: 500,
            message: error.message,
        };
    }
};
//#######################################################################################
