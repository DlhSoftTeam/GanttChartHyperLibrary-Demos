﻿/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import LoadChartView = DlhSoft.Controls.LoadChartView;
import LoadChartItem = LoadChartView.Item;
import AllocationItem = LoadChartView.AllocationItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeLoadChartTheme;

// Retrieve and store the control element for reference purposes.
var loadChartViewElement = <HTMLElement>document.querySelector('#loadChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var loadChartItems = <LoadChartItem[]>[{
    content: 'Resource 1', start: new Date(), ganttChartItems: [
        { content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
        { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
        { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
        { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }]
    },
    { content: 'Resource 2', start: new Date(), ganttChartItems: [{ content: 'Task 2 (Resource 2)', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) }] }];
for (var i = 3; i <= 16; i++)
    loadChartItems.push({
        content: 'Resource ' + i, start: new Date(), ganttChartItems: [
            { content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), units: 1 },
            { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), units: 1 }]
    });

var settings = <LoadChartView.Settings>{
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, initialize custom themes (themes.js).
initializeLoadChartTheme(settings, theme);

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

// Prepare supported scale types and header formats, and a few available udpate scale options.
var availableScaleTypes = ['Years', 'Months', 'Weeks', 'Days', 'Hours'];
var availableHeaderFormats = ['DateTime', 'Date', 'Hour', 'DayOfWeek', 'DayOfWeekAbbreviation', 'Day', 'Month', 'MonthAbbreviation', 'Year', 'MonthYear', 'Localized'];

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
    scales.push({ scaleType: majorScaleTypeSelect.value, headerTextFormat: majorScaleHeaderFormatSelect.value, headerStyle: 'padding: 7px 5px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: majorScaleSeparatorCheckBox.checked, separatorStyle: 'stroke: #c8bfe7; stroke-width: 1px' });
    scales.push({ scaleType: minorScaleTypeSelect.value, headerTextFormat: minorScaleHeaderFormatSelect.value, headerStyle: 'padding: 7px 5px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: minorScaleSeparatorCheckBox.checked, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.25px' });
    if (currentTimeCheckBox.checked)
        scales.push({ scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: Red; stroke-width: 0.5px' });
    settings.scales = scales;
    settings.weekStartDay = !mondayBasedCheckBox.checked ? 0 : 1;
    var hourWidth = parseFloat(zoomLevelTextBox.value);
    if (hourWidth > 0)
        settings.hourWidth = hourWidth;
    settings.timelineStart = new Date(year, month, 1);
    settings.timelineFinish = new Date(year + (majorScaleTypeSelect.value == 'Years' ? 2 : (minorScaleTypeSelect.value != 'Hours' ? 1 : 0)), month + (minorScaleTypeSelect.value != 'Hours' ? 0 : 1), 1);
    if (loadChartView) {
        settings.timelineStart = DlhSoft.Controls.LoadChartView.getInputDate(settings.timelineStart);
        settings.timelineFinish = DlhSoft.Controls.LoadChartView.getInputDate(settings.timelineFinish);
        loadChartView.refresh();
    }
}
initializeScales();

// Initialize the component.
var loadChartView = DlhSoft.Controls.LoadChartView.initialize(loadChartViewElement, loadChartItems, settings);

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
