require('dotenv').config({ path: './.env' });
export default {
  secret: process.env.APP_SECRET,
  expireIn: '7d',
};
