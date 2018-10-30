const router = require('express').Router();
const { Product, Category } = require('../db/models');


router.get('/', (req, res, next) => {
    Product.findAll({ include: Category })
        .then(products => res.send(products))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => res.send(product))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => res.send(product))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => product.update(req.body))
        .then(product => res.send(product))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Product.destroy({ where: { id: req.params.id }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


module.exports = router;