var mongoose = require('mongoose');

var nopBaiVal = new mongoose.Schema({
    HocSinh: String,
    Lop: String,
    BaiTap: String,
    NoiDung: String,
    NgayNop: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('NopBai', nopBaiVal);