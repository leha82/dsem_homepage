const express = require('express');
const app = express();
const http = require("http");
const path = require('path');
const login = require('./src/routes/login');
const session = require('express-session');
const researcher = require('./src/routes/researcher');
const alumni = require('./src/routes/alumni');

// bodyParser -->
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// imageFile Save  update 후에 수정 예정-->
const multer = require('multer');
const upload = multer({ dest: 'img/' });

// 쿠키파서 x --> session으로 가능
// const cookieParser = require("cookie-parser");
// const static = require("serve-static");

// login -->
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'dsem_homapage',
    resave: true,
    saveUninitialized: true
}))
app.use('/login', login);
app.use('/researcher', researcher);
app.use('/alumni', alumni);


// DB -->
const con = require('./src/dbcon');

let researcher_results = [];
let dbConnection = function(callback){
    con.getConnection(function (connection) {
        con.query('SELECT * FROM researcher', function (err, results, fields) {
            if (err) throw err;

            callback(null, results);
        });
    });
}

let alumni_results = [];
con.getConnection(function (err, connection) {
    if (err) {
        console.log(err);
        return;
    }
    con.query('SELECT * FROM alumni', function (err, results, fields) {
        if (err) throw err;
        // console.log('result: ', results);
        for (let i = 0; i < results.length; i++) {
            alumni_results[i] = Object.values(results[i]);
            // for(let j =0; j<researcher_results[i].length; j++) {
            //     researcher_results[i][j] = Object.values(results[i][j]);
            // }
        }
    });
});


// ejs views 미들웨어 + 템플릿 엔진(engine: html <-> ejs 렌더링) -->
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile); 

// public 미들웨어 -->
app.use(express.static("public"));

// Page -->
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
    res.render("members/professor", {
        userInfo: req.session.user
    });
});

app.get("/members/researcher", (req, res) => {
    dbConnection(function(err, results){
        if(err){
            console.log("페이지 로딩 실패");
            console.log(err.stack);
            return;
        }
        let re_results = [];
        for (let i = 0; i < results.length; i++) {
            re_results[i] = Object.values(results[i]);
            // for(let j =0; j<researcher_results[i].length; j++) {
            //     researcher_results[i][j] = Object.values(results[i][j]);
            // }
        }

        res.render("members/researcher", {
            userInfo: req.session.user,
            researcher_results: Object.values(re_results)
        });
        
    });
   
    // con.query('SELECT * FROM researcher', function (err, results, fields) {
    //     if (err) throw err;

    //     for (let i = 0; i < results.length; i++) {
    //         researcher_results[i] = Object.values(results[i]);
    //         // for(let j =0; j<researcher_results[i].length; j++) {
    //         //     researcher_results[i][j] = Object.values(results[i][j]);
    //         // }
    //     }
    // });
    // res.render("members/researcher", {
    //     userInfo: req.session.user,
    //     researcher_results: Object.values(researcher_results)
    // });
});

app.get("/members/Alumni", (req, res) => {
    con.query('SELECT * FROM alumni', function (err, results, fields) {
        if (err) throw err;

        for (let i = 0; i < results.length; i++) {
            alumni_results[i] = Object.values(results[i]);
            // for(let j =0; j<researcher_results[i].length; j++) {
            //     researcher_results[i][j] = Object.values(results[i][j]);
            // }
        }
    });
    res.render("members/alumni", {
        userInfo: req.session.user,
        alumni_results: Object.values(alumni_results)
    });
});

app.get("/paper/paper", (req, res) => {
    res.render("paper/paper", {
        userInfo: req.session.user
    });
});

app.get("/others/others", (req, res) => {
    res.render("others/others", {
        userInfo: req.session.user
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