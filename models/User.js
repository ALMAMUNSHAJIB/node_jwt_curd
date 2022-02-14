const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    status: {
        type: String,
        enum: ["active", "inactive"]
    }
},
{
    timeteamps: true
});


const User = model('User', userSchema);
module.exports = User;