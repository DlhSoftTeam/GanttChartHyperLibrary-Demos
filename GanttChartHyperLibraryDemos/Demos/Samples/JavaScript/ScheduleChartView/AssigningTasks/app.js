/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control and container elements for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
// Prepare unassigned tasks (Gantt Chart items).
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var ganttChartItems = [
    { content: 'Critical Path', label: 'Critical Path', start: new Date(year, month, 9, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) },
    { content: 'Level Resources', label: 'Level Resources', start: new Date(year, month, 9, 8, 0, 0), finish: new Date(year, month, 24, 12, 0, 0) },
    { content: 'Load Chart', label: 'Load Chart', start: new Date(year, month, 9, 8, 0, 0), finish: new Date(year, month, 20, 16, 0, 0) },
    { content: 'Pert Chart', label: 'Pert Chart', start: new Date(year, month, 9, 8, 0, 0), finish: new Date(year, month, 25, 16, 0, 0) },
    { content: 'Network Diagram', label: 'Network Diagram', start: new Date(year, month, 11, 12, 0, 0), finish: new Date(year, month, 29, 16, 0, 0) },
    { content: 'Review Charts', label: 'Review Charts', start: new Date(year, month, 30, 10, 0, 0), isMilestone: true }
];
var ganttChartSettings = {
    gridWidth: '40%', chartWidth: '60%',
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemHeight: 32
};

ganttChartSettings.timelineStart = new Date(year, month, 2);
ganttChartSettings.timelineFinish = new Date(year, month + 1, 2);
var customIntervals = function () {
    var intervals = [];
    // Replace the next lines of code with your custom logic.
    var dayDuration = 24 * 60 * 60 * 1000; // 24 hours (in milliseconds).
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (var d = new Date(ganttChartSettings.timelineStart.valueOf() - dayDuration * 7); d <= new Date(ganttChartSettings.timelineFinish.valueOf() + dayDuration * 7); d = new Date(d.valueOf() + dayDuration))
        intervals.push({ headerText: daysOfWeek[d.getDay()], start: d, finish: new Date(d.valueOf() + dayDuration) });
    return intervals;
}(); // Call the inline function to immediately retreive the time intervals.
// Define a fully custom scale item using Custom scale type and Custom header text format, providing the time intervals to be displayed using an inline function.
var colorForeground = (theme == 'Dark-black' || theme == 'Steel-blue' || theme == 'Royal-blue') ? '#fff' : '#444';
var customScale = { scaleType: 'Custom', headerTextFormat: 'Custom', headerStyle: 'padding: 2px; border-right: solid 1px #ddd; color: ' + colorForeground, intervals: customIntervals };
ganttChartSettings.scales = [
    { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (theme == 'Dark-black' ? '#333333' : (theme == 'Steel-blue' ? '#ddd;' : '#f8f8f8')) },
    { scaleType: 'Months', headerTextFormat: 'MonthYear', headerStyle: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 2px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: ' + colorForeground, isSeparatorVisible: true, separatorStyle: 'stroke: #999; stroke-width: 0.5px; opacity: 0.25;' },
    { scaleType: 'Weeks', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #aaa; stroke-width: 0.5px; opacity: 0.25;' },
    { scaleType: 'Days', headerTextFormat: 'Day', isSeparatorVisible: true, headerStyle: 'padding: 2px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: ' + colorForeground, separatorStyle: 'stroke: #bbb; stroke-width: 0.5px; opacity: 0.25;' },
    customScale,
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
// Ensure space for 3 scales with visible headers.
ganttChartSettings.headerHeight = 21 * 3;

ganttChartSettings.areStandardTaskLabelsVisible = true;
ganttChartSettings.areSummaryTaskLabelsVisible = true;
ganttChartSettings.areMilestoneTaskLabelsVisible = true;
ganttChartSettings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('GanttChart', gridWidth, chartWidth); };

// Optionally, initialize custom themes for Gantt Chart (themes.js).
initializeGanttChartTheme(ganttChartSettings, theme);

// Initialize the Gantt Chart component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, ganttChartItems, ganttChartSettings);
// Prepare target resource items (Schedule Chart items).
var items = [
    { content: 'Project Managers', start: new Date() },
    {
        content: 'Steven Bright', image: 'Steven.png', role: 'Architect', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Arhitecture', label: 'Architecture', start: new Date(year, month, 1, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 4, 16, 0, 0) }]
    },
    {
        content: 'Jane Gershwin', image: 'Jane.png', role: 'Technical Lead', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Requirements', label: 'Requirements', start: new Date(year, month, 1, 8, 0, 0), finish: new Date(year, month, 4, 10, 0, 0), completedFinish: new Date(year, month, 2, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Review', label: 'Review', start: new Date(year, month, 12, 12, 0, 0), isMilestone: true },
            { content: 'Design', label: 'Design', start: new Date(year, month, 6, 12, 0, 0), finish: new Date(year, month, 9, 16, 0, 0) }]
    },
    { content: 'JavaScript', start: new Date() },
    {
        content: 'Victor Duncan', image: 'Victor.png', role: 'Senior developer', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Chart', label: 'Chart', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Bars', label: 'Bars', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Summary bars', label: 'Summary bars', start: new Date(year, month, 13, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) }]
    },
    {
        content: 'Johanna Mcamis', image: 'Johanna.png', role: 'Developer', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Date-times', label: 'Date-times', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Headers', label: 'Headers', start: new Date(year, month, 9, 12, 0, 0), finish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Intervals', label: 'Intervals', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0) }]
    },
    {
        content: 'Denis Kaelin', image: 'Denis.png', role: 'Tester', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Quality assurance', label: 'Quality assurance', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Automation testing functions', label: 'Automation testing functions', start: new Date(year, month, 16, 12, 0, 0), finish: new Date(year, month, 22, 16, 0, 0) }]
    },
    { content: '.NET', start: new Date() },
    {
        content: 'Diane McField', image: 'Diane.png', role: 'Senior Developer', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Diagram functions', label: 'Diagram functions', start: new Date(year, month, 5, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    {
        content: 'Albert Makhow', image: 'Albert.png', role: 'Developer', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Schedules', label: 'Schedules', start: new Date(year, month, 6, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    {
        content: 'Tyson Lamberson', image: 'Tyson.png', role: 'Developer', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Scales', label: 'Scales', start: new Date(year, month, 6, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    }
];
var scheduleChartSettings = {
    gridWidth: '40%', chartWidth: '60%',
    currentTime: new Date(year, month, 2, 12, 0, 0), // Display the current time vertical line of the chart at the project start date.
    itemHeight: 32
};

scheduleChartSettings.timelineStart = new Date(year, month, 2);
scheduleChartSettings.timelineFinish = new Date(year, month + 1, 2);

scheduleChartSettings.scales = [
    { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (theme == 'Dark-black' ? '#333333' : (theme == 'Steel-blue' ? '#ddd;' : '#f8f8f8')) },
    { scaleType: 'Months', headerTextFormat: 'MonthYear', headerStyle: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 2px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: ' + colorForeground, isSeparatorVisible: true, separatorStyle: 'stroke: #999; stroke-width: 0.5px; opacity: 0.25;' },
    { scaleType: 'Weeks', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #aaa; stroke-width: 0.5px; opacity: 0.25;' },
    { scaleType: 'Days', headerTextFormat: 'Day', isSeparatorVisible: true, headerStyle: 'padding: 2px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: ' + colorForeground, separatorStyle: 'stroke: #bbb; stroke-width: 0.5px; opacity: 0.25;' },
    customScale,
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
// Ensure space for 3 scales with visible headers.
scheduleChartSettings.headerHeight = 21 * 3;

scheduleChartSettings.areStandardTaskLabelsVisible = true;
scheduleChartSettings.areSummaryTaskLabelsVisible = true;
scheduleChartSettings.areMilestoneTaskLabelsVisible = true;

var columns = ScheduleChartView.getDefaultColumns(items, scheduleChartSettings);
columns[0].width = 144;

columns.push({ header: 'Role', width: 108, cellTemplate: function (item) { return DlhSoft.Controls.ScheduleChartView.textInputColumnTemplateBase(document, 100, function () { return item.role; }, function (value) { item.role = value; }); } });
columns.push({ header: 'Image', width: 44, cellTemplate: DlhSoft.Controls.GanttChartView.getIconColumnTemplate(getImage, null, 'width: 24px; height: 24px; border-radius: 50%;') });

scheduleChartSettings.columns = columns;
scheduleChartSettings.areStandardTaskLabelsVisible = true;
scheduleChartSettings.areMilestoneTaskLabelsVisible = true;

var isWaitingToRefreshScheduleChartViewSplitterPosition,
    isWaitingToRefreshGanttChartViewSplitterPosition;
scheduleChartSettings.splitterPositionChangeHandler = function (gridWidth, chartWidth) { refreshViewsSplitterPosition('ScheduleChart', gridWidth, chartWidth); }

initializeGanttChartTheme(scheduleChartSettings, theme);
// Initialize the Schedule Chart component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, items, scheduleChartSettings);

function getImage(item) {
    if (item.indentation == 0) {
        return 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='; // empty image source
    }
    else {
        return 'Images/' + item.image;
    }
}

// Synchronize displayed time (horizontal scrolling) between Gantt Chart and Schedule Chart components.
ganttChartSettings.displayedTimeChangeHandler = scheduleChartSettings.displayedTimeChangeHandler = function (displayedTime) {
    if (displayedTime != scheduleChartView.settings.displayedTime)
        scheduleChartView.scrollToDateTime(displayedTime);
    if (displayedTime != ganttChartView.settings.displayedTime)
        ganttChartView.scrollToDateTime(displayedTime);
};
function refreshViewsSplitterPosition(sourceControlType, gridWidth, chartWidth) {
    if (sourceControlType != 'ScheduleChart' && !isWaitingToRefreshScheduleChartViewSplitterPosition) {
        isWaitingToRefreshScheduleChartViewSplitterPosition = true;
        setTimeout(function () {
            var scheduleChartView = document.querySelector('#scheduleChartView');
            scheduleChartView.setSplitterPosition(gridWidth, chartWidth);
            isWaitingToRefreshScheduleChartViewSplitterPosition = false;
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

// Support for dragging source tasks from Gantt Chart to target Schedule Chart resource rows.
var hoveredGanttChartItem;
var draggedGanttChartItem;
var draggingToScheduleChartItem;
var draggingIndicator = document.createElement('div');
draggingIndicator.setAttribute('style', 'display: none; position: absolute; padding: 2px 4px; background-color: #aaa; color: White; font-family: Arial');
document.body.appendChild(draggingIndicator);
function isCursorOnTaskBar(isOnItemsArea, isOnChart, row, column) {
    if (isOnItemsArea && isOnChart) {
        var dateTime = column;
        var item = row;
        if (item.start <= dateTime && item.finish >= dateTime)
            return true;
    }
    return false;
}
window.addEventListener('mousemove', function () {
    hoveredGanttChartItem = null;
    if (draggedGanttChartItem != null)
        draggingIndicator.innerText = draggedGanttChartItem.content;
    setTimeout(function () {
        if (hoveredGanttChartItem == null && draggedGanttChartItem == null)
            document.body.style.cursor = 'default';
    });
}, true);
ganttChartSettings.mouseMoveHandler = function (isOnItemsArea, isOnChart, row, column) {
    if (draggingToScheduleChartItem != null)
        draggingToScheduleChartItem = null;
    if (isCursorOnTaskBar(isOnItemsArea, isOnChart, row, column)) {
        hoveredGanttChartItem = row;
        document.body.style.cursor = 'move';
    }
};
ganttChartSettings.mouseDownHandler = function () {
    draggedGanttChartItem = null;
    if (hoveredGanttChartItem != null) {
        draggedGanttChartItem = hoveredGanttChartItem;
        draggingIndicator.innerText = hoveredGanttChartItem.content;
        draggingIndicator.style.display = 'block';
        document.body.style.cursor = 'move';
    }
};
scheduleChartSettings.mouseMoveHandler = function (isOnItemsArea, isOnChart, row) {
    if (draggedGanttChartItem && isOnItemsArea && !row.hasChildren) {
        draggingToScheduleChartItem = row;
        scheduleChartView.selectItem(draggingToScheduleChartItem);
        draggingIndicator.innerText = draggedGanttChartItem.content + ': ' + draggingToScheduleChartItem.content;
    } else {
        draggingToScheduleChartItem = null;
        scheduleChartView.selectItem(row);
    }
};
window.onmousemove = function (e) {
    draggingIndicator.style.left = (e.clientX + 12).toString() + 'px';
    draggingIndicator.style.top = (e.clientY - 12).toString() + 'px';
};
window.onmouseup = function () {
    if (draggedGanttChartItem && draggingToScheduleChartItem) {
        ganttChartItems.splice(draggedGanttChartItem.index, 1);
        ganttChartView.refresh();
        draggingToScheduleChartItem.ganttChartItems.push(draggedGanttChartItem);
        scheduleChartView.refresh();
    }
    draggingToScheduleChartItem = null;
    draggedGanttChartItem = null;
    draggingIndicator.style.display = 'none';
    document.body.style.cursor = 'default';
};
