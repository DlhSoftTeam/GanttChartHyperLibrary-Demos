/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDay();
var items = <GanttChartItem[]>[
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
for (var i = 4; i <= 20; i++)
    items.push({ content: 'Task ' + i, start: new Date(year, month, day, 8, 0, 0), finish: new Date(year, month, day, 8, 5, 0) });

var dayDuration = 24 * 60 * 60 * 1000; // 24 hours (in milliseconds).
var settings = <GanttChartView.Settings>{
    schedule: { workingWeekStart: 0, workingWeekFinish: 6, workingDayStart: 0, workingDayFinish: dayDuration }, // Non-stop schedule (24/7)
    timelineStart: GanttChartView.getOutputDate(GanttChartView.getWeekStart(new Date(year, month, day), 0)),
    timelineFinish: GanttChartView.getOutputDate(GanttChartView.getWeekFinish(new Date(year, month, day), 0)),
    currentTime: new Date(year, month, day, 7, 59, 0),
    displayedTime: new Date(year, month, day, 7, 58, 0)
};

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);

// Prepare time intervals for minute scale.
var getIntervals = function (intervalDuration: number, intervalHeaderFormatter: (d: Date) => string) {
    var intervals = [];
    for (var d = settings.timelineStart; d < settings.timelineFinish; d = new Date(d.valueOf() + intervalDuration))
        intervals.push({ headerText: intervalHeaderFormatter(d), start: d, finish: new Date(d.valueOf() + intervalDuration) });
    return intervals;
};
var hourQuarterDuration = 15 * 60 * 1000; // 15 minutes (in milliseconds)
var hourQuarterIntervals = getIntervals(hourQuarterDuration, (d: Date) => { return GanttChartView.defaultDateFormatter(d) + ' ' + ((d.getHours() < 10 ? '0' : '') + d.getHours()) + ':' + ((d.getMinutes() < 10 ? '0' : '') + d.getMinutes()) });
var minuteDuration = 60 * 1000; // 60 seconds (in milliseconds)
var minuteIntervals = getIntervals(minuteDuration, (d: Date) => { return (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() });
// Define hour quarter and minute scale items using Custom scale type and Custom header text format, providing the time intervals to be displayed using an inline function.
var hourQuarterScale = <GanttChartView.Scale>{ scaleType: 'Custom', headerTextFormat: 'Custom', intervals: hourQuarterIntervals, headerStyle: 'padding: 7px 5px; border-right: 1px solid White; border-bottom: 1px solid White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7' };
var minuteScale = <GanttChartView.Scale>{ scaleType: 'Custom', headerTextFormat: 'Custom', intervals: minuteIntervals, headerStyle: 'padding: 7px 5px; border-right: 1px solid White; color: gray' };
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
