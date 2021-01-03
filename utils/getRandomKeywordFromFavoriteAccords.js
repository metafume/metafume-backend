const _ = require('lodash');

exports.getRandomKeywordFromFavoriteAccords = accordsRate => {
  let target;
  let keyword;

  if (accordsRate.length > 0) {
    accordsRate.sort((a, b) => b.rate - a.rate);
    target = _.random(0, Math.ceil(accordsRate.length / 3));
  }
  if (accordsRate[target]) keyword = accordsRate[target].name;

  return keyword;
};
