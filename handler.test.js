const fs = require('fs')
const handler = require('./handler')


describe('handling valid data', () => {

  const event = {
    body: fs.readFileSync('./fixtures/shipments.json', 'utf8')
  }

  const context = {
    accountReference: 'acme'
  }

  let data;
  beforeEach(() =>{
    data = handler(event, context)
  })
  
  describe('Parses the event data into JSON', () => {
   
    it('has two orders', () => {
      const { ORDERS: orders } = data
      expect(orders.length).toEqual(2)
    })

    it('has order 12345', () => {
      const { ORDERS: [order] } = data
      expect(order.O_ID).toEqual('12345')
    })

    it('creates fulfilment', () => {
      const { ORDERS: [order] } = data
      expect(order.TYPE).toEqual('FULFIL')
    })

    it('removes invalid order where IDs do not match', () => {
      const { ORDERS: order } = data
      expect(order.find(o => o.O_ID === '50022251')).toBeUndefined()
    })

    it('creates cancellation', () => {
      const { ORDERS: [, order] } = data
      expect(order.TYPE).toEqual('CANCEL')
    })
  })
})

describe('handling invalid JSON', () => {

  const event = {
    body: fs.readFileSync('./fixtures/notJson.json', 'utf8')
  }

  const context = {
    accountReference: 'acme'
  }

  let data;

  beforeEach(() => {
    data = handler(event, context)
  })

  it('returns an error response', () => {
    expect(data.error).toEqual('invalid JSON input')
  })

})