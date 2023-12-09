// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
function initializeGanttChartTheme(settings, theme) {
    if (theme == 'Default')
        return;
    if (theme == 'Aero') {
        settings.theme = 'Aero';
        return;
    }
    if (typeof settings.headerHeight === 'undefined')
        settings.headerHeight = 31 * 2; // 2 scale rows
    if (typeof settings.itemHeight === 'undefined')
        settings.itemHeight = 28;
    if (typeof settings.barMargin === 'undefined')
        settings.barMargin = 4;
    if (typeof settings.completedBarMargin === 'undefined')
        settings.completedBarMargin = 1;
    if (typeof settings.barCornerRadius === 'undefined')
        settings.barCornerRadius = 1;
    if (typeof settings.completedBarCornerRadius === 'undefined')
        settings.completedBarCornerRadius = 1;
    if (typeof settings.arrowSize === 'undefined')
        settings.arrowSize = 2;
    if (typeof settings.hourWidth === 'undefined')
        settings.hourWidth = 5;
    switch (theme) {
        case 'Generic-bright':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = 'white';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#005c9e';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = 'white';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#005c9e';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#e31d3b';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#005c9e';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#daae66';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Generic-blue':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = 'white';
            break;
        case 'Royal-blue':
            if (typeof settings.border === 'undefined')
                settings.border = '#ccc';
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#aaa';
            if (typeof settings.headerForeground === 'undefined')
                settings.headerForeground = 'white';
            if (typeof settings.toggleFill === 'undefined')
                settings.toggleFill = '#ccc';
            if (typeof settings.selectedGridForeground === 'undefined')
                settings.selectedGridForeground = '#4b5d6b';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#ddd';
            if (typeof settings.nonworkingBackground === 'undefined')
                settings.nonworkingBackground = '#f8f8f8';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#407cee';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#407cee';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#6aa84f';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#fdbb86';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#222222';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#dcf2f8;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Purple-green':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#dddfd4';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#005173';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#a0729d';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#91bc0e';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#fff;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#fff;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Blue-navy':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#eeeeee';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#e8e8e8';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#6534ff';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#369bf9';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#227fd5';
            if (typeof settings.alternativeGridBackground === 'undefined')
                settings.alternativeGridBackground = '#f9f9f9';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#dcf2f8;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Orange-brown':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#eeeeee';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#e8e8e8';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#cc9d38';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#ffcf6b';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#d5a05a';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#00c389';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#222222';
            if (typeof settings.alternativeBackground === 'undefined')
                settings.alternativeBackground = '#f9f9f9';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#fff;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#fff;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#6a66b3;';
            break;
        case 'Teal-green':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#eeeeee';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#3294a1';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#5ebccc';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#3294a1';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#faffb3';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#3294a1';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#dcf2f8;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Steel-blue':
            if (typeof settings.border === 'undefined')
                settings.border = '#aaaaaa';
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#6b7d8b';
            if (typeof settings.headerForeground === 'undefined')
                settings.headerForeground = 'white';
            if (typeof settings.headerBorder === 'undefined')
                settings.headerBorder = '#aaaaaa';
            if (typeof settings.containerBackground === 'undefined')
                settings.containerBackground = '#d5e5f2';
            if (typeof settings.chartBackground === 'undefined')
                settings.chartBackground = '#bfcfda';
            if (typeof settings.gridForeground === 'undefined')
                settings.gridForeground = 'gray';
            if (typeof settings.toggleFill === 'undefined')
                settings.toggleFill = 'gray';
            if (typeof settings.selectedGridForeground === 'undefined')
                settings.selectedGridForeground = '#4b5d6b';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#95a5b2';
            if (typeof settings.nonworkingBackground === 'undefined')
                settings.nonworkingBackground = '#95a5b2';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#4477aa';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#6699cc';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#4c7f3d';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#999';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#222222';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#dcf2f8;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Cyan-green':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#dddddd';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#7fc6ce';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#1fb5ce';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#1fce43';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#d6485b';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#222222';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#dcf2f8;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Purple-beige':
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#d0d5e5';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#bfb8a4';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#d0d5f5';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#bfb8a4';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#bfb8a4';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#005c9e';
            if (typeof settings.alternativeGridBackground === 'undefined')
                settings.alternativeGridBackground = '#f0eeeb';
            if (typeof settings.alternativeChartBackground === 'undefined')
                settings.alternativeChartBackground = '#f9f9f9';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#555;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#fff;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Dark-black':
            if (typeof settings.containerClass === 'undefined')
                settings.containerClass = 'dark'; // CSS class for dynamically generated elements, e.g. input (app.css)
            if (typeof settings.border === 'undefined')
                settings.border = '#222222';
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#111111';
            if (typeof settings.headerForeground === 'undefined')
                settings.headerForeground = '#eeeeee';
            if (typeof settings.headerBorder === 'undefined')
                settings.headerBorder = '#222222';
            if (typeof settings.containerBackground === 'undefined')
                settings.containerBackground = '#222222';
            if (typeof settings.gridForeground === 'undefined')
                settings.gridForeground = '#dddddd';
            if (typeof settings.chartForeground === 'undefined')
                settings.chartForeground = '#dddddd';
            if (typeof settings.scaleSeparatorBorder === 'undefined')
                settings.scaleSeparatorBorder = '#505050';
            if (typeof settings.toggleFill === 'undefined')
                settings.toggleFill = '#808080';
            if (typeof settings.toggleHoveringFill === 'undefined')
                settings.toggleHoveringFill = 'white';
            if (typeof settings.selectedGridForeground === 'undefined')
                settings.selectedGridForeground = 'white';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#404040';
            if (typeof settings.nonworkingBackground === 'undefined')
                settings.nonworkingBackground = '#333333';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = 'gray';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#ffbb00';
            if (typeof settings.summaryFill === 'undefined')
                settings.summaryFill = '#505050';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#ffbb00';
            if (typeof settings.currentTimeStroke === 'undefined')
                settings.currentTimeStroke = '#289451';
            if (typeof settings.standardLabelColor === 'undefined')
                settings.standardLabelColor = '#dcf2f8;';
            if (typeof settings.summaryLabelColor === 'undefined')
                settings.summaryLabelColor = '#dcf2f8;';
            if (typeof settings.milestoneLabelColor === 'undefined')
                settings.milestoneLabelColor = '#ff851b;';
            break;
        case 'Gray-blue':
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = 'white';
            if (typeof settings.containerBackground === 'undefined')
                settings.containerBackground = '#fafafa';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#def8ff';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#005c9e';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = 'white';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#007acc';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#abe2ff';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#007acc';
            break;
        case 'DlhSoft-gray':
            if (typeof settings.border === 'undefined')
                settings.border = '#aaaaaa';
            if (typeof settings.headerBackground === 'undefined')
                settings.headerBackground = '#CDDFFC';
            if (typeof settings.headerForeground === 'undefined')
                settings.headerForeground = '#333';
            if (typeof settings.headerBorder === 'undefined')
                settings.headerBorder = 'transparent';
            if (typeof settings.selectedGridBackground === 'undefined')
                settings.selectedGridBackground = '#e8e8e8';
            if (typeof settings.mainStroke === 'undefined')
                settings.mainStroke = '#777';
            if (typeof settings.mainFill === 'undefined')
                settings.mainFill = '#f9f9f9';
            if (typeof settings.accentFill === 'undefined')
                settings.accentFill = '#decfb9';
            if (typeof settings.summaryFill === 'undefined')
                settings.summaryFill = '#777';
            if (typeof settings.diamondFill === 'undefined')
                settings.diamondFill = '#99c9ce';
            if (typeof settings.diamondStroke === 'undefined')
                settings.diamondStroke = '#777';
            if (typeof settings.alternativeGridBackground === 'undefined')
                settings.alternativeGridBackground = '#f8f8f8';
            if (typeof settings.currentTimeStroke === 'undefined')
                settings.currentTimeStroke = '#82a0b3';
            break;
    }
    if (typeof settings.containerStyle === 'undefined' && settings.containerBackground)
        settings.containerStyle = 'background-color: ' + settings.containerBackground;
    if (typeof settings.columnHeaderStyle === 'undefined' && settings.headerForeground)
        settings.columnHeaderStyle = 'color: ' + settings.headerForeground;
    if (settings.gridForeground) {
        if (typeof settings.itemStyle === 'undefined')
            settings.itemStyle = 'color: ' + settings.gridForeground + (settings.gridBackground ? '; background-color: ' + settings.gridBackground : '');
        if (typeof settings.selectedItemStyle === 'undefined' && settings.selectedGridForeground)
            settings.selectedItemStyle = 'color: ' + settings.selectedGridForeground + '; background-color: ' + (settings.selectedGridBackground ? settings.selectedGridBackground : settings.gridForeground);
    }
    else {
        if (typeof settings.selectedItemStyle === 'undefined' && (settings.selectedGridForeground || settings.selectedGridBackground))
            settings.selectedItemStyle = 'color: ' + (settings.selectedGridForeground ? settings.selectedGridForeground : 'black') + '; background-color: ' + (settings.selectedGridBackground ? settings.selectedGridBackground : '#f0f0f0');
    }
    if (typeof settings.toggleButtonStyle === 'undefined' && settings.toggleFill)
        settings.toggleButtonStyle = 'fill: ' + settings.toggleFill;
    if (typeof settings.toggleButtonHoveringStyle === 'undefined' && settings.toggleHoveringFill)
        settings.toggleButtonHoveringStyle = 'fill: ' + settings.toggleHoveringFill;
    if (typeof settings.scales === 'undefined') {
        settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (settings.nonworkingBackground ? settings.nonworkingBackground : '#f8f8f8') + '; fill-opacity: 0.65' },
        { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 7px 5px; border-right: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + '; border-bottom: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + (settings.headerForeground ? '; color: ' + settings.headerForeground : ''), isSeparatorVisible: true, separatorStyle: 'stroke: ' + (settings.scaleSeparatorBorder ? settings.scaleSeparatorBorder : '#c8bfe7') + '; stroke-width: 0.5px' },
        { scaleType: 'Days', headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 7px 5px; border-right: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + (settings.headerForeground ? '; color: ' + settings.headerForeground : '') },
        { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: ' + (settings.currentTimeStroke ? settings.currentTimeStroke : '#e31d3b') + '; stroke-width: 0.5px' }];
    }
    if (settings.chartBackground)
        settings.scales.splice(0, 0, { scaleType: 'Custom', isHeaderVisible: false, intervals: [{ start: new Date(1, 0, 1), finish: new Date(10000, 11, 31, 23, 59, 59, 999) }], isHighlightingVisible: true, highlightingStyle: 'fill: ' + settings.chartBackground });
    if (settings.mainFill) {
        if (typeof settings.standardBarStyle === 'undefined')
            settings.standardBarStyle = 'stroke: ' + (settings.mainStroke ? settings.mainStroke : settings.mainFill) + '; fill: ' + settings.mainFill;
        if (typeof settings.collapsedSummaryLineStyle === 'undefined')
            settings.collapsedSummaryLineStyle = 'stroke: ' + (settings.mainStroke ? settings.mainStroke : settings.mainFill) + '; stroke-width: 0.65px; stroke-dasharray: 2 2';
    }
    if (typeof settings.standardCompletedBarStyle === 'undefined' && settings.accentFill)
        settings.standardCompletedBarStyle = 'stroke: ' + settings.accentFill + '; fill: ' + settings.accentFill;
    if (typeof settings.summaryBarStyle === 'undefined' && settings.summaryFill)
        settings.summaryBarStyle = 'stroke: ' + (settings.summaryStroke ? settings.summaryStroke : settings.summaryFill) + '; fill: ' + settings.summaryFill;
    if (typeof settings.milestoneBarStyle === 'undefined' && settings.diamondFill)
        settings.milestoneBarStyle = 'stroke: ' + (settings.diamondStroke ? settings.diamondStroke : settings.diamondFill) + '; fill: ' + settings.diamondFill;
    if (settings.mainStroke) {
        if (typeof settings.arrowFill === 'undefined')
            settings.baselineBarStyle = 'fill: none; stroke: ' + settings.mainStroke + '; stroke-width: 0.65px; stroke-dasharray: 2, 2';
        if (!settings.arrowFill)
            settings.arrowFill = settings.mainStroke;
        if (typeof settings.dependencyLineStyle === 'undefined')
            settings.dependencyLineStyle = 'stroke: ' + settings.arrowFill + '; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)';
    }
    if (typeof settings.assignmentsStyle === 'undefined' && settings.chartForeground)
        settings.assignmentsStyle = 'font-size: x-small; fill: ' + settings.chartForeground;
    if (settings.alternativeBackground) {
        if (typeof settings.alternativeGridBackground === 'undefined')
            settings.alternativeGridBackground = settings.alternativeBackground;
        if (typeof settings.alternativeChartBackground === 'undefined')
            settings.alternativeChartBackground = settings.alternativeBackground;
    }
    if (typeof settings.alternativeItemStyle === 'undefined' && settings.alternativeGridBackground)
        settings.alternativeItemStyle = 'background-color: ' + settings.alternativeGridBackground;
    if (typeof settings.alternativeChartItemStyle === 'undefined' && settings.alternativeChartBackground)
        settings.alternativeChartItemStyle = 'fill: ' + settings.alternativeChartBackground;
}
function initializeLoadChartTheme(settings, theme) {
    initializeGanttChartTheme(settings, theme);
    if (theme == 'Default')
        return;
    if (typeof settings.barHeight === 'undefined')
        settings.barHeight = 20;
    if (typeof settings.allocationFill === 'undefined')
        settings.allocationFill = settings.mainFill ? (settings.mainFill != 'white' ? settings.mainFill : settings.mainStroke) : '#8abbed';
    if (typeof settings.normalAllocationBarStyle === 'undefined')
        settings.normalAllocationBarStyle = settings.underAllocationBarStyle = 'stroke: ' + settings.allocationFill + '; fill: ' + settings.allocationFill;
    if (typeof settings.overAllocationBarStyle === 'undefined')
        settings.overAllocationBarStyle = 'stroke: #e31d3b; fill: #e31d3b';
}
function initializePertChartTheme(settings, theme) {
    if (theme == 'Default')
        return;
    if (typeof settings.shapeStyle === 'undefined')
        settings.shapeStyle = 'fill: White; stroke: #606060; stroke-width: 1px';
    if (typeof settings.milestoneStyle === 'undefined')
        settings.milestoneStyle = 'fill: White; stroke: #606060; stroke-width: 1px';
    if (typeof settings.dependencyLineStyle === 'undefined')
        settings.dependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; fill: none; marker-end: url(#PertArrowMarker)';
    if (typeof settings.arrowFill === 'undefined')
        settings.arrowFill = '#8abbed';
    if (typeof settings.virtualEffortDependencyLineStyle === 'undefined')
        settings.virtualEffortDependencyLineStyle = 'stroke: #8abbed; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#PertArrowMarker)';
    // Common helpers.
    var svgns = 'http://www.w3.org/2000/svg';
    // Template definitions.
    if (typeof settings.styleDefinitionTemplate === 'undefined') {
        settings.styleDefinitionTemplate = function () {
            var defs = document.createElementNS(svgns, 'defs');
            var arrowMarker = document.createElementNS(svgns, 'marker');
            arrowMarker.setAttribute('id', 'PertArrowMarker');
            arrowMarker.setAttribute("viewBox", "0 0 10 10");
            arrowMarker.setAttribute("refX", "0");
            arrowMarker.setAttribute("refY", "5");
            arrowMarker.setAttribute("markerUnits", "strokeWidth");
            arrowMarker.setAttribute("markerWidth", "5");
            arrowMarker.setAttribute("markerHeight", "4");
            arrowMarker.setAttribute("orient", "auto");
            var arrowPath = document.createElementNS(svgns, "path");
            arrowPath.setAttribute("fill", settings.arrowFill ? settings.arrowFill : '#3b87d9');
            arrowPath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
            arrowMarker.appendChild(arrowPath);
            defs.appendChild(arrowMarker);
            return defs;
        };
    }
}
