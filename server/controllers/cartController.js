const { Cart, Product } = require('../models');

class CartController {
  static viewAll(req, res, next) {
    Cart.findAll({where: { user_id: req.userLogin.id }, include: ['Product']})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    const { quantity } = req.body;
    let productData;

    Product.findOne({where: {id: req.params.product_id}})
      .then(data => {
        if (!data)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA PRODUCT IS NOT FOUND"});
        productData = data;
      })
      .catch(err => next(err))

    Cart.findOne({where: {user_id: req.userLogin.id, product_id: req.params.product_id, include: ['Product']}})
      .then(data => {
        if (data) {
          const totalQuantity = quantity + data.quantity;

          if (productData.stock < totalQuantity)
            return next({ statusMessage: "BAD_REQUEST", errorMessage: "QUANTITY INPUT IS BIGGER THAN PRODUCT STOCK" })

          Cart.update({ quantity: totalQuantity }, {where: {id: data.id}, returning: true})
            .then(response => {
              return res.status(201).json(data[1][0]);
            })
            .catch(err => next(err));
        } else if (productData.stock >= quantity) {
          Cart.create({ user_id: req.userLogin.id, product_id: req.params.product_id, quantity })
            .then(data => {
              return res.status(201).json(data);
            })
            .catch(err => next(err));
        }
      })
      .catch(err => next(err))
  }

  static update(req, res, next) {
    const { quantity } = req.body;

    Cart.findOne({where: {user_id: req.userLogin.id, product_id: req.params.product_id, include: ['Product']}})
      .then(data => {
        if (data) {
          const totalQuantity = quantity + data.quantity;

          if (data.Product.stock < totalQuantity)
            return next({ statusMessage: "BAD_REQUEST", errorMessage: "QUANTITY INPUT IS BIGGER THAN PRODUCT STOCK" })

          Cart.update({ quantity: totalQuantity }, {where: {id: data.id}, returning: true})
            .then(response => {
              return res.status(201).json(data[1][0]);
            })
            .catch(err => next(err));
        } else {
          return next({ statusMessage: "NOT_FOUND", errorMessage: "CART IS NOT FOUND"});
        }
      })
      .catch(err => next(err))
  }

  static destroy(req, res, next) {
    let cartDeleted;

    Cart.findOne({where: {id: req.params.cart_id}})
      .then(data => {
        cartDeleted = data;
        return Cart.destroy({where: {id: req.params.cart_id}})
      })
      .then(response => {
        if (!cartDeleted)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA CART IS NOT FOUND"});
        return res.status(200).json(cartDeleted);
      })
      .catch(err => next(err))
  }
}

module.exports = CartController;
