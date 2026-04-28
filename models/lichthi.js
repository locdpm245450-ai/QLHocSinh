const mongoose = require('mongoose');

const lichThiSchema = new mongoose.Schema({
    maMon: { type: String, required: true },
    tenMon: { type: String, required: true },
    kyThi: { type: String, required: true },
    phongThi: { type: String, required: true },
    soLuong: { type: Number, required: true },
    ngayThi: { type: String, required: true },
    tietBatDau: { type: Number, required: true },
    soTiet: { type: Number, required: true },
    phong: { type: String, required: true }
});

module.exports = mongoose.model('LichThi', lichThiSchema);