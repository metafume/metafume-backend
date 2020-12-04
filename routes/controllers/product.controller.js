const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const DUMMY = require('../../mock/searchList.json');

const searchTargetKeyword = async keyword => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.fragrantica.com/search/?query=${keyword}`);
  await page.waitForSelector('.perfumes-row');

  const content = await page.content();
  const $ = cheerio.load(content);

  const items = $('.perfumes-row').children().toArray();
  const normalizedItems = items.map(node => {
      const imageUrl = node.firstChild.childNodes[0].attribs.src;
      const productId = node.lastChild.firstChild.firstChild.attribs.href.split('/')[5].match(/.*(?=\.)/gm)[0];
      const name = node.lastChild.firstChild.firstChild.children[0].data.trim();
      return { name, productId, imageUrl };
  });

  await browser.close();

  return normalizedItems;
};

const getSearchList = async (req, res, next) => {
  const { keyword } = req.query;
  console.log('query:', req.query);
  try {
    // const result = await searchTargetKeyword(keyword);
    // console.log('getSearchList ~ result', result);
    // res.send(result);
    res.send(DUMMY);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: 'No result' });
    // next(err);
  }
};

module.exports = { getSearchList };
