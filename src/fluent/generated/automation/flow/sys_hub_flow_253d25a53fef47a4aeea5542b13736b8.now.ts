import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

Flow(
    {
        $id: Now.ID['253d25a53fef47a4aeea5542b13736b8'],
        name: 'Demo OMT Telecom - New Order Flow - IDE Test',
        internalName: 'demo_omt_telecom__new_order_flow',
        runAs: 'system',
        masterSnapshot: '13c3987b93c7c710f1d1f0b45d03d6f0',
    },
    wfa.trigger(
        trigger.record.updated,
        {
            $id: Now.ID['8bee6e4e96e24ae2a88040d325ad9bd7'],
        },
        {
            table: 'x_1208752_demo_o_1_order',
            run_when_user_list: [],
            run_when_setting: 'both',
            run_flow_in: 'background',
            run_on_extended: 'false',
            condition: 'state=submitted^order_type=new',
            run_when_user_setting: 'any',
            trigger_strategy: 'once',
        }
    ),
    (_params) => {
        const actionInstance_1 = wfa.action(
            action.core.lookUpRecord,
            {
                $id: Now.ID['f9aeeab0b2c14d74a002fb8eca75775f'],
            },
            {
                sort_type: 'sort_asc',
                // @fluent-ignore
                conditions: 'sys_id=',
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
                $id: Now.ID['51acdd5a329e4ea493e3de288701db2a'],
            },
            () => {
                const actionInstance_3 = wfa.action(
                    action.core.lookUpRecord,
                    {
                        $id: Now.ID['bb644fdab34e48f9b382b00adf0c5361'],
                    },
                    {
                        sort_type: 'sort_asc',
                        // @fluent-ignore
                        conditions: 'sys_id=',
                        dont_fail_flow_on_error: false,
                        table: 'x_1208752_demo_o_1_product',
                        sort_column: '',
                        if_multiple_records_are_found_action: 'use_first_record',
                    }
                )
                wfa.flowLogic.if(
                    {
                        condition: `${wfa.dataPill(actionInstance_3.status, 'choice')}=0`,
                        annotation: '',
                        $id: Now.ID['bee7e81d9faa4d58ad96cd9a53354961'],
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            {
                                $id: Now.ID['fae968d76d404ab4b41d582d012810c0'],
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
                                $id: Now.ID['fefb7363d79c4c7b9b3bb4e009105188'],
                            },
                            {
                                table_name: 'x_1208752_demo_o_1_order_line',
                                conditions: 'order=',
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
                                $id: Now.ID['141f07e371e8409da64ec9f5ff8a6e21'],
                            },
                            {
                                table_name: 'x_1208752_demo_o_1_order_line',
                                conditions: 'order=',
                                sort_type: 'sort_asc',
                                field_values: TemplateValue({
                                    state: 'completed',
                                }),
                                sort_column: '',
                                dont_fail_flow_on_error: false,
                            }
                        )
                        wfa.action(
                            action.core.updateRecord,
                            {
                                $id: Now.ID['8c6d308b51414620b9503aa875717a55'],
                            },
                            {
                                table_name: 'x_1208752_demo_o_1_order',
                                record: wfa.dataPill(_params.trigger.current, 'reference'),
                                values: TemplateValue({
                                    state: 'completed',
                                }),
                            }
                        )
                    }
                )
                wfa.flowLogic.else(
                    {
                        annotation: '',
                        $id: Now.ID['53f4ca71a1e64d57a2ed27a0ecfa1b66'],
                    },
                    () => {
                        wfa.action(
                            action.core.updateRecord,
                            {
                                $id: Now.ID['141a65304d3c484ba7936a79f0e44eea'],
                            },
                            {
                                table_name: 'x_1208752_demo_o_1_order',
                                record: wfa.dataPill(_params.trigger.current, 'reference'),
                                values: TemplateValue({
                                    state: 'failed',
                                    error_message: 'Product not found or inactive',
                                }),
                            }
                        )
                        wfa.action(
                            action.core.updateMultipleRecords,
                            {
                                $id: Now.ID['0f4cb350021a4f9e98ca8991c12d55a5'],
                            },
                            {
                                table_name: 'x_1208752_demo_o_1_order_line',
                                conditions: 'order=',
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
        wfa.flowLogic.else(
            {
                annotation: '',
                $id: Now.ID['c94e7d5cdcd04ece83ea2cbb0600df3a'],
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    {
                        $id: Now.ID['c1cc14b27d6148b0920b422a6ff4f3ee'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order',
                        record: wfa.dataPill(_params.trigger.current, 'reference'),
                        values: TemplateValue({
                            state: 'failed',
                            error_message: 'Customer not found or inactive',
                        }),
                    }
                )
                wfa.action(
                    action.core.updateMultipleRecords,
                    {
                        $id: Now.ID['a1bd214170a14262a997738b78e94500'],
                    },
                    {
                        table_name: 'x_1208752_demo_o_1_order_line',
                        conditions: 'order=',
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
