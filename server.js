const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// const {jugador_rutas} = require("./rutas/jugador_rutas");
// app.use("/jugadores",jugador_rutas);


//Rutas del registro
const {user_rutas} = require("./src/rutas/user_rutas");
app.use("/user",user_rutas);

//Rutas del crud Dashboard
const {userDashboard_rutas} = require("./src/rutas/userDashboard_rutas");
app.use("/crudDash",userDashboard_rutas);

//Conexion a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(res => console.log(res,"Conectado MongoDB Atlas"))
    .catch(err => console.log(err));

app.listen(9000, function(){
    console.log("servidor por el puerto 9000")
});