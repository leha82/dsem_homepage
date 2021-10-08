const express = require('express');
const app = express();
const https = require("https");
const path = require('path');
const fs = require("fs");
const multer = require("multer");

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
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// ejs views 미들웨어 + 템플릿 엔진(engine: html <-> ejs 렌더링) -->
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);

const options = {
    key: fs.readFileSync("./keys/prv_ast.kunsan.ac.kr.key"),
    passphrase: 'kunsanackr',
    cert: fs.readFileSync("./keys/cert_ast.kunsan.ac.kr.crt"),
    ca: [
        fs.readFileSync('./keys/rootca_ast.kunsan.ac.kr.crt'),
        fs.readFileSync('./keys/subca1_ast.kunsan.ac.kr.crt')
    ]
};



https.createServer(options, app).listen(11000, function () {
    console.log("HTTPS server listening on port " + 11000);
});


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

const upload = multer({ dest: 'public/img/icon/' });

let iconInfo = [];
let tmp = [];
const text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
lineArray = text.toString().split('\n');
for (i in lineArray) {
    let str = lineArray[i].split(",", 3);
    iconInfo.push(str);
}


app.post('/iconUpload', upload.single('upload'), function (req, res) {
    fs.rename(__dirname + '/public/img/icon/' + req.file.filename, __dirname + '/public/img/icon/' + req.body.imgName + path.extname(req.file.originalname), function (err) {
        if (err) throw err;
        console.log(req.body.imgName);
    });
    fs.appendFile(__dirname + '/public/img/icon/iconInfo/iconInfo.txt', ('\n' + req.body.imgName + "," + req.body.imgName + path.extname(req.file.originalname) + "," + req.body.imgLink), function (err) {
        if (err) throw err;
        console.log("링크 추가");
    })
    res.redirect("/");
})
app.post('/iconDelete', function (req, res) {
    fs.readFile(__dirname + '/public/img/icon/iconInfo/iconInfo.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(req.body.deleteInfo, "");
        data = data.trim();
        fs.writeFile(__dirname + '/public/img/icon/iconInfo/iconInfo.txt', data, 'utf8', function (err1) {
            if (err1) {
                return console.log(err1);
            }
        });
    });
    res.redirect("/");
});

app.post('/iconUpdate', function (req, res) {
    let update = [];
    fs.readFile(__dirname + '/public/img/icon/iconInfo/iconInfo.txt', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var array = data.toString().split("\n");

        // 파일 내용 업데이트
        for (i in array) {
            if (i == req.body.before - 1) {
                array[i] = req.body.Title + "," + req.body.fileName + "," + req.body.Link;
            }
            update.push(array[i]);
        }

        // 아이콘 순서 변경
        if (req.body.before != req.body.number) {
            for (i in update) {
                let tmp = update[req.body.before - 1];
                update[req.body.before - 1] = update[req.body.number - 1];
                update[req.body.number - 1] = tmp;
            }
        }
        // 파일에 쓰기위해 문자열로 구성
        let updateStr = "";
        for (i in update) {
            if (i == (update.length - 1)) {
                updateStr += update[i];
            } else {
                updateStr += update[i] + '\n';
            }
        }
        // 파일 쓰기
        fs.writeFile(__dirname + '/public/img/icon/iconInfo/iconInfo.txt', updateStr, 'utf8', function (err1) {
            if (err1) {
                return console.log(err1);
            }
        });
    });
    res.redirect("/");
});

// DB 접속하기-->
// 각각의 페이지에 보내줄 데이터 조회
const con = require('./src/dbcon');
const { publicDecrypt } = require('crypto');

// 멤버 DB
let professor_db = function (callback) {
    con.query('SELECT * FROM professor', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let researcher_db = function (callback) {
    con.query('SELECT * FROM researcher', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let alumni_db = function (callback) {
    con.query('SELECT * FROM alumni', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// 논문 DB
let journal_db = function (callback) {
    con.query('SELECT * FROM journal', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let conference_db = function (callback) {
    con.query('SELECT * FROM conference', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// 특허 및 수상 등 DB
let award_db = function (callback) {
    con.query('SELECT * FROM award', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let book_db = function (callback) {
    con.query('SELECT * FROM book', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let license_db = function (callback) {
    con.query('SELECT * FROM license', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let software_db = function (callback) {
    con.query('SELECT * FROM software', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// public 미들웨어 -->
app.use(express.static("public"));

app.get("/members/professor", (req, res) => {
    professor_db(function (err, result) {
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
    researcher_db(function (err, results) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let re_results = [];
        for (let i = 0; i < results.length; i++) {
            re_results[i] = Object.values(results[i]);
        }
        let paper_results = [];
        journal_db(function (err, results) {
            if (err) {
                console.log("페이지 로딩 실패");
                console.log(err.stack);
                return;
            }
            let jo_results = [];
            for (let i = 0; i < results.length; i++) {
                jo_results[i] = Object.values(results[i]) + "^";
            }
            paper_results.push(jo_results);
            conference_db(function (err, results2) {
                if (err) {
                    console.log("페이지 로딩 실패");
                    console.log(err.stack);
                    return;
                }
                let co_results = [];
                for (let i = 0; i < results2.length; i++) {
                    co_results[i] = Object.values(results2[i]) + "^";
                }
                paper_results.push(co_results);
                res.render("members/researcher", {
                    userInfo: req.session.user,
                    researcher_results: Object.values(re_results),
                    paper_results: Object.values(paper_results),
                });
            });
        });
    });
});

app.get("/members/alumni", (req, res) => {
    alumni_db(function (err, results) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let al_results = [];
        for (let i = 0; i < results.length; i++) {
            al_results[i] = Object.values(results[i]);
        }

        let paper_results = [];
        journal_db(function (err, results) {
            if (err) {
                console.log("페이지 로딩 실패");
                console.log(err.stack);
                return;
            }
            let jo_results = [];
            for (let i = 0; i < results.length; i++) {
                jo_results[i] = Object.values(results[i]) + "^";
            }
            paper_results.push(jo_results);
            conference_db(function (err, results2) {
                if (err) {
                    console.log("페이지 로딩 실패");
                    console.log(err.stack);
                    return;
                }
                let co_results = [];
                for (let i = 0; i < results2.length; i++) {
                    co_results[i] = Object.values(results2[i]) + "^";
                }
                paper_results.push(co_results);
                res.render("members/alumni", {
                    userInfo: req.session.user,
                    alumni_results: Object.values(al_results),
                    paper_results: Object.values(paper_results)
                });
            });
        });
    });
});

app.get("/paper/paper", (req, res) => {
    let paper_results = [];
    journal_db(function (err, results) {
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

        conference_db(function (err, results2) {
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
    license_db(function (err, results) {
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
        award_db(function (err, results) {
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
            book_db(function (err, results) {
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

                software_db(function (err, results) {
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
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
    res.render("link/link", {
        iconInfo: iconInfo
    });
});

// app.get("/iconUpload", (req, res) => {
//     res.redirect("/");
// });

// 각각의 페이지들 -->
app.get("/", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    const text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
    res.render("index", {
        userInfo: req.session.user,
        iconInfo: iconInfo
    });
});

app.get("/index", (req, res) => {
    res.render("index", {
        userInfo: req.session.user,
        iconInfo: iconInfo
    });
});

require('greenlock-express').init({
    packageRoot: __dirname,
    configDir: './greenlock.d',
    cluster: false,
    maintainerEmail: 'cwtcwt4096@gmail.com',
})
    .serve(app);

// app.listen(11000, () => {
//     console.log('run');
// });