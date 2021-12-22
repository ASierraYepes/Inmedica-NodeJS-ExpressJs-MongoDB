const { Router }= require("express");
const examen_rutas = Router();
const {examen_model} = require("../modelos/examen_model");
//ok
examen_rutas.post("/grabar_e",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos  = req.body;
    const codigo = datos.codigo;
    examen_model.findOne({codigo},function(error, examen){
        if (examen === null){
            //Guardar esos datos
            const exameng = new examen_model(datos);
            exameng.save(function(err){
                if(err){
                    res.status(500).send({estado:"ERROR",msg:"El exámen no se pudo agregar!!!"});
                    return false;
                }
                return res.status(200).send({estado:"OK",msg:"Se agrego exámen exitosamente!"});
            })        
        }
        else{  
            if (examen !== null){
                res.send({status:"Ok",msg:"Exámen ya se encuentra registrado!"});            
            }
            // else{
            //     res.send({status:"ERROR!!!",msg:"El usuario no se registro"});
            // }     
        }
    })
    
});



examen_rutas.get("/listar_e",function(req,res){

    examen_model.find({},function(error,examenes){
        // console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene examenes"})
            return false;
        }
        else {
            res.status(200).json({examenes})
            return true;
        }     
    })
});

//userDashboard_rutas.delete("/eliminar/:doc", function(req,res){
//    user_model.deleteOne({doc: req.params.doc}).then((resultado) => {
//        res.status(200).json({resultado});
//    })
//})

examen_rutas.delete("/eliminar_e/:_id", function(req,res){
    examen_model.deleteOne({_id: req.params._id}).then((resultado) => {
        res.status(200).json({resultado});
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
    const _id = datos._id;
    //let body = req.body;
    examen_model.updateOne({_id}, datos,
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el examen',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Examen actualizado exitosamente',
                    info: info
                })
            }
        }
    )
});

exports.examen_rutas=examen_rutas;