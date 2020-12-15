require('dotenv').config();

module.exports = {
  clientUrl: process.env.CLIENT_URL,
  port: process.env.PORT,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  databaseUrl: process.env.MONGO_DB_URL,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASS,
  mongooseOptions: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'metafume',
  },
  redisOptions: {
    host : process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_ACCESS_KEY,
  },
  corsOptions: {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
  },
};
