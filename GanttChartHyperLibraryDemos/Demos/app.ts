declare var angular;
angular.module('Demos', [])
    .controller('MainController', ($scope, $http, $timeout) => {
        var themes = ['Default', 'Generic-bright', 'Generic-blue', 'DlhSoft-gray', 'Purple-green', 'Steel-blue', 'Dark-black', 'Cyan-green', 'Blue-navy', 'Orange-brown', 'Teal-green', 'Purple-beige', 'Gray-blue', 'Aero'];
        $scope.themes = themes;
        $scope.selectedTheme = themes[1];
        $scope.selectTheme = (theme) => {
            $scope.applyingTheme = theme;
            $scope.selectedTheme = null;
            $timeout(() => {
                $scope.selectedTheme = theme;
                $scope.applyingTheme = null;
            });
        };
        var technologies = [{ name: 'JavaScript', title: 'HTML + JavaScript®' }, { name: 'TypeScript', title: 'HTML + TypeScript' }, { name: 'AngularJS', title: 'Angular + JQuery' }];
        $scope.technologies = technologies;
        $scope.selectedTechnology = technologies[0];
        $scope.selectTechnology = (technology) => {
            $scope.selectedTechnology = technology;
            $scope.run();
        };
        var components = ['GanttChartView', 'ScheduleChartView'];
        var samples = [
            {
                component: 'GanttChartView', feature: 'MainFeatures', title: 'Main features',
                sourceCodeFiles: {
                    'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js', 'templates.js'],
                    'TypeScript': ['index.html', 'app.css', 'app.ts', 'themes.ts', 'templates.js'],
                    'AngularJS': ['index.html', 'app.css', 'app.js', 'themes.js', 'templates.js']
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
        var selectSample = (sample) => {
            $scope.selectedSample = sample;
            $scope.run();
        };
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
        $scope.selectedSourceCodeFile = null;
        $scope.selectedSourceCodeFileContents = null;
        $scope.selectSourceCodeFile = (selectedSample, selectedTechnology, sourceCodeFile) => {
            $scope.selectedSourceCodeFile = sourceCodeFile;
            $scope.selectedSourceCodeFileContents = '…';
            var sourceCodeFileUrl = 'Samples/' + selectedTechnology.name + '/' + selectedSample.component + '/' + selectedSample.feature + '/' + sourceCodeFile;
            $http.get(sourceCodeFileUrl).then((response) => {
                $scope.selectedSourceCodeFileContents = response.data;
            });
        };
        $scope.forceRun = false;
        $scope.run = (allowRefreshing) => {
            if (allowRefreshing && $scope.selectedSourceCodeFile == null) {
                var technology = $scope.selectedTechnology;
                $scope.selectedTechnology = null;
                $timeout(() => {
                    $scope.selectedTechnology = technology;
                });
            }
            $scope.selectedSourceCodeFile = null;
            $scope.selectedSourceCodeFileContents = null;
        };
        $scope.getSampleUrl = (selectedSample, selectedTechnology, selectedTheme) => {
            return 'Samples/' + (selectedTechnology ? selectedTechnology.name : '') + '/' + selectedSample.component + '/' + selectedSample.feature + '/index.html?' + (selectedTheme ? selectedTheme : $scope.applyingTheme);
        };
        var endsWith = (value, suffix) => {
            return value.indexOf(suffix, value.length - suffix.length) !== -1;
        };
    })
    .directive('dsSample', ($timeout) => {
        return {
            restrict: 'E',
            replace: true,
            bindToController: {
                html: '='
            },
            controller: ($scope) => {
            },
            controllerAs: 'dss',
            templateUrl: 'Templates/Sample.html'
        };
    })
    .directive('dsSourceCode', ($timeout) => {
        return {
            restrict: 'E',
            replace: true,
            bindToController: {
                contents: '='
            },
            controller: ($scope) => {
            },
            controllerAs: 'dssc',
            templateUrl: 'Templates/SourceCode.html'
        };
    });

