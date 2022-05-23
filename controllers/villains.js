const villains = require('../models/index')

const getAllVillains = async (request, response) => {
  const listOfTeams = await villains.findAll()

  return response.status(200).send(listOfTeams)
}

const getVillainBySlug = async (request, response) => {
  const { slug } = request.params

  const foundVillain = await villains.findOne({
    where: { slug: slug }
  })

  if (foundVillain) {
    return response.status(200).send(foundVillain)
  } else {
    return response.status(404).send('Villain not found')
  }
}

const createNewVillain = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('The following fields are required: name, movie, slug')
  }

  const newVillain = await villains.create({
    name,
    movie,
    slug
  })

  return response.status(201).send(newVillain)
}

const isRunning = () => {
  console.log('server is up on http://localhost:1337') // eslint-disable-line no-console
}

module.exports = { getAllVillains, getVillainBySlug, createNewVillain, isRunning }
