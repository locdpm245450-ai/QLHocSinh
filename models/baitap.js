const mongoose = require('mongoose');

const baiTapVal = new mongoose.Schema({
    TenBai: String,      // Khớp với <%= bt.TenBai %> trong EJS 
    MonHoc: String,      // Khớp với <%= bt.MonHoc %> trong EJS [cite: 115]
    NoiDung: String,     // Khớp với <%= bt.NoiDung %> trong EJS [cite: 120]
    Lop: String,         // Khớp với <%= bt.Lop %> trong EJS [cite: 117]
    //Lưu file dưới dạng chuỗi văn bản cực dài
    FileDuLieu: String,
    FileTen: String,
    NgayDang: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BaiTap', baiTapVal);