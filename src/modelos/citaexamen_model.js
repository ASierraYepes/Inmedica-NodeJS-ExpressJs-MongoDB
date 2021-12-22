const {Schema,model} = require('mongoose');

const citaexamen_esquema = new Schema({
    typeDoc:{
        type: String,
        required:true
    },
    doc:{
        type: Number,
        required:true
    },
    fecha:{
        type: "string",
        required:true,
        max:10
    },
    hora:{
        type: "string",
        required:true,
        max:5
    },
    codigo:{
        type: "string",
        required:true,
        max:20
    }   
})

const citaexamen_model = model("citaexamen",citaexamen_esquema);
exports.citaexamen_model=citaexamen_model;