const processOrders = (body) => {
  const allOrders = JSON.parse(body)
  
  return allOrders.ORDERS.filter(validOrder())
}

const validOrder = () => {
  return o => o.O_ID === o.OMS_ORDER_ID
}

const handler = ({body}, context) => {
  const orders = processOrders(body)
  
  return {ORDERS: orders}
}

module.exports = handler
