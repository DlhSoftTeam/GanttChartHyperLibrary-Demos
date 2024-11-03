/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [
    { content: 'Resource 1', start: new Date(), ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
    {
        content: 'Resource 2', start: new Date(), ganttChartItems: [
            { content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    { content: 'Resource 3', start: new Date(), ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
            { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
// Prepare elements to output information about mouse events when they occur.
var notificationsOutputElement = document.querySelector('#notificationsOutput');
var hoveringOutputElement = document.querySelector('#hoveringOutput');
// Handle mouse events.
// Note that mouseHandler is a generic function that handles multiple mouse events with a single set of statements.
// Alternatively, you may use specific handler functions, such as: mouseMoveHandler, mouseDownHandler, clickHandler, doubleClickHandler, itemClickHandler, itemDoubleClickHandler, chartClickHandler, chartDoubleClickHandler, itemChartClickHandler, and itemChartDoubleClickHandler.
settings.mouseHandler = function (eventName, isOnItemsArea, isOnChart, row, column, button, clickCount, e) {
    var rowDetails = isOnItemsArea ? 'Item: ' + (row ? row.content : 'none') : (row ? 'Scale: ' + row.scaleType : 'Grid header');
    var ganttChartItemDetails = getGanttChartItemDetailsAt(row, column);
    var columnDetails = isOnChart ? 'Date: ' + column.toDateString() : 'Column: ' + column.header;
    var buttonDetails = button == 1 ? 'left' : (button == 2 ? 'middle' : (button == 3 ? 'right' : 'N/A'));
    if (clickCount > 0) {
        notificationsOutputElement.textContent += (notificationsOutputElement.textContent.length > 0 ? '\n' : '') +
            'Event: ' + eventName + ' - ' +
            'Is on items area: ' + isOnItemsArea + ' - ' +
            'Is on chart: ' + isOnChart + ' - ' +
            rowDetails + ' - ' + columnDetails + ' - ' +
            'Button: ' + buttonDetails + ' - ' +
            'Click count: ' + clickCount + (ganttChartItemDetails ? ';' : '.');
        if (ganttChartItemDetails) {
            notificationsOutputElement.textContent +=
                '\n - Gantt Chart items: ' + ganttChartItemDetails + '.';
        }
        notificationsOutputElement.scrollTop = notificationsOutputElement.scrollHeight;
    }
    else {
        hoveringOutputElement.value = rowDetails + " - " + columnDetails;
    }
};
function getGanttChartItemDetailsAt(scheduleChartItem, dateTime) {
    var ganttChartItems = scheduleChartItem.ganttChartItems;
    if (!ganttChartItems)
        return null;
    var details = '';
    for (var i = 0; i < ganttChartItems.length; i++) {
        var item = ganttChartItems[i];
        if (item.start > dateTime || item.finish < dateTime)
            continue;
        if (details.length > 0)
            details += ', ';
        details += item.content ? item.content : '?';
    }
    return details;
}
