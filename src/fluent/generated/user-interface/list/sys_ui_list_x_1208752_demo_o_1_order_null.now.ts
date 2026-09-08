import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_1208752_demo_o_1_order',
    view: default_view,
    columns: [
        'number',
        'completion_date',
        'customer',
        'error_message',
        'order_type',
        'product',
        'requested_date',
        'state',
    ],
})
