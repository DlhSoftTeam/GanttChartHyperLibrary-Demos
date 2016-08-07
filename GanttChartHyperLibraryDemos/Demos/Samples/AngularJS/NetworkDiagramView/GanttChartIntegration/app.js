/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
/// <reference path='./Scripts/DlhSoft.ProjectData.PertChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var NetworkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
angular.module('NetworkDiagramViewSample', ['DlhSoft.ProjectData.GanttChart.Directives', 'DlhSoft.ProjectData.PertChart.Directives'])
    .controller('MainController', function ($scope, $http, $timeout) {
    // Prepare Gantt Chart data items and settings.
    var ganttChartItems = [];
    for (var i = 1; i <= 8; i++)
        ganttChartItems.push({
            content: 'Task ' + i, start: new Date(2016, 2 - 1, 2 + (i % 3 > 0 ? i % 3 : 3), 8, 0, 0), finish: new Date(2016, 2 - 1, 2 + (i % 3 > 0 ? i % 3 : 3) + 6, 16, 0, 0)
        });
    ganttChartItems[2].predecessors = [{ item: ganttChartItems[1] }]; // Task 2 depends on Task 1.
    $scope.ganttChartItems = ganttChartItems;
    var ganttChartSettings = {
        currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
    };
    // Optionally, initialize custom theme and templates for Gantt Chart (themes.js, templates.js).
    if (initializeGanttChartTheme)
        initializeGanttChartTheme(ganttChartSettings, theme);
    if (initializeGanttChartTemplates)
        initializeGanttChartTemplates(ganttChartSettings, theme);
    $scope.ganttChartSettings = ganttChartSettings;
    // Underlying GanttChartView component reference.
    var ganttChartView = document.getElementById('ganttChartView');
    $scope.addNewGanttChartItem = function () {
        ganttChartItems.push({
            content: 'New task', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0)
        });
    };
    $scope.showNetworkDiagram = function () {
        // Prepare Network Diagram data items and settings.
        var networkDiagramItems = ganttChartView.getNetworkDiagramItems();
        $scope.items = networkDiagramItems;
        var settings = {};
        // Optionally, initialize custom theme and templates for Network Diagram (themes.js, templates.js).
        if (initializePertChartTheme)
            initializePertChartTheme(settings, theme);
        if (initializePertChartTemplates)
            initializePertChartTemplates(settings, theme);
        $scope.settings = settings;
        var networkDiagramView = document.getElementById('networkDiagramView');
        $scope.isNetworkDiagramVisible = true;
    };
    $scope.hideNetworkDiagram = function () {
        $scope.isNetworkDiagramVisible = false;
    };
});
