// Query string syntax: ?theme
// Supported themes: Generic-blue, Default.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

var ganttChartView = document.querySelector("#ganttChartView");

var date = new Date(), year = 2013, month = 1;
var items = [{ content: "Task 1", isExpanded: false },
             // Add hidden hierarchy placeholders for summary tasks to enable expansion; if possible, also indicate summary durations by pre-setting start and finish values.
             { content: "Task 1 hierarchy placeholder", isHidden: true, indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
             { content: "Task 2", isExpanded: false },
             { content: "Task 2 hierarchy placeholder", isHidden: true, indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) },
             { content: "Task 3", start: new Date(year, month, 15, 16, 0, 0), isMilestone: true }];

var settings = { currentTime: new Date(year, month, 2, 12, 0, 0) };

// Optionally, initialize custom theme and templates (themes.js, templates.js).
if (initializeGanttChartTheme)
    initializeGanttChartTheme(ganttChartView, settings, theme);
if (initializeGanttChartTemplates)
    initializeGanttChartTemplates(ganttChartView, settings, theme);

// Initiate loading sub-item hierarchies for summary items on demand upon expanding them.
settings.itemExpansionChangeHandler = function (item, isExpanded) {
    if (isExpanded)
        loadHierarchy(item);
};

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

var isDuringInternalHierarchyLoading = false;
function loadHierarchy(item) {
    // Avoid recursive item loading thorough expansion change notifications while preparing sub-items.
    if (isDuringInternalHierarchyLoading)
        return;
    var index = item.index + 1;
    var nextItem = index < items.length ? items[index] : null;
    // Ensure we do not try loading hierarchy for the last node nor reload hierarchies for previously expanded nodes.
    if (nextItem == null || !nextItem.isHidden)
        return;
    // Determine the actual sub-items of the expanded summary item.
    var subItems;
    switch (item.content) {
        case "Task 1":
            subItems = [{ content: "Task 1.1", start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
                        { content: "Task 1.2", start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) }];
            break;
        case "Task 2":
            subItems = [{ content: "Task 2.1", start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: "Resource 1, Resource 2 [50%]" },
                        { content: "Task 2.2" },
                        // When needed, add subsquent levels of hierarchy placeholders.
                        { content: "Task 2.2 hierarchy placeholder", isHidden: true, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }];
            break;
        case "Task 2.2":
            subItems = [{ content: "Task 2.2.1", indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0), assignmentsContent: "Resource 2" },
                        { content: "Task 2.2.2", indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: "Resource 2" }];
            break;
    }
    // Replace the original hierarchy placeholder with the actual sub-items.
    ganttChartView.insertItems(index, subItems);
    ganttChartView.removeItem(nextItem);
    // Finally, prepare subsquent hierarchy levels.
    for (var i = 0; i < subItems.length; i++) {
        var subItem = subItems[i];
        var i1 = i + 1;
        var nextSubItem = i1 < subItems.length ? subItems[i1] : null;
        if (nextSubItem && nextSubItem.isHidden) {
            // Increase indentation for the next level placeholder and collapse the summary sub-item, notifying against recursive calls.
            isDuringInternalHierarchyLoading = true;
            ganttChartView.increaseItemIndentation(nextSubItem);
            ganttChartView.collapseItem(subItem);
            isDuringInternalHierarchyLoading = false;
            i = i1;
        }
    }
}
