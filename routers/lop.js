const express = require('express');
const router = express.Router();

const Lop = require('../models/lop');


// ================= DANH SÁCH LỚP =================

router.get('/', async (req, res) => {

    if (!req.session.MaNguoiDung) {
        return res.redirect('/dangnhap');
    }

    const dsLop = await Lop.find();

    res.render('lop_danhsach', {
        session: req.session,
        dsLop
    });

});


// ================= FORM THÊM LỚP =================

router.get('/them', (req, res) => {

    if (
        req.session.QuyenHan !== 'admin' &&
        req.session.QuyenHan !== 'giaovien'
    ) {
        return res.redirect('/lop');
    }

    res.render('lop_them', {
        session: req.session
    });

});


// ================= THÊM LỚP =================

router.post('/them', async (req, res) => {

    if (
        req.session.QuyenHan !== 'admin' &&
        req.session.QuyenHan !== 'giaovien'
    ) {
        return res.redirect('/lop');
    }

    try {

        const random = Math.floor(
            1000 + Math.random() * 9000
        );

        await Lop.create({

            MaLop: "LOP" + random,

            TenLop: req.body.TenLop,

            GiaoVienChuNhiem: req.session.HoVaTen,

            DanhSachHocSinh: []

        });

        res.redirect('/lop');

    }

    catch (err) {

        res.send(
            "Lỗi tạo lớp: " + err.message
        );

    }

});


// ================= XÓA LỚP =================

router.get('/xoa/:id', async (req, res) => {

    if (req.session.QuyenHan !== 'admin') {
        return res.redirect('/lop');
    }

    await Lop.findByIdAndDelete(req.params.id);

    res.redirect('/lop');

});


module.exports = router;