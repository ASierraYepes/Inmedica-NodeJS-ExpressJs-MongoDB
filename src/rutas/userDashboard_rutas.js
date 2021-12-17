const { Router }= require("express");
const userDashboard_rutas = Router();
const {user_model} = require("../modelos/user_model");

userDashboard_rutas.get("/listar",function(req,res){
    user_model.find({},function(error,usuarios){
        // console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene usuarios"})
            return false;
        }
        else {
            res.status(200).json({usuarios})
            return true;
        }     
    })
});

userDashboard_rutas.post("/agregar", function(req,res){
    const datos = req.body;
    console.log(datos)
    const user = new user_model(datos)
    user.save(function(err){
        if(err){
            res.send({status:"Error",msg:"El usuario no fue guardado satisfactoriamente"})
            return false;
        }
        res.send({status:"Ok",msg:"El usuario fue agregado satisfactoriamente"})
    })
});

userDashboard_rutas.post("/consultar",function(req,res){
    // Capturar lo que esta en la caja de texto: la de Nombre
    const {nom}=req.body;
    // Buscar ese jugador en la BD
    user_model.findOne({nom},function(error,usu){
        if (error){
            res.send({status:"ERROR!!!",msg:"Usuario no encontrado"});
            return false;        
        }
        else{
            if (usu !== null){
                res.send({status:"Ok",msg:"Usuario encontrado",dato:usu});            
            }
            else{
                res.send({status:"ERROR!!!",msg:"Usuario no Encontrado"});
            }
        }
    })
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});

userDashboard_rutas.put("/actualizar", function(req, res) {
    const datos = req.body;
    const doc   = datos.doc;
    user_model.updateOne({doc}, datos,
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el usuario',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});


userDashboard_rutas.delete("/eliminar/:doc", function(req,res){
    user_model.deleteOne({doc: req.params.doc}).then((resultado) => {
        res.status(200).json({resultado});
    })
})

exports.userDashboard_rutas=userDashboard_rutas;