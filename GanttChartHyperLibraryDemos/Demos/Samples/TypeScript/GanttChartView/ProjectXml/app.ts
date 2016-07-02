/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = <GanttChartItem[]>[
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 3; i <= 20; i++)
    items.push({ content: 'Task ' + i, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) });

var settings = <GanttChartView.Settings>{ currentTime: new Date(year, month, 2, 12, 0, 0) };

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);

function loadProjectXml() {
    closeSaveProjectXml();
    var loadProjectXmlPanel = <HTMLElement>document.querySelector('#loadProjectXmlPanel');
    loadProjectXmlPanel.style.display = 'inherit';
    var loadProjectXmlInput = <HTMLInputElement>document.querySelector('#loadProjectXmlInput');
    loadProjectXmlInput.focus();
    loadProjectXmlInput.select();
}
function loadProjectXmlContent() {
    var projectSerializer = DlhSoft.Controls.GanttChartView.ProjectSerializer.initialize(ganttChartView);
    var loadProjectXmlInput = <HTMLInputElement>document.querySelector('#loadProjectXmlInput');
    projectSerializer.loadXml(loadProjectXmlInput.value);
    closeLoadProjectXml();
}
function closeLoadProjectXml() {
    var loadProjectXmlPanel = <HTMLElement>document.querySelector('#loadProjectXmlPanel');
    loadProjectXmlPanel.style.display = 'none';
}
function saveProjectXml() {
    closeLoadProjectXml();
    var saveProjectXmlPanel = <HTMLElement>document.querySelector('#saveProjectXmlPanel');
    saveProjectXmlPanel.style.display = 'inherit';
    var projectXmlSerializerSettings = { compact: true, spaceSeparated: true };
    var projectSerializer = DlhSoft.Controls.GanttChartView.ProjectSerializer.initialize(ganttChartView, projectXmlSerializerSettings);
    var saveProjectXmlOutput = <HTMLInputElement>document.querySelector('#saveProjectXmlOutput');
    saveProjectXmlOutput.value = projectSerializer.getXml();
    saveProjectXmlOutput.focus();
    saveProjectXmlOutput.select();
}
function closeSaveProjectXml() {
    var saveProjectXmlPanel = <HTMLElement>document.querySelector('#saveProjectXmlPanel');
    saveProjectXmlPanel.style.display = 'none';
}
