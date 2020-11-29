const processOrders = require('./orders')

const handler = ({body}, context) => processOrders(body)

module.exports = handler
