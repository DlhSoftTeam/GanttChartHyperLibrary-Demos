/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;
import NetworkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView;
import NetworkDiagramItem = NetworkDiagramView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;
declare var initializePertChartTemplates;
declare var initializePertChartTheme;

// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewContainerElement = <HTMLElement>document.querySelector('#ganttChartViewContainer');
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');
var networkDiagramViewContainerElement = <HTMLElement>document.querySelector('#networkDiagramViewContainer');
var networkDiagramViewElement = <HTMLElement>document.querySelector('#networkDiagramView');

// Prepare Gantt Chart data items and settings.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = <GanttChartItem[]>[];
for (var i = 1; i <= 8; i++)
    ganttChartItems.push({
        content: 'Task ' + i, start: new Date(year, month, 2 + i - 1, 8, 0, 0), finish: new Date(year, month, 2 + i - 1 + 3, 16, 0, 0)
    });
ganttChartItems[2].predecessors = <PredecessorItem[]>[{ item: ganttChartItems[1] }]; // Task 2 depends on Task 1.
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
        content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0)
    };
    ganttChartView.addItem(item);
}

function showNetworkDiagram() {
    ganttChartViewContainerElement.style.display = 'none';
    networkDiagramViewContainerElement.style.display = null;
    // Prepare Network Diagram data items and settings.
    var items = ganttChartView.getNetworkDiagramItems();
    var settings = <NetworkDiagramView.Settings>{ };
    // Optionally, initialize custom theme and templates for Network Diagram (themes.js, templates.js).
    initializePertChartTheme(settings, theme);
    initializePertChartTemplates(settings, theme);
    var networkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView.initialize(networkDiagramViewElement, items, settings);
}

function hideNetworkDiagram() {
    networkDiagramViewContainerElement.style.display = 'none';
    ganttChartViewContainerElement.style.display = null;
}
