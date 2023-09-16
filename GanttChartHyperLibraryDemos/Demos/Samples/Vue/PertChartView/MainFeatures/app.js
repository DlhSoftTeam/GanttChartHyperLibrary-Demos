// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Prepare data items.
var secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
var pertChartItems = [{ displayedText: '0', content: 'Start' },
            { displayedText: '1', content: 'Task event 1' },
            { displayedText: '2', content: 'Task event 2' },
            { displayedText: '3', content: 'Task event 3' },
            { displayedText: '4', content: 'Finish', displayedRowIndex: 0 }];
pertChartItems[1].predecessors = [{ item: pertChartItems[0], displayedText: 'A', content: 'Task A', effort: 4 * hourDuration }];
pertChartItems[2].predecessors = [{ item: pertChartItems[0], displayedText: 'B', content: 'Task B', effort: 2 * hourDuration }];
pertChartItems[3].predecessors = [{ item: pertChartItems[2], displayedText: 'C', content: 'Task C', effort: 1 * hourDuration }];
pertChartItems[4].predecessors = [{ item: pertChartItems[1], displayedText: 'D', content: 'Task D', effort: 5 * hourDuration },
                                  { item: pertChartItems[2], displayedText: 'E', content: 'Task E', effort: 3 * hourDuration },
                                  { item: pertChartItems[3], displayedText: 'F', content: 'Task F', effort: 2 * hourDuration }];

// Prepare control settings.
var settings = {
        // Optionally, clear user rearranging settings.
    // canUserRearrangeItems: false,
    // snapRearrangedItemsToGuidelines: false,

    // Optionally, set theme and custom styles.
    // theme: 'Aero', // Supported values: Modern, ModernBordered, Aero.
    // border: 'Gray',

    // Optionally, set item template used when displaying task event bar tool tips in the chart area.
    // itemTemplate: function (item) {
    //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    //     var toolTipContent = 'Event: ' +  item.content;
    //     toolTip.appendChild(document.createTextNode(toolTipContent));
    //     return toolTip;
    // },
};

// Optionally, initialize custom themes (themes.js).
initializePertChartTheme(settings, theme);

var app = new Vue({
    el: '#app',
    data: {
        pertChartItems: pertChartItems,
        settings: settings,
    },
    methods: {
        setCustomBarColorToItem: function () {
            var item = pertChartView.items[2];
            item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
            pertChartView.refreshItem(item);
        },
        setCustomDependencyLineColorToPredecessorItem: function() {
            var item = pertChartView.items[2];
            var predecessorItem = pertChartView.items[2].predecessors[0];
            predecessorItem.dependencyLineStyle = 'stroke: DarkMagenta; fill: none; marker-end: url(#ArrowMarker)';
            pertChartView.refreshPredecessorItems(item);
        },
        highlightCriticalPath: function() {
            var i, j;
            for (i = 0; i < pertChartView.items.length; i++) {
                var item = pertChartView.items[i];
                delete item.shapeStyle;
                if (item.predecessors) {
                    for (j = 0; j < item.predecessors.length; j++)
                        delete item.predecessors[j].dependencyLineStyle;
                }
            }
            var criticalDependencies = pertChartView.getCriticalDependencies();
            for (i = 0; i < criticalDependencies.length; i++) {
                var predecessorItem = criticalDependencies[i];
                predecessorItem.dependencyLineStyle = 'stroke: Red; fill: none: none; marker-end: url(#ArrowMarker)';
                predecessorItem.item.shapeStyle = 'stroke: Red; fill: White';
                if (i >= criticalDependencies.length - 1)
                    predecessorItem.dependentItem.shapeStyle = 'stroke: Red; fill: White';
            }
            pertChartView.refreshChartItems();
        },
        print: function () {
            pertChartView.print({ title: 'PERT Chart (printable)', preparingMessage: '...' });
        }
    }
});