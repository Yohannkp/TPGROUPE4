const { Sequelize } = require('sequelize'),
    dotenv = require("dotenv");
dotenv.config()

const mysql = require('mysql2');

// Configurer la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

// Créer une base de données
connection.query('CREATE DATABASE IF NOT EXISTS node', (err, results) => {
  if (err) {
    console.error('Erreur lors de la création de la base de données :', err);
    return;
  }
  console.log('Base de données créée avec succès.');
});

// Fermer la connexion
connection.end();










const sequelize = new Sequelize('mysql://root:@localhost:3306/node');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();



(async () => {
    await sequelize.sync({ force: false });
    console.log('Tables synchronisées avec succès.');
})();


module.exports = sequelize