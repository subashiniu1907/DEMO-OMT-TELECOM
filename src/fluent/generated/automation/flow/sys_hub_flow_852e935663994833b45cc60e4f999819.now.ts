import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

Flow(
    {
        $id: Now.ID['852e935663994833b45cc60e4f999819'],
        name: 'Demo OMT Telecom - Cancel Order Flow',
        internalName: 'demo_omt_telecom__cancel_order_flow',
        runAs: 'system',
        masterSnapshot: 'f8d35c7b93c7c710f1d1f0b45d03d601',
    },
    wfa.trigger(
        trigger.record.updated,
        {
            $id: Now.ID['8ba86000a5594cf0ac04386a9379f997'],
        },
        {
            table: 'x_1208752_demo_o_1_order',
            run_when_user_list: [],
            run_when_setting: 'both',
            run_flow_in: 'background',
            run_on_extended: 'false',
            condition: 'state=submitted^order_type=cancel',
            run_when_user_setting: 'any',
            trigger_strategy: 'once',
        }
    ),
    (_params) => {
        const actionInstance_1 = wfa.action(
            action.core.lookUpRecord,
            {
                $id: Now.ID['9a963ce4d60f4b53bb008e05b36de470'],
            },
            {
                sort_type: 'sort_asc',
                conditions: `sys_id=${wfa.dataPill(_params.trigger.current.customer, 'string')}^active=true`,
                dont_fail_flow_on_error: false,
                table: 'x_1208752_demo_o_1_customer',
                sort_column: '',
                if_multiple_records_are_found_action: 'use_first_record',
            }
        )
        wfa.flowLogic.if(
            {
                condition: `${wfa.dataPill(actionInstance_1.status, 'choice')}=0`,
                annotation: '',
                $id: Now.ID['be71be96df8747e6a1006885695340e3'],
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    {
                        $id: Now.ID['dbeea9ba5f8140f898a35fdbe1c0639d'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order',
                        record: wfa.dataPill(_params.trigger.current, 'reference'),
                        values: TemplateValue({
                            state: 'in_progress',
                        }),
                    }
                )
                wfa.action(
                    action.core.updateMultipleRecords,
                    {
                        $id: Now.ID['fa2e6dfdb403447cb82ff577e13c909a'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order_line',
                        conditions: `order=${wfa.dataPill(_params.trigger.current.sys_id, 'string')}`,
                        sort_type: 'sort_asc',
                        field_values: TemplateValue({
                            state: 'in_progress',
                        }),
                        sort_column: '',
                        dont_fail_flow_on_error: false,
                    }
                )
                wfa.action(
                    action.core.updateMultipleRecords,
                    {
                        $id: Now.ID['c293159fe2304bb7b437af7e12c0238f'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order_line',
                        conditions: `order=${wfa.dataPill(_params.trigger.current.sys_id, 'string')}`,
                        sort_type: 'sort_asc',
                        field_values: TemplateValue({
                            state: 'cancelled',
                        }),
                        sort_column: '',
                        dont_fail_flow_on_error: false,
                    }
                )
                wfa.action(
                    action.core.updateRecord,
                    {
                        $id: Now.ID['87cebce46fd44785be06b5a3f8349ce2'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order',
                        record: wfa.dataPill(_params.trigger.current, 'reference'),
                        values: TemplateValue({
                            state: 'cancelled',
                        }),
                    }
                )
            }
        )
        wfa.flowLogic.else(
            {
                annotation: '',
                $id: Now.ID['6c516a41ce3d4e738e3e68ca52591cdd'],
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    {
                        $id: Now.ID['55606872fcaf4a9e9e22d0e252139959'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order',
                        record: wfa.dataPill(_params.trigger.current, 'reference'),
                        values: TemplateValue({
                            state: 'failed',
                            error_message: 'Validation failed - customer not found',
                        }),
                    }
                )
                wfa.action(
                    action.core.updateMultipleRecords,
                    {
                        $id: Now.ID['74691bab99e34dbd82f0904e0663178d'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order_line',
                        conditions: `order=${wfa.dataPill(_params.trigger.current.sys_id, 'string')}`,
                        sort_type: 'sort_asc',
                        field_values: TemplateValue({
                            state: 'failed',
                        }),
                        sort_column: '',
                        dont_fail_flow_on_error: false,
                    }
                )
            }
        )
    }
)
