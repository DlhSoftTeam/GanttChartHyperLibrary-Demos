/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var NetworkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewContainerElement = document.querySelector('#ganttChartViewContainer');
var ganttChartViewElement = document.querySelector('#ganttChartView');
var networkDiagramViewContainerElement = document.querySelector('#networkDiagramViewContainer');
var networkDiagramViewElement = document.querySelector('#networkDiagramView');
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
function showNetworkDiagram() {
    ganttChartViewContainerElement.style.display = 'none';
    networkDiagramViewContainerElement.style.display = null;
    // Prepare Network Diagram data items and settings.
    var items = ganttChartView.getNetworkDiagramItems();
    var settings = {};
    // Optionally, initialize custom theme and templates for Network Diagram (themes.js, templates.js).
    initializePertChartTheme(settings, theme);
    initializePertChartTemplates(settings, theme);
    var networkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView.initialize(networkDiagramViewElement, items, settings);
    ;
}
function hideNetworkDiagram() {
    networkDiagramViewContainerElement.style.display = 'none';
    ganttChartViewContainerElement.style.display = null;
}
