﻿/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;

// Retrieve and store the control element for reference purposes.
var ganttChartViewElement = <HTMLElement>document.querySelector('#ganttChartView');

var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var items = <GanttChartItem[]>[];
for (var i = 1; i <= 16; i++)
    items.push({ content: 'Item ' + i, indentation: i % 3 == 2 ? 0 : 1, start: new Date() });
for (var i = 0; i < items.length; i++) {
    var parts = [];
    for (var j = 0; j < (i + 1) / 2; j++)
        parts.push(<GanttChartItem>{
            content: 'Bar ' + (i + 1) + '.' + (j + 1),
            start: new Date(year, month, 2 + (i + 1) + (j + 1) * i, 8, 0, 0),
            finish: new Date(year, month, 2 + (i + 1) + (j + 1) * i + (i / 2), 16, 0, 0),
            assignmentsContent: (i + 1) + '.' + (j + 1)
        });
    items[i].parts = parts;
}

var settings = <GanttChartView.Settings>{
    gridWidth: '15%', chartWidth: '85%',
    isGridRowClickTimeScrollingEnabled: false,
    currentTime: new Date(year, month, 2, 12, 0, 0)
};
var columns = GanttChartView.getDefaultColumns(items, settings);
columns.splice(1, Infinity);
settings.columns = columns;

// Optionally, initialize custom themes (themes.js).
initializeGanttChartTheme(settings, theme);

// Initialize the component.
var ganttChartView = DlhSoft.Controls.GanttChartView.initialize(ganttChartViewElement, items, settings);
