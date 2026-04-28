// routers/index.js

var express = require('express');
var router = express.Router();

// IMPORT ROUTE
var diemRouter = require('./diem');
var baitapRouter = require('./baitap');
// --- THÊM DÒNG NÀY: Import lichRouter để lấy dữ liệu lịch ---
var lichRouter = require('./lich');

// ROUTE
router.use('/diem', diemRouter);
router.use('/baitap', baitapRouter);


// =========================
// TRANG CHỦ
// =========================
router.get('/', async (req, res) => {

	// --- THÊM DÒNG NÀY: Lấy mảng dữ liệu lịch từ router lich ---
	// Nếu bạn đã chuyển sang dùng MongoDB, hãy dùng: const dsLich = await Lich.find();
	const dsLich = lichRouter.get_lich_data ? lichRouter.get_lich_data() : [];

	res.render('index', {
		title: 'Quản lý học sinh',
		session: req.session || null,
		// --- THÊM DÒNG NÀY: Truyền biến dsLich sang view index.ejs ---
		dsLich: dsLich
	});

});


// =========================
// TRANG LỖI
// =========================
router.get('/error', async (req, res) => {

	res.render('error', {
		title: 'Lỗi'
	});

});


// =========================
// TRANG THÀNH CÔNG
// =========================
router.get('/success', async (req, res) => {

	res.render('success', {
		title: 'Hoàn thành'
	});

});


module.exports = router;