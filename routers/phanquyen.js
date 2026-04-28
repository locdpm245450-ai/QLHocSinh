function dangNhap(req, res, next) {

    if (!req.session.MaNguoiDung) {
        return res.redirect('/dangnhap');
    }

    next();
}

function admin(req, res, next) {

    if (!req.session.MaNguoiDung) {
        return res.redirect('/dangnhap');
    }

    if (req.session.QuyenHan !== 'admin') {
        return res.send('Không có quyền');
    }

    next();
}

function giaoVien(req, res, next) {

    if (!req.session.MaNguoiDung) {
        return res.redirect('/dangnhap');
    }

    if (
        req.session.QuyenHan !== 'admin' &&
        req.session.QuyenHan !== 'giaovien'
    ) {
        return res.send('Không có quyền');
    }

    next();
}

module.exports = {
    dangNhap,
    admin,
    giaoVien
};