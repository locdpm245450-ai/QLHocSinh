const express = require('express');
const router = express.Router();
const LichThi = require('../models/lichthi');

// ====================== 1. TRANG DANH SÁCH LỊCH THI ======================
router.get('/', async (req, res) => {
  try {
    const lichthi = await LichThi.find();
    res.render('lichthi', {
      title: 'Lịch thi học kỳ',
      lichthi: lichthi,
      session: req.session
    });
  } catch (err) {
    res.status(500).send("Lỗi khi lấy danh sách lịch thi");
  }
});

// ====================== 2. TRANG THÊM LỊCH THI MỚI ======================
router.get('/them', (req, res) => {
  res.render('lichthi_them', {
    title: 'Thêm lịch thi mới',
    session: req.session
  });
});

// Xử lý lưu lịch thi mới
router.post('/them', async (req, res) => {
  try {
    await LichThi.create(req.body);
    res.redirect('/lichthi');
  } catch (err) {
    res.status(500).send("Lỗi khi thêm lịch thi");
  }
});

// ====================== 3. TRANG SỬA LỊCH THI (FIX LỖI CANNOT GET) ======================
// Lấy dữ liệu cũ và hiển thị lên form sửa
router.get('/sua/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await LichThi.findById(id); 

    if (!data) {
      return res.status(404).send("Không tìm thấy lịch thi này");
    }

    res.render('lichthi_sua', {
      title: 'Sửa lịch thi',
      id: id,
      data: data, 
      session: req.session
    });
  } catch (err) {
    res.status(500).send("Lỗi khi mở trang sửa");
  }
});

// Xử lý cập nhật dữ liệu sau khi sửa
router.post('/sua/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await LichThi.findByIdAndUpdate(id, req.body);
    res.redirect('/lichthi');
  } catch (err) {
    res.status(500).send("Lỗi khi cập nhật lịch thi");
  }
});

// ====================== 4. XÓA LỊCH THI ======================
router.get('/xoa/:id', async (req, res) => {
  try {
    await LichThi.findByIdAndDelete(req.params.id);
    res.redirect('/lichthi');
  } catch (err) {
    res.status(500).send("Lỗi khi xóa lịch thi");
  }
});

module.exports = router;