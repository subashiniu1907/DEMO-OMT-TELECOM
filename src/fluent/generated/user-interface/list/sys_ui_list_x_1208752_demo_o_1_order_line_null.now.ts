import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_1208752_demo_o_1_order_line',
    view: default_view,
    columns: ['order', 'product', 'quantity', 'state'],
})
