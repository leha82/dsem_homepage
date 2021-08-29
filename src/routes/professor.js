const express = require('express');
const router = express.Router();
const con = require('../dbcon');

router.post('/professor_update', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE professor SET name=?, department=?, laboratory=?, email=?, location=?, fieldOfResearch=? WHERE id=?';
        let updateParameter = [req.body.name, req.body.department, req.body.Laboratory, req.body.Email, req.body.Location, req.body.FieldOfResearch, req.body.id];
        console.log(updateParameter);
        con.query(sql, updateParameter, (err, results, fields) =>{
            if(err) throw err;
            console.log(results);
        });
    });
});

module.exports=router;