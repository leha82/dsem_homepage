const express = require('express');
const router = express.Router();
const con = require('../dbcon');

router.post('/researcher', (req, res)=> {
    console.log("researcher 라우트 접속");
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO researcher(koreanName,department,email,admissionYear,interest) VALUES(?,?,?,?,?)';
        let insertParameter= [req.body.name,req.body.department,req.body.Email,req.body.YearOfAdmission,req.body.ResearchTopics];
        console.log(insertParameter);
        con.query(sql, insertParameter, function(err, results, fields) {
            if(err) throw err;
            console.log(results)
        });
    });
});

router.post('/researcher_delete', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }

        con.query('DELETE FROM researcher WHERE koreanName=?', [req.body.delete_member], (err, results) =>{
            if(err) throw err;
        });
        con.query('set @count = 0;' + 'UPDATE researcher SET id = @count:=@count+1;', (err, results) => {
            if(err) throw err;
        });
    });
});

router.post('/researcher_update', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE researcher SET koreanName=?, department=?, email=?, admissionYear=?, interest=? WHERE id=?';
        let updateParameter = [req.body.name, req.body.department, req.body.Email, req.body.YearOfAdmission, req.body.ResearchTopics, req.body.id];
        console.log(updateParameter);
        con.query(sql, updateParameter, (err, results, fields) =>{
            if(err) throw err;
            console.log(results);
        });
    });
});



module.exports=router;