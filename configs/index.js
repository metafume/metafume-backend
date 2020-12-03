require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  databaseUrl: process.env.MONGO_DB_URL,
  mongooseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'metafume',
  },
};
