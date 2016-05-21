angular.module('Demos', [])
    .controller('MainController', function ($scope) {
})
    .directive('dsSample', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        bindToController: {
            html: '=',
            style: '='
        },
        controller: function ($scope) {
        },
        controllerAs: 'dss',
        templateUrl: 'Templates/Sample.html'
    };
});
//# sourceMappingURL=app.js.map