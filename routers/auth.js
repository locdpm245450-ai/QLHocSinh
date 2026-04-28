const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Import các Model để đếm dữ liệu
const TaiKhoan = require('../models/taikhoan');
const HocSinh = require("../models/hocsinh");
const Lop = require('../models/lop');
const BaiTap = require('../models/baitap');
const MonHoc = require('../models/monhoc');

// ====================== ĐĂNG NHẬP ======================
router.get('/dangnhap', (req, res) => {
	res.render('dangnhap', { title: 'Đăng nhập' });
});

router.post('/dangnhap', async (req, res) => {
	try {
		const taikhoan = await TaiKhoan.findOne({ TenDangNhap: req.body.TenDangNhap });
		if (!taikhoan) return res.send('Tên đăng nhập không tồn tại');

		const check = bcrypt.compareSync(req.body.MatKhau, taikhoan.MatKhau);
		if (!check) return res.send('Sai mật khẩu');

		req.session.MaNguoiDung = taikhoan._id;
		req.session.HoVaTen = taikhoan.HoVaTen;
		req.session.QuyenHan = taikhoan.QuyenHan;
		req.session.HinhAnh = taikhoan.HinhAnh;

		res.redirect('/');
	} catch (err) {
		res.send('Lỗi đăng nhập: ' + err.message);
	}
});


router.get('/admin', async (req, res) => {
	// Kiểm tra quyền admin
	if (!req.session.MaNguoiDung || req.session.QuyenHan !== 'admin') {
		return res.redirect('/dangnhap');
	}

	try {

		const tsHS = await HocSinh.countDocuments();
		const tsLop = await Lop.countDocuments();
		const tsBT = await BaiTap.countDocuments();
		const tsMon = await MonHoc.countDocuments();

		res.render('admin', {
			title: 'Hệ thống Quản trị',
			session: req.session,

			tsHS,
			tsLop,
			tsBT,
			tsMon
		});

	}
	catch (err) {
		res.status(500).send("Lỗi: " + err.message);
	}
});
// ====================== ĐĂNG XUẤT ======================
router.get('/dangxuat', (req, res) => {
	req.session.destroy();
	res.redirect('/dangnhap');
});

// ====================== TRANG QUẢN TRỊ (ADMIN) ======================
router.get('/', (req, res) => {
	res.render('index', {
		title: 'HỆ THỐNG QUẢN LÝ',
		session: req.session // Dòng này cực kỳ quan trọng để hiện tên người dùng
	});
});

module.exports = router;;

module.exports = router;