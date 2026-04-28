const express = require('express');

const router = express.Router();

const HocSinh = require('../models/hocsinh');


// ====================== DANH SÁCH ======================

router.get('/', async (req, res) => {

    const dsHocSinh = await HocSinh.find();

    res.render('hocsinh', {
        dsHocSinh
    });

});


// ====================== FORM THÊM ======================

router.get('/them', (req, res) => {

    res.render('hocsinh_them');

});


// ====================== THÊM HỌC SINH ======================
router.post('/them', async (req, res) => {
    await HocSinh.create({
        MaHocSinh: req.body.mahs, // Thêm mã học sinh
        HoTen: req.body.hoten,
        NgaySinh: req.body.ngaysinh, // Thêm ngày sinh
        Lop: req.body.lop,
        GioiTinh: req.body.gioitinh, // Thêm giới tính
        DiaChi: req.body.diachi // Thêm địa chỉ
    });
    res.redirect('/hocsinh');
});


// ====================== XÓA ======================

router.get('/xoa/:id', async (req, res) => {

    await HocSinh.findByIdAndDelete(req.params.id);

    res.redirect('/hocsinh');

});


// ====================== FORM SỬA ======================

router.get('/sua/:id', async (req, res) => {

    const hocSinh = await HocSinh.findById(req.params.id);

    res.render('hocsinh_sua', {
        hocSinh
    });

});

// ====================== SỬA HỌC SINH ======================
router.post('/sua/:id', async (req, res) => {
    await HocSinh.findByIdAndUpdate(req.params.id, {
        MaHocSinh: req.body.mahs,
        HoTen: req.body.hoten,
        NgaySinh: req.body.ngaysinh,
        Lop: req.body.lop,
        GioiTinh: req.body.gioitinh,
        DiaChi: req.body.diachi
    });
    res.redirect('/hocsinh');
});


module.exports = router;