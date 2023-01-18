//##############################################################################
let Procedure = module.exports;
//##############################################################################

//##############################################################################
Procedure.login = async (data) => {

    let user_found = await userSchema.findOne({ email: data.email });
    if (!user_found)
    {
        return {
            ok: false,
            data: {},
            status:404,
            message: "Usuario NO registrado"
        }
    }
    
    let pass_macth = await bcrypt.compare(data.password, user_found.password);
    if (!pass_macth) {
        return {
            ok: false,
            data: {},
            status:400,
            message: "Credenciales invalidas"
        }
    }

    let token = await JWT.sign({ id: user_found._id }, process.env.API_JWT, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    await userSchema.findOneAndUpdate(
        { email: data.email },
        { token: token },
        { new: true }
    );

    return {
        ok: true,
        data: { ...user_found._doc, password: null, token },
        status:200,
        message: "Bienvenido"
    }
};
//##############################################################################
Procedure.validar_email = async (email) => {
    let email_found = await userSchema.findOne({ email: email });
    if (email_found)
        return {
            ok:false,
            status: 400,
            data:{},
            message: "Email ya registrado"
        };

    return {ok:true, status: 200, message: "Email disponible", data: {}};
};
//##############################################################################
Procedure.register = async (data) => {
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(data.password, salt);

    data.password = hashPassword;

    try {
        let user = new userSchema(data);

        await user.save();

        let token = await JWT.sign({ id: user._id }, process.env.API_JWT, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        await userSchema.findOneAndUpdate(
            { email: data.email },
            { token: token },
            { new: true }
        );

        return {
            ok:true,
            status: 201,
            data: {
                ..._omit(user._doc, ['password']), token
            },
            message: "Usuario Registrado",
        };
    } catch (error) {
        return {
            ok:false,
            status: 500,
            message: error.message,
            data: {}
        };
    }
};
//##############################################################################
