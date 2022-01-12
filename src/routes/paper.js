const express = require('express');
const router = express.Router();
const con = require('../dbcon');

// journal
router.post('/journal_insert', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO journal(year,part,date,authors,title, journal_name, other, ISSN, paper_index, IF_, found_, doi) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        let journal_insertParameter= [req.body.year, req.body.part, req.body.date, req.body.authors, req.body.title, req.body.journal_name, req.body.other, req.body.ISSN, req.body.paper_index, req.body.IF_, req.body.found_, req.body.doi];
        con.query(sql, journal_insertParameter, function(err, results, fields) {
            if(err) throw err;
            console.log(results)
        });
    });
});

router.post('/journal_delete', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
    });
    con.query('DELETE FROM journal WHERE title=?;', [req.body.delete_journal], (err, results) =>{
        if(err) throw err;
    });
    con.query('set @count = 0;' + 'UPDATE journal SET seq_id = @count:=@count+1;', (err, results) => {
         if(err) throw err;
    });
});

router.post('/journal_update', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE journal SET year=?, part=?, date=?, authors=?, title=?, journal_name=?,other=?,ISSN=?,paper_index=?,IF_=?,found_=?,doi=? WHERE seq_id=?;';
        let journal_updateParameter = [req.body.year, req.body.part, req.body.date, req.body.authors, req.body.title, req.body.journal_name, req.body.other, req.body.ISSN, req.body.paper_index, req.body.IF_, req.body.found_, req.body.doi, req.body.id];
        con.query(sql, journal_updateParameter, (err, results, fields) =>{
            if(err) throw err;
            console.log("결과: ", results);
        });
    });
});

// conference
router.post('/conference_insert', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO conference(year,part,date,authors,title, proceeding, ISSN, place, found, remarks) VALUES(?,?,?,?,?,?,?,?,?,?);';
        let conference_insertParameter= [req.body.year, req.body.part, req.body.date, req.body.authors, req.body.title, req.body.proceeding, req.body.ISSN, req.body.place, req.body.found, req.body.remarks];
        con.query(sql, conference_insertParameter, function(err, results, fields) {
            if(err) throw err;
            console.log(results)
        });
    });
});
router.post('/conference_delete', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
    });
    con.query('DELETE FROM conference WHERE title=?;', [req.body.delete_conference], (err, results) =>{
        if(err) throw err;
    });
    con.query('set @count = 0;' + 'UPDATE conference SET seq_id = @count:=@count+1;', (err, reselts) => {
         if(err) throw err;
    });
});
router.post('/conference_update', (req, res)=> {
    con.getConnection(function (err, connection) {
        if(err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE conference SET year=?, part=?, date=?, authors=?, title=?, proceeding=?,ISSN=?,place=?,found=?,remarks=? WHERE seq_id=?;';
        let conference_updateParameter = [req.body.year, req.body.part, req.body.date, req.body.authors, req.body.title, req.body.proceeding, req.body.ISSN, req.body.place, req.body.found, req.body.remarks, req.body.id];
        con.query(sql, conference_updateParameter, (err, results, fields) =>{
            if(err) throw err;
            console.log("결과: ", results);
        });
    });
});





module.exports=router;