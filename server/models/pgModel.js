require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'btetsycarousel',
  password: '',
  port: 5432,
});

client.connect();

const getProductById = (id, callback = () => {}) => {
  client.query('SELECT * FROM product WHERE productid = $1', [id], (err, res) => {
    if (err) {
      throw new Error(err);
    } else {
      callback(err, res.rows);

    }
  });
};

// const Product = mongoose.Schema({
//   productId: { type: Number, unique: true },
//   productItem: String,
//   pictureUrl: Array,
//   like: Boolean,
// });
// const Wishlist = mongoose.Schema({
//   products: Array,
//   username: { type: String, unique: true },
// });

// const MyProductsModel = mongoose.model('Product', Product);
// const MyWishlistModel = mongoose.model('Wishlist', Wishlist);

// // save 1 product
// const saveProduct = (productId, productItem, pictureUrl, like) => {
//   const instance = new MyProductsModel({
//     productId,
//     productItem,
//     pictureUrl,
//     like,
//   });
//   instance.save((err) => {
//     if (!err) {
//       // eslint-disable-next-line
//       console.log('success');
//     }
//   });
// };

// const saveWishlist = async (products, username) => {
//   const instance = new MyWishlistModel({
//     products,
//     username,
//   });
//   await instance.save();
// };

// const getProducts = (callback = () => {}) => {
//   MyProductsModel.find({}).sort([['productId', 'ascending']]).exec((err, docs) => {
//     callback(err, docs);
//   });
// };
// const getWishlists = (callback = () => {}) => {
//   MyWishlistModel.find({}, (err, docs) => {
//     callback(err, docs);
//   });
// };
// // get product by id
// const getProductById = (productId, callback = () => {}) => {
//   MyProductsModel.find({ productId }, (err, docs) => {
//     callback(err, docs);
//   });
// };
// // get wishlist by username
// const getWishlistByUsername = (username, callback = () => {}) => {
//   MyWishlistModel.find({ username }, callback);
// };
// // update product when liked
// const updateProduct = (productId, like, callback = () => {}) => {
//   MyProductsModel.updateOne({ productId }, { like }, (err, docs) => {
//     callback(err, docs);
//   });
// };
// // delete product on delete request
// const deleteProduct = (prodId, callback = () => {}) => {
//   console.log("deleting ", prodId)
//   MyProductsModel.deleteOne({ productId: prodId }, (err, docs) => {
//     callback(err, docs);
//   });
// };

// module.exports.updateProduct = updateProduct;
// module.exports.deleteProduct = deleteProduct;
// module.exports.saveProduct = saveProduct;
// module.exports.saveWishlist = saveWishlist;
// module.exports.getProducts = getProducts;
// module.exports.getWishlists = getWishlists;
module.exports.getProductById = getProductById;
// module.exports.getWishlistByUsername = getWishlistByUsername;
// module.exports.MyWishlistModel = MyWishlistModel;
