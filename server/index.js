const newrelic = require('newrelic');
const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const models = require('./models/pgModel.js');


const port = 3333;
const app = express();
app.locals.newrelic = newrelic;

app.use(cors());
app.use(parser.json());

app.use(express.static(`${__dirname}/../dist`));
// get the names and pics of the products
app.get('/products', (req, res) => {
  models.getProducts((err, data) => {
    if (err) {
      res.sendStatus(404).end();
    } else {
      res.send(data);
    }
  });
});

// add product name, url, username, like
app.post('/products', (req, res) => {
  models.saveProduct(req.body.productId, req.body.productItem, req.body.pictureUrl, req.body.likes, (err, results) => {
    if (err) {
      res.status(400).send('Cannot add new product');
    }
    res.status(202).send(results);
  });
});

// update like of productId
app.put('/products/:productId', (req, res) => {
  models.updateProduct(req.params.productId, req.body.likes, (err, results) => {
    if (err) {
      res.status(404).end(err);
    }
    res.status(200).send(results);
  });
});

app.delete('/products/:productId', (req, res) => {
  models.deleteProduct(req.params.productId, (err, results) => {
    if (err) {
      res.status(404).send('Error occured deleting product info');
    }
    res.status(204).send(results);
  });
});

// getting item and username from wishlist
app.get('/wishlists', (req, res) => {
  models.getWishlists((err, data) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(data);
    }
  });
});

// adding product name and username to wishlist
app.post('/wishlists', (req, res) => {
  models.saveWishlist(req.body.products, req.body.username);
  if (err) {
    res.status(404).end();
  } else {
  res.end('finished');
  }
});

// get individual product item
app.get('/products/:productId', (req, res) => {
  models.getProductById(req.params.productId, (err, data) => {
    if (err) {
      res.status(404).end();
    } else {
      res.send(data);
    }
  });
});
// getting individual wishlist
app.get('/wishlists/:username', (req, res) => {
  models.getWishlistByUsername(req.params.username, (err, data) => {
    if (err) {
      // eslint-disable-next-line
      res.status(404).end();
    } else {
      res.send(data);
    }
  });
});
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`listening to ${port}`);
});
module.exports.app = app;
