/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import LoadChartView = DlhSoft.Controls.LoadChartView;
import LoadChartItem = LoadChartView.Item;
import AllocationItem = LoadChartView.AllocationItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeLoadChartTheme;

// Retrieve and store the control element for reference purposes.
var loadChartViewElement = <HTMLElement>document.querySelector('#loadChartView');

// Prepare a single data item with multiple allocations.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var loadChartItems = <LoadChartItem[]>[{
    content: 'Resource 1', start: new Date(), ganttChartItems: [
        { content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
        { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
        { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
        { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }]
}];

// Prepare control settings.
var settings = <LoadChartView.Settings>{
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom themes (themes.js).
initializeLoadChartTheme(settings, theme);

// settings.isGridVisible = false;
settings.itemHeight = 312;
settings.barMargin = 8;
settings.barHeight = settings.itemHeight - settings.barMargin * 2;

// Initialize the component.
var loadChartView = DlhSoft.Controls.LoadChartView.initialize(loadChartViewElement, loadChartItems, settings);
