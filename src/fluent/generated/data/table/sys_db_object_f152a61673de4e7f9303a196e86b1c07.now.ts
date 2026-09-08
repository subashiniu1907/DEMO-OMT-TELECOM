import { Table, BooleanColumn, StringColumn } from '@servicenow/sdk/core'

export const x_1208752_demo_o_1_product = Table({
    actions: {
        read: true,
        update: false,
        delete: false,
        create: false,
    },
    allowClientScripts: false,
    allowNewFields: false,
    allowUiActions: false,
    allowWebServiceAccess: true,
    display: 'name',
    label: 'Product',
    name: 'x_1208752_demo_o_1_product',
    schema: {
        active: BooleanColumn({
            default: true,
            maxLength: 40,
        }),
        name: StringColumn({
            label: 'Product Name',
            mandatory: true,
            maxLength: 40,
        }),
        description: StringColumn({
            label: 'Product Description',
            maxLength: 1000,
        }),
    },
})
