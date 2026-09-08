import { Table, ReferenceColumn, IntegerColumn, ChoiceColumn } from '@servicenow/sdk/core'

export const x_1208752_demo_o_1_order_line = Table({
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
    display: 'order',
    index: [
        {
            name: 'index',
            unique: false,
            element: 'order',
        },
        {
            name: 'index2',
            unique: false,
            element: 'product',
        },
    ],
    label: 'Order Line',
    name: 'x_1208752_demo_o_1_order_line',
    schema: {
        product: ReferenceColumn({
            mandatory: true,
            maxLength: 32,
            referenceTable: 'x_1208752_demo_o_1_product',
        }),
        order: ReferenceColumn({
            mandatory: true,
            maxLength: 32,
            referenceTable: 'x_1208752_demo_o_1_order',
        }),
        quantity: IntegerColumn({
            default: '1',
            maxLength: 40,
        }),
        state: ChoiceColumn({
            default: 'pending',
            choices: {
                pending: {
                    label: 'Pending',
                    sequence: 1,
                },
                in_progress: {
                    label: 'In Progress',
                    sequence: 2,
                },
                completed: {
                    label: 'Completed',
                    sequence: 3,
                },
                failed: {
                    label: 'Failed',
                    sequence: 4,
                },
                cancelled: {
                    label: 'Cancelled',
                    sequence: 5,
                },
            },
            dropdown: 'dropdown_without_none',
            maxLength: 40,
        }),
    },
})
