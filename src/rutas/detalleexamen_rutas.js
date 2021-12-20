const { Router }= require("express");
const detalleexamen_rutas = Router();
const {examen_model} = require("../modelos/examen_model");
const {detalleexamen_model} = require("../modelos/detalleexamen_model");
// ok
detalleexamen_rutas.post("/grabar_de",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos  = req.body;
    const codigo = datos.codigo;
    const descripcion_valor = datos.descripcion_valor;
    //Buscar en examen Codigo de Examen
    //console.log("Entro 1");
    examen_model.findOne({codigo},function(error, examen){
        //console.log("Entro 2");
        if (examen !== null){
            //console.log("Entro 3");
            detalleexamen_model.findOne({$and:[{codigo},{descripcion_valor}]},function(derror, dexamen){
                //console.log("Entro 4");
                if (dexamen === null){
            //Guardar esos datos
                    //console.log("Entro 5");
                    const dexameng = new detalleexamen_model(datos);
                    dexameng.save(function(err){
                    if(err){
                        //console.log("Entro 6");
                        res.status(500).send({estado:"ERROR",msg:"El detalle Examen ya se encuentra registrado!!!"});
                        return false;
                    }
                    return res.status(200).send({estado:"OK",msg:"Se agrego detalle de examen exitosamente!"});
                    })        
                }
                else{  
                    if (dexamen !== null){
                        res.send({status:"Ok",msg:"El datalle del Exaen ya se encuentra Registrado"});            
                    }
                }        
            })
        }
    })
});
//ok
detalleexamen_rutas.get("/consulta_de",function(req,res){
    // Capturar lo que esta en la caja de texto: la de Nombre
    const {codigo}=req.body;
    const {descripcion_valor} = req.body;
    examen_model.findOne({codigo},function(error, examen){
        if (examen !== null){    
            detalleexamen_model.findOne({$and:[{codigo},{descripcion_valor}]},function(error,dexamen){
                if (error){
                    res.send({status:"ERROR!!!",msg:"Detalles de Examen no encontrado"});
                    return false;        
                }
                else{
                    if (dexamen !== null){
                        res.send({status:"Ok",msg:"Detalles de Examen encontrado",dato:dexamen});            
                    }
                    else{
                        res.send({status:"ERROR!!!",msg:"Hora y Fecha no Encontrado"});
                    }
                }
            })
        }
    })    
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});
// Consulta detalle de Examen por Codigo de Examen
detalleexamen_rutas.get("/consulta_dec",function(req,res){
    // Capturar lo que esta en la caja de texto: la de Nombre
    const {codigo}=req.body;
    //const {descripcion_valor} = req.body;
    examen_model.findOne({codigo},function(error, examen){
        if (examen !== null){    
            detalleexamen_model.find({codigo},function(error,dexamen){
                if (error){
                    res.send({status:"ERROR!!!",msg:"Detalles de Examen no encontrado"});
                    return false;        
                }
                else{
                    if (dexamen !== null){
                        var j = [];
                        dexamen.forEach(function(de){
                            j.push(de);
                            console.log(de);
                        })
                        //res.send(j);
                        res.send({status:"Ok",msg:"Detalles de Examen encontrado",dato:j});            
                        return true;                        
                    }
                    else{
                        res.send({status:"ERROR!!!",msg:"Hora y Fecha no Encontrado"});
                    }
                }
            })
        }
    })    
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});
//ok
detalleexamen_rutas.get("/listar_e",function(req,res){

    detalleexamen_model.find({},function(error,dexamen){
        //console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene usuarios"})
            return false;
        }
        else {
            var j = [];
            dexamen.forEach(function(de){
                j.push(de);
                console.log(de);
            })
            res.send(j);
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

detalleexamen_rutas.post("/eliminar_e", function(req,res){
    const {codigo}=req.body;
    const {descripcion_valor}=req.body;
    examen_model.findOne({codigo},function(error, examen){
    //detalleexamen_model.findOne({$and:[{codigo},{descripcion_valor}]},function(error, examen){
        if (examen !== null){     
            detalleexamen_model.deleteOne({codigo},function(error,dexamen){
                if (detalleexamen.deletedCount==0 || error){
                    return res.status(401).send({estado:"Error!!!",msg:"Fecha y hora NO Eliminado"});
                }
                return res.status(200).send({estado:"OK",msg:"Fecha y Hora Eliminado"});
            })
        }
    })        
})

//jugador_rutas.post("/actualizar", function(req,res){
//    const datos = req.body;
//    if (datos.nombre != null && datos.nombre!=" "){
//        jugadormodel.updateOne({nombre:datos.nombre},{$set:{posicion:datos.posicion,numero:datos.numero}},function(err){
//            if(err){
//                return res.status(401).send({estado:"Error!!!",msg:"Jugador NO Actualizado"});
//            }
//            return res.status(200).send({estado:"OK",msg:"Jugador Actualizado"});
//        })
//    }
//})

detalleexamen_rutas.post("/actualizar_de", function(req, res) {
    const datos  = req.body;
    const codigo = datos.codigo;
    const descripcion_valor = datos.descripcion_valor;
    //let body = req.body;
    examen_model.findOne({codigo},function(error, examen){
        if (examen !== null){     
            detalleexamen_model.updateOne({$and:[{codigo},{descripcion_valor}]}, {
                $set: {
                    resultado : datos.resultado,
                    rango_i : datos.rango_i,
                    rango_f : datos.rango_f,
                    unidad  : datos.unidad
                }
            },
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
            })
        }
    })
});

exports.detalleexamen_rutas=detalleexamen_rutas;