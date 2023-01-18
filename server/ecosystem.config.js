module.exports = {
    apps: [{

        name: "mernjwt_crud",
        script: "./app.js",
        env: {
            "NODE_ENV": "development",
            "Api_Nombre":"Server MERN Auth JWT development",
            "API_PORT":5000,
            "API_JWT":"JWT_Auth_Dev*0001",
            "JWT_EXPIRE": "2d",
            "hostMongoDB" : "mongodb://localhost:27017/auth_jwt"
        },  

        env_production: {
            "NODE_ENV": "production",
            "Api_Nombre":"Server MERN Auth JWT production",
            "API_PORT":5000,
            "API_JWT":"JWT_Auth_Pro*0001",
            "JWT_EXPIRE": "2d",
            "hostMongoDB" : "mongodb://localhost:27017/auth_jwt"
        }, 
    }]
}