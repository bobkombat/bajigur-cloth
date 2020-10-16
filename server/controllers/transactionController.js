const {
  TransactionHistory,
  TransactionInvoice,
  Cart,
  Product,
} = require("../models");

class TransactionController {
  static viewUserTransaction(req, res, next) {
    TransactionInvoice.findAll({
      where: { UserId: req.userLogin.id },
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "name",
            "image_url",
            "price",
            "stock",
            "description",
            "tags",
          ],
          required: true,
        },
      ],
      attributes: { exclude: ["UserId"] },
    })
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => next(err));
  }

  static create(req, res, next) {
    let cartData, totalCartAmount, TransactionInvoiceId, transactionData;

    Cart.findAll({ where: { UserId: req.userLogin.id }, include: [{model: Product}] })
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          cartData = data;

          totalCartAmount = cartData.reduce(
            (a, b) => a + b.quantity * b.Product.price,
            0
          );

          return TransactionInvoice.create({
            UserId: req.userLogin.id,
            total_amount: totalCartAmount,
          });
        } else {
          console.log('masuk sini');
          return next({ statusMessage: "BAD_REQUEST", errorMessage: "CART IS EMPTY"});
        }
      })
      .then((response1) => {
        TransactionInvoiceId = response1.id;

        transactionData = cartData.map((x) => ({
          TransactionInvoiceId: TransactionInvoiceId,
          ProductId: x.ProductId,
          total_amount: x.quantity * x.Product.price,
          quantity: x.quantity
        }));

        return Promise.all([
          TransactionHistory.bulkCreate(transactionData),
          Cart.destroy({ where: { UserId: req.userLogin.id } }),
          ...cartData.map(x => Product.update({quantity: x.Product.stock - x.quantity}, {where: {id: x.ProductId}}))
        ]);
      })
      .then((response2) => {
        return res.status(201).json(response2[0]);
      })
      .catch((err) => next(err));
  }
}

module.exports = TransactionController;
