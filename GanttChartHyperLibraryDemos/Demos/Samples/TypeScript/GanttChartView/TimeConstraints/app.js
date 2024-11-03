/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), dayDuration = 24 * 60 * 60 * 1000;
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
var specialItem = items[4];
specialItem.minStart = new Date(year, month, 1, 8, 0, 0);
specialItem.maxStart = new Date(year, month, 5, 8, 0, 0);
specialItem.minFinish = new Date(year, month, 5, 8, 0, 0);
specialItem.maxFinish = new Date(year, month, 14, 8, 0, 0);
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Prepare the start and finish constraint columns.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns.splice(3, 0, { header: 'Min start', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getMinStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
columns.splice(4, 0, { header: 'Max start', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getMaxStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
columns.splice(5, 0, { header: 'Min finish', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getMinFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM
columns.splice(6, 0, { header: 'Max finish', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getMaxFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM
settings.columns = columns;
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Optionally, visually indicate original tasks with time constraints.
var specialItems = [specialItem];
for (var i = 0; i < specialItems.length; i++) {
    var specialItem = specialItems[i];
    specialItem.content += '*';
    specialItem.barStyle = 'fill: #60b060';
    specialItem.completedBarStyle = 'fill: #108010';
}
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
// Refresh neighbourhood when start and finish constraints change for an item, as this is not performed internally in all situations (for optimization reasons).
settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
    if ((propertyName == 'minStart' || propertyName == 'maxStart' || propertyName == 'minFinish' || propertyName == 'maxFinish') && isDirect && isFinal) {
        ganttChartView.refreshItemNeighbourhood(item);
    }
};
