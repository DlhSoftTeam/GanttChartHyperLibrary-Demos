/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import LoadChartView = DlhSoft.Controls.LoadChartView;
import LoadChartItem = LoadChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;
declare var initializeLoadChartTheme;

// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewContainerElement = <HTMLElement>document.querySelector('#ganttChartViewContainer');
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');
var loadChartViewContainerElement = <HTMLElement>document.querySelector('#loadChartViewContainer');
var loadChartViewElement = <HTMLElement>document.querySelector('#loadChartView');

// Prepare Gantt Chart data items and settings.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = <GanttChartItem[]>[];
for (var i = 1; i <= 8; i++)
    ganttChartItems.push({
        content: 'Task ' + i, start: new Date(year, month, 2 + i - 1, 8, 0, 0), finish: new Date(year, month, 2 + i - 1 + 3, 16, 0, 0),
        assignmentsContent: 'Resource ' + (i % 3 > 0 ? i % 3 : 3)
    });
var ganttChartSettings = <GanttChartView.Settings>{
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom theme and templates for Gantt Chart (themes.js, templates.js).
initializeGanttChartTheme(ganttChartSettings, theme);
initializeGanttChartTemplates(ganttChartSettings, theme);

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, ganttChartItems, ganttChartSettings);

function addNewGanttChartItem() {
    var item = {
        content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0),
        assignmentsContent: 'Resource 5'
    };
    ganttChartView.addItem(item);
}

function showLoadChart() {
    ganttChartViewContainerElement.style.display = 'none';
    loadChartViewContainerElement.style.display = null;
    // Prepare Load Chart data items and settings.
    var items = ganttChartView.getLoadChartItems();
    var settings = <LoadChartView.Settings>{
        currentTime: new Date(year, month, 2) // Display the current time vertical line of the chart at the project start date.
    };
    // Optionally, initialize custom theme for Load Chart (themes.js).
    initializeLoadChartTheme(settings, theme);
    var loadChartView = DlhSoft.Controls.LoadChartView.initialize(loadChartViewElement, items, settings);;
}

function hideLoadChart() {
    loadChartViewContainerElement.style.display = 'none';
    ganttChartViewContainerElement.style.display = null;
}
