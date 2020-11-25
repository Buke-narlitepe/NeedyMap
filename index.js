const express = require("express");
const app = express();
const compression = require("compression");
const session = require("cookie-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db.js");
const crypto = require("crypto-random-string");
const sendMail = require("./ses");

app.use(compression());
app.use(bodyParser.json());

app.use(
    session({
        secret: "hotpink is as awesome color",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("public"));
app.use(csurf());

app.use((req, res, next) => {
    res.cookie("super-secret-csrf-token", req.csrfToken());
    next();
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            return db.createUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hash
            );
        })
        .then((value) => {
            req.session.userId = value.rows[0].id;
            res.json({});
        })
        .catch((err) => {
            console.log("error in POST /register", err);
            res.sendStatus(400);
        });
});

app.post("/login", (req, res) => {
    if (req.body.email) {
        db.getUserByEmail(req.body.email)
            .then((value) => {
                if (value.rows.length === 0) {
                    return res.redirect("/login");
                }
                bcrypt
                    .compare(req.body.password, value.rows[0].password)
                    .then((match) => {
                        if (match) {
                            req.session.userId = value.rows[0].id;
                            res.json({});
                        } else {
                            res.sendStatus(400);
                        }
                    });
            })
            .catch((err) => {
                console.log("error in POST /login", err);
                res.sendStatus(400);
            });
    }
});

app.post("/resetpassword", (req, res) => {
    const code = crypto({ length: 10 });
    if (!req.body.email) {
        res.sendStatus(400);
    } else {
        db.addCodes(req.body.email, code)
            .then((value) => {
                req.session.userId = value.rows[0].id;
                sendMail(
                    "bukemihci@gmail.com",
                    `You can use this code to reset your password: + ${code}`,
                    "YOUR NEW PASSWORD"
                )
                    .then(() => {
                        res.json({});
                    })
                    .catch((e) => {
                        console.log("ERROR", e);
                        res.sendStatus(400);
                    });
            })
            .catch((err) => {
                console.log("error in POST /resetpassword", err);
                res.sendStatus(400);
            });
    }
});

app.post("/newpassword", (req, res) => {
    if (req.body.code && req.body.password) {
        console.log(req.body.code);
        db.getCode(req.body.code).then((value) => {
            console.log(value);
            if (value.rows[0].length === 0) {
                res.sendStatus(400);
            } else {
                if (value.rows[0].code === req.body.code) {
                    bcrypt
                        .hash(req.body.password, 10)
                        .then((hash) => {
                            db.updatePassword(value.rows[0].users_email, hash);
                            res.sendStatus(200);
                        })
                        .catch((err) => {
                            console.log("error in POST /register", err);
                            res.sendStatus(400);
                        });
                }
            }
        });
    } else {
        res.sendStatus(400);
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
