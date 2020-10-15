const { TransactionHistory, TransactionInvoice } = require('../models');

class TransactionController {
  static viewAll(req, res, next) {
    TransactionInvoice.findAll({where: {UserId: req.userLogin.id}, include: ['TransactionHistory', 'Product']})
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {

  }
}

module.exports = TransactionController;
