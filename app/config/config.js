const DB_IP = process.env.DB_IP || 'wbdb.c1wcssiiki5n.ap-northeast-1.rds.amazonaws.com';
const USER_NAME = process.env.USER_NAME || 'myuser';
const USER_PASSWORD = process.env.USER_PASSWORD || 'mypassword!';
const DATABASE_NAME = process.env.DATABASE_NAME || 'wbdb';
const TABLE_NAME = process.env.TABLE_NAME || 'USER';

module.exports = { DB_IP, USER_NAME, USER_PASSWORD, DATABASE_NAME, TABLE_NAME };
