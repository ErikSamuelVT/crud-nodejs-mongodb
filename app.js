const express = require('express');
const app = express();

require('dotenv').config();

//Configuracion para el depliegue de heroku
const port = process.env.PORT || 3000;

//Conexion BD
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@test.hpwm6.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log('Base de datos conectada!!');})
.catch((error)=>{console.log("Error de conexion: ",error);})

//Configuraciones
    //Configuracion de EJS, motor de plantillas
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");

//Middelwares
app.use(express.static( __dirname + "/public"));

//Rutas desde rutasWeb
app.use('/', require('./router/rutasWeb'));
app.use('/mascotas', require('./router/mascotas'));

//Middelware - En caso de no encontrarse un recurso
app.use((req,res,next)=>{
    res.render("404",{
        error:"Error 404!",
        footer: "Footer error"
    });
});

//Puerto del server
app.listen(port, (error)=>{
    try {
        console.log(`Server on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});