/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
// Prepare data items.
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
// Setup start and finish columns to support summary item edits.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns[1].cellTemplate = function(item) { // Start
    return DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase(document, 120,
        function() { return item.start; }, // get
        function (value) { // set
            if (!item.hasChildren) {
                ganttChartView.setItemStart(item, value);
                ganttChartView.refreshItemNeighbourhood(item);
            } else {
                item.start = value;
                rescheduleChildren(item, value);
            }
        }, 
        undefined, undefined, 
        function() { return item.hasChildren }); // bold
}
columns[2].cellTemplate = function(item) { // Finish
    return DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase(document, 120,
        function() { return item.finish; }, // get
        function(value) { // set
            if (!item.hasChildren) {
                ganttChartView.setItemFinish(item, value);
                ganttChartView.refreshItemNeighbourhood(item);
            } else {
                item.finish = value;
                rescheduleChildren(item, value);
            }
        },
        undefined,
        function() { return !item.isMilestone; }, // enabled 
        function() { return item.hasChildren }); // bold
}
settings.columns = columns;
// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);
// Setup summary template to handle updates (with initializeTaskDraggingThumbs).
var originalSummaryTaskTemplate = settings.summaryTaskTemplate ? settings.summaryTaskTemplate : DlhSoft.Controls.GanttChartView.getDefaultSummaryTaskTemplate(items, ganttChartView, settings);
settings.summaryTaskTemplate = function (item) {
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg';
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var barMargin = 4;
    var barHeight = settings.itemHeight - 2 * barMargin;
    var document = ganttChartView.ownerDocument;
    var group = originalSummaryTaskTemplate(item);
    var itemLeft = ganttChartView.getChartPosition(item.start);
    var itemRight = ganttChartView.getChartPosition(item.finish);
    if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
        var thumb = document.createElementNS(svgns, 'rect');
        thumb.setAttribute('x', itemLeft);
        thumb.setAttribute('y', barMargin);
        thumb.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
        thumb.setAttribute('height', barHeight);
        thumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
        if (!settings.isTaskStartReadOnly)
            group.appendChild(thumb);
        var startThumb = document.createElementNS(svgns, 'rect');
        startThumb.setAttribute('x', itemLeft - 4);
        startThumb.setAttribute('y', barMargin);
        startThumb.setAttribute('width', 4);
        startThumb.setAttribute('height', barHeight);
        startThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: w-resize');
        if (settings.isDraggingTaskStartEndsEnabled && !settings.isTaskStartReadOnly && settings.interaction != 'TouchEnabled')
            group.appendChild(startThumb);
        var finishThumb = document.createElementNS(svgns, 'rect');
        finishThumb.setAttribute('x', itemRight - 4);
        finishThumb.setAttribute('y', barMargin);
        finishThumb.setAttribute('width', 8);
        finishThumb.setAttribute('height', barHeight);
        finishThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
        if (!settings.isTaskEffortReadOnly && settings.interaction != 'TouchEnabled')
            group.appendChild(finishThumb);
        ganttChartView.initializeTaskDraggingThumbs(thumb, startThumb, finishThumb, undefined, item, itemLeft, itemRight, undefined);
    }
    return group;
};
// Summary update handling.
settings.itemPropertyChangeHandler = function(item, propertyName, isDirect) {
    if (!ganttChartView || !item.hasChildren || (propertyName != 'start' && propertyName != 'finish') || !isDirect)
        return;
    if (updatedSummaryItem && item != updatedSummaryItem) {
        processSummaryUpdates();
    }
    updatedSummaryItem = item;
    if (processSummaryUpdatesTimer)
        clearTimeout(processSummaryUpdatesTimer);
    processSummaryUpdatesTimer = setTimeout(processSummaryUpdates);
}
var updatedSummaryItem = null, processSummaryUpdatesTimer;
function processSummaryUpdates() {
    rescheduleChildren(updatedSummaryItem);
    updatedSummaryItem = null;
}
// Summary update algorithm.
function rescheduleChildren(summaryItem) {
    var items = getLeafItems(summaryItem), start = summaryItem.start, finish = summaryItem.finish;
    var minFinish = ganttChartView.getFinish(start, 60 * 1000);
    if (finish < minFinish)
       finish = minFinish;
    var duration = ganttChartView.getEffort(start, finish);
    var originalStart = null, originalFinish = null;
    items.forEach(function(item) {
        if (!originalStart || item.start < originalStart)
            originalStart = item.start;
        if (!originalFinish || item.finish > originalFinish)
            originalFinish = item.finish;
    });
    var originalDuration = ganttChartView.getEffort(originalStart, originalFinish);
    var increase = duration / originalDuration;
    items.forEach(function(item) {
        var originalItemStartPosition = ganttChartView.getEffort(originalStart, item.start);
        var originalItemFinishPosition = ganttChartView.getEffort(item.finish, originalFinish);
        var originalItemCompletion = ganttChartView.getItemCompletion(item);
        var updatedItemStart = ganttChartView.getFinish(start, originalItemStartPosition * increase);
        var updatedItemFinish = ganttChartView.getStart(originalItemFinishPosition * increase, finish);
        ganttChartView.setItemStart(item, updatedItemStart);
        ganttChartView.setItemFinish(item, updatedItemFinish);
        ganttChartView.setItemCompletion(item, originalItemCompletion);
        ganttChartView.refreshItemNeighbourhood(item);
    });
}
function getLeafItems(summaryItem) {
    var leafItems = [];
    summaryItem.children.forEach(function(item) {
        if (!item.hasChildren) { leafItems.push(item); }
        else { getLeafItems(item).forEach(function(child) { leafItems.push(child); }); }
    });
    return leafItems;
}
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);