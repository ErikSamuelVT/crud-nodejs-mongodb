const express = require("express");
const router = express.Router();
const Mascota = require('../models/mascota');
//Rutas

//R
router.get('/crear',(req,res)=>{
    try {
        //const newMascota = new Mascota.create();
        res.render('crearMascota',{
            titulo: "Crear Mascota",
            footer: "Footer de crear mascota"
        });
        
    } catch (error) {
        console.log("Error al mostrar la pagina de crear un elemento ", error);
    }
});

router.get('/actualizar/:idActualizar',async(req,res)=>{
    const id = req.params.idActualizar;
    try {
        const mascotaDB = await Mascota.findOne({_id: id});
        res.render('editarMascota',{
            titulo: "Editar Mascota",
            data: mascotaDB,
            footer: "Footer de editar mascota"
        });
        
    } catch (error) {
        console.log("Error al mostrar la pagina de editar un elemento ", error);
    }
})

router.get('/', async(req,res)=>{

    try {
        const arrayMascotasDB = await Mascota.find();
        res.render("mascotas", {
        titulo: "Mascotas",
        footer:"Footer Mascotas",
        arrayMascotas: arrayMascotasDB
    });

    } catch (error) {
        console.log("Error al mostrar todos los elementos ",error);
    }
});

//R - leer un solo doc
router.get('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findOne({_id: id});
        res.render('detalleMascota',{
            titulo:"Detalle",
            footer: "Footer del detalle",
            data: mascotaDB,
            error: false
        });
    } catch (error) {
        console.log("Error al mostar un solo elemento ",error);
        res.render('detalleMascota',{
            error: true,
              titulo:"Error",
            footer: "Footer del detalle",
            mensaje:"No se encuentra el id"
        });
    }
});

//C
router.post('/', async(req,res)=>{
    const body = req.body;
    try {
        await Mascota.create(body);
        res.redirect("/mascotas");
    } catch (error) {
        console.log("Error al crear el elemento ", error);
    }
});

//D
router.delete('/:idEliminar', async(req,res)=>{
    const id = req.params.idEliminar;
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id});
        if(mascotaDB){
            res.json({
                error: false,
                mensaje: "Eliminado!"
            });
        }else{
            res.json({
                error: true,
                mensaje: "No se puede eliminar"
            });
        }
    } catch (error) {
        console.log("Error al eliminar el doc ",error);
    }
});

//U
router.put('/:idAct',async(req,res)=>{
    const id = req.params.idAct;
    const body = req.body;

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false});

        res.json({
            error: false,
            mensaje: "Actualizado"
        })
    } catch (error) {
        console.log("Error al actualizar los datos ", error);
        res.json({
            error: true,
            mensaje: "No se puede actualizar"
        })
    }
});

module.exports = router;