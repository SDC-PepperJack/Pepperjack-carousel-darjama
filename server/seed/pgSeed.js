const fs = require('fs');
const faker = require('faker');
const imageList = require('./imageList.js');

const imagePrefix = 'https://btetsy-carousel1.s3.us-east-2.amazonaws.com/';
const images = imageList.ilist();

async function productSeed() {
  const imagesLength = images.length;
  for (let j = 1; j <= 10; j += 1) {
    let buffer = '';
    for (let i = 0 + (j - 1) * 1000000; i < 1000000 * j; i += 1) {
      const randomProductItem = faker.commerce.productName();
      const productArray = [];
      const randomNum = (max) => Math.round(Math.random() * max);
      const randomNumUpTo4 = randomNum(4);
      for (let x = 0; x < randomNumUpTo4 + 1; x += 1) {
        productArray.push(imagePrefix + images[randomNum(imagesLength)]);
      }
      const picArray = `"{${productArray.join(',')}}"`;
      buffer += `${i}, ""${randomProductItem}"", ${picArray},${i % 3 === 0}\n`;
      // models.saveProduct(i, randomProductItem, productArray, likeArray[randomNumUpTo2]);
    }
    const result = await fs.writeFileSync(`./csv/pgProductImport${1000 + j}.csv`, buffer);
    console.log(result + j);
  }
}

// const wishlistSeed = () => {
//   models.saveWishlist(['BTS BT21 Official Pyjamas Set', 'BTS - Bunny Hat Series Enamel Pin'], 'KIMTAEHYUNG');
// };

productSeed();
// wishlistSeed();
/*
NOTE: MAY NEED TO SET MAX_OLD_SPACE_SIZE AS BELOW WHEN RUNNING THIS FILE
node --max_old_space_size=8192 pgSeed.js
*/
