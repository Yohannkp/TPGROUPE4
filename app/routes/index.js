module.exports = (app) => {
    require('./User')(app)
    require('./Article')(app)
}