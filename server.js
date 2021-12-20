const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

//Rutas del login
const {login_rutas} = require("./src/rutas/login_rutas");
app.use("/login",login_rutas);

//Rutas del registro
const {user_rutas} = require("./src/rutas/user_rutas");
app.use("/user",user_rutas);

//Rutas del crud Dashboard
const {userDashboard_rutas} = require("./src/rutas/userDashboard_rutas");
app.use("/crudDash",userDashboard_rutas);

//Rutas del registro
const {agenda_rutas} = require("./src/rutas/agenda_rutas");
app.use("/agenda",agenda_rutas);

//Rutas del registro
const {examen_rutas} = require("./src/rutas/examen_rutas");
app.use("/examen",examen_rutas);

//Rutas del registro
const {detalleexamen_rutas} = require("./src/rutas/detalleexamen_rutas");
app.use("/detalleexamen",detalleexamen_rutas);

//Rutas del registro
const {citaexamen_rutas} = require("./src/rutas/citaexamen_rutas");
app.use("/citaexamen",citaexamen_rutas);

//Conexion a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(res => console.log(res,"Conectado MongoDB Atlas"))
    .catch(err => console.log(err));

app.listen(9000, function(){
    console.log("servidor por el puerto 9000")
});