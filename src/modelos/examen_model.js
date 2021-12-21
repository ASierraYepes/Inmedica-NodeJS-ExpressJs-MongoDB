const {Schema,model} = require('mongoose');

const examen_esquema = new Schema({
    codigo:{
        type: "string",
        required:true,
    },
    descripcion:{
        type: "string",
        required:true,  
    }
})

const examen_model = model("examen",examen_esquema);
exports.examen_model=examen_model;