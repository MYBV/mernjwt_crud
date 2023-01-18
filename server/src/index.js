//#####################################################################################################
// Modulos Externos Inicio
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// Modulos Externos Fin
//#####################################################################################################

//#####################################################################################################
function cargar_variables_entorno() {
    if (!process.env.hasOwnProperty("pm_id")) {
        const variables = require("./ecosystem.config");

        let entorno = String();

        if (process.argv.length === 3) {
            if (process.argv[2] == "pro") entorno = "env_production";
            else {
                entorno = "env";
            }
        } else entorno = "env";

        process.env = variables.apps[0][entorno];
        console.log(`Corriendo Con NPM ( ${process.env.NODE_ENV} ) `);
    } else console.log(`Corriendo Con PM2 ( ${process.env.NODE_ENV}) `);
}
//#####################################################################################################

//#####################################################################################################
async function inicio() {
    app.use(compression());
    cargar_variables_entorno();

    let status = require("./tools/globales"); //Cargamos varibles globales
    console.log(Color_1, status);

    status = await require("./tools/mongodb"); //Conexion Mongo
    console.log(Color_1, status);

    if (status == "Correcto-> Conectado Con Mongo") {
        status = await require("./tools/routes"); //Cargamos Rutas
        console.log(Color_1, status);

        status = await require("./tools/modelosmongo");
        console.log(Color_1, status);

        status = await require("./middleware/sessiones");
        console.log(Color_1, status);

        app.use(logger("dev"));
        app.use(bodyParser.json({ limit: "50mb" }));
        app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); //Tamano De 50MB
        app.use(cookieParser());
        app.use(cors({ origin: "*" }));

        for (let valor of listado_routes)
            app.use(valor.path, require(valor.ruta)); //Instancia cada ruta del sistema

        console.log("Puertoooooooooooooooooo ", process.env.API_PORT);

        http_server.createServer(app).listen(process.env.API_PORT);

        let f_actual = CalendarDate.now().toFormat("yyyy-LL-dd HH:mm:ss");
        console.log(
            ColAviso,
            `===> ${process.env.Api_Nombre}, Funcionando ${f_actual} <===`
        );
    } else {
        console.log(
            ColDanger,
            `Error -> No Se pudo Conectar Con la Base De Datos`
        );
    }
}
//#####################################################################################################

//#####################################################################################################
inicio();
//#####################################################################################################
