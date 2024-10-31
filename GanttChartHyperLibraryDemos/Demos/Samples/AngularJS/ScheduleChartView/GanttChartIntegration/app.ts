/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;

declare var angular;
angular.module('ScheduleChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', ($scope, $http, $timeout) => {
        // Prepare Gantt Chart data items and settings.
        var ganttChartItems = <GanttChartItem[]>[];
        for (var i = 1; i <= 8; i++)
            ganttChartItems.push({
                content: 'Task ' + i, start: new Date(2016, 2 - 1, 2 + i - 1, 8, 0, 0), finish: new Date(2016, 2 - 1, 2 + i - 1 + 3, 16, 0, 0),
                assignmentsContent: 'Resource ' + (i % 4 > 0 ? i % 4 : 4)
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
                assignmentsContent: 'Resource 5'
            });
        };
        $scope.showScheduleChart = () => {
            // Prepare Schedule Chart data items and settings.
            var scheduleChartItems = ganttChartView.getScheduleChartItems();
            $scope.items = scheduleChartItems;
            var settings = <ScheduleChartView.Settings>{
                currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
            };
            // Optionally, initialize custom themes for Schedule Chart (themes.js).
            initializeGanttChartTheme(settings, theme);
            $scope.settings = settings;
            var scheduleChartView = <ScheduleChartView.Element>document.getElementById('scheduleChartView');
            $scope.isScheduleChartVisible = true;
        };
        $scope.hideScheduleChart = () => {
            $scope.isScheduleChartVisible = false;
        };
    });
