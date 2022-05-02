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
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Define custom assignments template.
var assignmentsTemplate = function (item) {
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg', hourDuration = 60 * 60 * 1000;
    var ganttChartView = item.ganttChartView;
    var settings = ganttChartView.settings;
    var document = ganttChartView.ownerDocument;
    var group = document.createElementNS(svgns, 'g');
    var icon = document.createElementNS(svgns, 'image');
    var text = document.createElementNS(svgns, 'text');
    var itemRight = ganttChartView.getChartPosition(item.finish);
    if (item.isMilestone || (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)))
        itemRight += settings.barHeight / 2;
    icon.setAttribute('x', itemRight + 7);
    icon.setAttribute('y', settings.barMargin);
    icon.setAttribute('width', '16px');
    icon.setAttribute('height', '16px');
    text.setAttribute('x', itemRight + 7 + 16 + 2);
    text.setAttribute('y', settings.barMargin + settings.barHeight - 1);
    var content = item.assignmentsContent;
    if (typeof content === undefinedType)
        content = '';
    var resource = content;
    var resourceCommaIndex = resource.indexOf(',');
    if (resourceCommaIndex >= 0)
        resource = resource.substr(0, resourceCommaIndex);
    if (resource && resource != 'Resource 1' && resource != 'Resource 2')
        resource = 'Other';
    icon.setAttribute('href', 'Images/' + resource + '.png');
    text.appendChild(document.createTextNode(content));
    if (typeof settings.assignmentsClass !== undefinedType)
        text.setAttribute('class', settings.assignmentsClass);
    else if (typeof settings.assignmentsStyle !== undefinedType)
        text.setAttribute('style', settings.assignmentsStyle);
    if (resource)
        group.appendChild(icon);
    group.appendChild(text);
    return group;
};
settings.assignmentsTemplate = assignmentsTemplate;
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
