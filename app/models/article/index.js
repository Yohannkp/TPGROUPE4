const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    UserModel = require('../user')

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    contenu: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    dateCreation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {timestamps: true})

Article.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'article_belongsTo_user',
    // The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL
    // onDelete: "RESTRICT",  Default is SET NULL
    // onUpdate: "RESTRICT",     Default is CASCADE
})
UserModel.hasMany(Article, {
    foreignKey: 'userId',
    as: 'user_has_one_article'
})
//Product.sync({ force: true })
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = Article
