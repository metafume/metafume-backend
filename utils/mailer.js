const { parentPort } = require('worker_threads');
const nodemailer = require('nodemailer');
const { nodemailerUser, nodemailerPass } = require('../configs');

const { template } = require('./mailTemplate');
const { OK } = require('../configs/constants');

const transportOptions = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
};

const sendMail = async (receiver, keyword) => {
  const content = template(keyword);

  const transporter = nodemailer.createTransport(transportOptions);

  await transporter.sendMail({
    from: `Metafume <${nodemailerUser}>`,
    to: receiver,
    subject: 'METAFUME',
    html: content,
  });

  console.log('Sent message: %s', receiver);
};

parentPort.on('message', async receivers => {
  const promisedList =
    receivers.map(({ email, keyword }) => sendMail(email, keyword));

  await (async promises => {
    return await Promise.all(promises);
  })(promisedList);

  parentPort.postMessage(OK);
});
