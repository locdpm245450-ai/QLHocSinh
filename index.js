const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();


// ====================== ROUTERS ======================

const indexRouter = require('./routers/index');

const adminRouter = require('./routers/auth');

const authRouter = require('./routers/auth');

const taikhoanRouter = require('./routers/taikhoan');

const diemRouter = require('./routers/diem');

const baitapRouter = require('./routers/baitap');

const nopbaiRouter = require('./routers/nopbai');

const lopRouter = require('./routers/lop');

const hocsinhRouter = require('./routers/hocsinh');

const thongtinRouter = require('./routers/thongtin');

const monhocRouter = require('./routers/monhoc');

const lichRouter = require('./routers/lich');

const thoikhoabieuRoutes = require('./routers/thoikhoabieu');

const lichthiRouter = require("./routers/lichthi");

const quydinhRouter = require("./routers/quydinh");

// ====================== MONGODB ======================

const uri =
    'mongodb://Loc4N:Loc112233@ac-m5thjqj-shard-00-01.glilfqg.mongodb.net:27017/trangtin?ssl=true&authSource=admin';

mongoose.connect(uri)
    .then(() => {
        console.log('Kết nối MongoDB thành công');
    })
    .catch((err) => {
        console.log(err);
    });


// ====================== VIEW ENGINE ======================

app.set('views', './views');
app.set('view engine', 'ejs');


// ====================== MIDDLEWARE ======================

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(
    path.join(__dirname, 'public')
));


// ====================== SESSION ======================

app.use(session({

    name: 'QLHocSinh',

    secret: 'Loc4N',

    resave: false,

    saveUninitialized: false,

    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }

}));


// ====================== GLOBAL MESSAGE ======================

app.use((req, res, next) => {

    res.locals.session = req.session;

    next();

});


// ====================== ROUTES ======================

app.use('/', indexRouter);

app.use('/', adminRouter);

app.use('/', authRouter);

app.use('/taikhoan', taikhoanRouter);

app.use('/diem', diemRouter);

app.use('/baitap', baitapRouter);

app.use('/nopbai', nopbaiRouter);

app.use('/lop', lopRouter);

app.use('/hocsinh', hocsinhRouter);

app.use('/thongtin', thongtinRouter);

app.use('/monhoc', monhocRouter);

app.use('/lich', lichRouter);

app.use('/thoikhoabieu', thoikhoabieuRoutes);

app.use("/lichthi", lichthiRouter);

app.use("/quydinh", quydinhRouter);
// ===== BÀI TẬP =====

let dsBaiTap = [];

// Trang danh sách bài tập
app.get('/baitap', (req, res) => {
    res.render('baitap', {
        session: req.session,
        baitap: dsBaiTap
    });
});

// Form thêm bài tập
app.get('/baitap/them', async (req, res) => {
    if (req.session.QuyenHan !== 'admin' && req.session.QuyenHan !== 'giaovien') {
        return res.redirect('/baitap');
    }

    try {
        // Phải lấy danh sách môn học từ Database trước khi render
        const MonHoc = require('./models/monhoc');
        const dsMH = await MonHoc.find();

        res.render('baitap_them', {
            session: req.session,
            monhoc: dsMH // Đảm bảo tên biến này trùng với <% monhoc.forEach %> trong EJS
        });
    } catch (err) {
        res.send("Lỗi: " + err.message);
    }
});

// Xử lý thêm bài tập
app.post('/baitap/them', (req, res) => {

    const { monhoc, noidung } = req.body;

    dsBaiTap.push({
        MonHoc: monhoc,
        NoiDung: noidung
    });

    res.redirect('/baitap');
});

// ===== GIỚI THIỆU =====

let gioiThieu = "Chào mừng bạn đến với hệ thống quản lý học sinh.";

// Trang hiển thị giới thiệu
app.get('/gioithieu', (req, res) => {
    res.render('gioithieu', {
        session: req.session,
        noidung: gioiThieu
    });
});

// Form sửa (chỉ admin)
app.get('/gioithieu/sua', (req, res) => {

    if (!req.session || req.session.QuyenHan !== 'admin') {
        return res.redirect('/gioithieu');
    }

    res.render('gioithieu_sua', {
        session: req.session,
        noidung: gioiThieu
    });
});

// Xử lý lưu
app.post('/gioithieu/sua', (req, res) => {

    if (!req.session || req.session.QuyenHan !== 'admin') {
        return res.redirect('/gioithieu');
    }

    gioiThieu = req.body.noidung;

    res.redirect('/gioithieu');
});
// ====================== SERVER ======================

app.listen(3000, () => {

    console.log('Server chạy tại: http://127.0.0.1:3000');

});