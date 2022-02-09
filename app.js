const express = require('express');
const app = express();
const http = require('http');
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
app.use(express.urlencoded({ extended: true }));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));

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

app.set("port", process.env.PORT || 18080);
/*
https.createServer(options, app).listen(18080, function () {
    console.log("HTTPS server listening on port " + 18080);
});
*/

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

const iconUpload = multer({ dest: 'public/img/icon/' });

let iconInfo = [];
let tmp = [];
const text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
lineArray = text.toString().split('\n');
for (i in lineArray) {
    let str = lineArray[i].split(",", 3);
    iconInfo.push(str);
}

const memberUpload = multer({ dest: 'public/img/' });

// researcher 등록 및 업데이트(사진포함)
app.post('/researcherUpload', memberUpload.single('researcherUpload'), function (req, res) {
    try {
        fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err1) {
            if (err1) throw err1;
        });
    } catch (e) {
        console.log("사진 x");
    }
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        con.query('SELECT count(*) AS researcher_length from homepage.researcher;', (err1, results1, fields) => {
            if (err1) throw err1;
            let sql = 'INSERT INTO homepage.researcher(koreanName,department,email,admissionYear,interest,description,seq_order) VALUES(?,?,?,?,?,?,?);';
            let insertParameter = [req.body.name, req.body.department, req.body.Email, req.body.YearOfAdmission, req.body.ResearchTopics, req.body.description, results1[0].researcher_length + 1];
            con.query(sql, insertParameter, function (err, results, fields) {
                if (err) throw err;
                console.log(results)
            });
        });
    });
    res.redirect("/members/researcher");
});
app.post('/researcherUpdate', memberUpload.single('researcherUpdate'), function (req, res) {
    fs.stat(__dirname + '/public/img/' + req.body.beforeName + ".jpg", (err, result) => { // 이미지파일 존재하는지 검사
        if (err) { // 기존 이미지가 없음
            console.log("기존 이미지가 없음");
            if (err.code == "ENOENT") {
                try {
                    fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err1) {
                        if (err1) throw err1;
                        console.log("등록 완료");
                    });
                } catch (e) {
                    console.log("파일 없으므로 등록하지 않습니다.");
                }
            }
        } else { // 기존 이미지가 있음
            try {
                console.log("기존 이미지 있음");
                console.log(req.body.updateImg)
                console.log("여기: " + req.file.filename)
                if (req.body.updateImg != undefined) { // 이미지 등록함
                    console.log("내용만 바꿀때");
                    fs.unlink(__dirname + '/public/img/' + req.body.beforeName + ".jpg", (err2) => {
                        if (err2) throw err2;
                    });
                    fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err3) {
                        if (err3) throw err3;
                        console.log("등록 완료");
                    });
                }
            } catch (e) {
                console.log("사진 x");
            }
            try {
                if (req.file.filename != undefined) {
                    console.log("이미지만 바꿀때")
                    fs.unlink(__dirname + '/public/img/' + req.body.beforeName + ".jpg", (err2) => {
                        if (err2) throw err2;
                    });
                    fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err3) {
                        if (err3) throw err3;
                        console.log("등록 완료");
                    });
                }
            } catch (e) {
            }
        }
    });
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        console.log("req.body.number: " + req.body.number)
        console.log("req.body.beforeId: " + req.body.beforeId)
        if (req.body.beforeId != req.body.number) {
            con.query('UPDATE homepage.researcher SET seq_order = ? WHERE seq_order=?;', [99, req.body.number], (err, results, fields) => {
                if (err) throw err;
            });
            let sql = 'UPDATE homepage.researcher SET seq_order= ?, koreanName=?, department=?, email=?, admissionYear=?, interest=?, description=? WHERE seq_order=?;';
            let updateParameter = [req.body.number, req.body.name, req.body.department, req.body.Email, req.body.yearOfAdmission, req.body.researchTopics, req.body.description, req.body.beforeId];
            con.query(sql, updateParameter, (err1, results1, fields1) => {
                if (err1) throw err1;
                con.query('UPDATE homepage.researcher SET seq_order = ? WHERE seq_order = ?;', [req.body.beforeId, 99], (err2, results2, fields2) => {
                    if (err2) throw err2;
                    con.query('SELECT count(*) AS researcher_length from homepage.researcher;', (err3, results3, fields3) => {
                        if (err3) throw err3;
                        con.query('ALTER TABLE homepage.researcher AUTO_INCREMENT = ?;', [results3[0].researcher_length], (err4, results4, fields4) => {
                            if (err4) throw err4;
                        })
                    });
                });
            });
        } else {
            let sql = 'UPDATE homepage.researcher SET koreanName=?, department=?, email=?, admissionYear=?, interest=?, description=? WHERE seq_order=?;';
            let updateParameter = [req.body.name, req.body.department, req.body.Email, req.body.yearOfAdmission, req.body.researchTopics, req.body.description, req.body.beforeId];
            con.query(sql, updateParameter, (err, results, fields) => {
                if (err) throw err;
            });
        }
    });
    res.redirect("/members/researcher");
});

// alumni 등록 및 업데이트(사진포함)
app.post('/alumniUpload', memberUpload.single('alumniUpload'), function (req, res) {
    try {
        fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err) {
            console.log("alumni 등록");
            if (err) throw err;
        });
    } catch (e) {
        console.log("생성");
    }
    con.getConnection(function (err1, connection) {
        if (err1) {
            connection.release();
            callback(err1, null);
        }
        con.query('SELECT count(*) AS alumni_length from homepage.alumni;', (err1, results1, fields) => {
            if (err1) throw err1;
            let sql = 'INSERT INTO homepage.alumni(koreanName,department,email,admissionYear,graduationYear, interest, description, seq_order) VALUES(?,?,?,?,?,?,?,?);';
            let parameter = [req.body.name, req.body.department, req.body.Email, req.body.YearOfAdmission, req.body.YearOfGraduation, req.body.ResearchTopics, req.body.description, results1[0].alumni_length + 1];
            con.query(sql, parameter, function (err2, results, fields) {
                if (err2) throw err2;
                console.log(results)
            });
        });
    });
    res.redirect("/members/alumni");
});


app.post('/alumniUpdate', memberUpload.single('alumniUpdate'), function (req, res) {
    fs.stat(__dirname + '/public/img/' + req.body.beforeName + ".jpg", (err, result) => { // 이미지파일 존재하는지 검사
        if (err) { // 기존 이미지가 없음
            console.log("기존 이미지가 없음");
            if (err.code == "ENOENT") {
                try {
                    fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err1) {
                        if (err1) throw err1;
                        console.log("등록 완료");
                    });
                } catch (e) {
                    console.log("파일 없으므로 등록하지 않습니다.");
                }
            }
        } else { // 기존 이미지가 있음
            try {
                console.log("기존 이미지 있음");
                if (req.body.updateImg != undefined) { // 이미지 등록함
                    console.log("내용만 바꿀때");
                    fs.unlink(__dirname + '/public/img/' + req.body.beforeName + ".jpg", (err2) => {
                        if (err2) throw err2;
                    });
                    fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err3) {
                        if (err3) throw err3;
                        console.log("등록 완료");
                    });
                }
            } catch (e) {
                console.log("사진 x");
            }
            try {
                if (req.file.filename != undefined) {
                    console.log("이미지만 바꿀때")
                    fs.unlink(__dirname + '/public/img/' + req.body.beforeName + ".jpg", (err2) => {
                        if (err2) throw err2;
                    });
                    fs.rename(__dirname + '/public/img/' + req.file.filename, __dirname + '/public/img/' + req.body.name + path.extname(req.file.originalname), function (err3) {
                        if (err3) throw err3;
                        console.log("등록 완료");
                    });
                }
            } catch (e) {
            }
        }
    });
    con.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            callback(err, null);
            return;
        }
        if (req.body.beforeId != req.body.number) {
            con.query('UPDATE homepage.alumni SET seq_order = ? WHERE seq_order=?;', [99, req.body.number], (err, results, fields) => {
                if (err) throw err;
            });
            let sql = 'UPDATE homepage.alumni SET seq_order=?, koreanName=?, department=?, email=?, admissionYear=?, graduationYear=?, interest=?, description=? WHERE seq_order=?;';
            let updateParameter = [req.body.number, req.body.name, req.body.department, req.body.Email, req.body.yearOfAdmission, req.body.graduationYear, req.body.researchTopics, req.body.description, req.body.beforeId];
            con.query(sql, updateParameter, (err1, results1, fields1) => {
                if (err1) throw err1;
                con.query('UPDATE homepage.alumni SET seq_order = ? WHERE seq_order = ?;', [req.body.beforeId, 99], (err2, results2, fields2) => {
                    if (err2) throw err2;
                    con.query('SELECT count(*) AS alumni_length from homepage.alumni;', (err3, results3, fields3) => {
                        if (err3) throw err3;
                        con.query('ALTER TABLE homepage.alumni AUTO_INCREMENT = ?;', [results3[0].alumni_length], (err4, results4, fields4) => {
                            if (err4) throw err4;
                        })
                    });
                });
            });
        } else {
            let sql = 'UPDATE alumni SET koreanName=?, department=?, email=?, admissionYear=?, graduationYear=?, interest=?, description=? WHERE id=?;';
            let updateParameter = [req.body.name, req.body.department, req.body.Email, req.body.yearOfAdmission, req.body.graduationYear, req.body.researchTopics, req.body.description, req.body.beforeId];
            con.query(sql, updateParameter, (err, results, fields) => {
                if (err) throw err;
            });
        }
    });
    res.redirect("/members/alumni");
});

app.post('/iconUpload', iconUpload.single('upload'), function (req, res) {
    fs.rename(__dirname + '/public/img/icon/' + req.file.filename, __dirname + '/public/img/icon/' + req.body.imgName + path.extname(req.file.originalname), function (err) {
        if (err) throw err;
        console.log(req.body.imgName);
    });
    fs.appendFile(__dirname + '/public/img/icon/iconInfo/iconInfo.txt', ('\n' + req.body.imgName + "," + req.body.imgName + path.extname(req.file.originalname) + "," + req.body.imgLink), function (err) {
        if (err) throw err;
        console.log("링크 추가");
    })
    res.redirect("/link/linkEdit");
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
        console.log(req.body.deleteName);
        fs.unlink(__dirname + '/public/img/icon/' + req.body.deleteName, (err2) => {
            if (err2) {
                return console.log(err2);
            }
        });
    });
    res.redirect("/link/linkEdit");
});

app.post('/iconUpdate', function (req, res) {
    console.log("zz");
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
    res.redirect("/link/linkEdit");
});

// 메인 페이지 수정
const homeUpload = multer({ dest: 'views/home/' });
app.post('/homeUpdate', homeUpload.single('homeUpload'), function (req, res) {
    console.log("들어옴");
    console.log("req.file.filename: ", req.file.filename);

    fs.rename(__dirname + '/views/home/' + req.file.filename, __dirname + '/views/home/' + 'home' + path.extname(req.file.originalname), function (err) {
        if (err) throw err;
        console.log("변경성공!");
    })

    res.redirect("/");
})


// DB 접속하기-->
// 각각의 페이지에 보내줄 데이터 조회
const con = require('./src/dbcon');
const { publicDecrypt } = require('crypto');

// 멤버 DB
let professor_db = function (callback) {
    con.query('SELECT * FROM professor;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let researcher_db = function (callback) {
    con.query('SELECT * FROM researcher ORDER BY seq_order ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let alumni_db = function (callback) {
    con.query('SELECT * FROM alumni ORDER BY seq_order ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// 논문 DB
let journal_db = function (callback) {
    con.query('SELECT * FROM homepage.journal ORDER BY date ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let conference_db = function (callback) {
    con.query('SELECT * FROM homepage.conference ORDER BY date ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// 특허 및 수상 등 DB
let award_db = function (callback) {
    con.query('SELECT * FROM homepage.award ORDER BY date ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let book_db = function (callback) {
    con.query('SELECT * FROM homepage.book ORDER BY date ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let license_db = function (callback) {
    con.query('SELECT * FROM homepage.license ORDER BY application_date ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

let software_db = function (callback) {
    con.query('SELECT * FROM homepage.software ORDER BY creative_date ASC;', function (err, results) {
        if (err) throw err;
        callback(null, results);
    });
}

// public 미들웨어 -->
app.use(express.static("public"));

app.get("/members/professor", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
    professor_db(function (err, result) {
        if (err) {
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return; ``
        }
        res.render("members/professor", {
            userInfo: req.session.user,
            professor_results: Object.values(result),
            iconInfo: iconInfo
        });
    });
});

app.get("/members/researcher", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
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
        // console.log(re_results[9][11]);
        // let desciption_results = re_results[11].split("-");
        // console.log(desciption_results);

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
                    iconInfo: iconInfo
                });
            });
        });
    });
});

app.get("/members/alumni", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
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
                    paper_results: Object.values(paper_results),
                    iconInfo: iconInfo
                });
            });
        });
    });
});

app.get("/paper/paper", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
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
                iconInfo: iconInfo
            })
        });
    });
});



app.get("/others/others", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
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
                        others_results: Object.values(others_results),
                        iconInfo: iconInfo
                    });
                });
            });
        });
    });
});

app.get("/activity/activity", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    const text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
    res.render("activity/activity", {
        userInfo: req.session.user,
        iconInfo: iconInfo
    });
});

app.get("/link/linkEdit", (req, res) => {
    let iconInfo = [];
    let tmp = [];
    let text = fs.readFileSync('./public/img/icon/iconInfo/iconInfo.txt');
    let lineArray = text.toString().split('\n');
    for (i in lineArray) {
        let str = lineArray[i].split(",", 3);
        iconInfo.push(str);
    }
    if (req.session.user != null) {
        res.render("link/linkEdit", {
            userInfo: req.session.user,
            iconInfo: iconInfo
        });
    } else {
        res.redirect("/");
    }
});

app.get("/home/home", (req, res) => {
    res.render("home/home", {
        userInfo: req.session.user,
        iconInfo: iconInfo
    });
});

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

app.get("/sampleDownload", (req, res) => {
    filepath = __dirname + "/views/home/home.ejs"
    res.download(filepath);
})

app.get("/")

/*
require('greenlock-express').init({
    packageRoot: __dirname,
    configDir: './greenlock.d',
    cluster: false,
    maintainerEmail: 'cwtcwt4096@gmail.com',
})
    .serve(app);
*/

// app.listen(11000, () => {
//     console.log('run');
// });


var server = https.createServer(options, app).listen(app.get("port"), function () {
    console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));
})