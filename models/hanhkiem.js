const mongoose = require('mongoose');

const hanhKiemVal = new mongoose.Schema({
    MaHocSinh: { type: mongoose.Schema.Types.ObjectId, ref: 'TaiKhoan', required: true },
    HoTen: String,
    Lop: String,
    HocKy: { type: String, enum: ['HK1', 'HK2'], default: 'HK1' },
    NamHoc: String,
    XepLoai: String,
    GhiChu: String
});

module.exports = mongoose.model('HanhKiem', hanhKiemVal);