// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

var ganttChartView = document.querySelector('#ganttChartView');
var treeGridPopup = document.querySelector('#treeGridPopup');
var treeGrid = document.querySelector('#treeGrid');
var updateAssignmentsButton = document.querySelector('#updateAssignmentsButton');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [{ content: 'Task 1', isExpanded: false },
             { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
             { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0) },
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

var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Prepare the columns collection, updating the Assignments column cell template.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
columns.splice(2, 3); // Remove all default columns, except Task and Assignments.

// Define prefix and suffix to optionally display for resource group names. You may set these as empty strings if you wish.
// Do not use brackets characters though, as those characters are used in the assignments string syntax for defining allocation units (e.g. [50%]).
var resourceGroupNamePrefix = '{', resourceGroupNameSuffix = '}';

var assignmentsColumn = columns[2];
assignmentsColumn.cellTemplate = function (item) {
    // Define an input element to allow editing of the Gantt Chart item's assignments string.
    var document = item.ganttChartView.ownerDocument;
    var input = document.createElement('input');
    input.setAttribute('style', 'border: none; width: ' + (assignmentsColumn.width - 16) + 'px');
    input.value = item.assignmentsContent ? item.assignmentsContent : '';
    // When the value changes, refresh the Gantt Chart.
    input.addEventListener('change', function (e) {
        item.assignmentsContent = input.value;
        ganttChartView.refreshChartItem(item);
    });
    // Upon clicking the assignments input, show a tree-grid popup displaying grouped resources.
    input.addEventListener('click', function (e) {
        // Unfocus the input element.
        input.blur();
        // Show tree-grid popup.
        treeGridPopup.style.display = 'block';
        // Initialize resources to display in tree-grid.
        var resourceHierarchy = [
            { content: 'Department A' },
            { content: 'Resource 1', role: 'Role 1', indentation: 1 },
            { content: 'Resource 2', role: 'Role 2', indentation: 1 },
            { content: 'Department B' },
            { content: 'Resource 3', role: 'Role 1', indentation: 1 },
            { content: 'Department B1', indentation: 1 },
            { content: 'Resource 4', role: 'Role 3', indentation: 2 },
            { content: 'Resource 5', role: 'Role 1', indentation: 2 }
        ];
        // Prepare tree-grid control settings.
        var treeGridSettings = {
            isReadOnly: true,
            selectionMode: 'ExtendedFocus'
        };
        // Prepare tree-grid columns.
        var treeGridColumns = DlhSoft.Controls.TreeGrid.getDefaultColumns(resourceHierarchy, treeGridSettings);
        treeGridColumns[1].header = 'Resource';
        // Define an allocation percent column.
        treeGridColumns.push({
            header: 'Allocation %', cellTemplate: function (resource) {
                return DlhSoft.Controls.TreeGrid.numberInputColumnTemplateBase(document, 160,
                    function () { return resource.allocationPercent ? resource.allocationPercent : 100 },
                    // Apply updated percent to the bound resource item.
                    function (value) { resource.allocationPercent = value; });
            }
        });
        // Optionally, add other custom columns as needed.
        treeGridColumns.push({ header: 'Role', cellTemplate: function (resource) { return document.createTextNode(resource.role ? resource.role : ''); } });
        treeGridSettings.columns = treeGridColumns;
        var isDuringInternalParentUnselectionOperation;
        treeGridSettings.itemSelectionChangeHandler = function (item, isSelected) {
            // When a group of resources gets selected or unselected, also select or unselect its child resources, except if this is an internal operation.
            if (item.hasChildren && !isDuringInternalParentUnselectionOperation) {
                for (var i = 0; i < item.children.length; i++) {
                    var actionToApply = isSelected ? treeGrid.selectItem : treeGrid.unselectItem;
                    actionToApply(item.children[i]);
                }
            }
            // When a resource gets unselected, also unselect its parent groups if they were selected.
            if (!item.hasChildren && !isSelected) {
                isDuringInternalParentUnselectionOperation = true;
                while (item = item.parent)
                    treeGrid.unselectItem(item);
                isDuringInternalParentUnselectionOperation = false;
            }
        };
        // Initialize tree-grid component.
        DlhSoft.Controls.TreeGrid.initialize(treeGrid, resourceHierarchy, treeGridSettings);
        // Initialize tree-grid item selection based on Gantt Chart item's assigned resources, and set up allocation values accordingly.
        var assignments = ganttChartView.getItemAssignments(item);
        var assignedResources = ganttChartView.getItemAssignedResources(item);
        for (var i = 0; i < resourceHierarchy.length; i++) {
            var resource = resourceHierarchy[i];
            var assignmentIndex = assignedResources.indexOf(resource.content);
            if (assignmentIndex < 0)
                assignmentIndex = assignedResources.indexOf(resourceGroupNamePrefix + resource.content + resourceGroupNameSuffix);
            if (assignmentIndex >= 0) {
                treeGrid.selectItem(resource);
                var allocation = assignments[assignmentIndex].value;
                if (allocation != 1) {
                    resource.allocationPercent = allocation * 100;
                    treeGrid.refreshItem(resource);
                }
            }
        }
        // Set up update assignments button content.
        updateAssignmentsButton.value = 'Update assignments for ' + item.content;
    });
    return input;
};
settings.columns = columns;

// Optionally, set up auto-scheduling behavior for dependent tasks based on predecessor information, supplementary disallowing circular dependencies.
settings.areTaskDependencyConstraintsEnabled = true;

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

// Handle updating selected item assignments content based on tree-grid selection.
updateAssignmentsButton.addEventListener('click', function (e) {
    // Determine the Gantt Chart item to apply assignments to.
    var item = ganttChartView.getSelectedItem();
    // Determine assignments string to apply as assignmentsContent for the item based on selected assignment items of tree-grid.
    var assignments = '';
    var selectedAssignments = treeGrid.getSelectedItems();
    for (var i = 0; i < selectedAssignments.length; i++) {
        if (assignments)
            assignments += ', ';
        var selectedAssignment = selectedAssignments[i];
        // Handle resource groups.
        if (selectedAssignment.hasChildren) {
            // Determine whether all children are selected for the group.
            var areAllChildrenSelected = true;
            for (var j = 0; j < selectedAssignment.children; j++) {
                if (!selectedAssignment.children[j].isSelected) {
                    areAllChildrenSelected = false;
                    break;
                }
            }
            // When all child resources of a group are selected we display the group name in a special format instead of the resource list.
            // Note that this will introduce limitations if you plan to use LevelResources or other assignment related algorithms: 
            // in that case you need to temporarily reset assigmmentsContent of items that have entire groups assigned to the actual resource names until the algorithm completes.
            if (areAllChildrenSelected) {
                assignments += resourceGroupNamePrefix + selectedAssignment.content + resourceGroupNameSuffix;
                // Skip all children of all indentation levels of the selected group.
                while (isInGroup(selectedAssignments[++i], selectedAssignment));
                i--;
            }
        }
        else {
            // Handle individual resources.
            assignments += selectedAssignment.content;
        }
        // Append allocation percent.
        if (selectedAssignment.allocationPercent && selectedAssignment.allocationPercent != 100)
            assignments += ' [' + selectedAssignment.allocationPercent + '%]';
    }
    // Apply computed assignments string to Gantt Chart item.
    item.assignmentsContent = assignments;
    ganttChartView.refreshItem(item);
    // Hide tree-grid popup.
    treeGridPopup.style.display = 'none';
});

// Determines if an items is in a specified group.
function isInGroup(item, parent) {
    if (item == null || parent == null)
        return false;
    if (item == parent)
        return true;
    return isInGroup(item.parent, parent);
}

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
