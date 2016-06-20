angular.module('Demos', [])
    .controller('MainController', function ($scope, $http, $timeout) {
    var components = ['GanttChartView', 'ScheduleChartView', 'LoadChartView', 'PertChartView', 'NetworkDiagramView'];
    var samples = [
        {
            component: 'GanttChartView', feature: 'MainFeatures-screenshots', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts', 'app.js', 'templates.js', 'themes.js'],
                'AngularJS': ['index.html', 'app.css', 'app.ts', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'MainFeatures-screenshots-item', title: 'Main features item', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'Columns', title: 'Columns', description: 'Shows how to add supplemental built-in and custom grid columns including a column presenting task icon thumbs that offer vertical drag and drop support',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'CustomScale-screenshots', title: 'Custom scale', description: 'Shows how to define a fully custom chart scale with special time intervals and text headers',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'Styling-screenshots', title: 'Styling', description: 'Shows how to style up elements defined by the component using CSS classes',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'HierarchicalVirtualization', title: 'Hierarchical virtualization', description: 'Shows how to develop summary task virtualization and lazy load child tasks only upon parent node expansion',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'ScheduleChartView', feature: 'MainFeatures-screenshots', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'LoadChartView', feature: 'MainFeatures-screenshots', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js']
            }
        },
        {
            component: 'LoadChartView', feature: 'SingleItem-screenshots', title: 'Single item', description: 'Sample application showing how to display a single item with multiple allocations',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js']
            }
        },
        {
            component: 'PertChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js']
            }
        },
        {
            component: 'NetworkDiagramView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js']
            }
        }
    ];
    var themes = ['Default', 'Generic-bright', 'Generic-blue', 'DlhSoft-gray', 'Purple-green', 'Steel-blue', 'Dark-black', 'Cyan-green', 'Blue-navy', 'Orange-brown', 'Teal-green', 'Purple-beige', 'Gray-blue', 'Aero'];
    $scope.themes = themes;
    $scope.selectedTheme = themes[1];
    $scope.selectTheme = function (theme) {
        if (theme == $scope.selectedTheme)
            return;
        $scope.applyingTheme = theme;
        $scope.selectedTheme = null;
        $timeout(function () {
            $scope.selectedTheme = theme;
            $scope.applyingTheme = null;
            $scope.run();
        });
    };
    var technologies = [{ name: 'JavaScript', title: 'HTML + JavaScript®' }, { name: 'TypeScript', title: 'HTML + TypeScript' }, { name: 'AngularJS', title: 'Angular + JQuery' }];
    $scope.technologies = technologies;
    $scope.selectedTechnology = technologies[0];
    var getSamples = function (component, selectedTechnology) {
        var componentSamples = [];
        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];
            if (sample.component == component && sample.sourceCodeFiles[selectedTechnology.name])
                componentSamples.push(sample);
        }
        return componentSamples;
    };
    var getComponents = function (selectedTechnology) {
        var components = [];
        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];
            var component = sample.component;
            if (components.indexOf(component) < 0 && sample.sourceCodeFiles[selectedTechnology.name])
                components.push(component);
        }
        return components;
    };
    var selectSample = function (sample) {
        $scope.selectedSample = sample;
        $scope.run();
    };
    var selectComponent = function (component) {
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
    $scope.selectTechnology = function (technology) {
        if (technology == $scope.selectedTechnology)
            return;
        $scope.selectedTechnology = technology;
        var selectedComponent = $scope.selectedComponent;
        if (getComponents(technology).indexOf(selectedComponent) < 0)
            selectComponent(selectedComponent = components[0]);
        var componentSamples = getSamples(selectedComponent, technology);
        var featureSampleFound = false;
        for (var i = 0; i < samples.length; i++) {
            if (samples[i].feature == $scope.selectedFeature && samples[i].sourceCodeFiles[technology]) {
                featureSampleFound = true;
                selectSample(samples[i]);
                break;
            }
        }
        if (!featureSampleFound)
            selectSample(samples[0]);
        $scope.run();
    };
    $scope.components = components;
    $scope.samples = samples;
    $scope.selectedSample = samples[0];
    $scope.getComponents = getComponents;
    $scope.getSamples = getSamples;
    $scope.selectSample = selectSample;
    $scope.selectComponent = selectComponent;
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
        return 'Samples/' + (selectedTechnology ? selectedTechnology.name : '') + '/' + selectedSample.component + '/' + selectedSample.feature + '/index.html?' + (selectedTheme ? selectedTheme : $scope.applyingTheme);
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
