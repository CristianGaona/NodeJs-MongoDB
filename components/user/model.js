const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        require: [true, 'The user is required'],
        trim: true
    }
});

const model = mongoose.model('User', mySchema);
module.exports = model;