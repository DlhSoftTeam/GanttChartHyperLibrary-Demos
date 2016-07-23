/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [];
for (var i = 1; i <= 16; i++)
    items.push({ content: 'Item ' + i, indentation: i % 3 == 2 ? 0 : 1, start: new Date() });
for (var i = 0; i < items.length; i++) {
    var parts = [];
    for (var j = 0; j < (i + 1) / 2; j++)
        parts.push({
            content: 'Bar ' + (i + 1) + '.' + (j + 1),
            start: new Date(year, month, 2 + (i + 1) + (j + 1) * i, 8, 0, 0),
            finish: new Date(year, month, 2 + (i + 1) + (j + 1) * i + (i / 2), 16, 0, 0),
            assignmentsContent: (i + 1) + '.' + (j + 1)
        });
    items[i].parts = parts;
}
var settings = {
    gridWidth: '15%', chartWidth: '85%',
    isGridRowClickTimeScrollingEnabled: false,
    currentTime: new Date(year, month, 2, 12, 0, 0)
};
var columns = GanttChartView.getDefaultColumns(items, settings);
columns.splice(1, Infinity);
settings.columns = columns;
// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);