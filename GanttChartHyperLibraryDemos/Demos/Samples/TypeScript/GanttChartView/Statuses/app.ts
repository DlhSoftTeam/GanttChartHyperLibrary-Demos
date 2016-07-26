/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = <GanttChartItem[]>[
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
items[10].completedFinish = new Date(items[10].start.valueOf());
items[10].completedFinish.setHours(items[10].completedFinish.getHours() + 2);

// Status logic.
function getStatus(item: GanttChartItem): string {
    if (item.hasChildren || item.isMilestone)
        return '';
    if (item.completedFinish >= item.finish)
        return 'Completed';
    var now = settings.currentTime;
    if (item.completedFinish < now)
        return 'Behind schedule';
    if (item.completedFinish > item.start)
        return 'In progress';
    return 'To do';
}
function getStatusColor(status: string): string {
    switch (status) {
        case 'Completed':
            return 'Green';
        case 'To do':
            return 'Gray';
        case 'Behind schedule':
            return 'Red';
        case 'In progress':
            return 'Orange';
        default:
            return 'Transparent';
    }
}

var settings = <GanttChartView.Settings>{ currentTime: new Date(year, month, 2, 12, 0, 0) };

// Prepare the custom Status columns.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns.splice(1, 0, {
    header: 'Status', width: 120,
    cellTemplate: (item: GanttChartItem) => {
        return DlhSoft.Controls.GanttChartView.textColumnTemplateBase(document,
            () => { return getStatus(item); });
    }
});
columns.splice(1, 0, {
    header: '', width: 30,
    cellTemplate: (item: GanttChartItem) => {
        var rectangle = document.createElement('div');
        rectangle.innerHTML = '&nbsp;';
        rectangle.setAttribute('style', 'background-color: ' + getStatusColor(getStatus(item)));
        return rectangle;
    }
});
settings.columns = columns;

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);

// Simulate that time has passed.
function increaseCurrentTime() {
    settings.currentTime = GanttChartView.getInputDate(new Date(year, month, 5, 12, 0, 0));
    ganttChartView.refresh();
}
