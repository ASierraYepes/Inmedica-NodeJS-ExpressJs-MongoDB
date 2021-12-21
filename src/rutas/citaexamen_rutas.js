const { Router }= require("express");
const citaexamen_rutas = Router();
const {examen_model} = require("../modelos/examen_model");
const {user_model} = require("../modelos/user_model");
const {agenda_model} = require("../modelos/agenda_model");
const {citaexamen_model} = require("../modelos/citaexamen_model");


citaexamen_rutas.post("/grabar_ce",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos  = req.body;
    const codigo = datos.codigo;
    const typeDoc = datos.typeDoc;
    const doc     = datos.doc;
    const fecha   = datos.fecha;
    const hora    = datos.hora
    // Verifico Usuario Exista
    user_model.findOne({$and:[{typeDoc},{doc}]},function(erroru, usu){
        if ( usu !== null ){
            // Verifico Examen Exista
            examen_model.findOne({codigo},function(errore, examen){
                if (examen !== null){
                    // Verifico que exista agenda
                    agenda_model.findOne({$and:[{fecha},{hora}]},function(errora, agenda){
                        if (agenda !== null){
                            // Verifico que la cita este libre 
                            //if ( agenda.estado === 0 ){
                            citaexamen_model.findOne({$and:[{fecha},{hora}]},function(errorc, cita){    
                                if (cita === null){
                              //Guardar esos datos
                                    const cita = new citaexamen_model(datos);
                                    cita.save(function(err){
                                        if(err){
                                            res.status(500).send({estado:"ERROR",msg:"La cita no se programó"});
                                            return false;
                                        }
                                        return res.status(200).send({estado:"OK",msg:"La cita se programó con éxito"});
                                    })    
                                }else{
                                    res.status(500).send({estado:"ERROR",msg:"La cita no se programó, horario ocupado"});
                                    return false;
                                }
                            })        
                            //}   
                        }else{
                            res.status(500).send({estado:"ERROR",msg:"El horario no existe"});
                            return false;                        
                        }    
                    })    
                }else{
                    res.status(500).send({estado:"ERROR",msg:"El examen no existe"});
                    return false;                        
                }    
            })
        }else{
            res.status(500).send({estado:"ERROR",msg:"El usuario no existe"});
            return false;                                    
        }        
    })              
});

//ok
citaexamen_rutas.get("/consulta_ce",function(req,res){
    // Capturar lo que esta en la caja de texto: la de Nombre
    const datos  = req.body;
    const typeDoc = datos.typeDoc;
    const doc     = datos.doc;
    user_model.findOne({$and:[{typeDoc},{doc}]},function(erroru, usu){
        if ( usu !== null ){    
            citaexamen_model.findOne({codigo},function(errorc,cexamen){
                if (error){
                    res.send({status:"ERROR!!!",msg:"La cita para Examen no fue encontrado"});
                    return false;        
                }
                else{
                    if (cexamen !== null){
                        res.send({status:"Ok",msg:"La cita para examen fue encontrado",dato:cexamen});            
                    }
                    else{
                        res.send({status:"ERROR!!!",msg:"La cita para examen no fue Encontrado"});
                    }
                }
            })
        }else{
            res.send({status:"ERROR!!!",msg:"El paciente no fue Encontrado"});
        }
    })        
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});
//ok
citaexamen_rutas.get("/listar_ce",function(req,res){
    citaexamen_model.find({},function(error,citas){
        // console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene citas"})
            return false;
        }
        else {
            res.status(200).json({citas})
            return true;
        }     
    })        
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});

//userDashboard_rutas.delete("/eliminar/:doc", function(req,res){
//    user_model.deleteOne({doc: req.params.doc}).then((resultado) => {
//        res.status(200).json({resultado});
//    })
//})

citaexamen_rutas.delete("/eliminar_c/:_id", function(req,res){
    citaexamen_model.deleteOne({_id: req.params._id}).then((resultado) => {
        res.status(200).json({resultado});
    })
})

citaexamen_rutas.post("/actualizar_ce",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos  = req.body;
    const _id = datos._id;
    const typeDoc = datos.typeDoc;
    const doc     = datos.doc;
    const fecha   = datos.fecha;
    const hora    = datos.hora
    // Verifico Usuario Exista
    agenda_model.findOne({$and:[{fecha},{hora}]},function(errora, agenda){
        if (agenda != null){
            // Verifico que la cita este libre 
            //if ( agenda.estado === 0 ){
            citaexamen_model.findOne({$and:[{fecha},{hora}]},function(errorc, cita){    
                if (cita == null){
              //Guardar esos datos
              console.log(_id);
              citaexamen_model.updateOne({_id}, datos,
                function(error, info){
                    if (error) {
                        res.json({
                            resultado: false,
                            msg: 'No se pudo actualizar la cita',
                            err
                        });
                    } else {
                        res.json({
                            resultado: true,
                            msg: 'Cita actualizada con exito',
                            info: info
                        })
                    }
                    })    
                }else{
                    res.status(500).send({estado:"ERROR",msg:"La cita no se actualizó, Horario ocupado"});
                    return false;
                }
            })      
    }})
});

exports.citaexamen_rutas=citaexamen_rutas;