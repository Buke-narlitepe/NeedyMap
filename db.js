const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:buke:buke@localhost:5432/socialnetwork"
);

//TODO: use optional lastImage
module.exports.createUser = function createUser(
    firstname,
    lastname,
    email,
    password
) {
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [firstname, lastname, email, password]
    );
};

module.exports.getUserByEmail = function getUserByEmail(email) {
    return db.query("SELECT * FROM users WHERE email = $1", [email]);
};

module.exports.addCodes = function addCodes(users_email, code) {
    return db.query(
        `INSERT INTO secretcodes (users_email, code)
    VALUES ($1, $2)
    RETURNING *`,
        [users_email, code]
    );
};

module.exports.getCode = function getCode(code) {
    return db.query(
        "SELECT * FROM secretcodes WHERE code = $1 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'",
        [code]
    );
};

module.exports.updatePassword = function updatePassword(email, password) {
    return db.query(`UPDATE users SET password = $2 WHERE email=$1`, [
        email,
        password,
    ]);
};

module.exports.uploadImage = function uploadImage(image, id) {
    return db.query("UPDATE users SET image=$1 WHERE id=$2", [image, id]);
};

module.exports.getUserById = function getUserById(id) {
    return db.query("SELECT * FROM users WHERE id=$1", [id]);
};

module.exports.uploadBio = function uploadBio(bio, id) {
    return db.query("UPDATE users SET bio=$1 WHERE id=$2", [bio, id]);
};

module.exports.findPeople = function findPeople(val) {
    return db.query("SELECT * FROM users WHERE firstname ILIKE $1", [
        val + "%",
    ]);
};

module.exports.latestUsers = function latestUsers() {
    return db.query("SELECT * FROM users ORDER BY id DESC LIMIT 3");
};

module.exports.getFriendshipStatus = function getFriendshipStatus(
    sender_id,
    recipient_id
) {
    return db.query(
        "SELECT * FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (recipient_id = $1 AND sender_id = $2)",
        [sender_id, recipient_id]
    );
};

module.exports.sendFriendRequest = function sendFriendRequest(
    sender_id,
    recipient_id
) {
    return db.query(
        "INSERT INTO friendships (sender_id, recipient_id) VALUES ($1, $2) RETURNING *",
        [sender_id, recipient_id]
    );
};

module.exports.acceptFriendRequest = function acceptFriendRequest(
    sender_id,
    recipient_id
) {
    return db.query(
        "UPDATE friendships SET accepted=true WHERE sender_id = $1 AND recipient_id = $2 RETURNING *",
        [sender_id, recipient_id]
    );
};

module.exports.deleteFriendRequest = function deleteFriendRequest(
    sender_id,
    recipient_id
) {
    return db.query(
        "DELETE FROM friendships WHERE (sender_id = $1 AND recipient_id = $2) OR (recipient_id = $1 AND sender_id = $2)",
        [sender_id, recipient_id]
    );
};

module.exports.getFriends = function getFriends(id) {
    return db.query(
        `SELECT * FROM friendships
        JOIN users
        ON (sender_id=users.id AND recipient_id=$1 AND accepted=false) 
        OR (sender_id=users.id AND recipient_id=$1 AND accepted=true)
        OR (sender_id=$1 AND recipient_id=users.id AND accepted=true);`,
        [id]
    );
};

module.exports.getTenMessages = function getTenMessages() {
    return db.query(
        `SELECT chat.id, chat.user_id, chat.message, chat.created_at,
        users.firstname, users.lastname,users.image FROM chat LEFT JOIN users
        ON users.id = chat.user_id ORDER BY chat.created_at DESC LIMIT 10`
    );
};

module.exports.sendMessage = function sendMessage(message, user_id) {
    return db.query(
        `INSERT INTO chat ( message, user_id) VALUES ($1, $2) RETURNING *`,
        [message, user_id]
    );
};

module.exports.getTenPrivateMessages = function getTenPrivateMessages(
    sender_id,
    recipient_id
) {
    return db.query(
        `SELECT privatemessage.id, privatemessage.sender_id, 
        privatemessage.recipient_id, privatemessage.message, privatemessage.created_at,
        users.firstname, users.lastname, users.image FROM privatemessage LEFT JOIN users 
        ON users.id = privatemessage.sender_id WHERE (sender_id = $2 AND recipient_id = $1) 
        OR (sender_id = $1 AND recipient_id = $2) ORDER BY privatemessage.created_at DESC LIMIT 10`,
        [sender_id, recipient_id]
    );
};

module.exports.sendPrivateMessage = function sendPrivateMessage(
    message,
    sender_id,
    recipient_id
) {
    return db.query(
        `INSERT INTO privatemessage ( message, sender_id, recipient_id) VALUES ($1, $2, $3) RETURNING *`,
        [message, sender_id, recipient_id]
    );
};
