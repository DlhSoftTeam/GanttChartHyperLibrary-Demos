angular.module('Demos', [])
    .controller('MainController', function ($scope, $http, $timeout) {
    var themes = ['Blue-red', 'Default'];
    $scope.themes = themes;
    $scope.selectedTheme = themes[0];
    $scope.selectTheme = function (theme) {
        $scope.selectedTheme = theme;
        $scope.run();
    };
    var technologies = [{ name: 'JavaScript', title: 'JavaScript®' }, { name: 'TypeScript', title: 'TypeScript' }, { name: 'AngularJS', title: 'AngularJS' }];
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
    var sourceCodePresentationScriptId = 'sourceCodePresentationScript';
    var sourceCodePresentationScript = document.getElementById(sourceCodePresentationScriptId);
    var sourceCodePresentationScriptLocation = sourceCodePresentationScript.src;
    var sourceCodePresentationScriptParent = sourceCodePresentationScript.parentNode;
    var refreshCodePresentation = function () {
        sourceCodePresentationScriptParent.removeChild(sourceCodePresentationScript);
        sourceCodePresentationScript = document.createElement('script');
        sourceCodePresentationScript.setAttribute('id', sourceCodePresentationScriptId);
        sourceCodePresentationScript.src = sourceCodePresentationScriptLocation + '?' + new Date().valueOf();
        sourceCodePresentationScriptParent.appendChild(sourceCodePresentationScript);
    };
    $scope.selectedSourceCodeFile = null;
    $scope.selectedSourceCodeFileContents = null;
    $scope.selectSourceCodeFile = function (selectedSample, selectedTechnology, sourceCodeFile) {
        $scope.selectedSourceCodeFile = sourceCodeFile;
        $scope.selectedSourceCodeFileContents = '…';
        var sourceCodeFileUrl = 'Samples/' + selectedTechnology.name + '/' + selectedSample.component + '/' + selectedSample.feature + '/' + sourceCodeFile;
        $http.get(sourceCodeFileUrl).then(function (response) {
            $scope.selectedSourceCodeFileContents = response.data;
            refreshCodePresentation();
        });
    };
    $scope.run = function () {
        $scope.selectedSourceCodeFile = null;
        $scope.selectedSourceCodeFileContents = null;
    };
    $scope.getSampleUrl = function (selectedSample, selectedTechnology, selectedTheme) {
        return 'Samples/' + selectedTechnology.name + '/' + selectedSample.component + '/' + selectedSample.feature + '/index.html?' + selectedTheme;
    };
    var endsWith = function (value, suffix) {
        return value.indexOf(suffix, value.length - suffix.length) !== -1;
    };
    $scope.getSourceCodeLanguage = function (sourceCodeFile) {
        if (endsWith(sourceCodeFile, '.css'))
            return 'css';
        if (endsWith(sourceCodeFile, '.js'))
            return 'javascript';
        return 'markup';
    };
})
    .directive('dsSample', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        bindToController: {
            html: '=',
            style: '=',
            parameter: '='
        },
        controller: function ($scope) {
        },
        controllerAs: 'dss',
        templateUrl: 'Templates/Sample.html'
    };
});
//# sourceMappingURL=app.js.map