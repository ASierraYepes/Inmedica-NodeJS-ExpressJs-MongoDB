const {Schema,model} = require('mongoose');

const resultadoexamen_esquema = new Schema({
    typeDoc:{
        type: String,
        required:true,
        max:40     
    },
    doc:{
        type: Number,
        required:true,   
    },
    codigo:{
        type: String,
        required:true,
        max:20
    },
    resultado:{
        type: String,
        required:true
    }
})

const resultadoexamen_model = model("resultadoexamen",resultadoexamen_esquema);
exports.resultadoexamen_model=resultadoexamen_model;