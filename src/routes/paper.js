const express = require('express');
const router = express.Router();
const con = require('../dbcon');

router.post('/journal_update', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE journal SET year=?, part=?, date=?, authors=?, title=?, journal_name=?,other=?,ISSN=?,paper_index=?,IF_=?,found_=?,doi=? WHERE seq_id=?';
        let journal_updateParameter = [req.body.year, req.body.part, req.body.date, req.body.authors, req.body.title, req.body.journal_name, req.body.other, req.body.ISSN, req.body.paper_index, req.body.IF_, req.body.found_, req.body.doi, req.body.id];
        console.log(journal_updateParameter);
        con.query(sql, journal_updateParameter, (err, results, fields) =>{
            if(err) throw err;
            console.log("결과: ", results);
        });
    });
});



module.exports=router;