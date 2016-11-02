/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = <HTMLElement>document.querySelector('#scheduleChartView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = <ScheduleChartItem[]>[
    { content: 'Group 1', start: new Date() },
    { content: 'Resource 1', indentation: 1, start: new Date(), ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
    {
        content: 'Resource 2', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    { content: 'Group 2', start: new Date() },
    { content: 'Resource 3', indentation: 1, start: new Date(), ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];

for (var g = 3; g <= 10; g++) { // Groups
    scheduleChartItems.push({ content: 'Group ' + g, start: new Date(), ganttChartItems: [] });
    for (var i = 4; i < 10; i++) { //Resources
        var tasks = <GanttChartItem[]>[];
        for (var j = 0; j < 5; j++) // Tasks
            tasks.push({ content: 'Task' + (j + 1) + ' (Resource ' + ((g - 3) * 6 + i) + ')', start: new Date(year, month, 2 + j * 3, 8, 0, 0), finish: new Date(year, month, 3 + j * 3, 16, 0, 0) });
        scheduleChartItems.push({ content: 'Resource ' + ((g - 3) * 6 + i), indentation: 1, start: new Date(), ganttChartItems: tasks });
    }
}

// Prepare control settings.
var settings = <ScheduleChartView.Settings>{
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
