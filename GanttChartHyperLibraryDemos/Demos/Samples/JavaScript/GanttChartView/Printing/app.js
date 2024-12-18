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

var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    itemClass: 'grid-item'
};

settings.areStandardTaskLabelsVisible = true;
settings.areSummaryTaskLabelsVisible = true;
settings.areMilestoneTaskLabelsVisible = true;
settings.summaryLabelStyle = 'color: #eee;';
settings.standardLabelStyle = 'color: #daae66;';
settings.milestoneLabelStyle = 'color: #DB7A49;';

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

DlhSoft.Controls.GanttChartView.initialize(ganttChartView, items, settings);

var DatePicker = DlhSoft.Controls.DatePicker;
var printingOptionsDialog = document.getElementById('printingOptionsDialog');
var startInput = document.getElementById('startDateTimelineEditor');
var finishInput = document.getElementById('finishDateTimelineEditor');
var columnsList = document.getElementById('columnsList');
var columnsDivCreated = false;
function openPrintingOptionsDialog() {
    DatePicker.initialize(startInput, DlhSoft.Controls.GanttChartView.getOutputDate(ganttChartView.getProjectStart()), { defaultTimeOfDay: 8 * 60 * 60 * 1000 });
    DatePicker.initialize(finishInput, DlhSoft.Controls.GanttChartView.getOutputDate(ganttChartView.getProjectFinish()), { defaultTimeOfDay: 16 * 60 * 60 * 1000 });
    if (!columnsDivCreated) {
        for (var i = 0; i < settings.columns.length; i++) {
            var column = settings.columns[i];
            var div = document.createElement("div");
            div.style = "margin: 6px;";
            columnsList.appendChild(div);
            var cb = document.createElement("input");
            cb.setAttribute("type", "checkbox");
            cb.setAttribute("id", "columnCheckBox_" + i);
            cb.setAttribute("style", "margin-right: 4px;");
            cb.setAttribute("value", column.header);
            cb.checked = true;
            div.appendChild(cb);
            var label = document.createElement("label");
            var txt = document.createTextNode(column.header);
            label.setAttribute("for", column.Header);
            label.appendChild(txt);
            div.appendChild(label);
        }
        columnsDivCreated = true;
    }    
    printingOptionsDialog.style.display = 'block';
}
var printingThreshold = 12000000;
function print() {
    // Determine timeline to be printed.
    var timelineStart = new Date(startInput.value);
    var timelineFinish = new Date(finishInput.value);
    if (timelineStart > timelineFinish) {
        alert('The selected dates are incorrect. Please choose a valid timeline.');
        return;
    }
    // Determine columns to be printed (having their checkboxes checked).
    var listOfColumnIndexes = [];
    var gridWidth = 0;
    for (var i = 0; i < settings.columns.length; i++) {
        var cb = document.getElementById('columnCheckBox_' + i);
        if (cb.checked == true) {
            listOfColumnIndexes.push(i);
            gridWidth += settings.columns[i].width;
        }
    }
    // Find items range to be printed.
    var minIndex = null, maxIndex = null;
    for (var i = 0; i < ganttChartView.items.length; i++) {
        var item = ganttChartView.items[i];
        if (item.finish < timelineStart || item.start > timelineFinish)
            continue;
        if (minIndex == null)
            minIndex = i;
        maxIndex = i;
    }
    // Ensure size of printed output is below a certain threshold.
    var itemsCount = maxIndex - minIndex + 1;
    var timelineHours = DlhSoft.Controls.GanttChartView.getEffort(
        timelineStart, timelineFinish,
        {
            workingWeekStart: ganttChartView.settings.visibleWeekStart, workingWeekFinish: ganttChartView.settings.visibleWeekFinish,
            visibleDayStart: ganttChartView.settings.visibleDayStart, visibleDayFinish: ganttChartView.settings.visibleDayFinish
        }) / (60 * 60 * 1000);
    if (itemsCount * settings.itemHeight * (gridWidth + timelineHours * settings.hourWidth) > printingThreshold) {
        alert('The printed output would be too big. Please select a shorter timeline and/or fewer columns.');
        return;
    }
    // Actually export and print content.
    ganttChartView.print({ title: 'Gantt Chart (printable)', isGridVisible: true, columnIndexes: listOfColumnIndexes, startRowIndex: minIndex, endRowIndex: maxIndex, timelineStart: timelineStart, timelineFinish: timelineFinish, preparingMessage: '...' });
    printingOptionsDialog.style.display = 'none';
}
function close() {
    printingOptionsDialog.style.display = 'none';
}
