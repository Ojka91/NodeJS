const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid rol'
}
let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, `Name is necessary`],
    },
    email: {
        type: String,
        required: [true,`mail is necessary`],
        unique: true
    },
    password: {
        type: String,
        required: [true,`password is necessary`]
    },
    img: {
        type: String,
        require: false
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be UNIQUE'
})

module.exports = mongoose.model('Usuario', userSchema)
