/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
var GanttChartView = DlhSoft.Controls.GanttChartView;
var ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
// Retrieve and store the control element for reference purposes.
var scheduleChartViewElement = document.querySelector('#scheduleChartView');
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var scheduleChartItems = [
    {
        content: 'Steven Bright', image: 'Steven.png', role: 'Architect', start: new Date(), ganttChartItems:
            [{ content: 'Arhitecture', label: 'Architecture', start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }]
    },
    {
        content: 'Jane Gershwin', image: 'Jane.png', role: 'Technical Lead', start: new Date(), ganttChartItems: [
            { content: 'Requirements', label: 'Requirements', start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 8, 10, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Review', label: 'Review', start: new Date(year, month, 12, 16, 0, 0), isMilestone: true },
            { content: 'Design', label: 'Design', start: new Date(year, month, 14, 12, 0, 0), finish: new Date(year, month, 17, 16, 0, 0) }]
    },
    {
        content: 'Victor Duncan', image: 'Victor.png', role: 'Senior developer', start: new Date(), ganttChartItems: [
            { content: 'Chart', label: 'Chart', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Bars', label: 'Bars', start: new Date(year, month, 11, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) },
            { content: 'Summary bars', label: 'Summary bars', start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) }]
    },
    {
        content: 'Johanna Mcamis', image: 'Johanna.png', role: 'Developer', start: new Date(), ganttChartItems: [
            { content: 'Date-times', label: 'Date-times', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 12, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Headers', label: 'Headers', start: new Date(year, month, 11, 12, 0, 0), finish: new Date(year, month, 14, 12, 0, 0) },
            { content: 'Intervals', label: 'Intervals', start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) }]
    },
    {
        content: 'Denis Kaelin', image: 'Denis.png', role: 'Tester', start: new Date(), ganttChartItems: [
            { content: 'Quality assurance', label: 'Quality assurance', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Automation testing functions', label: 'Automation testing functions', start: new Date(year, month, 17, 8, 0, 0), finish: new Date(year, month, 22, 16, 0, 0) }]
    },
    {
        content: 'Diane McField', image: 'Diane.png', role: 'Senior Developer', start: new Date(), ganttChartItems:
            [{ content: 'Diagram functions', label: 'Diagram functions', start: new Date(year, month, 7, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    {
        content: 'Albert Makhow', image: 'Albert.png', role: 'Developer', start: new Date(), ganttChartItems:
            [{ content: 'Schedules', label: 'Schedules', start: new Date(year, month, 7, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    },
    {
        content: 'Tyson Lamberson', image: 'Tyson.png', role: 'Developer', start: new Date(), ganttChartItems:
            [{ content: 'Scales', label: 'Scales', start: new Date(year, month, 7, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
    }
];

var settings = {
    currentTime: new Date(year, month, 2, 12, 0, 0),
    alternativeChartItemStyle: 'fill: transparent;',
    isIndividualItemNonworkingTimeHighlighted: true,
    areStandardTaskLabelsVisible: true
};

scheduleChartItems[1].ganttChartItems.splice(0, 0, {
    schedule: {
        workingWeekStart: 2, workingWeekFinish: 5, // Tuesday - Friday
        workingDayStart: 9 * 60 * 60 * 1000, workingDayFinish: 14 * 60 * 60 * 1000, // 9 AM - 14 PM
        specialNonworkingDays: [new Date(year, month, 14), new Date(year, month, 16)]
    }
});

scheduleChartItems[2].ganttChartItems.splice(0, 0, {
    schedule: {
        specialNonworkingDays: [new Date(year, month, 4), new Date(year, month, 22)]
    }
});

scheduleChartItems[5].ganttChartItems.splice(0, 0, {
    schedule: {
        workingWeekStart: 1, workingWeekFinish: 4, // Monday - Thursday
        workingDayStart: 8 * 60 * 60 * 1000, workingDayFinish: 16 * 60 * 60 * 1000, // 8 AM - 16 PM
        specialNonworkingDays: [new Date(year, month, 10), new Date(year, month, 16)]
    }
});

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var scheduleChartView = DlhSoft.Controls.ScheduleChartView.initialize(scheduleChartViewElement, scheduleChartItems, settings);
//# sourceMappingURL=app.js.map