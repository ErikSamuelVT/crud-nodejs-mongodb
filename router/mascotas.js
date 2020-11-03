const express = require("express");
const router = express.Router();
const mascota = require('../models/mascota');

router.get('/', async(req,res)=>{

    try {
        const arrayMascotasDB = await mascota.find();

        res.render("mascotas", {
        titulo: "Mascotas",
        footer:"Footer Mascotas",
        arrayMascotas: arrayMascotasDB
    });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;