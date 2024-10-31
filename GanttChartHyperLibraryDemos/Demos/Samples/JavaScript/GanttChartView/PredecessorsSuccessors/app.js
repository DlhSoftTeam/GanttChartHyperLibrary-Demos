// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

var ganttChartView = document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [{ content: 'Planning', label: 'Planning', isExpanded: false },
{ content: 'Analysis', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
{ content: 'Requirements', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria  [50%], Tyson Lamberson' },
{ content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
{ content: 'Arhitecture', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush [50%], Meeting room' },
{ content: 'Design', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
{ content: 'Development', label: 'Development', isExpanded: true },
{ content: 'Start development', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), isMilestone: true, assignmentsContent: 'Steven Rush' },
{ content: 'Date-times', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
{ content: 'Schedules', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush [50%]' },
{ content: 'Automation testing functions', label: 'Very important!', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
{ content: 'Chart', label: 'Chart', indentation: 1 },
{ content: 'Bars', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 7, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
{ content: 'Summary bars', indentation: 2, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
{ content: 'Review', indentation: 2, start: new Date(year, month, 9, 16, 0, 0), isMilestone: true },
{ content: 'Links', indentation: 2, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
{ content: 'Diagram functions', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
{ content: 'Quality assurance', label: 'Very important!', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0), hasMilestoneAtFinish: true, assignmentsContent: 'Denis Kaelin, Printer' },
{ content: 'Project delivery', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Meeting room' },
{ content: 'Maintenance', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) },
{ content: 'Marketing', label: 'Marketing', start: new Date(year, month, 10, 12, 0, 0), finish: new Date(year, month, 15, 12, 0, 0) },
{ content: 'Preparations', indentation: 1, start: new Date(year, month, 10, 8, 0, 0), isMilestone: true, assignmentsContent: 'Joanna Mcamis, Alicia Rock' },
{ content: 'Colors', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Joanna Mcamis [25%]' },
{ content: 'Logo', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Alicia Rock [25%]' },
{ content: 'Samples app', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 16, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
{ content: 'Screenshots', indentation: 1, start: new Date(year, month, 12, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), assignmentsContent: 'Joanna Mcamis' },
{ content: 'Videos', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0), assignmentsContent: 'Alicia Rock [50%]' }
];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });

var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemClass: 'grid-item'
};

var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;
columns[0 + indexOffset].width = 204;
columns.splice(1 + indexOffset, 0, {
    header: 'Predecessors', width: 200, cellTemplate: (item) => {
        return DlhSoft.Controls.GanttChartView.multiSelectorComboBoxInputColumnTemplateBase(
            document, 196,
            () => { return items.filter((i) => !ganttChartView.itemDependsOf(i, item)).map((i) => i.content.replaceAll(',', '')); },
            () => { return item.predecessors ? item.predecessors.map((p) => p.item.content.replaceAll(',', '')).join(', ') : '' },
            (value) => {
                let allValues = items.map((i) => i.content.replaceAll(',', ''));
                let values = value.split(',').map((v) => v.trim());
                let predecessorsString = values.filter((v) => allValues.indexOf(v) >= 0).map((v) => allValues.indexOf(v)).join(', ');
                ganttChartView.setItemPredecessorsString(item, predecessorsString, true);
                if (item.predecessors) {
                    for (predecessorItem of item.predecessors) {
                        ganttChartView.refreshItem(predecessorItem.item);
                    }
                }
                ganttChartView.refreshItemNeighbourhood(item);
            }
        )
    }
});

columns.splice(2 + indexOffset, 0, {
    header: 'Successors', width: 200, cellTemplate: (item) => {
        return DlhSoft.Controls.GanttChartView.multiSelectorComboBoxInputColumnTemplateBase(
            document, 196,
            () => { return items.filter((i) => !ganttChartView.itemDependsOf(item, i)).map((i) => i.content.replaceAll(',', '')); },
            () => { return ganttChartView.getItemSuccessors(item).map((s) => s.content.replaceAll(',', '')).join(', ') },
            (value) => {
                let allValues = items.map((i) => i.content.replaceAll(',', ''));
                let values = value.split(',').map((v) => v.trim()).filter((v) => allValues.indexOf(v) >= 0);
                let successors = ganttChartView.getItemSuccessors(item);
                let index = items.indexOf(item);
                for (successor of successors) {
                    if (values.indexOf(successor.content) < 0) {
                        let predecessorsString = ', ' + ganttChartView.getItemPredecessorsString(successor) + ',';
                        predecessorsString = predecessorsString.replace(', ' + (index + 1) + ',', ',');
                        ganttChartView.setItemPredecessorsString(successor, predecessorsString);
                        ganttChartView.refreshItemNeighbourhood(successor);
                    }
                }
                for (value of values) {
                    let successor = items[allValues.indexOf(value)];
                    let predecessorsString = ', ' + ganttChartView.getItemPredecessorsString(successor) + ',';
                    if (predecessorsString.indexOf(', ' + (index + 1) + ',') < 0) {
                        predecessorsString = predecessorsString + (index + 1);
                        ganttChartView.setItemPredecessorsString(successor, predecessorsString);
                        ganttChartView.refreshItemNeighbourhood(successor);
                    }
                }
                ganttChartView.refreshItemNeighbourhood(item);
            }
        )
    }
});

settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
    if (isDirect && isFinal && propertyName == 'content') {
        ganttChartView.refreshItemNeighbourhood(item);
        for (var successor of ganttChartView.getItemSuccessors(item))
            ganttChartView.refreshItem(successor);
    }
};

columns[5 + indexOffset].cellClass = 'center-cell';
columns[6 + indexOffset].cellClass = 'center-cell';

settings.columns = columns;

// Optionally, define assignable resources.
settings.assignableResources = ['Clarissa Candelaria', 'Tyson Lamberson', 'Steven Rush',
    'Joanna Mcamis', 'Denis Kaelin', 'Alicia Rock',
    'Meeting room', 'Printer'];
settings.autoAppendAssignableResources = true;

settings.areTaskDependencyConstraintsEnabled = true;

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

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

