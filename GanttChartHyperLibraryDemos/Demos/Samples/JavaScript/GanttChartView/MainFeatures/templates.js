function initializeTemplates(ganttChartView, settings, theme) {
    if (theme == 'Default')
        return;
    // Override settings for standard task items.
    var barMargin = 4;
    var barHeight = settings.itemHeight - 2 * barMargin;
    var completedBarMargin = 1;
    var completedBarHeight = barHeight - 2 * completedBarMargin;
    // Common helpers.
    var undefinedType = 'undefined', svgns = 'http://www.w3.org/2000/svg', hourDuration = 60 * 60 * 1000;
    function getChartItemArea(item) {
        var document = item.ganttChartView.ownerDocument;
        if (typeof item.chartItemArea === undefinedType)
            item.chartItemArea = document.createElementNS(svgns, 'g');
        for (var i = item.chartItemArea.childNodes.length; i-- > 0;)
            item.chartItemArea.removeChild(item.chartItemArea.childNodes[i]);
        return item.chartItemArea;
    }
    function getTextNode(document, value) {
        var span = document.createElement('span');
        span.innerHTML = value;
        return span;
    };
    function getDependencyTypeString(dependencyType) {
        switch (dependencyType) {
            case 'StartStart':
            case 'SS':
                return 'SS';
            case 'FinishFinish':
            case 'FF':
                return 'FF';
            case 'StartFinish':
            case 'SF':
                return 'SF';
            case 'FinishStart':
            case 'FS':
            default:
                return 'FS';
        }
    };
    // Template definitions.
    settings.styleDefinitionTemplate = function () {
        var document = ganttChartView.ownerDocument;
        var defs = document.createElementNS(svgns, 'defs');
        var arrowMarker = document.createElementNS(svgns, 'marker');
        arrowMarker.setAttribute('id', 'ArrowMarker');
        arrowMarker.setAttribute('viewBox', '0 0 10 10');
        arrowMarker.setAttribute('refX', '0');
        arrowMarker.setAttribute('refY', '5');
        arrowMarker.setAttribute('markerUnits', 'strokeWidth');
        arrowMarker.setAttribute('markerWidth', '10');
        arrowMarker.setAttribute('markerHeight', '8');
        arrowMarker.setAttribute('orient', 'auto');
        var arrowPath = document.createElementNS(svgns, 'path');
        arrowPath.setAttribute('fill', '#3b87d9');
        arrowPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowMarker.appendChild(arrowPath);
        defs.appendChild(arrowMarker);
        return defs;
    };
    settings.standardTaskTemplate = function (item) {
        var ganttChartView = item.ganttChartView;
        var settings = ganttChartView.settings;
        var items = ganttChartView.items;
        var document = ganttChartView.ownerDocument;
        var group = getChartItemArea(item);
        if (settings.isBaselineVisible && typeof item.baselineStart !== undefinedType && typeof item.baselineFinish !== undefinedType) {
            var itemBaselineLeft = ganttChartView.getChartPosition(item.baselineStart);
            var itemBaselineRight = Math.max(ganttChartView.getChartPosition(item.baselineFinish), itemBaselineLeft + 4);
            var baselineBar = document.createElementNS(svgns, 'rect');
            baselineBar.setAttribute('x', itemBaselineLeft);
            baselineBar.setAttribute('y', barMargin / 2);
            baselineBar.setAttribute('width', Math.max(0, itemBaselineRight - itemBaselineLeft - 1));
            baselineBar.setAttribute('height', barHeight);
            baselineBar.setAttribute('rx', settings.barCornerRadius);
            baselineBar.setAttribute('ry', settings.barCornerRadius);
            var baselineBarClass = settings.baselineBarClass;
            if (typeof item.baselineBarClass !== undefinedType)
                baselineBarClass = item.baselineBarClass;
            if (typeof baselineBarClass !== undefinedType)
                baselineBar.setAttribute('class', baselineBarClass);
            else {
                var baselineBarStyle = settings.baselineBarStyle;
                if (typeof item.baselineBarStyle !== undefinedType)
                    baselineBarStyle = item.baselineBarStyle;
                if (typeof baselineBarStyle !== undefinedType)
                    baselineBar.setAttribute('style', baselineBarStyle);
            }
            group.appendChild(baselineBar);
        }
        var itemLeft = ganttChartView.getChartPosition(item.start);
        var itemRight = Math.max(ganttChartView.getChartPosition(item.finish), itemLeft + 4);
        var itemCompletedRight = ganttChartView.getChartPosition(item.completedFinish) + 1;
        var bar = document.createElementNS(svgns, 'rect');
        bar.setAttribute('x', itemLeft);
        bar.setAttribute('y', barMargin);
        bar.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
        bar.setAttribute('height', barHeight);
        bar.setAttribute('rx', settings.barCornerRadius);
        bar.setAttribute('ry', settings.barCornerRadius);
        var barClass = settings.standardBarClass;
        if (typeof item.standardBarClass !== undefinedType)
            barClass = item.standardBarClass;
        if (typeof item.barClass !== undefinedType)
            barClass = item.barClass;
        if (typeof barClass !== undefinedType)
            bar.setAttribute('class', barClass);
        else {
            var barStyle = settings.standardBarStyle;
            if (typeof item.standardBarStyle !== undefinedType)
                barStyle = item.standardBarStyle;
            if (typeof item.barStyle !== undefinedType)
                barStyle = item.barStyle;
            if (typeof barStyle !== undefinedType)
                bar.setAttribute('style', barStyle);
        }
        group.appendChild(bar);
        if (settings.isTaskCompletedEffortVisible) {
            var completedBar = document.createElementNS(svgns, 'rect');
            completedBar.setAttribute('x', itemLeft + 1);
            completedBar.setAttribute('y', barMargin + completedBarMargin);
            completedBar.setAttribute('width', Math.max(0, itemCompletedRight - 2 - 1 - itemLeft - 1));
            completedBar.setAttribute('height', completedBarHeight);
            completedBar.setAttribute('rx', settings.completedBarCornerRadius);
            completedBar.setAttribute('ry', settings.completedBarCornerRadius);
            var completedBarClass = settings.standardCompletedBarClass;
            if (typeof item.standardCompletedBarClass !== undefinedType)
                completedBarClass = item.standardCompletedBarClass;
            if (typeof item.completedBarClass !== undefinedType)
                completedBarClass = item.completedBarClass;
            if (typeof completedBarClass !== undefinedType)
                completedBar.setAttribute('class', completedBarClass);
            else {
                var completedBarStyle = settings.standardCompletedBarStyle;
                if (typeof item.standardCompletedBarStyle !== undefinedType)
                    completedBarStyle = item.standardCompletedBarStyle;
                if (typeof item.completedBarStyle !== undefinedType)
                    completedBarStyle = item.completedBarStyle;
                if (typeof completedBarStyle !== undefinedType)
                    completedBar.setAttribute('style', completedBarStyle);
            }
            group.appendChild(completedBar);
        }
        if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
            var thumb = document.createElementNS(svgns, 'rect');
            thumb.setAttribute('x', itemLeft);
            thumb.setAttribute('y', barMargin);
            thumb.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
            thumb.setAttribute('height', barHeight);
            thumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: move');
            if (!settings.isTaskStartReadOnly)
                group.appendChild(thumb);
            var startThumb = document.createElementNS(svgns, 'rect');
            startThumb.setAttribute('x', itemLeft - 4);
            startThumb.setAttribute('y', barMargin);
            startThumb.setAttribute('width', 4);
            startThumb.setAttribute('height', barHeight);
            startThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
            if (settings.isDraggingTaskStartEndsEnabled && !settings.isTaskStartReadOnly && settings.interaction != 'TouchEnabled')
                group.appendChild(startThumb);
            var finishThumb = document.createElementNS(svgns, 'rect');
            finishThumb.setAttribute('x', itemRight - 4);
            finishThumb.setAttribute('y', barMargin);
            finishThumb.setAttribute('width', 8);
            finishThumb.setAttribute('height', barHeight);
            finishThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
            if (!settings.isTaskEffortReadOnly && settings.interaction != 'TouchEnabled')
                group.appendChild(finishThumb);
            var completedFinishThumb = document.createElementNS(svgns, 'rect');
            completedFinishThumb.setAttribute('x', itemCompletedRight - 2);
            completedFinishThumb.setAttribute('y', barMargin);
            completedFinishThumb.setAttribute('width', 6);
            completedFinishThumb.setAttribute('height', barHeight);
            completedFinishThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: e-resize');
            if (!settings.isTaskCompletionReadOnly && settings.interaction != 'TouchEnabled') {
                group.appendChild(completedFinishThumb);
                var completedFinishToolTip = document.createElementNS(svgns, 'title');
                var completion = typeof settings.areToolTipsSimplified === undefinedType || !settings.areToolTipsSimplified ? ganttChartView.getItemCompletion(item) : NaN;
                completedFinishToolTip.appendChild(getTextNode(document, !isNaN(completion) ? (Math.round(completion * 100 * 100) / 100) + '%' : ''));
                completedFinishThumb.appendChild(completedFinishToolTip);
            }
            ganttChartView.initializeTaskDraggingThumbs(thumb, startThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight);
            if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
                var startDependencyThumb = null;
                if (typeof settings.allowCreatingStartDependencies === undefinedType || settings.allowCreatingStartDependencies) {
                    startDependencyThumb = document.createElementNS(svgns, 'circle');
                    startDependencyThumb.setAttribute('cx', itemLeft);
                    startDependencyThumb.setAttribute('cy', barMargin + barHeight / 2);
                    startDependencyThumb.setAttribute('r', barHeight / 4);
                    startDependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
                    group.appendChild(startDependencyThumb);
                }
                var dependencyThumb = document.createElementNS(svgns, 'circle');
                dependencyThumb.setAttribute('cx', itemRight - 2);
                dependencyThumb.setAttribute('cy', barMargin + barHeight / 2);
                dependencyThumb.setAttribute('r', barHeight / 4);
                dependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
                group.appendChild(dependencyThumb);
                ganttChartView.initializeDependencyDraggingThumbs(dependencyThumb, startDependencyThumb, group, item, barMargin + barHeight / 2, itemRight - 2, itemLeft);
            }
        }
        return group;
    };
    settings.summaryTaskTemplate = function (item) {
        var ganttChartView = item.ganttChartView;
        var settings = ganttChartView.settings;
        var items = ganttChartView.items;
        var document = ganttChartView.ownerDocument;
        var group = getChartItemArea(item);
        var itemLeft = ganttChartView.getChartPosition(item.start);
        var itemRight = ganttChartView.getChartPosition(item.finish);
        var height = settings.barHeight * 2.15 / 2.65;
        var bar = document.createElementNS(svgns, 'rect');
        bar.setAttribute('x', itemLeft);
        bar.setAttribute('y', settings.barMargin);
        bar.setAttribute('width', Math.max(0, itemRight - itemLeft - 1));
        bar.setAttribute('height', height);
        var barClass = settings.summaryBarClass;
        if (typeof item.summaryBarClass !== undefinedType)
            barClass = item.summaryBarClass;
        if (typeof item.barClass !== undefinedType)
            barClass = item.barClass;
        if (typeof barClass !== undefinedType)
            bar.setAttribute('class', barClass);
        else {
            var barStyle = settings.summaryBarStyle;
            if (typeof item.summaryBarStyle !== undefinedType)
                barStyle = item.summaryBarStyle;
            if (typeof item.barStyle !== undefinedType)
                barStyle = item.barStyle;
            if (typeof barStyle !== undefinedType)
                bar.setAttribute('style', barStyle);
        }
        group.appendChild(bar);
        if (!item.isExpanded) {
            var line = document.createElementNS(svgns, 'line');
            line.setAttribute('x1', itemLeft);
            line.setAttribute('y1', settings.barMargin + height + 2.5);
            line.setAttribute('x2', itemRight - 1);
            line.setAttribute('y2', settings.barMargin + height + 2.5);
            var lineClass = settings.collapsedSummaryLineClass;
            if (typeof item.collapsedSummaryLineClass !== undefinedType)
                lineClass = item.collapsedSummaryLineClass;
            if (typeof lineClass !== undefinedType)
                line.setAttribute('class', lineClass);
            else {
                var lineStyle = settings.collapsedSummaryLineStyle;
                if (typeof item.collapsedSummaryLineStyle !== undefinedType)
                    lineStyle = item.collapsedSummaryLineStyle;
                if (typeof lineStyle !== undefinedType)
                    line.setAttribute('style', lineStyle);
            }
            group.appendChild(line);
        }
        var startTriangle = document.createElementNS(svgns, 'polygon'), x;
        var y = settings.barMargin - 0.25, h = height + 1.5, tw = settings.barHeight * 3 / 4, teh = settings.barHeight / 4;
        x = itemLeft - 1 - settings.barHeight / 3;
        startTriangle.setAttribute('points', x + ',' + y + ' ' + x + ',' + (y + h) + ' ' + (x + tw / 2) + ',' + (y + h + teh) + ' ' + (x + tw) + ',' + (y + h) + ' ' + (x + tw) + ',' + y);
        if (typeof barClass !== undefinedType)
            startTriangle.setAttribute('class', barClass);
        if (typeof barStyle !== undefinedType)
            startTriangle.setAttribute('style', barStyle);
        group.appendChild(startTriangle);
        var endTriangle = document.createElementNS(svgns, 'polygon');
        x = itemRight + settings.barHeight / 3;
        endTriangle.setAttribute('points', x + ',' + y + ' ' + x + ',' + (y + h) + ' ' + (x - tw / 2) + ',' + (y + h + teh) + ' ' + (x - tw) + ',' + (y + h) + ' ' + (x - tw) + ',' + y);
        if (typeof barClass !== undefinedType)
            endTriangle.setAttribute('class', barClass);
        if (typeof barStyle !== undefinedType)
            endTriangle.setAttribute('style', barStyle);
        group.appendChild(endTriangle);
        if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
            if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
                var startDependencyThumb = null;
                if (typeof settings.allowCreatingStartDependencies === undefinedType || settings.allowCreatingStartDependencies) {
                    startDependencyThumb = document.createElementNS(svgns, 'circle');
                    startDependencyThumb.setAttribute('cx', itemLeft - 0.5);
                    startDependencyThumb.setAttribute('cy', settings.barMargin + settings.barHeight / 2);
                    startDependencyThumb.setAttribute('r', settings.barHeight / 4);
                    startDependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
                    group.appendChild(startDependencyThumb);
                }
                var dependencyThumb = document.createElementNS(svgns, 'circle');
                dependencyThumb.setAttribute('cx', itemRight - 0.5);
                dependencyThumb.setAttribute('cy', settings.barMargin + settings.barHeight / 2);
                dependencyThumb.setAttribute('r', 2.5);
                dependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
                group.appendChild(dependencyThumb);
                ganttChartView.initializeDependencyDraggingThumbs(dependencyThumb, startDependencyThumb, group, item, settings.barMargin + settings.barHeight / 2, itemRight - 1.5, itemLeft);
            }
        }
        return group;
    };
    settings.milestoneTaskTemplate = function (item) {
        var ganttChartView = item.ganttChartView;
        var settings = ganttChartView.settings;
        var items = ganttChartView.items;
        var document = ganttChartView.ownerDocument;
        var group = getChartItemArea(item);
        if (settings.isBaselineVisible && typeof item.baselineStart !== undefinedType) {
            var itemBaselineLeft = ganttChartView.getChartPosition(item.baselineStart);
            var baselineStartDiamond = document.createElementNS(svgns, 'polygon');
            var xb = itemBaselineLeft, yb = settings.barMargin - 1, hb = settings.barHeight + 1;
            baselineStartDiamond.setAttribute('points', xb + ',' + yb + ' ' + (xb - hb / 2) + ',' + (yb + hb / 2) + ' ' + xb + ',' + (yb + hb) + ' ' + (xb + hb / 2) + ',' + (yb + hb / 2));
            var baselineBarClass = settings.baselineBarClass;
            if (typeof item.baselineBarClass !== undefinedType)
                baselineBarClass = item.baselineBarClass;
            if (typeof baselineBarClass !== undefinedType)
                baselineStartDiamond.setAttribute('class', baselineBarClass);
            else {
                var baselineBarStyle = settings.baselineBarStyle;
                if (typeof item.baselineBarStyle !== undefinedType)
                    baselineBarStyle = item.baselineBarStyle;
            }
            baselineStartDiamond.setAttribute('style', baselineBarStyle);
            group.appendChild(baselineStartDiamond);
        }
        var itemLeft = ganttChartView.getChartPosition(item.start);
        var startDiamond = document.createElementNS(svgns, 'polygon');
        var x = itemLeft - 1, y = settings.barMargin, h = settings.barHeight + 1;
        startDiamond.setAttribute('points', x + ',' + y + ' ' + (x - h / 2) + ',' + (y + h / 2) + ' ' + x + ',' + (y + h) + ' ' + (x + h / 2) + ',' + (y + h / 2));
        var barClass = settings.milestoneBarClass;
        if (typeof item.milestoneBarClass !== undefinedType)
            barClass = item.milestoneBarClass;
        if (typeof item.barClass !== undefinedType)
            barClass = item.barClass;
        if (typeof barClass !== undefinedType)
            startDiamond.setAttribute('class', barClass);
        else {
            var barStyle = settings.milestoneBarStyle;
            if (typeof item.milestoneBarStyle !== undefinedType)
                barStyle = item.milestoneBarStyle;
            if (typeof item.barStyle !== undefinedType)
                barStyle = item.barStyle;
            if (typeof barStyle !== undefinedType)
                startDiamond.setAttribute('style', barStyle);
        }
        group.appendChild(startDiamond);
        if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
            var thumb = document.createElementNS(svgns, 'rect');
            thumb.setAttribute('x', x - h / 2);
            thumb.setAttribute('y', settings.barMargin);
            thumb.setAttribute('width', h);
            thumb.setAttribute('height', h);
            thumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: move');
            group.appendChild(thumb);
            ganttChartView.initializeTaskDraggingThumbs(thumb, null, null, null, item, x, x, x);
            if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
                var dependencyThumb = document.createElementNS(svgns, 'circle');
                dependencyThumb.setAttribute('cx', x);
                dependencyThumb.setAttribute('cy', settings.barMargin + settings.barHeight / 2);
                dependencyThumb.setAttribute('r', settings.barHeight / 4);
                dependencyThumb.setAttribute('style', 'fill: White; fill-opacity: 0; cursor: pointer');
                group.appendChild(dependencyThumb);
                ganttChartView.initializeDependencyDraggingThumbs(dependencyThumb, null, group, item, settings.barMargin + settings.barHeight / 2, x, x);
            }
        }
        return group;
    };
    settings.dependencyLineTemplate = function (item, predecessorItem) {
        var ganttChartView = item.ganttChartView;
        var settings = ganttChartView.settings;
        var items = ganttChartView.items;
        var document = ganttChartView.ownerDocument;
        function getDependencyLinePathData(item, predecessorItem) {
            var y = ganttChartView.getItemTop(predecessorItem.item);
            var y1 = ganttChartView.getItemTop(item);
            var d = 'M ', x, x1, x2, y, h = settings.itemHeight, h2 = h / 2, extraLineLength = h / 3.5, arrowSpace = 4, horizontal = false, x0;
            if (y == y1 && typeof predecessorItem.dependencyType === undefinedType || predecessorItem.dependencyType == 'FinishStart' || predecessorItem.dependencyType == 'FS' || predecessorItem.dependencyType == 'StartFinish' || predecessorItem.dependencyType == 'SF') {
                if (typeof predecessorItem.dependencyType === undefinedType || predecessorItem.dependencyType == 'FinishStart' || predecessorItem.dependencyType == 'FS') {
                    x = ganttChartView.getChartPosition(predecessorItem.item.finish);
                    x1 = ganttChartView.getChartPosition(item.start);
                }
                else {
                    x = ganttChartView.getChartPosition(predecessorItem.item.start);
                    x1 = ganttChartView.getChartPosition(item.finish);
                }
                y = y - y1 + 0.5;
                d += x + ' ' + (y + h2) + ' L ' + (x1 + (x1 > x ? -1 : +1) * (h / 5 - 1)) + ' ' + (y + h2);
            }
            else {
                if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == 'StartStart' || predecessorItem.dependencyType == 'SS' || predecessorItem.dependencyType == 'StartFinish' || predecessorItem.dependencyType == 'SF')) {
                    x = ganttChartView.getChartPosition(predecessorItem.item.start);
                    if ((predecessorItem.item.hasChildren && (typeof predecessorItem.item.isSummaryEnabled === undefinedType || predecessorItem.item.isSummaryEnabled)))
                        x -= h / 5 + 0.25;
                    else if (predecessorItem.item.isMilestone)
                        x -= h / 4;
                    x1 = x - extraLineLength;
                }
                else {
                    x = ganttChartView.getChartPosition(predecessorItem.item.finish) - 1;
                    if (predecessorItem.item.hasChildren && (typeof predecessorItem.item.isSummaryEnabled === undefinedType || predecessorItem.item.isSummaryEnabled))
                        x += h / 5 + 0.25;
                    else if (predecessorItem.item.isMilestone)
                        x += h / 4;
                    else {
                        x0 = ganttChartView.getChartPosition(predecessorItem.item.start) + 4 - 1;
                        if (x < x0)
                            x = x0;
                    }
                    x1 = x + extraLineLength;
                }
                y = y - y1 + 0.5;
                d += x + ' ' + (y + h2) + ' L ' + x1 + ' ' + (y + h2);
                if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == 'FinishFinish' || predecessorItem.dependencyType == 'FF' || predecessorItem.dependencyType == 'StartFinish' || predecessorItem.dependencyType == 'SF')) {
                    x = ganttChartView.getChartPosition(item.finish) - 1;
                    if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == 'FinishFinish' || predecessorItem.dependencyType == 'FF')) {
                        horizontal = true;
                        if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                            x += h / 5 + 1;
                        else if (item.isMilestone)
                            x += h / 4 + 1;
                        else {
                            x0 = ganttChartView.getChartPosition(item.start) + 4 - 1;
                            if (x < x0)
                                x = x0;
                        }
                        x2 = x + extraLineLength;
                    }
                    else {
                        if (item.isMilestone)
                            x2 = x;
                        else {
                            x0 = ganttChartView.getChartPosition(item.start) + 4;
                            if (x < x0)
                                x = x0;
                            x2 = x - 2.5;
                        }
                    }
                }
                else {
                    x = ganttChartView.getChartPosition(item.start);
                    if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == 'StartStart' || predecessorItem.dependencyType == 'SS')) {
                        horizontal = true;
                        if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                            x -= h / 5 + 1;
                        else if (item.isMilestone)
                            x -= h / 4 + 1;
                        x2 = x - extraLineLength;
                    }
                    else {
                        if (item.isMilestone)
                            x2 = x - 1;
                        else {
                            x2 = x + 1.5;
                            var xf = ganttChartView.getChartPosition(item.finish);
                            if (x2 < x1 && xf - x1 > extraLineLength * 2 && item.start >= predecessorItem.item.finish)
                                x2 = x1;
                        }
                    }
                }
                if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == 'StartStart' || predecessorItem.dependencyType == 'SS' || predecessorItem.dependencyType == 'StartFinish' || predecessorItem.dependencyType == 'SF')) {
                    if (x2 > x1) {
                        y -= extraLineLength / 6;
                        if (y <= 0)
                            y += h2;
                        else
                            y -= h2;
                        d += ' ' + x1 + ' ' + (y + h2);
                    }
                    d += ' ' + x2 + ' ' + (y + h2);
                }
                else {
                    if (x2 < x1) {
                        y -= extraLineLength / 6;
                        if (y <= 0)
                            y += h2;
                        else
                            y -= h2;
                        d += ' ' + x1 + ' ' + (y + h2);
                    }
                    d += ' ' + x2 + ' ' + (y + h2);
                }
                if (horizontal)
                    y = h2 + 0.5;
                else if (y <= 0)
                    y = h / 4 - (!item.isMilestone && !item.hasChildren ? barMargin : 1) - arrowSpace;
                else
                    y = h - h / 4 + (!item.isMilestone && !item.hasChildren ? barMargin : 1) + arrowSpace;
                if (horizontal) {
                    if (x2 > x - arrowSpace)
                        arrowSpace = -arrowSpace;
                    x -= arrowSpace;
                }
                d += ' ' + x2 + ' ' + y;
                if (horizontal)
                    d += ' ' + x + ' ' + y;
            }
            return d;
        }
        var group = document.createElementNS(svgns, 'g');
        var data = getDependencyLinePathData(item, predecessorItem);
        var polylineZone = document.createElementNS(svgns, 'path');
        polylineZone.setAttribute('d', data);
        if (typeof settings.dependencyLineZoneClass !== undefinedType)
            polylineZone.setAttribute('class', settings.dependencyLineZoneClass);
        if (typeof settings.dependencyLineZoneStyle !== undefinedType)
            polylineZone.setAttribute('style', settings.dependencyLineZoneStyle);
        group.appendChild(polylineZone);
        var polyline = document.createElementNS(svgns, 'path');
        polyline.setAttribute('d', data);
        var polylineClass = settings.dependencyLineClass;
        if (typeof predecessorItem.dependencyLineClass !== undefinedType)
            polylineClass = predecessorItem.dependencyLineClass;
        if (typeof polylineClass !== undefinedType)
            polyline.setAttribute('class', polylineClass);
        else {
            var polylineStyle = settings.dependencyLineStyle;
            if (typeof predecessorItem.dependencyLineStyle !== undefinedType)
                polylineStyle = predecessorItem.dependencyLineStyle;
            if (typeof polylineStyle !== undefinedType)
                polyline.setAttribute('style', polylineStyle);
        }
        group.appendChild(polyline);
        return group;
    };
    settings.assignmentsTemplate = function (item) {
        var ganttChartView = item.ganttChartView;
        var settings = ganttChartView.settings;
        var document = ganttChartView.ownerDocument;
        var text = document.createElementNS(svgns, 'text');
        var itemRight = ganttChartView.getChartPosition(item.finish);
        if (item.isMilestone || (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)))
            itemRight += settings.barHeight / 2;
        text.setAttribute('x', itemRight + 7);
        text.setAttribute('y', settings.barMargin + settings.barHeight - 1);
        var isPhone = settings.target == 'Phone';
        var content = !isPhone ? item.assignmentsContent : item.content;
        if (typeof content === undefinedType)
            content = '';
        text.appendChild(document.createTextNode(content));
        if (typeof settings.assignmentsClass !== undefinedType)
            text.setAttribute('class', settings.assignmentsClass);
        else if (typeof settings.assignmentsStyle !== undefinedType)
            text.setAttribute('style', settings.assignmentsStyle);
        return text;
    };
    settings.itemTemplate = function (item) {
        var ganttChartView = item.ganttChartView;
        var document = item.ganttChartView.ownerDocument;
        var toolTip = document.createElementNS(svgns, 'title');
        toolTip.appendChild(getTextNode(document, item.content));
        if (typeof settings.areToolTipsSimplified === undefinedType || !settings.areToolTipsSimplified) {
            toolTip.appendChild(document.createTextNode('  '));
            if (typeof item.loadChartView === undefinedType) {
                if (item.parent) {
                    toolTip.appendChild(document.createElement('br'));
                    toolTip.appendChild(document.createTextNode('Parent: ' + item.parent.content + '  '));
                }
                if (item.hasChildren) {
                    toolTip.appendChild(document.createElement('br'));
                    toolTip.appendChild(document.createTextNode('Children: ' + item.children.length + '  '));
                }
                toolTip.appendChild(document.createElement('br'));
                toolTip.appendChild(document.createTextNode((!item.isMilestone ? 'Start: ' : '') + settings.dateTimeFormatter(ganttChartView.getOutputDate(item.start)) + '  '));
                if (!item.isMilestone) {
                    toolTip.appendChild(document.createElement('br'));
                    toolTip.appendChild(document.createTextNode('Finish: ' + settings.dateTimeFormatter(ganttChartView.getOutputDate(item.finish)) + '  '));
                }
                if (settings.areTaskAssignmentsVisible && item.assignmentsContent) {
                    toolTip.appendChild(document.createElement('br'));
                    toolTip.appendChild(document.createTextNode('Assignments: ' + item.assignmentsContent + '  '));
                }
                if (!item.isMilestone) {
                    toolTip.appendChild(document.createElement('br'));
                    toolTip.appendChild(document.createTextNode('Effort: ' + (ganttChartView.getItemTotalEffort(item) / hourDuration) + 'h' + '  '));
                    if (settings.isTaskCompletedEffortVisible) {
                        var completion = ganttChartView.getItemCompletion(item);
                        if (!isNaN(completion)) {
                            toolTip.appendChild(document.createElement('br'));
                            toolTip.appendChild(document.createTextNode('Completed: ' + (Math.round(completion * 100 * 100) / 100) + '%' + '  '));
                        }
                    }
                }
                if (settings.areTaskDependenciesVisible && item.predecessors && item.predecessors.length > 0) {
                    toolTip.appendChild(document.createElement('br'));
                    var predecessorsString = '';
                    for (var i = 0; i < item.predecessors.length; i++) {
                        var predecessor = item.predecessors[i];
                        if (!predecessor.item)
                            continue;
                        if (predecessorsString.length > 0)
                            predecessorsString += ', ';
                        predecessorsString += predecessor.item.content;
                        if (predecessor.dependencyType)
                            predecessorsString += ' (' + getDependencyTypeString(predecessor.dependencyType) + ')';
                    }
                    toolTip.appendChild(document.createTextNode('Predecessors: ' + predecessorsString + '  '));
                }
            }
            else if (!isNaN(item.units)) {
                toolTip.appendChild(document.createElement('br'));
                toolTip.appendChild(document.createTextNode('Allocation: ' + (Math.round(item.units * 100 * 100) / 100) + '%  '));
            }
        }
        return toolTip;
    };
    settings.predecessorItemTemplate = function (item, predecessorItem) {
        var document = item.ganttChartView.ownerDocument;
        var toolTip = document.createElementNS(svgns, 'title');
        toolTip.appendChild(getTextNode(document, predecessorItem.item.content + ' - ' + item.content));
        if (typeof settings.areToolTipsSimplified === undefinedType || !settings.areToolTipsSimplified) {
            toolTip.appendChild(document.createTextNode('  '));
            if (predecessorItem.dependencyType) {
                toolTip.appendChild(document.createElement('br'));
                toolTip.appendChild(getTextNode(document, 'Type: ' + getDependencyTypeString(predecessorItem.dependencyType) + '  '));
            }
            if (predecessorItem.lag) {
                toolTip.appendChild(document.createElement('br'));
                toolTip.appendChild(getTextNode(document, 'Lag: ' + (predecessorItem.lag / hourDuration) + 'h' + '  '));
            }
        }
        return toolTip;
    };
}
