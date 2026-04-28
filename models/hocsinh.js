const mongoose = require("mongoose");

const hocSinhVal = new mongoose.Schema({

    MaHocSinh: {
        type: String,
        required: true,
        unique: true
    },

    HoTen: {
        type: String,
        required: true,
    },

    Lop: {
        type: String,
    },

    NgaySinh: {
        type: Date,
    },

    Tuoi: {
        type: Number
    }
});

module.exports = mongoose.model("HocSinh", hocSinhVal);