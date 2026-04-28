const express = require('express');
const router = express.Router();

const Diem = require('../models/diem');
const TaiKhoan = require('../models/taikhoan');
const MonHoc = require('../models/monhoc');


// ================= DANH SÁCH ĐIỂM =================

router.get('/', async (req, res) => {

    if (!req.session.MaNguoiDung) {
        return res.redirect('/dangnhap');
    }

    let dsDiem;

    // admin + giáo viên xem tất cả
    if (
        req.session.QuyenHan === 'giaovien' ||
        req.session.QuyenHan === 'admin'
    ) {

        dsDiem = await Diem.find()
            .populate('HocSinh')
            .populate('MonHoc');

    }

    // học sinh chỉ xem điểm mình
    else {

        dsDiem = await Diem.find({
            HocSinh: req.session.MaNguoiDung
        })
            .populate('HocSinh')
            .populate('MonHoc');

    }

    res.render('diem', {
        dsDiem,
        session: req.session
    });

});


// ================= FORM THÊM ĐIỂM =================

router.get('/them', async (req, res) => {

    if (
        req.session.QuyenHan !== 'giaovien' &&
        req.session.QuyenHan !== 'admin'
    ) {
        return res.send('Không có quyền');
    }

    const hocsinh = await TaiKhoan.find({
        QuyenHan: 'hocsinh'
    });

    const monhoc = await MonHoc.find();

    res.render('diem_them', {
        hocsinh,
        monhoc
    });

});


// ================= THÊM ĐIỂM =================

router.post('/them', async (req, res) => {

    if (
        req.session.QuyenHan !== 'giaovien' &&
        req.session.QuyenHan !== 'admin'
    ) {
        return res.send('Không có quyền');
    }

    await Diem.create({

        HocSinh: req.body.HocSinh,

        // phải là _id môn học
        MonHoc: req.body.MonHoc,

        DiemMieng: req.body.DiemMieng,

        Diem15Phut: req.body.Diem15Phut,

        Diem1Tiet: req.body.Diem1Tiet,

        DiemThi: req.body.DiemThi,

        HocKy: req.body.HocKy,

        NamHoc: req.body.NamHoc

    });

    res.redirect('/diem');

});

module.exports = router;