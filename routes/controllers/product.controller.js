const createError = require('http-errors');
const scraper = require('../../utils/scraper');

const MATERIAL_LIST = require('../../mock/materialList.json');

const getSearchList = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const result = await scraper.searchTargetKeyword(keyword);
    res.send(result);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
};

const getProductDetail = async (req, res, next) => {
  try {
    const { id: path } = req.query;
    const result = await scraper.searchProductDetail(path);
    const mapImagePathToNote = result.notes.map(note => {
      const targetName = note.toLowerCase().replace(/\s/g, '');
      const isPath = MATERIAL_LIST.find(note => note.name === targetName);

      if (isPath) return isPath;
      return note;
    });

    result.notes = mapImagePathToNote;

    res.send(result);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
};

module.exports = { getSearchList, getProductDetail };
