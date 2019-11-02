const fs = require('fs');
// const { Pool, Client } = require('pg');
const faker = require('faker');
// const models = require('../models/index.js');
const imageList = require('./imageList.js');

const imagePrefix = 'https://btetsy-carousel1.s3.us-east-2.amazonaws.com/';
const images = imageList.ilist();
// const pool = new Pool();


const productSeed = () => {
  const imagesLength = images.length;
  for (let j = 1; j <= 25; j += 1) {
    let buffer = '';
    for (let i = 0 + (j - 1) * 400000; i < 400000 * j; i += 1) {
      const randomProductItem = faker.commerce.productName();
      const likeArray = [true, false];
      const productArray = [];
      const randomNum = (max) => Math.floor(Math.random() * max);
      const randomNumUpTo4 = randomNum(4);
      const randomNumUpTo2 = randomNum(2);
      for (let j = 0; j < randomNum(randomNumUpTo4) + 1; j += 1) {
        productArray.push(imagePrefix + images[randomNum(imagesLength)]);
      }
      const picArray = `"{${productArray.join(',')}}"`;
      buffer += `${i}, ""${randomProductItem}"", ${picArray},${likeArray[randomNumUpTo2]}\n`;
      // models.saveProduct(i, randomProductItem, productArray, likeArray[randomNumUpTo2]);
    }
    fs.writeFile(`pgProductRecordImport${100 + j}.csv`, buffer, (err) => {
      if (err) throw err;
      console.log('file saved!');
    });
  }
};

// const wishlistSeed = () => {
//   models.saveWishlist(['BTS BT21 Official Pyjamas Set', 'BTS - Bunny Hat Series Enamel Pin'], 'KIMTAEHYUNG');
// };

productSeed();
// wishlistSeed();
