angular.module('Samples', [])
    .directive('dsSample', function () {
    return {
        restrict: 'E',
        scope: {
            html: '@'
        },
        controllerAs: 'dss',
        templateUrl: 'Templates/Sample.html'
    };
});
//# sourceMappingURL=Sample.js.map