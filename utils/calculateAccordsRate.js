const { INCREASE } = require('../configs/constants');

const increaseAccordRate = (obj, accord) => {
  if (obj[accord.name]) {
    obj[accord.name].rate += parseInt(accord.styles.width);
  } else {
    obj[accord.name] = {
      rate: parseInt(accord.styles.width),
      color: accord.styles.background,
    };
  }
  return obj;
};

const decreaseAccordRate = (obj, accord) => {
  if (obj[accord.name]) {
    obj[accord.name].rate -= parseInt(accord.styles.width);
    if(obj[accord.name].rate <= 0) delete obj[accord.name];
  }
  return obj;
};

exports.calculateAccordsRate = (source, target, option) => {
  const reducer =
    option === INCREASE ? increaseAccordRate : decreaseAccordRate;

  const sourceAccordsRate = source.reduce((obj, accord) => {
    obj[accord.name] = { rate: accord.rate, color: accord.color };
    return obj;
  }, {});

  const calculatedAccordsRate = target.accords.reduce(reducer, sourceAccordsRate);

  const normalizedResult = Object.entries(calculatedAccordsRate)
  .map(([key, value]) => ({ name: key, ...value }));

  return normalizedResult;
};
