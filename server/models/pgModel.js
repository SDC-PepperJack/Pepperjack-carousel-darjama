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

// get product by productId
const getProductById = (id, callback = () => {}) => {
  client.query('SELECT * FROM product WHERE productId = $1', [id], (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows);
    }
  });
};
// get all products
const getProducts = (callback = () => {}) => {
  client.query('SELECT * FROM product WHERE productId >= 0', (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows);

    }
  });
};

// update product when liked
const updateProduct = (productId, like, callback = () => {}) => {
  client.query('UPDATE product SET likes = $1 WHERE productId = $2', [like, productId], (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

// save 1 product
const saveProduct = (productid, productitem, pictureurl, likes, callback = () => {}) => {
  client.query('INSERT INTO product(productid, productitem, pictureurl, likes) VALUES($1, $2, $3, $4)', [productid, productitem, pictureurl, likes], (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

// save wishlist
const saveWishlist = (products, username, callback = () => {}) => {
  client.query('INSERT INTO wishlist(products, username) VALUES($1, $2)', [products, username], (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

const getWishlists = (callback = () => {}) => {
  client.query('SELECT * FROM wishlist', (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows);
    }
  });
};

// get wishlist by username
const getWishlistByUsername = (username, callback = () => {}) => {
  client.query('SELECT * FROM wishlist WHERE username = $1', [username], (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows);
    }
  });
};

// delete product on delete request
const deleteProduct = (prodId, callback = () => {}) => {
  client.query('DELETE FROM product WHERE productid = $1', [prodId], (err, res) => {
    if (err) {
      callback(err);
      console.error(err.stack);
    } else {
      callback(null, res.rows[0]);
    }
  });
};


module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.saveProduct = saveProduct;
module.exports.saveWishlist = saveWishlist;
module.exports.getProducts = getProducts;
module.exports.getWishlists = getWishlists;
module.exports.getProductById = getProductById;
module.exports.getWishlistByUsername = getWishlistByUsername;
