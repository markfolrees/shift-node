const handler = (event, context) => {
  const orders = JSON.parse(event.body)
  
  return orders
}

module.exports = handler
