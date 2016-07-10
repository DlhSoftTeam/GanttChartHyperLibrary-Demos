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
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
items[9].assignmentsContent = 'Resource 1';
items[10].predecessors = [{ item: items[9] }];

var settings = <GanttChartView.Settings>{ currentTime: new Date(year, month, 2, 12, 0, 0) };

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(settings, theme);

// Prepare command element references.
var majorScaleTypeSelect = <HTMLSelectElement>document.querySelector('#majorScaleTypeSelect');
var majorScaleHeaderFormatSelect = <HTMLSelectElement>document.querySelector('#majorScaleHeaderFormatSelect');
var majorScaleSeparatorCheckBox = <HTMLInputElement>document.querySelector('#majorScaleSeparatorCheckBox');
var minorScaleTypeSelect = <HTMLSelectElement>document.querySelector('#minorScaleTypeSelect');
var minorScaleHeaderFormatSelect = <HTMLSelectElement>document.querySelector('#minorScaleHeaderFormatSelect');
var minorScaleSeparatorCheckBox = <HTMLInputElement>document.querySelector('#minorScaleSeparatorCheckBox');
var mondayBasedCheckBox = <HTMLInputElement>document.querySelector('#mondayBasedCheckBox');
var nonworkingDaysCheckBox = <HTMLInputElement>document.querySelector('#nonworkingDaysCheckBox');
var currentTimeCheckBox = <HTMLInputElement>document.querySelector('#currentTimeCheckBox');
var zoomLevelTextBox = <HTMLInputElement>document.querySelector('#zoomLevelTextBox');

// Prepare supported scale types and header formats.
var availableScaleTypes = ['Years', 'Months', 'Weeks', 'Days', 'Hours'];
var availableHeaderFormats = ['DateTime', 'Date', 'Hour', 'DayOfWeek', 'DayOfWeekAbbreviation', 'Day', 'Month', 'MonthAbbreviation', 'Year', 'MonthYear', 'Localized'];

// Initialize available and selected options for scale type and header format select elements, and values for check box and text box elements.
for (var i = 0; i < availableScaleTypes.length; i++) {
    var scaleType = availableScaleTypes[i];
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(scaleType));
    option.value = scaleType;
    option.selected = scaleType == 'Weeks';
    majorScaleTypeSelect.appendChild(option);
}
for (var i = 0; i < availableScaleTypes.length; i++) {
    var scaleType = availableScaleTypes[i];
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(scaleType));
    option.value = scaleType;
    option.selected = scaleType == 'Days';
    minorScaleTypeSelect.appendChild(option);
}
majorScaleSeparatorCheckBox.checked = true;
for (var i = 0; i < availableHeaderFormats.length; i++) {
    var headerFormat = availableHeaderFormats[i];
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(headerFormat));
    option.value = headerFormat;
    option.selected = headerFormat == 'Date';
    majorScaleHeaderFormatSelect.appendChild(option);
}
for (var i = 0; i < availableHeaderFormats.length; i++) {
    var headerFormat = availableHeaderFormats[i];
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(headerFormat));
    option.value = headerFormat;
    option.selected = headerFormat == 'DayOfWeekAbbreviation';
    minorScaleHeaderFormatSelect.appendChild(option);
}
nonworkingDaysCheckBox.checked = true;
currentTimeCheckBox.checked = true;
zoomLevelTextBox.value = '5';

// Handle change chains.
function updateFromSelectedMajorScaleType() {
    switch (majorScaleTypeSelect.value) {
        case 'Years':
            majorScaleHeaderFormatSelect.value = 'Year';
            minorScaleTypeSelect.value = 'Months';
            break;
        case 'Months':
            majorScaleHeaderFormatSelect.value = 'Month';
            minorScaleTypeSelect.value = 'Weeks';
            break;
        case 'Weeks':
            majorScaleHeaderFormatSelect.value = 'Date';
            minorScaleTypeSelect.value = 'Days';
            break;
        case 'Days':
            majorScaleHeaderFormatSelect.value = 'Day';
            minorScaleTypeSelect.value = 'Hours';
            break;
        case 'Hours':
            majorScaleHeaderFormatSelect.value = 'Hour';
            minorScaleTypeSelect.value = 'Days';
            break;
    }
    updateFromSelectedMinorScaleType();
}
majorScaleTypeSelect.addEventListener('change', updateFromSelectedMajorScaleType);
function updateFromSelectedMinorScaleType() {
    switch (minorScaleTypeSelect.value) {
        case 'Years':
            minorScaleHeaderFormatSelect.value = 'Year';
            zoomLevelTextBox.value = '0.5';
            break;
        case 'Months':
            minorScaleHeaderFormatSelect.value = 'MonthAbbreviation';
            zoomLevelTextBox.value = '0.5';
            break;
        case 'Weeks':
            minorScaleHeaderFormatSelect.value = 'Day';
            zoomLevelTextBox.value = '2';
            break;
        case 'Days':
            minorScaleHeaderFormatSelect.value = 'DayOfWeekAbbreviation';
            zoomLevelTextBox.value = '5';
            break;
        case 'Hours':
            minorScaleHeaderFormatSelect.value = 'Hour';
            zoomLevelTextBox.value = '25';
            break;
    }
}
minorScaleTypeSelect.addEventListener('change', updateFromSelectedMinorScaleType);

// Set scales collection and related settings based on user selections.
function initializeScales() {
    var scales = [];
    if (nonworkingDaysCheckBox.checked)
        scales.push({ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (theme == 'Dark-black' ? '#333333' : (theme == 'Steel-blue' ? '#95a5b2' : '#f8f8f8')) });
    scales.push({ scaleType: majorScaleTypeSelect.value, headerTextFormat: majorScaleHeaderFormatSelect.value, headerStyle: 'padding: 7px 5px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: majorScaleSeparatorCheckBox.checked, separatorStyle: 'stroke: #c8bfe7; stroke-width: 1px' });
    scales.push({ scaleType: minorScaleTypeSelect.value, headerTextFormat: minorScaleHeaderFormatSelect.value, headerStyle: 'padding: 7px 5px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: minorScaleSeparatorCheckBox.checked, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.25px' });
    if (currentTimeCheckBox.checked)
        scales.push({ scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' });
    settings.scales = scales;
    settings.weekStartDay = !mondayBasedCheckBox.checked ? 0 : 1;
    var hourWidth = parseFloat(zoomLevelTextBox.value);
    if (hourWidth > 0)
        settings.hourWidth = hourWidth;
    settings.timelineStart = new Date(year, month, 1);
    settings.timelineFinish = new Date(year + (majorScaleTypeSelect.value == 'Years' ? 2 : (minorScaleTypeSelect.value != 'Hours' ? 1 : 0)), month + (minorScaleTypeSelect.value != 'Hours' ? 0 : 1), 1);
    if (ganttChartView)
        ganttChartView.refresh();
}
initializeScales();

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);

// Update scales collection upon user commands.
majorScaleTypeSelect.addEventListener('change', initializeScales);
majorScaleHeaderFormatSelect.addEventListener('change', initializeScales);
majorScaleSeparatorCheckBox.addEventListener('change', initializeScales);
minorScaleTypeSelect.addEventListener('change', initializeScales);
minorScaleHeaderFormatSelect.addEventListener('change', initializeScales);
minorScaleSeparatorCheckBox.addEventListener('change', initializeScales);
mondayBasedCheckBox.addEventListener('change', initializeScales);
nonworkingDaysCheckBox.addEventListener('change', initializeScales);
currentTimeCheckBox.addEventListener('change', initializeScales);
zoomLevelTextBox.addEventListener('change', initializeScales);
zoomLevelTextBox.addEventListener('keyup', initializeScales);
