const express = require('express')
const { getAllVillains, getVillainBySlug, createNewVillain, isRunning } = require('./controllers/villains')

const app = express()

app.get('/villains', getAllVillains)

app.get('/villains/:slug', getVillainBySlug)

app.post('/villains', express.json(), createNewVillain)

app.listen(1337, isRunning)
