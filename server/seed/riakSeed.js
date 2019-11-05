const Riak = require('basho-riak-client')
const async = require('async');
const fs = require('fs');
const readline = require('readline');
const nodes = [
  '127.0.0.1:8087',
];
const client = new Riak.Client(nodes, (err, c) => {
  console.log('CLIENT CREATED');
  //fetchProduct(10000);
  //deleteProduct();
  //productSeed();
  processLineByLine();


});

const fetchProduct = (id) => {
  client.fetchValue({ bucket: 'product', key: `p${id}`, convertToJs: true }, (err, res) => {
    if (err) {console.log(err);
    } else {
      const riakObj = res.values.shift();
      console.log(riakObj.value);
    }
  });
};


const deleteProduct = (i = 0) => { client.deleteValue({ bucket: 'product', key: `p${i}`,}, (err, res) => {
  if (err) {console.log(err)}
  else {
    console.log(`deleted ${i}`);
    if (i < 1650000) {
      deleteProduct(i+1);
    } else {
      return;
    }
  }
});
};

// const assert = require('assert');

// client.ping(function (err, rslt) {
//     if (err) {
//         throw new Error(err);
//     } else {
//         // On success, ping returns true
//         assert(rslt === true);
//     }
// });

// const imagePrefix = 'https://btetsy-carousel1.s3.us-east-2.amazonaws.com/';
// const images = imageList.ilist();

// async function productSeed(j=1) {
//   const imagesLength = images.length;
//   const buffer = [];
//   for (let i = 0 + (j - 1) * 1000; i < 1000 * j; i += 1) {
//     const randomProductItem = faker.commerce.productName();
//     const productArray = [];
//     const randomNum = (max) => Math.round(Math.random() * max);
//     const randomNumUpTo4 = randomNum(4);
//     for (let x = 0; x < randomNumUpTo4 + 1; x += 1) {
//       productArray.push(imagePrefix + images[randomNum(imagesLength)]);
//     }
//     const picArray = `"{${productArray.join(',')}}"`;
//     const my_robj =  (async_cb) => {
//       client.storeValue({
//         bucket: 'product',
//         key: `p${i}`,
//         value: {
//           productId: i,
//           productItem: randomProductItem,
//           pictureUrl: productArray,
//           likes: i % 3 === 0,
//         },
//       }, (err, rslt) => {
//         async_cb(err, rslt);
//       });
//     };
//     buffer.push(my_robj);
//     // models.saveProduct(i, randomProductItem, productArray, likeArray[randomNumUpTo2]);
//   }
//   async.parallel(buffer, (err, rslts) => {
//     if (err) {
//       throw new Error(err);
//     } else {
//       console.log(`completed seed ${j}`);
//       if (j < 10000) {
//         productSeed(j + 1);
//       }
//     }

//   });
// }

// const wishlistSeed = () => {
// models.saveWishlist(['BTS BT21 Official Pyjamas Set', 'BTS - Bunny Hat Series Enamel Pin'], 'KIMTAEHYUNG');
// };


// wishlistSeed();
/*
NOTE: MAY NEED TO SET MAX_OLD_SPACE_SIZE AS BELOW WHEN RUNNING THIS FILE
node --max_old_space_size=8192 pgSeed.js
*/

// module.exports = Config;
// module.exports.createClient = createClient;
// module.exports.riakNodes = riakNodes;


async function processLineByLine(j=1) {
  const buffer = [];
  const fileStream = fs.createReadStream(`./csv/pgProductImport${1000 + j}.csv`);
  const rl = readline.createInterface({
    input: fileStream,
    clrfDelay: Infinity,
  });
  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    const fields = line.split(', "');
    const pictureArray = fields[2]
      .replace(/\{/g, '').replace(/\}/g, '').replace(/\"/g, '').split(',');
    const likes = pictureArray.pop();
    const my_robj =  (async_cb) => {
      client.storeValue({
        bucket: 'product',
        key: `p${fields[0]}`,
        value: {
          productId: parseInt(fields[0]),
          productItem: fields[1].replace(/\"/g, ''),
          pictureUrl: pictureArray,
          likes: likes === 'true',
        },
      }, (err, rslt) => {
        async_cb(err, rslt);
      });
    };
    buffer.push(my_robj);
    async.parallel(buffer, (err, rslts) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log(rslts);

        // if (j < 1000) {
        //   productSeed(j + 1);
        // }
      }
    });
    // models.saveProduct(i, randomProductItem, productArray, likeArray[randomNumUpTo2]);
  }
  if(j < 10 ) {
    processLineByLine(j+1);
  }
}
