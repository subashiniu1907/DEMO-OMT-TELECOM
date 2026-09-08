(function executeRule(current, previous) {

    current.setValue('completion_date', new GlideDateTime().getDisplayValue());

})(current, previous);