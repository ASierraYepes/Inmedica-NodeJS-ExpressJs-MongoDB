const { Router }= require("express");
const userDashboard_rutas = Router();
const {user_model} = require("../modelos/user_model");

userDashboard_rutas.get("/listar",function(res){
    // const cursor = user_model.find();

    //AQUI SALE UN ERROR QUE TOCA CORREGIR
    user_model.find(function(error,usu){
        console.log(usu);
        if(error){
            res.send({status:"Error",msg:"La tabla no contiene usuarios"})
            return false;
        }
        else {
            res.send({usu});
        }     
    })
    // Mandar mensaje a cliente SI lo encontre o NO  (res.send)
});

userDashboard_rutas.post("/agregar", function(req,res){
    const datos = req.body;
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

userDashboard_rutas.post("/actualizar", function(req, res) {
    const datos = req.body;
    const doc   = datos.doc;
    //let body = req.body;
    user_model.updateOne({doc}, {
            $set: {
                typeDoc : datos.typeDoc,
                doc : datos.doc,
                nom : datos.nom,
                mail : datos.mail,
                password : datos.password,
                tel : datos.tel,
                dir : datos.dir,
                datetime : datos.datetime,
                rol : datos.rol
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





// jugador_rutas.post("/eliminar", function(req,res){
//     const nom=req.body.nombre;
//     let i=0;
    
//     for (const j of jugadores) {
//         if (j.nombre.toLowerCase()==nom.toLowerCase()) {
//             jugadores.splice(i, 1)
//         break;}
//         i=i+1; 
//     }
//     console.log(jugadores);
//     res.send({status:"Ok",msg:"EL jugador fue eliminado satisfactoriamente"})

// })

exports.userDashboard_rutas=userDashboard_rutas;