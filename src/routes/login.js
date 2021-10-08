const express = require('express');
const router = express.Router();
const con = require('../dbcon');

router.post('/login', (req, res)=> {
    con.getConnection(function (err, connection){
        if(err){
            console.log(err);
            connection.release();
            callback(err, null);
            return;
        }
        con.query(`SELECT * FROM login WHERE uid=? AND pw=?`,[req.body.uid,req.body.pw],(err,result)=>{
            if(err) throw err;
            else if(result[0]) {
                req.session.user = result[0];
                res.json({message:'로그인 하였습니다.', key:1});
            }
            else res.json({message:'ID와 PW를 다시 확인해주세요'});
        });
    });
});

router.post('/logout', (req,res)=> {
    req.session.destroy();
    res.json({message:'로그아웃 되었습니다.'})
})

module.exports=router;