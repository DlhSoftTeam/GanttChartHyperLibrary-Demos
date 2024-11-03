/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
var items = [];
for (var i = 1; i <= 16; i++)
    items.push({ content: 'Print job #' + i, start: new Date(year, month, day, 8, 0, 0) });
var dayDuration = 24 * 60 * 60 * 1000; // 24 hours (in milliseconds).
var settings = {
    itemClass: 'grid-item',
    schedule: { workingWeekStart: 0, workingWeekFinish: 6, workingDayStart: 0, workingDayFinish: dayDuration },
    timelineStart: GanttChartView.getOutputDate(GanttChartView.getWeekStart(new Date(year, month, day), 0)),
    timelineFinish: GanttChartView.getOutputDate(GanttChartView.getWeekFinish(new Date(year, month, day), 0)),
    currentTime: new Date(year, month, day, 7, 59, 0),
    displayedTime: new Date(year, month, day, 7, 58, 0)
};
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Use minute level scale as displayed print jobs are short (3 minutes each).
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
var hourQuarterScale = { scaleType: 'Custom', headerTextFormat: 'Custom', intervals: hourQuarterIntervals, headerStyle: 'padding: 7px 5px; border-right: 1px solid White; border-bottom: 1px solid White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7' };
var minuteScale = { scaleType: 'Custom', headerTextFormat: 'Custom', intervals: threeMinuteIntervals, headerStyle: 'padding: 7px 5px; border-right: 1px solid White; color: gray' };
settings.scales = [
    hourQuarterScale,
    minuteScale,
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
settings.updateScale = minuteDuration;
settings.hourWidth = 1500;
settings.isMouseWheelZoomEnabled = false;
// Define material and quantifiable assignable resource types, such as printers, sheets of paper, and printing supervisors.
// Specify quantities of each resource type. We assume we have infinite sheets of paper, but limited printers and supervisors.
settings.assignableResources = ['Printer', 'Paper', 'Supervisor'];
settings.resourceQuantities = [{ key: 'Printer', value: 5 }, { key: 'Paper', value: Infinity }, { key: 'Supervisor', value: 2 }];
// Define printing cost for 100 sheets of paper (default quantity used for cost by design).
// Add a Cost column to the grid (removing unneeded columns as well).
settings.specificResourceUsageCosts = [{ key: 'Paper', value: 5 }];
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns.splice(3, 4); // Remove all default columns except Task, Start, Finish, and Assignments.
columns.push({ header: 'Cost ($)', width: 110, cellTemplate: DlhSoft.Controls.GanttChartView.getCostColumnTemplate(84) });
settings.columns = columns;
// Assign a printer, the number of pages to pront on each print job, and part of the time of a supervisor needed to overview the printing jobs.
// Update finish times of the task to based on their estimated durations, considering this ratio: 15 sheets of paper per minute.
var sheetsOfPaperRequiredForPrintJobs = [50, 20, 30, 60, 25, 10, 30, 50, 60, 80, 100, 25, 30, 30, 120, 80, 40];
for (var i = 0; i < items.length; i++) {
    var requiredSheetsOfPaper = sheetsOfPaperRequiredForPrintJobs[i];
    items[i].assignmentsContent = 'Printer, Paper [' + requiredSheetsOfPaper + '], Supervisor [50%]';
    items[i].finish = new Date(year, month, day, 8, Math.ceil(requiredSheetsOfPaper / 15), 0);
}
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
function levelResources() {
    ganttChartView.levelResources(true, ganttChartView.getProjectStart());
}
