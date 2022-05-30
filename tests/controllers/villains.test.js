/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { villains } = require('../../models/index')
const { describe, it, afterEach, beforeEach } = require('mocha')
const { villainsList, hercules, redSkull, badSkull } = require('../mocks/villains')
const { getVillainBySlug, getAllVillains, createNewVillain } = require('../../controllers/villains')


chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villain', () => {
  let sandbox = sinon.createSandbox()
  let stubbedFindOne = sandbox.stub(villains, 'findOne')
  let stubbedFindAll = sandbox.stub(villains, 'findAll')
  let stubbedCreate = sinon.stub(villains, 'create')
  let stubbedSend = sandbox.stub()
  let stubbedStatus = sandbox.stub()
  let stubbedSendStatus = sandbox.stub()
  let response = {
    send: stubbedSend,
    sendStatus: stubbedSendStatus,
    status: stubbedStatus,
  }

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })

    it('returns a 500 when the database goes down, and throws an error in the process', async () => {
      stubbedFindAll.throws('Error!')

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('getVillainBySlug', () => {
    it('retrieves only the villain with the provided slug from the database, and responds with it', async () => {
      const request = { params: { slug: 'hercules' } }

      stubbedFindOne.returns(hercules)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'hercules' },
      })
      expect(stubbedFindOne).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(hercules)
    })

    it('returns a 404 when no villain is found in the db', async () => {
      const request = { params: { slug: 'villainDoesNotExist' } }

      stubbedFindOne.returns(null)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'villainDoesNotExist' },
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 when the database errors out', async () => {
      const request = { params: { slug: 'hercules' } }

      stubbedFindOne.throws('ERROR!')

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: { slug: 'hercules' },
      })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('createNewVillain', () => {
    it('accepts a new villain and saves them as a new villain, then returns a status of 201 and the new villain', async () => {
      const request = { body: redSkull }

      stubbedCreate.returns(redSkull)

      await createNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(redSkull)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(redSkull)
    })

    it('returns a 400 when the user forgets to include all the required fields ', async () => {
      const request = { body: badSkull }

      await createNewVillain(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)

      expect(stubbedSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })

    it('returns a 500 status code if the database fails', async () => {
      const request = { body: redSkull }

      stubbedCreate.throws('Error!')

      await createNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(redSkull)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })
})
