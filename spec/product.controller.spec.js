const sinon = require('sinon');
const Controller = require('../routes/controllers/product.controller');
const scraper = require('../utils/scraper');
const redis = require('../lib/redis');

describe('/products (controller)', () => {
  let req;
  let res;
  let next;
  let expectedResult;

  describe('GET /products/search', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = { query: { keyword: 'chloe' } };
      res = { status: sinon.stub().returns({ json: sinon.spy() }) };
      next = sinon.spy();
      expectedResult = ['a', 'b', 'c'];
    });

    afterEach(() => sandbox.restore());

    it('should return search list', async () => {
      sandbox.stub(scraper, 'searchTargetKeyword').resolves(expectedResult);

      await Controller.getSearchList(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.match(res.status().json.args[0][0], expectedResult);
    });

    it('should execute next function on server error', async () => {
      sandbox.stub(scraper, 'searchTargetKeyword').throws();

      await Controller.getSearchList(req, res, next);

      sinon.assert.calledOnce(next);
    });
  });

  describe('GET /products/detail', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = { query: { id: 'path' } };
      res = { status: sinon.stub().returns({ json: sinon.spy() }) };
      next = sinon.spy();
      expectedResult = { productId: 'id-1', name: 'metafume' };
    });

    afterEach(() => sandbox.restore());

    it('should return product detail information', async () => {
      sandbox.stub(redis, 'get').resolves('');
      sandbox.stub(scraper, 'searchProductDetail').resolves(expectedResult);
      sandbox.stub(redis, 'set').returns();
      sandbox.stub(redis, 'sadd').returns();

      await Controller.getProductDetail(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.match(res.status().json.args[0][0], expectedResult);
    });

    it('should execute next function on server error', async () => {
      sandbox.stub(redis, 'get').resolves('');
      sandbox.stub(scraper, 'searchProductDetail').throws();

      await Controller.getProductDetail(req, res, next);

      sinon.assert.calledOnce(next);
    });
  });

  describe('GET /products/recent', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      req = {};
      res = { status: sinon.stub().returns({ json: sinon.spy() }) };
      next = sinon.spy();
      expectedResult = [
        {
          brand: 'metafume',
          name: 'metafume-salt',
          productId: '1',
          imageUrl: 'http://www.example.com',
        },
        {
          brand: 'metafume',
          name: 'metafume-salt',
          productId: '2',
          imageUrl: 'http://www.example.com',
        },
        {
          brand: 'metafume',
          name: 'metafume-salt',
          productId: '3',
          imageUrl: 'http://www.example.com',
        },
      ];
    });

    afterEach(() => sandbox.restore());

    it('should return recent view list', async () => {
      sandbox.stub(redis, 'srandmember').resolves([{ id: '1' }, { id: '2' }, { id: '3' }]);
      sandbox.stub(redis, 'get').callsFake(({ id }) => {
        return new Promise(resolve => {
          resolve(JSON.stringify({
            productId: id,
            brand: 'metafume',
            name: 'metafume-salt',
            imageUrl: 'http://www.example.com',
          }));
        });
      });

      await Controller.getRecentViewList(req, res, next);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.match(res.status().json.args[0][0], expectedResult);
    });

    it('should execute next function on server error', async () => {
      sandbox.stub(redis, 'srandmember').throws();

      await Controller.getProductDetail(req, res, next);

      sinon.assert.calledOnce(next);
    });
  });
});
