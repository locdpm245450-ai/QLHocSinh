const express = require('express');
const router = express.Router();
const Lop = require('../models/lop');

// ================= DANH SÁCH LỚP =================
router.get('/', async (req, res) => {
    if (!req.session.MaNguoiDung) return res.redirect('/dangnhap');

    const dsLop = await Lop.find();
    res.render('lop', {
        title: 'Quản lý lớp học',
        session: req.session,
        dsLop: dsLop
    });
});

// ================= THÊM LỚP MỚI =================
router.post('/them', async (req, res) => {
    if (req.session.QuyenHan !== 'admin') return res.redirect('/lop');

    try {
        const random = Math.floor(1000 + Math.random() * 9000);
        await Lop.create({
            MaLop: "LOP" + random,
            TenLop: req.body.tenlop, 
            GiaoVienChuNhiem: req.session.HoVaTen,
            DanhSachHocSinh: []
        });
        res.redirect('/lop');
    } catch (err) {
        res.send("Lỗi tạo lớp: " + err.message);
    }
});

// ================= THÊM HỌC SINH VÀO LỚP =================
// Xử lý nút "+" trong từng card lớp [cite: 159]
router.post('/:id/them-hocsinh', async (req, res) => {
    try {
        const idLop = req.params.id;
        const maHS = req.body.hocsinh;

        // Thêm mã học sinh vào mảng DanhSachHocSinh nếu chưa tồn tại
        await Lop.findByIdAndUpdate(idLop, {
            $addToSet: { DanhSachHocSinh: maHS }
        });
        res.redirect('/lop');
    } catch (err) {
        res.send("Lỗi thêm học sinh: " + err.message);
    }
});

// ================= XÓA LỚP =================
router.get('/xoa/:id', async (req, res) => {
    if (req.session.QuyenHan !== 'admin') return res.redirect('/lop');
    await Lop.findByIdAndDelete(req.params.id);
    res.redirect('/lop');
});

module.exports = router;