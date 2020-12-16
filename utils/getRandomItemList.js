const _ = require('lodash');

exports.getRandomItemList = (list, max) => {
  const randomList = [];
  const memo = {};

  while (Object.keys(memo).length < max) {
    const value = _.random(list.length - 1);
    if (memo[value]) continue;
    memo[value] = true;
  }

  for (const index of Object.keys(memo)) {
    randomList.push(list[index]);
  }

  return randomList;
};
