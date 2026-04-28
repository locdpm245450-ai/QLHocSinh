var express = require('express');
var router = express.Router();

var NopBai = require('../models/nopbai');

router.get('/:id', (req, res) => {

    if (!req.session) {
        return res.send('Chưa bật session');
    }

    res.render('nopbai', {
        id: req.params.id
    });

});

router.post('/:id', async (req, res) => {

    await NopBai.create({
        HocSinh: req.session.HoTen || 'Học sinh',
        BaiTap: req.params.id,
        NoiDung: req.body.noidung
    });

    res.redirect('/baitap');

});

module.exports = router;