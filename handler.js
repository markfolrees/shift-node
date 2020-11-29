const processOrders = require('./orders')

const handler = ({body}, context) => {
  const orders = processOrders(body)
  
  return {ORDERS: orders}
}

module.exports = handler
