var OrderValidator = Class.create()
OrderValidator.prototype = {
    initialize: function () {},

    validateNewOrder: function (orderSysId) {
        var result = { valid: false, message: '' }

        var orderGr = new GlideRecord('x_1208752_demo_o_1_order')
        if (!orderGr.get(orderSysId)) {
            result.message = 'Order not found'
            return JSON.stringify(result)
        }

        // Validate customer exists and is active
        var customerGr = new GlideRecord('x_1208752_demo_o_1_customer')
        if (!customerGr.get(orderGr.getValue('customer'))) {
            result.message = 'Customer not found'
            return JSON.stringify(result)
        }
        if (customerGr.getValue('active') !== 'true' && customerGr.getValue('active') !== '1') {
            result.message = 'Customer is inactive'
            return JSON.stringify(result)
        }

        // Validate product exists and is active
        var productGr = new GlideRecord('x_1208752_demo_o_1_product')
        if (!productGr.get(orderGr.getValue('product'))) {
            result.message = 'Product not found'
            return JSON.stringify(result)
        }
        if (productGr.getValue('active') !== 'true' && productGr.getValue('active') !== '1') {
            result.message = 'Product is inactive'
            return JSON.stringify(result)
        }

        result.valid = true
        result.message = 'Order is valid for processing'
        return JSON.stringify(result)
    },

    validateCancelOrder: function (orderSysId) {
        var result = { valid: false, message: '' }

        var orderGr = new GlideRecord('x_1208752_demo_o_1_order')
        if (!orderGr.get(orderSysId)) {
            result.message = 'Order not found'
            return JSON.stringify(result)
        }

        var currentState = orderGr.getValue('state')
        if (currentState === 'cancelled') {
            result.message = 'Order is already cancelled'
            return JSON.stringify(result)
        }
        if (currentState === 'failed') {
            result.message = 'Order has already failed'
            return JSON.stringify(result)
        }
        if (currentState === 'completed') {
            result.message = 'Order is already completed'
            return JSON.stringify(result)
        }

        result.valid = true
        result.message = 'Order can be cancelled'
        return JSON.stringify(result)
    },

    type: 'OrderValidator',
}
