declare var angular;
declare var javaScriptGanttChartViewMainFeaturesSample;
angular.module('Demos', [])
    .controller('MainController', ($scope) => {
        var themes = ['Blue-red', 'Default'];
        $scope.themes = themes;
        $scope.selectedTheme = themes[0];
        $scope.selectTheme = (theme) => { $scope.selectedTheme = theme; };
        var technologies = [{ name: 'JavaScript', title: 'JavaScript®' }, { name: 'TypeScript', title: 'TypeScript' }, { name: 'AngularJS', title: 'AngularJS' }];
        $scope.technologies = technologies;
        $scope.selectedTechnology = technologies[0];
        $scope.selectTechnology = (technology) => { $scope.selectedTechnology = technology; };
        var components = ['GanttChartView', 'ScheduleChartView'];
        var samples = [
            {
                component: 'GanttChartView', feature: 'MainFeatures', title: 'Main features',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts'],
                    'AngularJS': ['index.html', 'app.css', 'app.js']
                }
            },
            { component: 'GanttChartView', feature: 'CustomScales', title: 'Custom scales' },
            { component: 'GanttChartView', feature: 'CustomAppearance', title: 'Custom appearance' },
            { component: 'ScheduleChartView', feature: 'MainFeatures', title: 'Main features' },
            { component: 'ScheduleChartView', feature: 'CustomScales', title: 'Custom scales' }
        ];
        $scope.components = components;
        $scope.samples = samples;
        $scope.selectedSample = samples[0];
        $scope.getSamples = (component) => {
            var componentSamples = [];
            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];
                if (sample.component == component)
                    componentSamples.push(sample);
            }
            return componentSamples;
        };
        var selectSample = (sample) => { $scope.selectedSample = sample; };
        $scope.selectSample = selectSample;
        $scope.selectComponent = (component) => {
            var firstComponentSample;
            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];
                if (sample.component == component) {
                    if (sample.feature == $scope.selectedSample.feature) {
                        selectSample(sample);
                        return;
                    }
                    if (!firstComponentSample)
                        firstComponentSample = sample;
                }
            }
            selectSample(firstComponentSample);
        };
        $scope.getSourceCodeFiles = (selectedSample, selectedTechnology) => {
            return selectedSample.sourceCodeFiles[selectedTechnology.name];
        };
    })
    .directive('dsSample', ($timeout) => {
        return {
            restrict: 'E',
            replace: true,
            bindToController: {
                html: '=',
                style: '=',
                parameter: '='
            },
            controller: ($scope) => {
            },
            controllerAs: 'dss',
            templateUrl: 'Templates/Sample.html'
        };
    });
