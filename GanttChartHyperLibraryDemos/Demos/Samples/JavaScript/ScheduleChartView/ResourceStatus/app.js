var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [
    {
        content: 'Resource 1', start: new Date(), ganttChartItems: [
            { content: 'Resource 1: started', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), barClass: 'startedStatusBar' },
            { content: 'Resource 1: maintenance', start: new Date(year, month, 9, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), barClass: 'maintenanceStatusBar' },
            { content: 'Resource 1: started', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 13, 16, 0, 0), barClass: 'startedStatusBar' },
            { content: 'Resource 1: issues', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), barClass: 'issuesStatusBar' },
            { content: 'Resource 1: maintenance', start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), barClass: 'maintenanceStatusBar' },
            { content: 'Resource 1: started', start: new Date(year, month, 16, 8, 0, 0), finish: new Date(year, month, 22, 16, 0, 0), barClass: 'startedStatusBar' }]
    },
    {
        content: 'Resource 2', start: new Date(), ganttChartItems: [
            { content: 'Resource 2: started', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), barClass: 'startedStatusBar' },
            { content: 'Resource 2: issues', start: new Date(year, month, 9, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), barClass: 'issuesStatusBar' },
            { content: 'Resource 2: maintenance', start: new Date(year, month, 13, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), barClass: 'maintenanceStatusBar' },
            { content: 'Resource 2: started', start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 22, 16, 0, 0), barClass: 'startedStatusBar' }]
    },
    {
        content: 'Resource 3', start: new Date(), ganttChartItems: [
            { content: 'Resource 3: started', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 22, 16, 0, 0), barClass: 'startedStatusBar' }]
    }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Resource ' + i + ': started', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), barClass: 'startedStatusBar' },
            { content: 'Resource ' + i + ': issues', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0), barClass: 'issuesStatusBar' },
            { content: 'Resource ' + i + ': maintenance', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 7, 16, 0, 0), barClass: 'maintenanceStatusBar' },
            { content: 'Resource ' + i + ': started', start: new Date(year, month, 8, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), barClass: 'startedStatusBar' },
            { content: 'Resource ' + i + ': issues', start: new Date(year, month, 16, 8, 0, 0), finish: new Date(year, month, 16, 16, 0, 0), barClass: 'issuesStatusBar' },
            { content: 'Resource ' + i + ': started', start: new Date(year, month, 17, 8, 0, 0), finish: new Date(year, month, 22, 16, 0, 0), barClass: 'startedStatusBar' }]
    });
var settings = {
    isReadOnly: true, isTaskCompletedEffortVisible: false,
    workingWeekStart: 0, workingWeekFinish: 6,
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemClass: 'grid-item'
};
initializeGanttChartTheme(settings, theme);

var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
