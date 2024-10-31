/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
    { content: 'Planning', isExpanded: false },
    { content: 'Requirements', label: 'Requirements', indentation: 1, start: new Date(year, month, 1, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Architecture', label: 'Architecture', indentation: 1, start: new Date(year, month, 1, 12, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush' },
    { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 6, 12, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Development', label: 'Development', isExpanded: true },
    { content: 'Date-times', label: 'Date-times', indentation: 1, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 11, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush [50%]' },
    { content: 'Chart', indentation: 1 },
    { content: 'Bars', label: 'Bars', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush' },
    { content: 'Summary bars', label: 'Summary bars', indentation: 2, start: new Date(year, month, 6, 12, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush', hasMilestoneAtFinish: true },
    { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 10, 16, 0, 0), isMilestone: true },
    { content: 'Links', label: 'Links', indentation: 1, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), hasMilestoneAtFinish: true },
    { content: 'Diagram functions', label: 'Diagram functions', indentation: 1, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0) },
    { content: 'Quality assurance', label: 'Quality assurance', indentation: 1, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), hasMilestoneAtFinish: true },
    { content: 'Project delivery', label: 'Project delivery', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) }];

var settings = {
    currentTime: new Date(year, month, 3, 12, 0, 0),
    itemClass: 'grid-item'
};

settings.areStandardTaskLabelsVisible = true;
settings.areSummaryTaskLabelsVisible = true;
settings.areMilestoneTaskLabelsVisible = true;

settings.standardLabelClass = 'standardLabelClass';
settings.summaryLabelStyle = 'color: #ffeafd; font-weight: bold;';

items[7].labelColor = '#a36734';
items[9].labelColor = '#a36734';

var columns = GanttChartView.getDefaultColumns(items, settings);
columns[0].width = 144;
columns[1].width = 110;
columns[2].width = 110;
settings.columns = columns;

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);