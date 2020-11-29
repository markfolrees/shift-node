const processOrders = async body => {
    let allOrders
    try {
        allOrders = JSON.parse(body).ORDERS
    } catch (error) {
        return { error: 'invalid JSON input' }
    }

    const validOrders = await removeInvalidOrders(allOrders)
    validOrders.forEach(setOrderType)
    return { ORDERS: validOrders }
}

// made this function asynchronous to indicate how to address performance concerns. 
// it makes the code a lot more complex so it would be worth being certain that
// the performance problem exists before going down this route
// I found this a useful reference as well as the MDN docs: 
// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
const removeInvalidOrders = async (orders) => {
    return orders.reduce(async (validOrders, order) => {
        if (await isValid(order)) {
            (await validOrders).push(order)
        }
        return validOrders
    },[])
}

const isValid = async ({O_ID, OMS_ORDER_ID}) => O_ID === OMS_ORDER_ID

const isCancelled = order => order.ORDER_LINES.every(({QUANTITY: quantity}) => quantity === '0')

const setOrderType = order => {
    if (isCancelled(order)) { 
        order.TYPE = 'CANCEL'
    } else {
        order.TYPE = 'FULFIL'
    }
}

module.exports = processOrders