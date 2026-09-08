import { BusinessRule } from '@servicenow/sdk/core'

BusinessRule({
    $id: Now.ID['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
    name: 'Demo OMT - Test Git BR',
    table: 'x_1208752_demo_o_1_order',
    when: 'after',
    action: ['update'],
    filterCondition: 'stateVALCHANGES^state=completed',
    script: Now.include('./demo-omt-test-git-br.server.js'),
})

// THAMBHI THAPPU
