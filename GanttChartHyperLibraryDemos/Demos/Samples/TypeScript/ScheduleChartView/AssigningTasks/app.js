/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
// Prepare unassigned tasks (Gantt Chart items).
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = [];
for (var i = 1; i <= 16; i++)
    ganttChartItems.push({ content: 'Task ' + i, start: new Date(year, month, 2 + i - 1, 8, 0, 0), finish: new Date(year, month, 2 + i - 1 + 3, 16, 0, 0) });
var ganttChartSettings = {
    gridWidth: '20%', chartWidth: '80%', isSplitterEnabled: false,
    isChartReadOnly: true, isMouseWheelZoomEnabled: false,
    currentTime: new Date(year, month, 2, 12, 0, 0)
};
// Optionally, initialize custom theme and templates for Gantt Chart (themes.js, templates.js).
initializeGanttChartTheme(ganttChartSettings, theme);
initializeGanttChartTemplates(ganttChartSettings, theme);
// Initialize the Gantt Chart component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, ganttChartItems, ganttChartSettings);
// Prepare target resource items (Schedule Chart items).
var items = [];
for (var i = 1; i <= 5; i++)
    items.push({ content: 'Resource ' + i, start: new Date(), ganttChartItems: [] });
var scheduleChartSettings = {
    gridWidth: '20%', chartWidth: '80%', isSplitterEnabled: false,
    isMouseWheelZoomEnabled: false,
    currentTime: new Date(year, month, 2) // Display the current time vertical line of the chart at the project start date.
};
// Optionally, initialize custom theme and templates for Schedule Chart (themes.js, templates.js).
initializeGanttChartTheme(scheduleChartSettings, theme);
initializeGanttChartTemplates(scheduleChartSettings, theme);
// Initialize the Schedule Chart component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, items, scheduleChartSettings);
// Synchronize displayed time (horizontal scrolling) between Gantt Chart and Schedule Chart components.
ganttChartSettings.displayedTimeChangeHandler = scheduleChartSettings.displayedTimeChangeHandler = function (displayedTime) {
    scheduleChartView.scrollToDateTime(displayedTime);
    ganttChartView.scrollToDateTime(displayedTime);
};
// Support for dragging source tasks from Gantt Chart to target Schedule Chart resource rows.
var hoveredGanttChartItem;
var draggedGanttChartItem;
var draggingToScheduleChartItem;
var draggingIndicator = document.createElement('div');
draggingIndicator.setAttribute('style', 'display: none; position: absolute; padding: 2px 4px; background-color: #8abbed; color: White; font-family: Arial');
document.body.appendChild(draggingIndicator);
function isCursorOnTaskBar(isOnItemsArea, isOnChart, row, column) {
    if (isOnItemsArea && isOnChart) {
        var dateTime = column;
        var item = row;
        if (item.start <= dateTime && item.finish >= dateTime)
            return true;
    }
    return false;
}
window.addEventListener('mousemove', function () {
    hoveredGanttChartItem = null;
    if (draggedGanttChartItem != null)
        draggingIndicator.innerText = draggedGanttChartItem.content;
    setTimeout(function () {
        if (hoveredGanttChartItem == null && draggedGanttChartItem == null)
            document.body.style.cursor = 'default';
    });
}, true);
ganttChartSettings.mouseMoveHandler = function (isOnItemsArea, isOnChart, row, column) {
    if (draggingToScheduleChartItem != null)
        draggingToScheduleChartItem = null;
    if (isCursorOnTaskBar(isOnItemsArea, isOnChart, row, column)) {
        hoveredGanttChartItem = row;
        document.body.style.cursor = 'move';
    }
};
ganttChartSettings.mouseDownHandler = function () {
    draggedGanttChartItem = null;
    if (hoveredGanttChartItem != null) {
        draggedGanttChartItem = hoveredGanttChartItem;
        draggingIndicator.innerText = hoveredGanttChartItem.content;
        draggingIndicator.style.display = 'block';
        document.body.style.cursor = 'move';
    }
};
scheduleChartSettings.mouseMoveHandler = function (isOnItemsArea, isOnChart, row) {
    if (isOnItemsArea) {
        draggingToScheduleChartItem = row;
        scheduleChartView.selectItem(draggingToScheduleChartItem);
        draggingIndicator.innerText = draggedGanttChartItem.content + ': ' + draggingToScheduleChartItem.content;
    }
};
window.onmousemove = function (e) {
    draggingIndicator.style.left = (e.clientX + 12).toString() + 'px';
    draggingIndicator.style.top = (e.clientY - 12).toString() + 'px';
};
window.onmouseup = function () {
    if (draggedGanttChartItem && draggingToScheduleChartItem) {
        ganttChartItems.splice(draggedGanttChartItem.index, 1);
        ganttChartView.refresh();
        draggingToScheduleChartItem.ganttChartItems.push(draggedGanttChartItem);
        scheduleChartView.refresh();
    }
    draggingToScheduleChartItem = null;
    draggedGanttChartItem = null;
    draggingIndicator.style.display = 'none';
    document.body.style.cursor = 'default';
};
