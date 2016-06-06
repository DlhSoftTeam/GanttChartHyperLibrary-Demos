function initializeGanttChartTheme(ganttChartView, settings, theme) {
    if (theme == 'Default')
        return;
    if (theme == 'Aero') {
        settings.theme = 'Aero';
        return;
    }
    settings.headerHeight = 31 * 2; // 2 scale rows
    settings.itemHeight = 28;
    settings.barCornerRadius = 1;
    settings.completedBarCornerRadius = 1;
    settings.arrowSize = 2;
    settings.hourWidth = 5;
    switch (theme) {
        case 'Generic-bright':
            settings.headerBackground = 'white';
            settings.mainStroke = '#005c9e';
            settings.mainFill = 'white';
            settings.accentFill = '#005c9e';
            settings.diamondFill = '#e31d3b';
            settings.diamondStroke = '#005c9e';
            break;
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
            settings.selectedGridBackground = '#e8e8e8';
            settings.mainStroke = '#6534ff';
            settings.mainFill = '#369bf9';
            settings.accentFill = '#227fd5';
            settings.alternativeGridBackground = '#f9f9f9';
            break;
        case 'Orange-brown':
            settings.headerBackground = '#eeeeee';
            settings.selectedGridBackground = '#e8e8e8';
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
            settings.border = '#aaaaaa';
            settings.headerBackground = '#4b5d6b';
            settings.headerForeground = 'white';
            settings.headerBorder = '#aaaaaa';
            settings.containerBackground = '#a5b5c2';
            settings.chartBackground = '#bfcfda';
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
        case 'Cyan-green':
            settings.headerBackground = '#dddddd';
            settings.mainStroke = '#6534ff';
            settings.mainFill = '#1fb5ce';
            settings.accentFill = '#1fce43';
            settings.diamondFill = '#d6485b';
            settings.diamondStroke = '#222222';
            break;
        case 'Purple-beige':
            settings.selectedGridBackground = '#bfb8a4';
            settings.mainStroke = '#005c9e';
            settings.mainFill = '#a68b99';
            settings.accentFill = '#bfb8a4';
            settings.diamondFill = '#bfb8a4';
            settings.diamondStroke = '#005c9e';
            settings.alternativeGridBackground = '#f0eeeb';
            settings.alternativeChartBackground = '#f9f9f9';
            break;
        case 'Dark-black':
            settings.containerClass = 'dark'; // CSS class for dynamically generated elements, e.g. input (app.css)
            settings.border = '#222222';
            settings.headerBackground = '#111111';
            settings.headerForeground = '#eeeeee';
            settings.headerBorder = '#222222';
            settings.containerBackground = '#222222';
            settings.gridForeground = '#dddddd';
            settings.chartForeground = '#dddddd';
            settings.scaleSeparatorBorder = '#505050';
            settings.toggleFill = '#808080';
            settings.toggleHoveringFill = 'white';
            settings.selectedGridForeground = 'white';
            settings.selectedGridBackground = '#404040';
            settings.nonworkingBackground = '#333333';
            settings.mainStroke = 'gray';
            settings.accentFill = '#ffbb00';
            settings.summaryFill = '#505050';
            settings.diamondFill = '#ffbb00';
            settings.currentTimeStroke = '#289451';
            break;
        case 'Gray-blue':
            settings.headerBackground = 'white';
            settings.containerBackground = '#f0f0f0';
            settings.selectedGridBackground = 'white';
            settings.mainStroke = '#005c9e';
            settings.mainFill = 'white';
            settings.accentFill = '#0087be';
            settings.diamondFill = '#607080';
            settings.diamondStroke = '#005c9e';
            break;
        case 'DlhSoft-gray':
            settings.border = '#aaaaaa';
            settings.headerBackground = '#e31d3b';
            settings.headerForeground = 'white';
            settings.headerBorder = 'transparent';
            settings.selectedGridBackground = '#e8e8e8';
            settings.mainStroke = '#666';
            settings.mainFill = '#f0f0f0';
            settings.accentFill = '#ad927f';
            settings.summaryFill = '#666';
            settings.diamondFill = '#82a0b3';
            settings.diamondStroke = '#666';
            settings.alternativeGridBackground = '#f8f8f8';
            settings.currentTimeStroke = '#82a0b3';
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
    }
    else {
        if (settings.selectedGridForeground || settings.selectedGridBackground)
            settings.selectedItemStyle = 'color: ' + (settings.selectedGridForeground ? settings.selectedGridForeground : 'black') + '; background-color: ' + (settings.selectedGridBackground ? settings.selectedGridBackground : '#f0f0f0');
    }
    if (settings.toggleFill)
        settings.toggleButtonStyle = 'fill: ' + settings.toggleFill;
    if (settings.toggleHoveringFill)
        settings.toggleButtonHoveringStyle = 'fill: ' + settings.toggleHoveringFill;
    settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (settings.nonworkingBackground ? settings.nonworkingBackground : '#f8f8f8') + '; fill-opacity: 0.65' },
                       { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 7px 5px; border-right: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + '; border-bottom: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + (settings.headerForeground ? '; color: ' + settings.headerForeground : ''), isSeparatorVisible: true, separatorStyle: 'stroke: ' + (settings.scaleSeparatorBorder ? settings.scaleSeparatorBorder : '#c8bfe7') + '; stroke-width: 0.5px' },
                       { scaleType: 'Days', headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 7px 5px; border-right: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + (settings.headerForeground ? '; color: ' + settings.headerForeground : '') },
                       { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: ' + (settings.currentTimeStroke ? settings.currentTimeStroke : '#e31d3b') + '; stroke-width: 0.5px' }];
    if (settings.chartBackground)
        settings.scales.splice(0, 0, { scaleType: 'Custom', isHeaderVisible: false, intervals: [{ start: new Date(1, 0, 1), finish: new Date(10000, 11, 31, 23, 59, 59, 999) }], isHighlightingVisible: true, highlightingStyle: 'fill: ' + settings.chartBackground });
    if (settings.mainFill) {
        settings.standardBarStyle = 'stroke: ' + (settings.mainStroke ? settings.mainStroke : settings.mainFill) + '; fill: ' + settings.mainFill;
        settings.collapsedSummaryLineStyle = 'stroke: ' + settings.mainFill + '; stroke-width: 0.65px; stroke-dasharray: 2 2';
    }
    if (settings.accentFill)
        settings.standardCompletedBarStyle = 'stroke: ' + settings.accentFill + '; fill: ' + settings.accentFill;
    if (settings.summaryFill)
        settings.summaryBarStyle = 'stroke: ' + (settings.summaryStroke ? settings.summaryStroke : settings.summaryFill) + '; fill: ' + settings.summaryFill;
    if (settings.diamondFill)
        settings.milestoneBarStyle = 'stroke: ' + (settings.diamondStroke ? settings.diamondStroke : settings.diamondFill) + '; fill: ' + settings.diamondFill;
    if (settings.mainStroke) {
        settings.baselineBarStyle = 'fill: none; stroke: ' + settings.mainStroke + '; stroke-width: 0.65px; stroke-dasharray: 2, 2';
        settings.arrowFill = settings.mainStroke;
        settings.dependencyLineStyle = 'stroke: ' + settings.arrowFill + '; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
    }
    if (settings.chartForeground)
        settings.assignmentsStyle = 'font-size: x-small; fill: ' + settings.chartForeground;
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
    settings.barHeight = 20;
    settings.allocationFill = settings.mainFill ? (settings.mainFill != 'white' ? settings.mainFill : settings.mainStroke) : '#8abbed';
    settings.normalAllocationBarStyle = settings.underAllocationBarStyle = 'stroke: ' + settings.allocationFill + '; fill: ' + settings.allocationFill;
    settings.overAllocationBarStyle = 'stroke: #e31d3b; fill: #e31d3b';
}
function initializePertChartTheme(pertChartView, settings, theme) {
    if (theme == 'Default')
        return;
    settings.shapeStyle = 'fill: White; stroke: #606060; stroke-width: 1px';
    settings.milestoneStyle = 'fill: White; stroke: #606060; stroke-width: 1px';
    settings.dependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
    settings.virtualEffortDependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)';
}
