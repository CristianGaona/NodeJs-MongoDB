const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        require: [true, 'The message is required'],
        trim: true
    },
    date: {
        type: Date,
    },

    file :{
        type: String,
    }
});

//module.exports = model('')
const model = mongoose.model('Message', mySchema);
module.exports = model;