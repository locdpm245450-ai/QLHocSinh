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
    if (req.session.QuyenHan !== 'giaovien' && req.session.QuyenHan !== 'admin') {
        return res.send('Không có quyền');
    }

    try {
        const dsHocSinh = await TaiKhoan.find({ QuyenHan: 'hocsinh' });
        const dsMonHoc = await MonHoc.find();

        res.render('diem_them', {
            session: req.session,
            hocsinh: dsHocSinh, 
            monhoc: dsMonHoc    
        });
    } catch (err) {
        res.status(500).send("Lỗi: " + err.message);
    }
});

// ================= XÓA ĐIỂM =================
router.get('/xoa/:id', async (req, res) => {
    if (req.session.QuyenHan !== 'admin' && req.session.QuyenHan !== 'giaovien') {
        return res.send('Không có quyền thực hiện thao tác này');
    }
    try {
        await Diem.findByIdAndDelete(req.params.id);
        res.redirect('/diem');
    } catch (err) {
        res.status(500).send("Lỗi khi xóa: " + err.message);
    }
});

// ================= FORM SỬA ĐIỂM (GET) =================
router.get('/sua/:id', async (req, res) => {
    if (req.session.QuyenHan !== 'admin' && req.session.QuyenHan !== 'giaovien') {
        return res.send('Không có quyền');
    }
    try {
        const diemId = req.params.id;
        const diemCanSua = await Diem.findById(diemId);
        const dsHocSinh = await TaiKhoan.find({ QuyenHan: 'hocsinh' });
        const dsMonHoc = await MonHoc.find();

        res.render('diem_sua', {
            session: req.session,
            diem: diemCanSua,
            hocsinh: dsHocSinh,
            monhoc: dsMonHoc
        });
    } catch (err) {
        res.redirect('/diem');
    }
});

// ================= CẬP NHẬT ĐIỂM (POST) =================
router.post('/sua/:id', async (req, res) => {
    try {
        await Diem.findByIdAndUpdate(req.params.id, {
            HocSinh: req.body.HocSinh,
            MonHoc: req.body.MonHoc,
            DiemMieng: req.body.DiemMieng,
            Diem15Phut: req.body.Diem15Phut,
            Diem1Tiet: req.body.Diem1Tiet,
            DiemThi: req.body.DiemThi,
            HocKy: req.body.HocKy,
            NamHoc: req.body.NamHoc
        });
        res.redirect('/diem');
    } catch (err) {
        res.status(500).send("Lỗi cập nhật: " + err.message);
    }
});

module.exports = router;