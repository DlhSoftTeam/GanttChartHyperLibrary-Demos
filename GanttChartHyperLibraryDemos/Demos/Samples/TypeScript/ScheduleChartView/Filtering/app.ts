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

// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = <HTMLElement>document.querySelector('#scheduleChartView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = <ScheduleChartItem[]>[
    { content: 'Mary Sanders', start: new Date(), ganttChartItems: [{ content: 'Task A (Mary Sanders)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
    {
        content: 'John Doe', start: new Date(), ganttChartItems: [
            { content: 'Task A (John Doe)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Task B (John Doe)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Task C (John Doe)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    { content: 'John Smith', start: new Date(), ganttChartItems: [{ content: 'Task D (John Smith)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
            { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });

// Prepare control settings.
var settings = <ScheduleChartView.Settings>{
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);

// Select an item to serve as hide command target.
scheduleChartView.selectItem(scheduleChartItems[0]);

// Move commands.
function setSelectedItemAsHidden() {
    var item = scheduleChartView.getSelectedItem();
    if (item == null)
        return;
    item.isHidden = true;
    scheduleChartView.refresh();
}
function applyVisibilityFilter(resourceName) {
    settings.visibilityFilter = (item) => {
        item = item['scheduleChartItem'] ? item['scheduleChartItem'] : item;
        if (item.isHidden)
            return false;
        return item.content.indexOf(resourceName) >= 0;
    };
    scheduleChartView.refresh();
}
