// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Prepare data networkDiagramItems.
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
var networkDiagramItems = [{ content: 'Start milestone', displayedText: 'Start', isMilestone: true, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 8, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), assignmentsContent: 'N/A' },
{ content: 'First task', displayedText: 'Task 1', effort: 8 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 16, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 0, assignmentsContent: 'Resource 1' },
{ content: 'Second task', displayedText: 'Task 2', effort: 4 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 12, 0, 0), lateStart: new Date(year, month, 2, 12, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 4 * hourDuration, assignmentsContent: 'Resource 2' },
{ content: 'Third task', displayedText: 'Task 3', effort: 16 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 4, 16, 0, 0), lateStart: new Date(year, month, 3, 8, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 0, assignmentsContent: 'Resource 1, Resource 2' },
{ content: 'Fourth task', displayedText: 'Task 4', effort: 4 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 3, 12, 0, 0), lateStart: new Date(year, month, 4, 12, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 12 * hourDuration, assignmentsContent: 'Resource 2' },
{ content: 'Fifth task (middle milestone)', displayedText: 'Task 5', isMilestone: true, effort: 12 * hourDuration, earlyStart: new Date(year, month, 5, 8, 0, 0), earlyFinish: new Date(year, month, 6, 12, 0, 0), lateStart: new Date(year, month, 5, 8, 0, 0), lateFinish: new Date(year, month, 6, 12, 0, 0), slack: 0, assignmentsContent: 'Resource 2' },
{ content: 'Sixth task', displayedText: 'Task 6', effort: 48 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 6, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 0, assignmentsContent: 'Resource 1' },
{ content: 'Seventh task', displayedText: 'Task 7', effort: 20 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 8, 16, 0, 0), lateStart: new Date(year, month, 10, 8, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 28 * hourDuration, assignmentsContent: 'Resource 2' },
{ content: 'Finish milestone', displayedText: 'Finish', isMilestone: true, earlyStart: new Date(year, month, 12, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 12, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'N/A' }];
networkDiagramItems[1].predecessors = [{ item: networkDiagramItems[0] }];
networkDiagramItems[2].predecessors = [{ item: networkDiagramItems[0] }];
networkDiagramItems[3].predecessors = [{ item: networkDiagramItems[1] }, { item: networkDiagramItems[2] }];
networkDiagramItems[4].predecessors = [{ item: networkDiagramItems[1] }];
networkDiagramItems[5].predecessors = [{ item: networkDiagramItems[3] }, { item: networkDiagramItems[4] }];
networkDiagramItems[6].predecessors = [{ item: networkDiagramItems[5] }];
networkDiagramItems[7].predecessors = [{ item: networkDiagramItems[5] }];
networkDiagramItems[8].predecessors = [{ item: networkDiagramItems[6] }, { item: networkDiagramItems[7] }];

// Prepare control settings.
var settings = {
    // Optionally, clear user rearranging settings.
    // canUserRearrangenetworkDiagramItems: false,
    // snapRearrangednetworkDiagramItemsToGuidelines: false,

    // Optionally, set application target, and theme and/or custom styles.
    // target: 'Phone', // Supported values: Standard, Phone.
    // theme: 'Aero', // Supported values: Modern, ModernBordered, Aero.
    // border: 'Gray',

    // Optionally, set item template used when displaying task bar tool tips in the chart area.
    // itemTemplate: function (item) {
    //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    //     var toolTipContent = item.content + '\n' + item.start.toLocaleString() + '-' + 'Finish: ' + item.finish.toLocaleString();
    //     toolTip.appendChild(document.createTextNode(toolTipContent));
    //     return toolTip;
    // },
};

// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializePertChartTheme(settings, theme);
initializePertChartTemplates(settings, theme);

// Retrieve and store the control element for reference purposes.
var networkDiagramView = document.querySelector('#networkDiagramView');
// Initialize the component.
DlhSoft.Controls.Pert.NetworkDiagramView.initialize(networkDiagramView, networkDiagramItems, settings);

var app = new Vue({
    el: '#app',
    data: {
        networkDiagramItems: networkDiagramItems,
        settings: settings,
    },
    methods: {
        setCustomBarColorToItem: function () {
            var item = networkDiagramView.items[2];
            item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
            networkDiagramView.refreshItem(item);
        },
        highlightCriticalPath: function() {
            var i;
            for (i = 0; i < networkDiagramView.items.length; i++)
                delete networkDiagramView.items[i].shapeStyle;
            var criticalItems = networkDiagramView.getCriticalItems();
            for (i = 0; i < criticalItems.length; i++) {
                var item = criticalItems[i];
                item.shapeStyle = 'stroke: Red; fill: White';
            }
            networkDiagramView.refreshChartItems();
        },
        print: function() {
            networkDiagramView.print({ title: 'Network Diagram (printable)', preparingMessage: '...' });
        }
    }
});