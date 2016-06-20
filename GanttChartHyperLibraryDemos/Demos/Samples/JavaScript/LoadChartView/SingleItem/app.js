// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

var loadChartView = document.querySelector('#loadChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var loadChartItems = [{
    content: 'Resource 1', ganttChartItems: [{ content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
                                             { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
                                             { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
                                             { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }]
}];

var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    displayedTime: new Date(year, month, 1, 12, 0, 0)
};

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeLoadChartTheme)
    initializeLoadChartTheme(settings, theme);

settings.isGridVisible = false;
settings.itemHeight = 112;
settings.barMargin = 8;
settings.barHeight = settings.itemHeight - settings.barMargin * 2;

DlhSoft.Controls.LoadChartView.initialize(loadChartView, loadChartItems, settings);
