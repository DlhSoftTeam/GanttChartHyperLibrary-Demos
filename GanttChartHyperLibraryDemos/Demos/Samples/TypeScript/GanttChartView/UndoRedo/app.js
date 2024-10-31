/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
/// <reference path='./Scripts/DlhSoft.UndoManagementLibrary.d.ts'/>
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

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
// Set up undo-redo stack.
var undoStack = new DlhSoft.UndoManagementLibrary.UndoStack();
var recordedPropertyNames = ['content', 'start', 'finish', 'completedFinish', 'isMilestone', 'assignmentsContent', 'predecessors'];
function getValue(item, propertyName) {
    switch (propertyName) {
        default:
            return item[propertyName];
        case 'predecessors':
            return ganttChartView.getItemPredecessorsString(item);
    }
}
function setValue(item, propertyName, value) {
    switch (propertyName) {
        case 'content':
            ganttChartView.setItemContent(item, value);
            ganttChartView.refreshItem(item);
            return;
        case 'start':
            ganttChartView.setItemStart(item, value);
            ganttChartView.refreshItemNeighbourhood(item);
            return;
        case 'finish':
            ganttChartView.setItemFinish(item, value);
            ganttChartView.refreshItemNeighbourhood(item);
            return;
        case 'completedFinish':
            ganttChartView.setItemCompletion(item, DlhSoft.Controls.GanttChartView.getCompletion(item.start, value, item.finish, settings));
            if (item.completedFinish == item.start)
                ganttChartView.setItemAsNotStarted(item);
            else if (item.completedFinish == item.finish)
                ganttChartView.setItemAsCompleted(item);
            ganttChartView.refreshItemNeighbourhood(item);
            return;
        case 'isMilestone':
            ganttChartView.setItemIsMilestone(item, value);
            item['milestoneInput'].checked = value;
            ganttChartView.refreshItemNeighbourhood(item);
            return;
        case 'assignmentsContent':
            ganttChartView.setItemAssignmentsContent(item, value);
            item['assignmentsContentInput'].value = value ? value : '';
            ganttChartView.refreshChartItem(item);
            return;
        case 'predecessors':
            ganttChartView.setItemPredecessorsString(item, value);
            ganttChartView.refreshItemNeighbourhood(item);
            return;
    }
}
function recordItemValues(item) {
    var recordedValues = {};
    for (var j = 0; j < recordedPropertyNames.length; j++) {
        var propertyName = recordedPropertyNames[j];
        recordedValues[propertyName] = getValue(item, propertyName);
    }
    item['recordedValues'] = recordedValues;
}
function recordItemsValues() {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        recordItemValues(item);
    }
}
recordItemsValues();
settings.itemPropertyChangeHandler = function (item, propertyName) {
    if (isDuringUndoRedo || recordedPropertyNames.indexOf(propertyName) < 0)
        return;
    var recordedValues = item['recordedValues'];
    var recordedValue = recordedValues[propertyName];
    var currentValue = getValue(item, propertyName);
    undoStack.record(function () { setValue(item, propertyName, currentValue); }, function () { setValue(item, propertyName, recordedValue); });
    recordedValues[propertyName] = currentValue;
};
// Command handling.
function addNewItem() {
    var item = { content: 'New task', start: new Date(), finish: new Date() };
    recordItemValues(item);
    undoStack.doAndRecord(function () {
        ganttChartView.addItem(item);
        ganttChartView.selectItem(item);
        ganttChartView.scrollToItem(item);
        ganttChartView.scrollToDateTime(item.start);
    }, function () {
        ganttChartView.removeItem(item);
    });
}
function deleteItem() {
    var item = ganttChartView.getSelectedItem();
    if (item == null)
        return;
    undoStack.doAndRecord(function () {
        ganttChartView.removeItem(item);
    }, function () {
        ganttChartView.insertItem(item.index, item);
        ganttChartView.selectItem(item);
        ganttChartView.scrollToItem(item);
        ganttChartView.scrollToDateTime(item.start);
    });
}
function increaseItemIndentation() {
    var item = ganttChartView.getSelectedItem();
    if (item == null)
        return;
    if (item.index == 0 || item.indentation > items[item.index - 1].indentation)
        return;
    undoStack.doAndRecord(function () {
        ganttChartView.increaseItemIndentation(item);
        ganttChartView.scrollToItem(item);
    }, function () {
        ganttChartView.decreaseItemIndentation(item);
        ganttChartView.scrollToItem(item);
    });
}
function decreaseItemIndentation() {
    var item = ganttChartView.getSelectedItem();
    if (item == null)
        return;
    if (item.indentation == 0)
        return;
    undoStack.doAndRecord(function () {
        ganttChartView.decreaseItemIndentation(item);
        ganttChartView.scrollToItem(item);
    }, function () {
        ganttChartView.increaseItemIndentation(item);
        ganttChartView.scrollToItem(item);
    });
}
var relatedActionSpan = 500, isDuringUndoRedo = false;
function undo() {
    if (!undoStack.getCanUndo()) {
        alert('There is no completed action that may be undone.');
        return;
    }
    isDuringUndoRedo = true;
    undoStack.undo(relatedActionSpan);
    setTimeout(function () {
        recordItemsValues();
        isDuringUndoRedo = false;
    }, relatedActionSpan);
}
function redo() {
    if (!undoStack.getCanRedo()) {
        alert('There is no undone action that may be redone.');
        return;
    }
    isDuringUndoRedo = true;
    undoStack.redo(relatedActionSpan);
    setTimeout(function () {
        recordItemsValues();
        isDuringUndoRedo = false;
    }, relatedActionSpan);
}
