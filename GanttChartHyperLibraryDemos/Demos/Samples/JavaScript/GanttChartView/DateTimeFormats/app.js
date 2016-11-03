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
var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    useDatePicker: false
};
// Initialize duration column.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;
var durationColumn = { width: 80 };
columns.splice(2 + indexOffset, 0, durationColumn);
settings.columns = columns;
// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);
// Prepare command element references.
var dateFormatSelect = document.querySelector('#dateFormatSelect');
var hideTimeOfDayCheckBox = document.querySelector('#hideTimeOfDayCheckBox');
var durationFormatSelect = document.querySelector('#durationFormatSelect');
// Set formats and related settings based on user selections.
function initializeFormats() {
    var projectStart = new Date(year, month, 1);
    settings.timelineStart = projectStart;
    switch (dateFormatSelect.value) {
        case 'Standard':
            settings.dateFormatter = GanttChartView.defaultDateFormatter;
            settings.dateTimeParser = GanttChartView.defaultDateTimeParser;
            break;
        case 'DD.MM.YYYY':
            settings.dateFormatter = function (date) {
                var value = GanttChartView.defaultDateFormatter(date);
                var month = value.substr(0, 2);
                var day = value.substr(3, 2);
                var rest = value.substr(6);
                return day + '.' + month + '.' + rest;
            };
            settings.dateTimeParser = function (value) {
                var day = value.substr(0, 2);
                var month = value.substr(3, 2);
                var rest = value.substr(6);
                value = month + '/' + day + '/' + rest;
                return GanttChartView.defaultDateTimeParser(value);
            };
            break;
        case 'Numeric':
            settings.dateFormatter = function (date) {
                var dayNumber = Math.floor((date.getTime() - projectStart.getTime()) / (24 * 60 * 60 * 1000));
                return dayNumber > 0 ? (dayNumber < 10 ? '0' : '') + dayNumber.toString() : '--';
            };
            settings.dateTimeParser = function (value) {
                var dayNumber = parseInt(value);
                return new Date(projectStart.getTime() + dayNumber * 24 * 60 * 60 * 1000);
            };
            break;
    }
    settings.dateTimeFormatter = function (date) {
        var value = settings.dateFormatter(date);
        if (!hideTimeOfDayCheckBox.checked)
            value += ' ' + (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        return value;
    };
    durationColumn.header = 'Duration (' + durationFormatSelect.value + ')';
    durationColumn.cellTemplate = DlhSoft.Controls.GanttChartView.getDurationColumnTemplate(64, durationFormatSelect.value == 'd' ? 8 : (durationFormatSelect.value == 'w' ? 8 * 5 : 1));
    if (ganttChartView)
        ganttChartView.refresh();
}
initializeFormats();
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
// Update scales collection upon user commands.
dateFormatSelect.addEventListener('change', initializeFormats);
hideTimeOfDayCheckBox.addEventListener('change', initializeFormats);
durationFormatSelect.addEventListener('change', initializeFormats);
