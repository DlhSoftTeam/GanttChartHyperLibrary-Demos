function initializeGanttChartTheme(ganttChartView, settings, theme) {
    if (theme == 'Default')
        return;
    settings.headerHeight = 31 * 2; // 2 scale rows
    settings.itemHeight = 28;
    settings.barCornerRadius = 1;
    settings.completedBarCornerRadius = 1;
    settings.arrowSize = 2;
    settings.hourWidth = 5;
    switch (theme) {
        case 'Generic-blue':
            settings.headerBackground = 'white';
            break;
        case 'Purple-green':
            settings.headerBackground = '#dddfd4';
            settings.mainStroke = '#005173';
            settings.mainFill = '#a0729d';
            settings.accentFill = '#91bc0e';
            break;
        case 'Blue-navy':
            settings.headerBackground = '#eeeeee';
            settings.mainStroke = '#6534ff';
            settings.mainFill = '#369bf9';
            settings.accentFill = '#227fd5';
            settings.alternativeGridBackground = '#f9f9f9';
            break;
        case 'Orange-brown':
            settings.headerBackground = '#eeeeee';
            settings.mainStroke = '#6534ff';
            settings.mainFill = '#ffbf5a';
            settings.accentFill = '#d5a05a';
            settings.diamondFill = '#a91923';
            settings.diamondStroke = '#222222';
            settings.alternativeBackground = '#f9f9f9';
            break;
        case 'Teal-green':
            settings.headerBackground = '#eeeeee';
            settings.mainStroke = '#6534ff';
            settings.mainFill = '#5ebcbb';
            settings.accentFill = '#3294a1';
            settings.diamondFill = '#4c7f3d';
            settings.diamondStroke = '#222222';
            break;
        case 'Steel-blue':
            settings.headerBackground = '#4b5d6b';
            settings.headerForeground = 'white';
            settings.containerBackground = '#a5b5c2';
            settings.gridForeground = 'gray';
            settings.toggleFill = 'gray';
            settings.selectedGridForeground = '#4b5d6b';
            settings.selectedGridBackground = '#95a5b2';
            settings.nonworkingBackground = '#95a5b2';
            settings.mainStroke = '#6534ff';
            settings.mainFill = '#6699cc';
            settings.accentFill = '#4c7f3d';
            settings.diamondFill = '#4b5d6b';
            settings.diamondStroke = '#222222';
            break;
    }
    if (settings.containerBackground)
        settings.containerStyle = 'background-color: ' + settings.containerBackground;
    if (settings.headerForeground)
        settings.columnHeaderStyle = 'color: ' + settings.headerForeground;
    if (settings.gridForeground) {
        settings.itemStyle = 'color: ' + settings.gridForeground + (settings.gridBackground ? '; background-color: ' + settings.gridBackground : '');
        if (settings.selectedGridForeground)
            settings.selectedItemStyle = 'color: ' + settings.selectedGridForeground + '; background-color: ' + (settings.selectedGridBackground ? settings.selectedGridBackground : settings.gridForeground);
    };
    if (settings.toggleFill)
        settings.toggleButtonStyle = 'fill: ' + settings.toggleFill;
    settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (settings.nonworkingBackground ? settings.nonworkingBackground : '#f8f8f8') + '; fill-opacity: 0.65' },
                       { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 7px 5px; border-right: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8' + (settings.headerForeground ? '; color: ' + settings.headerForeground : ''), isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                       { scaleType: 'Days', headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 7px 5px; border-right: 1px solid #e8e8e8' + (settings.headerForeground ? '; color: ' + settings.headerForeground : '') },
                       { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #e31d3b; stroke-width: 0.5px' }];
    if (settings.mainFill)
        settings.standardBarStyle = 'stroke: ' + (settings.mainStroke ? settings.mainStroke : settings.mainFill) + '; fill: ' + settings.mainFill;
    if (settings.accentFill)
        settings.standardCompletedBarStyle = 'stroke: ' + settings.accentFill + '; fill: ' + settings.accentFill;
    if (settings.diamondFill)
        settings.milestoneBarStyle = 'stroke: ' + (settings.diamondStroke ? settings.diamondStroke : settings.diamondFill) + '; fill: ' + settings.diamondFill;
    if (settings.mainStroke) {
        settings.baselineBarStyle = 'fill: none; stroke: ' + settings.mainStroke + '; stroke-width: 0.65px; stroke-dasharray: 2, 2';
        settings.arrowFill = settings.mainStroke;
        settings.dependencyLineStyle = 'stroke: ' + settings.arrowFill + '; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
    }
    if (settings.alternativeBackground) {
        settings.alternativeGridBackground = settings.alternativeBackground;
        settings.alternativeChartBackground = settings.alternativeBackground;
    }
    if (settings.alternativeGridBackground)
        settings.alternativeItemStyle = 'background-color: ' + settings.alternativeGridBackground;
    if (settings.alternativeChartBackground)
        settings.alternativeChartItemStyle = 'fill: ' + settings.alternativeChartBackground;
}
function initializeLoadChartTheme(loadChartView, settings, theme) {
    initializeGanttChartTheme(loadChartView, settings, theme);
    if (theme == 'Default')
        return;
    delete settings.itemHeight;
    switch (theme) {
        case 'Generic-blue':
            settings.normalAllocationBarStyle = settings.underAllocationBarStyle = 'stroke: #8abbed; fill: #8abbed';
            settings.overAllocationBarStyle = 'stroke: #e31d3b; fill: #e31d3b';
            break;
    }
}
function initializePertChartTheme(pertChartView, settings, theme) {
    if (theme == 'Default')
        return;
    switch (theme) {
        case 'Generic-blue':
            settings.shapeStyle = 'fill: White; stroke: #606060; stroke-width: 1px';
            settings.milestoneStyle = 'fill: White; stroke: #606060; stroke-width: 1px';
            settings.dependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
            settings.virtualEffortDependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)';
            break;
    }
}
