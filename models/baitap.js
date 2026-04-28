const mongoose = require('mongoose');

const baiTapVal = new mongoose.Schema({
    TenBai: String,     
    MonHoc: String,      
    NoiDung: String,     
    Lop: String,        
    
    FileDuLieu: String,
    FileTen: String,
    NgayDang: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BaiTap', baiTapVal);