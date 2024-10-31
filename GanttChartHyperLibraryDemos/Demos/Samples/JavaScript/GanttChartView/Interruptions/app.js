/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), dayDuration = 24 * 60 * 60 * 1000;

var items = [{ content: 'Planning' },
{ content: 'Requirements', label: 'Requirements', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 6, 15, 0, 0), completedFinish: new Date(year, month, 3, 15, 0, 0) },
{ content: 'Arhitecture', label: 'Arhitecture', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 6, 10, 0, 0), completedFinish: new Date(year, month, 4, 10, 0, 0), hasMilestoneAtFinish: true },
{ content: 'Development', label: 'Development', isExpanded: true },
{ content: 'Date-times', label: 'Date-times', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 12, 15, 0, 0), completedFinish: new Date(year, month, 10, 15, 0, 0), assignmentsContent: 'Clarissa, Steven [50%]' },
{ content: 'Chart', indentation: 1 },
{ content: 'Bars', label: 'Bars', indentation: 2, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 12, 0, 0), completedFinish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Steven' },
{ content: 'Summary Bars', label: 'Summary Bars', indentation: 2, start: new Date(year, month, 4, 12, 30, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 6, 15, 0, 0), assignmentsContent: 'Steven', hasMilestoneAtFinish: true },
{ content: 'Review', indentation: 1, start: new Date(year, month, 13, 16, 0, 0), isMilestone: true },
{ content: 'Links', label: 'Links', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), hasMilestoneAtFinish: true },
{ content: 'Diagram functions', label: 'Diagram functions', indentation: 1, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 9, 15, 0, 0) },
{ content: 'Quality assurance', label: 'Quality assurance', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), completedFinish: new Date(year, month, 5, 15, 0, 0), hasMilestoneAtFinish: true }
    , { content: 'Project delivery', label: 'Project delivery', indentation: 1, start: new Date(year, month, 8, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0) }
];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 10 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
items[7].predecessors = [{ item: items[6] }];

items[9].assignmentsContent = 'Clarissa Candelaria';
items[10].predecessors = [{ item: items[9] }];

items[4].barStyle = 'stroke: #a7caff; fill: #fefefe';
items[4].completedBarStyle = 'stroke: #a7caff; fill: #acbbeb';

items[9].barStyle = 'stroke: #fcddd6; fill: #fcddd6';
items[9].completedBarStyle = 'stroke: #f983b6; fill: #f983b6';

items[10].barStyle = 'stroke: #fff2b5; fill: #fcf2b5';
items[10].completedBarStyle = 'stroke: #f9e56c; fill: #f9e56c';

//Summary items
items[0].backgroundColor = '#84d1f7'; //blue
items[3].backgroundColor = '#efefef'; //light gray
items[5].backgroundColor = '#dedede'; //blue

// Set up interruption values.
items[4].interruptions = [{ start: new Date(year, month, 7, 11, 0, 0), finish: new Date(year, month, 8, 15, 0, 0) }];
items[7].interruptions = [{ start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 7, 12, 0, 0) }, { start: new Date(year, month, 10, 10, 0, 0), finish: new Date(year, month, 11, 14, 0, 0) }];

// Prepare control settings.
var settings = {
    // Optionally, hide data grid or set grid and chart widths, set read only settings, and/or disable virtualization.
    // isGridVisible: false,
    gridWidth: '36%',
    chartWidth: '64%',
    dependencyLineStyle: 'stroke: #ffb38a; fill: none; marker-end: url(#ArrowMarker)',

    // Optionally, display alternative row background.
    alternativeItemStyle: 'background-color: #f9f9f9', alternativeChartItemStyle: 'fill: #f9f9f9',

    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 5, 12, 0, 0),
    itemClass: 'grid-item',
    visibleWeekStart: 1, 
    visibleWeekFinish: 6
};

// Optionally, set baseline properties.
items[6].baselineStart = new Date(year, month, 2, 8, 0, 0);
items[6].baselineFinish = new Date(year, month, 7, 16, 0, 0);
items[7].baselineStart = new Date(year, month, 3, 8, 0, 0);
items[7].baselineFinish = new Date(year, month, 6, 16, 0, 0);
items[8].baselineStart = new Date(year, month, 6, 8, 0, 0);

// Prepare the columns collection.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;

// Optionally, configure existing columns.
columns[0 + indexOffset].header = 'Work items';
columns[0 + indexOffset].width = 154;

columns.splice(0 + indexOffset, 0, { header: 'WBS', width: 46, cellTemplate: DlhSoft.Controls.GanttChartView.getWbsColumnTemplate() });
columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getTotalEffortColumnTemplate(64) });
columns.splice(7 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getDurationColumnTemplate(64, 8) });
columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getCompletionColumnTemplate(64) });
columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getPredecessorsColumnTemplate(84) });

// Apply the customized columns collection.
settings.columns = columns;

// Optionally, define assignable resources.
settings.assignableResources = ['Clarissa', 'Tyson', 'Steven',
    'Meeting room', 'Print'];
settings.autoAppendAssignableResources = true;

settings.areResourceImagesVisibleAsAssignments = true;
settings.resourceImageUrls = [{ key: 'Steven', value: 'Images/Steven.png' },
{ key: 'Clarissa', value: 'Images/Clarissa.png' },
{ key: 'Tyson', value: 'Images/Tyson.png' },
{ key: 'Material 1', value: 'Images/Print.png' },
{ key: 'Print', value: 'Images/Print.png' }];

settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (theme == 'Dark-black' ? '#333333' : (theme == 'Steel-blue' ? '#95a5b2' : '#f8f8f8')) },
    { scaleType: 'Months', headerTextFormat: 'MonthYear', headerStyle: 'padding: 4px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 1px' },
    { scaleType: 'Weeks', headerStyle: 'padding: 4px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 1px' },
    { scaleType: 'Days', headerTextFormat: 'Day', headerStyle: 'padding: 4px; border-right: solid 1px #ddd; border-bottom: solid 1px #ddd; color: #333' },
    { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' }];
// Ensure space for 3 scales with visible headers.
settings.headerHeight = 26 * 3;
settings.hourWidth = 7;

settings.styleDefinitionTemplate = function (ganttChartView) {
    var document = ganttChartView.ownerDocument;
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var arrowMarker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    arrowMarker.setAttribute('id', 'ArrowMarker');
    arrowMarker.setAttribute('viewBox', '0 0 10 10');
    arrowMarker.setAttribute('refX', '0');
    arrowMarker.setAttribute('refY', '5');
    arrowMarker.setAttribute('markerUnits', 'strokeWidth');
    arrowMarker.setAttribute('markerWidth', '5');
    arrowMarker.setAttribute('markerHeight', '4');
    arrowMarker.setAttribute('orient', 'auto');
    var arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowPath.setAttribute('fill', '#ffb38a');
    arrowPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    arrowMarker.appendChild(arrowPath);
    defs.appendChild(arrowMarker);
    return defs;
}

// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);

var originalSummaryTaskTemplate = settings.summaryTaskTemplate ? settings.summaryTaskTemplate : GanttChartView.getDefaultSummaryTaskTemplate(items, ganttChartView, settings);
settings.summaryTaskTemplate = function (item) {
    var svgns = 'http://www.w3.org/2000/svg';
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var document = ganttChartView.ownerDocument;
    var group = originalSummaryTaskTemplate(item);
    var itemLeft = ganttChartView.getChartPosition(item.start);
    var itemRight = ganttChartView.getChartPosition(item.finish);
    if (item.backgroundColor) {
        var background = document.createElementNS(svgns, 'rect');
        background.setAttribute('x', itemLeft - 10);
        background.setAttribute('y', 0);
        background.setAttribute('width', 10 + Math.max(0, itemRight - itemLeft - 1) + 10);
        background.setAttribute('height', getVisibleItemCount(item) * settings.itemHeight);
        background.setAttribute('fill', item.backgroundColor);
        background.setAttribute('opacity', 0.5);
        group.insertBefore(background, group.firstChild);
    }
    return group;
};

function getVisibleItemCount(summaryItem) {
    var count = 1;
    summaryItem.children
        .filter(function (item) { return item.isVisible })
        .forEach(function (item) {
            if (!item.hasChildren) { count++; }
            else { count += getVisibleItemCount(item); }
        });
    return count;
}

var originalStandardTaskTemplate = settings.standardTaskTemplate ? settings.standardTaskTemplate : GanttChartView.getDefaultStandardTaskTemplate(undefined, undefined, undefined);
settings.standardTaskTemplate = function (item) {
    var group = originalStandardTaskTemplate(item);
    if (item.hasMilestoneAtFinish) {
        var finishDiamond = getFinishDiamond(item);
        var index = group.childNodes.length - 1; // Dependency creation thumb.
        group.insertBefore(finishDiamond, group.childNodes[index]);
    }
    if (item.label) {
        var label = getLabel(item);
        var index = group.childNodes.length - 6; // Drag thumb.
        group.insertBefore(label, group.childNodes[index]);
    }
    return group;
};

// Set up extra template to draw interruptions.
settings.extraTaskTemplate = function (item) {
    var svgns = 'http://www.w3.org/2000/svg';
    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
    var extraArea = document.createElementNS(svgns, 'g');
    addInterruptionElements(document, ganttChartView, extraArea, item);
    return extraArea;
};

// Initialize the component.
DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

function getFinishDiamond(item) {
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var document = ganttChartView.ownerDocument;
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg';

    var group = document.createElementNS(svgns, 'g');
    var itemLeft = ganttChartView.getChartPosition(item.finish);
    var startDiamond = document.createElementNS(svgns, 'polygon');
    var x = itemLeft - 12, y = settings.barMargin + 5, h = settings.barHeight - 10;
    startDiamond.setAttribute('points', x + ',' + y + ' ' + (x - h / 2) + ',' + (y + h / 2) + ' ' + x + ',' + (y + h) + ' ' + (x + h / 2) + ',' + (y + h / 2));
    var barClass = settings.milestoneBarClass;
    if (typeof item.milestoneBarClass !== undefinedType)
        barClass = item.milestoneBarClass;
    if (typeof item.barClass !== undefinedType)
        barClass = item.barClass;
    if (typeof barClass !== undefinedType)
        startDiamond.setAttribute('class', barClass);
    else {
        var barStyle = settings.milestoneBarStyle;
        if (typeof item.milestoneBarStyle !== undefinedType)
            barStyle = item.milestoneBarStyle;
        if (typeof item.barStyle !== undefinedType)
            barStyle = item.barStyle;
        if (typeof barStyle !== undefinedType)
            startDiamond.setAttribute('style', barStyle);
    }
    group.appendChild(startDiamond);
    return group;
}
function getLabel(item) {
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var document = ganttChartView.ownerDocument;
    var svgns = 'http://www.w3.org/2000/svg';
    var barMargin = 4;
    var barHeight = settings.itemHeight - 2 * barMargin;
    var itemLeft = ganttChartView.getChartPosition(item.start);
    var content = document.createTextNode(item.label);
    var text = document.createElementNS(svgns, 'text');
    text.setAttribute('x', itemLeft + 4);
    text.setAttribute('y', barMargin + barHeight - barHeight / 4 - 1);
    text.setAttribute('style', 'font-size: ' + (barHeight / 2 + 1) + 'px');
    text.appendChild(content);
    return text;
}

// Support for interruption: we return drawing to be placed on top of existing bars.
function addInterruptionElements(document, ganttChartView, extraArea, item) {
    if (!item.interruptions || item.isMilestone || item.hasChildren)
        return;
    for (var i = 0; i < item.interruptions.length; i++) {
        var interruption = item.interruptions[i];
        interruption = { start: GanttChartView.getInputDate(interruption.start), finish: GanttChartView.getInputDate(interruption.finish) };
        interruption = { start: item.start > interruption.start ? item.start : interruption.start, finish: item.finish < interruption.finish ? item.finish : interruption.finish };
        if (interruption.finish <= item.start || interruption.start >= item.finish)
            continue;
        extraArea.appendChild(getInterruptionElement(document, ganttChartView, item, interruption));
    }
}
function getInterruptionElement(document, ganttChartView, item, interruption) {
    var svgns = 'http://www.w3.org/2000/svg';
    var group = document.createElementNS(svgns, 'g');
    var barMargin = 4;
    var barHeight = settings.itemHeight - 2 * barMargin;
    var startX = ganttChartView.getChartPosition(interruption.start), finishX = ganttChartView.getChartPosition(interruption.finish);
    if (finishX - 0.5 > startX + 0.5) {
        startX += 0.5;
        finishX -= 0.5;
        var background = document.createElementNS(svgns, 'rect');
        background.setAttribute('x', startX.toString());
        background.setAttribute('y', (barMargin - 1).toString());
        background.setAttribute('width', Math.max(0, finishX - startX - 1).toString());
        background.setAttribute('height', (barHeight + 2).toString());
        background.setAttribute('style', 'fill: ' + (theme == "Dark-black" ? "#282828" : theme == "Steel-blue" ? "#bfcfda" : "White"));
        group.appendChild(background);
        var topLine = document.createElementNS(svgns, 'line');
        topLine.setAttribute('x1', startX.toString());
        topLine.setAttribute('x2', finishX.toString());
        topLine.setAttribute('y1', (barMargin + (barHeight < 20 ? 1 : 0)).toString());
        topLine.setAttribute('y2', (barMargin + (barHeight < 20 ? 1 : 0)).toString());
        topLine.setAttribute('style', 'stroke: #0050a0; stroke-opacity: 0.75; stroke-dasharray: 2 2');
        group.appendChild(topLine);
        var bottomLine = document.createElementNS(svgns, 'line');
        bottomLine.setAttribute('x1', startX.toString());
        bottomLine.setAttribute('x2', finishX.toString());
        bottomLine.setAttribute('y1', (barMargin + barHeight - (barHeight < 20 ? 1 : 0)).toString());
        bottomLine.setAttribute('y2', (barMargin + barHeight - (barHeight < 20 ? 1 : 0)).toString());
        bottomLine.setAttribute('style', 'stroke: #0050a0; stroke-opacity: 0.75; stroke-dasharray: 2 2');
        group.appendChild(bottomLine);
    }
    return group;
}

//# sourceMappingURL=app.js.map