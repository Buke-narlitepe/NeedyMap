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
