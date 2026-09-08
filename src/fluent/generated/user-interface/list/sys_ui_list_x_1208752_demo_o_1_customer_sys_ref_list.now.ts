import { List } from '@servicenow/sdk/core'

List({
    table: 'x_1208752_demo_o_1_customer',
    view: 'sys_ref_list',
    columns: ['name'],
})
