import { List, default_view } from '@servicenow/sdk/core'

List({
    table: 'x_1208752_demo_o_1_customer',
    view: default_view,
    columns: ['name', 'active', 'email', 'phone'],
})
