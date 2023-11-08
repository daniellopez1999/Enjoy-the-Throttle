const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'enjoythethrottle';

mongoose
  .connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`🦆 Database (JWT) connected @ port ${DB_PORT}!`);
  })
  .catch((err) => {
    console.error(`😞 Sorry, something went wrong! ${err}`);
  });

module.exports = mongoose;
