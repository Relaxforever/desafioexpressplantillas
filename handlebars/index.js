const express = require('express');
const Contenedor = require('../Desafio 3 Clase')
const {parse} = require("nodemon/lib/cli");
const { Router } = express
const handlebars = require("express-handlebars");
const ContenedorEx =  new Contenedor('texto1.txt')
const app = express()
const router = Router();

//establecemos la configuración de handlebars



app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use('/api/productos', router);
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080;


app.get('/', async (req, res) => {
    res.render('createProduct');
})


app.get('/productos', async (req, res) => {
    const arrayAll = await ContenedorEx.getAll()
    //return res.send( arrayAll)
    console.log(arrayAll)
    res.render("productList", { productList: arrayAll, listExists: true });
})

app.post('/productos', async (req, res) => {
    console.log(req.body)
    await ContenedorEx.save(req.body)
    const arrayAll = await ContenedorEx.getAll()
    console.log(arrayAll)
    res.render("productList", { productList: arrayAll, listExists: true });
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
