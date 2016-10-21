/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = <HTMLElement>document.querySelector('#scheduleChartView');

interface MyScheduleChartItem extends ScheduleChartItem {
    myValue1?: string;
    myValue2?: string;
}

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = <MyScheduleChartItem[]>[
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

var settings = <ScheduleChartView.Settings>{
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, provide a selection column.
// settings.selectionMode = 'Extended';

// Initialize columns.
var columns = DlhSoft.Controls.ScheduleChartView.getDefaultColumns(scheduleChartItems, settings);
columns[0].header = 'Workers';
columns[0].width = 120;

// Initialize extra custom item values and associated columns.
scheduleChartItems[2].myValue1 = 'A1'; scheduleChartItems[3].myValue1 = 'B1'; scheduleChartItems[3].myValue2 = 'B2';
columns.push({ header: 'My value 1', width: 80, cellTemplate: function (item: MyScheduleChartItem) { return DlhSoft.Controls.ScheduleChartView.textInputColumnTemplateBase(document, 64, function () { return item.myValue1; }, function (value) { item.myValue1 = value; }); } });
columns.push({ header: 'My value 2', width: 80, cellTemplate: function (item: MyScheduleChartItem) { return DlhSoft.Controls.ScheduleChartView.textInputColumnTemplateBase(document, 64, function () { return item.myValue2; }, function (value) { item.myValue2 = value; }); } });

settings.columns = columns;

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);

// Refresh the control upon custom operations in order for extra column values to be updated in the user interface.
function addNewItem() {
    var item = { content: 'New resource', start: new Date(), ganttChartItems: [] };
    scheduleChartView.addScheduleChartItem(item);
    scheduleChartView.selectItem(item);
    scheduleChartView.scrollToItem(item);
}
function insertNewItem() {
    if (scheduleChartView.getSelectedItem() == null)
        return;
    var item = { content: 'New resource', start: new Date(), ganttChartItems: [] };
    scheduleChartView.insertScheduleChartItem(scheduleChartView.getSelectedItem().scheduleChartIndex, item);
    scheduleChartView.selectItem(item);
    scheduleChartView.scrollToItem(item);
}
function deleteItem() {
    if (scheduleChartView.getSelectedItem() == null)
        return;
    scheduleChartView.removeScheduleChartItem(scheduleChartView.getSelectedItem());
}
