const express = require("express");
const router = express.Router();

let lich = [];

router.get_lich_data = () => lich;

// ================= DANH SÁCH LỊCH =================

router.get("/", (req, res) => {

  const now = new Date();

  let viewMonth = parseInt(req.query.month) || (now.getMonth() + 1);

  let viewYear = parseInt(req.query.year) || now.getFullYear();

  const find = req.query.find;

  // nếu có tìm kiếm
  if (find) {

    const keyword = find.toLowerCase();

    const suKien = lich.find(item =>
      (item.tieude &&
        item.tieude.toLowerCase().includes(keyword)) ||

      (item.noidung &&
        item.noidung.toLowerCase().includes(keyword))
    );

    // nếu tìm thấy -> nhảy tới tháng/năm của sự kiện
    if (suKien) {

      viewMonth = suKien.thang;
      viewYear = suKien.nam;

    }

  }

  res.render("lich", {
    session: req.session,
    lich,
    viewMonth,
    viewYear
  });

});


// ================= FORM THÊM =================

router.get("/them", (req, res) => {

  res.render("them_lich", {
    session: req.session,
    title: "Them"
  });

});


// ================= THÊM LỊCH =================

router.post("/them", (req, res) => {

  const {
    tieude,
    ngay,
    thang,
    nam,
    noidung
  } = req.body;

  lich.push({

    tieude,

    ngay: parseInt(ngay),

    thang: parseInt(thang),

    nam: parseInt(nam),

    noidung

  });

  res.redirect("/lich");

});


// ================= XÓA =================

router.get("/xoa/:index", (req, res) => {

  lich.splice(req.params.index, 1);

  res.redirect("/lich");

});

module.exports = router;