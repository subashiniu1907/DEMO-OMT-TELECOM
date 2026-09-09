import { Table, BooleanColumn, EmailColumn, StringColumn, GenericColumn } from '@servicenow/sdk/core'

export const x_1208752_demo_o_1_customer = Table({
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
        lastname: StringColumn({
            label: 'Customer Last Name',
            mandatory: true,
            maxLength: 40,
        }),
        streetaddress: StringColumn({
            maxLength: 40,
        }),
        pincode: GenericColumn({
            attributes: {
                timeFromCreateToActivate: '7000',
            },
            columnType: 'longint',
            maxLength: 19,
        }),
        alternatephone: StringColumn({
            maxLength: 40,
        }),
    },
    label: 'Customer',
    name: 'x_1208752_demo_o_1_customer',
})
