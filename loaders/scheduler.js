const schedule = require('node-schedule');
const { mailWorker } = require('../utils/mailWorker');
const _ = require('lodash');

const User = require('../models/User');

const rule = { hour: 19, minute: 30, dayOfWeek: 5 };

const scheduleLoader = () => {
  schedule.scheduleJob(rule, async () => {
    try {
      const users = await User.find().lean();
      const receivers = [];

      users.forEach(user => {
        if (user.isSubscribed) {
          const keyword =
            user.favoriteBrand[_.random(0, user.favoriteBrand.length - 1)];

            receivers.push({
            email: user.email,
            keyword,
          });
        }
      });

      if (receivers.length <= 0) return;
      await mailWorker(receivers);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = scheduleLoader;
