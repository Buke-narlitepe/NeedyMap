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

module.exports.addCodes = function addCodes(users_email, code, created_at) {
    return db.query(
        `INSERT INTO secretcodes (users_email, code, created_at)
    VALUES ($1, $2, $3)
    RETURNING *`,
        [users_email, code, created_at]
    );
};

module.exports.getCode = function getCode(code) {
    return db.query("SELECT * FROM secretcodes WHERE code = $1", [code]);
};

module.exports.updatePassword = function updatePassword(email, password) {
    return db.query(`UPDATE users SET password = $2 WHERE email=$1`, [
        email,
        password,
    ]);
};
