// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Retrieve and store the control element for reference purposes.
var ganttChartView = document.querySelector('#ganttChartView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
    { content: 'Planning', label: 'Planning', isExpanded: false },
    { content: 'Analysis', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Requirements', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria, Tyson Lamberson' },
    { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Arhitecture', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush, Meeting room' },
    { content: 'Design', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Steven Rush' },
    { content: 'Development', label: 'Development', isExpanded: true },
    { content: 'Start development', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), isMilestone: true, assignmentsContent: 'Steven Rush' },
    { content: 'Date-times', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
    { content: 'Schedules', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush' },
    { content: 'Automation testing functions', label: 'Very important!', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Tyson Lamberson' },
    { content: 'Chart', label: 'Chart', indentation: 1 },
    { content: 'Bars', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 7, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Summary bars', indentation: 2, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), assignmentsContent: 'Steven Rush' },
    { content: 'Review', indentation: 2, start: new Date(year, month, 9, 16, 0, 0), isMilestone: true },
    { content: 'Links', indentation: 2, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush' },
    { content: 'Diagram functions', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Tyson Lamberson' },
    { content: 'Quality assurance', label: 'Very important!', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0), hasMilestoneAtFinish: true, assignmentsContent: 'Denis Kaelin, Printer' },
    { content: 'Project delivery', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Meeting room' },
    { content: 'Maintenance', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) },
    { content: 'Marketing', label: 'Marketing', start: new Date(year, month, 10, 12, 0, 0), finish: new Date(year, month, 15, 12, 0, 0) },
    { content: 'Preparations', indentation: 1, start: new Date(year, month, 10, 8, 0, 0), isMilestone: true, assignmentsContent: 'Joanna Mcamis, Alicia Rock' },
    { content: 'Colors', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
    { content: 'Logo', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Alicia Rock' },
    { content: 'Samples app', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 16, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Screenshots', indentation: 1, start: new Date(year, month, 12, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), assignmentsContent: 'Joanna Mcamis' },
    { content: 'Videos', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0), assignmentsContent: 'Alicia Rock' }
];
items[6].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[4].predecessors = [{ item: items[2], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
items[9].assignmentsContent = 'Clarissa Candelaria';
items[10].predecessors = [{ item: items[9] }];

// Prepare control settings.
var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemClass: 'grid-item'
};

// Optionally, set labels visibility.
settings.areStandardTaskLabelsVisible = true;
settings.areSummaryTaskLabelsVisible = true;
settings.areMilestoneTaskLabelsVisible = true;

// Prepare the columns collection.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;
columns[0 + indexOffset].width = 204;
// Optionally, add supplemental columns.
columns.splice(0 + indexOffset, 0, { header: '', width: 40, cellTemplate: DlhSoft.Controls.GanttChartView.getIndexColumnTemplate() });
columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getTotalEffortColumnTemplate(64) });
columns.splice(4 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getDurationColumnTemplate(64, 8) });
columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getCompletionColumnTemplate(64) });
columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getPredecessorsColumnTemplate(84) });
// Center content in milestone and completed columns
columns[6 + indexOffset].cellClass = 'center-cell';
columns[7 + indexOffset].cellClass = 'center-cell';
// Apply the customized columns collection.
settings.columns = columns;

// Optionally, define assignable resources.
settings.assignableResources = ['Clarissa Candelaria', 'Tyson Lamberson', 'Steven Rush',
                                'Joanna Mcamis', 'Denis Kaelin', 'Alicia Rock',
                                'Meeting room', 'Printer'];
settings.autoAppendAssignableResources = true;

// Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
settings.resourceQuantities = [{ key: 'Meeting room', value: 4 }, { key: 'Printer', value: Infinity }];
items[10].assignmentsContent = 'Meeting room [250%], Printer';
items[11].assignmentsContent = 'Meeting room, Printer [200%]';
items[12].assignmentsContent = 'Meeting room';

// Optionally, define task and resource costs.
// settings.taskInitiationCost = 5;
items[4].executionCost = 50;
settings.defaultResourceHourCost = 10;
settings.specificResourceHourCosts = [{ key: 'Denis Kaelin', value: 20 }, { key: 'Printer', value: 0.5 }];

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);