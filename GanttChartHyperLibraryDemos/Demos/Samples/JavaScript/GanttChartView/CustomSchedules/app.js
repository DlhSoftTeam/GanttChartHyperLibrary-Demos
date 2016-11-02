/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 0, 0, 0), finish: new Date(year, month, 5, 0, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 0, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 0, 0, 0), finish: new Date(year, month, 9, 0, 0, 0), completedFinish: new Date(year, month, 6, 0, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 0, 0, 0), finish: new Date(year, month, 15, 0, 0, 0), completedFinish: new Date(year, month, 15, 0, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 15, 0, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 16, 0, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 0, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2) + 1, 0, 0, 0) });
var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    areTaskDependencyConstraintsEnabled: true
};
// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);
// Set up main schedule. Alternatively, set workingWeek{Start|Finish} and visibleDay{Start|Finish} fields on the settings object.
settings.schedule = {
    workingWeekStart: 2,
    workingWeekFinish: 4,
    workingDayStart: 6 * 60 * 60 * 1000,
    workingDayFinish: 13.5 * 60 * 60 * 1000,
    specialNonworkingDays: [new Date(year, month, 15), new Date(year, month, 16), new Date(year, month, 19)] // Common holidays
};
// Set up specific item schedules (Task 2.2.1, and Task 2.2.2). They can partially overlap the main schedule.
var specialItem1 = items[6], specialItem2 = items[7];
specialItem1.schedule = {
    workingWeekStart: 3,
    workingWeekFinish: 6,
    workingDayStart: 11.5 * 60 * 60 * 1000,
    workingDayFinish: 19.75 * 60 * 60 * 1000,
    specialNonworkingDays: [new Date(year, month, 18), new Date(year, month, 19), new Date(year, month, 22), new Date(year, month, 23)] // One common, more holidays
};
specialItem2.schedule = {
    workingWeekStart: 0,
    workingWeekFinish: 6 // Saturday
};
// Optionally, visually indicate tasks with special schedules.
var specialItems = [specialItem1, specialItem2];
for (var i = 0; i < specialItems.length; i++) {
    var specialItem = specialItems[i];
    specialItem.content += '*';
    specialItem.barStyle = 'fill: #60b060';
    specialItem.completedBarStyle = 'fill: #108010';
}
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
