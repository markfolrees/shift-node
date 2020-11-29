const processOrders = (body) => {
    const allOrders = JSON.parse(body)
    const validOrders = allOrders.ORDERS.filter(isValid())
    validOrders.forEach(order => {
        if (isCancelled(order)) { 
            order.TYPE = 'CANCEL'
        } else {
            order.TYPE = 'FULFIL'
        }
    })
    return {ORDERS: validOrders}
}

const isValid = () => ({O_ID, OMS_ORDER_ID}) => O_ID === OMS_ORDER_ID

const isCancelled = order => order.ORDER_LINES.every(({QUANTITY: quantity}) => quantity === '0')

module.exports = processOrders