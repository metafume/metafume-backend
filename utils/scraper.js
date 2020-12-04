const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const userAgent = require('user-agents');

const getHtml = async url => {
  const userAgentStringified = new userAgent().toString();
  const result = await axios.get(url, {
    headers: {
      'User-Agent': userAgentStringified,
    },
  });

  return result.data;
};

const extractData = async url => {
  const html = await getHtml(url);
  const $ = cheerio.load(html);

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

  return {
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
  const data = await extractData(url);
  return data;
};

module.exports = {
  searchTargetKeyword,
  searchProductDetail,
};
