const express = require('express');
const router = express.Router();
const HanhKiem = require('../models/hanhkiem');
const TaiKhoan = require('../models/taikhoan');

// Middleware kiểm tra đăng nhập
const checkAuth = (req, res, next) => {
    if (!req.session.MaNguoiDung) return res.redirect('/dangnhap');
    next();
};

// Trang danh sách hạnh kiểm
router.get('/', checkAuth, async (req, res) => {
    let query = {};
    // Nếu là học sinh, chỉ thấy điểm của chính mình
    if (req.session.QuyenHan === 'hocsinh') {
        query = { MaHocSinh: req.session.MaNguoiDung };
    }
    const dsHanhKiem = await HanhKiem.find(query).populate('MaHocSinh');
    res.render('hanhkiem', { dsHanhKiem, session: req.session });
});

// Form thêm (Chỉ Admin/Giáo viên)
router.get('/them', checkAuth, async (req, res) => {
    if (req.session.QuyenHan === 'hocsinh') return res.send("Không có quyền");
    const dsHocSinh = await TaiKhoan.find({ QuyenHan: 'hocsinh' });
    res.render('hanhkiem_them', { dsHocSinh, session: req.session });
});

router.post('/them', async (req, res) => {
    await HanhKiem.create(req.body);
    res.redirect('/hanhkiem');
});

// Xóa & Sửa (Tương tự, kiểm tra session.QuyenHan !== 'hocsinh')
router.get('/xoa/:id', checkAuth, async (req, res) => {
    if (req.session.QuyenHan === 'hocsinh') return res.send("Không có quyền");
    await HanhKiem.findByIdAndDelete(req.params.id);
    res.redirect('/hanhkiem');
});

module.exports = router;