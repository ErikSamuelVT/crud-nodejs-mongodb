const express = require("express");
const router = express.Router();
const Mascota = require('../models/mascota');

router.get('/', async(req,res)=>{

    try {
        const arrayMascotasDB = await Mascota.find();
        res.render("mascotas", {
        titulo: "Mascotas",
        footer:"Footer Mascotas",
        arrayMascotas: arrayMascotasDB
    });

    } catch (error) {
        console.log("Error de consuta",error);
    }
});

module.exports = router;