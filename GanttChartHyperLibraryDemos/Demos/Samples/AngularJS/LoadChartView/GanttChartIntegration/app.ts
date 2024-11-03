/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import LoadChartView = DlhSoft.Controls.LoadChartView;
import LoadChartItem = LoadChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;
declare var initializeLoadChartTheme;

declare var angular;
angular.module('LoadChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', ($scope, $http, $timeout) => {
        // Prepare Gantt Chart data items and settings.
        var ganttChartItems = <GanttChartItem[]>[];
        for (var i = 1; i <= 8; i++)
            ganttChartItems.push({
                content: 'Task ' + i, start: new Date(2016, 2 - 1, 2 + i - 1, 8, 0, 0), finish: new Date(2016, 2 - 1, 2 + i - 1 + 3, 16, 0, 0),
                assignmentsContent: 'Resource ' + (i % 3 > 0 ? i % 3 : 3)
            });
        $scope.ganttChartItems = ganttChartItems;
        var ganttChartSettings = <GanttChartView.Settings>{
            currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
        };
        // Optionally, initialize custom themes for Gantt Chart (themes.js).
        initializeGanttChartTheme(ganttChartSettings, theme);
        $scope.ganttChartSettings = ganttChartSettings;
        // Underlying GanttChartView component reference.
        var ganttChartView = <GanttChartView.Element>document.getElementById('ganttChartView');
        $scope.addNewGanttChartItem = () => {
            ganttChartItems.push({
                content: 'New task', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0),
                assignmentsContent: 'Resource 4'
            });
        };
        $scope.showLoadChart = () => {
            // Prepare Load Chart data items and settings.
            var loadChartItems = ganttChartView.getLoadChartItems();
            $scope.items = loadChartItems;
            var settings = <LoadChartView.Settings>{
                currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
            };
            // Optionally, initialize custom themes for Load Chart (themes.js).
            initializeLoadChartTheme(settings, theme);
            $scope.settings = settings;
            var loadChartView = <LoadChartView.Element>document.getElementById('loadChartView');
            $scope.isLoadChartVisible = true;
        };
        $scope.hideLoadChart = () => {
            $scope.isLoadChartVisible = false;
        };
    });
