import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['f3ef7ec8dd894ca88b9fa4321d07da7c'],
    name: 'Demo OMT Set Completion Date',
    table: 'x_1208752_demo_o_1_order',
    when: 'before',
    action: ['update'],
    filterCondition: 'stateVALCHANGES^state=completed^ORstateVALCHANGES^state=cancelled',
    script: Now.include('./sys_script_f3ef7ec8dd894ca88b9fa4321d07da7c.server.js'),
})
//BR for Demo
