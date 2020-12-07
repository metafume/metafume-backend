const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const extractData = async (url, path) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const content = await page.content();
  const $ = cheerio.load(content);

  const accords = $('.cell .accord-box').toArray();
  const notes = $('#pyramid .cell div a').toArray();
  const name = $('#toptop h1');
  const description = $('div[itemprop="description"] p').toArray();
  const imageUrl = $('img[itemprop="image"]').toArray();

  const normalizedAccords = accords.map(node => {
    const accord = { name: null, styles: {} };
    const styles = node.firstChild.attribs.style.split(';');

    accord.name = node.firstChild.firstChild.data;

    styles.pop();
    styles.forEach(attr => {
      const [property, value] = attr.split(':');
      accord.styles[property] = value.trim();
    });

    return accord;
  });

  const normalizedDescription = description[0].children.map(node => {
    if (node.name === 'b') {
      return node.children[0].data;
    } else {
      return node.data;
    }
  });

  const normalizedNotes = notes.map(node => node.next.data);
  const normalizedImageUrl = imageUrl[0].attribs.src;
  const [brand, productId] = path.split('/');

  return {
    brand,
    productId,
    name: name.contents()[0].data.trim(),
    description: normalizedDescription.join('').trim(),
    accords: normalizedAccords,
    notes: normalizedNotes,
    imageUrl: normalizedImageUrl,
  };
};

const searchTargetKeyword = async keyword => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.fragrantica.com/search/?query=${keyword}`);
  await page.waitForSelector('.perfumes-row');

  const content = await page.content();
  const $ = cheerio.load(content);

  const items = $('.perfumes-row').children().toArray();
  const normalizedItems = items.map(node => {
    const brand = node.lastChild.firstChild.firstChild.attribs.href.split('/')[4];
    const name = node.lastChild.firstChild.firstChild.children[0].data.trim();
    const productId = node.lastChild.firstChild.firstChild.attribs.href.split('/')[5].match(/.*(?=\.)/gm)[0];
    const imageUrl = node.firstChild.childNodes[0].attribs.src;

    return { brand, name, productId, imageUrl };
  });

  await browser.close();

  return normalizedItems;
};

const searchProductDetail = async path => {
  const url = `https://www.fragrantica.com/perfume/${path}.html`;
  const data = await extractData(url, path);
  return data;
};

process.on('message', async data => {
  try {
    const { type, payload } = data;
    let result;

    if (type === 'getSearchList') {
      result = await searchTargetKeyword(payload);
    }

    process.send({ type: 'ok', payload: result });
  } catch (err) {
    console.log(err);
    process.send({ type: 'error', message: err.message });
  }
});

module.exports = {
  searchTargetKeyword,
  searchProductDetail,
};
