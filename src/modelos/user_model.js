const { genSalt, hash } = require('bcrypt');
const {Schema,model} = require('mongoose');

const user_esquema = new Schema({
    typeDoc:{
        type: String,
        required:true
    },
    doc:{
        type: Number,
        unique:true,
        required:true
    },
    nom:{
        type: String,
        required:true
    },
    mail:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    tel:{
        type: Number,
        required:true
    },
    dir:{
        type: String,
        required:true
    },
    datetime:{
        type: Date,
        required:true
    },
    rol:{
        type: String,
        required:true
    }
},{
    timestamps: true
})

//Para cifrar la clave
user_esquema.pre("save", async function(next) {
    const salt = await genSalt(10);
    console.log(salt);
    this.password= await hash(this.password, salt);
    next();
});

const user_model = model("users",user_esquema);
exports.user_model=user_model;
