﻿// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Retrieve and store the control element for reference purposes.
var scheduleChartView = document.querySelector('#scheduleChartView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [{ content: 'Resource 1', ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
                          { content: 'Resource 2', ganttChartItems: [{ content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
                                                                     { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
                                                                     { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] },
                          { content: 'Resource 3', ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
                                                    { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });

// Prepare control settings.
var settings = {
    // Optionally, hide data grid or set grid and chart widths, set read only settings, and/or disable virtualization.
    // isGridVisible: false,
    // gridWidth: '20%',
    // chartWidth: '80%',
    // isGridReadOnly: true,
    // isChartReadOnly: true,
    // isVirtualizing: false,

    // Optionally, set the scrollable timeline to present.
    // timelineStart: new Date(year, month, 1),
    // timelineFinish: new Date(year + 2, month, 1),

    // Optionally, set application target, interaction mode, and theme and/or custom styles.
    // target: 'Phone', // Supported values: Standard, Phone.
    // interaction: 'TouchEnabled', // Supported values: Standard, TouchEnabled.
    // theme: 'Aero', // Supported values: Modern, ModernBordered, Aero.
    // border: 'Gray',
    // standardBarStyle: 'stroke: Green; fill: LightGreen',
    // standardCompletedBarStyle: 'stroke: DarkGreen; fill: DarkGreen',

    // Optionally, display alternative row background.
    // alternativeItemStyle: 'background-color: #f9f9f9', alternativeChartItemStyle: 'fill: #f9f9f9',

    // Optionally, set item template used when displaying task bar tool tips in the chart area.
    // itemTemplate: function (item) {
    //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    //     var toolTipContent = item.content + ' • ' + 'Start: ' + item.start.toLocaleString();
    //     if (!item.isMilestone)
    //         toolTipContent += ' • ' + 'Finish: ' + item.finish.toLocaleString();
    //     toolTip.appendChild(document.createTextNode(toolTipContent));
    //     return toolTip;
    // },

    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, configure selection.
// settings.selectionMode = 'Extended'; // Supported values: None, Focus (default), Single, Extended, ExtendedFocus.
// settings.selectedItemStyle = 'background: LightCyan';

// Optionally, initialize item selection.
// items[1].isSelected = true;

// Optionally, configure columns, and/or set custom item properties and/or append custom columns bound to their values.
// var columns = DlhSoft.Controls.ScheduleChartView.getDefaultColumns(scheduleChartItems, settings);
// columns[0].header = 'Workers';
// columns[0].width = 240;
// scheduleChartItems[1].description = 'Custom description';
// columns.push({ header: 'Description', width: 200, cellTemplate: function (item) { return window.document.createTextNode(item.description); } });
// settings.columns = columns;

// Optionally, handle item property change notifications.
// settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
//     if (isDirect && isFinal && propertyName != 'isSelected')
//         alert(item.content + '.' + propertyName + ' has changed.');
// }

// Optionally, define custom bar template for tasks.
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
// var originalStandardTaskTemplate = DlhSoft.Controls.ScheduleChartView.getDefaultStandardTaskTemplate(scheduleChartItems, scheduleChartView, settings);
// settings.standardTaskTemplate = function (item) {
//     var svgGroup = originalStandardTaskTemplate(item);
//     if (item.content.indexOf('Task A ') == 0) {
//         var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//         var itemLeft = scheduleChartView.getChartPosition(item.start, settings);
//         var itemRight = scheduleChartView.getChartPosition(item.finish, settings);
//         rect.setAttribute('x', itemLeft - 1);
//         rect.setAttribute('y', settings.barMargin - 1);
//         rect.setAttribute('width', itemRight - itemLeft + 1);
//         rect.setAttribute('height', settings.barHeight + 2);
//         rect.setAttribute('style', 'stroke: Red; fill: Transparent');
//         svgGroup.insertBefore(rect, svgGroup.childNodes[0]);
//     }
//     return svgGroup;
// }

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);

// Initialize the component.
DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartView, scheduleChartItems, settings);

// Define user command functions.
function addNewItem() {
    var item = { content: 'New resource', ganttChartItems: [] };
    scheduleChartView.addScheduleChartItem(item);
    scheduleChartView.selectItem(item);
    scheduleChartView.scrollToItem(item);
}
function insertNewItem() {
    if (scheduleChartView.selectedItem == null)
        return;
    var item = { content: 'New resource', ganttChartItems: [] };
    scheduleChartView.insertScheduleChartItem(scheduleChartView.selectedItem.scheduleChartIndex, item);
    scheduleChartView.selectItem(item);
    scheduleChartView.scrollToItem(item);
}
function deleteItem() {
    if (scheduleChartView.selectedItem == null)
        return;
    scheduleChartView.removeScheduleChartItem(scheduleChartView.selectedItem);
}
function setCustomBarColorToItem12() {
    if (scheduleChartView.scheduleChartItems.length <= 1)
        return;
    var scheduleChartItem = scheduleChartView.scheduleChartItems[1];
    if (scheduleChartItem.ganttChartItems.length <= 2)
        return;
    var item = scheduleChartItem.ganttChartItems[2];
    item.barStyle = 'stroke: Green; fill: LightGreen';
    item.completedBarStyle = 'stroke: Gray; fill: Gray';
    scheduleChartView.refreshChartItem(item);
    scheduleChartView.scrollToItem(scheduleChartItem);
}
function moveItemUp() {
    if (scheduleChartView.selectedItem == null)
        return;
    var item = scheduleChartView.selectedItem;
    scheduleChartView.moveScheduleChartItemUp(item);
    scheduleChartView.scrollToItem(item);
}
function moveItemDown() {
    if (scheduleChartView.selectedItem == null)
        return;
    var item = scheduleChartView.selectedItem;
    scheduleChartView.moveScheduleChartItemDown(item);
    scheduleChartView.scrollToItem(item);
}
function increaseTimelinePage() {
    scheduleChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
}
function decreaseTimelinePage() {
    scheduleChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
}
function setCustomScales() {
    var settings = scheduleChartView.settings;
    settings.headerHeight = 21 * 3;
    settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
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
    scheduleChartView.refresh();
}
function zoomIn() {
    var settings = scheduleChartView.settings;
    settings.hourWidth *= 2;
    scheduleChartView.refresh();
}
function print() {
    // Print the resource list column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
    scheduleChartView.print({ title: 'Schedule Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
}
