// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [{ content: 'Resource 1', ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
{
    content: 'Resource 2', ganttChartItems: [{ content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
    { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
    { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
},
{ content: 'Resource 3', ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
        { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });

// Prepare control settings.
var settings = {
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);

var originalItemPropertyChangeHandler = settings.itemPropertyChangeHandler;
var app = new Vue({
    el: '#app',
    data: {
        scheduleChartItems: scheduleChartItems,
        settings: settings,
    },
    mounted: function () {
        scheduleChartView = document.querySelector('#scheduleChartView');
    },
    methods: {
        addNewItem: function() {
            var item = { content: 'New resource', ganttChartItems: [] };
            scheduleChartView.addScheduleChartItem(item);
            scheduleChartView.selectItem(item);
            scheduleChartView.scrollToItem(item);
        },
        insertNewItem: function() {
            if (scheduleChartView.selectedItem == null)
                return;
            var item = { content: 'New resource', ganttChartItems: [] };
            scheduleChartView.insertScheduleChartItem(scheduleChartView.selectedItem.scheduleChartIndex, item);
            scheduleChartView.selectItem(item);
            scheduleChartView.scrollToItem(item);
        },
        deleteItem: function() {
            if (scheduleChartView.selectedItem == null)
                return;
            scheduleChartView.removeScheduleChartItem(scheduleChartView.selectedItem);
        },
        setCustomBarColorToItem12: function() {
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
        },
        moveItemUp: function() {
            if (scheduleChartView.selectedItem == null)
                return;
            var item = scheduleChartView.selectedItem;
            scheduleChartView.moveScheduleChartItemUp(item);
            scheduleChartView.scrollToItem(item);
        },
        moveItemDown: function() {
            if (scheduleChartView.selectedItem == null)
                return;
            var item = scheduleChartView.selectedItem;
            scheduleChartView.moveScheduleChartItemDown(item);
            scheduleChartView.scrollToItem(item);
        },
        increaseTimelinePage: function() {
            scheduleChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        },
        decreaseTimelinePage: function() {
            scheduleChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        },
        setCustomScales: function () {
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
        },
        zoomIn: function() {
            settings.hourWidth *= 2;
            scheduleChartView.refresh();
        },
        print: function() {
            // Print the resource list column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            scheduleChartView.print({ title: 'Schedule Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        }
    }
});