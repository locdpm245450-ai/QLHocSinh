var mongoose = require('mongoose');

var monHocVal = new mongoose.Schema({
    MaMon: { type: String, required: true, unique: true },
    TenMon: { type: String, required: true },
    SoTiet: { type: Number }
});

var monHocModel = mongoose.model('MonHoc', monHocVal);

module.exports = monHocModel;