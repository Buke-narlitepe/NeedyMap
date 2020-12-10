const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const compression = require("compression");
const session = require("cookie-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db.js");
const crypto = require("crypto-random-string");

const sendMail = require("./ses");
const s3 = require("./middlewares/s3.js");
const uploader = require("./middlewares/uploader.js");

app.use(compression());
app.use(bodyParser.json());

const sessionMiddleware = session({
    secret: "hotpink is as awesome color",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
app.use(sessionMiddleware);

io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

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

//register
app.post("/api/register", (req, res) => {
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

//login
app.post("/api/login", (req, res) => {
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

// logout

app.post("/logout", (req, res) => {
    req.session = null;
    console.log(req.session);
    res.redirect("/welcome");
});

// password part

app.post("/api/resetpassword", (req, res) => {
    const code = crypto({ length: 10 });
    if (!req.body.email) {
        res.sendStatus(400);
    } else {
        db.addCodes(req.body.email, code)
            .then((value) => {
                req.session.userId = value.rows[0].id;
                sendMail(
                    "bukemihci@gmail.com",
                    `You can use this code to reset your password:  ${code}`,
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

app.post("/api/newpassword", (req, res) => {
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

//user profile

app.get("/api/user", function (req, res) {
    db.getUserById(req.session.userId)
        .then((data) => {
            console.log(data.rows);
            data.rows.forEach((item) => {
                delete item.password;
            });
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log("err in GET /user", err);
        });
});

//upload avatar
app.post("/api/upload", uploader.single("file"), s3, (req, res) => {
    db.uploadImage(req.body.url, req.session.userId)
        .then(() => {
            res.json(req.body.url);
        })
        .catch((err) => {
            console.log("err in POST /upload", err);
        });
});

// bio editor
app.post("/api/bio", (req, res) => {
    db.uploadBio(req.body.bio, req.session.userId)
        .then(() => {
            res.json(req.body.bio);
        })
        .catch((e) => {
            console.log("error in POST /bio", e);
        });
});

//other profiles
app.get("/api/user/:id", (req, res) => {
    // TODO: first check if user is logged in, if not send 401
    if (!req.session.userId) return res.sendStatus(401);

    // we dont want users to see their own profile with OtherComponent
    if (req.params.id == req.session.userId) {
        return res.sendStatus(418);
    }

    // TODO: lookup that user in db,
    // send back user information

    db.getUserById(req.params.id)
        .then((data) => {
            data.rows.forEach((item) => {
                delete item.password;
            });
            res.json(data.rows[0]);
        })
        .catch((err) => {
            res.sendStatus(404);
            console.log("(err in GET /user/:id)", err);
        });
});

//find & search people
app.get("/api/users/:query", function (req, res) {
    db.findPeople(req.params.query)
        .then((data) => {
            console.log(data.rows);
            data.rows.forEach((item) => {
                delete item.password;
            });
            res.json(data.rows);
        })
        .catch((err) => {
            res.sendStatus(404);
            console.log("err in GET /users/:query", err);
        });
});

app.get("/api/users", function (req, res) {
    db.latestUsers()
        .then((data) => {
            data.rows.forEach((item) => {
                delete item.password;
            });
            res.json(data.rows);
        })
        .catch((err) => {
            console.log("err in GET /users", err);
        });
});

// friendships
app.get("/api/friendshipstatus/:otherId", function (req, res) {
    db.getFriendshipStatus(req.session.userId, req.params.otherId)
        .then((data) => {
            if (data.rows.length === 0) {
                res.json({
                    button: "Send Friend Request",
                });
            } else {
                if (data.rows[0].accepted) {
                    res.json({
                        button: "Unfriend",
                    });
                } else if (data.rows[0].sender_id == req.params.otherId) {
                    res.json({
                        button: "Accept Friend Request",
                    });
                } else {
                    res.json({
                        button: "Cancel Friend Request",
                    });
                }
            }
        })
        .catch((e) => {
            console.log("Error on checking friendship status", e);
        });
});

app.post("/api/send-friend-request/:otherId", function (req, res) {
    db.sendFriendRequest(req.session.userId, req.params.otherId)
        .then(() => {
            res.json({
                button: "Cancel Friend Request",
            });
        })
        .catch((e) => {
            console.log("Error on sending friend request", e);
        });
});

app.post("/api/accept-friend-request/:otherId", function (req, res) {
    db.acceptFriendRequest(req.params.otherId, req.session.userId)
        .then(() => {
            res.json({
                button: "Unfriend",
            });
        })
        .catch((e) => {
            console.log("Error on accepting friend request", e);
        });
});

app.post("/api/end-friendship/:otherId", function (req, res) {
    db.deleteFriendRequest(req.params.otherId, req.session.userId)
        .then(() => {
            res.json({
                button: "Send Friend Request",
            });
        })
        .catch((e) => {
            console.log("Error on ending friendship", e);
        });
});

// friend list

app.get("/api/friends-wannabes", function (req, res) {
    db.getFriends(req.session.userId)
        .then((data) => {
            data.rows.forEach((item) => {
                delete item.password;
            });

            res.json(data.rows);
        })
        .catch((e) => {
            console.log("err in GET /friends-wannabes", e);
        });
});

//important route- do no delete !

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// real time chat with sockets
// connectedOnes is an object for private messages
const connectedOnes = {};
io.on("connection", async function (socket) {
    console.log("user connected", socket.id);

    const userId = socket.request.session.userId;
    connectedOnes[userId] = socket.id;

    //prevent unauthenticated users to oopen a connection to our websocket
    if (!userId) {
        return socket.disconnect(true);
    }

    const result = await db.getTenMessages();
    socket.emit("chatMessages", result.rows.reverse());

    socket.on("chatMessage", async function (msg) {
        const message = await db.sendMessage(msg, userId);
        const info = await db.getUserById(userId);
        console.log(message.rows);
        io.emit("chatMessage", { ...message.rows[0], ...info.rows[0] });
    });

    socket.on("privateMessages", async function (otherId) {
        const data = await db.getTenPrivateMessages(userId, otherId);
        io.emit("privateMessages", data.rows.reverse());
        console.log(data.rows);
    });

    socket.on("privateMessage", async function (privatemsg, otherId) {
        const text = await db.sendPrivateMessage(privatemsg, userId, otherId);
        const userInfo = await db.getUserById(userId);
        console.log(privatemsg);
        console.log(text.rows);

        io.to(socket.id).emit("privateMessage", {
            ...text.rows[0],
            ...userInfo.rows[0],
        });

        if (connectedOnes[otherId]) {
            io.to(connectedOnes[otherId]).emit("privateMessage", {
                ...text.rows[0],
                ...userInfo.rows[0],
            });
        }
    });

    socket.on("typingstart", (otherId) => {
        io.to(connectedOnes[otherId]).emit("typingstart", socket.id);
    });

    socket.on("typingend", (otherId) => {
        io.to(socket.id).emit("typingend", otherId);
    });
});

// because of using sockets, we changed app to server
server.listen(process.env.PORT || 8080, function () {
    console.log("I'm listening.");
});
