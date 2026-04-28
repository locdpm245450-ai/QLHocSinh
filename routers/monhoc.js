const express = require('express');
const router = express.Router();

const MonHoc = require('../models/monhoc');


// ================= DANH SÁCH MÔN HỌC =================

router.get('/', async (req, res) => {

    if (!req.session.MaNguoiDung) {
        return res.redirect('/dangnhap');
    }

    const monhoc = await MonHoc.find();

    res.render('monhoc', {
        monhoc,
        role: req.session.QuyenHan
    });

});


// ================= FORM THÊM =================

router.get('/them', (req, res) => {

    if (req.session.QuyenHan !== 'admin') {
        return res.send('Không có quyền');
    }

    res.render('monhoc_them');

});


// ================= THÊM MÔN =================

router.post('/them', async (req, res) => {

    if (req.session.QuyenHan !== 'admin') {

        return res.send('Không có quyền');

    }

    await MonHoc.create({

        MaMon: req.body.MaMon,

        TenMon: req.body.TenMon,

        SoTinChi: req.body.SoTinChi,

        GiangVien: req.body.GiangVien

    });

    res.redirect('/monhoc');

});


module.exports = router;