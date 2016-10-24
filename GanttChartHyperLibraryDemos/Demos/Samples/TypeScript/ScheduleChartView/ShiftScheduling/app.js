/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
// Set up engineers and managers (resources).
var year = 2017, month = 1;
var scheduleChartItems = [];
var engineerCount = 8, managerCount = 3;
for (var i = 1; i <= engineerCount; i++) {
    var scheduleChartItem = { content: 'Engineer #' + i, start: new Date(), ganttChartItems: [] };
    scheduleChartItems.push(scheduleChartItem);
}
for (var i = 1; i <= managerCount; i++) {
    var scheduleChartItem = { content: 'Manager #' + i, start: new Date(), ganttChartItems: [] };
    scheduleChartItems.push(scheduleChartItem);
}
var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    isTaskStartReadOnly: true, isTaskEffortReadOnly: true, isTaskCompletedEffortVisible: false, isTaskCompletionReadOnly: true
};
// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);
// Ensure timelineStart and timelineFinish are set to Sundays, as the timline needs to present entire weeks.
settings.timelineStart = new Date(year, month - 1, 29); // Sunday, January 29, 2017
settings.timelineFinish = new Date(year, month + 1, 5); // Sunday, March 5, 2017
// Prepare time intervals for the custom scale for shifts.
var minuteDuration = 60 * 1000; // in milliseconds.
var hourDuration = 60 * 60 * 1000; // 60 minutes (in milliseconds).
var dayDuration = 24 * hourDuration; // 24 hours (in milliseconds).
var shiftDuration = dayDuration / 3; // 3 shifts per day, i.e. 8 hours per shift; shifts start at: 11 PM, 7 AM, and 3 PM.
var shiftStartHour = 23;
var customIntervals = function () {
    var intervals = [];
    // Replace the next lines of code with your custom logic.
    var dateTime = new Date(settings.timelineStart.valueOf()), nextDateTime;
    for (dateTime.setDate(-1), dateTime.setHours(shiftStartHour); dateTime < settings.timelineFinish; dateTime = nextDateTime) {
        nextDateTime = new Date(dateTime.valueOf()), nextDateTime.setHours(nextDateTime.getHours() + shiftDuration / hourDuration);
        intervals.push({ headerText: (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours(), start: dateTime, finish: nextDateTime });
    }
    return intervals;
}(); // Call the inline function to immediately retreive the time intervals.
// Define a fully custom scale item using Custom scale type and Custom header text format, providing the time intervals to be displayed using an inline function.
var customScale = { scaleType: 'Custom', headerTextFormat: 'Custom', intervals: customIntervals, headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: Gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.25px' };
settings.scales = [
    { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (theme == 'Dark-black' ? '#333333' : (theme == 'Steel-blue' ? '#95a5b2' : '#f8f8f8')) },
    { scaleType: 'Weeks', isHeaderVisible: false },
    { scaleType: 'Days', headerTextFormat: 'Date', headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: gray' },
    { scaleType: 'Days', headerTextFormat: 'DayOfWeek', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray' },
    customScale,
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
// Ensure space for 3 scales with visible headers.
settings.headerHeight = 21 * 3;
// Set up a continuous schedule to enable shifts also during the night and in weekend days.
settings.workingWeekStart = 0; // From Sunday
settings.workingWeekFinish = 6; // To Saturday
settings.visibleDayStart = 0; // From midnight
settings.visibleDayFinish = dayDuration; // To next midnight
// Increase zoom level as well.
settings.hourWidth = 7.5;
// Set up the actual shifts for engineers and managers (resource assignments).
for (var i = 0; i < engineerCount; i++) {
    var scheduleChartItem = scheduleChartItems[i];
    var ganttChartItems = scheduleChartItem.ganttChartItems;
    for (var d = new Date(settings.timelineStart.valueOf() - 1 * hourDuration + (i % 4) * shiftDuration); d < settings.timelineFinish; d = new Date(d.valueOf()), d.setHours(d.getHours() + (shiftDuration / hourDuration) * 4)) {
        var shiftType = d.getHours() <= 8 ? 'morning' : (d.getHours() <= 16 ? 'afternoon' : 'night');
        ganttChartItems.push({
            content: 'Engineering ' + shiftType + ' shift',
            start: new Date(d.valueOf() + 15 * minuteDuration),
            finish: new Date(d.valueOf() + shiftDuration - 15 * minuteDuration),
            barClass: 'engineer ' + shiftType
        });
    }
}
for (var i = 0; i < managerCount; i++) {
    var scheduleChartItem = scheduleChartItems[engineerCount + i];
    var ganttChartItems = scheduleChartItem.ganttChartItems;
    for (var d = new Date(settings.timelineStart.valueOf() - 1 * hourDuration + (i % 3) * shiftDuration); d < settings.timelineFinish; d = new Date(d.valueOf()), d.setHours(d.getHours() + (shiftDuration / hourDuration) * 3)) {
        var shiftType = d.getHours() <= 8 ? 'morning' : (d.getHours() <= 16 ? 'afternoon' : 'night');
        ganttChartItems.push({
            content: 'Management ' + shiftType + ' shift',
            start: new Date(d.valueOf() + 15 * minuteDuration),
            finish: new Date(d.valueOf() + shiftDuration - 15 * minuteDuration),
            barClass: 'manager ' + shiftType
        });
    }
}
// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
