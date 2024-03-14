const { Sequelize } = require('sequelize'),
    dotenv = require("dotenv");
dotenv.config()


const sqlite3 = require('sqlite3').verbose();

// Chemin vers le fichier de la base de données SQLite
const dbPath = './app/config/sqlite.db';

// Créer une nouvelle connexion à la base de données
const db = new sqlite3.Database(dbPath);

// Définir les requêtes SQL pour créer les tables
const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        nom TEXT,
        prenom TEXT,
        email TEXT UNIQUE,
        pseudo TEXT UNIQUE,
        password TEXT,
        createdAt Date,
        updatedAt Date,
        token TEXT
    );

    CREATE TABLE IF NOT EXISTS Articles (
        id INTEGER PRIMARY KEY,
        nom TEXT,
        contenu TEXT,
        date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
        date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP,
        createur_id INTEGER,
        FOREIGN KEY (createur_id) REFERENCES Utilisateurs(id)
    );
`;

// Exécuter la requête pour créer les tables
db.serialize(() => {
    db.run(createTablesQuery, (err) => {
        if (err) {
            console.error('Erreur lors de la création des tables :', err.message);
        } else {
            console.log('Tables créées avec succès.');
        }
    });
});



const sequelize = new Sequelize({
    dialect: 'sqlite', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    storage: dbPath
});





(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize