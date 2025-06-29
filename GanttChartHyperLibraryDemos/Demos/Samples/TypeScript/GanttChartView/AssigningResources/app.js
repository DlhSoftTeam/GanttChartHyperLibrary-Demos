/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
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
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns.splice(1, 4); // Remove all default columns except Task and Assignments.
columns.push({ header: 'Cost ($)', width: 110, cellTemplate: DlhSoft.Controls.GanttChartView.getCostColumnTemplate(84) });
settings.columns = columns;
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Optionally, define assignable resources.
settings.assignableResources = ['Resource 1', 'Resource 2', 'Resource 3',
    'Material 1', 'Material 2'];
settings.autoAppendAssignableResources = true;
// Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
settings.resourceQuantities = [{ key: 'Material 1', value: 4 }, { key: 'Material 2', value: Infinity }];
items[10].assignmentsContent = 'Material 1 [250%], Material 2';
items[11].assignmentsContent = 'Material 1, Material 2 [200%]';
items[12].assignmentsContent = 'Material 1';
// Optionally, define task and resource costs.
settings.taskInitiationCost = 5;
items[4].executionCost = 50;
settings.defaultResourceHourCost = 10;
settings.specificResourceHourCosts = [{ key: 'Resource 1', value: 20 }, { key: 'Material 2', value: 0.5 }];
settings.areTaskDependencyConstraintsEnabled = true;
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
function addNewItem() {
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.addItem(item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
}
function insertNewItem() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.insertItem(ganttChartView.selectedItem.index, item);
    ganttChartView.refresh();
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
}
function increaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.increaseItemIndentation(item);
    ganttChartView.refresh();
    ganttChartView.scrollToItem(item);
}
function decreaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.decreaseItemIndentation(item);
    ganttChartView.refresh();
    ganttChartView.scrollToItem(item);
}
function deleteItem() {
    if (ganttChartView.selectedItem == null)
        return;
    ganttChartView.removeItem(ganttChartView.selectedItem);
    ganttChartView.refresh();
}
var originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
    if (isDirect && isFinal && ((!item.hasChildren && (propertyName == 'content' || propertyName == 'start' || propertyName == 'finish' || propertyName == 'completedFinish' || propertyName == 'isMilestone' || propertyName == 'assignmentsContent')) || propertyName == 'indentation'))
        refreshView();
    if (typeof originalItemPropertyChangeHandler !== 'undefined')
        originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
};
settings.displayedTimeChangeHandler = function (displayedTime) { refreshViewsDisplayedTime('GanttChart', displayedTime); };
settings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('GanttChart', gridWidth, chartWidth); };
settings.hourWidthChangeHandler = function (hourWidth) { refreshView(); };
var isWaitingToRefreshLoadChartView, isWaitingToRefreshLoadChartViewDisplayedTime, isWaitingToRefreshLoadChartViewSplitterPosition, isWaitingToRefreshGanttChartViewDisplayedTime, isWaitingToRefreshGanttChartViewSplitterPosition;
function refreshView() {
    refreshLoadChartResourceSelector();
    refreshLoadChartView();
}
function loadChart() {
    var loadChartPanel = document.querySelector('#loadChartPanel');
    loadChartPanel.style.display = 'inherit';
    var loadChartItems = ganttChartView.getLoadChartItems();
    var loadChartSettings = { selectionMode: 'None', isMouseWheelZoomEnabled: false };
    ganttChartView.copyCommonSettings(loadChartSettings);
    var loadChartView = document.querySelector('#loadChartView');
    initializeLoadChartTheme(loadChartSettings, theme);
    DlhSoft.Controls.LoadChartView.initialize(loadChartView, loadChartItems, loadChartSettings);
    loadChartSettings.displayedTimeChangeHandler = function (displayedTime) { refreshViewsDisplayedTime('LoadChart', displayedTime); };
    loadChartSettings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('LoadChart', gridWidth, chartWidth); };
    refreshLoadChartResourceSelector();
}
function closeLoadChartView() {
    var loadChartPanel = document.querySelector('#loadChartPanel');
    loadChartPanel.style.display = 'none';
}
function refreshLoadChartResourceSelector() {
    var loadChartResourceFilter = document.querySelector('#loadChartResourceFilter'), i;
    for (i = loadChartResourceFilter.childNodes.length; i-- > 2;)
        loadChartResourceFilter.removeChild(loadChartResourceFilter.childNodes[i]);
    var resources = ganttChartView.getAssignedResources();
    for (i = 0; i < resources.length; i++) {
        var resource = resources[i];
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(resource));
        loadChartResourceFilter.appendChild(option);
    }
}
function loadChartResourceFilterChanged() {
    refreshLoadChartView();
}
function refreshLoadChartView() {
    if (loadChartPanel.style.display != 'none' && !isWaitingToRefreshLoadChartView) {
        isWaitingToRefreshLoadChartView = true;
        setTimeout(function () {
            var loadChartView = document.querySelector('#loadChartView');
            var loadChartResourceFilter = document.querySelector('#loadChartResourceFilter');
            var resourceFilterValue = loadChartResourceFilter.value;
            if (resourceFilterValue == '') {
                loadChartView.loadChartItems = ganttChartView.getLoadChartItems();
                loadChartView.settings.itemHeight = 28;
                loadChartView.settings.barHeight = 20;
            }
            else {
                loadChartView.loadChartItems = ganttChartView.getLoadChartItems([resourceFilterValue]);
                loadChartView.settings.itemHeight = 112;
                loadChartView.settings.barHeight = 104;
            }
            ganttChartView.copyCommonSettings(loadChartView.settings);
            loadChartView.refresh();
            isWaitingToRefreshLoadChartView = false;
        });
    }
}
function refreshViewsDisplayedTime(sourceControlType, displayedTime) {
    if (sourceControlType != 'LoadChart' && loadChartPanel.style.display != 'none' && !isWaitingToRefreshLoadChartViewDisplayedTime) {
        isWaitingToRefreshLoadChartViewDisplayedTime = true;
        setTimeout(function () {
            var loadChartView = document.querySelector('#loadChartView');
            loadChartView.scrollToDateTime(displayedTime);
            isWaitingToRefreshLoadChartViewDisplayedTime = false;
        });
    }
    if (sourceControlType != 'GanttChart' && !isWaitingToRefreshGanttChartViewDisplayedTime) {
        isWaitingToRefreshGanttChartViewDisplayedTime = true;
        setTimeout(function () {
            ganttChartView.scrollToDateTime(displayedTime);
            isWaitingToRefreshGanttChartViewDisplayedTime = false;
        });
    }
}
function refreshViewsSplitterPosition(sourceControlType, gridWidth, chartWidth) {
    if (sourceControlType != 'LoadChart' && loadChartPanel.style.display != 'none' && !isWaitingToRefreshLoadChartViewSplitterPosition) {
        isWaitingToRefreshLoadChartViewSplitterPosition = true;
        setTimeout(function () {
            var loadChartView = document.querySelector('#loadChartView');
            loadChartView.setSplitterPosition(gridWidth, chartWidth);
            isWaitingToRefreshLoadChartViewSplitterPosition = false;
        });
    }
    if (sourceControlType != 'GanttChart' && !isWaitingToRefreshGanttChartViewSplitterPosition) {
        isWaitingToRefreshGanttChartViewSplitterPosition = true;
        setTimeout(function () {
            ganttChartView.setSplitterPosition(gridWidth, chartWidth);
            isWaitingToRefreshGanttChartViewSplitterPosition = false;
        });
    }
}
