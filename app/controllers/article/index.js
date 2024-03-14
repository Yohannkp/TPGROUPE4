const productModel = require('../../models/article')

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', products: await productModel.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const { name, price, quantity, userId } = req.body
    try {
        const product = await productModel.create({
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            userId
        })
        if (!product.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', product: product.dataValues})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { name, price, quantity, userId } = req.body
        const { uuid } = req.params
        const product = await productModel.update({
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            userId
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', product})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const product = await productModel.destroy( {where: { id: uuid}})
        console.log(product)
        if (!product){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        // const product = await productModel.findByPk(uuid)
        const product = await productModel.findOne({
            include: [
                {
                association: 'article_belongsTo_user', // alias = as
                attributes: { exclude: [ 'createdAt', 'updatedAt', 'password' ] }
            }
            ],
            where: {id: uuid},
            attributes: {
                exclude: [
                    'createdAt'
                ]
            }
        })
        console.log(product.dataValues)
        if (!product){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', product: product.dataValues})
        // return product.id ? res.status(200).json({ msg: 'OK', product}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
