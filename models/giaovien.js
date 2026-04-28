var mongoose = require('mongoose');

var giaoVienVal = new mongoose.Schema({
    MaGV: { type: String, required: true, unique: true },
    HoTen: { type: String, required: true },
    MonDay: { type: String },
    DienThoai: { type: String }
});

var giaoVienModel = mongoose.model('GiaoVien', giaoVienVal);

module.exports = giaoVienModel;