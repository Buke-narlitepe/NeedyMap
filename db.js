const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL || "postgres:buke:buke@localhost:5432/needymap"
);

//       Creating user & Getting user          //

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

module.exports.getUserById = function getUserById(id) {
    return db.query("SELECT * FROM users WHERE id=$1", [id]);
};

module.exports.deleteUser = function deleteUser(id) {
    return db.query("DELETE FROM users WHERE id=$1", [id]);
};

//                Contact Form                  //
module.exports.addContactForm = function addContactForm(
    firstname,
    lastname,
    email,
    phone,
    message
) {
    return db.query(
        `INSERT INTO contact (firstname, lastname, email, phone, message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
        [firstname, lastname, email, phone, message]
    );
};

//           Creating Need-Form & Donate-Form                   //

module.exports.addNeedForm = function addNeedForm(
    needer_id,
    category,
    description,
    latitude,
    longitude
) {
    return db.query(
        `INSERT INTO needs (needer_id, category, description, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
        [needer_id, category, description, latitude, longitude]
    );
};

module.exports.getNeedForm = function getNeedForm() {
    return db.query("SELECT * FROM needs");
};

module.exports.deleteNeed = function deleteNeed(id) {
    return db.query("DELETE FROM needs WHERE id=$1", [id]);
};

module.exports.deleteDonation = function deleteDonation(id) {
    return db.query("DELETE FROM donation WHERE id=$1", [id]);
};

module.exports.addDonateForm = function addDonateForm(
    donator_id,
    category,
    description,
    latitude,
    longitude
) {
    return db.query(
        `INSERT INTO donation (donator_id, category, description, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
        [donator_id, category, description, latitude, longitude]
    );
};

module.exports.getDonationForm = function getDonationForm() {
    return db.query("SELECT * FROM donation");
};

module.exports.getDonationNumbers = function getDonationNumbers() {
    return db.query("SELECT COUNT (*) FROM donation");
};

module.exports.getNeedNumbers = function getNeedNumbers() {
    return db.query("SELECT COUNT (*) FROM needs");
};

//        Reset Password & Create New One             //
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

//             Upload an image                       //
module.exports.uploadImage = function uploadImage(image, id) {
    return db.query("UPDATE users SET image=$1 WHERE id=$2", [image, id]);
};

//        Getting & Sending Messages            //

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
