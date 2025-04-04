/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var LoadChartView = DlhSoft.Controls.LoadChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
angular.module('LoadChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', function ($scope, $http, $timeout) {
    // Prepare a single data item with multiple allocations.
    var loadChartItems = [{
            content: 'Resource 1', start: new Date(), ganttChartItems: [
                { content: 'Task 1 (Resource 1)', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 2, 16, 0, 0) },
                { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(2016, 2 - 1, 3, 8, 0, 0), finish: new Date(2016, 2 - 1, 3, 12, 0, 0), units: 1.5 },
                { content: 'Task 2 [50%] (Resource 1)', start: new Date(2016, 2 - 1, 3, 12, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0), units: 0.5 },
                { content: 'Task 3 (Resource 1)', start: new Date(2016, 2 - 1, 6, 8, 0, 0), finish: new Date(2016, 2 - 1, 6, 16, 0, 0) }]
        }];
    $scope.items = loadChartItems;
    var settings = {
        currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
    };
    // Optionally, initialize custom themes (themes.js).
    initializeLoadChartTheme(settings, theme);
    // settings.isGridVisible = false;
    settings.itemHeight = 312;
    settings.barMargin = 8;
    settings.barHeight = settings.itemHeight - settings.barMargin * 2;
    $scope.settings = settings;
    // Underlying LoadChartView component reference.
    var loadChartView = document.getElementById('loadChartView');
});
