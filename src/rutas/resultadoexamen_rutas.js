const { Router }= require("express");
const resultadoexamen_rutas = Router();
const {examen_model} = require("../modelos/examen_model");
const { user_model} = require("../modelos/user_model");
const {resultadoexamen_model} = require("../modelos/resultadoexamen_model");
// ok
resultadoexamen_rutas.post("/grabar_r",function(req,res){
    // Recuperar los Datos que vienen desde el Front
    const datos  = req.body;
    const codigo = datos.codigo;
    const typeDoc = datos.typeDoc;
    const doc     = datos.doc;
    const resultado   = datos.resultado;
    // Verifico Usuario Exista
    user_model.findOne({$and:[{typeDoc},{doc}]},function(erroru, usu){
        if ( usu !== null ){
            // Verifico Examen Exista
            examen_model.findOne({codigo},function(errore, examen){
                if (examen !== null){
                    const dexameng = new resultadoexamen_model(datos);
                    dexameng.save(function(err){
                    if(err){
                        console.log(err);
                        res.status(500).send({estado:"ERROR",msg:"El resultado Examen ya se encuentra registrado!!!"});
                        return false;
                    }
                    return res.status(200).send({estado:"OK",msg:"Se agrego resultado de examen exitosamente!"});
                    })
                }else{
                    res.status(500).send({estado:"ERROR",msg:"Examen No existe"});
                    return false;                        
                }    
            })
        }else{
            res.status(500).send({estado:"ERROR",msg:"Usuario No existe"});
            return false;                                    
        }        
    })              
});


resultadoexamen_rutas.get("/listar_r",function(req,res){

    resultadoexamen_model.find({},function(error,resultados){
        // console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene resultados"})
            return false;
        }
        else {
            res.status(200).json({resultados})
            return true;
        }     
    })
});



resultadoexamen_rutas.delete("/eliminar_r/:_id", function(req,res){
    resultadoexamen_model.deleteOne({_id: req.params._id}).then((resultado) => {
        res.status(200).json({resultado});
    })
})

resultadoexamen_rutas.post("/actualizar_r", function(req, res) {
    const datos  = req.body;
    const _id = datos._id;
    //let body = req.body;
    resultadoexamen_model.updateOne({_id}, datos,
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el resultado',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    msg: 'Resultado actualizado exitosamente',
                    info: info
                })
            }
        }
    )
});


exports.resultadoexamen_rutas=resultadoexamen_rutas;