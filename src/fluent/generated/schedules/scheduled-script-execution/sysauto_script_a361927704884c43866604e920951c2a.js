(function() {
    gs.info('Demo OMT Telecom: Starting creation of 5 customer orders');

    // Find or create Internet Service product
    var productGr = new GlideRecord('x_1208752_demo_o_1_product');
    productGr.addQuery('name', 'Internet Service');
    productGr.query();
    var productId;
    if (productGr.next()) {
        productId = productGr.getUniqueValue();
        gs.info('Demo OMT Telecom: Found existing product: ' + productId);
    } else {
        productGr.initialize();
        productGr.setValue('name', 'Internet Service');
        productGr.setValue('description', 'High-speed Internet Service');
        productGr.setValue('active', true);
        productId = productGr.insert();
        gs.info('Demo OMT Telecom: Created product Internet Service: ' + productId);
    }

    var customers = [
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-0201' },
        { name: 'Bob Williams', email: 'bob.williams@example.com', phone: '555-0202' },
        { name: 'Carol Davis', email: 'carol.davis@example.com', phone: '555-0203' },
        { name: 'David Martinez', email: 'david.martinez@example.com', phone: '555-0204' },
        { name: 'Emma Wilson', email: 'emma.wilson@example.com', phone: '555-0205' }
    ];

    for (var i = 0; i < customers.length; i++) {
        var c = customers[i];
        gs.info('Demo OMT Telecom: Processing customer ' + (i + 1) + ': ' + c.name);

        // Create customer
        var custGr = new GlideRecord('x_1208752_demo_o_1_customer');
        custGr.initialize();
        custGr.setValue('name', c.name);
        custGr.setValue('email', c.email);
        custGr.setValue('phone', c.phone);
        custGr.setValue('active', true);
        var custId = custGr.insert();
        gs.info('Demo OMT Telecom: Created customer ' + c.name + ': ' + custId);

        // Create order in draft state first
        var orderGr = new GlideRecord('x_1208752_demo_o_1_order');
        orderGr.initialize();
        orderGr.setValue('customer', custId);
        orderGr.setValue('product', productId);
        orderGr.setValue('order_type', 'new');
        orderGr.setValue('state', 'draft');
        orderGr.setValue('requested_date', new GlideDateTime().getDisplayValue());
        var orderId = orderGr.insert();
        gs.info('Demo OMT Telecom: Created order (draft): ' + orderId);

        // Create order line
        var lineGr = new GlideRecord('x_1208752_demo_o_1_order_line');
        lineGr.initialize();
        lineGr.setValue('order', orderId);
        lineGr.setValue('product', productId);
        lineGr.setValue('quantity', 1);
        lineGr.setValue('state', 'pending');
        var lineId = lineGr.insert();
        gs.info('Demo OMT Telecom: Created order line: ' + lineId);

        // Now submit the order (update state to submitted)
        // This triggers the New Order Flow
        var submitGr = new GlideRecord('x_1208752_demo_o_1_order');
        if (submitGr.get(orderId)) {
            submitGr.setValue('state', 'submitted');
            submitGr.update();
            gs.info('Demo OMT Telecom: Order submitted for ' + c.name + ' - flow will process in background');
        }
    }

    gs.info('Demo OMT Telecom: All 5 customer orders created and submitted for fulfillment');
})();
