const express = require('express');
const Contenedor = require('../Desafio 3 Clase')

const ContenedorEx =  new Contenedor('texto1.txt')
const app = express()

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    res.render("pages/createProduct");
})

app.get('/productos', async (req, res) => {
    const arrayAll = await ContenedorEx.getAll()
    res.render("pages/productList",  { arrayAll });
})


app.post('/productos', async (req, res) => {
    console.log(req.body)
    await ContenedorEx.save(req.body)
    const arrayAll = await ContenedorEx.getAll()
    res.render("pages/productList",  { arrayAll });
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
