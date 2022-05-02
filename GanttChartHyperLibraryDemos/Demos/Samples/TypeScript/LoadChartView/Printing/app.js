/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var LoadChartView = DlhSoft.Controls.LoadChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var loadChartViewElement = document.querySelector('#loadChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var loadChartItems = [{
        content: 'Resource 1', start: new Date(), ganttChartItems: [
            { content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
            { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
            { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
            { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }]
    },
    { content: 'Resource 2', start: new Date(), ganttChartItems: [{ content: 'Task 2 (Resource 2)', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) }] }];
for (var i = 3; i <= 16; i++)
    loadChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), units: 1 },
            { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), units: 1 }]
    });
var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0)
};
// Optionally, initialize custom themes (themes.js).
initializeLoadChartTheme(settings, theme);
// Initialize the component.
var loadChartView = DlhSoft.Controls.LoadChartView.initialize(loadChartViewElement, loadChartItems, settings);
function print() {
    // Print the resources column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
    // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
    loadChartView.print({ title: 'Load Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
}
