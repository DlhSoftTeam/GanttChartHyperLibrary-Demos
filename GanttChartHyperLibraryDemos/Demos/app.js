angular.module('Demos', [])
    .controller('MainController', function ($scope, $http, $timeout) {
    var themes = ['X', 'Purple-green', 'Blue-navy', 'Orange-brown', 'Teal-green', 'Steel-blue', 'Dark-black', 'Generic-blue', 'Default'];
    $scope.themes = themes;
    $scope.selectedTheme = themes[0];
    $scope.selectTheme = function (theme) {
        $scope.selectedTheme = theme;
        $scope.run();
    };
    var technologies = [{ name: 'JavaScript', title: 'HTML + JavaScript®' }, { name: 'TypeScript', title: 'HTML + TypeScript' }, { name: 'AngularJS', title: 'Angular + JQuery' }];
    $scope.technologies = technologies;
    $scope.selectedTechnology = technologies[0];
    $scope.selectTechnology = function (technology) {
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
    $scope.getSamples = function (component) {
        var componentSamples = [];
        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];
            if (sample.component == component)
                componentSamples.push(sample);
        }
        return componentSamples;
    };
    var selectSample = function (sample) {
        $scope.selectedSample = sample;
        $scope.run();
    };
    $scope.selectSample = selectSample;
    $scope.selectComponent = function (component) {
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
    $scope.getSourceCodeFiles = function (selectedSample, selectedTechnology) {
        return selectedSample.sourceCodeFiles[selectedTechnology.name];
    };
    $scope.selectedSourceCodeFile = null;
    $scope.selectedSourceCodeFileContents = null;
    $scope.selectSourceCodeFile = function (selectedSample, selectedTechnology, sourceCodeFile) {
        $scope.selectedSourceCodeFile = sourceCodeFile;
        $scope.selectedSourceCodeFileContents = '…';
        var sourceCodeFileUrl = 'Samples/' + selectedTechnology.name + '/' + selectedSample.component + '/' + selectedSample.feature + '/' + sourceCodeFile;
        $http.get(sourceCodeFileUrl).then(function (response) {
            $scope.selectedSourceCodeFileContents = response.data;
        });
    };
    $scope.forceRun = false;
    $scope.run = function (allowRefreshing) {
        if (allowRefreshing && $scope.selectedSourceCodeFile == null) {
            var technology = $scope.selectedTechnology;
            $scope.selectedTechnology = null;
            $timeout(function () {
                $scope.selectedTechnology = technology;
            });
        }
        $scope.selectedSourceCodeFile = null;
        $scope.selectedSourceCodeFileContents = null;
    };
    $scope.getSampleUrl = function (selectedSample, selectedTechnology, selectedTheme) {
        return 'Samples/' + (selectedTechnology ? selectedTechnology.name : '') + '/' + selectedSample.component + '/' + selectedSample.feature + '/index.html?' + selectedTheme;
    };
    var endsWith = function (value, suffix) {
        return value.indexOf(suffix, value.length - suffix.length) !== -1;
    };
})
    .directive('dsSample', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        bindToController: {
            html: '='
        },
        controller: function ($scope) {
        },
        controllerAs: 'dss',
        templateUrl: 'Templates/Sample.html'
    };
})
    .directive('dsSourceCode', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        bindToController: {
            contents: '='
        },
        controller: function ($scope) {
        },
        controllerAs: 'dssc',
        templateUrl: 'Templates/SourceCode.html'
    };
});
//# sourceMappingURL=app.js.map