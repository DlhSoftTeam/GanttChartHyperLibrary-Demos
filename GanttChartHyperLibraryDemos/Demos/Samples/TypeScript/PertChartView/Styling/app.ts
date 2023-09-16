/// <reference path='./Scripts/DlhSoft.ProjectData.PertChart.HTML.Controls.d.ts'/>
import PertChartView = DlhSoft.Controls.Pert.PertChartView;
import PertChartItem = PertChartView.Item;
import PredecessorItem = PertChartView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializePertChartTheme;

// Retrieve and store the control element for reference purposes.
var pertChartViewElement = <HTMLElement>document.querySelector('#pertChartView');

var secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
var items = <PertChartItem[]>[
    { displayedText: '0', content: 'Start' },
    { displayedText: '1', content: 'Task event 1' },
    { displayedText: '2', content: 'Task event 2' },
    { displayedText: '3', content: 'Task event 3' },
    { displayedText: '4', content: 'Finish', displayedRowIndex: 0 }];
items[1].predecessors = [{ item: items[0], displayedText: 'A', content: 'Task A', effort: 4 * hourDuration }];
items[2].predecessors = [{ item: items[0], displayedText: 'B', content: 'Task B', effort: 2 * hourDuration }];
items[3].predecessors = [{ item: items[2], displayedText: 'C', content: 'Task C', effort: 1 * hourDuration }];
items[4].predecessors = [
    { item: items[1], displayedText: 'D', content: 'Task D', effort: 5 * hourDuration },
    { item: items[2], displayedText: 'E', content: 'Task E', effort: 3 * hourDuration },
    { item: items[3], displayedText: 'F', content: 'Task F', effort: 2 * hourDuration }];

// Set up appearance and style settings.
var settings = <PertChartView.Settings>{
    containerClass: 'container',
    shapeClass: 'shape',
    dependencyLineClass: 'dependencyLine'
};

// Optionally, initialize custom themes (themes.js).
initializePertChartTheme(settings, theme);

// Initialize the component.
var pertChartView = DlhSoft.Controls.Pert.PertChartView.initialize(pertChartViewElement, items, settings);
