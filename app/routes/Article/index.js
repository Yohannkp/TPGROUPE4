const productRoute = require('express').Router(),
    productController = require('../../controllers/article');
    const {checkIsAuth} = require("../../config/jwtConfig");

module.exports = (app) => {
    productRoute.get('/articles', checkIsAuth, productController.getAll)
    productRoute.post('/article', checkIsAuth, productController.create)
    productRoute.put('/article/:uuid', checkIsAuth, productController.update)
    productRoute.delete('/article/:uuid', checkIsAuth, productController.delete)
    productRoute.get('/article/:uuid', checkIsAuth, productController.getById)
    app.use('/api/v1', productRoute)
}