/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import LoadChartView = DlhSoft.Controls.LoadChartView;
import LoadChartItem = LoadChartView.Item;
import AllocationItem = LoadChartView.AllocationItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeLoadChartTheme;

declare var angular;
angular.module('LoadChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', ($scope, $http, $timeout) => {
        // Prepare Load Chart data items and settings.
        var loadChartItems = <LoadChartItem[]>[{
            content: 'Resource 1', start: new Date(), ganttChartItems: [
                { content: 'Task 1 (Resource 1)', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 2, 16, 0, 0) },
                { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(2016, 2 - 1, 3, 8, 0, 0), finish: new Date(2016, 2 - 1, 3, 12, 0, 0), units: 1.5 },
                { content: 'Task 2 [50%] (Resource 1)', start: new Date(2016, 2 - 1, 3, 12, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0), units: 0.5 },
                { content: 'Task 3 (Resource 1)', start: new Date(2016, 2 - 1, 6, 8, 0, 0), finish: new Date(2016, 2 - 1, 6, 16, 0, 0) }]
            },
            { content: 'Resource 2', start: new Date(), ganttChartItems: [{ content: 'Task 2 (Resource 2)', start: new Date(2016, 2 - 1, 3, 8, 0, 0), finish: new Date(2016, 2 - 1, 4, 16, 0, 0) }] }];
        for (var i = 3; i <= 9; i++)
            loadChartItems.push({
                content: 'Resource ' + i, start: new Date(), ganttChartItems: [
                    { content: 'Task X (Resource ' + i + ')', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 5, 16, 0, 0), units: 1 },
                    { content: 'Task Y (Resource ' + i + ')', start: new Date(2016, 2 - 1, 7, 8, 0, 0), finish: new Date(2016, 2 - 1, 8, 16, 0, 0), units: 1 }]
            });
        $scope.items = loadChartItems;
        var settings = <LoadChartView.Settings>{
            currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
        };
        // Optionally, initialize custom themes (themes.js).
        initializeLoadChartTheme(settings, theme);
        $scope.settings = settings;
        // Underlying LoadChartView component reference.
        var loadChartView = <LoadChartView.Element>document.getElementById('loadChartView');
    });
