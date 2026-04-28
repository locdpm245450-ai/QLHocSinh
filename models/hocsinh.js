const mongoose = require("mongoose");

const hocSinhVal = new mongoose.Schema({
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
});

module.exports = mongoose.model("HocSinh", hocSinhVal);
