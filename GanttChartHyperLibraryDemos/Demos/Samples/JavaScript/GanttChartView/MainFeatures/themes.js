function initializeTheme(ganttChartView, settings, theme) {
    if (theme == 'Default')
        return;
    settings.headerHeight = 31 * 2;
    settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
                       { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 7px 2.25px; border-right: 1px solid #e8e8e8; border-bottom: 1px solid #e8e8e8', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                       { scaleType: 'Days', headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 7px 2.25px; border-right: 1px solid #e8e8e8' },
                       { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: red; stroke-width: 0.5px' }];
    settings.itemHeight = 28;
    settings.barCornerRadius = 1;
    settings.completedBarCornerRadius = 1;
    settings.hourWidth = 5;
    switch (theme)
    {
    }
}
