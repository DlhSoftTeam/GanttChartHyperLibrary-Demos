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
items[9].finish.setDate(items[9].finish.getDate() + 2);
items[9].assignmentsContent = 'Resource 1';
items[10].predecessors = [{ item: items[9] }];

var settings = {
    // Auto-scheduling is initially turned on.
    areTaskDependencyConstraintsEnabled: true,
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, set baseline properties.
items[6].baselineStart = new Date(year, month, 10, 8, 0, 0);
items[6].baselineFinish = new Date(year, month, 11, 16, 0, 0);
items[7].baselineStart = new Date(year, month, 8, 8, 0, 0);
items[7].baselineFinish = new Date(year, month, 11, 16, 0, 0);
items[8].baselineStart = new Date(year, month, 12, 8, 0, 0);

// Customize columns.
var columns = GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;
columns.splice(0 + indexOffset, 0, { header: '', width: 40, cellTemplate: GanttChartView.getIndexColumnTemplate() });
columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: GanttChartView.getTotalEffortColumnTemplate(64) });
columns.splice(4 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: GanttChartView.getDurationColumnTemplate(64, 8) });
columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: GanttChartView.getCompletionColumnTemplate(64) });
columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: GanttChartView.getPredecessorsColumnTemplate(84) });
columns.push({ header: 'Cost ($)', width: 100, cellTemplate: GanttChartView.getCostColumnTemplate(84) });
columns.push({ header: 'Est. start', width: 140, cellTemplate: GanttChartView.getBaselineStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
columns.push({ header: 'Est. finish', width: 140, cellTemplate: GanttChartView.getBaselineFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM
settings.columns = columns;

// Optionally, define assignable resources.
settings.assignableResources = [
    'Resource 1', 'Resource 2', 'Resource 3',
    'Material 1', 'Material 2'];
settings.autoAppendAssignableResources = true;
// Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
settings.resourceQuantities = [{ key: 'Material 1', value: 4 }, { key: 'Material 2', value: Infinity }];
items[10].assignmentsContent = 'Material 1 [250%], Material 2';
items[11].assignmentsContent = 'Material 1, Material 2 [200%]';
items[12].assignmentsContent = 'Material 1';

items[4].executionCost = 50;
settings.defaultResourceHourCost = 10;
settings.specificResourceHourCosts = [{ key: 'Resource 1', value: 20 }, { key: 'Material 2', value: 0.5 }];

// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);

// Initialize the component.
var ganttChartView = GanttChartView.initialize(ganttChartViewElement, items, settings);

// Optionally, update the current time line periodically, e.g. every 5 minutes.
// setInterval(function () { ganttChartView.updateCurrentTime(); }, 5 * 60 * 1000);
// Define user command functions.
var copiedItem = null;

var originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
var app = new Vue({
    el: '#app',
    data: {
        items: items,
        settings: settings,
    },
    mounted: function () {
        ganttChartView = document.querySelector('#ganttChartView');
    },
    methods: {
        onItemChanged: function (args) {
            var item = args.item, propertyName = args.propertyName, isDirect = args.isDirect, isFinal = args.isFinal;
            if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
                return;
            if (typeof originalItemPropertyChangeHandler !== 'undefined')
                originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
            console.log(propertyName + ' changed for ' + item.content + '.');
        },
        addNewItem: function () {
            var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
            ganttChartView.addItem(item);
            ganttChartView.scrollToItem(item);
            ganttChartView.scrollToDateTime(new Date(year, month, 1));
        },
        insertNewItem: function () {
            if (ganttChartView.getSelectedItem() == null)
                return;
            var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
            ganttChartView.insertItem(ganttChartView.selectedItem.index, item);
            ganttChartView.selectItem(item);
            ganttChartView.scrollToItem(item);
            ganttChartView.scrollToDateTime(new Date(year, month, 1));
        },
        increaseItemIndentation: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            ganttChartView.increaseItemIndentation(item);
            ganttChartView.scrollToItem(item);
        },
        decreaseItemIndentation: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            ganttChartView.decreaseItemIndentation(item);
            ganttChartView.scrollToItem(item);
        },
        deleteItem: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            ganttChartView.removeItem(ganttChartView.selectedItem);
        },
        setCustomBarColorToItem: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            item.barStyle = 'stroke: Green; fill: LightGreen';
            item.completedBarStyle = 'stroke: Gray; fill: Gray';
            ganttChartView.refreshChartItem(item);
        },
        copyItem: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            copiedItem = item;
        },
        pasteItem: function () {
            var selectedItem = ganttChartView.getSelectedItem();
            if (copiedItem == null || selectedItem == null)
                return;
            var item = { content: copiedItem.content, start: copiedItem.start, finish: copiedItem.finish, completedFinish: copiedItem.completedFinish, isMilestone: copiedItem.isMilestone, assignmentsContent: copiedItem.assignmentsContent, isRelativeToTimezone: copiedItem.isRelativeToTimezone };
            ganttChartView.insertItem(ganttChartView.selectedItem.index + 1, item);
            ganttChartView.selectItem(item);
            ganttChartView.scrollToItem(item);
            ganttChartView.scrollToDateTime(item.start);
        },
        moveItemUp: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            ganttChartView.moveItemHierarchyUp(item);
            ganttChartView.scrollToItem(item);
        },
        moveItemDown: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            ganttChartView.moveItemHierarchyDown(item);
            ganttChartView.scrollToItem(item);
        },
        increaseTimelinePage: function () {
            ganttChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        },
        decreaseTimelinePage: function () {
            ganttChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        },
        setCustomScales: function () {
            settings.headerHeight = 21 * 3;
            settings.scales = [
                { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
                { scaleType: 'Months', headerTextFormat: 'Month', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                { scaleType: 'Days', headerTextFormat: 'Day', headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: gray' },
                { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #e31d3b; stroke-width: 0.5px' }];
            settings.updateScale = 60 * 60 * 1000; // 1 hour
            settings.hourWidth = 5;
            settings.visibleWeekStart = 1; // Monday
            settings.visibleWeekFinish = 5; // Friday
            settings.workingWeekStart = 1; // Monday
            settings.workingWeekFinish = 4; // Thursday
            settings.visibleDayStart = 10 * 60 * 60 * 1000; // 10 AM
            settings.visibleDayFinish = 20 * 60 * 60 * 1000; // 8 PM
            settings.specialNonworkingDays = [new Date(year, month, 24), new Date(year, month, 25)];
            ganttChartView.refresh();
        },
        zoomIn: function () {
            ganttChartView.setHourWidth(settings.hourWidth * 2);
        },
        toggleBaseline: function () {
            settings.isBaselineVisible = !settings.isBaselineVisible;
            ganttChartView.refresh();
        },
        highlightCriticalPath: function () {
            for (var i = 0; i < ganttChartView.items.length; i++) {
                var item = ganttChartView.items[i];
                delete item.barStyle;
                if (!item.hasChildren && ganttChartView.isItemCritical(item))
                    item.barStyle = 'stroke: #e31d3b; fill: #e31d3b';
                ganttChartView.refreshChartItem(item);
            }
        },
        splitRemainingWork: function () {
            var item = ganttChartView.getSelectedItem();
            if (item == null)
                return;
            var remainingWorkItem = ganttChartView.splitRemainingWork(item);
            if (remainingWorkItem == null)
                return;
        },
        toggleDependencyConstraints: function () {
            settings.areTaskDependencyConstraintsEnabled = !settings.areTaskDependencyConstraintsEnabled;
            ganttChartView.refresh();
        },
        levelResources: function () {
            // Level the assigned resources for all tasks, including the already started ones, considering the current time displayed in the chart.
            ganttChartView.levelResources(true, ganttChartView.settings.currentTime);
            // Alternatively, optimize work to obtain the minimum project finish date and time assuming unlimited resource availability:
            // ganttChartView.optimizeWork(false, true, ganttChartView.settings.currentTime);
        },
        print: function() {
            // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
            ganttChartView.print({ title: 'Gantt Chart (printable)', isGridVisible: true, columnIndexes: [1], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        }
    }
});