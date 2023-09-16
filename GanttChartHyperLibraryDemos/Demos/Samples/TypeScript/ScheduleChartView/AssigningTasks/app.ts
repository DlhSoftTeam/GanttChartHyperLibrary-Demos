/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;

// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');
var scheduleChartViewElement = <HTMLElement>document.querySelector('#scheduleChartView');

// Prepare unassigned tasks (Gantt Chart items).
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = <GanttChartItem[]>[];
for (var i = 1; i <= 16; i++)
    ganttChartItems.push({ content: 'Task ' + i, start: new Date(year, month, 2 + i - 1, 8, 0, 0), finish: new Date(year, month, 2 + i - 1 + 3, 16, 0, 0) });
var ganttChartSettings = <GanttChartView.Settings>{
    gridWidth: '20%', chartWidth: '80%', isSplitterEnabled: false,
    isChartReadOnly: true, isMouseWheelZoomEnabled: false,
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom themes for Gantt Chart (themes.js).
initializeGanttChartTheme(ganttChartSettings, theme);

// Initialize the Gantt Chart component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, ganttChartItems, ganttChartSettings);

// Prepare target resource items (Schedule Chart items).
var items = <ScheduleChartItem[]>[];
for (var i = 1; i <= 5; i++)
    items.push({ content: 'Resource ' + i, start: new Date(), ganttChartItems: [] });
var scheduleChartSettings = <ScheduleChartView.Settings>{
    gridWidth: '20%', chartWidth: '80%', isSplitterEnabled: false,
    isMouseWheelZoomEnabled: false,
    currentTime: new Date(year, month, 2, 12, 0, 0) // Display the current time vertical line of the chart at the project start date.
};

// Optionally, initialize custom themes for Schedule Chart (themes.js).
initializeGanttChartTheme(scheduleChartSettings, theme);

// Initialize the Schedule Chart component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, items, scheduleChartSettings);

// Synchronize displayed time (horizontal scrolling) between Gantt Chart and Schedule Chart components.
ganttChartSettings.displayedTimeChangeHandler = scheduleChartSettings.displayedTimeChangeHandler = (displayedTime) => {
    if (displayedTime != scheduleChartView.settings.displayedTime)
        scheduleChartView.scrollToDateTime(displayedTime);
    if (displayedTime != ganttChartView.settings.displayedTime)
        ganttChartView.scrollToDateTime(displayedTime);
};

// Support for dragging source tasks from Gantt Chart to target Schedule Chart resource rows.
var hoveredGanttChartItem: GanttChartItem;
var draggedGanttChartItem: GanttChartItem;
var draggingToScheduleChartItem: ScheduleChartItem;
var draggingIndicator: HTMLElement = document.createElement('div');
draggingIndicator.setAttribute('style', 'display: none; position: absolute; padding: 2px 4px; background-color: #8abbed; color: White; font-family: Arial');
document.body.appendChild(draggingIndicator);
function isCursorOnTaskBar(isOnItemsArea, isOnChart, row, column) {
    if (isOnItemsArea && isOnChart) {
        var dateTime = <Date>column;
        var item = <GanttChartItem>row;
        if (item.start <= dateTime && item.finish >= dateTime)
            return true;
    }            
    return false;
}
window.addEventListener('mousemove', () => {
    hoveredGanttChartItem = null;
    if (draggedGanttChartItem != null)
        draggingIndicator.innerText = draggedGanttChartItem.content;
    setTimeout(() => {
        if (hoveredGanttChartItem == null && draggedGanttChartItem == null)
            document.body.style.cursor = 'default';
    });
}, true);
ganttChartSettings.mouseMoveHandler = (isOnItemsArea, isOnChart, row, column) => {
    if (draggingToScheduleChartItem != null)
        draggingToScheduleChartItem = null;
    if (isCursorOnTaskBar(isOnItemsArea, isOnChart, row, column)) {
        hoveredGanttChartItem = <GanttChartItem>row;
        document.body.style.cursor = 'move';
    }
};
ganttChartSettings.mouseDownHandler = () => {
    draggedGanttChartItem = null;
    if (hoveredGanttChartItem != null) {
        draggedGanttChartItem = hoveredGanttChartItem;
        draggingIndicator.innerText = hoveredGanttChartItem.content;
        draggingIndicator.style.display = 'block';
        document.body.style.cursor = 'move';
    }
};
scheduleChartSettings.mouseMoveHandler = (isOnItemsArea, isOnChart, row) => {
    if (isOnItemsArea) {
        draggingToScheduleChartItem = <ScheduleChartItem>row;
        scheduleChartView.selectItem(draggingToScheduleChartItem);
        draggingIndicator.innerText = draggedGanttChartItem.content + ': ' + draggingToScheduleChartItem.content;
    }
};
window.onmousemove = (e) => {
    draggingIndicator.style.left = (e.clientX + 12).toString() + 'px';
    draggingIndicator.style.top = (e.clientY - 12).toString() + 'px';
};
window.onmouseup = () => {
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
