const { Banner } = require('../models');

class BannerController {
  static viewAll(req, res, next) {
    Banner.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  }

  static viewOne(req, res, next) {
    Banner.findOne({where: {id: req.params.id}})
      .then(data => {
        if (data)
          return res.status(200).json(data)
        return next({ statusMessage: "NOT_FOUND", errorMessage: "BANNER DATA NOT FOUND"})
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    const { name, image_url, expired } = req.body;

    Banner.create({ name, image_url, expired })
      .then(data => res.status(201).json(data))
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { name, image_url, expired } = req.body;

    Banner.update({name, image_url, expired}, {where: {id: req.params.id}, returning: true})
      .then(data => {
        if (data[0] == 0)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "BANNER DATA NOT FOUND"})
        return res.status(200).json(data[1][0])
      })
      .catch(err => next(err));
  }

  static destroy(req, res, next) {
    let deletedBanner;

    Banner.findOne({where: {id: req.params.id}})
      .then(data => {
        deletedBanner = data;
        return Banner.destroy({where: {id: req.params.id}})
      })
      .then(data => {
        if (data)
          return res.status(200).json(deletedBanner)
        return next({ statusMessage: "NOT_FOUND", errorMessage: "BANNER DATA NOT FOUND"})
      })
      .catch(err => next(err));
  }
}

module.exports = BannerController;
