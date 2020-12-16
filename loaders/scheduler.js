const schedule = require('node-schedule');
const { mailWorker } = require('../utils/mailWorker');
const { getRandomFavoriteBrandFromUsers } = require('../utils/getRandomFavoriteBrandFromUsers');

const rule = { hour: 19, minute: 30, dayOfWeek: 5 };

const scheduleLoader = () => {
  schedule.scheduleJob(rule, async () => {
    try {
      const receivers = await getRandomFavoriteBrandFromUsers();
      if (receivers.length <= 0) return;
      await mailWorker(receivers);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = scheduleLoader;
