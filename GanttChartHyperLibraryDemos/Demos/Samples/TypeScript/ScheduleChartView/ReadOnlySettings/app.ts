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

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = <ScheduleChartItem[]>[
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


var scheduleChartView: ScheduleChartView.Element;
var settings: ScheduleChartView.Settings;

// Prepare command element references.
var isReadOnlyCheckBox = <HTMLInputElement>document.querySelector('#isReadOnlyCheckBox');
var isGridReadOnlyCheckBox = <HTMLInputElement>document.querySelector('#isGridReadOnlyCheckBox');
var isChartReadOnlyCheckBox = <HTMLInputElement>document.querySelector('#isChartReadOnlyCheckBox');
var isStartReadOnlyCheckBox = <HTMLInputElement>document.querySelector('#isStartReadOnlyCheckBox');
var isEffortReadOnlyCheckBox = <HTMLInputElement>document.querySelector('#isEffortReadOnlyCheckBox');
var isCompletionReadOnlyCheckBox = <HTMLInputElement>document.querySelector('#isCompletionReadOnlyCheckBox');
var disableStartEndDraggingCheckBox = <HTMLInputElement>document.querySelector('#disableStartEndDraggingCheckBox');
var disableScrollingOnTaskClick = <HTMLInputElement>document.querySelector('#disableScrollingOnTaskClick');
var hideGridCheckBox = <HTMLInputElement>document.querySelector('#hideGridCheckBox');

// Initialize settings based on user selections.
function initialize() {
    settings = <ScheduleChartView.Settings>{ currentTime: new Date(year, month, 2, 12, 0, 0) };

    settings.isReadOnly = isReadOnlyCheckBox.checked;
    settings.isGridReadOnly = isGridReadOnlyCheckBox.checked;
    settings.isChartReadOnly = isChartReadOnlyCheckBox.checked;
    settings.isGridVisible = !hideGridCheckBox.checked;
    settings.isTaskStartReadOnly = isStartReadOnlyCheckBox.checked;
    settings.isTaskEffortReadOnly = isEffortReadOnlyCheckBox.checked;
    settings.isTaskCompletionReadOnly = isCompletionReadOnlyCheckBox.checked;
    settings.areAssignmentsReadOnly = false; // Doesn't support updates upon reinitialization (unless you clean up the internal draggable dependency cache using: delete scheduleChartViewElement['draggableAssignmentItems']).
    settings.isDraggingTaskStartEndsEnabled = !disableStartEndDraggingCheckBox.checked;
    settings.isGridRowClickTimeScrollingEnabled = !disableScrollingOnTaskClick.checked;

    // Optionally, initialize custom theme and templates (themes.js, templates.js).
    if (initializeGanttChartTheme)
        initializeGanttChartTheme(settings, theme);
    if (initializeGanttChartTemplates)
        initializeGanttChartTemplates(settings, theme);

    // (Re-)Initialize the component.
    scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
}
initialize();

// Reinitialize settings and the component upon user commands.
isReadOnlyCheckBox.addEventListener('change', initialize);
isGridReadOnlyCheckBox.addEventListener('change', initialize);
isChartReadOnlyCheckBox.addEventListener('change', initialize);
hideGridCheckBox.addEventListener('change', initialize);
isStartReadOnlyCheckBox.addEventListener('change', initialize);
isEffortReadOnlyCheckBox.addEventListener('change', initialize);
isCompletionReadOnlyCheckBox.addEventListener('change', initialize);
disableStartEndDraggingCheckBox.addEventListener('change', initialize);
disableScrollingOnTaskClick.addEventListener('change', initialize);
