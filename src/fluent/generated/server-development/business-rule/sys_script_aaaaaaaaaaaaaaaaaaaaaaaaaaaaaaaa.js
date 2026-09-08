import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({

    $id: Now.ID['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],

    name: 'Demo OMT - Test Git BR',

    table: 'x_1208752_demo_o_1_order',

    when: 'before',

    action: ['update'],

    filterCondition: 'stateVALCHANGES^state=completed',

    script: Now.include('./sys_script_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.server.js'),

})