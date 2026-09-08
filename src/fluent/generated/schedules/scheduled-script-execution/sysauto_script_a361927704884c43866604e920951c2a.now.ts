import { ScheduledScript } from '@servicenow/sdk/core'

ScheduledScript({
    $id: Now.ID['a361927704884c43866604e920951c2a'],
    name: 'Demo OMT - Create 5 Customer Orders',
    frequency: 'on_demand',
    dayOfWeek: 'monday',
    dayOfMonth: 1,
    weekInMonth: 1,
    month: 1,
    executionStart: '2026-09-07 10:04:30',
    script: Now.include('./sysauto_script_a361927704884c43866604e920951c2a.js'),
})
