var GanttChartView = DlhSoft.Controls.GanttChartView;
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
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
var isReadOnlyCheckBox = document.querySelector('#isReadOnlyCheckBox');
var isGridReadOnlyCheckBox = document.querySelector('#isGridReadOnlyCheckBox');
var isChartReadOnlyCheckBox = document.querySelector('#isChartReadOnlyCheckBox');
var isContentReadOnlyCheckBox = document.querySelector('#isContentReadOnlyCheckBox');
var isStartReadOnlyCheckBox = document.querySelector('#isStartReadOnlyCheckBox');
var isEffortReadOnlyCheckBox = document.querySelector('#isEffortReadOnlyCheckBox');
var isCompletionReadOnlyCheckBox = document.querySelector('#isCompletionReadOnlyCheckBox');
var areAssignmentsReadOnlyCheckBox = document.querySelector('#areAssignmentsReadOnlyCheckBox');
var areDependenciesReadOnlyCheckBox = document.querySelector('#areDependenciesReadOnlyCheckBox');
var hideDependenciesCheckBox = document.querySelector('#hideDependenciesCheckBox');
var disableCreatingStartDependenciesCheckBox = document.querySelector('#disableCreatingStartDependenciesCheckBox');
var disableCreatingToFinishDependenciesCheckBox = document.querySelector('#disableCreatingToFinishDependenciesCheckBox');
var disableStartEndDraggingCheckBox = document.querySelector('#disableStartEndDraggingCheckBox');
var disableScrollingOnTaskClick = document.querySelector('#disableScrollingOnTaskClick');
var areSchedulingColumnsReadOnlyCheckBox = document.querySelector('#areSchedulingColumnsReadOnlyCheckBox');
var hideGridCheckBox = document.querySelector('#hideGridCheckBox');
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
    settings.areTaskPredecessorsReadOnly = areDependenciesReadOnlyCheckBox.checked;
    settings.areTaskDependenciesVisible = !hideDependenciesCheckBox.checked;
    settings.allowCreatingStartDependencies = !disableCreatingStartDependenciesCheckBox.checked;
    settings.allowCreatingToFinishDependencies = !disableCreatingToFinishDependenciesCheckBox.checked;
    settings.isDraggingTaskStartEndsEnabled = !disableStartEndDraggingCheckBox.checked;
    settings.isGridRowClickTimeScrollingEnabled = !disableScrollingOnTaskClick.checked;
    if (areSchedulingColumnsReadOnlyCheckBox.checked) {
        var columns = GanttChartView.getDefaultColumns(items, settings);
        for (var i = 1; i <= 4; i++)
            columns[i].isReadOnly = true;
        settings.columns = columns;
    }
    if (initializeGanttChartTheme)
        initializeGanttChartTheme(settings, theme);
    if (initializeGanttChartTemplates)
        initializeGanttChartTemplates(settings, theme);
    ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
}
initialize();
isReadOnlyCheckBox.addEventListener('change', initialize);
isGridReadOnlyCheckBox.addEventListener('change', initialize);
isChartReadOnlyCheckBox.addEventListener('change', initialize);
hideGridCheckBox.addEventListener('change', initialize);
isContentReadOnlyCheckBox.addEventListener('change', initialize);
isStartReadOnlyCheckBox.addEventListener('change', initialize);
isEffortReadOnlyCheckBox.addEventListener('change', initialize);
isCompletionReadOnlyCheckBox.addEventListener('change', initialize);
areAssignmentsReadOnlyCheckBox.addEventListener('change', initialize);
areDependenciesReadOnlyCheckBox.addEventListener('change', initialize);
hideDependenciesCheckBox.addEventListener('change', initialize);
disableCreatingStartDependenciesCheckBox.addEventListener('change', initialize);
disableCreatingToFinishDependenciesCheckBox.addEventListener('change', initialize);
disableStartEndDraggingCheckBox.addEventListener('change', initialize);
disableScrollingOnTaskClick.addEventListener('change', initialize);
areSchedulingColumnsReadOnlyCheckBox.addEventListener('change', initialize);
function setSelectedItemAsReadOnly() {
    var item = ganttChartView.getSelectedItem();
    if (!item)
        return;
    item.isReadOnly = true;
    ganttChartView.refreshItem(item);
}
function setSelectedItemBarAsReadonly() {
    var item = ganttChartView.getSelectedItem();
    if (!item)
        return;
    item.isBarReadOnly = true;
    ganttChartView.refreshChartItem(item);
}
