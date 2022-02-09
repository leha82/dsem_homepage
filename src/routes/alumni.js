const express = require('express');
const router = express.Router();
const con = require('../dbcon');
const fs = require("fs");

router.post('/alumni_delete', (req, res)=> {
    fs.stat(__dirname + '../../../public/img/' + req.body.delete_img, (err1) => {
        if (err1) {
            if (err1.code == "ENOENT") {
                console.log("파일 없음");
            }
        } else {
            console.log("파일있음");
            fs.unlink(__dirname + '../../../public/img/' + req.body.delete_img, (err2) => {
                if (err2) throw err2;
            });
        }
    });
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }

        con.query('DELETE FROM alumni WHERE koreanName=?;', [req.body.delete_member], (err, results) =>{
            if(err) throw err;
        });
        con.query('set @count = 0;' + 'UPDATE alumni SET id = @count:=@count+1;', (err, results) => {
            if(err) throw err;
        });
        con.query('set @count = 0;' + 'UPDATE alumni SET seq_order = @count:=@count+1;', (err, results) => {
            if (err) throw err;
        });
    });
});

module.exports=router;