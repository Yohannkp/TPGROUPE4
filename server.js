const cors = require("cors"),
    express = require('express'),
    dotenv = require('dotenv'),
    path = require('path'),
    mysql = require('mysql2'),
    bcrypt = require('bcrypt'),
    uuid = require('uuid');

dotenv.config({ path: path.resolve(__dirname, '.env') })

const app = express()

app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'app', 'view')))

require('./app/routes')(app)
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connexion à la base de données réussie');
});

app.get('/inscription', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'view', 'inscription.html'));
});

app.post('/inscription', async (req, res) => {
    const { nom, prenom, email, pseudo, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuid.v4();

        connection.query(
            'INSERT INTO users (id, nom, prenom, email, pseudo, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
            [id, nom, prenom, email, pseudo, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error('Erreur lors de l\'inscription :', err);
                    res.status(500).send('Erreur lors de l\'inscription');
                    return;
                }
                res.sendFile(path.join(__dirname, 'app', 'view', 'articles.html'));
            }
        );
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe :', error);
        res.status(500).send('Erreur lors de l\'inscription', error);
    }
});

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'app', 'view', 'index.html'))
})

app.use((req, res) => {
    return res.status(404).sendFile(path.join(__dirname, 'app', 'view', '404.html'))
})

app.listen(8080, process.env.SERVER_HOTS, (err) => {
    if (err) {
        console.log('Error server setup')
    } else {
        console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }
})
