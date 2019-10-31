const axios = require('axios');
const request = require('supertest')('http://localhost:3333');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const productModel = require('../../../server/models/index.js');

const { MyWishlistModel } = productModel;
MyWishlistModel.find({ username: /test_User/i }).deleteOne().exec();

describe('Product Model Test', () => {

  // beforeAll(async () => {
  //   await mongoose.connect('mongodb://localhost/BTetsy', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useFindAndModify: false,
  //   }, (err) => {
  //     console.error(err);
  //     process.exit(1);
  //   });
  // });

  test('it should retrieve product data from the database', async () => {
    const result = await productModel.getProducts();
    expect(result).toBeDefined();
    expect(result.length).toBe(19);
    expect(result[0].productItem).toBe('BTS BT21 Official Pyjamas Set');
  });

  test('it should retrieve product data by id from the database', async () => {
    const result = await productModel.getProductById(1);
    expect(result).toBeDefined();
    expect(result[0].pictureUrl.length).toBe(3);
    expect(result[0].productItem).toBe('BTS BT21 Official Pyjamas Set');
  });

  test('it should retrieve wishlist data from the database', async () => {
    const result = await productModel.getWishlists();
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[1].username).toBe('KIMTAEHYUNG');
  });

  test('it should retrieve wishlist data by username from the database', async () => {
    const result = await productModel.getWishlistByUsername('KIMTAEHYUNG');
    expect(result).toBeDefined();
    expect(result[0].products.length).toBe(2);
  });

  test('it should fetch a created wishlist from the database', async () => {
    const _ = await productModel.saveWishlist(['Test Item1', 'Test Item2', 'Test Item3'], 'test_User');
    const result = await productModel.getWishlists();
    expect(result.length).toBe(3);
    MyWishlistModel.find({ username: /test_User/i }).deleteOne().exec();
  });
});


xdescribe('API Routes', () => {
  test('A get request to /products/3 should return the requested product', (done) => {
    request.get('/products/3')
      .expect(200)
      .expect((res) => {
        expect(res.body[0].productId).toEqual(3);
        expect(res.body[0].productItem).toEqual('BTS - Bunny Hat Series Enamel Pin');
      })
      .end(done);
  });
});
