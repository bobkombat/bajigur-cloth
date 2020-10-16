const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  Admin,
  TransactionHistory,
  TransactionInvoice,
  User,
  Wishlist,
  Cart,
  Product,
} = require("../models");

class AdminUserController {
  static login(req, res, next) {
    if (!req.body.email)
      return next({
        statusMessage: "NOT_FOUND",
        errorMessage: "DATA ADMIN IS NOT FOUND",
      });
    if (!req.body.password)
      return next({
        statusMessage: "INVALID_ACCOUNT",
        errorMessage: "EMAIL/PASSWORD IS WRONG",
      });

    Admin.findOne({ where: { email: req.body.email } })
      .then((data) => {
        if (!data)
          return next({
            statusMessage: "NOT_FOUND",
            errorMessage: "DATA ADMIN IS NOT FOUND",
          });

        if (bcrypt.compareSync(req.body.password, data.password)) {
          const access_token = jwt.sign(
            { id: data.id, email: data.email, role: "admin" },
            process.env.JWT_SECRET
          );
          return res.status(200).json({ access_token });
        }
        return next({
          statusMessage: "INVALID_ACCOUNT",
          errorMessage: "EMAIL/PASSWORD IS WRONG",
        });
      })
      .catch((err) => {
        return next(err);
      });
  }

  static viewAllUser(req, res, next) {
    User.findAll({ attributes: { exclude: ["password"] } })
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  }

  static viewOneUser(req, res, next) {
    User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
    })
      .then((data) => {
        if (data)
          return res.status(200).json(data)
        return next({ statusMessage: "NOT_FOUND", errorMessage: "USER DATA NOT FOUND"})
      })
      .catch((err) => next(err));
  }

  static viewUserWishlist(req, res, next) {
    User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Wishlist,
          include: [{ model: Product }],
          attributes: ["id", "createdAt", "updatedAt"],
        },
      ],
    })
      .then((data) => {
        if (data)
          return res.status(200).json(data)
        return next({ statusMessage: "NOT_FOUND", errorMessage: "USER DATA NOT FOUND"})
      })
      .catch((err) => next(err));
  }

  static viewUserCart(req, res, next) {
    User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Cart,
          include: [{ model: Product }],
          attributes: ["id", "createdAt", "updatedAt"],
        },
      ],
    })
      .then((data) => {
        if (data)
          return res.status(200).json(data)
        return next({ statusMessage: "NOT_FOUND", errorMessage: "USER DATA NOT FOUND"})
      })
      .catch((err) => next(err));
  }

  static viewUserTransaction(req, res, next) {
    User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: TransactionInvoice,
          include: [{ model: Product }],
          attributes: ["id", "createdAt", "updatedAt", "total_amount"],
        },
      ],
    })
      .then((data) => {
        if (data)
          return res.status(200).json(data)
        return next({ statusMessage: "NOT_FOUND", errorMessage: "USER DATA NOT FOUND"})
      })
      .catch((err) => next(err));
  }
}

module.exports = AdminUserController;
