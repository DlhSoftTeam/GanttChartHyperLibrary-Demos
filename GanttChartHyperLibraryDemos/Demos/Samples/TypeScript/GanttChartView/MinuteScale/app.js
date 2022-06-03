/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
var items = [
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, day, 8, 0, 0), finish: new Date(year, month, day, 8, 5, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, day, 8, 5, 0), finish: new Date(year, month, day, 8, 15, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, day, 8, 0, 0), finish: new Date(year, month, day, 8, 5, 0), completedFinish: new Date(year, month, day, 8, 3, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, day, 8, 0, 0), finish: new Date(year, month, day, 8, 10, 0), completedFinish: new Date(year, month, day, 8, 20, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, day, 8, 10, 0), finish: new Date(year, month, day, 8, 20, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, day, 8, 22, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, start: new Date(year, month, day, 8, 0, 0), finish: new Date(year, month, day, 8, 5, 0) });
var dayDuration = 24 * 60 * 60 * 1000; // 24 hours (in milliseconds).
var settings = {
    schedule: { workingWeekStart: 0, workingWeekFinish: 6, workingDayStart: 0, workingDayFinish: dayDuration },
    timelineStart: GanttChartView.getOutputDate(GanttChartView.getWeekStart(new Date(year, month, day), 0)),
    timelineFinish: GanttChartView.getOutputDate(GanttChartView.getWeekFinish(new Date(year, month, day), 0)),
    currentTime: new Date(year, month, day, 7, 59, 0),
    displayedTime: new Date(year, month, day, 7, 58, 0)
};
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Prepare time intervals for minute scale.
var getIntervals = function (intervalDuration, intervalHeaderFormatter) {
    var intervals = [];
    for (var d = settings.timelineStart; d < settings.timelineFinish; d = new Date(d.valueOf() + intervalDuration))
        intervals.push({ headerText: intervalHeaderFormatter(d), start: d, finish: new Date(d.valueOf() + intervalDuration) });
    return intervals;
};
var minuteDuration = 60 * 1000; // 60 seconds (in milliseconds)
var hourQuarterDuration = 15 * minuteDuration; // 15 minutes (in milliseconds)
var hourQuarterIntervals = getIntervals(hourQuarterDuration, function (d) { return GanttChartView.defaultDateFormatter(d) + ' ' + ((d.getHours() < 10 ? '0' : '') + d.getHours()) + ':' + ((d.getMinutes() < 10 ? '0' : '') + d.getMinutes()); });
var threeMinuteDuration = 3 * minuteDuration; // 3 minutes (in milliseconds)
var threeMinuteIntervals = getIntervals(threeMinuteDuration, function (d) { return (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + '\''; });
// Define hour quarter and minute scale items using Custom scale type and Custom header text format, providing the time intervals to be displayed using an inline function.
var hourQuarterScale = { scaleType: 'Custom', headerTextFormat: 'Custom', intervals: hourQuarterIntervals, headerStyle: 'padding: 7px 5px; border-right: 1px solid White; border-bottom: 1px solid White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7' };
var minuteScale = { scaleType: 'Custom', headerTextFormat: 'Custom', intervals: threeMinuteIntervals, headerStyle: 'padding: 7px 5px; border-right: 1px solid White; color: gray' };
// Define scales.
settings.scales = [
    hourQuarterScale,
    minuteScale,
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
// Set up update scale to allow end users to drag tasks to minute level.
settings.updateScale = minuteDuration;
// Set up zoom level to fit displayig hour quarters and minutes and disable mouse wheel zooming.
settings.hourWidth = 1500;
settings.isMouseWheelZoomEnabled = false;
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
