const {Schema,model} = require('mongoose');

const examen_esquema = new Schema({
    codigo:{
        type: "string",
        required:true,
        max:20
    },
    descripcion:{
        type: "string",
        required:true,
        max:50      
    }
})

const examen_model = model("examen",examen_esquema);
exports.examen_model=examen_model;