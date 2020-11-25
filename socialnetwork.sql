-- createdb socialnetwork
-- psql -d socialnetwork -f socialnetwork.sql
DROP TABLE IF EXISTS secretcodes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE secretcodes (
    id SERIAL PRIMARY KEY,
    users_email VARCHAR(100) NOT NULL REFERENCES users(email),
    code VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)