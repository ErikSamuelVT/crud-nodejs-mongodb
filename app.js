const express = require('express');
const app = express();
const port = 3000;

//Configuraciones
    //Configuracion de EJS, motor de plantillas
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");

//Middelwares
app.use(express.static( __dirname + "/public"));

//Rutas
app.get('/',(req,res)=>{
    res.render("index", {
        titulo: "Inicio",
        footer: "Footer index"
    });
});

app.get('/servicios',(req,res)=>{
    res.render("servicios", {
        titulo: "Servicios",
        footer: "Footer servicios"
    });
});

//En caso de no encontrarse un recurso
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