const express = require('express');
const Contenedor = require('../Desafio 3 Clase')
const {parse} = require("nodemon/lib/cli");
const { Router } = express

const ContenedorEx =  new Contenedor('texto1.txt')
const app = express()
const router = Router();

app.set('views', './views');
app.set('view engine', 'pug');


app.use('/api/productos', router);
app.use(express.static('public'))
router.use(express.json())
router.use(express.urlencoded({extended: true}))


const PORT = process.env.PORT || 8080;

router.get('/productos', (req, res) => {
    res.render('hello.pug', {mensaje: 'Usando Pug JS en Express'});
});


router.get('/', async (req, res) => {
    const arrayAll = await ContenedorEx.getAll()
    res.render('getProductos.pug', {results: arrayAll})
    //return res.send( arrayAll)
})

router.get('/:id', async (req, res) => {
    const RetrievedObj =  await ContenedorEx.getById(parseInt(req.params.id))
    if (RetrievedObj) {
       return  res.send(RetrievedObj)
    }else {
       return  res.send({"error": "Producto no Encontrado"})
    }
})


router.post('/', async (req, res) => {
    console.log(req.body)
    await ContenedorEx.save(req.body)
    const arrayAll = await ContenedorEx.getAll()
    res.render('getProductos.pug', {results: arrayAll})

})

router.put('/:id', async (req, res) => {
    const updatedObject = await ContenedorEx.updateById(parseInt(req.params.id), req.body)
    return res.send(updatedObject)
})

router.delete('/:id', async (req, res) => {
    await ContenedorEx.deleteById(parseInt(req.params.id))
    return res.sendStatus(200)
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
