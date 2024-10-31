/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
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
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
// Prepare elements to output information about mouse events when they occur.
var notificationsOutputElement = document.querySelector('#notificationsOutput');
var hoveringOutputElement = document.querySelector('#hoveringOutput');
// Handle mouse events.
// Note that mouseHandler is a generic function that handles multiple mouse events with a single set of statements.
// Alternatively, you may use specific handler functions, such as: mouseMoveHandler, mouseDownHandler, clickHandler, doubleClickHandler, itemClickHandler, itemDoubleClickHandler, chartClickHandler, chartDoubleClickHandler, itemChartClickHandler, and itemChartDoubleClickHandler.
settings.mouseHandler = function (eventName, isOnItemsArea, isOnChart, row, column, button, clickCount, e) {
    var rowDetails = isOnItemsArea ? 'Item: ' + (row ? row.content : 'none') : (row ? 'Scale: ' + row.scaleType : 'Grid header');
    var columnDetails = isOnChart ? 'Date: ' + column.toDateString() : 'Column: ' + column.header;
    var buttonDetails = button == 1 ? 'left' : (button == 2 ? 'middle' : (button == 3 ? 'right' : 'N/A'));
    if (clickCount > 0) {
        notificationsOutputElement.textContent += (notificationsOutputElement.textContent.length > 0 ? '\n' : '') +
            'Event: ' + eventName + ' - ' +
            'Is on items area: ' + isOnItemsArea + ' - ' +
            'Is on chart: ' + isOnChart + ' - ' +
            rowDetails + ' - ' + columnDetails + ' - ' +
            'Button: ' + buttonDetails + ' - ' +
            'Click count: ' + clickCount + '.';
        notificationsOutputElement.scrollTop = notificationsOutputElement.scrollHeight;
    }
    else {
        hoveringOutputElement.value = rowDetails + " - " + columnDetails;
    }
};
// Supplementary, you may handle dependency like click and double click events.
settings.dependencyLineClickHandler = function (predecessorItem, targetItem) {
    notificationsOutputElement.textContent += (notificationsOutputElement.textContent.length > 0 ? '\n' : '') +
        'Dependency line event: click - ' +
        'Source item: ' + predecessorItem.item.content + ' - ' +
        'Target item: ' + targetItem.content + ' - ' +
        'Dependency type: ' + (predecessorItem.dependencyType ? predecessorItem.dependencyType : 'FS') + '.';
};
