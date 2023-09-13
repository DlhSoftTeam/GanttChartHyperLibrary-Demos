/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var year = 2017, month = 1;
var items = [
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Ensure timelineStart and timelineFinish are set to Sundays, as the timline needs to present entire weeks.
settings.timelineStart = new Date(year, month - 1, 29); // Sunday, January 29, 2017
settings.timelineFinish = new Date(year, month + 2, 2); // Sunday, April 2, 2017
// Prepare time intervals for the custom scale.
var customIntervals = function () {
    var intervals = [];
    // Replace the next lines of code with your custom logic.
    var dayDuration = 24 * 60 * 60 * 1000; // 24 hours (in milliseconds).
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (var d = settings.timelineStart; d < settings.timelineFinish; d = new Date(d.valueOf() + dayDuration))
        intervals.push({ headerText: daysOfWeek[d.getDay()], start: d, finish: new Date(d.valueOf() + dayDuration) });
    return intervals;
}(); // Call the inline function to immediately retreive the time intervals.
// Define a fully custom scale item using Custom scale type and Custom header text format, providing the time intervals to be displayed using an inline function.
var customScale = { scaleType: 'Custom', headerTextFormat: 'Custom', intervals: customIntervals, headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: Gray' };
settings.scales = [
    { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (theme == 'Dark-black' ? '#333333' : (theme == 'Steel-blue' ? '#95a5b2' : '#f8f8f8')) },
    { scaleType: 'Months', headerTextFormat: 'MonthAbbreviation', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 1px' },
    { scaleType: 'Weeks', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
    { scaleType: 'Days', headerTextFormat: 'Day', headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: gray' },
    customScale,
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
// Ensure space for 3 scales with visible headers.
settings.headerHeight = 21 * 3;
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
