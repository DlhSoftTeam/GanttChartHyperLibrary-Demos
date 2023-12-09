Vue.component('pert-chart', {
    template: '<div><slot/></div>',
    props: ['items', 'settings', 'license'],
    mounted: function() {
        var vm = this;
        var changeHandler = vm.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.Pert.PertChartView.initialize(vm.$el, vm.items, vm.settings, vm.license);
        vm.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
            if (changeHandler)
                changeHandler(item, propertyName, isDirect, isFinal);
            vm.$emit('change', {item: item, propertyName: propertyName, isDirect: isDirect, isFinal: isFinal});
        }
    }
});

Vue.component('network-diagram', {
    template: '<div><slot/></div>',
    props: ['items', 'settings', 'license'],
    mounted: function() {
        var vm = this;
        var changeHandler = vm.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.Pert.NetworkDiagramView.initialize(vm.$el, vm.items, vm.settings, vm.license);
        vm.settings.itemPropertyChangeHandler = function(item, propertyName, isDirect, isFinal) {
            if (changeHandler)
                changeHandler(item, propertyName, isDirect, isFinal);
            vm.$emit('change', {item: item, propertyName: propertyName, isDirect: isDirect, isFinal: isFinal});
        }
    }
});
