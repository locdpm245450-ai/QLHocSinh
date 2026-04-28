var mongoose = require('mongoose');

var diemVal = new mongoose.Schema({
    HocSinh: { type: mongoose.Schema.Types.ObjectId, ref: 'HocSinh', required: true },
    MonHoc: { type: mongoose.Schema.Types.ObjectId, ref: 'MonHoc', required: true },

    DiemMieng: { type: Number, min: 0, max: 10 },
    Diem15Phut: { type: Number, min: 0, max: 10 },
    Diem1Tiet: { type: Number, min: 0, max: 10 },
    DiemThi: { type: Number, min: 0, max: 10 },

    HocKy: { type: Number, enum: [1, 2] },
    NamHoc: { type: String }
});

var diemModel = mongoose.model('Diem', diemVal);

module.exports = diemModel;