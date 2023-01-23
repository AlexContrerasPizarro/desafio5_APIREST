const { obtenerInventario, prepararHATEOAS,obtenerJoyasPorFiltros } = require('./consultas')

const express = require('express')
const cors = require("cors");
const app = express()

app.use(express.json())
app.use(cors());
app.use(express.static('public'))


app.listen(3000, console.log("Servidor encendido"))

app.get('/joyas', async (req, res) => {
    const queryStrings = req.query
    const inventario = await obtenerInventario(queryStrings)
    const HATEOAS = await prepararHATEOAS(inventario)
    res.json(HATEOAS)
})

app.get('/joyas/filtros', async (req, res) => {
    const queryStrings = req.query
    const joyas= await obtenerJoyasPorFiltros(queryStrings)
    res.json(joyas)
})


app.get("*", (req, res) => {
    res.status(404).send("Esta ruta no existe")
})

