// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

var ganttChartView = document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [{ content: 'Task 1', isExpanded: false },
             { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
             { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
             { content: 'Task 2', isExpanded: true },
             { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
             { content: 'Task 2.2', indentation: 1 },
             { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
             { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
             { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });

items[6].baselineStart = new Date(year, month, 10, 8, 0, 0);
items[6].baselineFinish = new Date(year, month, 11, 16, 0, 0);
items[7].baselineStart = new Date(year, month, 8, 8, 0, 0);
items[7].baselineFinish = new Date(year, month, 11, 16, 0, 0);
items[8].baselineStart = new Date(year, month, 12, 8, 0, 0);

// Set up appearance and style settings.
var settings =
{
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemHeight: 32, barHeight: 20, barMargin: 6, arrowSize: 1.5,
    gridLines: '#eaeaea', itemClass: 'grid-item',
    containerClass: 'container', selectedItemClass: 'selectedItem', cellClass: 'cell',
    toggleButtonClass: 'toggleButton', toggleButtonHoveringClass: 'toggleButtonHovering',
    cellClass: theme == 'Dark-black' ? 'cell-dark' : 'cell',
    standardBarClass: 'standardBar', standardCompletedBarClass: 'standardCompletedBar',
    summaryBarClass: 'summaryBar', milestoneBarClass: 'milestoneBar',
    assignmentsClass: 'assignments',
    dependencyLineClass: 'dependencyLine',
    baselineBarClass: 'baselineBar',
    alternativeItemClass: theme == 'Dark-black' ? 'alternativeGridItem-dark' : (theme == 'Steel-blue' ? 'alternativeGridItem-steel' : 'alternativeGridItem'),
    alternativeChartItemClass: theme == 'Dark-black' ? 'alternativeChartItem-dark' : 'alternativeChartItem'
};

settings.styleDefinitionTemplate = function (ganttChartView) {
    var document = ganttChartView.ownerDocument;
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var arrowMarker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    arrowMarker.setAttribute('id', 'ArrowMarker');
    arrowMarker.setAttribute('viewBox', '0 0 12 6');
    arrowMarker.setAttribute('refX', '3');
    arrowMarker.setAttribute('refY', '6');
    arrowMarker.setAttribute('markerUnits', 'strokeWidth');
    arrowMarker.setAttribute('markerWidth', '6');
    arrowMarker.setAttribute('markerHeight', '8');
    arrowMarker.setAttribute('orient', 'auto');
    var arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowPath.setAttribute('fill', '#ffb38a');
    arrowPath.setAttribute('d', 'M 0 0 L 12 6 L 0 12 z');
    arrowMarker.appendChild(arrowPath);
    defs.appendChild(arrowMarker);
    return defs;
}

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);
