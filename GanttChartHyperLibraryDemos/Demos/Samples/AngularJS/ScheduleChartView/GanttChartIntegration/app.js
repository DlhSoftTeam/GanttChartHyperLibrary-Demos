/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
angular.module('ScheduleChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', function ($scope, $http, $timeout) {
    // Prepare Gantt Chart data items and settings.
    var ganttChartItems = [];
    for (var i = 1; i <= 8; i++)
        ganttChartItems.push({
            content: 'Task ' + i, start: new Date(2016, 2 - 1, 2 + i - 1, 8, 0, 0), finish: new Date(2016, 2 - 1, 2 + i - 1 + 3, 16, 0, 0),
            assignmentsContent: 'Resource ' + (i % 4 > 0 ? i % 4 : 4)
        });
    $scope.ganttChartItems = ganttChartItems;
    var ganttChartSettings = {
        currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
    };
    // Optionally, initialize custom themes(themes.js).
    initializeGanttChartTheme(ganttChartSettings, theme);
    $scope.ganttChartSettings = ganttChartSettings;
    // Underlying GanttChartView component reference.
    var ganttChartView = document.getElementById('ganttChartView');
    $scope.addNewGanttChartItem = function () {
        ganttChartItems.push({
            content: 'New task', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0),
            assignmentsContent: 'Resource 5'
        });
    };
    $scope.showScheduleChart = function () {
        // Prepare Schedule Chart data items and settings.
        var scheduleChartItems = ganttChartView.getScheduleChartItems();
        $scope.items = scheduleChartItems;
        var settings = {
            currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
        };
        // Optionally, initialize custom themes for Schedule Chart (themes.js).
        initializeGanttChartTheme(settings, theme);
        
        $scope.settings = settings;
        var scheduleChartView = document.getElementById('scheduleChartView');
        $scope.isScheduleChartVisible = true;
    };
    $scope.hideScheduleChart = function () {
        $scope.isScheduleChartVisible = false;
    };
});
