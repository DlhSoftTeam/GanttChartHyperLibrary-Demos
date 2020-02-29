/// <reference path='./Scripts/DlhSoft.ProjectData.PertChart.HTML.Controls.d.ts'/>
import NetworkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView;
import NetworkDiagramItem = NetworkDiagramView.Item;
import PredecessorItem = NetworkDiagramView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializePertChartTemplates;
declare var initializePertChartTheme;

declare var angular;
angular.module('NetworkDiagramViewSample', ['DlhSoft.ProjectData.PertChart.Directives'])
    .controller('MainController', ($scope, $http, $timeout) => {
        // Prepare Network Diagram data items and settings.
        var secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
        var items = <NetworkDiagramItem[]>[
            { content: 'Start milestone', displayedText: 'Start', isMilestone: true, earlyStart: new Date(2016, 2 - 1, 2, 8, 0, 0), earlyFinish: new Date(2016, 2 - 1, 2, 8, 0, 0), lateStart: new Date(2016, 2 - 1, 2, 8, 0, 0), lateFinish: new Date(2016, 2 - 1, 2, 8, 0, 0) },
            { content: 'First task', displayedText: 'Task 1', effort: 8 * hourDuration, earlyStart: new Date(2016, 2 - 1, 2, 8, 0, 0), earlyFinish: new Date(2016, 2 - 1, 2, 16, 0, 0), lateStart: new Date(2016, 2 - 1, 2, 8, 0, 0), lateFinish: new Date(2016, 2 - 1, 2, 8, 0, 0), slack: 0 },
            { content: 'Second task', displayedText: 'Task 2', effort: 4 * hourDuration, earlyStart: new Date(2016, 2 - 1, 2, 8, 0, 0), earlyFinish: new Date(2016, 2 - 1, 2, 12, 0, 0), lateStart: new Date(2016, 2 - 1, 2, 12, 0, 0), lateFinish: new Date(2016, 2 - 1, 2, 8, 0, 0), slack: 4 * hourDuration },
            { content: 'Third task', displayedText: 'Task 3', effort: 16 * hourDuration, earlyStart: new Date(2016, 2 - 1, 3, 8, 0, 0), earlyFinish: new Date(2016, 2 - 1, 4, 16, 0, 0), lateStart: new Date(2016, 2 - 1, 3, 8, 0, 0), lateFinish: new Date(2016, 2 - 1, 4, 16, 0, 0), slack: 0 },
            { content: 'Fourth task', displayedText: 'Task 4', effort: 4 * hourDuration, earlyStart: new Date(2016, 2 - 1, 3, 8, 0, 0), earlyFinish: new Date(2016, 2 - 1, 3, 12, 0, 0), lateStart: new Date(2016, 2 - 1, 4, 12, 0, 0), lateFinish: new Date(2016, 2 - 1, 4, 16, 0, 0), slack: 12 * hourDuration },
            { content: 'Fifth task (middle milestone)', displayedText: 'Task 5', isMilestone: true, effort: 12 * hourDuration, earlyStart: new Date(2016, 2 - 1, 5, 8, 0, 0), earlyFinish: new Date(2016, 2 - 1, 6, 12, 0, 0), lateStart: new Date(2016, 2 - 1, 5, 8, 0, 0), lateFinish: new Date(2016, 2 - 1, 6, 12, 0, 0), slack: 0 },
            { content: 'Sixth task', displayedText: 'Task 6', effort: 48 * hourDuration, earlyStart: new Date(2016, 2 - 1, 6, 12, 0, 0), earlyFinish: new Date(2016, 2 - 1, 12, 12, 0, 0), lateStart: new Date(2016, 2 - 1, 6, 12, 0, 0), lateFinish: new Date(2016, 2 - 1, 12, 12, 0, 0), slack: 0 },
            { content: 'Seventh task', displayedText: 'Task 7', effort: 20 * hourDuration, earlyStart: new Date(2016, 2 - 1, 6, 12, 0, 0), earlyFinish: new Date(2016, 2 - 1, 8, 16, 0, 0), lateStart: new Date(2016, 2 - 1, 10, 8, 0, 0), lateFinish: new Date(2016, 2 - 1, 12, 12, 0, 0), slack: 28 * hourDuration },
            { content: 'Finish milestone', displayedText: 'Finish', isMilestone: true, earlyStart: new Date(2016, 2 - 1, 12, 12, 0, 0), earlyFinish: new Date(2016, 2 - 1, 12, 12, 0, 0), lateStart: new Date(2016, 2 - 1, 12, 12, 0, 0), lateFinish: new Date(2016, 2 - 1, 12, 12, 0, 0) }];
        items[1].predecessors = [{ item: items[0] }];
        items[2].predecessors = [{ item: items[0] }];
        items[3].predecessors = [{ item: items[1] }, { item: items[2] }];
        items[4].predecessors = [{ item: items[1] }];
        items[5].predecessors = [{ item: items[3] }, { item: items[4] }];
        items[6].predecessors = [{ item: items[5] }];
        items[7].predecessors = [{ item: items[5] }];
        items[8].predecessors = [{ item: items[6] }, { item: items[7] }];
        $scope.items = items;
        var settings = <NetworkDiagramView.Settings>{ };
        // Optionally, initialize custom theme and templates (themes.js, templates.js).
        initializePertChartTheme(settings, theme);
        initializePertChartTemplates(settings, theme);
        $scope.settings = settings;
        // Underlying NetworkDiagramView component reference.
        var networkDiagramView = <NetworkDiagramView.Element>document.getElementById('networkDiagramView');
    });
