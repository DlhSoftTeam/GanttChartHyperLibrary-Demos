﻿// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Retrieve and store the control element for reference purposes.
var networkDiagramView = document.querySelector('#networkDiagramView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
var items = [{ content: 'Start milestone', displayedText: 'Start', isMilestone: true, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 8, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), assignmentsContent: 'N/A' },
             { content: 'First task', displayedText: 'Task 1', effort: 8 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 16, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 0, assignmentsContent: 'Resource 1' },
             { content: 'Second task', displayedText: 'Task 2', effort: 4 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 12, 0, 0), lateStart: new Date(year, month, 2, 12, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 4 * hourDuration, assignmentsContent: 'Resource 2' },
             { content: 'Third task', displayedText: 'Task 3', effort: 16 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 4, 16, 0, 0), lateStart: new Date(year, month, 3, 8, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 0, assignmentsContent: 'Resource 1, Resource 2' },
             { content: 'Fourth task', displayedText: 'Task 4', effort: 4 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 3, 12, 0, 0), lateStart: new Date(year, month, 4, 12, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 12 * hourDuration, assignmentsContent: 'Resource 2' },
             { content: 'Fifth task (middle milestone)', displayedText: 'Task 5', isMilestone: true, effort: 12 * hourDuration, earlyStart: new Date(year, month, 5, 8, 0, 0), earlyFinish: new Date(year, month, 6, 12, 0, 0), lateStart: new Date(year, month, 5, 8, 0, 0), lateFinish: new Date(year, month, 6, 12, 0, 0), slack: 0, assignmentsContent: 'Resource 2' },
             { content: 'Sixth task', displayedText: 'Task 6', effort: 48 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 6, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 0, assignmentsContent: 'Resource 1' },
             { content: 'Seventh task', displayedText: 'Task 7', effort: 20 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 8, 16, 0, 0), lateStart: new Date(year, month, 10, 8, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 28 * hourDuration, assignmentsContent: 'Resource 2' },
             { content: 'Finish milestone', displayedText: 'Finish', isMilestone: true, earlyStart: new Date(year, month, 12, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 12, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'N/A' }];
items[1].predecessors = [{ item: items[0] }];
items[2].predecessors = [{ item: items[0] }];
items[3].predecessors = [{ item: items[1] }, { item: items[2] }];
items[4].predecessors = [{ item: items[1] }];
items[5].predecessors = [{ item: items[3] }, { item: items[4] }];
items[6].predecessors = [{ item: items[5] }];
items[7].predecessors = [{ item: items[5] }];
items[8].predecessors = [{ item: items[6] }, { item: items[7] }];

// Prepare control settings.
var settings = {
    // Optionally, clear user rearranging settings.
    // canUserRearrangeItems: false,
    // snapRearrangedItemsToGuidelines: false,

    // Optionally, set application target, and theme and/or custom styles.
    // target: 'Phone', // Supported values: Standard, Phone.
    // theme: 'Aero', // Supported values: Modern, ModernBordered, Aero.
    // border: 'Gray',

    // Optionally, set item template used when displaying task bar tool tips in the chart area.
    // itemTemplate: function (item) {
    //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    //     var toolTipContent = item.content + ' • ' + item.start.toLocaleString() + '-' + 'Finish: ' + item.finish.toLocaleString();
    //     toolTip.appendChild(document.createTextNode(toolTipContent));
    //     return toolTip;
    // },
};

if (initializePertChartTheme)
    initializePertChartTheme(settings, theme);

// Initialize the component.
DlhSoft.Controls.Pert.NetworkDiagramView.initialize(networkDiagramView, items, settings);

// Define user command functions.
function setCustomBarColorToItem() {
    var item = networkDiagramView.items[2];
    item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
    networkDiagramView.refreshItem(item);
}
function highlightCriticalPath() {
    var i;
    for (i = 0; i < networkDiagramView.items.length; i++)
        delete networkDiagramView.items[i].shapeStyle;
    var criticalItems = networkDiagramView.getCriticalItems();
    for (i = 0; i < criticalItems.length; i++) {
        var item = criticalItems[i];
        item.shapeStyle = 'stroke: Red; fill: White';
    }
    networkDiagramView.refreshChartItems();
}
function print() {
    networkDiagramView.print({ title: 'Network Diagram (printable)', preparingMessage: '...' });
}
