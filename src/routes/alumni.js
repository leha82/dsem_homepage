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
        // console.log(req.body.name + " " + req.body.department + " " + req.body.Email + " " + req.body.YearOfAdmission + " " + req.body.YearOfGraduation + " " + req.body.ResearchTopics);
        con.query(sql, parameter, function(err, results, fields) {
            if(err) throw err;
            console.log(results)
        });
    });
});

module.exports=router;