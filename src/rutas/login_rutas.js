const {compare} = require("bcrypt");
const { Router }= require("express");
const login_rutas = Router();
const {user_model} = require("../modelos/user_model");
const { sign} = require ("jsonwebtoken")

login_rutas.post("/ingresar",async function(req,res){
    try {
        // Recuperar los Datos que vienen desde el Front
        const {mail,password} = req.body;
        // Busco los Datos de ese mail en la BD
        const user = await user_model.findOne({mail});
        console.log(user);
        // Pregunto si Existe, Si existe compruebo su password y enviar un mensaje si esta bien o no, 
        if (!user){
            return res.status(401).send({estado:"Error!!!",msg:"Credenciales NO Validas!!!"});
        }
        const passok = await compare(password,user.password);
        console.log(passok);
        if (passok){
            const token = sign({mail:user.mail, rol:user.rol},process.env.JWT_SECRET_KEY);
            return res.status(200).send({estado:"OK",msg:"Logeado!!!",token});
        }
        else{
            return res.status(401).send({estado:"Error!!!",msg:"Credenciales NO Validas"});
        }
        // y Responder al Cliente
    }
    catch (error){
    }
});

exports.login_rutas=login_rutas;