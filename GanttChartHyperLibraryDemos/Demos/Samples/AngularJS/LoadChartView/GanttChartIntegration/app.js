/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var LoadChartView = DlhSoft.Controls.LoadChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
angular.module('LoadChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', function ($scope, $http, $timeout) {
    // Prepare Gantt Chart data items and settings.
    var ganttChartItems = [];
    for (var i = 1; i <= 8; i++)
        ganttChartItems.push({
            content: 'Task ' + i, start: new Date(2016, 2 - 1, 2 + i - 1, 8, 0, 0), finish: new Date(2016, 2 - 1, 2 + i - 1 + 3, 16, 0, 0),
            assignmentsContent: 'Resource ' + (i % 3 > 0 ? i % 3 : 3)
        });
    $scope.ganttChartItems = ganttChartItems;
    var ganttChartSettings = {
        currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
    };
    // Optionally, initialize custom themes for Gantt Chart (themes.js).
    initializeGanttChartTheme(ganttChartSettings, theme);
    
    $scope.ganttChartSettings = ganttChartSettings;
    // Underlying GanttChartView component reference.
    var ganttChartView = document.getElementById('ganttChartView');
    $scope.addNewGanttChartItem = function () {
        ganttChartItems.push({
            content: 'New task', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0),
            assignmentsContent: 'Resource 4'
        });
    };
    $scope.showLoadChart = function () {
        // Prepare Load Chart data items and settings.
        var loadChartItems = ganttChartView.getLoadChartItems();
        $scope.items = loadChartItems;
        var settings = {
            currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
        };
        // Optionally, initialize custom themes for Load Chart (themes.js).
        initializeLoadChartTheme(settings, theme);
        $scope.settings = settings;
        var loadChartView = document.getElementById('loadChartView');
        $scope.isLoadChartVisible = true;
    };
    $scope.hideLoadChart = function () {
        $scope.isLoadChartVisible = false;
    };
});
