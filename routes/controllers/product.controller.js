const createError = require('http-errors');
const scraper = require('../../utils/scraper');

// const DUMMY = require('../../mock/searchList.json');

const getSearchList = async (req, res, next) => {
  const { keyword } = req.query;
  try {
    const result = await scraper.searchTargetKeyword(keyword);
    res.send(result);
    // res.send(DUMMY);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
};

module.exports = { getSearchList };
