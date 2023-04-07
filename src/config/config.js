require('dotenv').config();

const dbUrl = `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_OPTIONS}`;

module.exports = {
    mongoDB: dbUrl,
    port: process.env.PORT,
};