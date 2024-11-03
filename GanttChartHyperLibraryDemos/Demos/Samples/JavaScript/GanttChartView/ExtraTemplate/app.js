// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Retrieve and store the control element for reference purposes.
var ganttChartView = document.querySelector('#ganttChartView');

// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = [
    { content: 'Planning', label: 'Planning', isExpanded: false },
    { content: 'Analysis', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
    { content: 'Requirements', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria  [50%], Tyson Lamberson' },
    { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
    { content: 'Arhitecture', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush [50%], Meeting room' },
    { content: 'Design', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
    { content: 'Development', label: 'Development', isExpanded: true },
    { content: 'Start development', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), isMilestone: true, assignmentsContent: 'Steven Rush' },
    { content: 'Date-times', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
    { content: 'Schedules', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush [50%]',
        setupTime: new Date(year, month, 6, 12, 0, 0),
        objects: [
            { position: new Date(year, month, 6, 8, 0, 0), positionPin: 'end', positionLevel: 'central', object: '•', fontSize: '32px', color: 'red' },
            { position: new Date(year, month, 7, 13, 0, 0), positionPin: 'start', positionLevel: 'top', object: 'x', fontSize: '16px', color: 'orange' }]
    },
    {
        content: 'Automation testing functions', label: 'Very important', indentation: 1, start: new Date(year, month, 7, 14, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), completedFinish: new Date(year, month, 9, 16, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]',
        setupTime: new Date(year, month, 8, 12, 0, 0),
        objects: [
            { position: new Date(year, month, 7, 12, 0, 0), positionPin: 'end', positionLevel: 'central', object: '•', fontSize: '32px', color: 'purple' },
            { position: new Date(year, month, 14, 13, 0, 0), positionPin: 'start', positionLevel: 'bottom', object: 'x', fontSize: '14px', color: 'blue' }]

    },
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
items[6].predecessors = [{ item: items[0], dependencyType: 'SS' }];
items[4].predecessors = [{ item: items[2], lag: 2 * 60 * 60 * 1000 }];
items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
items[9].assignmentsContent = 'Clarissa Candelaria';
items[10].predecessors = [{ item: items[9] }];

// Prepare control settings.
var settings = {
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};
settings.itemClass = "grid-item";
// Optionally, set labels visibility.
settings.areStandardTaskLabelsVisible = true;
settings.areSummaryTaskLabelsVisible = true;
settings.areMilestoneTaskLabelsVisible = true;

// Also optionally, customize label styles.
// settings.standardLabelStyle = 'color: #1C0825;';
// settings.milestoneLabelStyle = 'color: #E48F56;';

// Optionally, set baseline properties.
items[7].baselineStart = new Date(year, month, 3, 8, 0, 0);
items[8].baselineStart = new Date(year, month, 2, 8, 0, 0);
items[8].baselineFinish = new Date(year, month, 5, 16, 0, 0);
items[9].baselineStart = new Date(year, month, 2, 8, 0, 0);
items[9].baselineFinish = new Date(year, month, 6, 16, 0, 0);

// Prepare the columns collection.
var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
var indexOffset = columns[0].isSelection ? 1 : 0;

// Apply the customized columns collection.
settings.columns = columns;

// Optionally, define assignable resources.
settings.assignableResources = ['Clarissa Candelaria', 'Tyson Lamberson', 'Steven Rush',
                                'Joanna Mcamis', 'Denis Kaelin', 'Alicia Rock',
                                'Meeting room', 'Printer'];
settings.autoAppendAssignableResources = true;

// Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
settings.resourceQuantities = [{ key: 'Meeting room', value: 4 }, { key: 'Printer', value: Infinity }];
items[10].assignmentsContent = 'Meeting room [250%], Printer';
items[11].assignmentsContent = 'Meeting room, Printer [200%]';
items[12].assignmentsContent = 'Meeting room';

// Optionally, define task and resource costs.
// settings.taskInitiationCost = 5;
items[4].executionCost = 50;
// settings.defaultResourceUsageCost = 1;
// settings.specificResourceUsageCosts = [{ key: 'Clarissa Candelaria', value: 2 }, { key: 'Meeting room', value: 7}];
settings.defaultResourceHourCost = 10;
settings.specificResourceHourCosts = [{ key: 'Denis Kaelin', value: 20 }, { key: 'Printer', value: 0.5 }];

// Optionally, set up resource images.
settings.areResourceImagesVisibleAsAssignments = true;
settings.resourceImageUrls = [
    { key: 'Steven Rush', value: 'Images/Steven.png' },
    { key: 'Clarissa Candelaria', value: 'Images/Clarissa.png' },
    { key: 'Tyson Lamberson', value: 'Images/Tyson.png' },
    { key: 'Joanna Mcamis', value: 'Images/Joanna.png' },
    { key: 'Denis Kaelin', value: 'Images/Denis.png' },
    { key: 'Alicia Rock', value: 'Images/Alicia.png' },
    { key: 'Meeting room', value: 'Images/MeetingRoom.png' },
    { key: 'Printer', value: 'Images/Printer.png' }];

settings.extraTaskTemplate = function(item) {
    var ganttChartView = item.ganttChartView;
    var document = ganttChartView.ownerDocument;
    var svgns = 'http://www.w3.org/2000/svg';
    var containerGroup = document.createElementNS(svgns, 'g');
    if (item.objects) {
        for (obj of item.objects) {
            var text = document.createElementNS(svgns, 'text');
            var pos = ganttChartView.getChartPosition(DlhSoft.Controls.GanttChartView.getInputDate(obj.position), settings);
            text.setAttribute('x', pos + (obj.positionPin == 'end' ? -1 : obj.positionPin == 'start' ? 1 : 0));
            text.setAttribute('y', settings.barMargin + settings.barHeight / 2);
            text.setAttribute('text-anchor', obj.positionPin);
            text.setAttribute('dominant-baseline', obj.positionLevel == 'top' ? 'text-after-edge' : obj.positionLevel == 'bottom' ? 'text-before-edge' : 'central');
            text.setAttribute('fill', obj.color);
            text.setAttribute('font-size', obj.fontSize);
            text.setAttribute('style', 'cursor: default;' );
            text.appendChild(document.createTextNode(obj.object));
            containerGroup.appendChild(text);
        }
    }
    if (item.setupTime && item.setupTime > item.start) {
        var left = ganttChartView.getChartPosition(item.start, settings);
        var right = ganttChartView.getChartPosition(DlhSoft.Controls.GanttChartView.getInputDate(item.setupTime), settings);
        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttribute('x', left + 1);
        rect.setAttribute('y', settings.barMargin + 1);
        rect.setAttribute('width', right - left + 1);
        rect.setAttribute('height', settings.barHeight - 2);
        rect.setAttribute('style', 'fill: lightgreen; opacity: 0.5;');
        containerGroup.appendChild(rect);
        rect = document.createElementNS(svgns, 'rect'); // drag thumb
        rect.setAttribute('x', left);
        rect.setAttribute('y', settings.barMargin);
        rect.setAttribute('width', right - left + 1);
        rect.setAttribute('height', settings.barHeight);
        rect.setAttribute('style', 'fill: transparent; cursor: hand');
        DlhSoft.Controls.GanttChartView.initializeTaskDraggingThumbs(rect, null, null, null, item, left, right, null);
        containerGroup.appendChild(rect);
    }
    return containerGroup.childNodes.length > 0 ? containerGroup : null;
};

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

// Define user command functions.
function addNewItem() {
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.addItem(item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
    ganttChartView.scrollToDateTime(new Date(year, month, 1));
    refreshOtherViews();
}
function insertNewItem() {
    if (ganttChartView.selectedItem == null)
        return;
    var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
    ganttChartView.insertItem(ganttChartView.selectedItem.index, item);
    ganttChartView.selectItem(item);
    ganttChartView.scrollToItem(item);
    ganttChartView.scrollToDateTime(new Date(year, month, 1));
    refreshOtherViews();
}
function increaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.increaseItemIndentation(item);
    ganttChartView.scrollToItem(item);
    refreshOtherViews();
}
function decreaseItemIndentation() {
    var item = ganttChartView.selectedItem;
    if (item == null)
        return;
    ganttChartView.decreaseItemIndentation(item);
    ganttChartView.scrollToItem(item);
    refreshOtherViews();
}
function deleteItem() {
    if (ganttChartView.selectedItem == null)
        return;
    ganttChartView.removeItem(ganttChartView.selectedItem, true); // Also remove successors' predecessor information.
    refreshOtherViews();
}

