function initializeGanttChartTheme(ganttChartView, settings, theme) {
    if (theme == 'Default')
        return;
    settings.headerHeight = 31 * 2;
    settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
                       { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 7px 2.25px; border-right: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                       { scaleType: 'Days', headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 7px 2.25px; border-right: 1px solid #e8e8e8' },
                       { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #e31d3b; stroke-width: 0.5px' }];
    settings.itemHeight = 28;
    settings.barCornerRadius = 1;
    settings.completedBarCornerRadius = 1;
    settings.hourWidth = 5;
    switch (theme) {
    }
}
function initializeLoadChartTheme(loadChartView, settings, theme) {
    initializeGanttChartTheme(loadChartView, settings, theme);
    if (theme == 'Default')
        return;
    delete settings.itemHeight;
    switch (theme) {
        case "Generic-blue":
            settings.normalAllocationBarStyle = settings.underAllocationBarStyle = 'stroke: #8abbed; fill: #8abbed';
            settings.overAllocationBarStyle = 'stroke: #e31d3b; fill: #e31d3b';
            break;
    }
}
function initializePertChartTheme(pertChartView, settings, theme) {
    if (theme == 'Default')
        return;
    switch (theme) {
        case "Generic-blue":
            settings.shapeStyle = "fill: White; stroke: #606060; stroke-width: 1px";
            settings.milestoneStyle = "fill: White; stroke: #606060; stroke-width: 1px";
            settings.dependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
            settings.virtualEffortDependencyLineStyle = "stroke: #8abbed; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)";
            break;
    }
}
