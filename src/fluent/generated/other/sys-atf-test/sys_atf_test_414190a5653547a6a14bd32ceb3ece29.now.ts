import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['414190a5653547a6a14bd32ceb3ece29'],
        name: 'Demo OMT - Create and Submit 5 Customer Orders',
        description:
            'Creates 5 new orders for existing customers (Alice, Bob, Carol, David, Emma) for Internet Service product, then submits them to trigger the New Order fulfillment flow.',
        failOnServerError: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['cedbbfa924b5479db0084afdf8dbf2b3'],
            script: `(function(outputs, steps, params, stepResult, assertEqual) {
    // Find Internet Service product
    var productGr = new GlideRecord('x_1208752_demo_o_1_product');
    productGr.addQuery('name', 'Internet Service');
    productGr.addQuery('active', true);
    productGr.query();
    if (!productGr.next()) {
        stepResult.setOutputMessage('ERROR: Internet Service product not found');
        return false;
    }
    var productId = productGr.getUniqueValue();

    var customerNames = ['Alice Johnson', 'Bob Williams', 'Carol Davis', 'David Martinez', 'Emma Wilson'];
    var createdOrders = [];

    for (var i = 0; i < customerNames.length; i++) {
        // Find customer
        var custGr = new GlideRecord('x_1208752_demo_o_1_customer');
        custGr.addQuery('name', customerNames[i]);
        custGr.addQuery('active', true);
        custGr.query();
        if (!custGr.next()) {
            stepResult.setOutputMessage('ERROR: Customer not found: ' + customerNames[i]);
            return false;
        }
        var custId = custGr.getUniqueValue();

        // Create order in draft
        var orderGr = new GlideRecord('x_1208752_demo_o_1_order');
        orderGr.initialize();
        orderGr.setValue('customer', custId);
        orderGr.setValue('product', productId);
        orderGr.setValue('order_type', 'new');
        orderGr.setValue('state', 'draft');
        orderGr.setValue('requested_date', new GlideDateTime().getDisplayValue());
        var orderId = orderGr.insert();

        // Create order line
        var lineGr = new GlideRecord('x_1208752_demo_o_1_order_line');
        lineGr.initialize();
        lineGr.setValue('order', orderId);
        lineGr.setValue('product', productId);
        lineGr.setValue('quantity', 1);
        lineGr.setValue('state', 'pending');
        lineGr.insert();

        // Submit the order to trigger the New Order Flow
        var submitGr = new GlideRecord('x_1208752_demo_o_1_order');
        if (submitGr.get(orderId)) {
            submitGr.setValue('state', 'submitted');
            submitGr.update();
            createdOrders.push(customerNames[i] + ': ' + orderId);
        }
    }

    outputs.order_count = createdOrders.length;
    stepResult.setOutputMessage('Created and submitted ' + createdOrders.length + ' orders: ' + createdOrders.join(', '));
    assertEqual({ name: 'All 5 orders created', shouldbe: '5', value: '' + createdOrders.length });
    return true;
})(outputs, steps, params, stepResult, assertEqual);`,
        })
    }
)
