const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
   usuario:{
        type: String,
        required: [true, `Name is required`]
    },
    description:{
        type: String,
        required: false
    },
    state:{
        type: Boolean,
        default: true
    }
})

categoriaSchema.methods.toJSON = function () {
    let categoria = this;
    let categoriaObject = categoria.toObject();
    return categoriaObject
}

module.exports = mongoose.model('Categoria', categoriaSchema)