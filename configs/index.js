require('dotenv').config();

const env = process.env.NODE_ENV;

const redisOptions = {
  host : process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_ACCESS_KEY,
};

const puppeteerOptions = {
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

module.exports = {
  clientUrl:
    env === 'production' ?
    process.env.CLIENT_URL :
    process.env.LOCAL_CLIENT_URL,
  port: process.env.PORT,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  databaseUrl:
    env === 'production' ?
    process.env.MONGO_DB_URL :
    process.env.LOCAL_MONGO_DB_URL,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASS,
  mongooseOptions: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'metafume',
  },
  redisOptions:
    env === 'production' ?
    redisOptions : {},
  corsOptions: {
    origin:
      env === 'production' ?
      process.env.CLIENT_URL :
      process.env.LOCAL_CLIENT_URL,
    optionsSuccessStatus: 200,
  },
  puppeteerOptions:
    env === 'production' ?
    puppeteerOptions : {},
};
