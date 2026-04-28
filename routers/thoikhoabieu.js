const express = require('express');
const router = express.Router();


// dữ liệu demo
const thoikhoabieu = [

    {
        MaSV: 'dpm245450',

        HoTen: 'Nguyen Tan Loc',

        Lop: 'DH25PM',

        THOIKHOABIEU: [
            {
                Thu: 'Thứ 3',
                Mon: 'Điện toán đám mây',
                Phong: 'NMT02',
                Tiet: '7 - 9'
            },

            {
                Thu: 'Thứ 4',
                Mon: 'Chủ nghĩa xã hội',
                Phong: 'NB110',
                Tiet: '1 - 2'
            }
        ]
    },

    {
        MaSV: 'sv002',

        HoTen: 'Nguyen Van A',

        Lop: 'DH25TH',

        THOIKHOABIEU: [
            {
                Thu: 'Thứ 2',
                Mon: 'NodeJS',
                Phong: 'A101',
                Tiet: '1 - 3'
            }
        ]
    }

];


// form nhập mã
router.get('/', (req, res) => {

    res.render('thoikhoabieu_nhap');

});


// xử lý xem thoikhoabieu
router.post('/xem', (req, res) => {

    const masv = req.body.MaSV;

    const sinhvien = thoikhoabieu.find(
        sv => sv.MaSV === masv
    );

    if (!sinhvien) {
        return res.send('Không tìm thấy sinh viên');
    }

    res.render('thoikhoabieu_xem', {
        sinhvien
    });

});

module.exports = router;