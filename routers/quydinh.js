const express = require("express");
const router = express.Router();

// tạm lưu (sau có thể đổi MongoDB)
let dsQuyDinh = [];

// ===== XEM =====
router.get("/", (req, res) => {
  res.render("quydinh", {
    session: req.session,
    quydinh: dsQuyDinh,
  });
});

// ===== FORM THÊM =====
router.get("/them", (req, res) => {
  if (req.session.QuyenHan !== "admin" && req.session.QuyenHan !== "giaovien") {
    return res.redirect("/quydinh");
  }

  res.render("quydinh_them", {
    session: req.session,
  });
});

// ===== THÊM =====
router.post("/them", (req, res) => {
  if (!req.body.tieude || !req.body.noidung) {
    return res.send("Không được để trống");
  }

  dsQuyDinh.push({
    id: Date.now(),
    tieude: req.body.tieude,
    noidung: req.body.noidung,
  });

  res.redirect("/quydinh");
});

// ===== XÓA =====
router.get("/xoa/:id", (req, res) => {
  if (req.session.QuyenHan !== "admin" && req.session.QuyenHan !== "giaovien") {
    return res.redirect("/quydinh");
  }

  dsQuyDinh = dsQuyDinh.filter((q) => q.id != req.params.id);

  res.redirect("/quydinh");
});

// ===== FORM SỬA =====
router.get("/sua/:id", (req, res) => {
  if (req.session.QuyenHan !== "admin" && req.session.QuyenHan !== "giaovien") {
    return res.redirect("/quydinh");
  }

  const qd = dsQuyDinh.find((q) => q.id == req.params.id);

  res.render("quydinh_sua", {
    session: req.session,
    qd,
  });
});

// ===== XỬ LÝ SỬA =====
router.post("/sua/:id", (req, res) => {
  const index = dsQuyDinh.findIndex((q) => q.id == req.params.id);

  dsQuyDinh[index].tieude = req.body.tieude;
  dsQuyDinh[index].noidung = req.body.noidung;

  res.redirect("/quydinh");
});

module.exports = router;
