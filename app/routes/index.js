module.exports = (app) => {
    require('./User')(app)
    require('./Article')(app)
    require('./auth')(app)
}