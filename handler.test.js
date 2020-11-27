const fs = require('fs')
const handler = require('./handler')

const event = {
  body: fs.readFileSync('./fixtures/shipments.json', 'utf8')
}

const context = {
  accountReference: 'acme'
}

describe('Handler', () => {

  let data;
  beforeEach(() =>{
    data = handler(event, context)
  });
  
  describe('Parses the event data into JSON', () => {
   
    
    it('has three orders', () => {
      const { ORDERS: orders } = data
      expect(orders.length).toEqual(3)
    });

    it('has order 12345', () => {
      const { ORDERS: [order] } = data
      expect(order.O_ID).toEqual('12345')
    })
  })
})