const productRoute = require('express').Router(),
    productController = require('../../controllers/article');

module.exports = (app) => {
    productRoute.get('/articles', productController.getAll)
    productRoute.post('/article', productController.create)
    productRoute.put('/article/:uuid', productController.update)
    productRoute.delete('/article/:uuid', productController.delete)
    productRoute.get('/article/:uuid', productController.getById)
    app.use('/api/v1', productRoute)
}