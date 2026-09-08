import { Table, BooleanColumn, EmailColumn, StringColumn } from '@servicenow/sdk/core'

export const x_1208752_demo_o_1_customer = Table({
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
    label: 'Customer',
    name: 'x_1208752_demo_o_1_customer',
    schema: {
        active: BooleanColumn({
            default: true,
            maxLength: 40,
        }),
        email: EmailColumn({
            maxLength: 255,
        }),
        phone: StringColumn({
            maxLength: 40,
        }),
        name: StringColumn({
            label: 'Customer Name',
            mandatory: true,
            maxLength: 40,
        }),
        streetaddress: StringColumn({
            maxLength: 40,
        }),
    },
})
