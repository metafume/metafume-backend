const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { redisClient: redis } = require('../loaders/db');
const { tokenSecretKey } = require('../configs');

const User = require('../models/User');
const Product = require('../models/Product');

const sampleProductDetail = require('./sampleProductDetail.json');

const sampleUser = {
  name: 'Ethan',
  email: 'ethan@mail.com',
  photoUrl: 'https://www.photo.com',
};

const sampleProduct = {
  productId: 'sample-1',
  brand: 'metafume',
  name: 'metafume-salt',
  image: 'https://www.example.com',
};

describe('/users', () => {
  describe('POST /users/login/google', () => {
    beforeEach(async () => {
      await User.create(sampleUser);
    });

    afterEach(async () => {
      await User.findOneAndDelete({ email: sampleUser.email });
    });

    it('should login with google info', done => {
      request(app)
        .post('/users/login/google')
        .send(sampleUser)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.user.name).to.equal(sampleUser.name);
          expect(res.body.user.email).to.equal(sampleUser.email);
          done();
        });
    });

    it('should respond bad request when get no user data', done => {
      request(app)
        .post('/users/login/google')
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /users/login/token', done => {
    let token;

    beforeEach(async () => {
      await User.create(sampleUser);
      token = jwt.sign(sampleUser, tokenSecretKey);
    });

    afterEach(async () => {
      await User.findOneAndDelete({ email: sampleUser.email });
      token = null;
    });

    it('should login with token', done => {
      request(app)
        .post('/users/login/token')
        .send({ token })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.user.name).to.equal(sampleUser.name);
          expect(res.body.user.email).to.equal(sampleUser.email);
          done();
        });
    });

    it('should respond unauthorized when get invalid token', done => {
      request(app)
        .post('/users/login/token')
        .send({ token: 'invalid-token'})
        .expect(401)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });

    it('should respond bad request when no token exists', done => {
      request(app)
        .post('/users/login/token')
        .expect(400)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /users/:user_id/favorite/:product_id', () => {
    let user;
    let product;
    let token;

    beforeEach(async () => {
      redis.set(sampleProduct.productId, JSON.stringify(sampleProductDetail));
      user = await User.create(sampleUser);
      product = await Product.create(sampleProduct);
      token = jwt.sign(user.toObject(), tokenSecretKey);
    });

    afterEach(async () => {
      redis.del(sampleProduct.productId);
      await User.findOneAndDelete({ email: sampleUser.email });
      await Product.findOneAndDelete({ productId: sampleProduct.productId });
      user = null;
      product = null;
      token = null;
    });

    it('should respond success when add new favorite successfully', done => {
      request(app)
        .post(`/users/${user._id}/favorite/${product.productId}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.product.productId).to.equal(product.productId);
          done();
        });
    });

    it('should respond error when get invalid value', done => {
      request(app)
        .post(`/users/${user._id}/favorite/no-product`)
        .set('x-access-token', token)
        .expect(500)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /users/:user_id/favorite/:product_id', () => {
    let user;
    let product;
    let token;

    beforeEach(async () => {
      redis.set(sampleProduct.productId, JSON.stringify(sampleProductDetail));
      user = await User.create(sampleUser);
      product = await Product.create(sampleProduct);
      token = jwt.sign(user.toObject(), tokenSecretKey);
    });

    afterEach(async () => {
      redis.del(sampleProduct.productId);
      await User.findOneAndDelete({ email: sampleUser.email });
      await Product.findOneAndDelete({ productId: sampleProduct.productId });
      user = null;
      product = null;
      token = null;
    });

    it('should respond success when delete favorite successfully', done => {
      request(app)
        .post(`/users/${user._id}/favorite/${product.productId}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.product.productId).to.equal(product.productId);
        });

      request(app)
        .delete(`/users/${user._id}/favorite/${product.productId}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.result).to.equal('ok');
          done();
        });
    });

    it('should respond error when get invalid value', done => {
      request(app)
        .delete(`/users/${user._id}/favorite/no-product`)
        .set('x-access-token', token)
        .expect(500)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /users/:user_id/subscription', () => {
    let user;
    let token;

    beforeEach(async () => {
      user = await User.create(sampleUser);
      token = jwt.sign(user.toObject(), tokenSecretKey);
    });

    afterEach(async () => {
      await User.findOneAndDelete({ email: sampleUser.email });
      user = null;
      token = null;
    });

    it('should update user subscription', done => {
      request(app)
        .put(`/users/${user._id}/subscription`)
        .set('x-access-token', token)
        .send({ option: true })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.isSubscribed).to.equal(true);
        });

      request(app)
        .put(`/users/${user._id}/subscription`)
        .set('x-access-token', token)
        .send({ option: false })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.isSubscribed).to.equal(false);
          done();
        });
    });

    it('should respond error when get invalid value', done => {
      request(app)
        .put(`/users/${user._id}/subscription`)
        .set('x-access-token', token)
        .send({ option: 'invalid' })
        .expect(403)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });
});
