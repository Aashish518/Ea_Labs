const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    ip: { type: String, required: true }, 
    date: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;
