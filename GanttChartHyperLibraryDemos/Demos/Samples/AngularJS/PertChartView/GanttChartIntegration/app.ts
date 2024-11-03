/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
/// <reference path='./Scripts/DlhSoft.ProjectData.PertChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;
import PertChartView = DlhSoft.Controls.Pert.PertChartView;
import PertChartItem = PertChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;
declare var initializePertChartTheme;

declare var angular;
angular.module('PertChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives', 'DlhSoft.ProjectData.PertChart.Directives'])
    .controller('MainController', ($scope, $http, $timeout) => {
        // Prepare Gantt Chart data items and settings.
        var ganttChartItems = <GanttChartItem[]>[];
        for (var i = 1; i <= 8; i++)
            ganttChartItems.push({
                content: 'Task ' + i, start: new Date(2016, 2 - 1, 2 + (i % 3 > 0 ? i % 3 : 3), 8, 0, 0), finish: new Date(2016, 2 - 1, 2 + (i % 3 > 0 ? i % 3 : 3) + 6, 16, 0, 0)
            });
        ganttChartItems[2].predecessors = <PredecessorItem[]>[{ item: ganttChartItems[1] }]; // Task 2 depends on Task 1.
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
                content: 'New task', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0)
            });
        };
        $scope.showPertChart = () => {
            // Prepare PERT Chart data items and settings.
            var pertChartItems = ganttChartView.getPertChartItems();
            $scope.items = pertChartItems;
            var settings = <PertChartView.Settings>{ styleDefinitionTemplate: ganttChartSettings.styleDefinitionTemplate };
            // Optionally, initialize custom themes for PERT Chart (themes.js).
            initializePertChartTheme(settings, theme);
            $scope.settings = settings;
            var pertChartView = <PertChartView.Element>document.getElementById('pertChartView');
            $scope.isPertChartVisible = true;
        };
        $scope.hidePertChart = () => {
            $scope.isPertChartVisible = false;
        };
    });
