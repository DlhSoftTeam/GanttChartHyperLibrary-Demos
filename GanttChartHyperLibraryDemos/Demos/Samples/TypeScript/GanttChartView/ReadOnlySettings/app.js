/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
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
var ganttChartView;
var settings;
// Prepare command element references.
var isReadOnlyCheckBox = document.querySelector('#isReadOnlyCheckBox');
var isGridReadOnlyCheckBox = document.querySelector('#isGridReadOnlyCheckBox');
var isChartReadOnlyCheckBox = document.querySelector('#isChartReadOnlyCheckBox');
var isContentReadOnlyCheckBox = document.querySelector('#isContentReadOnlyCheckBox');
var isStartReadOnlyCheckBox = document.querySelector('#isStartReadOnlyCheckBox');
var isEffortReadOnlyCheckBox = document.querySelector('#isEffortReadOnlyCheckBox');
var isCompletionReadOnlyCheckBox = document.querySelector('#isCompletionReadOnlyCheckBox');
var areAssignmentsReadOnlyCheckBox = document.querySelector('#areAssignmentsReadOnlyCheckBox');
var isEffortPreservedWhenStartChangesInGridCheckBox = document.querySelector('#isEffortPreservedWhenStartChangesInGridCheckBox');
var areDependenciesReadOnlyCheckBox = document.querySelector('#areDependenciesReadOnlyCheckBox');
var hideDependenciesCheckBox = document.querySelector('#hideDependenciesCheckBox');
var disableCreatingStartDependenciesCheckBox = document.querySelector('#disableCreatingStartDependenciesCheckBox');
var disableStartEndDraggingCheckBox = document.querySelector('#disableStartEndDraggingCheckBox');
var disableScrollingOnTaskClick = document.querySelector('#disableScrollingOnTaskClick');
var areSchedulingColumnsReadOnlyCheckBox = document.querySelector('#areSchedulingColumnsReadOnlyCheckBox');
var hideGridCheckBox = document.querySelector('#hideGridCheckBox');
// Initialize settings based on user selections.
function initialize() {
    settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
    settings.isReadOnly = isReadOnlyCheckBox.checked;
    settings.isGridReadOnly = isGridReadOnlyCheckBox.checked;
    settings.isChartReadOnly = isChartReadOnlyCheckBox.checked;
    settings.isGridVisible = !hideGridCheckBox.checked;
    settings.isContentReadOnly = isContentReadOnlyCheckBox.checked;
    settings.isTaskStartReadOnly = isStartReadOnlyCheckBox.checked;
    settings.isTaskEffortReadOnly = isEffortReadOnlyCheckBox.checked;
    settings.isTaskCompletionReadOnly = isCompletionReadOnlyCheckBox.checked;
    settings.isAssignmentsContentReadOnly = areAssignmentsReadOnlyCheckBox.checked;
    settings.isTaskEffortPreservedWhenStartChangesInGrid = isEffortPreservedWhenStartChangesInGridCheckBox.checked;
    settings.areTaskPredecessorsReadOnly = areDependenciesReadOnlyCheckBox.checked;
    settings.areTaskDependenciesVisible = !hideDependenciesCheckBox.checked;
    settings.allowCreatingStartDependencies = !disableCreatingStartDependenciesCheckBox.checked;
    settings.allowCreatingToFinishDependencies = false; // Doesn't support updates upon reinitialization (unless you clean up the internal draggable dependency cache using: delete ganttChartViewElement['draggableDependencyItems']).
    settings.isDraggingTaskStartEndsEnabled = !disableStartEndDraggingCheckBox.checked;
    settings.isGridRowClickTimeScrollingEnabled = !disableScrollingOnTaskClick.checked;
    if (areSchedulingColumnsReadOnlyCheckBox.checked) {
        var columns = GanttChartView.getDefaultColumns(items, settings);
        for (var i = 1; i <= 4; i++)
            columns[i].isReadOnly = true;
        settings.columns = columns;
    }
    // Optionally, initialize custom themes (themes.js).
    initializeGanttChartTheme(settings, theme);
    
    // (Re-)Initialize the component.
    ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
}
initialize();
// Reinitialize settings and the component upon user commands.
isReadOnlyCheckBox.addEventListener('change', initialize);
isGridReadOnlyCheckBox.addEventListener('change', initialize);
isChartReadOnlyCheckBox.addEventListener('change', initialize);
hideGridCheckBox.addEventListener('change', initialize);
isContentReadOnlyCheckBox.addEventListener('change', initialize);
isStartReadOnlyCheckBox.addEventListener('change', initialize);
isEffortReadOnlyCheckBox.addEventListener('change', initialize);
isCompletionReadOnlyCheckBox.addEventListener('change', initialize);
areAssignmentsReadOnlyCheckBox.addEventListener('change', initialize);
isEffortPreservedWhenStartChangesInGridCheckBox.addEventListener('change', initialize);
areDependenciesReadOnlyCheckBox.addEventListener('change', initialize);
hideDependenciesCheckBox.addEventListener('change', initialize);
disableCreatingStartDependenciesCheckBox.addEventListener('change', initialize);
disableStartEndDraggingCheckBox.addEventListener('change', initialize);
disableScrollingOnTaskClick.addEventListener('change', initialize);
areSchedulingColumnsReadOnlyCheckBox.addEventListener('change', initialize);
// Handle item commands.
function setSelectedItemAsReadOnly() {
    var item = ganttChartView.getSelectedItem();
    if (!item || item.isReadOnly)
        return;
    item.isReadOnly = true;
    // Optionally, highlight read only item.
    item.content += '*';
    item.barStyle = 'fill: #60b060';
    item.completedBarStyle = 'fill: #108010';
    ganttChartView.refreshItem(item);
}
function setSelectedItemBarAsReadonly() {
    var item = ganttChartView.getSelectedItem();
    if (!item || item.isBarReadOnly)
        return;
    item.isBarReadOnly = true;
    // Optionally, highlight read only bar.
    item.barStyle = 'fill: #60b060';
    item.completedBarStyle = 'fill: #108010';
    ganttChartView.refreshChartItem(item);
}
