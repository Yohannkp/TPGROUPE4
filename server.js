const cors = require("cors"),
    express= require('express'),
    dotenv= require('dotenv'),
    path= require('path');

dotenv.config({ path: path.resolve(__dirname, '.env')})

const app = express()

// cross origin ressources sharing
// Partage de ressources entre server distant et hote different de l'app
// * = toutes les origines
app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
}))

// encodade de l'url
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, (err) => {
    if(err){
        console.log('Error in server setup')
    }
    else {
        console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }
})




app.listen(3000)

/*

Connexion a mongodb
mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://root:root@tpipssi.2fpeggv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Tpipssi")
.then(
    () =>{
        console.log("Connexion a la base de donnée reussite")
    }
).catch(
    () =>{
        console.log(error)
    }
)*/