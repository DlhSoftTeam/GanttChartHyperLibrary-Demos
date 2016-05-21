declare var angular;
declare var javaScriptGanttChartViewMainFeaturesSample;
angular.module('Demos', [])
    .controller('MainController', ($scope) => {
    })
    .directive('dsSample', ($timeout) => {
        return {
            restrict: 'E',
            replace: true,
            bindToController: {
                html: '=',
                style: '='
            },
            controller: ($scope) => {
            },
            controllerAs: 'dss',
            templateUrl: 'Templates/Sample.html'
        };
    });
