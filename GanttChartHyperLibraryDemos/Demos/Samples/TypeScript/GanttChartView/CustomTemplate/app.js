/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    {
        content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]',
        hasMilestoneAtFinish: true
    },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    {
        content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2',
        hasMilestoneAtFinish: true, numberOfLinesToDisplayInsteadOfRectangle: 50, label: 'X'
    },
    {
        content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2',
        numberOfLinesToDisplayInsteadOfRectangle: 16
    },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
items[10].label = "Task 5";
items[11].label = "6";
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Prepare the custom field columns.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns.splice(3, 0, {
    header: 'Has milestone', width: 140,
    cellTemplate: function (item) {
        return DlhSoft.Controls.GanttChartView.optionSelectColumnTemplateBase(document, 124, function () { return ["No", "Yes"]; }, function () { return item.hasMilestoneAtFinish ? "Yes" : "No"; }, function (value) {
            item.hasMilestoneAtFinish = value == "Yes" ? true : false;
            ganttChartView.refreshChartItem(item);
        });
    }
});
columns.splice(4, 0, {
    header: 'Zig-zag lines', width: 140,
    cellTemplate: function (item) {
        return DlhSoft.Controls.GanttChartView.numberInputColumnTemplateBase(document, 124, function () { return item.numberOfLinesToDisplayInsteadOfRectangle; }, function (value) {
            item.numberOfLinesToDisplayInsteadOfRectangle = value;
            ganttChartView.refreshChartItem(item);
        });
    }
});
columns.splice(4, 0, {
    header: 'Label', width: 140,
    cellTemplate: function (item) {
        return DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase(document, 124, function () { return item.label; }, function (value) {
            item.label = value;
            ganttChartView.refreshChartItem(item);
        });
    }
});
settings.columns = columns;
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Set up custom template for standard tasks using custom fields prepared for items (hasMilestoneAtFinish, numberOfLinesToDisplayInsteadOfRectangle, label).
// When getDefault*TaskTemplate methods are used, pass undefined as items, ganttChartView, and settings arguments to use the instances associated to the item that the template would apply for.
var originalStandardTaskTemplate = settings.standardTaskTemplate ? settings.standardTaskTemplate : GanttChartView.getDefaultStandardTaskTemplate(undefined, undefined, undefined);
settings.standardTaskTemplate = function (item) {
    var group = item.numberOfLinesToDisplayInsteadOfRectangle ? linesTemplate(item) : originalStandardTaskTemplate(item);
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
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
// Custom template helpers.
function getChartItemArea(item) {
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg';
    var document = item.ganttChartView.ownerDocument;
    if (typeof item.chartItemArea === undefinedType)
        item.chartItemArea = document.createElementNS(svgns, 'g');
    for (var i = item.chartItemArea.childNodes.length; i-- > 0;)
        item.chartItemArea.removeChild(item.chartItemArea.childNodes[i]);
    return item.chartItemArea;
}
function applyStyle(line, item, settings) {
    var undefinedType = 'undefined';
    var barClass = settings.standardBarClass;
    if (typeof item.standardBarClass !== undefinedType)
        barClass = item.standardBarClass;
    if (typeof item.barClass !== undefinedType)
        barClass = item.barClass;
    if (typeof barClass !== undefinedType)
        line.setAttribute('class', barClass);
    else {
        var barStyle = settings.standardBarStyle;
        if (typeof item.standardBarStyle !== undefinedType)
            barStyle = item.standardBarStyle;
        if (typeof item.barStyle !== undefinedType)
            barStyle = item.barStyle;
        if (typeof barStyle !== undefinedType)
            line.setAttribute('style', barStyle);
    }
}
function linesTemplate(item) {
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var items = ganttChartView.items;
    var document = ganttChartView.ownerDocument;
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg';
    var barMargin = 4;
    var barHeight = settings.itemHeight - 2 * barMargin;
    var group = getChartItemArea(item);
    var itemLeft = ganttChartView.getChartPosition(item.start);
    var itemRight = Math.max(ganttChartView.getChartPosition(item.finish) - 1, itemLeft + 4);
    var itemWidth = itemRight - itemLeft;
    var lineCount = item.numberOfLinesToDisplayInsteadOfRectangle;
    for (var i = 0; i < lineCount; i++) {
        var line = document.createElementNS(svgns, 'line');
        var y = i % 2 == 0 ? barMargin + i * 1.5 : barMargin + barHeight - i * 1.5;
        line.setAttribute('x1', itemLeft + (i / lineCount) * itemWidth);
        line.setAttribute('y1', barMargin);
        line.setAttribute('x2', itemLeft + (i / lineCount) * itemWidth);
        line.setAttribute('y2', barMargin + barHeight);
        applyStyle(line, item, settings);
        group.appendChild(line);
        line = document.createElementNS(svgns, 'line');
        var y = i % 2 == 0 ? barMargin + i * 1.5 : barMargin + barHeight - i * 1.5;
        line.setAttribute('x1', itemLeft + (i / lineCount) * itemWidth);
        line.setAttribute('y1', barMargin);
        line.setAttribute('x2', itemLeft + ((i + 1) / lineCount) * itemWidth);
        line.setAttribute('y2', barMargin + barHeight);
        applyStyle(line, item, settings);
        group.appendChild(line);
    }
    var finishLine = document.createElementNS(svgns, 'line');
    finishLine.setAttribute('x1', itemRight);
    finishLine.setAttribute('y1', barMargin);
    finishLine.setAttribute('x2', itemRight);
    finishLine.setAttribute('y2', barMargin + barHeight);
    applyStyle(finishLine, item, settings);
    group.appendChild(finishLine);
    if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
        var thumb = document.createElementNS(svgns, 'rect');
        thumb.setAttribute('x', itemLeft);
        thumb.setAttribute('y', barMargin);
        thumb.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
        thumb.setAttribute('height', barHeight);
        thumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: move');
        if (!settings.isTaskStartReadOnly)
            group.appendChild(thumb);
        var startThumb = document.createElementNS(svgns, 'rect');
        startThumb.setAttribute('x', itemLeft - 4);
        startThumb.setAttribute('y', barMargin);
        startThumb.setAttribute('width', 4);
        startThumb.setAttribute('height', barHeight);
        startThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
        if (settings.isDraggingTaskStartEndsEnabled && !settings.isTaskStartReadOnly && settings.interaction != 'TouchEnabled')
            group.appendChild(startThumb);
        var finishThumb = document.createElementNS(svgns, 'rect');
        finishThumb.setAttribute('x', itemRight - 4);
        finishThumb.setAttribute('y', barMargin);
        finishThumb.setAttribute('width', 8);
        finishThumb.setAttribute('height', barHeight);
        finishThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
        if (!settings.isTaskEffortReadOnly && settings.interaction != 'TouchEnabled')
            group.appendChild(finishThumb);
        ganttChartView.initializeTaskDraggingThumbs(thumb, startThumb, finishThumb, undefined, item, itemLeft, itemRight, undefined); // Without completion support: passing undefined for completion arguments.
        if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
            var startDependencyThumb = null;
            if (typeof settings.allowCreatingStartDependencies === undefinedType || settings.allowCreatingStartDependencies) {
                startDependencyThumb = document.createElementNS(svgns, 'circle');
                startDependencyThumb.setAttribute('cx', itemLeft);
                startDependencyThumb.setAttribute('cy', barMargin + barHeight / 2);
                startDependencyThumb.setAttribute('r', barHeight / 4);
                startDependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
                group.appendChild(startDependencyThumb);
            }
            var dependencyThumb = document.createElementNS(svgns, 'circle');
            dependencyThumb.setAttribute('cx', itemRight - 2);
            dependencyThumb.setAttribute('cy', barMargin + barHeight / 2);
            dependencyThumb.setAttribute('r', barHeight / 4);
            dependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
            group.appendChild(dependencyThumb);
            ganttChartView.initializeDependencyDraggingThumbs(dependencyThumb, startDependencyThumb, group, item, barMargin + barHeight / 2, itemRight - 2, itemLeft);
        }
    }
    return group;
}
function getFinishDiamond(item) {
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var document = ganttChartView.ownerDocument;
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg';
    var barMargin = 4;
    var barHeight = settings.itemHeight - 2 * barMargin;
    var group = document.createElementNS(svgns, 'g');
    var itemLeft = ganttChartView.getChartPosition(item.finish);
    var startDiamond = document.createElementNS(svgns, 'polygon');
    var x = itemLeft - 8, y = settings.barMargin - 1, h = settings.barHeight + 1;
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
