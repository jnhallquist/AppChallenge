module.exports = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017',
  port    : process.env.PORT || 8000,
  url     : process.env.NODE_ENV == 'Production' ? null : 'localhost:8000'
};
