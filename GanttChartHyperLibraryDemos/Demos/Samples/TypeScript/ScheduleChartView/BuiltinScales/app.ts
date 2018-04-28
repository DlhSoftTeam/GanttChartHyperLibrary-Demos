﻿/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTemplates;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = <HTMLElement>document.querySelector('#scheduleChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = <ScheduleChartItem[]>[
    { content: 'Resource 1', start: new Date(), ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
    {
        content: 'Resource 2', start: new Date(), ganttChartItems: [
            { content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    { content: 'Resource 3', start: new Date(), ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
for (var i = 4; i <= 16; i++)
    scheduleChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
            { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
    });

var settings = <ScheduleChartView.Settings>{
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
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
var updateScaleSelect = <HTMLSelectElement>document.querySelector('#updateScaleSelect');

// Prepare supported scale types and header formats, and a few available udpate scale options.
var availableScaleTypes = ['Years', 'Months', 'Weeks', 'Days', 'Hours'];
var availableHeaderFormats = ['DateTime', 'Date', 'Hour', 'DayOfWeek', 'DayOfWeekAbbreviation', 'Day', 'Month', 'MonthAbbreviation', 'Year', 'MonthYear', 'Localized'];
var availableUpdateScaleItems = { 'Free': 1, '15 min': 15 * 60 * 1000, 'Hour': 60 * 60 * 1000, 'Day': 24 * 60 * 60 * 1000 };

// Initialize available and selected options for scale type and header format select elements, and values for other input and select elements.
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
for (var key in availableUpdateScaleItems) {
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(key));
    option.value = availableUpdateScaleItems[key];
    option.selected = key == '15 min';
    updateScaleSelect.appendChild(option);
}

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
    settings.updateScale = parseFloat(updateScaleSelect.value);
    settings.weekStartDay = !mondayBasedCheckBox.checked ? 0 : 1;
    var hourWidth = parseFloat(zoomLevelTextBox.value);
    if (hourWidth > 0)
        settings.hourWidth = hourWidth;
    settings.timelineStart = new Date(year, month, 1);
    settings.timelineFinish = new Date(year + (majorScaleTypeSelect.value == 'Years' ? 2 : (minorScaleTypeSelect.value != 'Hours' ? 1 : 0)), month + (minorScaleTypeSelect.value != 'Hours' ? 0 : 1), 1);
    if (scheduleChartView) {
        settings.timelineStart = DlhSoft.Controls.ScheduleChartView.getInputDate(settings.timelineStart);
        settings.timelineFinish = DlhSoft.Controls.ScheduleChartView.getInputDate(settings.timelineFinish);
        scheduleChartView.refresh();
    }
}
initializeScales();

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);

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
updateScaleSelect.addEventListener('change', initializeScales);
