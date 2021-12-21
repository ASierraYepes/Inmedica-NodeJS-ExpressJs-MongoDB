//const {compare} = require("bcrypt"); //Encriptar contraseñas
const { Router }= require("express");
const user_rutas = Router();
const {user_model} = require("../modelos/user_model");
// const { sing } = require("jsonwebtoken");
// const {guardian} = require("../guardian/guardian");

user_rutas.post("/registrar",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos = req.body;
    const doc = datos.doc;
    user_model.findOne({doc},function(error, usuario){
        if (usuario === null){
            //Guardar esos datos
            const user = new user_model(datos);
            user.save(function(err){
                if(err){
                    res.status(500).send({estado:"ERROR",msg:"El usuario ya se encuentra registrado!!!"});
                    return false;
                }
                return res.status(200).send({estado:"OK",msg:"El usuario registrado exitosamente!"});
            })        
        }
        else{  
            if (usuario !== null){
                res.send({status:"Ok",msg:"El usuario ya se encuentra registrado"});            
            }
            // else{
            //     res.send({status:"ERROR!!!",msg:"El usuario no se registro"});
            // }     
        }
    })
    
});

exports.user_rutas=user_rutas;