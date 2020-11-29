const processOrders = (body) => {
    const allOrders = JSON.parse(body)
    const validOrders = allOrders.ORDERS.filter(validOrder())
    validOrders.forEach(order => {
        if(order.ORDER_LINES.every(({QUANTITY: quantity}) => quantity === '0')) { 
            order.TYPE = 'CANCEL'
        }
    })
    return {ORDERS: validOrders}
}

const validOrder = () => ({O_ID, OMS_ORDER_ID}) => O_ID === OMS_ORDER_ID

module.exports = processOrders