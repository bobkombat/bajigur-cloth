const { Product } = require('../models');

class ProductController {
  static viewAll(req, res, next) {
    Product.findAll()
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(err => next(err));
  }

  static viewOne(req, res, next) {
    Product.findOne({where: {id: req.params.id}})
      .then(data => {
        if (data)
          return res.status(200).json(data);
        return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA PRODUCT IS NOT FOUND"});
      })
      .catch(err => next(err))
  }

  static create(req, res, next) {
    const productData = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      description: req.body.description || null,
      tags: req.body.tags || null
    }

    Product.create(productData)
      .then(data => {
        return res.status(201).json({ id: data.id, name: data.name, image_url: data.image_url, price: data.price, stock: data.stock, description: data.description, tags: data.tags })
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const productData = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: +req.body.price,
      stock: +req.body.stock,
      description: req.body.description || null,
      tags: req.body.tags || null
    }

    Product.update(productData, {where: {id: req.params.id}, returning: true})
      .then(data => {
        if (!data[1][0])
          return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA PRODUCT IS NOT FOUND"});
        return res.status(201).json(data[1][0]);
      })
      .catch(err => next(err));
  }

  static destroy(req, res, next) {
    let productDeleted;

    Product.findOne({where: {id: req.params.id}})
      .then(data => {
        if (!data)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA PRODUCT IS NOT FOUND"});
        productDeleted = data;
        return Product.delete({where: {id: req.params.id}})
      })
      .then(response => {
        res.status(200).json(productDeleted);
      })
      .catch(err => next(err))
  }
}

module.exports = ProductController;
