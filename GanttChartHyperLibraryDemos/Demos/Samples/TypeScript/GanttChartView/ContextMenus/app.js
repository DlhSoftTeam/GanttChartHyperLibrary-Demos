/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = document.querySelector('#ganttChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth(), dayDuration = 24 * 60 * 60 * 1000;
var items = [
    { content: 'Task 1', isExpanded: false, start: new Date() },
    { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
    { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
    { content: 'Task 2', isExpanded: true, start: new Date() },
    { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
    { content: 'Task 2.2', indentation: 1, start: new Date() },
    { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
    { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }
];
items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
for (var i = 4; i <= 16; i++)
    items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };
// Set up context menus.
settings.itemContextMenuHandler = itemContextMenuHandler;
settings.predecessorItemContextMenuHandler = predecessorItemContextMenuHandler;
// Optionally, initialize custom theme and templates (themes.js, templates.js).
initializeGanttChartTheme(settings, theme);
initializeGanttChartTemplates(settings, theme);
// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
// Support for context menus.
function itemContextMenuHandler(e, item) {
    var itemContextMenu = document.getElementById("itemContextMenu");
    itemContextMenu.style.display = "block";
    itemContextMenu.style.left = e.clientX + "px";
    itemContextMenu.style.top = e.clientY + "px";
    e.preventDefault();
    var deleteItemContextMenu = document.getElementById("deleteItemContextMenu");
    contextMenuItem = item;
    deleteItemContextMenu.addEventListener("mousedown", deleteItemContextMenuClicked);
}
function predecessorItemContextMenuHandler(e, predecessorItem, targetItem) {
    var dependencyContextMenu = document.getElementById("dependencyContextMenu");
    dependencyContextMenu.style.display = "block";
    dependencyContextMenu.style.left = e.clientX + "px";
    dependencyContextMenu.style.top = e.clientY + "px";
    e.preventDefault();
    var deleteDependencyContextMenu = document.getElementById("deleteDependencyContextMenu");
    contextMenuItem = targetItem;
    contextMenuPredecessorItem = predecessorItem;
    deleteDependencyContextMenu.addEventListener("mousedown", deleteDependencyContextMenuClicked);
}
;
function hideContextMenus() {
    var itemContextMenu = document.getElementById("itemContextMenu");
    itemContextMenu.style.display = "none";
    var deleteItemContextMenu = document.getElementById("deleteItemContextMenu");
    deleteItemContextMenu.removeEventListener("mousedown", deleteItemContextMenuClicked);
    var dependencyContextMenu = document.getElementById("dependencyContextMenu");
    dependencyContextMenu.style.display = "none";
    var deleteDependencyContextMenu = document.getElementById("deleteDependencyContextMenu");
    deleteDependencyContextMenu.removeEventListener("mousedown", deleteDependencyContextMenuClicked);
    contextMenuItem = null;
    contextMenuPredecessorItem = null;
}
var contextMenuItem;
var contextMenuPredecessorItem;
function deleteItemContextMenuClicked(e) {
    ganttChartView.removeItem(contextMenuItem);
    hideContextMenus();
    e.stopPropagation();
}
function deleteDependencyContextMenuClicked(e) {
    let index = contextMenuItem.predecessors.indexOf(contextMenuPredecessorItem);
    if (index >= 0) {
        contextMenuItem.predecessors.splice(index, 1);
        ganttChartView.refreshChartItem(contextMenuItem);
    }
    hideContextMenus();
}
document.addEventListener("mousedown", function(e) {
    hideContextMenus();
    e.preventDefault();
});
//# sourceMappingURL=app.js.map