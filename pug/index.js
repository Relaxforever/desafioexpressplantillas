const express = require('express');
const Contenedor = require('../Desafio 3 Clase')
const {parse} = require("nodemon/lib/cli");
const { Router } = express

const ContenedorEx =  new Contenedor('texto1.txt')
const app = express()
const router = Router();

app.set('views', './views');
app.set('view engine', 'pug');


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const PORT = process.env.PORT || 8080;

app.get('/productos', (req, res) => {
    res.render('hello.pug', {mensaje: 'Usando Pug JS en Express'});
});


app.get('/', async (req, res) => {
    const arrayAll = await ContenedorEx.getAll()
    if (arrayAll !== undefined) {
        res.render('getProductos.pug', {results: arrayAll})
    }else {
        res.render("noProduct.pug"), {mensaje: 'No Hay Productos'}
    }
    //return res.send( arrayAll)
})

app.post('/productos', async (req, res) => {
    console.log(req.body)
    await ContenedorEx.save(req.body)
    const arrayAll = await ContenedorEx.getAll()
    res.render('getProductos.pug', {results: arrayAll})

})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
