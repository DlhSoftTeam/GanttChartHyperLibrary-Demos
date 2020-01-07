var GanttChartView = DlhSoft.Controls.GanttChartView;
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), dayDuration = 24 * 60 * 60 * 1000;
var items = [
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
items[4].interruptions = [{ start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0) }, { start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0) }];
items[7].interruptions = [{ start: new Date(year, month, 13, 8, 0, 0), finish: new Date(year, month, 13, 16, 0, 0) }];
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0), isTaskCompletedEffortVisible: false };
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);
settings.extraTaskTemplate = function (item) {
    var svgns = 'http://www.w3.org/2000/svg';
    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
    var extraArea = document.createElementNS(svgns, 'g');
    addInterruptionElements(document, ganttChartView, extraArea, item);
    return extraArea;
};
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
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
