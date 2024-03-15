const UserModel = require('../../models/user');
const { checkPassword } = require('../../utils/bcrypt');
const { jwtSign } = require("../../config/jwtConfig");

exports.signIn = async (req, res) => {
    if (!req.body) return res.status(400).json({msg: 'BAD RESQUEST BODY IS REQUIRED'})
    try {
        const {email, password} = req.body
        const user = await UserModem.findOne({where: {email}})
        if (user.dataValues.email !== email || !checkPassword(password, user.password)) {
            return res.status(400).json({msg: 'BAD REQUEST PASSWORD OR EMAIL NOT VALID'})
        }
        const token = await jwtSign({id: user.id, email: user.email})
        const uUser = await UserModel.update({token}, {where: {id: user.id}})
    } catch (e) {
        return res.status(400).json({msg: 'BAD REQUEST'})
    }
}
exports.signUp = async (req,res) => {

    }
