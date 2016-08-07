/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var PertChartView = DlhSoft.Controls.Pert.PertChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewContainerElement = document.querySelector('#ganttChartViewContainer');
var ganttChartViewElement = document.querySelector('#ganttChartView');
var pertChartViewContainerElement = document.querySelector('#pertChartViewContainer');
var pertChartViewElement = document.querySelector('#pertChartView');
// Prepare Gantt Chart data items and settings.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = [];
for (var i = 1; i <= 8; i++)
    ganttChartItems.push({
        content: 'Task ' + i, start: new Date(year, month, 2 + i - 1, 8, 0, 0), finish: new Date(year, month, 2 + i - 1 + 3, 16, 0, 0),
        assignmentsContent: 'Resource ' + (i % 3 > 0 ? i % 3 : 3)
    });
ganttChartItems[2].predecessors = [{ item: ganttChartItems[1] }]; // Task 2 depends on Task 1.
var ganttChartSettings = {
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};
// Optionally, initialize custom theme and templates for Gantt Chart (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(ganttChartSettings, theme);
if (initializeGanttChartTemplates)
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
function showPertChart() {
    ganttChartViewContainerElement.style.display = 'none';
    pertChartViewContainerElement.style.display = null;
    // Prepare PERT Chart data items and settings.
    var items = ganttChartView.getPertChartItems();
    var settings = {};
    // Optionally, initialize custom theme and templates for PERT Chart (themes.js, templates.js).
    if (initializePertChartTheme)
        initializePertChartTheme(settings, theme);
    if (initializePertChartTemplates)
        initializePertChartTemplates(settings, theme);
    var pertChartView = DlhSoft.Controls.Pert.PertChartView.initialize(pertChartViewElement, items, settings);
    ;
}
function hidePertChart() {
    pertChartViewContainerElement.style.display = 'none';
    ganttChartViewContainerElement.style.display = null;
}
