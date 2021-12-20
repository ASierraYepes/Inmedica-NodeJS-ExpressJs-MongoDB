const { Router }= require("express");
const examen_rutas = Router();
const {examen_model} = require("../modelos/examen_model");
//ok
examen_rutas.post("/grabar_e",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos  = req.body;
    const codigo = datos.codigo;
    //const hora  = datos.hora;
    examen_model.findOne({codigo},function(error, examen){
        if (examen === null){
            //Guardar esos datos
            const exameng = new examen_model(datos);
            exameng.save(function(err){
                if(err){
                    res.status(500).send({estado:"ERROR",msg:"La fecha y la hora ya se encuentra registrado!!!"});
                    return false;
                }
                return res.status(200).send({estado:"OK",msg:"Se agrego a examen La fecha y Hora exitosamente!"});
            })        
        }
        else{  
            if (examen !== null){
                res.send({status:"Ok",msg:"La Fecha y Hora ya se encuentra Registrado"});            
            }
            // else{
            //     res.send({status:"ERROR!!!",msg:"El usuario no se registro"});
            // }     
        }
    })
    
});
//ok
examen_rutas.get("/consulta_e",function(req,res){
    // Capturar lo que esta en la caja de texto: la de Nombre
    const {codigo}=req.body;
    //const {hora}=req.body;
    // Buscar ese jugador en la BD
    //console.log(num,typeDoc);
    examen_model.findOne({codigo},function(error,examen){
        if (error){
            res.send({status:"ERROR!!!",msg:"Hora y Fecha no encontrado"});
            return false;        
        }
        else{
            if (examen !== null){
                res.send({status:"Ok",msg:"Hora y Fecha encontrado",dato:examen});            
            }
            else{
                res.send({status:"ERROR!!!",msg:"Hora y Fecha no Encontrado"});
            }
        }
    })
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});
//ok
examen_rutas.get("/listar_e",function(req,res){

    examen_model.find({},function(error,examen){
        //console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene usuarios"})
            return false;
        }
        else {
            var j = [];
            examen.forEach(function(e){
                j.push(e);
                console.log(e);
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

examen_rutas.post("/eliminar_e", function(req,res){
    const {codigo}=req.body;
    //const {hora}=req.body;
    //console.log(nombre);
    // Buscar ese jugador en la BD
    examen_model.deleteOne({codigo},function(error,examen){
    //jugadormodel.deleteOne({nombre},function(error,jug){
    //console.log(jug);
        if (examen.deletedCount==0 || error){
            return res.status(401).send({estado:"Error!!!",msg:"Fecha y hora NO Eliminado"});
        }
        return res.status(200).send({estado:"OK",msg:"Fecha y Hora Eliminado"});
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

examen_rutas.post("/actualizar_e", function(req, res) {
    const datos  = req.body;
    const codigo = datos.codigo;
    //let body = req.body;
    examen_model.updateOne({codigo}, {
            $set: {
                descripcion : datos.descripcion
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
        }
    )
});

exports.examen_rutas=examen_rutas;