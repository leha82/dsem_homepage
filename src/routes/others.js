const express = require('express');
const router = express.Router();
const con = require('../dbcon');

// license
router.post('/license_insert', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO license(part,application_date,application_num,registration_date, registration_num, license_name, application_place, inventor, work) VALUES(?,?,?,?,?,?,?,?,?)';
        let license_insertParameter = [req.body.part, req.body.application_date, req.body.application_num, req.body.registration_date, req.body.registration_num, req.body.license_name, req.body.application_place, req.body.inventor, req.body.found, req.body.work];
        con.query(sql, license_insertParameter, function (err, results, fields) {
            if (err) throw err;
            console.log(results)
        });
    });
});

router.post('/license_delete', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
    });
    con.query('DELETE FROM license WHERE license_name=?;', [req.body.delete_license], (err, results) => {
        if (err) throw err;
    });
    con.query('set @count = 0;' + 'UPDATE license SET seq_id = @count:=@count+1;', (err, reselts) => {
        if (err) throw err;
    });
});
router.post('/license_update', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE license SET part=?, application_date=?, application_num=?, registration_date=?, registration_num=?,license_name=?,application_place=?,inventor=?,work=? WHERE seq_id=?';
        let license_updateParameter = [req.body.part, req.body.application_date, req.body.application_num, req.body.registration_date, req.body.registration_num, req.body.license_name, req.body.application_place, req.body.inventor, req.body.work, req.body.id];
        con.query(sql, license_updateParameter, (err, results, fields) => {
            if (err) throw err;
        });
    });
});

// award
router.post('/award_insert', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO award(date,award_organization,competition_name,ranking, person, remarks) VALUES(?,?,?,?,?,?)';
        let award_insertParameter = [req.body.date, req.body.award_organization, req.body.competition_name, req.body.ranking, req.body.person, req.body.remarks];
        con.query(sql, award_insertParameter, function (err, results, fields) {
            if (err) throw err;
            console.log(results)
        });
    });
});

router.post('/award_delete', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
    });
    con.query('DELETE FROM award WHERE person=?;', [req.body.delete_award], (err, results) => {
        if (err) throw err;
    });
    con.query('set @count = 0;' + 'UPDATE award SET seq_id = @count:=@count+1;', (err, reselts) => {
        if (err) throw err;
    });
});
router.post('/award_update', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE award SET date=?, award_organization=?, competition_name=?, ranking=?,person=?,remarks=? WHERE seq_id=?';
        let award_updateParameter = [req.body.date, req.body.award_organization, req.body.competition_name, req.body.ranking, req.body.person, req.body.remarks, req.body.id];
        con.query(sql, award_updateParameter, (err, results, fields) => {
            if (err) throw err;
        });
    });
});

// book
router.post('/book_insert', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO book(part,date,authors,book_name,publisher,ISBN,remarks) VALUES(?,?,?,?,?,?,?)';
        let book_insertParameter = [req.body.part, req.body.date, req.body.authors, req.body.book_name, req.body.publisher, req.body.ISBN, req.body.remarks];
        con.query(sql, book_insertParameter, function (err, results, fields) {
            if (err) throw err;
            console.log(results)
        });
    });
});

router.post('/book_delete', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
    });
    con.query('DELETE FROM book WHERE book_name=?;', [req.body.delete_book], (err, results) => {
        if (err) throw err;
    });
    con.query('set @count = 0;' + 'UPDATE book SET seq_id = @count:=@count+1;', (err, reselts) => {
        if (err) throw err;
    });
});
router.post('/book_update', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE book SET part=?, date=?, authors=?,book_name=?,publisher=?,ISBN=?,remarks=? WHERE seq_id=?';
        let book_updateParameter = [req.body.part, req.body.date, req.body.authors, req.body.book_name, req.body.publisher, req.body.ISBN, req.body.remarks, req.body.id];
        con.query(sql, book_updateParameter, (err, results, fields) => {
            if (err) throw err;
        });
    });
});



// software
router.post('/software_insert', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'INSERT INTO software(part,institution,sw_number,designation,writer,creative_date,registration_date,originator,found_,remarks) VALUES(?,?,?,?,?,?,?,?,?,?)';
        let software_insertParameter = [req.body.part, req.body.institution, req.body.sw_number, req.body.designation, req.body.writer, req.body.creative_date, req.body.registration_date,req.body.originator,req.body.found_,req.body.remarks];
        con.query(sql, software_insertParameter, function (err, results, fields) {
            if (err) throw err;
            console.log(results)
        });
    });
});

router.post('/software_delete', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
    });
    con.query('DELETE FROM software WHERE sw_number=?;', [req.body.delete_software], (err, results) => {
        if (err) throw err;
    });
    con.query('set @count = 0;' + 'UPDATE software SET seq_id = @count:=@count+1;', (err, reselts) => {
        if (err) throw err;
    });
});
router.post('/software_update', (req, res) => {
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        let sql = 'UPDATE software SET part=?, institution=?, sw_number=?,designation=?,writer=?,creative_date=?,registration_date=?,originator=?,found_=?,remarks=? WHERE seq_id=?';
        let software_updateParameter = [req.body.part, req.body.institution, req.body.sw_number, req.body.designation, req.body.writer, req.body.creative_date, req.body.registration_date, req.body.originator, req.body.found_, req.body.remarks,req.body.id];
        con.query(sql, software_updateParameter, (err, results, fields) => {
            if (err) throw err;
        });
    });
});




module.exports = router;