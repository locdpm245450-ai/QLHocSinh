const mongoose = require("mongoose");

const taiKhoanSchema = new mongoose.Schema({
	
	MaHocSinh: {
		type: String,
		unique: true,
		sparse: true
	},

	HoVaTen: {
		type: String,
		required: true
	},

	Email: {
		type: String,
		required: true,
		unique: true
	},

	TenDangNhap: {
		type: String,
		required: true,
		unique: true
	},

	MatKhau: {
		type: String,
		required: true
	},

	QuyenHan: {
		type: String,
		enum: ['admin', 'giaovien', 'hocsinh'],
		default: 'hocsinh'
	},

	HinhAnh: {
		type: String,
		default: '/images/default.png'
	},

	KichHoat: {
		type: Number,
		default: 1
	}
});

module.exports = mongoose.model("TaiKhoan", taiKhoanSchema);