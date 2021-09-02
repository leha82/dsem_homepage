const express = require('express');
const app = express();
const http = require("http");
const path = require('path');
const fs = require("fs");

// 로그인기능 구현
const login = require('./src/routes/login');
const session = require('express-session');

// 멤버 페이지 DB 라우터
const professor = require('./src/routes/professor');
const researcher = require('./src/routes/researcher');
const alumni = require('./src/routes/alumni');

// 논문 페이지 DB 라우터
const paper = require('./src/routes/paper');

// Others 페이지 DB 라우터
const others = require('./src/routes/others');

// bodyParser -->
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// imageFile Save  update 후에 수정 예정-->
// const multer = require('multer');
// const upload = multer({ dest: 'img/' });

// login -->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'dsem_homapage',
    resave: true,
    saveUninitialized: true
}))

// DB 가져올 라우터파일들 app.use
app.use('/login', login);
app.use('/professor', professor);
app.use('/researcher', researcher);
app.use('/alumni', alumni);
app.use('/paper', paper);
app.use('/others', others);

// DB 접속하기-->
// 각각의 페이지에 보내줄 데이터 조회
const con = require('./src/dbcon');

// 멤버 DB
let professor_db = function(callback) {
    con.query('SELECT * FROM professor', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let researcher_db = function(callback) {
    con.query('SELECT * FROM researcher', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let alumni_db = function(callback) {
    con.query('SELECT * FROM alumni', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// 논문 DB
let journal_db = function(callback) {
    con.query('SELECT * FROM journal', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let conference_db = function(callback) {
    con.query('SELECT * FROM conference', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// 특허 및 수상 등 DB
let award_db = function(callback) {
    con.query('SELECT * FROM award', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let book_db = function(callback) {
    con.query('SELECT * FROM book', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let license_db = function(callback) {
    con.query('SELECT * FROM license', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let software_db = function(callback) {
    con.query('SELECT * FROM software', function(err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// ejs views 미들웨어 + 템플릿 엔진(engine: html <-> ejs 렌더링) -->
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);

// public 미들웨어 -->
app.use(express.static("public"));

// 각각의 페이지들 -->
app.get("/", (req, res) => {
    res.render("index", {
        userInfo: req.session.user
    });
});

app.get("/index", (req, res) => {
    res.render("index", {
        userInfo: req.session.user
    });
});

app.get("/members/professor", (req, res) => {
    professor_db(function(err, result) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        res.render("members/professor", {
            userInfo: req.session.user,
            professor_results: Object.values(result)
        });
    });
});

app.get("/members/researcher", (req, res) => {
    researcher_db(function(err, results) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let re_results = [];
        for (let i = 0; i < results.length; i++) {
            re_results[i] = Object.values(results[i]);
        }

        res.render("members/researcher", {
            userInfo: req.session.user,
            researcher_results: Object.values(re_results)
        });
    });
});

app.get("/members/alumni", (req, res) => {
    alumni_db(function(err, results) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let al_results = [];
        for (let i = 0; i < results.length; i++) {
            al_results[i] = Object.values(results[i]);
        }

        res.render("members/alumni", {
            userInfo: req.session.user,
            alumni_results: Object.values(al_results)
        });
    });
});

app.get("/paper/paper", (req, res) => {
    let paper_results = [];
    journal_db(function(err, results) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let jo_results = [];
        for (let i = 0; i < results.length; i++) {
            jo_results[i] = Object.values(results[i]);
        }
        paper_results.push(jo_results);
        conference_db(function(err, results2) {
            if (err) {
                console.log("페이지 로딩 실패");
                console.log(err.stack);
                return;
            }
            let co_results = [];
            for (let i = 0; i < results2.length; i++) {
                co_results[i] = Object.values(results2[i]);
            }
            paper_results.push(co_results);
            res.render("paper/paper", {
                userInfo: req.session.user,
                paper_results: Object.values(paper_results),
            })
        });
    });
});



app.get("/others/others", (req, res) => {
    let others_results = [];
    license_db(function(err, results) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let li_results = [];
        for (let i = 0; i < results.length; i++) {
            li_results[i] = Object.values(results[i]);
        }
        others_results.push(li_results);
        award_db(function(err, results) {
            if (err) {
                console.log("페이지 로딩 실패");
                console.log(err.stack);
                return;
            }
            let aw_results = [];
            for (let i = 0; i < results.length; i++) {
                aw_results[i] = Object.values(results[i]);
            }
            others_results.push(aw_results);
            book_db(function(err, results) {
                if (err) {
                    console.log("페이지 로딩 실패");
                    console.log(err.stack);
                    return;
                }
                let book_results = [];
                for (let i = 0; i < results.length; i++) {
                    book_results[i] = Object.values(results[i]);
                }
                others_results.push(book_results);
                software_db(function(err, results) {
                    if (err) {
                        console.log("페이지 로딩 실패");
                        console.log(err.stack);
                        return;
                    }
                    let so_results = [];
                    for (let i = 0; i < results.length; i++) {
                        so_results[i] = Object.values(results[i]);
                    }
                    others_results.push(so_results);
                    res.render("others/others", {
                        userInfo: req.session.user,
                        others_results: Object.values(others_results)
                    });
                });
            });
        });
    });
});

app.get("/activity/activity", (req, res) => {
    res.render("activity/activity", {
        userInfo: req.session.user
    });
});

app.get("/link/link", (req, res) => {
    res.render("link/link", {
        userInfo: req.session.user
    });
});

// app.post('/ajax', function(req,res){
//     var responseData = `hi ${req.body.name} i'm balmostory`
//     res.json(responseData);
//   })

app.listen(11000, () => {
    console.log('run');
});