import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['eaedb965f72e4d15a661ba8ad5d0fad9'],
    name: 'OrderValidator',
    script: Now.include('./sys_script_include_eaedb965f72e4d15a661ba8ad5d0fad9.server.js'),
    description: 'Order validation utilities for new and cancel orders',
    apiName: 'x_1208752_demo_o_1.OrderValidator',
    clientCallable: false,
    mobileCallable: false,
    sandboxCallable: false,
    active: true,
})
