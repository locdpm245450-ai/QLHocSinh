const express = require('express');
const router = express.Router();
const multer = require('multer');

const TaiKhoan = require('../models/taikhoan');


// upload ảnh
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'public/images');

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + '-' + file.originalname);

    }

});

const upload = multer({ storage });


// ====================== TRANG THÔNG TIN ======================

router.get('/', async (req, res) => {

    if (!req.session.MaNguoiDung) {

        return res.redirect('/dangnhap');

    }

    const user = await TaiKhoan.findById(req.session.MaNguoiDung);

    res.render('thongtin', {
        user
    });

});


// ====================== CẬP NHẬT ======================

router.post('/capnhat', upload.single('HinhAnh'), async (req, res) => {

    if (!req.session.MaNguoiDung) {

        return res.redirect('/dangnhap');

    }

    let avatar = req.session.HinhAnh;

    if (req.file) {

        avatar = '/images/' + req.file.filename;

    }

    await TaiKhoan.findByIdAndUpdate(

        req.session.MaNguoiDung,

        {

            HoVaTen: req.body.HoVaTen,

            Email: req.body.Email,

            SoDienThoai: req.body.SoDienThoai,

            HinhAnh: avatar

        }

    );

    // update session
    req.session.HoVaTen = req.body.HoVaTen;

    req.session.HinhAnh = avatar;

    res.redirect('/thongtin');

});

module.exports = router;