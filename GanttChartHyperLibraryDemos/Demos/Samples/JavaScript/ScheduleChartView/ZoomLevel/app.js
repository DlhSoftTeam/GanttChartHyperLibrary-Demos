/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [
    { content: 'Resource 1', start: new Date(), ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
    {
        content: 'Resource 2', start: new Date(), ganttChartItems: [
            { content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    { content: 'Resource 3', start: new Date(), ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
            { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });
var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0), itemClass: 'grid-item'
};
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Prepare command element references.
var zoomLevelTextBox = document.querySelector('#zoomLevelTextBox');
var disableMouseWheelZoomCheckBox = document.querySelector('#disableMouseWheelZoomCheckBox');
// Initialize input value for zoom level element.
zoomLevelTextBox.value = '5';
// Update zoom level settings based on user selections.
function updateZoomLevel() {
    var hourWidth = parseFloat(zoomLevelTextBox.value);
    if (hourWidth > 0)
        settings.hourWidth = hourWidth;
    settings.isMouseWheelZoomEnabled = !disableMouseWheelZoomCheckBox.checked;
    if (scheduleChartView)
        scheduleChartView.refresh();
}
// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
// Update zoom level settings upon user commands.
zoomLevelTextBox.addEventListener('change', updateZoomLevel);
zoomLevelTextBox.addEventListener('keyup', updateZoomLevel);
disableMouseWheelZoomCheckBox.addEventListener('change', updateZoomLevel);
