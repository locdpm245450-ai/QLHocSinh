const mongoose = require('mongoose');

const lopVal = new mongoose.Schema({
    TenLop: { type: String, required: true },
    MaLop: { type: String, required: true, unique: true },
    GiaoVienChuNhiem: String,
    DanhSachHocSinh: { type: [String], default: [] } 
});

module.exports = mongoose.model('Lop', lopVal);