const {Schema,model} = require('mongoose');

const agenda_esquema = new Schema({
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
    estado:{
        type: Number,
        require: true,
        max: 1
    }
})

const agenda_model = model("agenda",agenda_esquema);
exports.agenda_model=agenda_model;
