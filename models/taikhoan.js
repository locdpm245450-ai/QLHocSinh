var mongoose = require('mongoose');

var taiKhoanVal = new mongoose.Schema({

	HoVaTen: {
		type: String,
		required: true
	},

	Email: {
		type: String
	},

	HinhAnh: {
		type: String
	},

	SoDienThoai: {
		type: String
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

	KichHoat: {
		type: Number,
		default: 1
	}

});

var taiKhoanModel = mongoose.model('TaiKhoan', taiKhoanVal);

module.exports = taiKhoanModel;