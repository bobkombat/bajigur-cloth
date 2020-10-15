const { Wishlist, Product } = require('../models');

class WishlistController {
  static viewAll(req, res, next) {
    Wishlist.findAll({where: {UserId: req.userLogin.id}, include: ['Product']})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    Wishlist.findOne({where: {ProductId: req.params.product_id, UserId: req.userLogin.id}})
      .then(data => {
        if (data)
          return next({ statusMessage: "BAD_REQUEST", errorMessage: "WISHLIST DATA ALREADY EXIST"})
        return Wishlist.create({ UserId: req.userLogin.id, ProductId: req.params.product_id })
      })
      .then(response => {
        return res.status(201).json(response);
      })
      .catch(err => next(err));
  }

  static destroy(req, res, next) {
    let deletedData;

    Wishlist.findOne({where: {ProductId: req.params.product_id, UserId: req.userLogin.id}})
      .then(data => {
        deletedData = data;
        return Wishlist.destroy({where: { UserId: req.userLogin.id, ProductId: req.params.product_id }})
      })
      .then(response => {
        if (!deletedData)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "PRODUCT DATA NOT FOUND"});
        return res.status(200).json(deletedData);
      })
      .catch(err => next(err));
  }
}

module.exports = WishlistController;
