﻿// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

var ganttChartView = document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [{ content: 'Task 1', isExpanded: false },
             { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
             { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
             { content: 'Task 2', isExpanded: true },
             { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
             { content: 'Task 2.2', indentation: 1 },
             { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
             { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
             { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });

items[6].baselineStart = new Date(year, month, 10, 8, 0, 0);
items[6].baselineFinish = new Date(year, month, 11, 16, 0, 0);
items[7].baselineStart = new Date(year, month, 8, 8, 0, 0);
items[7].baselineFinish = new Date(year, month, 11, 16, 0, 0);
items[8].baselineStart = new Date(year, month, 12, 8, 0, 0);

var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
settings.itemClass = "grid-item";

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Optionally, provide a selection column.
// settings.selectionMode = 'Extended';

// Initialize extra columns.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;
columns.splice(0 + indexOffset, 0, { header: '', width: 32, cellTemplate: DlhSoft.Controls.GanttChartView.getIconColumnTemplate('Images/checkmark.png', null, 'width: 16px; height: 16px; margin-top: 2px', true, undefined, undefined, 'background: #f8f8f8') });
columns.splice(1 + indexOffset, 0, { header: '', width: 40, cellTemplate: DlhSoft.Controls.GanttChartView.getIndexColumnTemplate() });
columns.splice(2 + indexOffset, 0, { header: 'WBS', width: 50, cellTemplate: DlhSoft.Controls.GanttChartView.getWbsColumnTemplate() });

columns.push({ header: 'Est. start', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getBaselineStartColumnTemplate(124) });
columns.push({ header: 'Est. finish', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getBaselineFinishColumnTemplate(124) });

// Initialize extra custom item values and associated columns.
items[7].myValue1 = 'A1'; items[8].myValue1 = 'B1'; items[8].myValue2 = 'B2';
columns.push({ header: 'My value 1', width: 80, cellTemplate: function (item) { return DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase(document, 64, function () { return item.myValue1; }, function (value) { item.myValue1 = value; }); } });
columns.push({ header: 'My value 2', width: 80, cellTemplate: function (item) { return DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase(document, 64, function () { return item.myValue2; }, function (value) { item.myValue2 = value; }); } });

settings.columns = columns;

// Optionally, set up auto-scheduling behavior for dependent tasks based on predecessor information, supplementary disallowing circular dependencies.
settings.areTaskDependencyConstraintsEnabled = true;

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

// Refresh the control upon custom operations in order for extra column values to be updated in the user interface.
function addNewItem() {
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.addItem(item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
}
function insertNewItem() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.insertItem(ganttChartView.selectedItem.index, item);
    ganttChartView.refresh();
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
}
function increaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.increaseItemIndentation(item);
    ganttChartView.refresh();
    ganttChartView.scrollToItem(item);
}
function decreaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.decreaseItemIndentation(item);
    ganttChartView.refresh();
    ganttChartView.scrollToItem(item);
}
function deleteItem() {
    if (ganttChartView.selectedItem == null)
        return;
    ganttChartView.removeItem(ganttChartView.selectedItem);
    ganttChartView.refresh();
}
