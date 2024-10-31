/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
angular.module('ScheduleChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', function ($scope, $http, $timeout) {
    // Prepare Schedule Chart data items and settings.
    var scheduleChartItems = [
        { content: 'Resource 1', start: new Date(), ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 8, 16, 0, 0), completedFinish: new Date(2016, 2 - 1, 5, 16, 0, 0) }] },
        {
            content: 'Resource 2', start: new Date(), ganttChartItems: [
                { content: 'Task A (Resource 2)', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 8, 16, 0, 0), completedFinish: new Date(2016, 2 - 1, 5, 16, 0, 0), assignmentsContent: '50%' },
                { content: 'Task B (Resource 2)', start: new Date(2016, 2 - 1, 11, 8, 0, 0), finish: new Date(2016, 2 - 1, 12, 16, 0, 0), completedFinish: new Date(2016, 2 - 1, 12, 16, 0, 0) },
                { content: 'Task C (Resource 2)', start: new Date(2016, 2 - 1, 14, 8, 0, 0), finish: new Date(2016, 2 - 1, 14, 16, 0, 0) }]
        },
        { content: 'Resource 3', start: new Date(), ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(2016, 2 - 1, 12, 12, 0, 0), finish: new Date(2016, 2 - 1, 14, 16, 0, 0) }] }];
    for (var i = 4; i <= 9; i++)
        scheduleChartItems.push({
            content: 'Resource ' + i, start: new Date(), ganttChartItems: [
                { content: 'Task X (Resource ' + i + ')', start: new Date(2016, 2 - 1, 2, 8, 0, 0), finish: new Date(2016, 2 - 1, 5, 16, 0, 0) },
                { content: 'Task Y (Resource ' + i + ')', start: new Date(2016, 2 - 1, 7, 8, 0, 0), finish: new Date(2016, 2 - 1, 8, 16, 0, 0) }]
        });
    $scope.items = scheduleChartItems;
    var settings = {
        currentTime: new Date(2016, 2 - 1, 2) // Display the current time vertical line of the chart at the project start date.
    };
    // Optionally, initialize custom themes (themes.js).
    initializeGanttChartTheme(settings, theme);
    
    $scope.settings = settings;
    // Underlying ScheduleChartView component reference.
    var scheduleChartView = document.getElementById('scheduleChartView');
});
