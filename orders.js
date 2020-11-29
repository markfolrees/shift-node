const processOrders = (body) => {
    const allOrders = JSON.parse(body)
    const validOrders = allOrders.ORDERS.filter(validOrder())
    const withCancelledOrders = validOrders.forEach(order => {
        if(order.ORDER_LINES.every(({QUANTITY: quantity}) => quantity === '0')) { 
            order.TYPE='CANCEL'
        }
    })
    return validOrders
}

const validOrder = () => {
    return order => order.O_ID === order.OMS_ORDER_ID
}

module.exports = processOrders