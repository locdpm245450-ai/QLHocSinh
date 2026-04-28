const express = require('express');
const router = express.Router();
const multer = require('multer');
const { dangNhap, giaoVien } = require('./phanquyen');
const MonHoc = require('../models/monhoc');
const BaiTap = require('../models/baitap');

// Cấu hình multer lưu vào bộ nhớ tạm (Dùng cho Base64 trên Atlas)
const upload = multer({ storage: multer.memoryStorage() });

// ================= 1. DANH SÁCH BÀI TẬP (GET /) =================
router.get('/', dangNhap, async (req, res) => {
    try {
        const user = req.session;
        let dsBaitap;

        if (user.QuyenHan === 'admin' || user.QuyenHan === 'giaovien') {
            dsBaitap = await BaiTap.find().sort({ NgayDang: -1 });
        } else {
            // SỬA TẠI ĐÂY: Dùng trim() để tránh lỗi thừa dấu cách
            const lopCuaHocSinh = user.Lop ? user.Lop.trim() : "";

            dsBaitap = await BaiTap.find({
                $or: [
                    { Lop: lopCuaHocSinh }, // Khớp lớp học (ví dụ: "11B11")
                    { Lop: 'Cả khối' },
                    { Lop: '' },
                    { Lop: null }
                ]
            }).sort({ NgayDang: -1 });
        }

        const monhoc = await MonHoc.find();
        res.render('baitap', {
            session: user,
            baitap: dsBaitap,
            dsMonHoc: monhoc
        });
    } catch (err) {
        res.status(500).send("Lỗi: " + err.message);
    }
});

// ================= 2. FORM THÊM (GET /them) =================
// Phải để trước route có :id để tránh lỗi nhận nhầm chữ 'them' thành ID
router.get('/them', giaoVien, async (req, res) => {
    try {
        const dsMonHoc = await MonHoc.find(); // Lấy danh sách môn học
        const dsLop = await require('../models/lop').find(); // Lấy danh sách lớp học

        res.render('baitap_them', {
            session: req.session,
            monhoc: dsMonHoc, // Truyền biến monhoc
            lop: dsLop       // Truyền biến lop để sửa lỗi "lop is not defined"
        });
    } catch (err) {
        res.status(500).send("Lỗi: " + err.message);
    }
});

// ================= 3. XỬ LÝ LƯU MỚI (POST /them) =================
router.post('/them', giaoVien, upload.single('fileDinhKem'), async (req, res) => {
    try {
        const { TenBai, MonHoc, Lop, NoiDung } = req.body;
        let fileBase64 = "", fileName = "";

        if (req.file) {
            fileBase64 = req.file.buffer.toString('base64');
            fileName = req.file.originalname;
        }

        const moi = new BaiTap({
            TenBai, MonHoc, Lop, NoiDung,
            FileDuLieu: fileBase64,
            FileTen: fileName
        });

        await moi.save();
        res.redirect('/baitap');
    } catch (err) {
        res.status(500).send("Lỗi lưu bài: " + err.message);
    }
});

// ================= 4. XỬ LÝ XÓA (GET /xoa/:id) =================
// Đặt trước route :id để tránh CastError
router.get('/xoa/:id', giaoVien, async (req, res) => {
    try {
        await BaiTap.findByIdAndDelete(req.params.id);
        res.redirect('/baitap');
    } catch (err) {
        res.status(500).send("Lỗi khi xóa: " + err.message);
    }
});

// ================= 5. FORM SỬA (GET /sua/:id) =================
router.get('/sua/:id', giaoVien, async (req, res) => {
    try {
        const bt = await BaiTap.findById(req.params.id);
        const monhoc = await MonHoc.find();

        res.render('baitap_sua', {
            session: req.session,
            bt: bt,
            monhoc: monhoc
        });
    } catch (err) {
        res.send("Lỗi: " + err.message);
    }
});

// ================= 6. XỬ LÝ CẬP NHẬT (POST /sua/:id) =================
// Thêm upload.single để cho phép đổi file khi sửa
router.post('/sua/:id', giaoVien, upload.single('fileDinhKem'), async (req, res) => {
    try {
        const { TenBai, MonHoc, Lop, NoiDung } = req.body;
        let updateData = { TenBai, MonHoc, Lop, NoiDung };

        // Nếu có upload file mới thì cập nhật luôn
        if (req.file) {
            updateData.FileDuLieu = req.file.buffer.toString('base64');
            updateData.FileTen = req.file.originalname;
        }

        await BaiTap.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/baitap');
    } catch (err) {
        res.status(500).send("Lỗi cập nhật: " + err.message);
    }
});


module.exports = router;