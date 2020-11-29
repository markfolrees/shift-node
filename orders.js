const processOrders = (body) => {
    let allOrders
    try {
        allOrders = JSON.parse(body)
    } catch (error) {
        return {error: 'invalid JSON input'}
    }

    const validOrders = allOrders.ORDERS.filter(isValid())
    validOrders.forEach(setOrderType)
    return {ORDERS: validOrders}
}

const isValid = () => ({O_ID, OMS_ORDER_ID}) => O_ID === OMS_ORDER_ID

const isCancelled = order => order.ORDER_LINES.every(({QUANTITY: quantity}) => quantity === '0')

const setOrderType = order => {
    if (isCancelled(order)) { 
        order.TYPE = 'CANCEL'
    } else {
        order.TYPE = 'FULFIL'
    }
}

module.exports = processOrders