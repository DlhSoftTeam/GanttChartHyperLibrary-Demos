// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var loadChartItems = [{
    content: 'Resource 1', ganttChartItems: [{ content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
    { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
    { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
    { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }]
},
{ content: 'Resource 2', ganttChartItems: [{ content: 'Task 2 (Resource 2)', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) }] }];
for (var i = 3; i <= 16; i++)
    loadChartItems.push({
        content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
        { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });

// Prepare control settings.
var settings = {
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemClass: 'grid-item'
};

// Optionally, initialize custom themes (themes.js).
initializeLoadChartTheme(settings, theme);

var app = new Vue({
    el: '#app',
    data: {
        loadChartItems: loadChartItems,
        settings: settings,
    },
    mounted: function () {
        loadChartView = document.querySelector('#loadChartView');
    },
    methods: {
        moveItemUp: function () {
            if (loadChartView.selectedItem == null)
                return;
            var item = loadChartView.selectedItem;
            loadChartView.moveLoadChartItemUp(item);
            loadChartView.scrollToItem(item);
        },
        moveItemDown: function() {
            if (loadChartView.selectedItem == null)
                return;
            var item = loadChartView.selectedItem;
            loadChartView.moveLoadChartItemDown(item);
            loadChartView.scrollToItem(item);
        },
        increaseTimelinePage: function() {
            loadChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        },
        decreaseTimelinePage: function() {
            loadChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        },
        setCustomScales: function () {
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
            loadChartView.refresh();
        },
        zoomIn: function() {
            settings.hourWidth *= 2;
            loadChartView.refresh();
        },
        print: function() {
            // Print the resource list column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            loadChartView.print({ title: 'Load Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        }
    }
});