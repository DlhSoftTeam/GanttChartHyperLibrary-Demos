/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;

// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewContainerElement = <HTMLElement>document.querySelector('#ganttChartViewContainer');
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');
var scheduleChartViewContainerElement = <HTMLElement>document.querySelector('#scheduleChartViewContainer');
var scheduleChartViewElement = <HTMLElement>document.querySelector('#scheduleChartView');

// Prepare Gantt Chart data items and settings.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = <GanttChartItem[]>[];
for (var i = 1; i <= 8; i++)
    ganttChartItems.push({
        content: 'Task ' + i, start: new Date(year, month, 2 + i - 1, 8, 0, 0), finish: new Date(year, month, 2 + i - 1 + 3, 16, 0, 0),
        assignmentsContent: 'Resource ' + (i % 4 > 0 ? i % 4 : 4)
    });
var ganttChartSettings = <GanttChartView.Settings>{
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom themes for Gantt Chart (themes.js).
initializeGanttChartTheme(ganttChartSettings, theme);

// Initialize the Gantt Chart component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, ganttChartItems, ganttChartSettings);

function addNewGanttChartItem() {
    var item = {
        content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0),
        assignmentsContent: 'Resource 5'
    };
    ganttChartView.addItem(item);
}

function showScheduleChart() {
    ganttChartViewContainerElement.style.display = 'none';
    scheduleChartViewContainerElement.style.display = null;

    // Prepare Schedule Chart data items and settings.
    var items = ganttChartView.getScheduleChartItems();
    var settings = <ScheduleChartView.Settings>{
        currentTime: new Date(year, month, 2) // Display the current time vertical line of the chart at the project start date.
    };

    // Optionally, initialize custom themes for Schedule Chart (themes.js).
    initializeGanttChartTheme(settings, theme);

    // Initialize the Schedule Chart component.
    var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, items, settings);
}

function hideScheduleChart() {
    scheduleChartViewContainerElement.style.display = 'none';
    ganttChartViewContainerElement.style.display = null;
}
