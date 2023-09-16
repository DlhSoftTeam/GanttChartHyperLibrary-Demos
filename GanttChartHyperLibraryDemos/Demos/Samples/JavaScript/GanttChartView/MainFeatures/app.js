// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Retrieve and store the control element for reference purposes.
var ganttChartView = document.querySelector('#ganttChartView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
    { content: 'Planning', label: 'Planning', isExpanded: false },
    { content: 'Analysis', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
    { content: 'Requirements', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria  [50%], Tyson Lamberson' },
    { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Arhitecture', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush [50%], Meeting room' },
    { content: 'Design', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
    { content: 'Development', label: 'Development', isExpanded: true },
    { content: 'Start development', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), isMilestone: true, assignmentsContent: 'Steven Rush' },
    { content: 'Date-times', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
    { content: 'Schedules', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush [50%]' },
    { content: 'Automation testing functions', label: 'Very important!', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
    { content: 'Chart', label: 'Chart', indentation: 1 },
    { content: 'Bars', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 7, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
    { content: 'Summary bars', indentation: 2, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
    { content: 'Review', indentation: 2, start: new Date(year, month, 9, 16, 0, 0), isMilestone: true },
    { content: 'Links', indentation: 2, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
    { content: 'Diagram functions', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
    { content: 'Quality assurance', label: 'Very important!', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0), hasMilestoneAtFinish: true, assignmentsContent: 'Denis Kaelin, Printer' },
    { content: 'Project delivery', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Meeting room' },
    { content: 'Maintenance', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) },
    { content: 'Marketing', label: 'Marketing', start: new Date(year, month, 10, 12, 0, 0), finish: new Date(year, month, 15, 12, 0, 0) },
    { content: 'Preparations', indentation: 1, start: new Date(year, month, 10, 8, 0, 0), isMilestone: true, assignmentsContent: 'Joanna Mcamis, Alicia Rock' },
    { content: 'Colors', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Joanna Mcamis [25%]' },
    { content: 'Logo', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Alicia Rock [25%]' },
    { content: 'Samples app', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 16, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Screenshots', indentation: 1, start: new Date(year, month, 12, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), assignmentsContent: 'Joanna Mcamis' },
    { content: 'Videos', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0), assignmentsContent: 'Alicia Rock [50%]' }
];
items[6].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[4].predecessors = [{ item: items[2], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
items[9].assignmentsContent = 'Clarissa Candelaria';
items[10].predecessors = [{ item: items[9] }];

// Prepare control settings.
var settings = {
    // Optionally, hide data grid or set grid and chart widths, set read only settings, and/or disable virtualization.
    // isGridVisible: false,
    // gridWidth: '30%',
    // chartWidth: '70%',
    // isGridReadOnly: true,
    // isChartReadOnly: true,
    // isVirtualizing: false,

    // Optionally, preseve task effort when start value changes in the grid.
    // isTaskEffortPreservedWhenStartChangesInGrid: true,

    // Optionally, set the scrollable timeline to present.
    // timelineStart: new Date(year, month, 1),
    // timelineFinish: new Date(year + 2, month, 1),

    // Optionally, set application target, interaction mode, and theme and/or custom styles.
    // target: 'Phone', // Supported values: Standard, Phone.
    // interaction: 'TouchEnabled', // Supported values: Standard, TouchEnabled.
    // theme: 'Aero', // Supported values: Modern, ModernBordered, Aero.
    // border: 'Gray',
    // gridLines: 'LightGray',
    // standardBarStyle: 'stroke: Green; fill: LightGreen',
    // standardCompletedBarStyle: 'stroke: DarkGreen; fill: DarkGreen',
    // dependencyLineStyle: 'stroke: Green; fill: none; marker-end: url(#ArrowMarker)',

    // Optionally, display alternative row background.
    // alternativeItemStyle: 'background-color: #f9f9f9', alternativeChartItemStyle: 'fill: #f9f9f9',

    // Optionally, set item template used when displaying task bar tool tips in the chart area.
    // itemTemplate: function (item) {
    //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    //     var toolTipContent = item.content + '\n' + 'Start: ' + item.start.toLocaleString();
    //     if (!item.isMilestone)
    //         toolTipContent += '\n' + 'Finish: ' + item.finish.toLocaleString();
    //     toolTip.appendChild(document.createTextNode(toolTipContent));
    //     return toolTip;
    // },

    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, set labels visibility.
settings.areStandardTaskLabelsVisible = true;
settings.areSummaryTaskLabelsVisible = true;
settings.areMilestoneTaskLabelsVisible = true;

// Also optionally, customize label styles.
// settings.standardLabelStyle = 'color: #1C0825;';
// settings.milestoneLabelStyle = 'color: #E48F56;';

// Optionally, set baseline properties.
items[7].baselineStart = new Date(year, month, 3, 8, 0, 0);
items[8].baselineStart = new Date(year, month, 2, 8, 0, 0);
items[8].baselineFinish = new Date(year, month, 5, 16, 0, 0);
items[9].baselineStart = new Date(year, month, 2, 8, 0, 0);
items[9].baselineFinish = new Date(year, month, 6, 16, 0, 0);

// Optionally, define and assign default and specific task item schedules (working week and day intervals, and nonworking days).
// settings.schedule = {
//     workingWeekStart: 1, workingWeekFinish: 5, // Monday - Friday
//     workingDayStart: 8 * 60 * 60 * 1000, workingDayFinish: 16 * 60 * 60 * 1000 // 8 AM - 4 PM
//     // , specialNonworkingDays: [new Date(year, month, 19), new Date(year, month, 21)] // excluded
// };
// var specialSchedule = {
//     workingWeekStart: 0, workingWeekFinish: 3, // Sunday - Wednesday
//     workingDayStart: 9 * 60 * 60 * 1000, workingDayFinish: 19 * 60 * 60 * 1000 // 9 AM - 7 PM, exceeding visible 4 PM
//     // , specialNonworkingDays: [new Date(year, month, 18), new Date(year, month, 21), new Date(year, month, 22)] // partial replacement for excluded dates
// };
// items[9].schedule = specialSchedule;
// items[10].schedule = specialSchedule;
// settings.isIndividualItemNonworkingTimeHighlighted = true;

// Optionally, configure selection.
// settings.selectionMode = 'Extended'; // Supported values: None, Focus (default), Single, Extended, ExtendedFocus.
// settings.selectedItemStyle = 'background: LightCyan';

// Optionally, initialize item selection.
// items[6].isSelected = true;

// Prepare the columns collection.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;

// Optionally, configure existing columns.
// columns[0 + indexOffset].header = 'Work items';
// columns[0 + indexOffset].width = 240;

// Optionally, add supplemental columns.
columns.splice(0 + indexOffset, 0, { header: '', width: 40, cellTemplate: DlhSoft.Controls.GanttChartView.getIndexColumnTemplate() });
columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getTotalEffortColumnTemplate(64) });
columns.splice(4 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getDurationColumnTemplate(64, 8) });
columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getCompletionColumnTemplate(64) });
columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getPredecessorsColumnTemplate(84) });
columns.push({ header: 'Cost ($)', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getCostColumnTemplate(84) });
columns.push({ header: 'Est. start', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getBaselineStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
columns.push({ header: 'Est. finish', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getBaselineFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM

// Optionally, set custom item properties and/or append custom columns bound to their values.
// items[7].description = 'Custom description';
// columns.push({ header: 'Description', width: 200, cellTemplate: function (item) { return item.ganttChartView.ownerDocument.createTextNode(item.description); } });
// columns[10 + indexOffset].cellTemplate = DlhSoft.Controls.GanttChartView.getAssignmentSelectorColumnTemplate(184, function (item) { return ['Clarissa Candelaria', 'Tyson Lamberson'] });

// Optionally, use column template base functions inside cellTemplate functions to use built-in user interface for managing custom field values. Supported column template base functions: textColumnTemplateBase, textInputColumnTemplateBase, optionSelectColumnTemplateBase, numberInputColumnTemplateBase, percentInputColumnTemplateBase, timeSpanInputColumnTemplateBase, dateTimeInputColumnTemplateBase, datePickerInputColumnTemplateBase, dateTimePickerInputColumnTemplateBase, multiSelectorComboBoxInputColumnTemplateBase.
// items[7].targetDate = new Date(year, month, 28, 12, 0, 0);
// columns.push({ header: 'Target date', width: 140, cellTemplate: function (item) {
//     return DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase(item.ganttChartView.ownerDocument, 140,
//         function () { return DlhSoft.Controls.GanttChartView.getInputDate(item.targetDate); }, 
//         function (value) { item.targetDate = DlhSoft.Controls.GanttChartView.getOutputDate(value); }); } });

// Apply the customized columns collection.
settings.columns = columns;

// Optionally, define assignable resources.
settings.assignableResources = ['Clarissa Candelaria', 'Tyson Lamberson', 'Steven Rush',
                                'Joanna Mcamis', 'Denis Kaelin', 'Alicia Rock',
                                'Meeting room', 'Printer'];
settings.autoAppendAssignableResources = true;

// Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
settings.resourceQuantities = [{ key: 'Meeting room', value: 4 }, { key: 'Printer', value: Infinity }];
items[10].assignmentsContent = 'Meeting room [250%], Printer';
items[11].assignmentsContent = 'Meeting room, Printer [200%]';
items[12].assignmentsContent = 'Meeting room';

// Optionally, define task and resource costs.
// settings.taskInitiationCost = 5;
items[4].executionCost = 50;
// settings.defaultResourceUsageCost = 1;
// settings.specificResourceUsageCosts = [{ key: 'Clarissa Candelaria', value: 2 }, { key: 'Meeting room', value: 7}];
settings.defaultResourceHourCost = 10;
settings.specificResourceHourCosts = [{ key: 'Denis Kaelin', value: 20 }, { key: 'Printer', value: 0.5 }];

// Optionally, set up resource images.
settings.areResourceImagesVisibleAsAssignments = true;
settings.resourceImageUrls = [
    { key: 'Steven Rush', value: 'Images/Steven.png' },
    { key: 'Clarissa Candelaria', value: 'Images/Clarissa.png' },
    { key: 'Tyson Lamberson', value: 'Images/Tyson.png' },
    { key: 'Joanna Mcamis', value: 'Images/Joanna.png' },
    { key: 'Denis Kaelin', value: 'Images/Denis.png' },
    { key: 'Alicia Rock', value: 'Images/Alicia.png' },
    { key: 'Meeting room', value: 'Images/MeetingRoom.png' },
    { key: 'Printer', value: 'Images/Printer.png' }];

// Optionally, display multiple item parts on a single chart line.
// items[13].parts = [ { content: 'Task 8 (Part 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
//                     { content: 'Task 8 (Part 2)', start: new Date(year, month, 8, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0), assignmentsContent: 'Tyson Lamberson' } ];

// Optionally, customize the date and time formatting and parsing.
// settings.dateFormatter = function (date) { return date.toDateString(); };
// settings.dateTimeFormatter = function (dateTime) { return dateTime.toString(); };
// settings.dateTimeParser = function (text) { return new Date(text); };

// Optionally, handle item property change notifications.
// settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
//     if (isDirect && isFinal && propertyName != 'isSelected' && propertyName != 'isExpanded')
//         alert(item.content + '.' + propertyName + ' has changed.');
// }

// Optionally, define custom bar templates for standard, summary, and/or milestone tasks.
// settings.standardTaskTemplate = function (item) {
//     var ganttChartView = item.ganttChartView;
//     var document = ganttChartView.ownerDocument;
//     var svgns = 'http://www.w3.org/2000/svg';
//     var containerGroup = document.createElementNS(svgns, 'g'); 
//     var rect = document.createElementNS(svgns, 'rect');
//     var itemLeft = ganttChartView.getChartPosition(item.start, settings);
//     var itemRight = ganttChartView.getChartPosition(item.finish, settings);
//     rect.setAttribute('x', itemLeft - 1);
//     rect.setAttribute('y', settings.barMargin - 1);
//     rect.setAttribute('width', itemRight - itemLeft + 1);
//     rect.setAttribute('height', settings.barHeight + 2);
//     rect.setAttribute('rx', 4);
//     rect.setAttribute('style', 'stroke: DarkGreen; fill: Green');
//     containerGroup.appendChild(rect);
//     var thumb = document.createElementNS(svgns, 'rect');
//     thumb.setAttribute('x', itemLeft); thumb.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
//     thumb.setAttribute('y', ganttChartView.settings.barMargin); thumb.setAttribute('height', ganttChartView.settings.barHeight);
//     thumb.setAttribute('style', 'fill: Transparent; cursor: move');
//     DlhSoft.Controls.GanttChartView.initializeTaskDraggingThumbs(thumb, null, null, null, item, itemLeft, itemRight, null);
//     containerGroup.appendChild(thumb);
//     return containerGroup;
// };

// Alternatively, use original template when needed.
// var originalStandardTaskTemplate = DlhSoft.Controls.GanttChartView.getDefaultStandardTaskTemplate(items, ganttChartView, settings);
// settings.standardTaskTemplate = function (item) {
//     var svgGroup = originalStandardTaskTemplate(item);
//     if (item.content.indexOf('Task 2.') == 0) {
//         var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//         var itemLeft = ganttChartView.getChartPosition(item.start, settings);
//         var itemRight = ganttChartView.getChartPosition(item.finish, settings);
//         rect.setAttribute('x', itemLeft - 1);
//         rect.setAttribute('y', settings.barMargin - 1);
//         rect.setAttribute('width', itemRight - itemLeft + 1);
//         rect.setAttribute('height', settings.barHeight + 2);
//         rect.setAttribute('style', 'stroke: Red; fill: Transparent');
//         svgGroup.insertBefore(rect, svgGroup.childNodes[0]);
//     }
//     return svgGroup;
// }

// Optionally, apply visibility filter to display only specific items in the view.
// settings.visibilityFilter = function (item) { return item.content.indexOf('Task 2') >= 0; }

// Optionally, set hasFixedEffort to true to automatically update item assignment allocation units rather than effort upon duration changes.
// items[4].hasFixedEffort = true;

// Optionally, set up auto-scheduling behavior for dependent tasks based on predecessor information, supplementary disallowing circular dependencies, either for all tasks or excluding started items and/or milestones.
settings.areTaskDependencyConstraintsEnabled = true;
// settings.areDependencyConstraintsAppliedOnStartedTasks = false;
// settings.areDependencyConstraintsAppliedOnMilestones = false;

// Optionally, disable auto-scheduling for specific items (turning on manual scheduling back for them.)
// items[7].areDependencyConstraintsEnabled = false;

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

// Optionally, update the current time line periodically, e.g. every 5 minutes.
// setInterval(function () { ganttChartView.updateCurrentTime(); }, 5 * 60 * 1000);

// Define user command functions.
function addNewItem() {
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.addItem(item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
    ganttChartView.scrollToDateTime(new Date(year, month, 1));
    refreshOtherViews();
}
function insertNewItem() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.insertItem(ganttChartView.selectedItem.index, item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
    ganttChartView.scrollToDateTime(new Date(year, month, 1));
    refreshOtherViews();
}
function increaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.increaseItemIndentation(item);
    ganttChartView.scrollToItem(item);
    refreshOtherViews();
}
function decreaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.decreaseItemIndentation(item);
    ganttChartView.scrollToItem(item);
    refreshOtherViews();
}
function deleteItem() {
    if (ganttChartView.selectedItem == null)
        return;
    ganttChartView.removeItem(ganttChartView.selectedItem, true); // Also remove successors' predecessor information.
    refreshOtherViews();
}
function setCustomBarColorToItem() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = ganttChartView.selectedItem;
    item.barStyle = 'stroke: Green; fill: LightGreen';
    item.completedBarStyle = 'stroke: Gray; fill: Gray';
    ganttChartView.refreshChartItem(item);
    refreshOtherViews();
}
function copyItem() {
    if (ganttChartView.selectedItem == null)
        return;
    copiedItem = ganttChartView.selectedItem;
}
var copiedItem = null;
function pasteItem() {
    if (copiedItem == null || ganttChartView.selectedItem == null)
        return;
    var item = { content: copiedItem.content, start: copiedItem.start, finish: copiedItem.finish, completedFinish: copiedItem.completedFinish, isMilestone: copiedItem.isMilestone, assignmentsContent: copiedItem.assignmentsContent, isRelativeToTimezone: copiedItem.isRelativeToTimezone };
    ganttChartView.insertItem(ganttChartView.selectedItem.index + 1, item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
    ganttChartView.scrollToDateTime(item.start);
    refreshOtherViews();
}
function moveItemUp() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = ganttChartView.selectedItem;
    ganttChartView.moveItemHierarchyUp(item);
    ganttChartView.scrollToItem(item);
    refreshOtherViews();
}
function moveItemDown() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = ganttChartView.selectedItem;
    ganttChartView.moveItemHierarchyDown(item);
    ganttChartView.scrollToItem(item);
    refreshOtherViews();
}
function increaseTimelinePage() {
    ganttChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    refreshOtherViews();
}
function decreaseTimelinePage() {
    ganttChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    refreshOtherViews();
}
function setCustomScales() {
    var settings = ganttChartView.settings;
    settings.headerHeight = 21 * 3;
    settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
        { scaleType: 'Months', headerTextFormat: 'Month', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
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
    refreshOtherViews();
}
function zoomIn() {
    var settings = ganttChartView.settings;
    ganttChartView.setHourWidth(settings.hourWidth * 2);
    refreshOtherViews();
}
function toggleBaseline() {
    var settings = ganttChartView.settings;
    settings.isBaselineVisible = !settings.isBaselineVisible;
    toggleBaselineCommand.className = settings.isBaselineVisible ? 'ribbonCommand toggle pressed' : 'ribbonCommand toggle';
    ganttChartView.refresh();
}
function highlightCriticalPath() {
    highlightCriticalPathCommand.className = 'ribbonCommand toggle pressed';
    for (var i = 0; i < ganttChartView.items.length; i++) {
        var item = ganttChartView.items[i];
        delete item.barStyle;
        if (!item.hasChildren && ganttChartView.isItemCritical(item))
            item.barStyle = 'stroke: #e31d3b; fill: #e31d3b';
        ganttChartView.refreshChartItem(item);
    }
}
function splitRemainingWork() {
    if (ganttChartView.selectedItem == null)
        return;
    var remainingWorkItem = ganttChartView.splitRemainingWork(ganttChartView.selectedItem, ' (rem. work)', ' (compl. work)');
    if (remainingWorkItem == null)
        return;
    ganttChartView.scrollToItem(remainingWorkItem);
    refreshOtherViews();
}
function toggleDependencyConstraints() {
    var settings = ganttChartView.settings;
    settings.areTaskDependencyConstraintsEnabled = !settings.areTaskDependencyConstraintsEnabled;
    toggleDependencyConstraintsCommand.className = settings.areTaskDependencyConstraintsEnabled ? 'ribbonCommand toggle pressed' : 'ribbonCommand toggle';
    ganttChartView.refresh();
    refreshOtherViews();
}
function levelResources() {
    // Level the assigned resources for all tasks, including the already started ones, considering the current time displayed in the chart.
    ganttChartView.levelResources(true, ganttChartView.settings.currentTime);
    // Alternatively, optimize work to obtain the minimum project finish date and time assuming unlimited resource availability:
    // ganttChartView.optimizeWork(false, true, ganttChartView.settings.currentTime);
}
function scheduleChart() {
    var scheduleChartPanel = document.querySelector('#scheduleChartPanel');
    scheduleChartPanel.style.display = 'inherit';
    var scheduleChartItems = ganttChartView.getScheduleChartItems();
    var scheduleChartSettings = { isReadOnly: true, selectionMode: 'None', isMouseWheelZoomEnabled: false };
    ganttChartView.copyCommonSettings(scheduleChartSettings);
    var scheduleChartView = document.querySelector('#scheduleChartView');
    initializeGanttChartTheme(scheduleChartSettings, theme);
    DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartView, scheduleChartItems, scheduleChartSettings);
    scheduleChartSettings.displayedTimeChangeHandler = function (displayedTime) { refreshViewsDisplayedTime('ScheduleChart', displayedTime); }
    scheduleChartSettings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('ScheduleChart', gridWidth, chartWidth); }
}
function closeScheduleChartView() {
    var scheduleChartPanel = document.querySelector('#scheduleChartPanel');
    scheduleChartPanel.style.display = 'none';
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
    loadChartSettings.displayedTimeChangeHandler = function (displayedTime) { refreshViewsDisplayedTime('LoadChart', displayedTime); }
    loadChartSettings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('LoadChart', gridWidth, chartWidth); }
    refreshLoadChartResourceSelector();
}
function closeLoadChartView() {
    var loadChartPanel = document.querySelector('#loadChartPanel');
    loadChartPanel.style.display = 'none';
}
function pertChart() {
    var pertChartPanel = document.querySelector('#pertChartPanel');
    pertChartPanel.style.display = 'inherit';
    // Optionally, pass 0 as method parameter to generate a lighter diagram for root tasks only.
    var pertChartItems = ganttChartView.getPertChartItems();
    var pertChartSettings = { chartMargin: 2, snapRearrangedItemsToGuidelines: false };
    var pertChartView = document.querySelector('#pertChartView');
    initializePertChartTheme(pertChartSettings, theme);
    DlhSoft.Controls.Pert.PertChartView.initialize(pertChartView, pertChartItems, pertChartSettings);
    var criticalItems = pertChartView.getCriticalItems();
    for (var i = 0; i < criticalItems.length; i++) {
        var item = criticalItems[i];
        item.shapeStyle = 'stroke: #e31d3b; fill: White';
        pertChartView.refreshItem(item);
    }
    // Optionally, reposition end nodes in order to get better visualization.
    // pertChartView.repositionEnds();
}
function closePertChartView() {
    var pertChartPanel = document.querySelector('#pertChartPanel');
    pertChartPanel.style.display = 'none';
}
function networkDiagram() {
    var networkDiagramPanel = document.querySelector('#networkDiagramPanel');
    networkDiagramPanel.style.display = 'inherit';
    // Optionally, pass 0 as method parameter to generate a lighter diagram for root tasks only.
    var networkDiagramItems = ganttChartView.getNetworkDiagramItems();
    var networkDiagramSettings = { diagramMargin: 2, snapRearrangedItemsToGuidelines: false };
    var networkDiagramView = document.querySelector('#networkDiagramView');
    initializePertChartTheme(networkDiagramSettings, theme);
    DlhSoft.Controls.Pert.NetworkDiagramView.initialize(networkDiagramView, networkDiagramItems, networkDiagramSettings);
    var criticalItems = networkDiagramView.getCriticalItems();
    for (var i = 0; i < criticalItems.length; i++) {
        var item = criticalItems[i];
        item.shapeStyle = 'stroke: #e31d3b; fill: White';
        networkDiagramView.refreshItem(item);
    }
    // Optionally, reposition end nodes in order to get better visualization.
    // networkDiagramView.repositionEnds();
}
function closeNetworkDiagramView() {
    var networkDiagramPanel = document.querySelector('#networkDiagramPanel');
    networkDiagramPanel.style.display = 'none';
}
function projectStatistics() {
    var startOutput = ganttChartView.getOutputDate(ganttChartView.getProjectStart()).toDateString();
    var finishOutput = ganttChartView.getOutputDate(ganttChartView.getProjectFinish()).toDateString();
    var hourDuration = 60 * 60 * 1000;
    var rounding = 100;
    var effortOutput = Math.round(ganttChartView.getProjectTotalEffort() / hourDuration * rounding) / rounding;
    var completionOutput = Math.round(ganttChartView.getProjectCompletion() * 100 * rounding) / rounding;
    var costOutput = Math.round(ganttChartView.getProjectCost() * rounding) / rounding;
    alert('Project statistics:\nStart: ' + startOutput + '\nFinish: ' + finishOutput + '\nEffort: ' + effortOutput + 'h\nCompl.: ' + completionOutput + '%\nCost: $' + costOutput);
}
function loadProjectXml() {
    closeSaveProjectXml();
    var loadProjectXmlPanel = document.querySelector('#loadProjectXmlPanel');
    loadProjectXmlPanel.style.display = 'inherit';
    var loadProjectXmlInput = document.querySelector('#loadProjectXmlInput');
    loadProjectXmlInput.focus();
    loadProjectXmlInput.select();
}
function loadProjectXmlContent() {
    var projectSerializer = DlhSoft.Controls.GanttChartView.ProjectSerializer.initialize(ganttChartView);
    var loadProjectXmlInput = document.querySelector('#loadProjectXmlInput');
    projectSerializer.loadXml(loadProjectXmlInput.value);
    closeLoadProjectXml();
}
function closeLoadProjectXml() {
    var loadProjectXmlPanel = document.querySelector('#loadProjectXmlPanel');
    loadProjectXmlPanel.style.display = 'none';
}
function saveProjectXml() {
    closeLoadProjectXml();
    var saveProjectXmlPanel = document.querySelector('#saveProjectXmlPanel');
    saveProjectXmlPanel.style.display = 'inherit';
    var projectXmlSerializerSettings = { compact: true, spaceSeparated: true };
    var projectSerializer = DlhSoft.Controls.GanttChartView.ProjectSerializer.initialize(ganttChartView, projectXmlSerializerSettings);
    var saveProjectXmlOutput = document.querySelector('#saveProjectXmlOutput');
    saveProjectXmlOutput.value = projectSerializer.getXml();
    saveProjectXmlOutput.focus();
    saveProjectXmlOutput.select();
}
function closeSaveProjectXml() {
    var saveProjectXmlPanel = document.querySelector('#saveProjectXmlPanel');
    saveProjectXmlPanel.style.display = 'none';
}
function print() {
    // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
    // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
    ganttChartView.print({ title: 'Gantt Chart (printable)', isGridVisible: true, columnIndexes: [1], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
}

// Optionally, synchronize other displayed views upon standard Gantt Chart item or displayed time changes on the client side.
var originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
    if (isDirect && isFinal && ((!item.hasChildren && (propertyName == 'content' || propertyName == 'start' || propertyName == 'finish' || propertyName == 'completedFinish' || propertyName == 'isMilestone' || propertyName == 'assignmentsContent')) || propertyName == 'indentation'))
        refreshOtherViews();
    if (typeof originalItemPropertyChangeHandler !== 'undefined')
        originalItemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
}
settings.displayedTimeChangeHandler = function (displayedTime) { refreshViewsDisplayedTime('GanttChart', displayedTime); };
settings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('GanttChart', gridWidth, chartWidth); };
settings.hourWidthChangeHandler = function (hourWidth) { refreshOtherViews(); };
var isWaitingToRefreshScheduleChartView, isWaitingToRefreshScheduleChartViewDisplayedTime, isWaitingToRefreshScheduleChartViewSplitterPosition,
    isWaitingToRefreshLoadChartView, isWaitingToRefreshLoadChartViewDisplayedTime, isWaitingToRefreshLoadChartViewSplitterPosition,
    isWaitingToRefreshGanttChartViewDisplayedTime, isWaitingToRefreshGanttChartViewSplitterPosition;
function refreshOtherViews() {
    refreshScheduleChartView();
    refreshLoadChartResourceSelector();
    refreshLoadChartView();
    closePertChartView();
    closeNetworkDiagramView();
    closeLoadProjectXml();
    closeSaveProjectXml();
}
function refreshScheduleChartView() {
    if (scheduleChartPanel.style.display != 'none' && !isWaitingToRefreshScheduleChartView) {
        isWaitingToRefreshScheduleChartView = true;
        setTimeout(function () {
            isWaitingToRefreshScheduleChartView = false;
            var scheduleChartView = document.querySelector('#scheduleChartView');
            scheduleChartView.scheduleChartItems = ganttChartView.getScheduleChartItems();
            ganttChartView.copyCommonSettings(scheduleChartView.settings);
            scheduleChartView.refresh();
        });
    }
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
    if (sourceControlType != 'ScheduleChart' && scheduleChartPanel.style.display != 'none' && !isWaitingToRefreshScheduleChartViewDisplayedTime) {
        isWaitingToRefreshScheduleChartViewDisplayedTime = true;
        setTimeout(function () {
            var scheduleChartView = document.querySelector('#scheduleChartView');
            scheduleChartView.scrollToDateTime(displayedTime);
            isWaitingToRefreshScheduleChartViewDisplayedTime = false;
        });
    }
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
    if (sourceControlType != 'ScheduleChart' && scheduleChartPanel.style.display != 'none' && !isWaitingToRefreshScheduleChartViewSplitterPosition) {
        isWaitingToRefreshScheduleChartViewSplitterPosition = true;
        setTimeout(function () {
            var scheduleChartView = document.querySelector('#scheduleChartView');
            scheduleChartView.setSplitterPosition(gridWidth, chartWidth);
            isWaitingToRefreshScheduleChartViewSplitterPosition = false;
        });
    }
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

// Support for editing items.
var GanttChartView = DlhSoft.Controls.GanttChartView;
var DateTimePicker = DlhSoft.Controls.DateTimePicker;
var MultiSelectorComboBox = DlhSoft.Controls.MultiSelectorComboBox;
var editor = document.getElementById('editor');
var editedItem;
function editItem() {
    var item = ganttChartView.getSelectedItem();
    if (item == null)
        return;
    editedItem = item;
    var contentInput = document.getElementById('contentEditor');
    contentInput.value = item.content;
    var startInput = document.getElementById('startEditor');
    DateTimePicker.initialize(startInput, GanttChartView.getOutputDate(item.start), { defaultTimeOfDay: 8 * 60 * 60 * 1000, valueChangeHandler: onDateEditorChanged });
    startInput.removeAttribute('disabled');
    if (item.hasChildren)
        startInput.setAttribute('disabled', 'disabled');
    var finishInput = document.getElementById('finishEditor');
    finishInput.removeAttribute('disabled');
    if (item.hasChildren || item.isMilestone)
        finishInput.setAttribute('disabled', 'disabled');
    DateTimePicker.initialize(finishInput, !item.isMilestone ? GanttChartView.getOutputDate(item.finish) : null, { defaultTimeOfDay: 16 * 60 * 60 * 1000, valueChangeHandler: onDateEditorChanged });
    var effortInput = document.getElementById('effortEditor');
    effortInput.removeAttribute('disabled');
    if (item.hasChildren || item.isMilestone)
        effortInput.setAttribute('disabled', 'disabled');
    effortInput.value = (ganttChartView.getItemTotalEffort(item) / (60 * 60 * 1000)).toString();
    var durationInput = document.getElementById('durationEditor');
    durationInput.removeAttribute('disabled');
    if (item.hasChildren || item.isMilestone)
        durationInput.setAttribute('disabled', 'disabled');
    durationInput.value = (ganttChartView.getItemDuration(item) / (8 * 60 * 60 * 1000)).toString();
    var isMilestoneInput = document.getElementById('isMilestoneEditor');
    isMilestoneInput.removeAttribute('disabled');
    if (item.hasChildren)
        isMilestoneInput.setAttribute('disabled', 'disabled');
    isMilestoneInput.checked = item.isMilestone;
    var completionInput = document.getElementById('completionEditor');
    completionInput.removeAttribute('disabled');
    if (item.hasChildren || item.isMilestone)
        completionInput.setAttribute('disabled', 'disabled');
    completionInput.value = !item.isMilestone && item.finish > item.start ? Math.round(ganttChartView.getItemCompletion(item) * 100).toString() : '';
    var predecessorsInput = document.getElementById('predecessorsEditor');
    predecessorsInput.value = ganttChartView.getItemPredecessorsString(item);
    var assignmentsInput = document.getElementById('assignmentsEditor');
    MultiSelectorComboBox.initialize(assignmentsInput, ganttChartView.getAssignedResources(), item.assignmentsContent);
    var oldBaselineStartInput = document.getElementById('baselineStartEditor');
    var baselineStartInputParent = oldBaselineStartInput.parentElement;
    var baselineStartInput = document.createElement('input');
    baselineStartInput.setAttribute('id', 'baselineStartEditor');
    baselineStartInputParent.replaceChild(baselineStartInput, oldBaselineStartInput);
    var baselineStartDateTimePicker = DateTimePicker.initialize(baselineStartInput, null, { defaultTimeOfDay: 8 * 60 * 60 * 1000, isNullValueAccepted: true });
    if (item.baselineStart)
        baselineStartDateTimePicker.setValue(GanttChartView.getOutputDate(item.baselineStart));
    var oldBaselineFinishInput = document.getElementById('baselineFinishEditor');
    var baselineFinishInputParent = oldBaselineFinishInput.parentElement;
    var baselineFinishInput = document.createElement('input');
    baselineFinishInput.setAttribute('id', 'baselineFinishEditor');
    baselineFinishInputParent.replaceChild(baselineFinishInput, oldBaselineFinishInput);
    var baselineFinishDateTimePicker = DateTimePicker.initialize(baselineFinishInput, null, { defaultTimeOfDay: 16 * 60 * 60 * 1000, isNullValueAccepted: true });
    if (!item.isMilestone && item.baselineFinish)
        baselineFinishDateTimePicker.setValue(GanttChartView.getOutputDate(item.baselineFinish));
    baselineFinishInput.removeAttribute('disabled');
    if (item.isMilestone)
        baselineFinishInput.setAttribute('disabled', 'disabled');
    editor.style.display = 'block';
    settings.selectionMode = 'None';
}
function onDateEditorChanged() {
    var startInput = document.getElementById('startEditor');
    var finishInput = document.getElementById('finishEditor');
    var finishDateTimePicker = DateTimePicker.get(finishInput);
    var start = DateTimePicker.get(startInput).getValue();
    if (finishDateTimePicker.getValue() < start)
        setTimeout(function () { return finishDateTimePicker.setValue(start); });
    var effortInput = document.getElementById('effortEditor');
    var durationInput = document.getElementById('durationEditor');
    var isMilestoneInput = document.getElementById('isMilestoneEditor');
    effortInput.setAttribute('disabled', 'disabled');
    durationInput.setAttribute('disabled', 'disabled');
    isMilestoneInput.setAttribute('disabled', 'disabled');
}
function onEffortEditorChanged() {
    var startInput = document.getElementById('startEditor');
    var finishInput = document.getElementById('finishEditor');
    var durationInput = document.getElementById('durationEditor');
    var isMilestoneInput = document.getElementById('isMilestoneEditor');
    startInput.setAttribute('disabled', 'disabled');
    finishInput.setAttribute('disabled', 'disabled');
    durationInput.setAttribute('disabled', 'disabled');
    isMilestoneInput.setAttribute('disabled', 'disabled');
}
function onDurationEditorChanged() {
    var startInput = document.getElementById('startEditor');
    var finishInput = document.getElementById('finishEditor');
    var effortInput = document.getElementById('effortEditor');
    var isMilestoneInput = document.getElementById('isMilestoneEditor');
    startInput.setAttribute('disabled', 'disabled');
    finishInput.setAttribute('disabled', 'disabled');
    effortInput.setAttribute('disabled', 'disabled');
    isMilestoneInput.setAttribute('disabled', 'disabled');
}
function onIsMilestoneEditorChanged() {
    if (!editedItem)
        return;
    var isMilestoneInput = document.getElementById('isMilestoneEditor');
    var finishInput = document.getElementById('finishEditor');
    var effortInput = document.getElementById('effortEditor');
    var durationInput = document.getElementById('durationEditor');
    var completionInput = document.getElementById('completionEditor');
    var baselineFinishInput = document.getElementById('baselineFinishEditor');
    finishInput.removeAttribute('disabled');
    effortInput.removeAttribute('disabled');
    durationInput.removeAttribute('disabled');
    completionInput.removeAttribute('disabled');
    baselineFinishInput.removeAttribute('disabled');
    if (editedItem.hasChildren || isMilestoneInput.checked) {
        finishInput.setAttribute('disabled', 'disabled');
        effortInput.setAttribute('disabled', 'disabled');
        durationInput.setAttribute('disabled', 'disabled');
        completionInput.setAttribute('disabled', 'disabled');
    }
    if (isMilestoneInput.checked) {
        baselineFinishInput.setAttribute('disabled', 'disabled');
    }
}
function closeEditor() {
    delete editedItem;
    editor.style.display = 'none';
    settings.selectionMode = 'Focus';
}
function saveEditor() {
    if (editedItem) {
        var contentInput = document.getElementById('contentEditor');
        ganttChartView.setItemContent(editedItem, contentInput.value);
        var assignmentsInput = document.getElementById('assignmentsEditor');
        ganttChartView.setItemAssignmentsContent(editedItem, assignmentsInput.value);
        if (!editedItem.hasChildren) {
            var isMilestoneInput = document.getElementById('isMilestoneEditor');
            ganttChartView.setItemIsMilestone(editedItem, isMilestoneInput.checked);
            var startInput = document.getElementById('startEditor');
            ganttChartView.setItemStart(editedItem, GanttChartView.getInputDate(DateTimePicker.get(startInput).getValue()));
            if (!editedItem.isMilestone) {
                var finishInput = document.getElementById('finishEditor');
                if (!finishInput.disabled) {
                    ganttChartView.setItemFinish(editedItem, GanttChartView.getInputDate(DateTimePicker.get(finishInput).getValue()));
                }
                else {
                    var effortInput = document.getElementById('effortEditor');
                    if (!effortInput.disabled) {
                        ganttChartView.setItemEffort(editedItem, parseFloat(effortInput.value) * 60 * 60 * 1000 / ganttChartView.getItemAllocationUnits(editedItem));
                    }
                    else {
                        var durationInput = document.getElementById('durationEditor');
                        if (!durationInput.disabled) {
                            ganttChartView.setItemDuration(editedItem, parseFloat(durationInput.value) * 8 * 60 * 60 * 1000);
                        }
                    }
                }
                var completionInput = document.getElementById('completionEditor');
                ganttChartView.setItemCompletion(editedItem, completionInput.value ? parseFloat(completionInput.value) / 100 : 0);
            }
            else {
                editedItem.finish = editedItem.start;
            }
        }
        var predecessorsInput = document.getElementById('predecessorsEditor');
        ganttChartView.setItemPredecessorsString(editedItem, predecessorsInput.value);
        var baselineStartInput = document.getElementById('baselineStartEditor');
        var baselineStart = DateTimePicker.get(baselineStartInput).getValue();
        if (baselineStart)
            editedItem.baselineStart = GanttChartView.getInputDate(baselineStart);
        else
            delete editedItem.baselineStart;
        var baselineFinishInput = document.getElementById('baselineFinishEditor');
        var baselineFinish = DateTimePicker.get(baselineFinishInput).getValue();
        if (baselineFinish)
            editedItem.baselineFinish = GanttChartView.getInputDate(baselineFinish);
        else
            delete editedItem.baselineFinish;
        ganttChartView.refreshItemNeighbourhood(editedItem);
    }
    closeEditor();
}
