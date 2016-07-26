var queryString = window.location.search;
var initialSelection = queryString ? queryString.substr(1).replace('-', ' ') : null;
angular.module('Demos', [])
    .controller('MainController', function ($scope, $http, $timeout) {
    var components = ['GanttChartView', 'ScheduleChartView', 'LoadChartView', 'PertChartView', 'NetworkDiagramView'];
    var samples = [
        {
            component: 'GanttChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts', 'templates.js', 'themes.js'],
                'AngularJS': ['index.html', 'app.css', 'app.ts', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'AssigningResources', title: 'Assigning resources (with multi-selector combo box)', description: 'Shows how resource assignments work and includes code providing automatic Load Chart synchronization',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'AutomaticScheduling', title: 'Automatic scheduling (dependency constraints)', description: 'Shows how task dependency constraints can be enabled to automatically schedule tasks upon all changes',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'Columns', title: 'Grid columns (built-in and custom)', description: 'Shows how to add supplemental built-in and custom grid columns including a column presenting task icon thumbs that offer vertical drag and drop support',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'Statuses', title: 'Status columns (including color indicator)', description: 'Shows how to add supplemental custom columns for showing task statuses, such as To do, In progress, Behind schedule, and Completed',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'ReadOnlySettings', title: 'Read only, visibility, and other behavioral settings', description: 'Shows how you can set up read only, visibility, and other settings on the component and on specific items',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'Filtering', title: 'Filtering and hiding items', description: 'Shows how you can set up an item visibility filter function and hide individual items when needed',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'ChangeNotifications', title: 'Change notifications (item value update handling)', description: 'Shows how custom code can be executed when changes occur on the data presented by the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'SelectionModes', title: 'Selection mode (single, extended, by clicking)', description: 'Shows how you can set up selection mode and handle item selection changes in the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'MoveUpDown', title: 'Move up-down (hierarchical moving)', description: 'Shows how you can allow the end user to move items up and down without breaking the hierarchy',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'BuiltinScales', title: 'Built-in scales (from years to hours)', description: 'Shows how you can combine and use built-in scale types, text header formats, and related settings',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'ZoomLevel', title: 'Zoom level (and disabling mouse wheel zooming)', description: 'Shows how you can set up zoom level settings for the chart area',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'CustomScale', title: 'Custom scale (time intervals and header texts)', description: 'Shows how to define a fully custom chart scale with special time intervals and text headers',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'MinuteScale', title: 'Minute scale (zoom in to hour quaters and minutes)', description: 'Shows how to zoom in and display hour quarters and minutes in the chart area',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'SpecialDays', title: 'Special days (vertically highlight specific time intervals)', description: 'Shows how you can highlight special time intervals in the chart area',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'Baseline', title: 'Baseline (estimation time bars vs. actual task bars)', description: 'Shows how you can define and display estimation bars for tasks (i.e. project baseline)',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'CriticalPath', title: 'Critical path (tasks that affect project finish)', description: 'Shows how you can determine and highlight critical tasks in your project (i.e. those that would affect the project finish date if their duration would increase)',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'ContinuousSchedule', title: 'Continuous schedule (non-stop working time)', description: 'Shows how to define continuous working time for tasks (24/7)',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'CustomSchedules', title: 'Custom schedules (general and for individual tasks)', description: 'Shows how to define custom working time and special nonworking days for all tasks with individual exceptions',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'DateTimeFormats', title: 'Date and time formats (simple or fully customized)', description: 'Shows how to set up custom formatting for dates, times, and durations',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'Styling', title: 'Styling (with CSS classes)', description: 'Shows how to style up elements defined by the component using CSS classes',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'CustomTemplate', title: 'Custom template (drawing item bars using custom SVG)', description: 'Shows how you can write code to customize drawing stanadard item bars in the chart area using SVG elements',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'AssignmentsTemplate', title: 'Assignments template (resource icons)', description: 'Shows how you can customize assignments template and show resource icons in the chart area',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'MultipleBarsPerItem', title: 'Multiple bars per item (parts)', description: 'Shows how you can define and display multiple bars for each task (i.e. item parts)',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'WorkOptimizations', title: 'Work optimizations (minimize project time, level resources)', description: 'Shows how you can optimize project timeline and avoiding resource over-allocation',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'TimeConstraints', title: 'Time constraints (minimum and maximum start and finish)', description: 'Shows how you can set up constraints on item date and times using minimum and/or maximum values',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'ProjectXml', title: 'Importing and exporting Microsoft® Project XML', description: 'Shows how you can import and export Microsoft® Project XML schema based content, providing maximum compatibility with other applications',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'Printing', title: 'Printing (virtual printers, e.g. Print to PDF, supported)', description: 'Includes code that initiates a print operation; end user can select the printer to use (virtual printers such as Print to PDF are supported as well)',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'ExportPngImage-PMF', title: 'Export image (using Project Management Framework)', description: 'Shows how to generate PNG images for the current Gantt Chart – using TaskManager component from DlhSoft Project Management Framework, available separately for free to Gantt Chart Hyper Library licensees',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'GetPng.aspx', 'GetPng.aspx.cs'],
                'TypeScript': ['index.html', 'app.css', 'app.ts', 'GetPng.aspx', 'GetPng.aspx.cs']
            }
        },
        {
            component: 'GanttChartView', feature: 'Performance', title: 'Performance (large data set)', description: 'Shows app responsiveness and other runtime performance features when loading large sets of hierarchical data',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js'],
                'TypeScript': ['index.html', 'app.css', 'app.ts']
            }
        },
        {
            component: 'GanttChartView', feature: 'HierarchicalVirtualization', title: 'Hierarchical virtualization (lazy loading)', description: 'Shows how to develop summary task virtualization and lazy load child tasks only upon parent node expansion',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js']
            }
        },
        {
            component: 'GanttChartView', feature: 'AssignmentsTree-HL', title: 'Assignments tree (using TreeGrid from Hyper Library)', description: 'Shows how to show a custom popup allowing the end user to select assigned resources (or departments) from an organizational hierarchy – using TreeGrid control from DlhSoft Hyper Library, sold separately',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js']
            }
        },
        {
            component: 'ScheduleChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'templates.js', 'themes.js']
            }
        },
        {
            component: 'LoadChartView', feature: 'MainFeatures', title: 'Main features', description: 'Complex sample application showing how to use the most important features of the component',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js', 'themes.js']
            }
        },
        {
            component: 'LoadChartView', feature: 'SingleItem', title: 'Single item', description: 'Sample application showing how to display a single item with multiple allocations',
            sourceCodeFiles: {
                'JavaScript': ['index.html', 'app.css', 'app.js']
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
        },
        {
            component: 'GanttChartView', feature: 'SinglePageDatabase', title: 'SQL Server® + ASP .NET WebAPI', description: 'Single page app accessing data using ASP .NET WebAPI from a SQL Server® database',
            sourceCodeUrls: {
                'JavaScript': 'http://DlhSoft.com/KnowledgeBase/GanttChartSinglePageDatabaseSample.zip',
                'AngularJS': 'http://GitHub.com/DlhSoftTeam/Angular-GanttChartViewSampleApp/archive/master.zip'
            }
        },
        {
            component: 'GanttChartView', feature: 'LightSwitch', title: 'LightSwitch® (HTML)', description: 'HTML based LightSwitch® app',
            sourceCodeUrls: {
                'JavaScript': 'http://DlhSoft.com/KnowledgeBase/GanttChartHtmlSample.zip'
            }
        },
        {
            component: 'GanttChartView', feature: 'WindowsStoreApp', title: 'Windows® Store app (UWP)', description: 'Windows® Universal Platform (UWP) app using JavaScript®',
            sourceCodeUrls: {
                'JavaScript': 'http://DlhSoft.com/KnowledgeBase/GanttChartJavaScriptStoreAppSample.zip'
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
            if (sample.component == component &&
                ((sample.sourceCodeFiles && sample.sourceCodeFiles[selectedTechnology.name]) ||
                    (sample.sourceCodeUrls && sample.sourceCodeUrls[selectedTechnology.name])))
                componentSamples.push(sample);
        }
        return componentSamples;
    };
    var getComponents = function (selectedTechnology) {
        var components = [];
        for (var i = 0; i < samples.length; i++) {
            var sample = samples[i];
            var component = sample.component;
            if (components.indexOf(component) < 0 &&
                ((sample.sourceCodeFiles && sample.sourceCodeFiles[selectedTechnology.name]) ||
                    (sample.sourceCodeUrls && sample.sourceCodeUrls[selectedTechnology.name])))
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
        var selectedSample = $scope.selectedSample;
        var selectedComponent = selectedSample.component;
        var selectedFeature = selectedSample.feature;
        if (getComponents(technology).indexOf(selectedComponent) < 0)
            selectComponent(selectedComponent = components[0]);
        var componentSamples = getSamples(selectedComponent, technology);
        var featureSampleFound = false;
        for (var i = 0; i < componentSamples.length; i++) {
            var sample = componentSamples[i];
            if (sample.feature == selectedFeature && sample.sourceCodeFiles && sample.sourceCodeFiles[technology.name]) {
                featureSampleFound = true;
                selectSample(sample);
                break;
            }
        }
        if (!featureSampleFound)
            selectSample(componentSamples[0]);
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
        return selectedSample.sourceCodeFiles ? selectedSample.sourceCodeFiles[selectedTechnology.name] : null;
    };
    $scope.selectedSourceCodeFile = null;
    $scope.selectedSourceCodeFileContents = null;
    $scope.selectSourceCodeFile = function (selectedSample, selectedTechnology, sourceCodeFile) {
        $scope.selectedSourceCodeFile = sourceCodeFile;
        $scope.selectedSourceCodeFileContents = '…';
        var sourceCodeFileUrl = 'Samples/' + selectedTechnology.name + '/' + selectedSample.component + '/' + selectedSample.feature + '/' + sourceCodeFile.replace('.aspx', '.aspx.txt').replace('.aspx.txt.cs', '.aspx.cs.txt');
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
    if (initialSelection)
        selectComponent(initialSelection);
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
