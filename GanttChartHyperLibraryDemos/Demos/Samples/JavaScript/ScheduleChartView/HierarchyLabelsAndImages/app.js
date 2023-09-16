/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
// Prepare data items.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [
    { content: 'Project Managers', start: new Date() },
    {
        content: 'Steven Bright', image: 'Steven.png', role: 'Architect', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Arhitecture', label: 'Architecture', start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }]
    },
    {
        content: 'Jane Gershwin', image: 'Jane.png', role: 'Technical Lead', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Requirements', label: 'Requirements', start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 8, 10, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Review', label: 'Review', start: new Date(year, month, 12, 16, 0, 0), isMilestone: true },
            { content: 'Design', label: 'Design', start: new Date(year, month, 14, 12, 0, 0), finish: new Date(year, month, 17, 16, 0, 0) }]
    },
    { content: 'JavaScript', start: new Date() },
    {
        content: 'Victor Duncan', image: 'Victor.png', role: 'Senior developer', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Chart', label: 'Chart', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Bars', label: 'Bars', start: new Date(year, month, 11, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) },
            { content: 'Summary bars', label: 'Summary bars', start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) }]
    },
    {
        content: 'Johanna Mcamis', image: 'Johanna.png', role: 'Developer', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Date-times', label: 'Date-times', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Headers', label: 'Headers', start: new Date(year, month, 11, 12, 0, 0), finish: new Date(year, month, 14, 12, 0, 0) },
            { content: 'Intervals', label: 'Intervals', start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) }]
    },
    {
        content: 'Denis Kaelin', image: 'Denis.png', role: 'Tester', indentation: 1, start: new Date(), ganttChartItems: [
            { content: 'Quality assurance', label: 'Quality assurance', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Automation testing functions', label: 'Automation testing functions', start: new Date(year, month, 17, 8, 0, 0), finish: new Date(year, month, 22, 16, 0, 0) }]
    },
    { content: '.NET', start: new Date() },
    {
        content: 'Diane McField', image: 'Diane.png', role: 'Senior Developer', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Diagram functions', label: 'Diagram functions', start: new Date(year, month, 7, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    {
        content: 'Albert Makhow', image: 'Albert.png', role: 'Developer', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Schedules', label: 'Schedules', start: new Date(year, month, 7, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    {
        content: 'Tyson Lamberson', image: 'Tyson.png', role: 'Developer', indentation: 1, start: new Date(), ganttChartItems:
            [{ content: 'Scales', label: 'Scales', start: new Date(year, month, 7, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    }];

scheduleChartItems[2].ganttChartItems[1].predecessors = [{ item: scheduleChartItems[2].ganttChartItems[0] }];
scheduleChartItems[4].ganttChartItems[0].predecessors = [{ item: scheduleChartItems[2].ganttChartItems[0] }];
scheduleChartItems[4].ganttChartItems[1].predecessors = [{ item: scheduleChartItems[4].ganttChartItems[0] }];
scheduleChartItems[5].ganttChartItems[1].predecessors = [{ item: scheduleChartItems[5].ganttChartItems[0] }];
// Prepare control settings.
var settings = {
    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 5, 12, 0, 0),
    gridWidth: '35%',
    chartWidth: '65%'
};

settings.areTaskDependenciesVisible = true;
var columns = ScheduleChartView.getDefaultColumns(scheduleChartItems, settings);
columns[0].width = 144;

columns.push({ header: 'Role', width: 108, cellTemplate: function (item) { return DlhSoft.Controls.ScheduleChartView.textInputColumnTemplateBase(document, 100, function () { return item.role; }, function (value) { item.role = value; }); } });
columns.push({ header: 'Image', width: 44, cellTemplate: DlhSoft.Controls.GanttChartView.getIconColumnTemplate(getImage, null, 'width: 20px; height: 20px; border-radius: 50%;') });

settings.columns = columns;
settings.areStandardTaskLabelsVisible = true;
settings.areMilestoneTaskLabelsVisible = true;
// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);

function getImage(item) {
    if (item.indentation == 0) {
        return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // empty image
    }
    else {
        return 'Images/' + item.image;
    }
}