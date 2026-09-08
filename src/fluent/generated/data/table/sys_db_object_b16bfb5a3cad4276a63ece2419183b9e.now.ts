import { Table, ChoiceColumn, ReferenceColumn, DateTimeColumn, StringColumn } from '@servicenow/sdk/core'

export const x_1208752_demo_o_1_order = Table({
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
    autoNumber: {
        prefix: 'ORD',
    },
    display: 'number',
    index: [
        {
            name: 'index',
            unique: false,
            element: 'customer',
        },
        {
            name: 'index2',
            unique: false,
            element: 'product',
        },
    ],
    label: 'Order',
    name: 'x_1208752_demo_o_1_order',
    schema: {
        state: ChoiceColumn({
            default: 'draft',
            choices: {
                draft: {
                    label: 'Draft',
                    sequence: 1,
                },
                submitted: {
                    label: 'Submitted',
                    sequence: 2,
                },
                in_progress: {
                    label: 'In Progress',
                    sequence: 3,
                },
                completed: {
                    label: 'Completed',
                    sequence: 4,
                },
                failed: {
                    label: 'Failed',
                    sequence: 5,
                },
                cancelled: {
                    label: 'Cancelled',
                    sequence: 6,
                },
            },
            dropdown: 'dropdown_without_none',
            maxLength: 40,
        }),
        customer: ReferenceColumn({
            mandatory: true,
            maxLength: 32,
            referenceTable: 'x_1208752_demo_o_1_customer',
        }),
        completion_date: DateTimeColumn({
            maxLength: 40,
        }),
        order_type: ChoiceColumn({
            choices: {
                new: {
                    label: 'New',
                    sequence: 1,
                },
                cancel: {
                    label: 'Cancel',
                    sequence: 2,
                },
            },
            dropdown: 'dropdown_without_none',
            mandatory: true,
            maxLength: 40,
        }),
        requested_date: DateTimeColumn({
            maxLength: 40,
        }),
        error_message: StringColumn({
            maxLength: 4000,
        }),
        product: ReferenceColumn({
            maxLength: 32,
            referenceTable: 'x_1208752_demo_o_1_product',
        }),
        number: StringColumn({
            default: 'javascript:global.getNextObjNumberPadded();',
            label: 'Order Number',
            maxLength: 40,
            readOnly: true,
            readOnlyOption: 'instance_configured',
        }),
    },
})
