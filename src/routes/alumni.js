const express = require('express');
const router = express.Router();
const con = require('../dbcon');

router.post('/alumni', (req, res)=> {
    console.log("alumni 라우트 접속");
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
        }
        let sql = 'INSERT INTO alumni(koreanName,department,email,admissionYear,graduationYear, interest) VALUES(?,?,?,?,?,?)';
        // console.log(sql);
        let parameter= [req.body.name,req.body.department,req.body.Email,req.body.YearOfAdmission,req.body.YearOfGraduation,req.body.ResearchTopics];
        con.query(sql, parameter, function(err, results, fields) {
            if(err) throw err;
            console.log(results)
        });
    });
});

router.post('/alumni_delete', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }

        con.query('DELETE FROM alumni WHERE koreanName=?', [req.body.delete_member], (err, results) =>{
            if(err) throw err;
        });
        con.query('set @count = 0;' + 'UPDATE alumni SET id = @count:=@count+1;', (err, results) => {
            if(err) throw err;
        });
    });
});

router.post('/alumni_update', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE alumni SET koreanName=?, department=?, email=?, admissionYear=?, graduationYear=?, interest=? WHERE id=?';
        let updateParameter = [req.body.name, req.body.department, req.body.Email, req.body.YearOfAdmission, req.body.YearOfGraduation, req.body.ResearchTopics, req.body.id];
        console.log(updateParameter);
        con.query(sql, updateParameter, (err, results, fields) =>{
            if(err) throw err;
            console.log(results);
        });
    });
});



module.exports=router;