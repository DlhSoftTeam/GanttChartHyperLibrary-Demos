Vue.component('gantt-chart', {
    template: '<div><slot/></div>',
    props: ['items', 'settings', 'license'],
    mounted: function() {
        var vm = this;
        var changeHandler = vm.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.GanttChartView.initialize(vm.$el, vm.items, vm.settings, vm.license);
        vm.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
            if (changeHandler)
                changeHandler(item, propertyName, isDirect, isFinal);
            vm.$emit('change', {item: item, propertyName: propertyName, isDirect: isDirect, isFinal: isFinal});
        }
    }
});

Vue.component('schedule-chart', {
    template: '<div><slot/></div>',
    props: ['items', 'settings', 'license'],
    mounted: function() {
        var vm = this;
        var changeHandler = vm.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.ScheduleChartView.initialize(vm.$el, vm.items, vm.settings, vm.license);
        vm.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
            if (changeHandler)
                changeHandler(item, propertyName, isDirect, isFinal);
            vm.$emit('change', {item: item, propertyName: propertyName, isDirect: isDirect, isFinal: isFinal});
        }
    }
});

Vue.component('load-chart', {
    template: '<div><slot/></div>',
    props: ['items', 'settings', 'license'],
    mounted: function() {
        var vm = this;
        var changeHandler = vm.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.LoadChartView.initialize(vm.$el, vm.items, vm.settings, vm.license);
        vm.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
            if (changeHandler)
                changeHandler(item, propertyName, isDirect, isFinal);
            vm.$emit('change', {item: item, propertyName: propertyName, isDirect: isDirect, isFinal: isFinal});
        }
    }
});
