const villainsModel = (connection, Sequelize) => {
  return connection.define('villains',
    {
      name: { type: Sequelize.STRING },
      movie: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING, primaryKey: true }
    },
    { paranoid: true })
}

module.exports = villainsModel
