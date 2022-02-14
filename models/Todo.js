const {Schema, model} = require('mongoose');

const todoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const Todo = model('Todo', todoSchema);
module.exports = Todo;