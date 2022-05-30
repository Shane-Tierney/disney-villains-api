const { villains } = require('../models/index')

const getAllVillains = async (request, response) => {
  try {
    const listOfTeams = await villains.findAll()

    return response.send(listOfTeams)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getVillainBySlug = async (request, response) => {
  try {
    const { slug } = request.params

    if (!slug) return response.sendStatus(404)

    const foundVillain = await villains.findOne({
      where: { slug: slug }
    })

    if (!foundVillain) return response.sendStatus(404)

    if (foundVillain) {
      return response.send(foundVillain)
    } else {
      return response.send('Villain not found')
    }
  } catch (error) {
    return response.sendStatus(500)
  }
}

const createNewVillain = async (request, response) => {
  try {
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
  } catch (error) {
    return response.sendStatus(500)
  }
}

const isRunning = () => {
  console.log('server is up on http://localhost:1337') // eslint-disable-line no-console
}

module.exports = { getAllVillains, getVillainBySlug, createNewVillain, isRunning }
