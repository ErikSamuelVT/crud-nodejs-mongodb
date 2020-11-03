const express = require("express");
const router = express.Router();

//Rutas
router.get('/',(req,res)=>{
    res.render("index", {
        titulo: "Inicio",
        footer: "Footer index"
    });
});

router.get('/servicios',(req,res)=>{
    res.render("servicios", {
        titulo: "Servicios",
        footer: "Footer servicios"
    });
});

module.exports = router;