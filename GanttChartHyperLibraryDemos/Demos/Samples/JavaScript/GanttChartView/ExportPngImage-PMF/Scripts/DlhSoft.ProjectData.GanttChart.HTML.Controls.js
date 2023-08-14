var DlhSoft;
if (typeof DlhSoft === "undefined")
    DlhSoft = { assemblies: [], buildReleaseDate: new Date(1, 0, 1) };
DlhSoft.assemblies.push({
    assembly: "DlhSoft.ProjectData.GanttChart.HTML.Controls",
    company: "DlhSoft",
    product: "Project Data Modern Library",
    version: "5.3.20.5",
    copyright: "Copyright © 2012-2023 DlhSoft",
    title: "Project Data Gantt Chart HTML Controls",
    description: "Project Data Gantt Chart related HTML client components"
});
DlhSoft.buildReleaseDate = function (y, m, d) { var date = new Date(y, m - 1, d); return date > DlhSoft.buildReleaseDate ? date : DlhSoft.buildReleaseDate; }
(2023, 08, 14);

var _0x2223=["\x4C\x69\x63\x65\x6E\x73\x69\x6E\x67"];if(DlhSoft[_0x2223[0]]==undefined){DlhSoft[_0x2223[0]]=function (){return {setLicense:function (){return ;} ,validate:function (){return ;} };} ();} ;

if (DlhSoft.Controls == undefined)
    DlhSoft.Controls = {};
if (DlhSoft.Controls.GanttChartView == undefined) {
    DlhSoft.Controls.GanttChartView = function () {
        var 
            undefinedType = "undefined", objectType = "object", arrayType = "array", stringType = "string", numberType = "number", functionType = "function", trueStringValue = "true",
            svgns = "http://www.w3.org/2000/svg",
            daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], isLeapYear = function (year) { if (year % 400 == 0) return true; if (year % 100 == 0) return false; if (year % 4 == 0) return true; return false; }, getDaysInMonth = function (year, month) { return daysInMonth[month] + (month != 1 || !isLeapYear(year) ? 0 : 1); },
            secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration, quarterHourDuration = hourDuration / 4, dayDuration = 24 * hourDuration, weekDuration = 7 * dayDuration, initialSundayDateTimeValue = 3 * dayDuration,
            dragZoneWidth = 24, dragAmount = 2.5 * 8,
            minDate = new Date(initialSundayDateTimeValue), maxDate = new Date(initialSundayDateTimeValue + 10000 * 365.25 * dayDuration),

            event = function (ganttChartView, object, event, handler, useCapture) {
                if (ganttChartView.internalEventListeners)
                    ganttChartView.internalEventListeners.push({ object: object, event: event, handler: handler, useCapture: useCapture });
                return handler;
            },
            simulateEvent = function (element, eventName) {
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent(eventName, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, element);
                element.dispatchEvent(e);
            },

            initialize = function (ganttChartView, items, settings, license) {
                if (typeof ganttChartView.ownerDocument.createElementNS === undefinedType || typeof ganttChartView.ownerDocument.addEventListener === undefinedType) {
                    alert("The required HTML5 features are not supported by the application host. Some features will be unavailable. Consider upgrading.");
                    return;
                }

                //DlhSoft.Licensing.validate(ganttChartView, "DlhSoft.Controls", "GanttChartView", "DlhSoft.ProjectData.GanttChart.HTML.Controls", "5", license, settings);
                var _0x4dd9 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73", "\x47\x61\x6E\x74\x74\x43\x68\x61\x72\x74\x56\x69\x65\x77", "\x44\x6C\x68\x53\x6F\x66\x74\x2E\x50\x72\x6F\x6A\x65\x63\x74\x44\x61\x74\x61\x2E\x47\x61\x6E\x74\x74\x43\x68\x61\x72\x74\x2E\x48\x54\x4D\x4C\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73", "\x35", "\x76\x61\x6C\x69\x64\x61\x74\x65", "\x4C\x69\x63\x65\x6E\x73\x69\x6E\x67"]; DlhSoft[_0x4dd9[5]][_0x4dd9[4]](ganttChartView, _0x4dd9[0], _0x4dd9[1], _0x4dd9[2], _0x4dd9[3], license, settings);

                ganttChartView.isInitializing = true;

                if (typeof ganttChartView.initializedItems !== undefinedType) {
                    ganttChartView.initializedItems.forEach(function (item) {
                        if (item.gridItemContainer && item.gridItemContainer.parentNode)
                            item.gridItemContainer.parentNode.removeChild(item.gridItemContainer);
                        if (item.chartItemArea && item.chartItemArea.parentNode)
                            item.chartItemArea.parentNode.removeChild(item.chartItemArea);
                        delete item.ganttChartView;
                        delete item.chartItem;
                        delete item.chartItemArea;
                        delete item.gridItem;
                        delete item.gridItemContent;
                        delete item.gridItemSelectionContainer;
                        delete item.gridItemContainer;
                        delete item.alternativeContentContainer;
                        delete item.toggleButton;
                        delete item.parent;
                        delete item.children;
                        delete item.selectionInput;
                        delete item.contentInput;
                        delete item.startInput;
                        delete item.finishInput;
                        delete item.milestoneInput;
                        delete item.assignmentsContentInput;
                        delete item.completedInput;
                        delete item.dependsOf;
                        delete item.touchMoveHandler;
                        delete item.touchEndHandler;
                    });
                    if (typeof ganttChartView.draggableItems !== undefinedType)
                        delete ganttChartView.draggableItems;
                    if (typeof ganttChartView.draggableDependencyItems !== undefinedType)
                        delete ganttChartView.draggableDependencyItems;
                    if (typeof ganttChartView.draggableOrderingItems !== undefinedType)
                        delete ganttChartView.draggableOrderingItems;
                }
                ganttChartView.initializedItems = items.slice();

                if (ganttChartView.internalEventListeners) {
                    ganttChartView.internalEventListeners.forEach(function (eventListener) {
                        eventListener.object.removeEventListener(eventListener.event, eventListener.handler, eventListener.useCapture);
                    });
                }
                ganttChartView.internalEventListeners = [];

                if (typeof ganttChartView.settings !== undefinedType && typeof ganttChartView.settings.toggleButtonAreaWidth !== undefinedType)
                    delete ganttChartView.settings.toggleButtonAreaWidth;
                if (typeof ganttChartView.items !== undefinedType) {
                    for (var ei = 0; ei < ganttChartView.items.length; ei++)
                        delete ganttChartView.items[ei].successors;
                }

                if (typeof settings !== objectType)
                    settings = {};

                initializeItems(items, settings);

                initializeSettings(settings, items, ganttChartView);
                initializeInterface(ganttChartView, items, settings);

                var columns = settings.columns;
                var scales = settings.scales;
                initializeColumns(columns, ganttChartView, settings);
                initializeHierarchy(items, ganttChartView);
                initializeTimingInformation(items, settings, ganttChartView);

                if (typeof settings.visibilityFilter !== undefinedType) {
                    applyVisibilityFilter(items, settings.visibilityFilter);

                    var visibilityIndex = 0;
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (typeof item.ganttChartItems === undefinedType)
                            continue;
                        if (!item.isHidden)
                            item.scheduleChartVisibilityIndex = visibilityIndex++;
                        for (var j = 0; j < item.ganttChartItems.length; j++) {
                            var ganttChartItem = item.ganttChartItems[j];
                            if (item.isHidden)
                                ganttChartItem.isHidden = true;
                            ganttChartItem.displayRowIndex = item.scheduleChartVisibilityIndex;
                        }
                    }
                }

                // Layout.
                var contentHeight = getContentHeight(ganttChartView, items, settings);
                var document = ganttChartView.ownerDocument;
                var mainContainer = document.createElement("div");
                mainContainer.setAttribute("style", "font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: " + (settings.classic ? "small" : "12px") + "; overflow: auto");
                var mainInnerContainer = document.createElement("div");
                if (typeof settings.containerClass !== undefinedType)
                    mainInnerContainer.setAttribute("class", settings.containerClass);
                if (typeof settings.containerStyle !== undefinedType)
                    mainInnerContainer.setAttribute("style", settings.containerStyle);
                mainContainer.appendChild(mainInnerContainer);
                var mainContentContainer = document.createElement("div");
                mainContentContainer.setAttribute("style", "border: solid 1px " + settings.border + "; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; overflow: auto");
                mainInnerContainer.appendChild(mainContentContainer);
                var gridContainer = document.createElement("div");
                gridContainer.setAttribute("style", "overflow: auto; float: left; border-right: solid 1px " + settings.border + "; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: " + settings.gridWidth);
                if (settings.isGridVisible)
                    mainContentContainer.appendChild(gridContainer);
                var chartContainer = document.createElement("div");
                chartContainer.setAttribute("style", "overflow: auto; float: right; width: " + settings.chartWidth);
                mainContentContainer.appendChild(chartContainer);
                var splitter = document.createElement("div");
                splitter.setAttribute("style", "position: relative; opacity: 0; left: 0px; width: " + (settings.splitterWidth * 2) + "px; height: 0px; border-left: solid " + settings.splitterWidth + "px " + settings.splitterBackground + "; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: ew-resize; -ms-touch-action: pinch-zoom; touch-action: auto");
                splitter.addEventListener("mouseover", event(ganttChartView, splitter, "mouseover", function (e) { splitter.style.opacity = 1; if (splitter.isWaiting !== undefinedType) delete splitter.isWaiting; }, true), true);
                splitter.addEventListener("mouseout", event(ganttChartView, splitter, "mouseout", function (e) { if (typeof splitter.isWaiting !== undefinedType) return; splitter.isWaiting = true; setTimeout(function () { if (typeof splitter.isWaiting === undefinedType) return; delete splitter.isWaiting; if (typeof splitter.x !== undefinedType) return; splitter.style.opacity = 0; }, 250); }, true), true);
                splitter.addEventListener("mousedown", event(ganttChartView, splitter, "mousedown", function (e) { if (e.button != 0) return; splitter.style.opacity = 1; splitter.x = e.clientX; splitter.gridWidth = gridContainer.offsetWidth; }, true), true);
                splitter.addEventListener("touchstart", event(ganttChartView, splitter, "touchstart", function (e) { var e = e.touches[0]; splitter.style.opacity = 1; splitter.x = e.clientX; splitter.gridWidth = gridContainer.offsetWidth; }, true), true);
                function dragSplitter(e) {
                    if (typeof splitter.x === undefinedType)
                        return;
                    if (ganttChartView.offsetWidth <= 0)
                        return;
                    var difference = e.clientX - splitter.x;
                    var updatedGridWidth = splitter.gridWidth + difference, updatedChartWidth = ganttChartView.offsetWidth - updatedGridWidth - 3;
                    var minGridWidth = Math.max(1, settings.minGridWidth), minChartWidth = Math.max(1, settings.minChartWidth);
                    if (updatedGridWidth < minGridWidth) {
                        updatedChartWidth -= (minGridWidth - updatedGridWidth);
                        updatedGridWidth = minGridWidth;
                    }
                    else if (updatedChartWidth < minChartWidth) {
                        updatedGridWidth -= (minChartWidth - updatedChartWidth);
                        updatedChartWidth = minChartWidth;
                    }
                    if (updatedGridWidth < 1)
                        updatedGridWidth = 1;
                    if (updatedChartWidth < 1)
                        updatedChartWidth = 1;
                    if (typeof gridContainer.percent !== undefinedType)
                        delete gridContainer.percent;
                    var percent = Math.ceil(updatedGridWidth * 1000000 / ganttChartView.offsetWidth) / 10000;
                    gridContainer.style.width = percent + "%";
                    chartContainer.style.width = (100 - percent) + "%";
                    settings.gridWidth = gridContainer.offsetWidth + "px";
                    settings.chartWidth = chartContainer.offsetWidth + "px";
                    updateSplitter(splitter, gridContainer, settings);
                    if (typeof settings.splitterPositionChangeHandler !== undefinedType)
                        setTimeout(function () { settings.splitterPositionChangeHandler(gridContainer.offsetWidth, chartContainer.offsetWidth); }, 0);
                }
                document.addEventListener("mousemove", event(ganttChartView, document, "mousemove", function (e) {
                    dragSplitter(e);
                }, true), true);
                document.addEventListener("touchmove", event(ganttChartView, document, "touchmove", function (e) {
                    dragSplitter(e.touches[0]);
                }, true), true);
                document.addEventListener("mouseup", event(ganttChartView, document, "mouseup", function (e) {
                    if (typeof splitter.x !== undefinedType) {
                        delete splitter.x;
                        splitter.style.opacity = 0;
                    }
                    if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips) {
                        toolTip = ganttChartView.toolTip;
                        if (toolTip) {
                            toolTip.disable();
                            toolTip.hide();
                        }
                    }
                }, true), true);
                document.addEventListener("touchend", event(ganttChartView, document, "touchend", function (e) {
                    if (typeof splitter.x !== undefinedType) {
                        delete splitter.x;
                        splitter.style.opacity = 0;
                    }
                }, true), true);
                if (settings.isGridVisible && settings.isSplitterEnabled)
                    mainContentContainer.appendChild(splitter);
                var gridHeaderScrollArea = document.createElement("div");
                gridHeaderScrollArea.setAttribute("style", "float: right; background: " + settings.headerBackground + "; width: 0px; height: " + settings.headerHeight + "px");
                gridContainer.appendChild(gridHeaderScrollArea);
                var gridHeaderContainer = document.createElement("div");
                gridHeaderContainer.setAttribute("style", "overflow: hidden; background: " + settings.headerBackground + "; border-bottom: solid 1px " + settings.border + "; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; height: " + settings.headerHeight + "px");
                gridContainer.appendChild(gridHeaderContainer);
                var chartHeaderScrollArea = document.createElement("div");
                chartHeaderScrollArea.setAttribute("style", "float: right; background: " + settings.headerBackground + "; width: 0px; height: " + settings.headerHeight + "px");
                chartContainer.appendChild(chartHeaderScrollArea);
                var chartHeaderContainer = document.createElement("div");
                chartHeaderContainer.setAttribute("style", "overflow: hidden; background: " + settings.headerBackground + "; border-bottom: solid 1px " + settings.border + "; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; height: " + settings.headerHeight + "px");
                chartContainer.appendChild(chartHeaderContainer);
                var gridContentContainer = document.createElement("div");
                gridContentContainer.setAttribute("style", "overflow-x: " + (typeof settings.isExport === undefinedType || !settings.isExport ? "scroll" : "hidden") + "; overflow-y: " + (typeof settings.isExport === undefinedType || !settings.isExport ? "auto" : "hidden") + "; height: " + contentHeight);
                gridContainer.appendChild(gridContentContainer);
                var chartContentContainer = document.createElement("div");
                chartContentContainer.setAttribute("style", "overflow-x: " + (typeof settings.isExport === undefinedType || !settings.isExport ? "scroll" : "hidden") + "; overflow-y: " + (typeof settings.isExport === undefinedType || !settings.isExport ? "auto" : "hidden") + "; height: " + contentHeight);
                chartContainer.appendChild(chartContentContainer);
                var gridWidth = getGridWidth(columns);
                var gridHeader = document.createElement("div");
                gridHeader.setAttribute("style", "background: " + settings.headerBackground + "; border-bottom: solid 1px " + settings.border + "; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: " + gridWidth + "px; overflow: hidden; height: " + settings.headerHeight + "px");
                gridHeaderContainer.appendChild(gridHeader);
                var gridContent = document.createElement("div");
                gridContent.setAttribute("style", "float: left; width: " + gridWidth + "px; overflow: auto" + (settings.horizontalGridLines ? "; border-bottom: 1px solid " + settings.horizontalGridLines + "; margin-bottom: -1px; ; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box" : ""));
                gridContentContainer.appendChild(gridContent);
                if (typeof settings.extraSpaceHeight !== undefinedType) {
                    var gridExtraSpace = document.createElement("div");
                    gridExtraSpace.setAttribute("style", "overflow: hidden; width: " + gridWidth + "px; height: " + settings.extraSpaceHeight + "px");
                    gridContentContainer.appendChild(gridExtraSpace);
                }
                var chartWidth = getChartWidth(settings);
                var chartHeader = document.createElement("div");
                chartHeader.setAttribute("style", "background: " + settings.headerBackground + "; border-bottom: solid 1px " + settings.border + "; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: " + chartWidth + "px; height: " + settings.headerHeight + "px");
                chartHeaderContainer.appendChild(chartHeader);
                var chartContent = document.createElement("div");
                chartContent.setAttribute("style", "float: left; overflow: hidden; width: " + chartWidth + "px; height: 0px");
                chartContentContainer.appendChild(chartContent);
                var chartArea = document.createElementNS(svgns, "svg");
                chartArea.setAttribute("style", "width: " + chartWidth + "px; height: 0px");
                var chartAreaDefinitions = settings.styleDefinitionTemplate(ganttChartView);
                chartArea.appendChild(chartAreaDefinitions);
                chartArea.chartAreaDefinitions = chartAreaDefinitions;
                var chartAreaAlternativeRows = document.createElementNS(svgns, "g");
                chartArea.appendChild(chartAreaAlternativeRows);
                chartContent.chartAreaAlternativeRows = chartAreaAlternativeRows;
                var resetChartAreaDefinitions = function (e) {
                    setTimeout(function () {
                        try {
                            var chartArea = chartContent.chartArea;
                            var chartAreaDefinitions = chartArea.chartAreaDefinitions;
                            chartArea.removeChild(chartAreaDefinitions);
                            if (chartArea.childNodes.length > 0)
                                chartArea.insertBefore(chartAreaDefinitions, chartArea.childNodes[0]);
                            else
                                chartArea.appendChild(chartAreaDefinitions);
                        }
                        catch (exc) { }
                    }, 0);
                };
                chartArea.addEventListener("mousedown", event(ganttChartView, chartArea, "mousedown", resetChartAreaDefinitions, true), true);
                document.addEventListener("mouseup", event(ganttChartView, document, "mouseup", resetChartAreaDefinitions, true), true);
                ganttChartView.resetChartAreaDefinitions = resetChartAreaDefinitions;
                chartContent.appendChild(chartArea);
                chartContent.chartArea = chartArea;
                if (typeof settings.extraSpaceHeight !== undefinedType) {
                    var chartExtraSpace = document.createElement("div");
                    chartExtraSpace.setAttribute("style", "overflow: hidden; width: " + chartWidth + "px; height: " + settings.extraSpaceHeight + "px");
                    chartContentContainer.appendChild(chartExtraSpace);
                    chartContentContainer.chartExtraSpace = chartExtraSpace;
                }
                var previousClientWidth, previousClientDpi, previousClientHeight, previousClientChartHeight;
                setTimeout(function () {
                    previousClientDpi = screen.deviceXDPI;
                    previousClientWidth = ganttChartView.isInitialized ? -1 : ganttChartView.offsetWidth;
                    previousClientHeight = ganttChartView.isInitialized ? -1 : ganttChartView.offsetHeight;
                    previousClientChartHeight = chartContainer.offsetHeight;
                }, 0);
                if (typeof ganttChartView.splitterUpdateTimer !== undefinedType)
                    clearInterval(ganttChartView.splitterUpdateTimer);
                ganttChartView.splitterUpdateTimer = setInterval(function () {
                    try {
                        if (typeof splitter.x !== undefinedType)
                            return;
                        if (ganttChartView.offsetWidth <= 0)
                            return;
                        var clientWidth = ganttChartView.offsetWidth, clientHeight = chartContainer.offsetHeight;
                        var clientDpi = screen.deviceXDPI;
                        if (clientWidth != previousClientWidth || clientDpi != previousClientDpi) {
                            var updatedGridWidth = typeof gridContainer.percent !== undefinedType ? gridContainer.percent * clientWidth : gridContainer.offsetWidth;
                            var updatedChartWidth = chartContainer.offsetWidth;
                            var minGridWidth = Math.max(1, settings.minGridWidth), minChartWidth = Math.max(1, settings.minChartWidth);
                            if (updatedGridWidth < minGridWidth) {
                                updatedChartWidth -= (minGridWidth - updatedGridWidth);
                                updatedGridWidth = minGridWidth;
                            }
                            else if (updatedChartWidth < minChartWidth) {
                                updatedGridWidth -= (minChartWidth - updatedChartWidth);
                                updatedChartWidth = minChartWidth;
                            }
                            if (updatedGridWidth < 1)
                                updatedGridWidth = 1;
                            if (updatedChartWidth < 1)
                                updatedChartWidth = 1;
                            var percent = Math.ceil(updatedGridWidth * 100 / clientWidth);
                            gridContainer.percent = percent / 100;
                            gridContainer.style.width = percent + "%";
                            chartContainer.style.width = (100 - percent) + "%";
                            settings.gridWidth = gridContainer.offsetWidth + "px";
                            settings.chartWidth = chartContainer.offsetWidth + "px";
                            updateSplitter(splitter, gridContainer, settings);
                            if (typeof settings.splitterPositionChangeHandler !== undefinedType) {
                                var gw = gridContainer.offsetWidth, cw = chartContainer.offsetWidth;
                                if (gw > 0 && cw > 0)
                                    setTimeout(function () { settings.splitterPositionChangeHandler(gw, cw); }, 0);
                            }
                            previousClientWidth = clientWidth;
                            previousClientHeight = clientHeight;
                            previousClientDpi = clientDpi;
                        }
                        else if (clientHeight != previousClientChartHeight) {
                            updateSplitter(splitter, gridContainer, settings);
                            previousClientChartHeight = clientHeight;
                        }
                    }
                    catch (exc) {
                        try { clearInterval(ganttChartView.splitterUpdateTimer); } catch (excC) { }
                    }
                }, 100);
                if (typeof ganttChartView.heightUpdateTimer !== undefinedType)
                    clearInterval(ganttChartView.heightUpdateTimer);
                ganttChartView.heightUpdateTimer = setInterval(function () {
                    try {
                        if (ganttChartView.clientHeight <= 0)
                            return;
                        var clientHeight = ganttChartView.clientHeight;
                        if (clientHeight != previousClientHeight) {
                            var contentHeight = getContentHeight(ganttChartView, items, settings);
                            gridContentContainer.style.height = contentHeight;
                            chartContentContainer.style.height = contentHeight;
                            updateSplitter(splitter, gridContainer, settings);
                            setAvailableHeight(chartContent, chartContentContainer);
                            updateChartHeight(chartContent, items, settings);
                            updateVirtualizationVisibility(items, chartContentContainer, settings);
                            clientHeight = ganttChartView.clientHeight;
                            previousClientHeight = clientHeight;
                        }
                    }
                    catch (exc) {
                        try { clearInterval(ganttChartView.heightUpdateTimer); } catch (excC) { }
                    }
                }, 100);
                if (typeof ganttChartView.scaleUpdateTimer !== undefinedType)
                    clearInterval(ganttChartView.scaleUpdateTimer);
                ganttChartView.chartScale = 1;
                ganttChartView.scaleUpdateTimer = setInterval(function () {
                    try {
                        var height = ganttChartView.getItemsHeight();
                        var scale = ganttChartView.gridContent.clientHeight / height;
                        ganttChartView.chartScale = scale;
                        ganttChartView.chartContent.style.transform = 'scaleY(' + scale + ') translateY(-' + (height - ganttChartView.gridContent.clientHeight) / 2 + 'px)';
                    }
                    catch (exc) { }
                }, 1000);
                var getOffsetRect = function (elem) {
                    var box = elem.getBoundingClientRect();
                    var body = document.body;
                    var docElem = document.documentElement;
                    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
                    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
                    var clientTop = docElem.clientTop || body.clientTop || 0;
                    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
                    var top = box.top + scrollTop - clientTop;
                    var left = box.left + scrollLeft - clientLeft;
                    return { top: Math.round(top), left: Math.round(left) };
                };
                var mouseHandler = function (e, isOnChart, isOnItemsArea, clickCount, source, eventName) {
                    if (settings.mouseHandler ||
                        (settings.mouseMoveHandler && eventName == "mousemove") ||
                        (settings.mouseDownHandler && eventName == "mousedown") ||
                        ((settings.clickHandler || settings.itemClickHandler || settings.chartClickHandler || settings.chartItemClickHandler) && eventName == "click") ||
                        ((settings.doubleClickHandler || settings.itemDoubleClickHandler || settings.chartDoubleClickHandler || settings.chartItemDoubleClickHandler) && eventName == "dblclick")) {
                        var which = e.which;
                        if (!which && e.button) {
                            if (e.button & 1) which = 1 // Left
                            else if (e.button & 4) which = 2 // Middle
                            else if (e.button & 2) which = 3 // Right
                        }
                        var r = getOffsetRect(source);
                        var x = e.pageX - r.left, y = (e.pageY - r.top) / ganttChartView.chartScale;
                        var usedX = 0, usedY = 0, i;
                        var row, column;
                        if (!isOnItemsArea) { // Header
                            if (isOnChart) { // Scale rows
                                var scales = settings.scales;
                                var headersCount = 0, scale;
                                for (i = 0; i < scales.length; i++) {
                                    scale = scales[i];
                                    if (typeof scale.isHeaderVisible === undefinedType || scale.isHeaderVisible)
                                        headersCount++;
                                }
                                var defaultHeaderHeight = settings.headerHeight;
                                if (headersCount > 0)
                                    defaultHeaderHeight = settings.headerHeight / headersCount;
                                for (i = 0; i < scales.length; i++) {
                                    scale = scales[i];
                                    if (typeof scale.isHeaderVisible !== undefinedType && !scale.isHeaderVisible)
                                        continue;
                                    var scaleHeaderHeight = defaultHeaderHeight;
                                    if (typeof scale.headerHeight !== undefinedType)
                                        scaleHeaderHeight = scale.headerHeight;
                                    usedY += scaleHeaderHeight;
                                    if (y <= usedY) {
                                        row = scale;
                                        break;
                                    }
                                }
                            }
                        }
                        else { // Items
                            var item;
                            for (i = 0; i < items.length; i++) {
                                item = items[i];
                                if (item.isVisible && !(typeof item.isHidden !== undefinedType && item.isHidden)) {
                                    usedY = item.itemTop + settings.itemHeight;
                                    if (y <= usedY) {
                                        row = items[i];
                                        break;
                                    }
                                }
                            }
                        }
                        if (!isOnChart) { // Grid column
                            var columns = settings.columns;
                            var columni;
                            for (i = 0; i < columns.length; i++) {
                                columni = columns[i];
                                usedX += columni.width ? columni.width : 0;
                                if (x <= usedX) {
                                    column = columni;
                                    break;
                                }
                            }
                        }
                        else { // Chart date and time
                            column = getDateTime(x, settings);
                        }
                        if (settings.mouseHandler)
                            settings.mouseHandler(eventName, isOnItemsArea, isOnChart, row, column, which, clickCount, e);
                        if (settings.mouseMoveHandler && eventName == "mousemove")
                            settings.mouseMoveHandler(isOnItemsArea, isOnChart, row, column);
                        if (settings.mouseDownHandler && eventName == "mousedown")
                            settings.mouseDownHandler(isOnItemsArea, isOnChart, row, column, which);
                        if (settings.clickHandler && eventName == "click")
                            settings.clickHandler(isOnItemsArea, isOnChart, row, column);
                        if (settings.doubleClickHandler && eventName == "dblclick")
                            settings.doubleClickHandler(isOnItemsArea, isOnChart, row, column);
                        if (settings.itemClickHandler && eventName == "click" && isOnItemsArea && row)
                            settings.itemClickHandler(isOnChart, row, column);
                        if (settings.itemDoubleClickHandler && eventName == "dblclick" && isOnItemsArea && row)
                            settings.itemDoubleClickHandler(isOnChart, row, column);
                        if (settings.chartClickHandler && eventName == "click" && isOnChart)
                            settings.chartClickHandler(isOnItemsArea, row, column);
                        if (settings.chartDoubleClickHandler && eventName == "dblclick" && isOnChart)
                            settings.chartDoubleClickHandler(isOnItemsArea, row, column);
                        if (settings.chartItemClickHandler && eventName == "click" && isOnItemsArea && isOnChart)
                            settings.chartItemClickHandler(row, column);
                        if (settings.chartItemDoubleClickHandler && eventName == "dblclick" && isOnItemsArea && isOnChart)
                            settings.chartItemDoubleClickHandler(row, column);
                    }
                };
                gridHeader.addEventListener("mousemove", event(ganttChartView, gridHeader, "mousemove", function (e) { mouseHandler(e, false, false, 0, gridHeader, "mousemove"); }));
                gridHeader.addEventListener("mousedown", event(ganttChartView, gridHeader, "mousedown", function (e) { mouseHandler(e, false, false, 1, gridHeader, "mousedown"); }));
                gridHeader.addEventListener("click", event(ganttChartView, gridHeader, "click", function (e) { mouseHandler(e, false, false, 1, gridHeader, "click"); }));
                gridHeader.addEventListener("dblclick", event(ganttChartView, gridHeader, "dblclick", function (e) { mouseHandler(e, false, false, 2, gridHeader, "dblclick"); }));
                gridContent.addEventListener("mousemove", event(ganttChartView, gridContent, "mousemove", function (e) { mouseHandler(e, false, true, 0, gridContent, "mousemove"); }));
                gridContent.addEventListener("mousedown", event(ganttChartView, gridContent, "mousedown", function (e) { mouseHandler(e, false, true, 1, gridContent, "mousedown"); }));
                gridContent.addEventListener("click", event(ganttChartView, gridContent, "click", function (e) { mouseHandler(e, false, true, 1, gridContent, "click"); }));
                gridContent.addEventListener("dblclick", event(ganttChartView, gridContent, "dblclick", function (e) { mouseHandler(e, false, true, 2, gridContent, "dblclick"); }));
                chartHeader.addEventListener("mousemove", event(ganttChartView, chartHeader, "mousemove", function (e) { mouseHandler(e, true, false, 0, chartHeader, "mousemove"); }));
                chartHeader.addEventListener("mousedown", event(ganttChartView, chartHeader, "mousedown", function (e) { mouseHandler(e, true, false, 1, chartHeader, "mousedown"); }));
                chartHeader.addEventListener("click", event(ganttChartView, chartHeader, "click", function (e) { mouseHandler(e, true, false, 1, chartHeader, "click"); }));
                chartHeader.addEventListener("dblclick", event(ganttChartView, chartHeader, "dblclick", function (e) { mouseHandler(e, true, false, 2, chartHeader, "dblclick"); }));
                chartContent.addEventListener("mousemove", event(ganttChartView, chartContent, "mousemove", function (e) { mouseHandler(e, true, true, 0, chartContent, "mousemove"); }));
                chartContent.addEventListener("mousedown", event(ganttChartView, chartContent, "mousedown", function (e) { mouseHandler(e, true, true, 1, chartContent, "mousedown"); }));
                chartContent.addEventListener("click", event(ganttChartView, chartContent, "click", function (e) { mouseHandler(e, true, true, 1, chartContent, "click"); }));
                chartContent.addEventListener("dblclick", event(ganttChartView, chartContent, "dblclick", function (e) { mouseHandler(e, true, true, 2, chartContent, "dblclick"); }));
                chartContent.addEventListener("touchmove", event(ganttChartView, chartContent, "touchmove", function (e) {
                    if (ganttChartView.draggingItem)
                        e.preventDefault();
                }, true), true);
                gridContent.container = gridContentContainer;
                chartContent.container = chartContentContainer;
                gridHeader.container = gridHeaderContainer;
                chartHeader.container = chartHeaderContainer;
                ganttChartView.gridContainer = gridContainer;
                ganttChartView.chartContainer = chartContainer;
                ganttChartView.gridContent = gridContent;
                ganttChartView.chartContent = chartContent;
                ganttChartView.gridContentContainer = gridContentContainer;
                ganttChartView.chartContentContainer = chartContentContainer;
                ganttChartView.gridHeader = gridHeader;
                ganttChartView.chartHeader = chartHeader;
                ganttChartView.gridHeaderContainer = gridHeaderContainer;
                ganttChartView.chartHeaderContainer = chartHeaderContainer;
                ganttChartView.splitter = splitter;

                // Presentation.
                chartContentContainer.isInitializing = true;
                var toggleButtonAreaWidth = getToggleButtonAreaWidth(items, settings);
                initializePresentation(ganttChartView, mainContainer);
                setAvailableHeight(chartContent, chartContentContainer);
                loadColumnHeaders(gridHeader, columns, settings, ganttChartView);
                loadScales(chartHeader, chartArea, scales, settings);
                loadItems(gridContent, chartContent, chartArea, items, columns, toggleButtonAreaWidth, settings, ganttChartView);
                updateSplitter(splitter, gridContainer, settings);
                chartContentContainer.isInitializing = false;

                // Virtualization.
                updateVirtualizationVisibility(items, chartContentContainer, settings);

                // Scrolling.
                chartContentContainer.scrollLeft = getChartPosition(settings.displayedTime, settings);
                if (chartHeaderContainer.scrollLeft != chartContentContainer.scrollLeft)
                    chartHeaderContainer.scrollLeft = chartContentContainer.scrollLeft;
                initializeScrollSynchronization(ganttChartView, gridContentContainer, gridContainer, gridHeaderContainer, gridHeaderScrollArea, gridContent, chartContentContainer, chartHeaderContainer, chartContainer, chartHeaderScrollArea, chartContent, splitter, items, settings);

                // Zooming.
                var isDuringZooming = false;
                var setHourWidth = function (hourWidth, mouseCursorPosition) {
                    if (typeof mouseCursorPosition === undefinedType)
                        mouseCursorPosition = 0;
                    if (settings.hourWidth != hourWidth) {
                        isDuringZooming = true;
                        var initialDisplayedEffortToPosition = chartContentContainer.scrollLeft;
                        var chartPosition = mouseCursorPosition;
                        var initialHourWidth = settings.hourWidth;
                        settings.hourWidth = hourWidth;
                        if (typeof settings.hourWidthChangeHandler !== undefinedType)
                            setTimeout(function () { settings.hourWidthChangeHandler(settings.hourWidth); }, 0);
                        chartWidth = getChartWidth(settings);
                        chartHeader.style.width = chartWidth + "px";
                        chartContent.style.width = chartWidth + "px";
                        chartArea.style.width = chartWidth + "px";
                        if (typeof chartContentContainer.chartExtraSpace !== undefinedType)
                            chartContentContainer.chartExtraSpace.style.width = chartWidth + "px";
                        var i;
                        for (i = chartHeader.childNodes.length; i-- > 0; )
                            chartHeader.removeChild(chartHeader.childNodes[i]);
                        var remainingChartAreaElements = [];
                        for (i = chartArea.childNodes.length; i-- > 1; ) {
                            var chartAreaElement = chartArea.childNodes[i];
                            if (chartAreaElement == chartContent.chartAreaAlternativeRows)
                                continue;
                            if (chartAreaElement.tag != "Scale-Highlighting" && chartAreaElement.tag != "Scale-Highlighting-CurrentTime" && chartAreaElement.tag != "Scale-Separator" && chartAreaElement.tag != "Scale-Separator-CurrentTime")
                                remainingChartAreaElements.push(chartAreaElement);
                            chartArea.removeChild(chartAreaElement);
                        }
                        loadScales(chartHeader, chartArea, settings.scales, settings);
                        for (i = 0; i < items.length; i++) {
                            var item = items[i];
                            if (settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                                continue;
                            setChartItemContent(item.chartItem, item, settings);
                        }
                        for (i = remainingChartAreaElements.length; i-- > 0; )
                            chartArea.appendChild(remainingChartAreaElements[i]);
                        updateChartHeight(chartContent, items, settings);
                        var preservedDistanceToCursor = chartPosition - initialDisplayedEffortToPosition;
                        var scale = hourWidth / initialHourWidth;
                        chartContentContainer.scrollLeft = chartPosition * scale - preservedDistanceToCursor;
                        setTimeout(function () { isDuringZooming = false; }, 200);
                    }
                }
                ganttChartView.setHourWidth = setHourWidth;
                var hasMouseWheelZoomBeenUsed = false;
                if (settings.classic ? typeof settings.isMouseWheelZoomEnabled === undefinedType || settings.isMouseWheelZoomEnabled : settings.isMouseWheelZoomEnabled) {
                    var updateChartByMouseWheel = function (e) {
                        hasMouseWheelZoomBeenUsed = true;
                        e.preventDefault();
                        e.stopPropagation();
                        if (isDuringZooming)
                            return;
                        var delta = typeof e.wheelDelta !== undefinedType ? (e.wheelDelta >= 0 ? 1 : -1) : (typeof e.detail !== undefinedType ? (-e.detail >= 0 ? 1 : -1) : 0);
                        var settings = ganttChartView.settings;
                        var hourWidth = settings.hourWidth;
                        var speedFactor = 1.2;
                        var minHourWidth = typeof settings.isMouseWheelZoomEnabledMinHourWidth !== undefinedType ? settings.isMouseWheelZoomEnabledMinHourWidth : 1;
                        if (delta < 0) {
                            hourWidth /= speedFactor * (-delta);
                        }
                        else if (delta > 0) {
                            hourWidth *= speedFactor * delta;
                            var maxHourWidth = typeof settings.isMouseWheelZoomEnabledMaxHourWidth !== undefinedType ? settings.isMouseWheelZoomEnabledMaxHourWidth : 20;
                            if (hourWidth > maxHourWidth)
                                hourWidth = maxHourWidth;
                        }
                        if (hourWidth < minHourWidth)
                            hourWidth = minHourWidth;
                        setHourWidth(hourWidth, e.offsetX);
                    };
                    chartArea.addEventListener("mousewheel", event(ganttChartView, chartArea, "mousewheel", updateChartByMouseWheel));
                    chartArea.addEventListener("DOMMouseScroll", event(ganttChartView, chartArea, "DOMMouseScroll", updateChartByMouseWheel));
                }

                ganttChartView.isInitializing = false;
                ganttChartView.isInitialized = true;

                return ganttChartView;
            },
            refresh = function (ganttChartView) {
                initialize(ganttChartView, ganttChartView.items, ganttChartView.settings, ganttChartView.license);
            },

        // Settings.
            initializeRequiredSettings = function (settings) {
                if (typeof settings.dateTimePickerType === undefinedType)
                    settings.dateTimePickerType = "text";
                if (typeof settings.useDatePicker === undefinedType)
                    settings.useDatePicker = true;
                if (typeof settings.useTimePicker === undefinedType)
                    settings.useTimePicker = true;
                if (typeof settings.useResourceSelector === undefinedType)
                    settings.useResourceSelector = true;
                if (typeof settings.useUpdatingToolTips === undefinedType)
                    settings.useUpdatingToolTips = true;
                if (typeof settings.dateFormatter === undefinedType)
                    settings.dateFormatter = getDateText;
                if (typeof settings.dateTimeFormatter === undefinedType)
                    settings.dateTimeFormatter = getDateTimeText;
                if (typeof settings.dateTimeParser === undefinedType)
                    settings.dateTimeParser = parseDateTimeText;
                if (typeof settings.itemPropertyChangeHandler === undefinedType)
                    settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) { };
                if (typeof settings.target === undefinedType)
                    settings.target = "Standard";
                if (typeof settings.theme === undefinedType)
                    settings.theme = "Modern";
                if (typeof settings.isGridVisible === undefinedType) {
                    switch (settings.target) {
                        case "Standard": default:
                            settings.isGridVisible = true;
                            break;
                        case "Phone":
                            settings.isGridVisible = false;
                            break;
                    }
                }
                if (typeof settings.interaction === undefinedType)
                    settings.interaction = settings.target != "Phone" ? "Standard" : "TouchEnabled";
                if (typeof settings.isSplitterEnabled === undefinedType)
                    settings.isSplitterEnabled = true;
                if (typeof settings.isReadOnly === undefinedType)
                    settings.isReadOnly = false;
                if (typeof settings.isGridReadOnly === undefinedType)
                    settings.isGridReadOnly = false;
                if (typeof settings.isChartReadOnly === undefinedType)
                    settings.isChartReadOnly = false;
                if (typeof settings.isContentReadOnly === undefinedType)
                    settings.isContentReadOnly = false;
                if (typeof settings.isAssignmentsContentReadOnly === undefinedType)
                    settings.isAssignmentsContentReadOnly = false;
                if (typeof settings.isIndividualItemNonworkingTimeHighlighted === undefinedType)
                    settings.isIndividualItemNonworkingTimeHighlighted = false;
                if (typeof settings.areTaskInterruptionsHighlighted === undefinedType)
                    settings.areTaskInterruptionsHighlighted = false;
                if (typeof settings.areTaskDependencyConstraintsEnabled === undefinedType)
                    settings.areTaskDependencyConstraintsEnabled = false;
                if (typeof settings.alwaysHandleInvalidDependencies === undefinedType)
                    settings.alwaysHandleInvalidDependencies = false;
                if (typeof settings.selectionMode === undefinedType)
                    settings.selectionMode = "Focus";
                if (typeof settings.isVirtualizing === undefinedType)
                    settings.isVirtualizing = true;
            },
            initializeSettings = function (settings, items, ganttChartView) {
                initializeRequiredSettings(settings);
                if (typeof settings.gridWidth === undefinedType)
                    settings.gridWidth = "35%";
                if (typeof settings.chartWidth === undefinedType) {
                    if (settings.isGridVisible)
                        settings.chartWidth = "65%";
                    else
                        settings.chartWidth = "100%";
                }
                if (typeof settings.minGridWidth === undefinedType)
                    settings.minGridWidth = 32;
                if (typeof settings.minColumnWidth === undefinedType)
                    settings.minColumnWidth = 32;
                if (typeof settings.minChartWidth === undefinedType)
                    settings.minChartWidth = 32 + 4;
                if (typeof settings.border === undefinedType) {
                    switch (settings.theme) {
                        case "Modern": default:
                            settings.border = "#e0e0e0";
                            break;
                        case "ModernBordered": case "Aero":
                            settings.border = "#9a9a9a";
                            break;
                    }
                }
                if (typeof settings.splitterWidth === undefinedType)
                    settings.splitterWidth = 4;
                if (typeof settings.splitterBackground === undefinedType)
                    settings.splitterBackground = settings.border;
                if (typeof settings.indentationLevelWidth === undefinedType)
                    settings.indentationLevelWidth = 16;
                if (typeof settings.itemHeight === undefinedType)
                    settings.itemHeight = settings.classic ? 21 : 28;
                if (typeof settings.headerBackground === undefinedType)
                    settings.headerBackground = settings.classic ? "#f4f4f4" : "white";
                if (typeof settings.headerHeight === undefinedType)
                    settings.headerHeight = (settings.classic ? 21 : 31) * 2;
                if (typeof settings.columns === undefinedType)
                    settings.columns = getDefaultColumns(items, settings);
                if (typeof settings.toggleButtonStyle === undefinedType && settings.toggleButtonClass == null)
                    settings.toggleButtonStyle = "fill: Gray";
                if (typeof settings.toggleButtonHoveringStyle === undefinedType && settings.toggleButtonHoveringClass == null)
                    settings.toggleButtonHoveringStyle = "fill: Black";
                if (typeof settings.collapsedToggleButtonTemplate === undefinedType)
                    settings.collapsedToggleButtonTemplate = getDefaultCollapsedToggleButtonTemplate(ganttChartView, settings);
                if (typeof settings.expandedToggleButtonTemplate === undefinedType)
                    settings.expandedToggleButtonTemplate = getDefaultExpandedToggleButtonTemplate(ganttChartView, settings);
                if (typeof settings.gridLines !== undefinedType) {
                    if (typeof settings.horizontalGridLines === undefinedType)
                        settings.horizontalGridLines = settings.gridLines;
                    if (typeof settings.verticalGridLines === undefinedType)
                        settings.verticalGridLines = settings.gridLines;
                    if (typeof settings.horizontalChartLines === undefinedType)
                        settings.horizontalChartLines = settings.gridLines;
                }
                if (!settings.classic && typeof settings.verticalGridHeaderLines === undefinedType) {
                    settings.verticalGridHeaderLines = settings.verticalGridLines ? settings.verticalGridLines : "#e0e0e0";
                }
                if (typeof settings.itemStyle === undefinedType) {
                    if (typeof settings.horizontalGridLines !== undefinedType) {
                        settings.itemStyle = "border-top: solid 1px " + settings.horizontalGridLines + "; margin-top: -1px; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box";
                        if (typeof settings.cellStyle === undefinedType) {
                            if (typeof settings.verticalGridLines !== undefinedType)
                                settings.cellStyle = "border-right: solid 1px " + settings.verticalGridLines + "; height: " + settings.itemHeight + "px; padding-top: 2px; padding-left: 2px";
                            else
                                settings.cellStyle = "height: " + settings.itemHeight + "px; padding-top: 2px";
                        }
                    }
                }
                if (typeof settings.cellStyle === undefinedType) {
                    if (typeof settings.verticalGridLines !== undefinedType)
                        settings.cellStyle = "border-right: solid 1px " + settings.verticalGridLines + "; height: " + settings.itemHeight + "px; padding-top: 3px; padding-left: 2px";
                }
                if (!settings.classic && typeof settings.cellStyle === undefinedType) {
                    settings.cellStyle = "padding-left: 2px;";
                    if (typeof settings.columnHeaderStyle === undefinedType)
                        settings.columnHeaderStyle = "padding-left: 2px";
                }
                if (!settings.classic && settings.cellStyle) {
                    settings.cellStyle += "; padding-top: 5px;";
                }
                if (typeof settings.selectedItemStyle === undefinedType && settings.selectedItemClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                if (typeof settings.horizontalGridLines !== undefinedType || typeof settings.verticalGridLines === undefinedType)
                                    settings.selectedItemStyle = "background-color: #f4f4f4; border-top: solid 1px " + (typeof settings.horizontalGridLines !== undefinedType ? settings.horizontalGridLines : "White") + "; margin-top: -1px; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box";
                                else
                                    settings.selectedItemStyle = "background-color: #f4f4f4";
                                break;
                            case "Aero":
                                if (typeof settings.horizontalGridLines !== undefinedType || typeof settings.verticalGridLines === undefinedType)
                                    settings.selectedItemStyle = "background-color: LightBlue; border-top: solid 1px " + (typeof settings.horizontalGridLines !== undefinedType ? settings.horizontalGridLines : "White") + "; margin-top: -1px; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box";
                                else
                                    settings.selectedItemStyle = "background-color: LightBlue";
                                break;
                        }
                    } else {
                        settings.selectedItemStyle = "background-color: #8dd2ff60;";
                    }
                }
                if (typeof settings.summaryItemStyle === undefinedType && settings.summaryItemClass == null)
                    settings.summaryItemStyle = "font-weight: bold";
                if (typeof settings.daysOfWeek === undefinedType)
                    settings.daysOfWeek = daysOfWeek;
                if (typeof settings.months === undefinedType)
                    settings.months = months;
                if (typeof settings.weekStartDay === undefinedType)
                    settings.weekStartDay = 0;
                if (typeof settings.currentTime === undefinedType)
                    settings.currentTime = getCurrentDateTime();
                else if (typeof settings.currentTime === stringType) {
                    try { settings.currentTime = new Date(settings.currentTime); }
                    catch (exc) { settings.currentTime = new Date(parseInt(settings.currentTime)); }
                }
                if (typeof settings.displayedTime === stringType) {
                    try { settings.displayedTime = new Date(settings.displayedTime); }
                    catch (exc) { settings.displayedTime = new Date(parseInt(settings.displayedTime)); }
                }
                if (typeof settings.timelineStart === stringType) {
                    try { settings.timelineStart = new Date(settings.timelineStart); }
                    catch (exc) { settings.timelineStart = new Date(parseInt(settings.timelineStart)); }
                }
                if (typeof settings.timelineFinish === stringType) {
                    try { settings.timelineFinish = new Date(settings.timelineFinish); }
                    catch (exc) { settings.timelineFinish = new Date(parseInt(settings.timelineFinish)); }
                }
                if (!settings.classic && typeof settings.scales === undefinedType) {
                    settings.scales = [
                        { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: ' + (settings.nonworkingBackground ? settings.nonworkingBackground : '#f8f8f8') + '; fill-opacity: 0.65' },
                        { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 7px 5px; border-right: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + '; border-bottom: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + (settings.headerForeground ? '; color: ' + settings.headerForeground : ''), isSeparatorVisible: true, separatorStyle: 'stroke: ' + (settings.scaleSeparatorBorder ? settings.scaleSeparatorBorder : '#c8bfe7') + '; stroke-width: 0.5px' },
                        { scaleType: 'Days', headerTextFormat: 'DayOfWeekAbbreviation', headerStyle: 'padding: 7px 5px; border-right: 1px solid ' + (settings.headerBorder ? settings.headerBorder : '#e8e8e8') + (settings.headerForeground ? '; color: ' + settings.headerForeground : '') },
                        { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: ' + (settings.currentTimeStroke ? settings.currentTimeStroke : '#e31d3b') + '; stroke-width: 0.5px'}];
                }
                if (!settings.classic) {
                    if (typeof settings.alternativeItemStyle === undefinedType)
                        settings.alternativeItemStyle = 'background-color: #8080800c;';
                    if (typeof settings.alternativeChartItemStyle === undefinedType)
                        settings.alternativeChartItemStyle = 'fill: #8080800c;';
                }
                if (!settings.classic && typeof settings.arrowSize === undefinedType)
                    settings.arrowSize = 1.5;
                var i;
                if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone) {
                    settings.currentTime = new Date(settings.currentTime.valueOf() - settings.currentTime.getTimezoneOffset() * minuteDuration);
                    if (typeof settings.displayedTime !== undefinedType)
                        settings.displayedTime = new Date(settings.displayedTime.valueOf() - settings.displayedTime.getTimezoneOffset() * minuteDuration);
                    if (typeof settings.timelineStart !== undefinedType)
                        settings.timelineStart = new Date(settings.timelineStart.valueOf() - settings.timelineStart.getTimezoneOffset() * minuteDuration);
                    if (typeof settings.timelineFinish !== undefinedType)
                        settings.timelineFinish = new Date(settings.timelineFinish.valueOf() - settings.timelineFinish.getTimezoneOffset() * minuteDuration);
                    if (typeof settings.scales !== undefinedType) {
                        for (i = 0; i < settings.scales.length; i++) {
                            var scale = settings.scales[i];
                            if (typeof scale.intervals !== undefinedType) {
                                for (var j = 0; j < scale.intervals.length; j++) {
                                    var interval = scale.intervals[j];
                                    if (typeof interval.start !== undefinedType)
                                        interval.start = new Date(interval.start.valueOf() - interval.start.getTimezoneOffset() * minuteDuration);
                                    if (typeof interval.finish !== undefinedType)
                                        interval.finish = new Date(interval.finish.valueOf() - interval.finish.getTimezoneOffset() * minuteDuration);
                                }
                            }
                        }
                    }
                    settings.isRelativeToTimezone = false;
                }
                if (typeof settings.schedule !== undefinedType && settings.schedule != null) {
                    if (settings.schedule != settings.previousSchedule || settings.schedule.workingWeekStart != settings.previousSchedule.workingWeekStart)
                        settings.workingWeekStart = settings.schedule.workingWeekStart;
                    if (settings.schedule != settings.previousSchedule || settings.schedule.workingWeekFinish != settings.previousSchedule.workingWeekFinish)
                        settings.workingWeekFinish = settings.schedule.workingWeekFinish;
                    if (settings.schedule != settings.previousSchedule || settings.schedule.workingDayStart != settings.previousSchedule.workingDayStart)
                        settings.visibleDayStart = settings.schedule.workingDayStart;
                    if (settings.schedule != settings.previousSchedule || settings.schedule.workingDayFinish != settings.previousSchedule.workingDayFinish)
                        settings.visibleDayFinish = settings.schedule.workingDayFinish;
                    if (settings.schedule != settings.previousSchedule || settings.schedule.specialNonworkingDays != settings.previousSchedule.specialNonworkingDays)
                        settings.specialNonworkingDays = settings.schedule.specialNonworkingDays;
                }
                if (typeof settings.timelineStart === undefinedType)
                    settings.timelineStart = getDefaultTimelineStart(settings.currentTime, settings.weekStartDay);
                else
                    settings.timelineStart = getTimelineStart(settings.timelineStart, settings.weekStartDay);
                if (typeof settings.timelineFinish === undefinedType)
                    settings.timelineFinish = getDefaultTimelineFinish(settings.currentTime, settings.weekStartDay);
                else
                    settings.timelineFinish = getTimelineFinish(settings.timelineFinish, settings.weekStartDay);
                if (!settings.isExport && typeof settings.specialNonworkingDays !== undefinedType && typeof settings.specialNonworkingDays !== 'function') {
                    for (i = 0; i < settings.specialNonworkingDays.length; i++)
                        settings.specialNonworkingDays[i] = getDate(new Date(settings.specialNonworkingDays[i].valueOf() - (settings.specialNonworkingDays[i].getTimezoneOffset() < 0 ? settings.specialNonworkingDays[i].getTimezoneOffset() : 0) * minuteDuration));
                }
                if (!settings.isExport && typeof settings.resourceSchedules !== undefinedType) {
                    for (var k = 0; k < settings.resourceSchedules.length; k++) {
                        var schedule = settings.resourceSchedules[k].value;
                        if (typeof schedule.specialNonworkingDays !== undefinedType) {
                            for (i = 0; i < schedule.specialNonworkingDays.length; i++)
                                schedule.specialNonworkingDays[i] = getDate(new Date(schedule.specialNonworkingDays[i].valueOf() - (schedule.specialNonworkingDays[i].getTimezoneOffset() < 0 ? schedule.specialNonworkingDays[i].getTimezoneOffset() : 0) * minuteDuration));
                        }
                    }
                }
                if (typeof settings.scales === undefinedType)
                    settings.scales = getDefaultScales(settings);
                if (typeof settings.updateScale === undefinedType)
                    settings.updateScale = quarterHourDuration;
                if (typeof settings.hourWidth === undefinedType)
                    settings.hourWidth = settings.classic ? 2.5 : 5;
                if (typeof settings.displayedTime === undefinedType) {
                    settings.displayedTime = settings.currentTime;
                    setTimeout(function () {
                        var backPosition = ganttChartView.chartContentContainer.scrollLeft - settings.hourWidth * 12;
                        if (ganttChartView.chartContentContainer.scrollLeft - backPosition < ganttChartView.chartContentContainer.clientWidth / 3)
                            ganttChartView.chartContentContainer.scrollLeft = Math.max(0, backPosition);
                    }, 0);
                }
                settings.previousSchedule = settings.schedule;
                if (typeof settings.visibleDayStart === undefinedType)
                    settings.visibleDayStart = 8 * hourDuration;
                if (typeof settings.visibleDayFinish === undefinedType)
                    settings.visibleDayFinish = 16 * hourDuration;
                if (settings.visibleDayStart >= settings.visibleDayFinish) {
                    settings.visibleWeekStart = 0;
                    settings.visibleWeekFinish = dayDuration;
                }
                if (typeof settings.visibleWeekStart === undefinedType)
                    settings.visibleWeekStart = 0;
                if (typeof settings.visibleWeekFinish === undefinedType)
                    settings.visibleWeekFinish = 6;
                if (settings.visibleWeekStart > settings.visibleWeekFinish) {
                    if (settings.visibleWeekStart == settings.visibleWeekFinish + 1) {
                        settings.visibleWeekStart = 0;
                        settings.visibleWeekFinish = 6;
                    }
                    else {
                        settings.visibleWeekFinish = settings.visibleWeekStart;
                    }
                }
                if (typeof settings.workingWeekStart === undefinedType)
                    settings.workingWeekStart = 1;
                if (typeof settings.workingWeekFinish === undefinedType)
                    settings.workingWeekFinish = 5;
                if (settings.workingWeekStart > settings.workingWeekFinish) {
                    if (settings.workingWeekStart == settings.workingWeekFinish + 1) {
                        settings.workingWeekStart = 0;
                        settings.workingWeekFinish = 6;
                    }
                    else {
                        settings.workingWeekFinish = settings.workingWeekStart;
                    }
                }
                settings.workingDayStart = settings.visibleDayStart;
                settings.workingDayFinish = settings.visibleDayFinish;
                if (!settings.classic && typeof settings.barMargin === undefinedType)
                    settings.barMargin = 4;
                if (typeof settings.barHeight === undefinedType)
                    settings.barHeight = typeof settings.barMargin === undefinedType ? settings.itemHeight / 2 : settings.itemHeight - 2 * settings.barMargin;
                if (typeof settings.barMargin === undefinedType)
                    settings.barMargin = (settings.itemHeight - settings.barHeight) / 2;
                if (typeof settings.barCornerRadius === undefinedType) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                settings.barCornerRadius = 0;
                                break;
                            case "Aero":
                                settings.barCornerRadius = 3;
                                break;
                        }
                    } else {
                        settings.barCornerRadius = 2;
                    }
                }
                if (!settings.classic && typeof settings.completedBarMargin === undefinedType)
                    settings.completedBarMargin = 1;
                if (typeof settings.completedBarMargin === undefinedType)
                    settings.completedBarMargin = settings.barHeight / 2.5;
                if (typeof settings.completedBarHeight === undefinedType)
                    settings.completedBarHeight = settings.barHeight - settings.completedBarMargin * 2;
                if (typeof settings.completedBarCornerRadius === undefinedType)
                    settings.completedBarCornerRadius = 0;
                settings.completedBarCornerRadius = Math.min(settings.completedBarCornerRadius, Math.max(0, settings.barCornerRadius - 1));
                if (typeof settings.styleDefinitionTemplate === undefinedType)
                    settings.styleDefinitionTemplate = getDefaultStyleDefinitionTemplate(ganttChartView, settings);
                if (typeof settings.standardBarStyle === undefinedType && settings.standardBarClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": default:
                                settings.standardBarStyle = "fill: #8abbed; fill-opacity: 0.8; stroke: #8abbed; stroke-width: 0.65px";
                                break;
                            case "ModernBordered":
                                settings.standardBarStyle = "fill: #8abbed; fill-opacity: 0.8; stroke: Blue; stroke-width: 0.65px";
                                break;
                            case "Aero":
                                settings.standardBarStyle = "fill: url(#BlueGradient); fill-opacity: 0.8; stroke: Blue";
                                break;
                        }
                    } else {
                        settings.standardBarStyle = "fill: #8dd2ff; fill-opacity: 0.8; stroke: #3b87d9; stroke-width: 0.65px;";
                    }
                }
                if (typeof settings.standardCompletedBarStyle === undefinedType && settings.standardCompletedBarClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                settings.standardCompletedBarStyle = "fill: #3b87d9; stroke: #3b87d9; stroke-width: 0.65px";
                                break;
                            case "Aero":
                                settings.standardCompletedBarStyle = "fill: #808080; stroke: #202020; stroke-width: 0.65px";
                                break;
                        }
                    } else {
                        settings.standardCompletedBarStyle = "fill: #1ca3ec; stroke: #1ca3ec; stroke-width: 0.5px;";
                    }
                }
                if (typeof settings.summaryBarStyle === undefinedType && settings.summaryBarClass == null) {
                    switch (settings.theme) {
                        case "Modern": default:
                            settings.summaryBarStyle = "fill: #607080; stroke: #607080; stroke-width: 0.65px";
                            break;
                        case "ModernBordered":
                            settings.summaryBarStyle = "fill: #607080; stroke: #202020; stroke-width: 0.65px";
                            break;
                        case "Aero":
                            settings.summaryBarStyle = "fill: url(#BlackGradient); stroke: Black";
                            break;
                    }
                }
                if (typeof settings.summaryCompletedBarStyle === undefinedType && settings.summaryCompletedBarClass == null) {
                    switch (settings.theme) {
                        case "Modern": case "ModernBordered": default:
                            settings.summaryCompletedBarStyle = "fill: #404040; stroke: #404040; stroke-width: 0.65px";
                            break;
                        case "Aero":
                            settings.summaryCompletedBarStyle = "fill: #a0a0a0; stroke: #303030; stroke-width: 0.65px";
                            break;
                    }
                }
                if (typeof settings.collapsedSummaryLineStyle === undefinedType && settings.collapsedSummaryLineClass == null)
                    settings.collapsedSummaryLineStyle = "stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2 2";
                if (typeof settings.milestoneBarStyle === undefinedType && settings.milestoneBarClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": default:
                                settings.milestoneBarStyle = "fill: #607080; stroke: #607080; stroke-width: 0.65px";
                                break;
                            case "ModernBordered":
                                settings.milestoneBarStyle = "fill: #607080; stroke: #202020; stroke-width: 0.65px";
                                break;
                            case "Aero":
                                settings.milestoneBarStyle = "fill: url(#BlackGradient); stroke: Black";
                                break;
                        }
                    } else {
                        settings.milestoneBarStyle = "fill: #f8c758; stroke: #3b87d9; stroke-width: 0.65px;";
                    }
                }
                if (typeof settings.completedBarThumbStyle === undefinedType && settings.completedBarThumbClass == null)
                    settings.completedBarThumbStyle = "fill: White; stroke: #a0a0a0; stroke-width: 1px; transform: translateY(3px);";

                if (typeof settings.baselineBarStyle === undefinedType && settings.baselineBarClass == null) {
                    switch (settings.theme) {
                        case "Modern": case "ModernBordered": default:
                            settings.baselineBarStyle = "fill: none; stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2";
                            break;
                        case "Aero":
                            settings.baselineBarStyle = "fill: none; stroke: Blue; stroke-dasharray: 2, 2";
                            break;
                    }
                }
                if (typeof settings.dependencyPointerStyle === undefinedType && settings.dependencyPointerClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                settings.dependencyPointerStyle = "fill: #3b87d9; stroke: #3b87d9; stroke-width: 0.65px";
                                break;
                            case "Aero":
                                settings.dependencyPointerStyle = "fill: Blue; stroke: Blue";
                                break;
                        }
                    } else {
                        settings.dependencyPointerStyle = "fill: White; stroke: #a0a0a0; stroke-width: 1px;";
                    }
                }
                if (typeof settings.dependencyLineStyle === undefinedType && settings.dependencyLineClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                settings.dependencyLineStyle = "stroke: #3b87d9; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)";
                                break;
                            case "Aero":
                                settings.dependencyLineStyle = "stroke: Blue; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker)";
                                break;
                        }
                    } else {
                        settings.dependencyLineStyle = "stroke: #3b87d9; stroke-width: 0.65px; fill: none; marker-end: url(#ArrowMarker);";
                    }
                }
                if (typeof settings.dependencyLineZoneStyle === undefinedType && settings.dependencyLineZoneClass == null)
                    settings.dependencyLineZoneStyle = "stroke: White; stroke-opacity: 0; stroke-width: 4px; fill: none";
                if (typeof settings.temporaryDependencyLineStyle === undefinedType && settings.temporaryDependencyLineClass == null) {
                    switch (settings.theme) {
                        case "Modern": case "ModernBordered": default:
                            settings.temporaryDependencyLineStyle = "stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)";
                            break;
                        case "Aero":
                            settings.temporaryDependencyLineStyle = "stroke: Blue; stroke-width: 0.65px; stroke-dasharray: 2, 2; fill: none; marker-end: url(#ArrowMarker)";
                            break;
                    }
                }
                if (typeof settings.assignmentsStyle === undefinedType && settings.assignmentsClass == null)
                    settings.assignmentsStyle = "stroke-width: 0.25px; font-size: " + (settings.classic ? "x-small" : "12px");
                if (!settings.classic)
                    settings.assignmentsStyle += "; transform: translateX(10px) translateY(-1px);";
                if (typeof settings.standardTaskTemplate === undefinedType)
                    settings.standardTaskTemplate = getDefaultStandardTaskTemplate();
                if (typeof settings.summaryTaskTemplate === undefinedType)
                    settings.summaryTaskTemplate = getDefaultSummaryTaskTemplate();
                if (typeof settings.milestoneTaskTemplate === undefinedType)
                    settings.milestoneTaskTemplate = getDefaultMilestoneTaskTemplate();
                if (typeof settings.horizontalChartLines !== undefinedType) {
                    var originalInternalPreTaskTemplateHorizontalLines = settings.internalPreTaskTemplate;
                    settings.internalPreTaskTemplate = function (item) {
                        if (typeof item.scheduleChartItem !== undefinedType)
                            return typeof originalInternalPreTaskTemplateHorizontalLines !== undefinedType ? originalInternalPreTaskTemplateHorizontalLines(item) : null;
                        var document = item.ganttChartView.ownerDocument;
                        var group = document.createElementNS(svgns, "g");
                        if (typeof originalInternalPreTaskTemplateHorizontalLines !== undefinedType)
                            group.appendChild(originalInternalPreTaskTemplateHorizontalLines(item));
                        var line = document.createElementNS(svgns, "line");
                        line.setAttribute("x1", 0);
                        line.setAttribute("y1", -0.5);
                        line.setAttribute("x2", getChartWidth(settings));
                        line.setAttribute("y2", -0.5);
                        line.setAttribute("style", "stroke: " + settings.horizontalChartLines + "; stroke-width: 0.5px");
                        group.appendChild(line);
                        if (item.index == item.ganttChartView.items.length - 1) {
                            line = document.createElementNS(svgns, "line");
                            line.setAttribute("x1", 0);
                            line.setAttribute("y1", settings.itemHeight);
                            line.setAttribute("x2", getChartWidth(settings));
                            line.setAttribute("y2", settings.itemHeight);
                            line.setAttribute("style", "stroke: " + settings.horizontalChartLines + "; stroke-width: 0.5px");
                            group.appendChild(line);
                        }
                        return group;
                    };
                }
                if (typeof settings.isTaskToolTipVisible === undefinedType) {
                    switch (settings.target) {
                        case "Standard": default:
                            settings.isTaskToolTipVisible = true;
                            break;
                        case "Phone":
                            settings.isTaskToolTipVisible = false;
                            break;
                    }
                }
                if (typeof settings.itemTemplate === undefinedType)
                    settings.itemTemplate = getDefaultItemTemplate(settings);
                if (typeof settings.areTaskAssignmentsVisible === undefinedType)
                    settings.areTaskAssignmentsVisible = true;
                if (typeof settings.assignmentsTemplate === undefinedType)
                    settings.assignmentsTemplate = getDefaultAssignmentsTemplate();
                if (typeof settings.isTaskCompletedEffortVisible === undefinedType)
                    settings.isTaskCompletedEffortVisible = true;
                if (typeof settings.areTaskDependenciesVisible === undefinedType)
                    settings.areTaskDependenciesVisible = true;
                if (typeof settings.dependencyLineTemplate === undefinedType)
                    settings.dependencyLineTemplate = getDefaultDependencyLineTemplate();
                if (typeof settings.isDependencyToolTipVisible === undefinedType)
                    settings.isDependencyToolTipVisible = settings.isTaskToolTipVisible;
                if (typeof settings.predecessorItemTemplate === undefinedType)
                    settings.predecessorItemTemplate = getDefaultPredecessorItemTemplate(settings);
                if (typeof settings.isDraggingTaskStartEndsEnabled === undefinedType)
                    settings.isDraggingTaskStartEndsEnabled = true;
                if (typeof settings.areTaskDependencyConstraintsEnabledWhileDragging === undefinedType)
                    settings.areTaskDependencyConstraintsEnabledWhileDragging = false;
                if (typeof settings.isTaskStartReadOnly === undefinedType)
                    settings.isTaskStartReadOnly = false;
                if (typeof settings.isTaskEffortReadOnly === undefinedType)
                    settings.isTaskEffortReadOnly = false;
                if (typeof settings.isTaskCompletionReadOnly === undefinedType)
                    settings.isTaskCompletionReadOnly = false;
                if (typeof settings.areTaskPredecessorsReadOnly === undefinedType)
                    settings.areTaskPredecessorsReadOnly = false;
                if (typeof settings.isBaselineVisible === undefinedType)
                    settings.isBaselineVisible = true;
                if (typeof settings.areStandardTaskLabelsVisible === undefined)
                    settings.areStandardTaskLabelsVisible = false;
                if (typeof settings.areSummaryTaskLabelsVisible === undefined)
                    settings.areSummaryTaskLabelsVisible = false;
                if (typeof settings.areMilestoneTaskLabelsVisible === undefined)
                    settings.areMilestoneTaskLabelsVisible = false;
                if (typeof settings.isSummaryTaskCompletedEffortVisible === undefinedType)
                    settings.isSummaryTaskCompletedEffortVisible = false;
                var nonworkingScale = null;
                if (settings.isIndividualItemNonworkingTimeHighlighted || settings.areTaskInterruptionsHighlighted) {
                    for (var si = 0; si < settings.scales.length; si++) {
                        if (settings.scales[si].scaleType == "NonworkingTime") {
                            nonworkingScale = settings.scales[si];
                            break;
                        }
                    }
                }
                if (nonworkingScale != null && settings.isIndividualItemNonworkingTimeHighlighted) {
                    var originalInternalPreTaskTemplateNonworkingTime = settings.internalPreTaskTemplate;
                    settings.internalPreTaskTemplate = function (item) {
                        if (typeof item.scheduleChartItem !== undefinedType)
                            return typeof originalInternalPreTaskTemplateNonworkingTime !== undefinedType ? originalInternalPreTaskTemplateNonworkingTime(item) : null;
                        var intervals = getItemNonworkingTimeIntervals(item, settings);
                        if (intervals == null || intervals.length == 0)
                            return typeof originalInternalPreTaskTemplateNonworkingTime !== undefinedType ? originalInternalPreTaskTemplateNonworkingTime(item) : null;
                        var document = item.ganttChartView.ownerDocument;
                        var group = document.createElementNS(svgns, "g");
                        for (var j = 0; j < intervals.length; j++) {
                            var interval = intervals[j];
                            var start = interval.start;
                            var finish = interval.finish;
                            var startPosition = getChartPosition(start, settings);
                            var finishPosition = getChartPosition(finish, settings);
                            var width = finishPosition - startPosition;
                            if (width <= 0)
                                continue;
                            var highlightingRectangle = document.createElementNS(svgns, "rect");
                            highlightingRectangle.setAttribute("x", startPosition - 1);
                            highlightingRectangle.setAttribute("y", 0);
                            highlightingRectangle.setAttribute("width", width);
                            highlightingRectangle.setAttribute("height", settings.itemHeight);
                            highlightingRectangle.setAttribute("class", nonworkingScale.highlightingClass);
                            highlightingRectangle.setAttribute("style", nonworkingScale.highlightingStyle);
                            group.appendChild(highlightingRectangle);
                        }
                        if (typeof originalInternalPreTaskTemplateNonworkingTime !== undefinedType)
                            group.appendChild(originalInternalPreTaskTemplateNonworkingTime(item));
                        return group;
                    };
                }
                if (nonworkingScale != null && settings.areTaskInterruptionsHighlighted) {
                    var originalInternalExtraTaskTemplateInterruptions = settings.internalExtraTaskTemplate;
                    settings.internalExtraTaskTemplate = function (item) {
                        if (typeof item.scheduleChartItem !== undefinedType)
                            return typeof originalInternalExtraTaskTemplateInterruptions !== undefinedType ? originalInternalExtraTaskTemplateInterruptions(item) : null;
                        var intervals = getItemInterruptionIntervals(item, settings);
                        if (intervals == null || intervals.length == 0)
                            return typeof originalInternalExtraTaskTemplateInterruptions !== undefinedType ? originalInternalExtraTaskTemplateInterruptions(item) : null;
                        var document = item.ganttChartView.ownerDocument;
                        var group = document.createElementNS(svgns, "g");
                        for (var j = 0; j < intervals.length; j++) {
                            var interval = intervals[j];
                            var start = interval.start;
                            var finish = interval.finish;
                            var startPosition = getChartPosition(start, settings);
                            var finishPosition = getChartPosition(finish, settings);
                            var width = finishPosition - startPosition;
                            if (width <= 0)
                                continue;
                            var highlightingRectangle = document.createElementNS(svgns, "rect");
                            highlightingRectangle.setAttribute("x", startPosition - 1);
                            highlightingRectangle.setAttribute("y", settings.barMargin);
                            highlightingRectangle.setAttribute("width", width);
                            highlightingRectangle.setAttribute("height", settings.barHeight);
                            highlightingRectangle.setAttribute("class", nonworkingScale.highlightingClass);
                            highlightingRectangle.setAttribute("style", nonworkingScale.highlightingStyle);
                            group.appendChild(highlightingRectangle);
                        }
                        if (typeof originalInternalExtraTaskTemplateInterruptions !== undefinedType)
                            group.appendChild(originalInternalExtraTaskTemplateInterruptions(item));
                        return group;
                    };
                }
            },
            initializeItems = function (items, settings) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (typeof item === stringType) {
                        item = { content: item };
                        items[i] = item;
                    }
                    if (typeof item.indentation === stringType)
                        item.indentation = parseInt(item.indentation);
                    if (typeof item.isExpanded === stringType)
                        item.isExpanded = item.isExpanded.toLowerCase() == trueStringValue;
                    if (typeof item.start === stringType) {
                        try { item.start = new Date(item.start); }
                        catch (exc) { item.start = new Date(parseInt(item.start)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.start = new Date(item.start.valueOf() + item.start.getTimezoneOffset() * minuteDuration);
                        item.preferredStart = item.start;
                    }
                    if (typeof item.finish === stringType) {
                        try { item.finish = new Date(item.finish); }
                        catch (exc) { item.finish = new Date(parseInt(item.finish)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.finish = new Date(item.finish.valueOf() + item.finish.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.completedFinish === stringType) {
                        try { item.completedFinish = new Date(item.completedFinish); }
                        catch (exc) { item.completedFinish = new Date(parseInt(item.completedFinish)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.completedFinish = new Date(item.completedFinish.valueOf() + item.completedFinish.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.isMilestone === stringType)
                        item.isMilestone = item.isMilestone.toLowerCase() == trueStringValue;
                    if (typeof item.baselineStart === stringType) {
                        try { item.baselineStart = new Date(item.baselineStart); }
                        catch (exc) { item.baselineStart = new Date(parseInt(item.baselineStart)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.baselineStart = new Date(item.baselineStart.valueOf() + item.baselineStart.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.baselineFinish === stringType) {
                        try { item.baselineFinish = new Date(item.baselineFinish); }
                        catch (exc) { item.baselineFinish = new Date(parseInt(item.baselineFinish)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.baselineFinish = new Date(item.baselineFinish.valueOf() + item.baselineFinish.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.minStart === stringType) {
                        try { item.minStart = new Date(item.minStart); }
                        catch (exc) { item.minStart = new Date(parseInt(item.minStart)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.minStart = new Date(item.minStart.valueOf() + item.minStart.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.maxStart === stringType) {
                        try { item.maxStart = new Date(item.maxStart); }
                        catch (exc) { item.maxStart = new Date(parseInt(item.maxStart)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.maxStart = new Date(item.maxStart.valueOf() + item.maxStart.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.minFinish === stringType) {
                        try { item.minFinish = new Date(item.minFinish); }
                        catch (exc) { item.minFinish = new Date(parseInt(item.minFinish)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.minFinish = new Date(item.minFinish.valueOf() + item.minFinish.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.maxFinish === stringType) {
                        try { item.maxFinish = new Date(item.maxFinish); }
                        catch (exc) { item.maxFinish = new Date(parseInt(item.maxFinish)); }
                        if (typeof settings.isRelativeToTimezone === undefinedType || settings.isRelativeToTimezone)
                            item.maxFinish = new Date(item.maxFinish.valueOf() + item.maxFinish.getTimezoneOffset() * minuteDuration);
                    }
                    if (typeof item.predecessors !== undefinedType) {
                        if (typeof item.predecessors === stringType)
                            item.predecessors = item.predecessors.split(",");
                        for (var j = 0; j < item.predecessors.length; j++) {
                            var predecessorItem = item.predecessors[j];
                            if (typeof predecessorItem === stringType) {
                                predecessorItem = { item: predecessorItem };
                                item.predecessors[j] = predecessorItem;
                            }
                            if (typeof predecessorItem.item === stringType) {
                                var index = parseInt(predecessorItem.item) - 1;
                                predecessorItem.item = index >= 0 && index < items.length ? items[index] : null;
                            }
                            if (typeof predecessorItem.lag === stringType)
                                predecessorItem.lag = parseFloat(predecessorItem.lag);
                        }
                    }
                    if (typeof item.schedule !== undefinedType && typeof item.schedule.specialNonworkingDays !== undefinedType && typeof settings.specialNonworkingDays !== 'function') {
                        for (var k = 0; k < item.schedule.specialNonworkingDays.length; k++)
                            item.schedule.specialNonworkingDays[k] = getDate(new Date(item.schedule.specialNonworkingDays[k].valueOf() - item.schedule.specialNonworkingDays[k].getTimezoneOffset() * minuteDuration));
                    }
                    if (typeof item.wasGridItemContentLoaded !== undefinedType)
                        delete item.wasGridItemContentLoaded;
                }
            },
            getContentHeight = function (ganttChartView, items, settings) {
                var contentHeight;
                if (ganttChartView.isContentHeightInitialized && ganttChartView.isContentHeightAuto) {
                    if (items.length > 0)
                        contentHeight = "auto";
                    else
                        contentHeight = settings.itemHeight + "px";
                }
                else {
                    var contentAreaHeight = ganttChartView.clientHeight - settings.headerHeight - 2;
                    if (contentAreaHeight < 0)
                        contentAreaHeight = 0;
                    contentHeight = contentAreaHeight + "px";
                    if (contentAreaHeight < settings.itemHeight) {
                        if (!ganttChartView.isContentHeightInitialized)
                            ganttChartView.isContentHeightAuto = true;
                        if (items.length > 0)
                            contentHeight = "auto";
                        else
                            contentHeight = settings.itemHeight + "px";
                    }
                    ganttChartView.isContentHeightInitialized = true;
                }
                return contentHeight;
            },
            getToggleButtonAreaWidth = function (items, settings) {
                if (typeof settings.toggleButtonAreaWidth !== undefinedType)
                    return settings.toggleButtonAreaWidth;
                var toggleButtonAreaWidth = 0;
                if (settings.isGridVisible) {
                    for (var i = 0; i < items.length; i++) {
                        if ((typeof items[i].scheduleChartItem === undefinedType || items[i].scheduleChartItem == items[i]) && items[i].indentation > 0) {
                            toggleButtonAreaWidth = 16;
                            break;
                        }
                    }
                }
                settings.toggleButtonAreaWidth = toggleButtonAreaWidth;
                return toggleButtonAreaWidth;
            },

        // Values.
            getEmptyNode = function (document) {
                return document.createTextNode("");
            },
            getTextNode = function (document, value) {
                var span = document.createElement("span");
                span.innerHTML = value;
                return span;
            },
            getSimpleTextNode = function (document, value) {
                return document.createTextNode(value);
            },
            getBooleanNode = function (document, value) {
                if (value == true)
                    return document.createTextNode("✓");
                return document.createTextNode(""); //Optionally, use "×" for false value.
            },
            getDateText = function (date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if (month < 10)
                    month = "0" + month;
                var day = date.getDate();
                if (day < 10)
                    day = "0" + day;
                return month + "/" + day + "/" + year;
            },
            getDateTimeText = function (date) {
                var dateText = getDateText(date);
                var hours = date.getHours();
                if (hours < 10)
                    hours = "0" + hours.toString();
                var minutes = date.getMinutes();
                if (minutes < 10)
                    minutes = "0" + minutes.toString();
                return dateText + " " + hours + ":" + minutes;
            },
            getFormattableDate = function (date) {
                return new Date(date.valueOf() + date.getTimezoneOffset() * minuteDuration);
            },
            parseDateTimeText = function (value) {
                var now = new Date();
                if (value == null || value == "")
                    return now;
                var year, month, day, hours, minutes;
                var dateValue, timeValue;
                var i = value.indexOf(" ");
                if (i >= 0) {
                    dateValue = value.substr(0, i);
                    timeValue = value.substr(i + 1);
                }
                else {
                    dateValue = value;
                    timeValue = "0";
                }
                i = dateValue.indexOf("/");
                if (i >= 0) {
                    var monthValue = dateValue.substr(0, i);
                    while (monthValue.length > 0 && monthValue.substr(0, 1) == "0")
                        monthValue = monthValue.substr(1);
                    month = parseInt(monthValue) - 1;
                    dateValue = dateValue.substr(i + 1);
                    i = dateValue.indexOf("/");
                    var dayValue;
                    if (i >= 0) {
                        dayValue = dateValue.substr(0, i);
                        var yearValue = dateValue.substr(i + 1);
                        while (yearValue.length > 0 && yearValue.substr(0, 1) == "0")
                            yearValue = yearValue.substr(1);
                        year = parseInt(yearValue);
                    }
                    else {
                        dayValue = dateValue;
                        year = now.getFullYear();
                    }
                    while (dayValue.length > 0 && dayValue.substr(0, 1) == "0")
                        dayValue = dayValue.substr(1);
                    day = parseInt(dayValue);
                }
                else {
                    while (dateValue.length > 0 && dateValue.substr(0, 1) == "0")
                        dateValue = dateValue.substr(1);
                    day = parseInt(dateValue);
                    month = now.getMonth();
                    year = now.getFullYear();
                }
                var hoursValue;
                i = timeValue.indexOf(":");
                if (i >= 0) {
                    hoursValue = timeValue.substr(0, i);
                    timeValue = timeValue.substr(i + 1);
                }
                else {
                    hoursValue = timeValue;
                    timeValue = "0";
                }
                while (hoursValue.length > 1 && hoursValue.substr(0, 1) == "0")
                    hoursValue = hoursValue.substr(1);
                hours = parseInt(hoursValue);
                while (timeValue.length > 1 && timeValue.substr(0, 1) == "0")
                    timeValue = timeValue.substr(1);
                minutes = parseInt(timeValue);
                if (isNaN(year) || isNaN(month) || isNaN(day) || year <= 0 || month < 0 || month >= 12 || day < 1 || day > getDaysInMonth(year, month)) {
                    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60)
                        return now;
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
                }
                if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60)
                    return new Date(year, month, day, 0, 0, 0, 0);
                return new Date(year, month, day, hours, minutes, 0, 0);
            },
            getParsedDate = function (date) {
                return new Date(date.valueOf() - date.getTimezoneOffset() * minuteDuration);
            },
            getDateNode = function (document, value, settings) {
                return document.createTextNode(settings.dateTimeFormatter(getFormattableDate(value)));
            },

        // Toggle buttons.
            getToggleButtonContent = function (polygon, settings) {
                var document = polygon.ownerDocument;
                var svg = document.createElementNS(svgns, "svg");
                svg.setAttribute("style", "width: 12px; height: 12px; vertical-align: initial");
                svg.setAttribute("focusable", "false");
                var border = document.createElementNS(svgns, "rect");
                border.setAttribute("id", "PART_Border");
                border.setAttribute("width", "12");
                border.setAttribute("height", "12");
                border.setAttribute("style", "fill: White; fill-opacity: 0");
                svg.appendChild(border);
                polygon.setAttribute("id", "PART_Button");
                if (typeof settings.toggleButtonClass !== undefinedType)
                    polygon.setAttribute("class", settings.toggleButtonClass);
                if (typeof settings.toggleButtonStyle !== undefinedType)
                    polygon.setAttribute("style", settings.toggleButtonStyle);
                svg.appendChild(polygon);
                return svg;
            },

        // Columns.
            getDefaultColumns = function (items, settings) {
                if (typeof settings !== objectType)
                    settings = {};
                initializeRequiredSettings(settings);
                var columns = [{ header: "", width: 32, isSelection: true },
                { header: "Task", width: 140, isTreeView: true },
                { header: "Start", width: 140 },
                { header: "Finish", width: 140 },
                { header: "Milestone", width: 80 },
                { header: "Completed", width: 80 },
                { header: "Assignments", width: 200}];
                columns[0].cellTemplate = getDefaultSelectionCellTemplate(settings, columns[0], items);
                columns[1].cellTemplate = getDefaultContentCellTreeTemplate(settings, columns[1], items);
                columns[1].exportCellTemplate = getDefaultContentCellTreeTemplate(settings, columns[1], items, false);
                columns[2].cellTemplate = getDefaultStartCellTemplate(settings, columns[2]);
                columns[2].exportCellTemplate = getDefaultStartCellTemplate(settings, columns[2], false);
                columns[3].cellTemplate = getDefaultFinishCellTemplate(settings, columns[3]);
                columns[3].exportCellTemplate = getDefaultFinishCellTemplate(settings, columns[3], false);
                columns[4].cellTemplate = getDefaultMilestoneCellTemplate(settings, columns[4]);
                columns[4].exportCellTemplate = getDefaultMilestoneCellTemplate(settings, columns[4], false);
                columns[5].cellTemplate = getDefaultCompletedCellTemplate(settings, columns[5]);
                columns[5].exportCellTemplate = getDefaultCompletedCellTemplate(settings, columns[5], false);
                columns[6].cellTemplate = getDefaultAssignmentsContentCellTemplate(settings, columns[6]);
                columns[6].exportCellTemplate = getDefaultAssignmentsContentCellTemplate(settings, columns[6], false);
                if (settings.selectionMode != "Single" && settings.selectionMode != "Extended" && settings.selectionMode != "ExtendedFocus")
                    columns.splice(0, 1);
                return columns;
            },
            getDefaultSelectionCellTemplate = function (settings, column, items) {
                var defaultReturn = function (item) { return getBooleanNode(item.ganttChartView.ownerDocument, item.isSelected); };
                return function (item) { if (!column.isReadOnly) return getSelectionInputNode(item, settings, items); return defaultReturn(item); }
            },
            getSelectionInputNode = function (item, settings, items) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.selectionInput === undefinedType) {
                    input = document.createElement("input");
                    item.selectionInput = input;
                    input.type = "checkbox";
                    input.setAttribute("style", "margin: 0px");
                }
                else {
                    input = item.selectionInput;
                }
                if (item.isSelected) {
                    input.setAttribute("checked", "checked");
                    if (!input.checked)
                        input.checked = true;
                }
                else if (input.checked) {
                    input.checked = false;
                }
                var onChange = function (e) {
                    if (input.checked)
                        selectItem(item, settings);
                    else
                        unselectItem(item, settings);
                };
                if (typeof input.changeEventListener !== undefinedType)
                    input.removeEventListener("change", input.changeEventListener, true);
                input.addEventListener("change", onChange, true);
                input.changeEventListener = onChange;
                var onKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(e);
                    }
                };
                if (typeof input.keyPressEventListener !== undefinedType)
                    input.removeEventListener("keypress", input.keyPressEventListener, true);
                input.addEventListener("keypress", onKeyPress, true);
                input.keyPressEventListener = onKeyPress;
                return input;
            },
            setItemSelection = function (item, isSelected, selectionMode) {
                item.isSelected = isSelected;
                onItemPropertyChanged(item, "isSelected", true, true);
                refreshGridItemSelection(item);
                var ii;
                if (typeof item.ganttChartView !== undefinedType) {
                    item.ganttChartView.selectedItem = item;
                    if (selectionMode != "Extended" && selectionMode != "ExtendedFocus")
                        item.ganttChartView.selectedItems = [item];
                    var i;
                    if (selectionMode != "Extended" && selectionMode != "ExtendedFocus") {
                        for (i = 0; i < item.ganttChartView.items.length; i++) {
                            ii = item.ganttChartView.items[i];
                            if (ii != item && ii.isSelected) {
                                ii.isSelected = false;
                                onItemPropertyChanged(ii, "isSelected", false, true);
                                refreshGridItemSelection(ii);
                            }
                        }
                    }
                }
                if (typeof item.ganttChartView !== undefinedType && (selectionMode == "Extended" || selectionMode == "ExtendedFocus")) {
                    var selectedItems = [];
                    for (i = 0; i < item.ganttChartView.items.length; i++) {
                        ii = item.ganttChartView.items[i];
                        if (ii.isSelected)
                            selectedItems.push(ii);
                    }
                    item.ganttChartView.selectedItems = selectedItems;
                }
            },
            selectItem = function (item, settings) {
                setItemSelection(item, true, settings.selectionMode);
            },
            unselectItem = function (item, settings) {
                setItemSelection(item, false, settings.selectionMode);
            },
            setCurrentItem = function (item, settings) {
                if (typeof item.ganttChartView !== undefinedType)
                    item.ganttChartView.currentItem = item;
                if ((settings.selectionMode == "Focus" || settings.selectionMode == "ExtendedFocus")) {
                    if (typeof item.scheduleChartItem !== undefinedType)
                        item = item.scheduleChartItem;
                    if (!item.isSelected)
                        selectItem(item, settings);
                }
            },
            getDefaultContentCellTreeTemplate = function (settings, column, items, isEditable) {
                var defaultReturn = function (item) { return getTextNode(item.ganttChartView.ownerDocument, item.content); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly && !settings.isContentReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly)) return getContentInputNode(item, Math.max(0, column.width - item.indentation * item.ganttChartView.settings.indentationLevelWidth - item.ganttChartView.settings.toggleButtonAreaWidth - 16), settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getContentInputNode = function (item, width, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.contentInput === undefinedType) {
                    input = document.createElement("input");
                    item.contentInput = input;
                    input.type = "text";
                    input.addEventListener("focus", function (e) { setCurrentItem(item, settings); }, false);
                    var onChange = function (e) {
                        item.content = input.value;
                        onItemPropertyChanged(item, "content", true, true);
                        refreshItem(item);
                    };
                    if (typeof input.changeEventListener !== undefinedType)
                        input.removeEventListener("change", input.changeEventListener, true);
                    input.addEventListener("change", onChange, true);
                    input.changeEventListener = onChange;
                    var onKeyPress = function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            onChange(e);
                        }
                    };
                    if (typeof input.keyPressEventListener !== undefinedType)
                        input.removeEventListener("keypress", input.keyPressEventListener, true);
                    input.addEventListener("keypress", onKeyPress, true);
                    input.keyPressEventListener = onKeyPress;
                    input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, false);
                    input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, false);
                }
                else {
                    input = item.contentInput;
                }
                input.value = item.content;
                var isSummary = "";
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    isSummary = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + isSummary + (settings.classic ? "" : "; font-size: 12px; padding: 1px;"));
                return input;
            },
            getDefaultStartCellTemplate = function (settings, column, isEditable) {
                var defaultReturn = function (item) { if (typeof item.start === undefinedType || (typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getEmptyNode(item.ganttChartView.ownerDocument); return getDateNode(item.ganttChartView.ownerDocument, item.start, settings); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && !(typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getStartInputNode(item, Math.max(0, column.width - 16), settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getStartInputNode = function (item, width, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input = document.createElement("input");
                item.startInput = input;
                try { input.type = settings.dateTimePickerType; } catch (exc) { input.type = "text"; }
                input.addEventListener("focus", function (e) { setCurrentItem(item, settings); }, false);
                input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, false);
                input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, false);
                if (typeof item.start !== undefinedType)
                    input.value = settings.dateTimeFormatter(getFormattableDate(item.start));
                if (DlhSoft.Controls.DatePicker && settings.dateTimePickerType == "text" && settings.useDatePicker) {
                    input.addEventListener("focus", function (e) {
                        if (item.isWaitingToRefreshGridItem)
                            return;
                        var datePicker = (settings.useTimePicker && DlhSoft.Controls.DateTimePicker ? DlhSoft.Controls.DateTimePicker : DlhSoft.Controls.DatePicker).get(input);
                        if (!datePicker || !datePicker.isOpen) {
                            var selectionStart = 0, selectionEnd = 0;
                            try { selectionStart = input.selectionStart; selectionEnd = input.selectionEnd; } catch (exc) { }
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            datePicker = (settings.useTimePicker && DlhSoft.Controls.DateTimePicker ? DlhSoft.Controls.DateTimePicker : DlhSoft.Controls.DatePicker).initialize(input, undefined, { inputStyle: null, isDropDownButtonVisible: false, defaultTimeOfDay: settings.workingDayStart, dateTimeFormatter: settings.dateTimeFormatter, dateTimeParser: settings.dateTimeParser, popupStyle: "margin-top: 1px; background-color: White; border: 1px solid " + settings.border, disabledDateSelector: getDisabledDateSelector(settings), disabledTimeSelector: getDisabledStartTimeSelector(settings), calendarSelectorLevels: settings.calendarSelectorLevels, months: settings.months, daysOfWeek: getAbbreviations(settings.daysOfWeek), weekStart: settings.weekStartDay }, internalLicense);
                            datePicker.openDropDown();
                            setTimeout(function () { try { input.selectionStart = selectionStart; input.selectionEnd = selectionEnd; } catch (exc) { } }, 100);
                            if (navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null) {
                                setTimeout(function () { try { input.focus(); } catch (exc) { } }, 100);
                            }
                            else if (document.createEvent) {
                                setTimeout(function () {
                                    var ev = document.createEvent("MouseEvents");
                                    ev.initEvent("blur", true, false);
                                    input.dispatchEvent(ev);
                                });
                            }
                        }
                    }, true);
                }
                var isSummary = "";
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    isSummary = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + isSummary + (settings.classic ? "" : "; font-size: 12px; padding: 1px;"));
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    input.setAttribute("disabled", "true");
                else
                    input.removeAttribute("disabled");
                var onChange = function (e) {
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                        var wasStarted = item.completedFinish > item.start;
                        var effort, completedEffort;
                        if (settings.isTaskEffortPreservedWhenStartChangesInGrid) {
                            effort = getItemEffort(item, settings);
                            completedEffort = getItemCompletedEffort(item, settings);
                        }
                        var originalStart = item.start.valueOf(), originalFinish = item.finish.valueOf(), originalCompletedFinish = item.completedFinish.valueOf();
                        var dateValue = settings.dateTimeParser(input.value);
                        if (dateValue == null || isNaN(dateValue))
                            dateValue = new Date();
                        item.start = ensureWorkingTime(getParsedDate(dateValue), settings, true, item.isMilestone, getItemSchedule(item));
                        item.preferredStart = item.start;
                        if (item.isMilestone)
                            item.finish = item.start;
                        if (item.start.valueOf() != originalStart)
                            onItemPropertyChanged(item, "start", true, true);
                        if (item.finish < item.start) {
                            item.finish = item.start;
                            if (item.finish.valueOf() != originalFinish)
                                onItemPropertyChanged(item, "finish", false, true);
                        }
                        if (item.completedFinish < item.start || !wasStarted) {
                            item.completedFinish = item.start;
                            if (item.completedFinish.valueOf() != originalCompletedFinish)
                                onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                        else if (item.completedFinish > item.finish) {
                            item.completedFinish = item.finish;
                            if (item.completedFinish.valueOf() != originalCompletedFinish)
                                onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                        if (typeof item.completedInput !== undefinedType) {
                            var completedInput = item.completedInput;
                            if (typeof completedInput.changeEventListener !== undefinedType)
                                completedInput.removeEventListener("change", completedInput.changeEventListener, true);
                            delete item.completedInput;
                        }
                        if (settings.isTaskEffortPreservedWhenStartChangesInGrid) {
                            setItemEffort(item, effort, settings);
                            setItemCompletedEffort(item, completedEffort, settings);
                        }
                    }
                    refreshItemPath(item);
                };
                if (typeof input.changeEventListener !== undefinedType)
                    input.removeEventListener("change", input.changeEventListener, true);
                input.addEventListener("change", onChange, true);
                input.changeEventListener = onChange;
                var onKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(e);
                    }
                };
                if (typeof input.keyPressEventListener !== undefinedType)
                    input.removeEventListener("keypress", input.keyPressEventListener, true);
                input.addEventListener("keypress", onKeyPress, true);
                input.keyPressEventListener = onKeyPress;
                return input;
            },
            getDefaultFinishCellTemplate = function (settings, column, isEditable) {
                var defaultReturn = function (item) { if (typeof item.finish === undefinedType || (typeof item.isMilestone !== undefinedType && item.isMilestone == true && typeof item.start !== undefinedType && item.finish.valueOf() == item.start.valueOf()) || (typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getEmptyNode(item.ganttChartView.ownerDocument); return getDateNode(item.ganttChartView.ownerDocument, item.finish, settings); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && !(typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getFinishInputNode(item, Math.max(0, column.width - 16), settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getFinishInputNode = function (item, width, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input = document.createElement("input");
                item.finishInput = input;
                try { input.type = settings.dateTimePickerType; } catch (exc) { input.type = "text"; }
                input.addEventListener("focus", function (e) { setCurrentItem(item, settings); }, false);
                input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, false);
                input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, false);
                if (typeof item.finish !== undefinedType)
                    input.value = settings.dateTimeFormatter(getFormattableDate(item.finish));
                if (DlhSoft.Controls.DatePicker && settings.dateTimePickerType == "text" && settings.useDatePicker) {
                    input.addEventListener("focus", function (e) {
                        if (item.isWaitingToRefreshGridItem)
                            return;
                        var datePicker = (settings.useTimePicker && DlhSoft.Controls.DateTimePicker ? DlhSoft.Controls.DateTimePicker : DlhSoft.Controls.DatePicker).get(input);
                        if (!datePicker || !datePicker.isOpen) {
                            var selectionStart = 0, selectionEnd = 0;
                            try { selectionStart = input.selectionStart; selectionEnd = input.selectionEnd; } catch (exc) { }
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            datePicker = (settings.useTimePicker && DlhSoft.Controls.DateTimePicker ? DlhSoft.Controls.DateTimePicker : DlhSoft.Controls.DatePicker).initialize(input, undefined, { inputStyle: null, isDropDownButtonVisible: false, defaultTimeOfDay: settings.workingDayFinish, dateTimeFormatter: settings.dateTimeFormatter, dateTimeParser: settings.dateTimeParser, popupStyle: "margin-top: 1px; background-color: White; border: 1px solid " + settings.border, disabledDateSelector: getDisabledDateSelector(settings), disabledTimeSelector: getDisabledFinishTimeSelector(settings, item), calendarSelectorLevels: settings.calendarSelectorLevels, months: settings.months, daysOfWeek: getAbbreviations(settings.daysOfWeek), weekStart: settings.weekStartDay }, internalLicense);
                            datePicker.openDropDown();
                            setTimeout(function () { try { input.selectionStart = selectionStart; input.selectionEnd = selectionEnd; } catch (exc) { } }, 100);
                            if (navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null) {
                                setTimeout(function () { try { input.focus(); } catch (exc) { } }, 100);
                            }
                            else if (document.createEvent) {
                                setTimeout(function () {
                                    var ev = document.createEvent("MouseEvents");
                                    ev.initEvent("blur", true, false);
                                    input.dispatchEvent(ev);
                                });
                            }
                        }
                    }, true);
                }
                var hidden = "";
                if (typeof item.isMilestone !== undefinedType && item.isMilestone == true)
                    hidden = "; visibility: hidden";
                var isSummary = "";
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    isSummary = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + hidden + isSummary + (settings.classic ? "" : "; font-size: 12px; padding: 1px;"));
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    input.setAttribute("disabled", "true");
                else
                    input.removeAttribute("disabled");
                var onChange = function (e) {
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                        var originalFinish = item.finish.valueOf(), originalCompletedFinish = item.completedFinish.valueOf();
                        var dateValue = settings.dateTimeParser(input.value);
                        if (dateValue == null || isNaN(dateValue))
                            dateValue = new Date();
                        var d = getParsedDate(dateValue);
                        if (input.value.length > 0 && input.value.indexOf(" ") < 0 && getTimeOfDay(d) == 0)
                            d = addDay(d);
                        item.finish = ensureWorkingTime(d, settings, item.isMilestone, true, getItemSchedule(item));
                        if (item.finish < item.start)
                            item.finish = item.start;
                        if (item.finish.valueOf() != originalFinish)
                            onItemPropertyChanged(item, "finish", true, true);
                        if (item.completedFinish < item.start) {
                            item.completedFinish = item.start;
                            if (item.completedFinish.valueOf() != originalCompletedFinish)
                                onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                        else if (item.completedFinish > item.finish) {
                            item.completedFinish = item.finish;
                            if (item.completedFinish.valueOf() != originalCompletedFinish)
                                onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                        if (typeof item.completedInput !== undefinedType) {
                            var completedInput = item.completedInput;
                            if (typeof completedInput.changeEventListener !== undefinedType)
                                completedInput.removeEventListener("change", completedInput.changeEventListener, true);
                            delete item.completedInput;
                        }
                    }
                    refreshItemPath(item);
                };
                if (typeof input.changeEventListener !== undefinedType)
                    input.removeEventListener("change", input.changeEventListener, true);
                input.addEventListener("change", onChange, true);
                input.changeEventListener = onChange;
                var onKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(e);
                    }
                };
                if (typeof input.keyPressEventListener !== undefinedType)
                    input.removeEventListener("keypress", input.keyPressEventListener, true);
                input.addEventListener("keypress", onKeyPress, true);
                input.keyPressEventListener = onKeyPress;
                return input;
            },
            getDisabledDateSelector = function (settings) {
                return function (date) {
                    if (date.getDay() < settings.workingWeekStart || date.getDay() > settings.workingWeekFinish)
                        return true;
                    if (settings.specialNonworkingDays) {
                        if (typeof settings.specialNonworkingDays === 'function') {
                            return settings.specialNonworkingDays(getParsedDate(date));
                        }
                        var dateValue = getParsedDate(date).valueOf();
                        for (var i = 0; i < settings.specialNonworkingDays.length; i++) {
                            if (dateValue == settings.specialNonworkingDays[i].valueOf())
                                return true;
                        }
                    }
                    return false;
                };
            },
            getDisabledStartTimeSelector = function (settings) {
                return function (time) { return time < settings.visibleDayStart || time >= settings.visibleDayFinish };
            },
            getDisabledFinishTimeSelector = function (settings, item) {
                return function (time) { return (getDate(item.start) < getDate(item.finish) ? time <= settings.visibleDayStart : time < settings.visibleDayStart) || time > settings.visibleDayFinish };
            },
            getAbbreviations = function (values) {
                if (!values)
                    return undefined;
                var abbreviations = [];
                for (var i = 0; i < values.length; i++) {
                    var v = values[i];
                    v = v.length > 0 ? v[0].toUpperCase() + (v.length > 1 ? v[1] : "") : "";
                    abbreviations.push(v);
                }
                return abbreviations;
            },
            getDefaultMilestoneCellTemplate = function (settings, column, isEditable) {
                var defaultReturn = function (item) { if (typeof item.isMilestone === undefinedType || (typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getEmptyNode(item.ganttChartView.ownerDocument); return getBooleanNode(item.ganttChartView.ownerDocument, item.isMilestone); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && !(typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getMilestoneInputNode(item, settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getMilestoneInputNode = function (item, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.milestoneInput === undefinedType) {
                    input = document.createElement("input");
                    item.milestoneInput = input;
                    input.type = "checkbox";
                    input.setAttribute("style", "margin: 0px; margin-left: 2px; margin-right: 2px");
                    input.addEventListener("focus", function (e) { setCurrentItem(item, settings); }, false);
                }
                else {
                    input = item.milestoneInput;
                }
                if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) && typeof item.isMilestone !== undefinedType && item.isMilestone)
                    input.setAttribute("checked", "checked");
                else
                    input.removeAttribute("checked");
                if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                    var onChange = function (e) {
                        if (input.checked) {
                            item.isMilestone = true;
                            onItemPropertyChanged(item, "isMilestone", true, true);
                            if (item.finish > item.start) {
                                item.finish = item.start;
                                onItemPropertyChanged(item, "finish", false, true);
                            }
                            if (item.completedFinish > item.start) {
                                item.completedFinish = item.start;
                                onItemPropertyChanged(item, "completedFinish", false, true);
                            }
                        }
                        else {
                            item.isMilestone = false;
                            onItemPropertyChanged(item, "isMilestone", true, true);
                        }
                        refreshItemPath(item);
                    };
                    if (typeof input.changeEventListener !== undefinedType)
                        input.removeEventListener("change", input.changeEventListener, true);
                    input.addEventListener("change", onChange, true);
                    input.changeEventListener = onChange;
                    var onKeyPress = function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            onChange(e);
                        }
                    };
                    if (typeof input.keyPressEventListener !== undefinedType)
                        input.removeEventListener("keypress", input.keyPressEventListener, true);
                    input.addEventListener("keypress", onKeyPress, true);
                    input.keyPressEventListener = onKeyPress;
                }
                else {
                    input.setAttribute("style", "visibility: hidden");
                }
                return input;
            },
            getDefaultAssignmentsContentCellTemplate = function (settings, column, isEditable) {
                var defaultReturn = function (item) { if (typeof item.assignmentsContent === undefinedType || (typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getEmptyNode(item.ganttChartView.ownerDocument); return getTextNode(item.ganttChartView.ownerDocument, item.assignmentsContent); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly && !settings.isAssignmentsContentReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && !(typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getAssignmentsContentInputNode(item, Math.max(0, column.width - 16), settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getAssignmentsContentInputNode = function (item, width, settings) {
                var ganttChartView = item.ganttChartView;
                var document = ganttChartView.ownerDocument;
                var input;
                if (typeof item.assignmentsContentInput === undefinedType) {
                    input = document.createElement("input");
                    item.assignmentsContentInput = input;
                    input.type = "text";
                    input.addEventListener("focus", function (e) { setCurrentItem(item, settings); }, false);
                    var onChange = function (e) {
                        item.assignmentsContent = input.value;
                        onItemPropertyChanged(item, "assignmentsContent", true, true);
                        if (!item.hasChildren && item.hasFixedEffort) {
                            item.fixedEffort = getItemEffort(item, settings);
                            item.fixedEffortAssignments = getItemAssignments(item);
                        }
                        refreshChartItem(item);
                        var multiSelectorComboBox = null;
                        if (DlhSoft.Controls.MultiSelectorComboBox)
                            multiSelectorComboBox = DlhSoft.Controls.MultiSelectorComboBox.get(input);
                        if (multiSelectorComboBox != null && multiSelectorComboBox.availableChoices.length > 0) {
                            var timer = setInterval(function () {
                                if (!multiSelectorComboBox.isOpen && document.activeElement != item.assignmentsContentInput) {
                                    clearInterval(timer);
                                    refreshItemPath(item);
                                }
                            }, 100);
                        }
                        else {
                            refreshItemPath(item);
                        }
                    };
                    if (typeof input.changeEventListener !== undefinedType)
                        input.removeEventListener("change", input.changeEventListener, true);
                    input.addEventListener("change", function (e) {
                        input.dontAutoFocus = true;
                        onChange(e);
                    }, true);
                    input.changeEventListener = onChange;
                    var onKeyPress = function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (typeof input.dontAutoFocus !== undefinedType)
                                delete input.dontAutoFocus;
                            onChange(e);
                        }
                    };
                    if (typeof input.keyPressEventListener !== undefinedType)
                        input.removeEventListener("keypress", input.keyPressEventListener, true);
                    input.addEventListener("keypress", onKeyPress, true);
                    input.keyPressEventListener = onKeyPress;
                    input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, false);
                    input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, false);
                }
                else {
                    input = item.assignmentsContentInput;
                }
                if (typeof item.assignmentsContent !== undefinedType)
                    input.value = item.assignmentsContent;
                if (DlhSoft.Controls.MultiSelectorComboBox && settings.useResourceSelector) {
                    input.addEventListener("focus", function (e) {
                        if (item.isWaitingToRefreshGridItem)
                            return;
                        var multiSelectorComboBox = DlhSoft.Controls.MultiSelectorComboBox.get(input);
                        if (!multiSelectorComboBox || (!multiSelectorComboBox.isOpen && multiSelectorComboBox.availableChoices.length > 0)) {
                            var availableResources = settings.assignableResources;
                            if (typeof availableResources === undefinedType) {
                                availableResources = getAssignedResources(ganttChartView.items);
                                settings.assignableResources = availableResources;
                            }
                            var selectionStart = 0, selectionEnd = 0;
                            try { selectionStart = input.selectionStart; selectionEnd = input.selectionEnd; } catch (exc) { }
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            multiSelectorComboBox = DlhSoft.Controls.MultiSelectorComboBox.initialize(input, availableResources, undefined, { inputStyle: null, autoAppendAvailableChoices: settings.autoAppendAssignableResources, isDropDownButtonVisible: false, popupStyle: "margin-top: 1px; background-color: White; color: Black; border: 1px solid " + settings.border + "; font-size: small; max-height: 188px; overflow-y: auto" }, internalLicense);
                            multiSelectorComboBox.openDropDown();
                            setTimeout(function () { try { input.selectionStart = selectionStart; input.selectionEnd = selectionEnd; } catch (exc) { } }, 100);
                            if (navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null) {
                                setTimeout(function () { try { input.focus(); } catch (exc) { } }, 100);
                            }
                            else if (document.createEvent) {
                                setTimeout(function () {
                                    var ev = document.createEvent("MouseEvents");
                                    ev.initEvent("blur", true, false);
                                    input.dispatchEvent(ev);
                                });
                            }
                        }
                    }, true);
                }
                var isSummary = "";
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    isSummary = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + isSummary + (settings.classic ? "" : "; font-size: 12px; padding: 1px;"));
                return input;
            },
            getDefaultCompletedCellTemplate = function (settings, column, isEditable) {
                var defaultReturn = function (item) { if (typeof item.start === undefinedType || typeof item.finish === undefinedType || item.finish.valueOf() == item.start.valueOf() || (typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getEmptyNode(item.ganttChartView.ownerDocument); return getBooleanNode(item.ganttChartView.ownerDocument, item.ganttChartView.isItemCompleted(item)); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) && !(typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled && typeof item.isBarVisible !== undefinedType && !item.isBarVisible)) return getCompletedInputNode(item, settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getCompletedInputNode = function (item, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.completedInput === undefinedType) {
                    input = document.createElement("input");
                    item.completedInput = input;
                    input.type = "checkbox";
                    input.setAttribute("style", "margin: 0px; margin-left: 2px; margin-right: 2px");
                    input.addEventListener("focus", function (e) { setCurrentItem(item, settings); }, false);
                }
                else {
                    input = item.completedInput;
                }
                if (item.isSetAsCompleted || (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) && item.completedFinish >= item.finish && item.finish > item.start && (typeof item.isMilestone === undefinedType || !item.isMilestone)))
                    input.setAttribute("checked", "checked");
                else
                    input.removeAttribute("checked");
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    input.setAttribute("style", "visibility: hidden");
                var onChange = function (e) {
                    if (input.checked) {
                        if (item.completedFinish < item.finish) {
                            item.completedFinish = item.finish;
                            onItemPropertyChanged(item, "completedFinish", true, true);
                        }
                        if (item.isMilestone || item.finish.valueOf() <= item.start.valueOf()) {
                            item.isSetAsCompleted = true;
                            onItemPropertyChanged(item, "isSetAsCompleted", true, true);
                        }
                    }
                    else {
                        if (item.completedFinish > item.start) {
                            item.completedFinish = item.start;
                            onItemPropertyChanged(item, "completedFinish", true, true);
                        }
                        if (item.isMilestone || item.finish.valueOf() <= item.start.valueOf()) {
                            item.isSetAsCompleted = false;
                            onItemPropertyChanged(item, "isSetAsCompleted", true, true);
                        }
                    }
                    refreshItemPath(item);
                };
                if (typeof input.changeEventListener !== undefinedType)
                    input.removeEventListener("change", input.changeEventListener, true);
                input.addEventListener("change", onChange, true);
                input.changeEventListener = onChange;
                var onKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(e);
                    }
                };
                if (typeof input.keyPressEventListener !== undefinedType)
                    input.removeEventListener("keypress", input.keyPressEventListener, true);
                input.addEventListener("keypress", onKeyPress, true);
                input.keyPressEventListener = onKeyPress;
                return input;
            },
            getGridWidth = function (columns) {
                var width = 0;
                for (var i = 0; i < columns.length; i++)
                    width += columns[i].width;
                return width;
            },
            initializeColumns = function (columns, ganttChartView, settings) {
                var toggleButtonAreaWidth = getToggleButtonAreaWidth(ganttChartView.items, settings);
                for (var i = 0; i < columns.length; i++) {
                    var column = columns[i];
                    column.ganttChartView = ganttChartView;
                    if (typeof column.width === undefinedType)
                        column.width = 100;
                    if (typeof column.minWidth === undefinedType)
                        column.minWidth = Math.min(column.width, settings.minColumnWidth + (column.isTreeView ? toggleButtonAreaWidth : 0));
                    if (typeof column.maxWidth === undefinedType)
                        column.maxWidth = settings.maxColumnWidth;
                    if (typeof column.cellTemplate === undefinedType)
                        column.cellTemplate = function (item) { return getTextNode(item.ganttChartView.ownerDocument, item.content); };
                    if (settings.verticalGridLines || settings.verticalGridHeaderLines) {
                        if (column.minWidth < 4)
                            column.minWidth = 4;
                        if (column.width < column.minWidth)
                            column.width = column.minWidth;
                    }
                }
            },
            loadColumnHeaders = function (gridHeader, columns, settings, ganttChartView) {
                var document = gridHeader.ownerDocument;
                var gridColumnHeadersContainer = document.createElement("div");
                if (typeof settings.columnHeaderClass !== undefinedType)
                    gridColumnHeadersContainer.setAttribute("class", settings.columnHeaderClass);
                if (typeof settings.columnHeaderStyle !== undefinedType)
                    gridColumnHeadersContainer.setAttribute("style", settings.columnHeaderStyle);
                for (var i = 0; i < columns.length; i++)
                    gridColumnHeadersContainer.appendChild(getGridColumnHeader(document, columns[i], settings, ganttChartView));
                gridHeader.appendChild(gridColumnHeadersContainer);
            },
            getGridColumnHeader = function (document, column, settings, ganttChartView) {
                var gridColumnHeader = document.createElement("div");
                gridColumnHeader.setAttribute("style", "overflow-y: hidden; vertical-align: middle; display: table-cell; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; height: " + settings.headerHeight + "px");
                var gridColumnHeaderContentContainer = document.createElement("div");
                var padding = column.width >= 4 ? 2 : column.width / 2;
                gridColumnHeaderContentContainer.setAttribute("style", "padding-left: " + padding + "px; padding-right: " + padding + "px; overflow-x: hidden; -wekbit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: " + column.width + "px");
                var gridColumnHeaderContent = document.createElement("div");
                if (typeof column.headerClass !== undefinedType)
                    gridColumnHeaderContent.setAttribute("class", column.headerClass);
                if (typeof column.headerStyle !== undefinedType)
                    gridColumnHeaderContent.setAttribute("style", column.headerStyle);
                gridColumnHeaderContent.appendChild(getTextNode(document, column.header));
                gridColumnHeaderContentContainer.appendChild(gridColumnHeaderContent);
                gridColumnHeader.appendChild(gridColumnHeaderContentContainer);
                if (settings.verticalGridLines || settings.verticalGridHeaderLines || (column.width >= 1 && (typeof settings.allowUserToResizeColumns === undefinedType || settings.allowUserToResizeColumns) && (typeof column.allowUserToResize === undefinedType || column.allowUserToResize))) {
                    gridColumnHeader.isGripperVisible = false;
                    var ganttChartView = column.ganttChartView;
                    var setGripperVisibility = function (isVisible) {
                        gridColumnHeader.isGripperVisible = isVisible;
                        gridColumnHeader.style.cursor = isVisible ? (settings.classic ? "e-resize" : "ew-resize") : "default";
                        gridColumnHeader.style.borderRight = isVisible ? "solid 1px " + settings.border : (settings.verticalGridLines || settings.verticalGridHeaderLines ? "solid 1px " + (settings.verticalGridHeaderLines ? settings.verticalGridHeaderLines : settings.verticalGridLines) : "");
                        gridColumnHeaderContentContainer.style.width = (column.width - (gridColumnHeader.style.borderRight ? 1 : 0)) + "px";
                    }
                    if (settings.verticalGridLines || settings.verticalGridHeaderLines)
                        setGripperVisibility();
                    if (column.width >= 1 && (typeof settings.allowUserToResizeColumns === undefinedType || settings.allowUserToResizeColumns) && (typeof column.allowUserToResize === undefinedType || column.allowUserToResize)) {
                        var gripperVisibilityExtent = settings.splitterWidth;
                        gridColumnHeader.addEventListener("mouseover", function (e) {
                            if (DlhSoft.Controls.GanttChartView.isGripperDragging || gridColumnHeader.isGripperDragging || (typeof e.offsetX === undefinedType && e.currentTarget != gridColumnHeader))
                                return;
                            setGripperVisibility((typeof e.offsetX !== undefinedType ? e.offsetX : e.layerX - e.currentTarget.offsetLeft) >= column.width - gripperVisibilityExtent);
                        }, true);
                        gridColumnHeader.addEventListener("mousemove", function (e) {
                            if (DlhSoft.Controls.GanttChartView.isGripperDragging || gridColumnHeader.isGripperDragging || (typeof e.offsetX === undefinedType && e.currentTarget != gridColumnHeader))
                                return;
                            setGripperVisibility((typeof e.offsetX !== undefinedType ? e.offsetX : e.layerX - e.currentTarget.offsetLeft) >= column.width - gripperVisibilityExtent);
                        }, true);
                        gridColumnHeaderContentContainer.addEventListener("mouseover", function (e) {
                            if (DlhSoft.Controls.GanttChartView.isGripperDragging || gridColumnHeader.isGripperDragging || typeof e.offsetX !== undefinedType || e.currentTarget != gridColumnHeaderContentContainer)
                                return;
                            setGripperVisibility(e.layerX - e.currentTarget.offsetLeft >= column.width - gripperVisibilityExtent);
                        }, false);
                        gridColumnHeaderContentContainer.addEventListener("mousemove", event(ganttChartView, gridColumnHeaderContentContainer, "mousemove", function (e) {
                            if (DlhSoft.Controls.GanttChartView.isGripperDragging || gridColumnHeader.isGripperDragging || typeof e.offsetX !== undefinedType || e.currentTarget != gridColumnHeaderContentContainer)
                                return;
                            setGripperVisibility(e.layerX - e.currentTarget.offsetLeft >= column.width - gripperVisibilityExtent);
                        }));
                        gridColumnHeader.addEventListener("mousedown", event(ganttChartView, gridColumnHeader, "mousedown", function (e) {
                            if (e.button != 0 || !gridColumnHeader.isGripperVisible || DlhSoft.Controls.GanttChartView.isGripperDragging)
                                return;
                            DlhSoft.Controls.GanttChartView.isGripperDragging = true;
                            gridColumnHeader.isGripperDragging = true;
                            gridColumnHeader.initialGripperDraggingX = e.clientX;
                            gridColumnHeader.initialColumnWidth = column.width;
                        }, true), true);
                        document.addEventListener("mousemove", event(ganttChartView, document, "mousemove", function (e) {
                            if (!gridColumnHeader.isGripperDragging)
                                return;
                            column.width = Math.max(column.minWidth, gridColumnHeader.initialColumnWidth + (e.clientX - gridColumnHeader.initialGripperDraggingX));
                            if (typeof column.maxWidth !== undefinedType && column.width > column.maxWidth)
                                column.width = column.maxWidth;
                            gridColumnHeaderContentContainer.style.width = (column.width - 1) + "px";
                            if (typeof settings.columnWidthChangeHandler !== undefinedType)
                                setTimeout(function () { settings.columnWidthChangeHandler(column, column.width); }, 0);
                            if (ganttChartView.isWaitingToRefreshColumns)
                                return;
                            ganttChartView.isWaitingToRefreshColumns = true;
                            setTimeout(function () {
                                var gridWidth = getGridWidth(settings.columns);
                                var gridHeader = ganttChartView.gridHeader;
                                gridHeader.style.width = gridWidth + "px";
                                var gridContent = ganttChartView.gridContent;
                                gridContent.style.width = gridWidth + "px";
                                delete ganttChartView.isWaitingToRefreshColumns;
                                ganttChartView.refreshGridItems();
                            }, 0);
                        }, true), true);
                        document.addEventListener("mouseup", event(ganttChartView, document, "mouseup", function (e) {
                            if (!gridColumnHeader.isGripperDragging)
                                return;
                            delete gridColumnHeader.isGripperDragging;
                            delete gridColumnHeader.initialGripperDraggingX;
                            delete gridColumnHeader.initialColumnWidth;
                            setGripperVisibility(false);
                            delete DlhSoft.Controls.GanttChartView.isGripperDragging;
                        }, true), true);
                        gridColumnHeader.addEventListener("mouseout", event(ganttChartView, gridColumnHeader, "mouseout", function (e) {
                            if (gridColumnHeader.isGripperDragging)
                                return;
                            setGripperVisibility(false);
                        }));
                    }
                }
                return gridColumnHeader;
            },

        // Hierarchy.
            initializeHierarchy = function (items, ganttChartView) {
                var parentCollapsedLevel = -1;
                var previousItem = null;
                var selectedItem = null, selectedItems = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (typeof item.scheduleChartItem === undefinedType) {
                        if (typeof item.isSelected === undefinedType)
                            item.isSelected = false;
                        if (item.isSelected) {
                            if (selectedItem == null)
                                selectedItem = item;
                            selectedItems.push(item);
                        }
                        if (typeof item.indentation === undefinedType)
                            item.indentation = 0;
                        if (i == 0 && item.indentation != 0) {
                            item.indentation = 0;
                            onItemPropertyChanged(item, "indentation", false, true);
                        }
                        if (typeof item.isExpanded === undefinedType)
                            item.isExpanded = true;
                        if (previousItem != null) {
                            var maxIndentation = previousItem.indentation + 1;
                            if (item.indentation > maxIndentation) {
                                item.indentation = maxIndentation;
                                onItemPropertyChanged(item, "indentation", false, true);
                            }
                            previousItem.hasChildren = item.indentation > previousItem.indentation;
                            if (previousItem.hasChildren && typeof previousItem.isMilestone !== undefinedType && previousItem.isMilestone) {
                                previousItem.isMilestone = false;
                                onItemPropertyChanged(previousItem, "isMilestone", false, true);
                            }
                        }
                    }
                    item.isVisible = parentCollapsedLevel < 0 || item.indentation <= parentCollapsedLevel;
                    if (typeof item.scheduleChartItem === undefinedType) {
                        if (item.isVisible && !item.isExpanded)
                            parentCollapsedLevel = item.indentation;
                        if (item.isExpanded && item.indentation == parentCollapsedLevel)
                            parentCollapsedLevel = -1;
                        previousItem = item;
                    }
                }
                if (previousItem != null)
                    previousItem.hasChildren = false;
                ganttChartView.selectedItem = selectedItem;
                ganttChartView.selectedItems = selectedItems;
            },
            initializeTimingInformation = function (items, settings, ganttChartView) {
                ganttChartView.isTimingInformationInitialized = false;
                ganttChartView.isBasicTimingInformationInitialized = false;
                var currentTime = settings.currentTime;
                var currentDate = getDate(currentTime);
                var parents = [];
                var item, i, j;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    item.index = i;
                    var directParent = null;
                    if (parents.length > 0)
                        directParent = parents[parents.length - 1];
                    while (directParent != null && item.indentation <= directParent.indentation) {
                        parents.pop();
                        directParent = parents[parents.length - 1];
                    }
                    item.parent = directParent;
                    item.children = [];
                    if (directParent != null)
                        directParent.children.push(item);
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                        var originalStart = item.start, originalFinish = item.finish, originalCompletedFinish = item.completedFinish;
                        if (typeof item.start === undefinedType) {
                            item.start = currentDate;
                            item.preferredStart = item.start;
                        }
                        if (typeof item.finish === undefinedType) {
                            if (typeof item.isMilestone === undefinedType || !item.isMilestone)
                                item.finish = addDay(currentDate);
                            else
                                item.finish = item.start;
                        }
                        if (typeof item.isSetAsCompleted === undefinedType)
                            item.isSetAsCompleted = typeof item.completedFinish !== undefinedType && item.completedFinish.valueOf() == item.finish.valueOf();
                        if (typeof item.completedFinish === undefinedType)
                            item.completedFinish = item.start;
                        if (typeof item.isRelativeToTimezone === undefinedType || item.isRelativeToTimezone) {
                            item.start = new Date(item.start.valueOf() - item.start.getTimezoneOffset() * minuteDuration);
                            item.preferredStart = item.start;
                            item.finish = new Date(item.finish.valueOf() - item.finish.getTimezoneOffset() * minuteDuration);
                            if (typeof item.completedFinish === numberType)
                                item.completedFinish = getFinish(item.start, item.completedFinish * getEffort(item.start, item.finish, settings, getItemSchedule(item)), settings, getItemSchedule(item));
                            else
                                item.completedFinish = new Date(item.completedFinish.valueOf() - item.completedFinish.getTimezoneOffset() * minuteDuration);
                            if (typeof item.baselineStart !== undefinedType)
                                item.baselineStart = new Date(item.baselineStart.valueOf() - item.baselineStart.getTimezoneOffset() * minuteDuration);
                            if (typeof item.baselineFinish !== undefinedType)
                                item.baselineFinish = new Date(item.baselineFinish.valueOf() - item.baselineFinish.getTimezoneOffset() * minuteDuration);
                            if (typeof item.minStart !== undefinedType)
                                item.minStart = new Date(item.minStart.valueOf() - item.minStart.getTimezoneOffset() * minuteDuration);
                            if (typeof item.maxStart !== undefinedType)
                                item.maxStart = new Date(item.maxStart.valueOf() - item.maxStart.getTimezoneOffset() * minuteDuration);
                            if (typeof item.minFinish !== undefinedType)
                                item.minFinish = new Date(item.minFinish.valueOf() - item.minFinish.getTimezoneOffset() * minuteDuration);
                            if (typeof item.maxFinish !== undefinedType)
                                item.maxFinish = new Date(item.maxFinish.valueOf() - item.maxFinish.getTimezoneOffset() * minuteDuration);
                            item.isRelativeToTimezone = false;
                        }
                        else {
                            if (typeof item.completedFinish === numberType)
                                item.completedFinish = getFinish(item.start, item.completedFinish * getEffort(item.start, item.finish, settings, getItemSchedule(item)), settings, getItemSchedule(item));
                        }
                        if (typeof item.minStart !== undefinedType && item.start < item.minStart)
                            item.start = item.minStart;
                        else if (typeof item.maxStart !== undefinedType && item.start > item.maxStart)
                            item.start = item.maxStart;
                        if (typeof item.maxFinish !== undefinedType && item.finish > item.maxFinish)
                            item.finish = item.maxFinish;
                        else if (typeof item.minFinish !== undefinedType && item.finish < item.minFinish)
                            item.finish = item.minFinish;
                        if (item.finish < item.start)
                            item.finish = item.start;
                        if (item.completedFinish < item.start)
                            item.completedFinish = item.start;
                        else if (item.completedFinish > item.finish)
                            item.completedFinish = item.finish;
                        if (typeof item.loadChartItem === undefinedType)
                            item.start = ensureWorkingTime(item.start, settings, true, typeof item.isMilestone !== undefinedType && item.isMilestone, getItemSchedule(item));
                        if (typeof item.dependsOf !== undefinedType)
                            delete item.dependsOf;
                        item.preferredStart = item.start;
                        if (typeof item.loadChartItem === undefinedType) {
                            item.finish = ensureWorkingTime(item.finish, settings, typeof item.isMilestone !== undefinedType && item.isMilestone, true, getItemSchedule(item));
                            item.completedFinish = ensureWorkingTime(item.completedFinish, settings, typeof item.isMilestone !== undefinedType && item.isMilestone, true, getItemSchedule(item));
                        }
                        if (item.finish < item.start)
                            item.finish = item.start;
                        if (item.completedFinish < item.start)
                            item.completedFinish = item.start;
                        if (item.completedFinish > item.finish)
                            item.completedFinish = item.finish;
                        if (typeof originalStart === undefinedType || item.start.valueOf() != originalStart.valueOf())
                            onItemPropertyChanged(item, "start", false, true);
                        if (typeof originalFinish === undefinedType || item.finish.valueOf() != originalFinish.valueOf())
                            onItemPropertyChanged(item, "finish", false, true);
                        if (typeof originalCompletedFinish === undefinedType || item.completedFinish.valueOf() != originalCompletedFinish.valueOf())
                            onItemPropertyChanged(item, "completedFinish", false, true);
                    }
                    for (j = 0; j < parents.length; j++) {
                        var parent = parents[j];
                        if ((typeof parent.isSummaryEnabled !== undefinedType && !parent.isSummaryEnabled))
                            continue;
                        if (typeof parent.start === undefinedType || parent.start > item.start) {
                            parent.start = item.start;
                            onItemPropertyChanged(parent, "start", false, true);
                        }
                        if (typeof parent.finish === undefinedType || parent.finish < item.finish) {
                            parent.finish = item.finish;
                            onItemPropertyChanged(parent, "finish", false, true);
                        }
                        if (typeof parent.completedFinish === undefinedType || parent.completedFinish.valueOf() != parent.start.valueOf()) {
                            parent.completedFinish = parent.start;
                            onItemPropertyChanged(parent, "completedFinish", false, true);
                        }
                    }
                    if (directParent == null || item.indentation > directParent.indentation)
                        parents.push(item);
                }
                ganttChartView.isBasicTimingInformationInitialized = true;
                for (i = items.length; i-- > 0; ) {
                    item = items[i];
                    if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                        updateParentTimingInformation(item);
                }
                if (settings.areTaskDependencyConstraintsEnabled) {
                    for (i = 0; i < items.length; i++) {
                        item = items[i];
                        if (typeof item.predecessors !== undefinedType && item.predecessors != null && item.predecessors.length > 0)
                            ensureItemDependencyConstraints(item, items, settings, ganttChartView);
                    }
                } else if (settings.alwaysHandleInvalidDependencies) {
                    for (i = 0; i < items.length; i++) {
                        item = items[i];
                        if (typeof item.predecessors !== undefinedType && item.predecessors != null && item.predecessors.length > 0)
                            ensureItemDependencyConstraints(item, items, settings, ganttChartView, true);
                    }
                }
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (!item.hasChildren && item.hasFixedEffort) {
                        item.fixedEffort = getItemEffort(item, settings);
                        item.fixedEffortAssignments = getItemAssignments(item);
                    }
                }
                ganttChartView.isTimingInformationInitialized = true;
            },
            updateParentTimingInformation = function (parent, isFinal) {
                if (parent.children.length <= 0 || (typeof parent.isSummaryEnabled !== undefinedType && !parent.isSummaryEnabled))
                    return;
                if (typeof isFinal === undefinedType)
                    isFinal = true;
                var originalStart = parent.start, originalFinish = parent.finish, originalCompletedFinish = parent.completedFinish;
                delete parent.start;
                delete parent.finish;
                delete parent.completedFinish;
                for (var c = 0; c <= 1; c++) {
                    for (var i = 0; i < parent.children.length; i++) {
                        var item = parent.children[i];
                        if (typeof item.isParentSummarizationEnabled !== undefinedType && !item.isParentSummarizationEnabled && c < 1)
                            continue;
                        if (typeof parent.start === undefinedType || parent.start > item.start)
                            parent.start = item.start;
                        if (typeof parent.finish === undefinedType || parent.finish < item.finish)
                            parent.finish = item.finish;
                    }
                    if (typeof parent.start !== undefinedType && typeof parent.finish !== undefinedType)
                        break;
                }
                parent.completedFinish = parent.start;
                if (typeof originalStart === undefinedType || parent.start.valueOf() != originalStart.valueOf())
                    onItemPropertyChanged(parent, "start", false, isFinal);
                if (typeof originalFinish === undefinedType || parent.finish.valueOf() != originalFinish.valueOf())
                    onItemPropertyChanged(parent, "finish", false, isFinal);
                if (typeof originalCompletedFinish === undefinedType || parent.completedFinish.valueOf() != originalCompletedFinish.valueOf())
                    onItemPropertyChanged(parent, "completedFinish", false, isFinal);
            },
            getRootItems = function (items) {
                var rootItems = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent == null)
                        rootItems.push(item);
                }
                return rootItems;
            },
            getLeafItems = function (items) {
                var leafItems = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent != null)
                        leafItems.push(item);
                }
                return leafItems;
            },
            getSummaryItems = function (items) {
                var summaryItems = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.hasChildren)
                        summaryItems.push(item);
                }
                return summaryItems;
            },
            areTasksOnSameBranch = function (item1, item2) {
                return (item1 == item2 || isAncestorTask(item1, item2) || isAncestorTask(item2, item1))
            },
            isAncestorTask = function (item1, item2) {
                var parent1 = item1.parent;
                if (parent1 == null)
                    return false;
                if ((typeof parent1.isSummaryEnabled === undefinedType || parent1.isSummaryEnabled) && parent1 == item2)
                    return true;
                return isAncestorTask(parent1, item2);
            },
            areDependencies = function (item1, item2) {
                return isDependent(item1, item2) || isDependent(item2, item1);
            },
            isDependent = function (item1, item2) {
                if (typeof item1.predecessors === undefinedType)
                    return false;
                for (var i = 0; i < item1.predecessors.length; i++) {
                    if (item1.predecessors[i].item == item2)
                        return true;
                }
                return false;
            },

        // Scales.
            getCurrentDateTime = function () {
                return new Date();
            },
            getDate = function (dateTime) {
                return new Date(Math.floor(dateTime.valueOf() / dayDuration) * dayDuration);
            },
            getTimeOfDay = function (dateTime) {
                return dateTime.valueOf() - getDate(dateTime).valueOf();
            },
            getDayOfWeek = function (dateTime) {
                var r = Math.floor((dateTime.valueOf() - initialSundayDateTimeValue) / dayDuration) % 7;
                if (r < 0)
                    r += 7;
                return r;
            },
            getPreviousWeekStart = function (dateTime, weekStartDay) {
                var date = getDate(dateTime);
                return new Date(Math.floor((dateTime.valueOf() - initialSundayDateTimeValue) / weekDuration) * weekDuration + initialSundayDateTimeValue + weekStartDay * dayDuration);
            },
            getDefaultTimelineStart = function (currentDateTime, weekStartDay) {
                return new Date(getPreviousWeekStart(currentDateTime, weekStartDay).valueOf() - 1 * weekDuration);
            },
            getDefaultTimelineFinish = function (currentDateTime, weekStartDay) {
                return new Date(getPreviousWeekStart(currentDateTime, weekStartDay).valueOf() + (52 + 1) * weekDuration);
            },
            getTimelineStart = function (currentDateTime, weekStartDay) {
                return getPreviousWeekStart(currentDateTime, weekStartDay);
            },
            getTimelineFinish = function (currentDateTime, weekStartDay) {
                var dateTime = getPreviousWeekStart(currentDateTime, weekStartDay);
                if (Math.abs(dateTime.valueOf() - currentDateTime.valueOf()) <= hourDuration)
                    return dateTime;
                return new Date(dateTime.valueOf() + weekDuration);
            },
            getDayWidth = function (settings) {
                return settings.hourWidth * (settings.visibleDayFinish - settings.visibleDayStart) / hourDuration;
            },
            getWeekWidth = function (settings) {
                return getDayWidth(settings) * (settings.visibleWeekFinish - settings.visibleWeekStart + 1);
            },
            getChartPosition = function (dateTime, settings) {
                var dayWidth = getDayWidth(settings);
                var weekWidth = getWeekWidth(settings);
                var weekStart = getPreviousWeekStart(dateTime, settings.weekStartDay);
                var weekStartPosition = Math.floor((weekStart - settings.timelineStart) / weekDuration) * weekWidth - Math.max(0, settings.weekStartDay - settings.visibleWeekStart) * dayWidth;
                var dayOfWeek = getDayOfWeek(dateTime);
                var dayStartPosition = weekStartPosition;
                if (dayOfWeek <= settings.visibleWeekStart)
                    dayStartPosition += 0;
                else if (dayOfWeek > settings.visibleWeekFinish)
                    dayStartPosition += (settings.visibleWeekFinish - settings.visibleWeekStart + 1) * dayWidth;
                else
                    dayStartPosition += (dayOfWeek - settings.visibleWeekStart) * dayWidth;
                var timeOfDay = getTimeOfDay(dateTime);
                var position = dayStartPosition;
                if (dayOfWeek >= settings.visibleWeekStart && dayOfWeek <= settings.visibleWeekFinish) {
                    if (timeOfDay <= settings.visibleDayStart)
                        position += 0;
                    else if (timeOfDay >= settings.visibleDayFinish)
                        position += (settings.visibleDayFinish - settings.visibleDayStart) / hourDuration * settings.hourWidth;
                    else
                        position += (timeOfDay - settings.visibleDayStart) / hourDuration * settings.hourWidth;
                }
                return position;
            },
            getChartWidth = function (settings) {
                return getChartPosition(settings.timelineFinish, settings);
            },
            getDateTime = function (chartPosition, settings) {
                var dateTime = settings.timelineStart.valueOf();
                var dayWidth = getDayWidth(settings);
                var weekWidth = getWeekWidth(settings);
                while (chartPosition > weekWidth) {
                    dateTime += weekDuration;
                    chartPosition -= weekWidth;
                }
                dateTime += Math.max(0, settings.visibleWeekStart - settings.weekStartDay) * dayDuration;
                while (chartPosition > dayWidth) {
                    dateTime += dayDuration;
                    chartPosition -= dayWidth;
                }
                dateTime += settings.visibleDayStart;
                dateTime += chartPosition / settings.hourWidth * hourDuration;
                return new Date(dateTime);
            },
            getDefaultScales = function (settings) {
                switch (settings.theme) {
                    case "Modern": default:
                        return [{ scaleType: "NonworkingTime", isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: "stroke-width: 0; fill: #f4f4f4; fill-opacity: 0.65" },
                        { scaleType: "Weeks", headerTextFormat: "Date", headerStyle: "padding: 2.25px" },
                        { scaleType: "Days", headerTextFormat: "DayOfWeekAbbreviation", headerStyle: "padding: 2.25px" },
                        { scaleType: "CurrentTime", isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: "stroke: #8bbf8a; stroke-width: 0.5px"}];
                    case "ModernBordered":
                        return [{ scaleType: "NonworkingTime", isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: "stroke-width: 0; fill: #f4f4f4; fill-opacity: 0.65" },
                        { scaleType: "Weeks", headerTextFormat: "Date", headerStyle: "padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White", isSeparatorVisible: true, separatorStyle: "stroke: #c8bfe7; stroke-width: 0.5px" },
                        { scaleType: "Days", headerTextFormat: "DayOfWeekAbbreviation", headerStyle: "padding: 2.25px; border-right: solid 1px White" },
                        { scaleType: "CurrentTime", isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: "stroke: #8bbf8a; stroke-width: 1px"}];
                    case "Aero":
                        return [{ scaleType: "NonworkingTime", isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: "stroke-width: 0; fill: #f4f4f4; fill-opacity: 0.65" },
                        { scaleType: "Weeks", headerTextFormat: "Date", headerStyle: "padding: 2.25px; border-right: solid 1px #c8bfe7; border-bottom: solid 1px #c8bfe7", isSeparatorVisible: true, separatorStyle: "stroke: #c8bfe7; stroke-width: 0.5px" },
                        { scaleType: "Days", headerTextFormat: "DayOfWeekAbbreviation", headerStyle: "padding: 2.25px; border-right: solid 1px #c8bfe7" },
                        { scaleType: "CurrentTime", isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: "stroke: Black; stroke-width: 1px"}];
                }
            },
            applyUpdateScale = function (dateTime, settings) {
                return new Date(Math.floor((dateTime - initialSundayDateTimeValue).valueOf() / settings.updateScale) * settings.updateScale + initialSundayDateTimeValue);
            },
            refreshCurrentTimeLine = function (chartHeader, chartContent, items, settings) {
                var chartArea = chartContent.chartArea;
                var i;
                var remainingChartAreaElements = [];
                for (i = chartArea.childNodes.length; i-- > 1; ) {
                    var chartAreaElement = chartArea.childNodes[i];
                    if (chartAreaElement.tag != "Scale-Highlighting-CurrentTime" && chartAreaElement.tag != "Scale-Separator-CurrentTime")
                        remainingChartAreaElements.push(chartAreaElement);
                    chartArea.removeChild(chartAreaElement);
                }
                loadScales(chartHeader, chartArea, settings.scales, settings, true);
                for (i = remainingChartAreaElements.length; i-- > 0; )
                    chartArea.appendChild(remainingChartAreaElements[i]);
                updateChartHeight(chartContent, items, settings);
            },
            loadScales = function (chartHeader, chartArea, scales, settings, currentTimeOnly) {
                if (typeof currentTimeOnly === undefinedType)
                    currentTimeOnly = false;
                var document = chartHeader.ownerDocument;
                var headersCount = 0, i, scale;
                for (i = 0; i < scales.length; i++) {
                    scale = scales[i];
                    if (typeof scale.isHeaderVisible === undefinedType || scale.isHeaderVisible)
                        headersCount++;
                }
                var defaultHeaderHeight = settings.headerHeight;
                if (headersCount > 0)
                    defaultHeaderHeight = settings.headerHeight / headersCount;
                for (i = 0; i < scales.length; i++) {
                    scale = scales[i];
                    if (currentTimeOnly && scale.scaleType != "CurrentTime" && scale.scaleType != "FutureTime")
                        continue;
                    var intervals = getScaleIntervals(scale, settings);
                    if (typeof intervals === undefinedType)
                        continue;
                    if (intervals.length == 0)
                        intervals.push({ start: settings.timelineStart, finish: settings.timelineFinish });
                    var scaleHeaderHeight = defaultHeaderHeight;
                    if (typeof scale.headerHeight !== undefinedType)
                        scaleHeaderHeight = scale.headerHeight;
                    var previousFinish = settings.timelineStart;
                    for (var j = 0; j < intervals.length; j++) {
                        var interval = intervals[j];
                        var start = interval.start;
                        var finish = interval.finish;
                        if (scale.scaleType != "CurrentTime" && scale.scaleType != "FutureTime" && scale.scaleType != "NonworkingTime") {
                            if (start > previousFinish && (typeof scale.isHeaderVisible === undefinedType || scale.isHeaderVisible))
                                start = previousFinish;
                            if (start < previousFinish)
                                start = previousFinish;
                            if (start < settings.timelineStart)
                                start = settings.timelineStart;
                            if (finish > settings.timelineFinish)
                                finish = settings.timelineFinish;
                            if (finish < start)
                                finish = start;
                            if (j == intervals.length - 1 && finish < settings.timelineFinish && (typeof scale.isHeaderVisible === undefinedType || scale.isHeaderVisible))
                                finish = settings.timelineFinish;
                            previousFinish = finish;
                        }
                        var startPosition = getChartPosition(start, settings);
                        var finishPosition = getChartPosition(finish, settings);
                        var width = finishPosition - startPosition;
                        if (width <= 0)
                            continue;
                        if (typeof scale.isHeaderVisible === undefinedType || scale.isHeaderVisible) {
                            var headerText = getScaleHeaderText(scale, interval, settings);
                            var header = document.createElement("div");
                            header.setAttribute("style", "float: left; overflow: hidden; width: " + width + "px; height: " + scaleHeaderHeight + "px");
                            var headerContent = document.createElement("div");
                            headerContent.setAttribute("class", scale.headerClass);
                            headerContent.setAttribute("style", scale.headerStyle);
                            headerContent.appendChild(getTextNode(document, headerText));
                            header.appendChild(headerContent);
                            chartHeader.appendChild(header);
                        }
                        interval.start = start;
                        interval.finish = finish;
                        var isHighlightingVisible = false;
                        if (typeof scale.isHighlightingVisible !== undefinedType)
                            isHighlightingVisible = scale.isHighlightingVisible;
                        if (isHighlightingVisible) {
                            var highlightingRectangle = document.createElementNS(svgns, "rect");
                            highlightingRectangle.setAttribute("x", startPosition - 1);
                            highlightingRectangle.setAttribute("y", 0);
                            highlightingRectangle.setAttribute("width", width);
                            highlightingRectangle.setAttribute("height", 0);
                            highlightingRectangle.setAttribute("class", scale.highlightingClass);
                            highlightingRectangle.setAttribute("style", scale.highlightingStyle);
                            highlightingRectangle.tag = "Scale-Highlighting" + (scale.scaleType != "CurrentTime" && scale.scaleType != "FutureTime" ? "" : "-CurrentTime");
                            chartArea.appendChild(highlightingRectangle);
                        }
                        var isSeparatorVisible = false;
                        if (typeof scale.isSeparatorVisible !== undefinedType)
                            isSeparatorVisible = scale.isSeparatorVisible;
                        if (isSeparatorVisible) {
                            var separatorLine = document.createElementNS(svgns, "line");
                            separatorLine.setAttribute("x1", finishPosition - 0.75);
                            separatorLine.setAttribute("y1", 0);
                            separatorLine.setAttribute("x2", finishPosition - 0.75);
                            separatorLine.setAttribute("y2", 0);
                            separatorLine.setAttribute("class", scale.separatorClass);
                            separatorLine.setAttribute("style", scale.separatorStyle);
                            separatorLine.tag = "Scale-Separator" + (scale.scaleType != "CurrentTime" && scale.scaleType != "FutureTime" ? "" : "-CurrentTime");
                            chartArea.appendChild(separatorLine);
                        }
                    }
                }
            },
            getScaleIntervals = function (scale, settings) {
                var scaleType = "Custom", intervals, d, nd;
                if (typeof scale.scaleType !== undefinedType)
                    scaleType = scale.scaleType;
                switch (scaleType) {
                    case "CurrentTime":
                        return [{ start: settings.timelineStart, finish: settings.currentTime}];
                    case "FutureTime":
                        return [{ start: settings.currentTime, finish: settings.timelineFinish}];
                    case "Years":
                        intervals = [];
                        for (d = getYearStart(settings.timelineStart); nd = addYear(d), d < settings.timelineFinish; d = nd)
                            intervals.push({ start: d, finish: nd });
                        return intervals;
                    case "Months":
                        intervals = [];
                        for (d = getMonthStart(settings.timelineStart); nd = addMonth(d), d < settings.timelineFinish; d = nd)
                            intervals.push({ start: d, finish: nd });
                        return intervals;
                    case "Weeks":
                        intervals = [];
                        for (d = getWeekStart(settings.timelineStart, settings.weekStartDay, settings.visibleWeekStart); nd = addWeek(d), d < settings.timelineFinish; d = nd)
                            intervals.push({ start: d, finish: nd });
                        return intervals;
                    case "Days":
                        intervals = [];
                        for (d = settings.timelineStart; nd = addDay(d), d < settings.timelineFinish; d = nd)
                            intervals.push({ start: d, finish: nd });
                        return intervals;
                    case "Hours":
                        intervals = [];
                        for (d = getVisibleDayStart(settings.timelineStart, settings.visibleDayStart); nd = ensureVisibleDayHour(addHour(d), settings.visibleDayFinish, settings.visibleDayStart), d < settings.timelineFinish; d = nd)
                            intervals.push({ start: d, finish: nd });
                        return intervals;
                    case "NonworkingTime":
                        intervals = [];
                        for (d = getNonworkingStart(settings.timelineStart, settings.workingWeekFinish), nd = getNonworkingFinish(d, settings.workingWeekStart); d < settings.timelineFinish; d = addWeek(d), nd = addWeek(nd))
                            intervals.push({ start: d, finish: nd });
                        if (typeof settings.specialNonworkingDays !== undefinedType) {
                            if (typeof settings.specialNonworkingDays === 'function') {
                                for (d = getNonworkingStart(settings.timelineStart, settings.workingWeekFinish), nd = addDay(d); d < settings.timelineFinish; d = addDay(d), nd = addDay(nd)) {
                                    if (settings.specialNonworkingDays(d))
                                        intervals.push({ start: d, finish: nd });
                                }
                            } else {
                                for (var i = 0; i < settings.specialNonworkingDays.length; i++) {
                                    d = settings.specialNonworkingDays[i];
                                    nd = addDay(d);
                                    intervals.push({ start: d, finish: nd })
                                }
                            }
                        }
                        return intervals;
                    case "Custom": default:
                        return scale.intervals;
                }
            },
            getItemNonworkingTimeIntervals = function (item, settings) {
                var schedule = getItemSchedule(item);
                if (typeof schedule === undefinedType)
                    return null;
                var intervals = [], d, nd;
                for (d = getNonworkingStart(settings.timelineStart, typeof schedule.workingWeekFinish !== undefinedType ? schedule.workingWeekFinish : settings.workingWeekFinish), nd = getNonworkingFinish(d, typeof schedule.workingWeekStart !== undefinedType ? schedule.workingWeekStart : settings.workingWeekStart); d < settings.timelineFinish; d = addWeek(d), nd = addWeek(nd))
                    intervals.push({ start: d, finish: nd });
                if (typeof schedule.specialNonworkingDays !== undefinedType) {
                    if (typeof schedule.specialNonworkingDays === 'function') {
                        for (d = getNonworkingStart(settings.timelineStart, settings.workingWeekFinish), nd = addDay(d); d < settings.timelineFinish; d = addDay(d), nd = addDay(nd)) {
                            if (schedule.specialNonworkingDays(d))
                                intervals.push({ start: d, finish: nd });
                        }
                    } else {
                        for (var i = 0; i < schedule.specialNonworkingDays.length; i++) {
                            d = schedule.specialNonworkingDays[i];
                            nd = addDay(d);
                            intervals.push({ start: d, finish: nd })
                        }
                    }
                }
                return intervals;
            },
            getItemInterruptionIntervals = function (item, settings) {
                if ((item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) || item.isMilestone)
                    return null;
                var schedule = getItemSchedule(item);
                var intervals = [], d, nd;
                for (d = getNonworkingStart(getDate(item.start), typeof schedule !== undefinedType && typeof schedule.workingWeekFinish !== undefinedType ? schedule.workingWeekFinish : settings.workingWeekFinish), nd = getNonworkingFinish(d, typeof schedule !== undefinedType && typeof schedule.workingWeekStart !== undefinedType ? schedule.workingWeekStart : settings.workingWeekStart); d < item.finish; d = addWeek(d), nd = addWeek(nd))
                    intervals.push({ start: d >= item.start ? d : item.start, finish: nd <= item.finish ? nd : item.finish });
                var specialNonworkingDays = typeof schedule !== undefinedType && typeof schedule.specialNonworkingDays !== undefinedType ? schedule.specialNonworkingDays : settings.specialNonworkingDays;
                if (typeof specialNonworkingDays !== undefinedType) {
                    if (typeof specialNonworkingDays === 'function') {
                        for (d = getNonworkingStart(getDate(item.start), typeof schedule !== undefinedType && typeof schedule.workingWeekFinish !== undefinedType ? schedule.workingWeekFinish : settings.workingWeekFinish), nd = addDay(d); d < getDate(item.finish); d = addDay(d), nd = addDay(nd)) {
                            if (schedule.specialNonworkingDays(d))
                                intervals.push({ start: d, finish: nd });
                        }
                    } else {
                        for (var i = 0; i < specialNonworkingDays.length; i++) {
                            d = specialNonworkingDays[i];
                            nd = addDay(d);
                            if (d >= item.start && nd <= item.finish)
                                intervals.push({ start: d, finish: nd })
                        }
                    }
                }
                return intervals;
            },
            addHour = function (date) {
                return new Date(date.valueOf() + hourDuration);
            },
            getVisibleDayStart = function (date, visibleDayStart) {
                return new Date(getDate(date).valueOf() + visibleDayStart);
            },
            ensureVisibleDayHour = function (date, visibleDayFinish, visibleDayStart) {
                if (getTimeOfDay(date) > visibleDayFinish)
                    return getVisibleDayStart(addDay(date), visibleDayStart);
                return new Date(date.valueOf());
            },
            addDay = function (date) {
                return new Date(date.valueOf() + dayDuration);
            },
            subtractDay = function (date) {
                return new Date(date.valueOf() - dayDuration);
            },
            getWeekStart = function (date, weekStartDay, visibleWeekStart) {
                while (getDayOfWeek(date) != weekStartDay)
                    date = subtractDay(date);
                while (getDayOfWeek(date) < visibleWeekStart)
                    date = addDay(date);
                return new Date(date.valueOf());
            },
            addWeek = function (date) {
                return new Date(date.valueOf() + weekDuration);
            },
            getMonthStart = function (date) {
                var d = new Date(date.valueOf());
                var tzo0 = d.getTimezoneOffset();
                d.setDate(1);
                var tzo = d.getTimezoneOffset();
                return new Date(d.valueOf() - (tzo - tzo0) * minuteDuration - (tzo > 0 ? dayDuration : 0));
            },
            addMonth = function (date) {
                var tzo0 = date.getTimezoneOffset();
                var d = new Date(date.valueOf() + (tzo0 > 0 ? dayDuration : 0));
                var month = d.getMonth() + 1;
                if (month >= 12) {
                    month = 0;
                    d.setFullYear(d.getFullYear() + 1);
                }
                d.setMonth(month, 1);
                var tzo = d.getTimezoneOffset();
                return new Date(d.valueOf() - (tzo - tzo0) * minuteDuration - (tzo > 0 ? dayDuration : 0));
            },
            getYearStart = function (date) {
                var d = new Date(date.valueOf());
                var tzo0 = d.getTimezoneOffset();
                d.setMonth(0, 1);
                var tzo = d.getTimezoneOffset();
                return new Date(d.valueOf() - (tzo - tzo0) * minuteDuration - (tzo > 0 ? dayDuration : 0));
            },
            addYear = function (date) {
                var tzo0 = date.getTimezoneOffset();
                var d = new Date(date.valueOf() + (tzo0 > 0 ? dayDuration : 0));
                d.setFullYear(d.getFullYear() + 1);
                d.setMonth(0, 1);
                var tzo = d.getTimezoneOffset();
                return new Date(d.valueOf() - (tzo - tzo0) * minuteDuration - (tzo > 0 ? dayDuration : 0));
            },
            isSpecialNonworkingDay = function (date, specialNonworkingDays) {
                if (typeof specialNonworkingDays === undefinedType)
                    return false;
                if (typeof specialNonworkingDays === 'function') {
                    return specialNonworkingDays(date);
                } else {
                    var dateValue = date.valueOf();
                    for (var i = 0; i < specialNonworkingDays.length; i++) {
                        if (specialNonworkingDays[i].valueOf() == dateValue)
                            return true;
                    }
                }
                return false;
            },
            getNonworkingStart = function (date, workingWeekFinish) {
                while (getDayOfWeek(date) != workingWeekFinish)
                    date = subtractDay(date);
                return addDay(date);
            },
            getNonworkingFinish = function (date, workingWeekStart) {
                while (getDayOfWeek(date) != workingWeekStart)
                    date = addDay(date);
                return new Date(date.valueOf());
            },
            getScaleHeaderText = function (scale, interval, settings) {
                var headerTextFormat = "Date";
                if (typeof scale.headerTextFormat !== undefinedType)
                    headerTextFormat = scale.headerTextFormat;
                var date = interval.start;
                if (date < settings.timelineStart)
                    date = settings.timelineStart;
                if (typeof headerTextFormat === "function")
                    return headerTextFormat(date);
                switch (headerTextFormat) {
                    case "Localized":
                        return date.toLocaleString();
                    case "DateTime":
                        return settings.dateTimeFormatter(getFormattableDate(date));
                    case "Date":
                        return settings.dateFormatter(getFormattableDate(date));
                    case "Hour":
                        date = new Date(date.valueOf() + date.getTimezoneOffset() * minuteDuration);
                        return (date.getHours() < 10 ? "0" : "") + date.getHours();
                    case "DayOfWeek":
                        return settings.daysOfWeek[getDayOfWeek(date)];
                    case "DayOfWeekAbbreviation":
                        var dayOfWeekName = settings.daysOfWeek[getDayOfWeek(date)];
                        return dayOfWeekName.length > 0 ? dayOfWeekName[0].toUpperCase() : "";
                    case "Day":
                        date = new Date(date.valueOf() + date.getTimezoneOffset() * minuteDuration);
                        return (date.getDate() < 10 ? "0" : "") + date.getDate();
                    case "Month":
                        return settings.months[new Date(date.valueOf() + (date.getTimezoneOffset() + 12 * 60) * minuteDuration).getMonth()];
                    case "MonthAbbreviation":
                        var monthName = settings.months[new Date(date.valueOf() + (date.getTimezoneOffset() + 12 * 60) * minuteDuration).getMonth()];
                        if (monthName.length <= 0)
                            return "";
                        return monthName[0].toUpperCase() + (monthName.length > 1 ? monthName.substr(1, Math.min(3, monthName.length) - 1) : "");
                    case "Year":
                        return new Date(date.valueOf() + (date.getTimezoneOffset() + 12 * 60) * minuteDuration).getFullYear();
                    case "MonthYear":
                        return settings.months[new Date(date.valueOf() + (date.getTimezoneOffset() + 12 * 60) * minuteDuration).getMonth()] + " " + new Date(date.valueOf() + (date.getTimezoneOffset() + 12 * 60) * minuteDuration).getFullYear();
                    case "Custom": default:
                        return typeof interval.headerText !== undefinedType ? interval.headerText : date.toString();
                }
            },

        // Items.
            loadItems = function (gridContent, chartContent, chartArea, items, columns, toggleButtonAreaWidth, settings, ganttChartView) {
                var itemTop = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (settings.isGridVisible) {
                        if (typeof item.displayRowIndex === undefinedType)
                            gridContent.appendChild(getGridItem(item, items, columns, chartContent, toggleButtonAreaWidth, settings, ganttChartView));
                    }
                    var actualItemTop = itemTop;
                    if (typeof item.displayRowIndex !== undefinedType)
                        actualItemTop = item.displayRowIndex * settings.itemHeight;
                    chartArea.appendChild(getChartItem(item, actualItemTop, settings));
                    if (item.isVisible && !(typeof item.isHidden !== undefinedType && item.isHidden))
                        itemTop = Math.max(itemTop, actualItemTop + settings.itemHeight);
                    item.itemTop = actualItemTop;
                }
                setChartHeight(chartContent, itemTop);
                setTimeout(function () { updateAlternativeStyles(items, chartContent, settings); }, 0);
            },
            getItemsHeight = function (items, settings) {
                var height = 0;
                var index = 0, lastIndex = -1;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if ((typeof item.scheduleChartItem === undefinedType || item.scheduleChartItem == item) && item.isVisible && !(typeof item.isHidden !== undefinedType && item.isHidden)) {
                        if (typeof item.displayRowIndex === undefinedType && index > lastIndex) {
                            height += settings.itemHeight;
                            lastIndex = index++;
                        }
                        else {
                            height = Math.max(height, item.itemTop + settings.itemHeight);
                            lastIndex = item.displayRowIndex;
                        }
                    }
                }
                return height;
            },
            getItemTop = function (item, items, settings) {
                if (item.isPart)
                    return getItemTop(item.ganttChartItem, items, settings);
                var itemTop;
                if (typeof item.displayRowIndex !== undefinedType) {
                    itemTop = item.displayRowIndex * settings.itemHeight;
                    item.itemTop = itemTop;
                    return itemTop;
                }
                itemTop = 0;
                for (var i = 0; i < items.length; i++) {
                    var it = items[i];
                    if (it == item)
                        break;
                    if (it.isVisible && !(typeof it.isHidden !== undefinedType && it.isHidden) && typeof it.displayRowIndex === undefinedType)
                        itemTop += settings.itemHeight;
                }
                item.itemTop = itemTop;
                return itemTop;
            },
            updateAlternativeStyles = function (items, chartContent, settings) {
                if (typeof settings.alternativeItemClass === undefinedType && typeof settings.alternativeItemStyle === undefinedType &&
                    typeof settings.alternativeChartItemClass === undefinedType && typeof settings.alternativeChartItemStyle === undefinedType)
                    return;
                var chartAreaAlternativeRows = chartContent.chartAreaAlternativeRows;
                while (chartAreaAlternativeRows.childNodes.length > 0)
                    chartAreaAlternativeRows.removeChild(chartAreaAlternativeRows.childNodes[0]);
                var i, j = 0, k = 0, wasAnyItemVirtuallyVisible = false;
                chartAreaAlternativeRows.count = j;
                for (i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (!item.isVisible || typeof item.alternativeContentContainer === undefinedType)
                        continue;
                    var alternativeContentContainer = item.alternativeContentContainer;
                    if (j % 2 == 1) {
                        if (typeof settings.alternativeItemClass !== undefinedType)
                            alternativeContentContainer.setAttribute("class", settings.alternativeItemClass);
                        if (typeof settings.alternativeItemStyle !== undefinedType)
                            alternativeContentContainer.setAttribute("style", settings.alternativeItemStyle);
                        if (typeof settings.alternativeChartItemClass !== undefinedType || typeof settings.alternativeChartItemStyle !== undefinedType) {
                            if (!settings.isVirtualizing || item.isVirtuallyVisible || !wasAnyItemVirtuallyVisible) {
                                wasAnyItemVirtuallyVisible = true;
                                if (typeof chartAreaAlternativeRows.count === undefinedType || j > chartAreaAlternativeRows.count) {
                                    var chartAreaAlternativeRow = document.createElementNS(svgns, "rect");
                                    chartAreaAlternativeRow.setAttribute("x", 0);
                                    chartAreaAlternativeRow.setAttribute("y", j * settings.itemHeight);
                                    chartAreaAlternativeRow.setAttribute("width", chartContent.clientWidth);
                                    chartAreaAlternativeRow.setAttribute("height", settings.itemHeight);
                                    if (typeof settings.alternativeChartItemClass !== undefinedType)
                                        chartAreaAlternativeRow.setAttribute("class", settings.alternativeChartItemClass);
                                    if (typeof settings.alternativeChartItemStyle !== undefinedType)
                                        chartAreaAlternativeRow.setAttribute("style", settings.alternativeChartItemStyle);
                                    chartAreaAlternativeRow.index = j;
                                    chartAreaAlternativeRows.appendChild(chartAreaAlternativeRow);
                                }
                            }
                        }
                        chartAreaAlternativeRows.count = j;
                    }
                    else {
                        alternativeContentContainer.setAttribute("class", "");
                        alternativeContentContainer.setAttribute("style", "");
                    }
                    j++;
                }
                for (i = chartAreaAlternativeRows.childNodes.length; i-- > 0; ) {
                    var row = chartAreaAlternativeRows.childNodes[i];
                    if (row.index > chartAreaAlternativeRows.count)
                        chartAreaAlternativeRows.removeChild(row);
                }
            },
            updateChartHeight = function (chartContent, items, settings) {
                var document = chartContent.ownerDocument;
                setChartHeight(chartContent, getItemsHeight(items, settings));
            },
            getGridItem = function (item, items, columns, chartContent, toggleButtonAreaWidth, settings, ganttChartView) {
                var document = item.ganttChartView.ownerDocument;
                var gridItemContainer = document.createElement("div");
                if (typeof settings.itemClass !== undefinedType)
                    gridItemContainer.setAttribute("class", settings.itemClass);
                if (typeof settings.itemStyle !== undefinedType)
                    gridItemContainer.setAttribute("style", settings.itemStyle);
                gridItemContainer.style.display = item.isVisible ? "block" : "none";
                var gridItemAlternativeContentContainer = document.createElement("div");
                item.alternativeContentContainer = gridItemAlternativeContentContainer;
                var gridItemSelectionContainer = document.createElement("div");
                try {
                    gridItemSelectionContainer.addEventListener("mousedown", event(ganttChartView, gridItemSelectionContainer, "mousedown", function (e) { if (e.target != item.selectionInput) setCurrentItem(item, settings); }));
                    gridItemSelectionContainer.addEventListener("mouseup", event(ganttChartView, gridItemSelectionContainer, "mouseup", function (e) { if (e.target != item.selectionInput) setCurrentItem(item, settings); }));
                }
                catch (exc) { }
                if (item.isSelected) {
                    if (typeof settings.selectedItemClass !== undefinedType)
                        gridItemSelectionContainer.setAttribute("class", settings.selectedItemClass);
                    if (typeof settings.selectedItemStyle !== undefinedType)
                        gridItemSelectionContainer.setAttribute("style", settings.selectedItemStyle);
                }
                var gridItemContentContainer = document.createElement("div");
                if (typeof item["class"] !== undefinedType)
                    gridItemContentContainer.setAttribute("class", item["class"]);
                if (typeof item.style !== undefinedType)
                    gridItemContentContainer.setAttribute("style", item.style);
                var gridItemContent = document.createElement("div");
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    if (typeof settings.summaryItemClass !== undefinedType)
                        gridItemContent.setAttribute("class", settings.summaryItemClass);
                    if (typeof settings.summaryItemStyle !== undefinedType)
                        gridItemContent.setAttribute("style", settings.summaryItemStyle);
                }
                else if (item.isMilestone) {
                    if (typeof settings.milestoneItemClass !== undefinedType)
                        gridItemContent.setAttribute("class", settings.milestoneItemClass);
                    if (typeof settings.milestoneItemStyle !== undefinedType)
                        gridItemContent.setAttribute("style", settings.milestoneItemStyle);
                }
                else {
                    if (typeof settings.standardItemClass !== undefinedType)
                        gridItemContent.setAttribute("class", settings.standardItemClass);
                    if (typeof settings.standardItemStyle !== undefinedType)
                        gridItemContent.setAttribute("style", settings.standardItemStyle);
                }
                var gridItem = document.createElement("div");
                item.gridItem = gridItem;
                item.gridItemContent = gridItemContent;
                item.gridItemSelectionContainer = gridItemSelectionContainer;
                var height = settings.itemHeight;
                if (!item.isVisible || (typeof item.isHidden !== undefinedType && item.isHidden))
                    height = 0;
                gridItem.setAttribute("style", "overflow: hidden; height: " + height + "px");
                setGridItemContent(gridItem, item, items, columns, chartContent, toggleButtonAreaWidth, settings);
                gridItemContent.appendChild(gridItem);
                gridItemContentContainer.appendChild(gridItemContent);
                gridItemSelectionContainer.appendChild(gridItemContentContainer);
                gridItemAlternativeContentContainer.appendChild(gridItemSelectionContainer);
                gridItemContainer.appendChild(gridItemAlternativeContentContainer);
                item.gridItemContainer = gridItemContainer;
                if (typeof settings.isGridRowClickTimeScrollingEnabled === undefinedType || settings.isGridRowClickTimeScrollingEnabled) {
                    gridItemContainer.addEventListener("mouseup", event(ganttChartView, gridItemContainer, "mouseup", function (e) {
                        var dateTime;
                        if (typeof item.ganttChartItems === undefinedType) {
                            dateTime = item.start;
                        }
                        else {
                            var minStart = null;
                            for (var i = 0; i < item.ganttChartItems.length; i++) {
                                if (minStart == null || item.ganttChartItems[i].start < minStart)
                                    minStart = item.ganttChartItems[i].start;
                            }
                            if (minStart == null)
                                dateTime = item.start;
                            else
                                dateTime = minStart;
                        }
                        var position = getChartPosition(dateTime, settings);
                        var backPosition = position - settings.hourWidth * 8;
                        if (position - backPosition >= chartContent.container.clientWidth / 2.5)
                            backPosition = position;
                        chartContent.container.scrollLeft = Math.max(0, backPosition);
                    }, true), true);
                }
                return gridItemContainer;
            },
            setGridItemContent = function (gridItem, item, items, columns, chartContent, toggleButtonAreaWidth, settings) {
                var document = item.ganttChartView.ownerDocument;
                if (settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                    return;
                var setGridItemContentInternal = function () {
                    if (typeof item.gridItemSelectionContainer !== undefinedType) {
                        var gridItemSelectionContainer = item.gridItemSelectionContainer;
                        if (typeof settings.selectedItemClass !== undefinedType)
                            gridItemSelectionContainer.setAttribute("class", item.isSelected ? settings.selectedItemClass : null);
                        if (typeof settings.selectedItemStyle !== undefinedType)
                            gridItemSelectionContainer.setAttribute("style", item.isSelected ? settings.selectedItemStyle : null);
                    }
                    if (typeof item.gridItemContent !== undefinedType) {
                        var gridItemContent = item.gridItemContent;
                        gridItemContent.setAttribute("class", "");
                        gridItemContent.setAttribute("style", "");
                        if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                            if (typeof settings.summaryItemClass !== undefinedType)
                                gridItemContent.setAttribute("class", settings.summaryItemClass);
                            if (typeof settings.summaryItemStyle !== undefinedType)
                                gridItemContent.setAttribute("style", settings.summaryItemStyle);
                        }
                        else if (item.isMilestone) {
                            if (typeof settings.milestoneItemClass !== undefinedType)
                                gridItemContent.setAttribute("class", settings.milestoneItemClass);
                            if (typeof settings.milestoneItemStyle !== undefinedType)
                                gridItemContent.setAttribute("style", settings.milestoneItemStyle);
                        }
                        else {
                            if (typeof settings.standardItemClass !== undefinedType)
                                gridItemContent.setAttribute("class", settings.standardItemClass);
                            if (typeof settings.standardItemStyle !== undefinedType)
                                gridItemContent.setAttribute("style", settings.standardItemStyle);
                        }
                    }
                    var focusElements = [], fe = null;
                    try { fe = document.activeElement; } catch (exc) { }
                    while (fe != null && fe != item.gridItem) {
                        focusElements.push(fe);
                        fe = fe.parentNode;
                    }
                    var i, focusIndex = -1;
                    for (i = gridItem.childNodes.length; i-- > 0; ) {
                        if (focusElements.indexOf(gridItem.childNodes[i]) >= 0) {
                            focusIndex = i;
                            break;
                        }
                    }
                    for (i = gridItem.childNodes.length; i-- > 0; )
                        gridItem.removeChild(gridItem.childNodes[i]);
                    for (i = 0; i < columns.length; i++)
                        gridItem.appendChild(getGridItemCell(item, items, columns[i], chartContent, toggleButtonAreaWidth, settings));
                    if (typeof item.ganttChartView.draggingItem !== undefinedType)
                        return;
                    if (focusIndex >= 0) {
                        setTimeout(function () {
                            try {
                                var elementToFocus = gridItem.childNodes[focusIndex];
                                while (elementToFocus.nodeName != "input" && elementToFocus.nodeName != "textarea" && elementToFocus.nodeName != "label" && elementToFocus.nodeName != "select" && elementToFocus.nodeName != "button" && elementToFocus.childNodes.length > 0) {
                                    elementToFocus = elementToFocus.childNodes[0];
                                }
                                if (elementToFocus && elementToFocus.dontAutoFocus) {
                                    delete elementToFocus.dontAutoFocus;
                                    return;
                                }
                                setTimeout(function () {
                                    try {
                                        elementToFocus.focus();
                                    } catch (exc) { }
                                }, 0);
                            } catch (exc) { }
                        }, 0);
                    }
                };
                if (!item.wasGridItemContentLoaded) {
                    setGridItemContentInternal();
                    item.wasGridItemContentLoaded = true;
                }
                else {
                    setTimeout(setGridItemContentInternal, 0);
                }
            },
            refreshGridItem = function (item) {
                if (typeof item.isWaitingToRefreshGridItem !== undefinedType)
                    return;
                item.isWaitingToRefreshGridItem = true;
                setTimeout(function () {
                    if (typeof item.gridItem !== undefinedType) {
                        setGridItemContent(item.gridItem, item, item.ganttChartView.items, item.ganttChartView.settings.columns, item.ganttChartView.chartContent, item.ganttChartView.settings.toggleButtonAreaWidth, item.ganttChartView.settings);
                    }
                    delete item.isWaitingToRefreshGridItem;
                }, 0);
            },
            setGridItemContentSelection = function (gridItem, item, items, columns, chartContent, toggleButtonAreaWidth, settings) {
                var document = item.ganttChartView.ownerDocument;
                if (settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                    return;
                setTimeout(function () {
                    if (typeof item.gridItemSelectionContainer !== undefinedType) {
                        var gridItemSelectionContainer = item.gridItemSelectionContainer;
                        if (typeof settings.selectedItemClass !== undefinedType)
                            gridItemSelectionContainer.setAttribute("class", item.isSelected ? settings.selectedItemClass : null);
                        if (typeof settings.selectedItemStyle !== undefinedType)
                            gridItemSelectionContainer.setAttribute("style", item.isSelected ? settings.selectedItemStyle : null);
                    }
                    var focusElements = [], fe = null;
                    try { fe = document.activeElement; } catch (exc) { }
                    while (fe != null && fe != item.gridItem) {
                        focusElements.push(fe);
                        fe = fe.parentNode;
                    }
                    var i, focusIndex = -1;
                    for (i = gridItem.childNodes.length; i-- > 0; ) {
                        if (gridItem.childNodes[i].isSelection && focusElements.indexOf(gridItem.childNodes[i]) >= 0) {
                            focusIndex = i;
                            break;
                        }
                    }
                    for (i = gridItem.childNodes.length; i-- > 0; ) {
                        if (gridItem.childNodes[i].isSelection)
                            gridItem.removeChild(gridItem.childNodes[i]);
                    }
                    for (i = 0; i < columns.length; i++) {
                        if (columns[i].isSelection && i < gridItem.childNodes.length)
                            gridItem.insertBefore(getGridItemCell(item, items, columns[i], chartContent, toggleButtonAreaWidth, settings), gridItem.childNodes[i]);
                    }
                    if (typeof item.ganttChartView.draggingItem !== undefinedType)
                        return;
                    if (focusIndex >= 0) {
                        setTimeout(function () {
                            try {
                                var elementToFocus = gridItem.childNodes[focusIndex];
                                while (elementToFocus.nodeName != "input" && elementToFocus.nodeName != "textarea" && elementToFocus.nodeName != "label" && elementToFocus.nodeName != "select" && elementToFocus.nodeName != "button" && elementToFocus.childNodes.length > 0) {
                                    elementToFocus = elementToFocus.childNodes[0];
                                }
                                if (elementToFocus && elementToFocus.dontAutoFocus) {
                                    delete elementToFocus.dontAutoFocus;
                                    return;
                                }
                                setTimeout(function () {
                                    try {
                                        elementToFocus.focus();
                                    } catch (exc) { }
                                }, 0);
                            } catch (exc) { }
                        }, 0);
                    }
                }, 0);
            },
            refreshGridItemSelection = function (item) {
                if (typeof item.gridItem !== undefinedType)
                    setGridItemContentSelection(item.gridItem, item, item.ganttChartView.items, item.ganttChartView.settings.columns, item.ganttChartView.chartContent, item.ganttChartView.settings.toggleButtonAreaWidth, item.ganttChartView.settings);
            },
            getGridItemCell = function (item, items, column, chartContent, toggleButtonAreaWidth, settings) {
                var document = item.ganttChartView.ownerDocument;
                var gridCell = document.createElement("div");
                var indentationWidth = 0;
                if (column.isTreeView == true)
                    indentationWidth = settings.indentationLevelWidth * item.indentation;
                gridCell.setAttribute("style", "overflow: hidden; vertical-align: middle; display: table-cell; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; margin: 0px; padding: 0px; width: " + column.width + "px; height: " + settings.itemHeight + "px; padding-left: " + indentationWidth + "px");
                var gridCellContentContainer = document.createElement("div");
                if (typeof column.cellClass !== undefinedType)
                    gridCellContentContainer.setAttribute("class", column.cellClass);
                else if (typeof settings.cellClass !== undefinedType)
                    gridCellContentContainer.setAttribute("class", settings.cellClass);
                if (typeof column.cellStyle !== undefinedType)
                    gridCellContentContainer.setAttribute("style", column.cellStyle);
                else if (typeof settings.cellStyle !== undefinedType)
                    gridCellContentContainer.setAttribute("style", settings.cellStyle);
                var gridCellContent = document.createElement("div");
                gridCellContent.setAttribute("style", "white-space: nowrap; overflow: hidden; margin: 0px; padding: 0px; width: " + (column.width - indentationWidth - 16) + "px");
                if (column.isTreeView == true) {
                    var toggleButtonArea = document.createElement("div");
                    toggleButtonArea.setAttribute("style", "display: inline-block; width: " + toggleButtonAreaWidth + "px");
                    if (item.hasChildren) {
                        var toggleButton = document.createElement("div");
                        toggleButton.setAttribute("style", "cursor: default; padding-left: 1px; font-size: 12px; display: inline-block");
                        var buttonTemplate = settings.collapsedToggleButtonTemplate;
                        if (item.isExpanded)
                            buttonTemplate = settings.expandedToggleButtonTemplate;
                        var content = buttonTemplate();
                        toggleButton.appendChild(content);
                        initializeToggleButton(toggleButton, item, items, content, chartContent, null, null, settings);
                        toggleButtonArea.appendChild(toggleButton);
                    }
                    gridCellContent.appendChild(toggleButtonArea);
                }
                var templatedContent = column.cellTemplate(item);
                gridCellContent.appendChild(templatedContent);
                gridCellContentContainer.appendChild(gridCellContent);
                gridCell.appendChild(gridCellContentContainer);
                gridCell.isSelection = column.isSelection;
                return gridCell;
            },
            getDefaultCollapsedToggleButtonTemplate = function (ganttChartView, settings) {
                return function () {
                    var document = ganttChartView.ownerDocument;
                    var triangle = document.createElementNS(svgns, "polygon");
                    triangle.setAttribute("points", "3.5,2.5 3.5,11.5 10.5,6.5");
                    return getToggleButtonContent(triangle, settings);
                };
            },
            getDefaultExpandedToggleButtonTemplate = function (ganttChartView, settings) {
                return function () {
                    var document = ganttChartView.ownerDocument;
                    var triangle = document.createElementNS(svgns, "polygon");
                    triangle.setAttribute("points", "2.5,3.5 11.5,3.5 6.5,10.5");
                    return getToggleButtonContent(triangle, settings);
                };
            },
            initializeToggleButton = function (toggleButton, item, items, content, chartContent, button, border, settings) {
                if (typeof button === undefinedType || button == null)
                    button = content.querySelector("#PART_Button");
                if (button != null)
                    initializeToggleButtonHovering(button, button, settings, item.ganttChartView);
                if (typeof border === undefinedType || border == null)
                    border = content.querySelector("#PART_Border");
                if (border != null)
                    initializeToggleButtonHovering(border, button, settings, item.ganttChartView);
                var tag = { toggleButton: toggleButton, item: item, items: items, content: content, chartContent: chartContent, settings: settings };
                if (button != null) {
                    button.tag = tag;
                    if (typeof settings.isExport === undefinedType || !settings.isExport)
                        button.addEventListener("mouseup", event(item.ganttChartView, button, "mouseup", onToggleButtonClick, true), true);
                }
                if (border != null) {
                    border.tag = tag;
                    if (typeof settings.isExport === undefinedType || !settings.isExport)
                        border.addEventListener("mouseup", event(item.ganttChartView, border, "mouseup", onToggleButtonClick, true), true);
                }
                toggleButton.tag = tag;
                if (button == null && border == null && (typeof settings.isExport === undefinedType || !settings.isExport))
                    toggleButton.addEventListener("mouseup", event(item.ganttChartView, toggleButton, "mouseup", onToggleButtonClick, true), true);
                content.addEventListener("keypress", event(item.ganttChartView, content, "keypress", function (e) {
                    if (e.keyCode == 32) {
                        e.preventDefault();
                        e.stopPropagation();
                        setItemExpansion(item, !item.isExpanded, true);
                    }
                }, true), true);
                item.toggleButton = toggleButton;
            },
            initializeToggleButtonHovering = function (buttonPart, button, settings, ganttChartView) {
                if (typeof settings.isExport !== undefinedType && settings.isExport)
                    return;
                buttonPart.addEventListener("mouseover", event(ganttChartView, buttonPart, "mouseover", function (e) {
                    if (typeof settings.toggleButtonHoveringClass !== undefinedType)
                        button.setAttribute("class", settings.toggleButtonHoveringClass);
                    if (typeof settings.toggleButtonHoveringStyle !== undefinedType)
                        button.setAttribute("style", settings.toggleButtonHoveringStyle);
                }, true), true);
                buttonPart.addEventListener("mouseout", event(ganttChartView, buttonPart, "mouseout", function (e) {
                    button.setAttribute("class", settings.toggleButtonClass);
                    button.setAttribute("style", settings.toggleButtonStyle);
                }, true), true);
            },
            onToggleButtonClick = function (e) {
                e.stopPropagation();
                var button = e.target;
                var tag = button.tag;
                var toggleButton = tag.toggleButton;
                var item = tag.item;
                setItemExpansion(item, !item.isExpanded, true);
            },
            setItemExpansion = function (item, value, isDirect, isFinal) {
                if (item.isExpanded == value)
                    return;
                item.isExpanded = value;
                if (typeof isFinal === undefinedType || isFinal)
                    onItemPropertyChanged(item, "isExpanded", isDirect, true);
                onItemExpansionChanged(item);
            },
            onItemExpansionChanged = function (item, postponeIfNeeded) {
                if (typeof item.toggleButton === undefinedType) {
                    if (typeof postponeIfNeeded === undefinedType || postponeIfNeeded)
                        setTimeout(function () { onItemExpansionChanged(item, false); }, 0);
                    return;
                }
                var toggleButton = item.toggleButton;
                var tag = toggleButton.tag;
                var settings = tag.settings;
                var collapsedToggleButtonTemplate = settings.collapsedToggleButtonTemplate;
                var expandedToggleButtonTemplate = settings.expandedToggleButtonTemplate;
                var buttonTemplate = collapsedToggleButtonTemplate;
                if (item.isExpanded)
                    buttonTemplate = expandedToggleButtonTemplate;
                var content = buttonTemplate();
                var button = content.querySelector("#PART_Button");
                var border = content.querySelector("#PART_Border");
                toggleButton.replaceChild(content, tag.content);
                tag.content = content;
                var items = tag.items, chartContent = tag.chartContent;
                initializeToggleButton(toggleButton, item, items, content, chartContent, button, border, settings);
                if (item.isVisible && !(typeof item.isHidden !== undefinedType && item.isHidden))
                    updateVisibility(items, item, chartContent, settings);
                refreshChartItem(item);
                updateAlternativeStyles(items, chartContent, settings);
                var scheduleChartView = item.scheduleChartView;
                if (typeof scheduleChartView === undefinedType)
                    return;
                for (var j = item.scheduleChartIndex; j < scheduleChartView.scheduleChartItems.length; j++) {
                    var sitem = scheduleChartView.scheduleChartItems[j];
                    if (typeof sitem.ganttChartItems === undefinedType)
                        continue;
                    for (var i = 0; i < sitem.ganttChartItems.length; i++) {
                        var it = sitem.ganttChartItems[i];
                        it.displayRowIndex = sitem.itemTop / scheduleChartView.settings.itemHeight;
                        scheduleChartView.refreshChartItem(it);
                    }
                }
            },
            updateVisibility = function (items, updatedItem, chartContent, settings) {
                var parentCollapsedLevel = -1;
                var isParentExpanded = false;
                var hasStarted = false, hasFinished = false;
                var itemTop = 0, height, i, item;
                var positionedItemsWithDependencies = [];
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item == updatedItem) {
                        isParentExpanded = item.isExpanded;
                        parentCollapsedLevel = item.indentation;
                    }
                    else if (item.indentation <= parentCollapsedLevel)
                        hasFinished = true;
                    var chartItem = item.chartItem;
                    if (hasStarted && !hasFinished) {
                        var itemVisibility;
                        if (item.scheduleChartItem && item.scheduleChartItem != item) {
                            itemVisibility = item.scheduleChartItem.isVisible;
                        }
                        else if (!isParentExpanded) {
                            itemVisibility = false;
                        }
                        else {
                            itemVisibility = true;
                            var p = item.parent;
                            while (p != null) {
                                if (!p.isVisible || !p.isExpanded) {
                                    itemVisibility = false;
                                    break;
                                }
                                p = p.parent;
                            }
                        }
                        if (item.isVisible != itemVisibility) {
                            item.isVisible = isParentExpanded;
                            onItemPropertyChanged(item, "isVisible", false, true);
                            height = settings.itemHeight;
                            if (!item.isVisible || (typeof item.isHidden !== undefinedType && item.isHidden))
                                height = 0;
                            if (typeof item.gridItem !== undefinedType)
                                item.gridItem.style.height = height + "px";
                            if (typeof item.gridItemContainer !== undefinedType)
                                item.gridItemContainer.style.display = height > 0 ? "block" : "none";
                            var visibility = "visible";
                            if (!item.isVisible || (typeof item.isHidden !== undefinedType && item.isHidden))
                                visibility = "hidden";
                            chartItem.setAttribute("style", "visibility: " + visibility);
                        }
                    }
                    if (typeof item.displayRowIndex === undefinedType) {
                        chartItem.setAttribute("transform", "translate(0, " + itemTop + ")");
                        updateItemParts(item, itemTop);
                    }
                    if (item == updatedItem)
                        hasStarted = true;
                    height = settings.itemHeight;
                    if (!item.isVisible || (typeof item.isHidden !== undefinedType && item.isHidden))
                        height = 0;
                    if (item.itemTop != itemTop)
                        item.itemTop = itemTop;
                    if (typeof item.displayRowIndex === undefinedType)
                        itemTop += height;
                    if (item.predecessors && item.predecessors.length > 0 && positionedItemsWithDependencies.indexOf(item) < 0) {
                        positionedItemsWithDependencies.push(item);
                        for (var j = 0; j < item.predecessors.length; j++) {
                            var dependencyItem = item.predecessors[j].item;
                            if (positionedItemsWithDependencies.indexOf(dependencyItem) < 0)
                                positionedItemsWithDependencies.push(dependencyItem);
                        }
                    }
                }
                setChartHeight(chartContent, itemTop);
                updateDependencyLines(items, updatedItem);
                if (settings.areTaskDependenciesVisible) {
                    for (i = 0; i < positionedItemsWithDependencies.length; i++)
                        updateDependencyLines(items, positionedItemsWithDependencies[i]);
                }
                updateVirtualizationVisibility(items, chartContent.container, settings);
            },
            updateItemParts = function (item, itemTop) {
                if (typeof item.parts === undefinedType || item.parts.length <= 0)
                    return;
                var refreshItemPartsInternal = function () {
                    for (var pi = 0; pi < item.parts.length; pi++) {
                        var part = item.parts[pi];
                        part.itemTop = itemTop;
                        if (typeof part.chartItem !== undefinedType) {
                            part.chartItem.setAttribute("transform", "translate(0, " + itemTop + ")");
                            part.chartItem.style.visibility = item.chartItem.style.visibility;
                            if (typeof part.isInternallyHidden !== undefinedType) {
                                delete part.isInternallyHidden;
                                part.chartItem.style.display = "inline";
                            }
                        }
                    }
                };
                setTimeout(refreshItemPartsInternal, 0);
            },
            setChartHeight = function (chartContent, height) {
                if (height < chartContent.availableHeight)
                    height = chartContent.availableHeight;
                chartContent.style.height = height + "px";
                var chartArea = chartContent.chartArea;
                chartArea.style.height = height + "px";
                for (var i = 0; i < chartArea.childNodes.length; i++) {
                    var node = chartArea.childNodes[i];
                    if (typeof node.tag !== undefinedType) {
                        switch (node.tag) {
                            case "Scale-Highlighting":
                            case "Scale-Highlighting-CurrentTime":
                                node.setAttribute("height", height);
                                break;
                            case "Scale-Separator":
                            case "Scale-Separator-CurrentTime":
                                node.setAttribute("y2", height);
                                break;
                        }
                    }
                }
            },
            updateDependencyLines = function (items, item) {
                var refreshedItems = [], isNew, i, j, k;
                var it = item;
                if (typeof it.successors === undefinedType) {
                    it.successors = [];
                    for (i = 0; i < items.length; i++) {
                        var successorItem = items[i];
                        if (successorItem == it || typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                            continue;
                        for (j = 0; j < successorItem.predecessors.length; j++) {
                            if (successorItem.predecessors[j].item == it) {
                                it.successors.push(successorItem);
                                break;
                            }
                        }
                    }
                }
                for (i = 0; i < item.successors.length; i++) {
                    var refreshingItem = item.successors[i];
                    if (typeof refreshingItem.predecessors !== undefinedType && refreshingItem.predecessors.length > 0) {
                        for (j = 0; j < refreshingItem.predecessors.length; j++) {
                            var refreshingPredecessorItem = refreshingItem.predecessors[j].item;
                            if (typeof refreshingPredecessorItem === undefinedType)
                                continue;
                            isNew = true;
                            for (k = 0; k < refreshedItems; k++) {
                                if (refreshingPredecessorItem == refreshedItems[k]) {
                                    isNew = false;
                                    break;
                                }
                            }
                            if (isNew) {
                                setChartItemContent(refreshingPredecessorItem.chartItem, refreshingPredecessorItem, refreshingPredecessorItem.ganttChartView.settings);
                                refreshedItems.push(refreshingPredecessorItem);
                            }
                        }
                    }
                    if (typeof refreshingItem.predecessors !== undefinedType && refreshingItem.predecessors.length > 0) {
                        isNew = true;
                        for (k = 0; k < refreshedItems; k++) {
                            if (typeof refreshingItem === undefinedType)
                                continue;
                            if (refreshingItem == refreshedItems[k]) {
                                isNew = false;
                                break;
                            }
                        }
                        if (isNew) {
                            setChartItemContent(refreshingItem.chartItem, refreshingItem, refreshingItem.ganttChartView.settings);
                            refreshedItems.push(refreshingItem);
                        }
                    }
                }
            },
            getChartItem = function (item, itemTop, settings) {
                var document = item.ganttChartView.ownerDocument;
                var chartItem = document.createElementNS(svgns, "g");
                item.chartItem = chartItem;
                var visibility = "visible";
                if (!item.isVisible || (typeof item.isHidden !== undefinedType && item.isHidden))
                    visibility = "hidden";
                chartItem.setAttribute("style", "visibility: " + visibility + "; -ms-touch-action: pinch-zoom; touch-action: pinch-zoom");
                chartItem.setAttribute("transform", "translate(0, " + itemTop + ")");
                if (typeof item.isInternallyHidden !== undefinedType && item.isInternallyHidden)
                    chartItem.style.display = "none";
                updateItemParts(item, itemTop);
                setChartItemContent(chartItem, item, settings);
                try {
                    chartItem.addEventListener("mousedown", event(item.ganttChartView, chartItem, "mousedown", function (e) { setCurrentItem(item, settings); }));
                    chartItem.addEventListener("mouseup", event(item.ganttChartView, chartItem, "mouseup", function (e) { setCurrentItem(item, settings); }));
                    chartItem.addEventListener("touchstart", event(item.ganttChartView, chartItem, "touchstart", function (e) { setCurrentItem(item, settings); }));
                    chartItem.addEventListener("touchend", event(item.ganttChartView, chartItem, "touchend", function (e) { setCurrentItem(item, settings); }));
                }
                catch (exc) { }
                return chartItem;
            },
            setChartItemContent = function (chartItem, item, settings) {
                for (var i = chartItem.childNodes.length; i-- > 0; )
                    chartItem.removeChild(chartItem.childNodes[i]);
                if ((settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible)) || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible))
                    return;
                var template = settings.standardTaskTemplate;
                if (typeof item.standardTaskTemplate !== undefinedType)
                    template = item.standardTaskTemplate;
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    template = settings.summaryTaskTemplate;
                    if (typeof item.summaryTaskTemplate !== undefinedType)
                        template = item.summaryTaskTemplate;
                }
                else if (item.isMilestone) {
                    template = settings.milestoneTaskTemplate;
                    if (typeof item.milestoneTaskTemplate !== undefinedType)
                        template = item.milestoneTaskTemplate;
                }
                if (typeof item.taskTemplate !== undefinedType)
                    template = item.taskTemplate;
                if (typeof settings.internalPreTaskTemplate !== undefinedType) {
                    var internalPreContent = settings.internalPreTaskTemplate(item);
                    if (internalPreContent != null)
                        chartItem.appendChild(internalPreContent);
                }
                var content = template(item);
                content.addEventListener("contextmenu", event(item.ganttChartView, content, "contextmenu", function (e) {
                    if (typeof settings.itemContextMenuHandler !== undefinedType)
                        settings.itemContextMenuHandler(e, item);
                    else
                        e.preventDefault();
                }));
                chartItem.appendChild(content);
                if (typeof settings.internalExtraTaskTemplate !== undefinedType) {
                    var internalExtraContent = settings.internalExtraTaskTemplate(item);
                    if (internalExtraContent != null)
                        chartItem.appendChild(internalExtraContent);
                }
                if (typeof settings.extraTaskTemplate !== undefinedType) {
                    var extraContent = settings.extraTaskTemplate(item);
                    if (extraContent != null)
                        chartItem.appendChild(extraContent);
                }
                if (settings.areTaskAssignmentsVisible) {
                    var assignmentsContent = settings.assignmentsTemplate(item);
                    content.appendChild(assignmentsContent);
                }
                if (settings.isTaskToolTipVisible) {
                    var toolTipTemplate = settings.itemTemplate;
                    if (typeof item.template !== undefinedType)
                        toolTipTemplate = item.template;
                    content.appendChild(toolTipTemplate(item));
                }
                if (settings.areTaskDependenciesVisible) {
                    if (typeof item.predecessors !== undefinedType) {
                        for (var j = 0; j < item.predecessors.length; j++) {
                            var predecessorItem = item.predecessors[j];
                            if ((typeof item.ganttChartView === undefinedType || item.ganttChartView.items.indexOf(predecessorItem.item)) < 0 || !predecessorItem.item.isVisible || (typeof predecessorItem.item.isHidden !== undefinedType && predecessorItem.item.isHidden) || (typeof predecessorItem.item.isBarVisible !== undefinedType && !predecessorItem.item.isBarVisible))
                                continue;
                            var predecessorContent = settings.dependencyLineTemplate(item, predecessorItem);
                            predecessorContent.predecessorIndex = j;
                            var handle = function (predecessorItem) {
                                predecessorContent.addEventListener("click", event(item.ganttChartView, predecessorContent, "click", function (e) {
                                    if (settings.dependencyLineClickHandler)
                                        settings.dependencyLineClickHandler(item.predecessors[this.predecessorIndex], item, e);
                                }));
                                predecessorContent.addEventListener("dblclick", event(item.ganttChartView, predecessorContent, "dblclick", function (e) {
                                    if (settings.dependencyLineDoubleClickHandler)
                                        settings.dependencyLineDoubleClickHandler(item.predecessors[this.predecessorIndex], item, e);
                                }));
                            };
                            handle(predecessorItem);
                            if (typeof settings.predecessorItemContextMenuHandler !== undefinedType) {
                                predecessorContent.addEventListener("contextmenu", event(item.ganttChartView, predecessorContent, "contextmenu", function (e) {
                                    settings.predecessorItemContextMenuHandler(e, item.predecessors[this.predecessorIndex], item);
                                }));
                            }
                            else if (!settings.isReadOnly && !settings.isChartReadOnly && !settings.areTaskPredecessorsReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly)) {
                                predecessorContent.addEventListener("contextmenu", event(item.ganttChartView, predecessorContent, "contextmenu", function (e) {
                                    if (confirm("Are you sure you want to remove the predecessor?")) {
                                        var newPredecessors = [];
                                        for (var k = 0; k < item.predecessors.length; k++) {
                                            if (k == this.predecessorIndex)
                                                continue;
                                            var predecessorItemK = item.predecessors[k];
                                            var predecessorK = predecessorItemK.item;
                                            delete predecessorK.successors;
                                            newPredecessors.push(predecessorItemK);
                                        }
                                        item.predecessors = newPredecessors;
                                        onItemPropertyChanged(item, "predecessors", true, true);
                                        setChartItemContent(item.chartItem, item, settings);
                                        updateDependencyLines(item.ganttChartView.items, item);
                                    }
                                    e.preventDefault();
                                }));
                            }
                            chartItem.appendChild(predecessorContent);
                            if (settings.isDependencyToolTipVisible) {
                                var predecessorItemTemplate = settings.predecessorItemTemplate;
                                if (typeof predecessorItem.template !== undefinedType)
                                    predecessorItemTemplate = predecessorItem.template;
                                predecessorContent.appendChild(predecessorItemTemplate(item, predecessorItem));
                            }
                        }
                    }
                }
            },
            refreshChartItems = function (items, ganttChartView) {
                for (var i = 0; i < items.length; i++)
                    refreshChartItem(items[i]);
            },
            refreshGridItems = function (items) {
                for (var i = 0; i < items.length; i++)
                    refreshGridItem(items[i]);
            },
            refreshItems = function (items) {
                for (var i = 0; i < items.length; i++)
                    refreshItemGraph(items[i]);
            },
            refreshChartItem = function (item) {
                if (item.ganttChartView.settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                    return;
                if (typeof item.isWaitingToRefreshChartItem !== undefinedType)
                    return;
                item.isWaitingToRefreshChartItem = true;
                setTimeout(function () {
                    setChartItemContent(item.chartItem, item, item.ganttChartView.settings);
                    var itemTop = getItemTop(item, item.ganttChartView.items, item.ganttChartView.settings);
                    item.chartItem.setAttribute("transform", "translate(0, " + itemTop + ")");
                    updateItemParts(item, itemTop);
                    delete item.isWaitingToRefreshChartItem;
                }, 0);
            },
            refreshItem = function (item) {
                if (item.ganttChartView.settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                    return;
                if (typeof item.isWaitingToRefreshGridItem !== undefinedType || typeof item.isWaitingToRefreshChartItem !== undefinedType) {
                    if (typeof item.isWaitingToRefreshGridItem === undefinedType)
                        refreshGridItem(item);
                    if (typeof item.isWaitingToRefreshChartItem === undefinedType)
                        refreshChartItem(item);
                }
                else {
                    item.isWaitingToRefreshGridItem = true;
                    item.isWaitingToRefreshChartItem = true;
                    setTimeout(function () {
                        if (typeof item.gridItem !== undefinedType)
                            setGridItemContent(item.gridItem, item, item.ganttChartView.items, item.ganttChartView.settings.columns, item.ganttChartView.chartContent, item.ganttChartView.settings.toggleButtonAreaWidth, item.ganttChartView.settings);
                        setChartItemContent(item.chartItem, item, item.ganttChartView.settings);
                        var itemTop = getItemTop(item, item.ganttChartView.items, item.ganttChartView.settings);
                        item.chartItem.setAttribute("transform", "translate(0, " + itemTop + ")");
                        updateItemParts(item, itemTop);
                        delete item.isWaitingToRefreshGridItem;
                        delete item.isWaitingToRefreshChartItem;
                    }, 0);
                }
            },
            refreshPredecessorItems = function (item) {
                if (item.ganttChartView.settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                    return;
                if (typeof item.isWaitingToRefreshPredecessorItems !== undefinedType)
                    return;
                item.isWaitingToRefreshPredecessorItems = true;
                setTimeout(function () {
                    updateDependencyLines(item.ganttChartView.items, item);
                    delete item.isWaitingToRefreshPredecessorItems;
                }, 0);
            },
            refreshItemGraph = function (item) {
                if (item.ganttChartView.settings.isVirtualizing && (typeof item.isVirtuallyVisible === undefinedType || !item.isVirtuallyVisible))
                    return;
                if (typeof item.isWaitingToRefreshGridItem !== undefinedType || typeof item.isWaitingToRefreshChartItem !== undefinedType || typeof item.isWaitingToRefreshPredecessorItems !== undefinedType) {
                    if (typeof item.isWaitingToRefreshGridItem === undefinedType)
                        refreshGridItem(item);
                    if (typeof item.isWaitingToRefreshChartItem === undefinedType)
                        refreshChartItem(item);
                    if (typeof item.isWaitingToRefreshPredecessorItems === undefinedType)
                        refreshPredecessorItems(item);
                }
                else {
                    item.isWaitingToRefreshGridItem = true;
                    item.isWaitingToRefreshChartItem = true;
                    item.isWaitingToRefreshPredecessorItems = true;
                    setTimeout(function () {
                        if (typeof item.gridItem !== undefinedType)
                            setGridItemContent(item.gridItem, item, item.ganttChartView.items, item.ganttChartView.settings.columns, item.ganttChartView.chartContent, item.ganttChartView.settings.toggleButtonAreaWidth, item.ganttChartView.settings);
                        setChartItemContent(item.chartItem, item, item.ganttChartView.settings);
                        var itemTop = getItemTop(item, item.ganttChartView.items, item.ganttChartView.settings);
                        item.chartItem.setAttribute("transform", "translate(0, " + itemTop + ")");
                        updateItemParts(item, itemTop);
                        updateDependencyLines(item.ganttChartView.items, item);
                        delete item.isWaitingToRefreshGridItem;
                        delete item.isWaitingToRefreshChartItem;
                        delete item.isWaitingToRefreshPredecessorItems;
                    }, 0);
                }
            },
            refreshItemPath = function (item) {
                refreshItemGraph(item);
                var parent = item.parent;
                while (parent != null) {
                    updateParentTimingInformation(parent);
                    item = parent;
                    refreshItemGraph(item);
                    parent = item.parent;
                }
            },
            refreshItemNeighbourhood = function (item, items, ganttChartView, settings) {
                initializeItems(items, settings);
                initializeHierarchy(items, ganttChartView);
                initializeTimingInformation(items, settings, ganttChartView);
                var i;
                i = item.index - 1;
                if (i >= 0)
                    refreshItemPath(items[i]);
                refreshItemPath(item);
                i = item.index + 1;
                if (i < items.length)
                    refreshItemPath(items[i]);
            },
            updateToggleAreaWidth = function (items, settings) {
                var originalToggleButtonAreaWidth = settings.toggleButtonAreaWidth;
                delete settings.toggleButtonAreaWidth;
                getToggleButtonAreaWidth(items, settings);
                return settings.toggleButtonAreaWidth != originalToggleButtonAreaWidth;
            },
            insertItem = function (index, item, ganttChartView, items, settings) {
                ganttChartView.initializedItems.push(item);

                item.ganttChartView = ganttChartView;
                item.isVirtuallyVisible = true;

                while (index > 0 && items[index - 1].isPart)
                    index--;

                for (var i = 0; i < items.length; i++) {
                    if (items[i].parts && items[i].parts.indexOf(item) >= 0) {
                        item.isPart = true;
                        item.ganttChartItem = items[i];
                        break;
                    }
                }

                var nextItem = index < items.length ? items[index] : null;
                if (nextItem == null || nextItem.isPart) {
                    var previousItem = index > 0 ? items[index - 1] : null;
                    var maxIndentation = previousItem != null ? previousItem.indentation + 1 : 0;
                    if (item.indentation > maxIndentation)
                        item.indentation = maxIndentation;
                }
                else if (typeof item.indentation === undefinedType || item.indentation < nextItem.indentation - 1 || item.indentation > nextItem.indentation) {
                    item.indentation = nextItem.indentation;
                }

                initializeItems([item], settings);
                items.splice(index, 0, item);
                initializeHierarchy(items, ganttChartView);

                if (typeof item.parts !== undefinedType) {
                    if (typeof item.isGroup === undefinedType) {
                        item.isGroup = true;
                        item.isSummaryEnabled = false;
                    }
                    initializeItems(item.parts, settings);
                    if (item.isGroup || typeof item.isBarVisible === undefinedType)
                        item.isBarVisible = false;
                    for (var pi = 0; pi < item.parts.length; pi++) {
                        var part = item.parts[pi];
                        part.ganttChartView = item.ganttChartView;
                        part.ganttChartItem = item;
                        part.isPart = true;
                        part.isVirtuallyVisible = true;
                        if (item.isGroup || typeof part.indentation === undefinedType)
                            part.indentation = 0;
                        if (item.isGroup || typeof part.displayRowIndex === undefinedType)
                            part.displayRowIndex = -1;
                        part.isInternallyHidden = true;
                        if (items.indexOf(part) >= 0)
                            continue;
                        items.splice(items.length, 0, part);
                    }
                }

                initializeTimingInformation(items, settings, ganttChartView);

                var i, itemTop;
                if (settings.isGridVisible && !item.isPart) {
                    if (typeof item.displayRowIndex === undefinedType) {
                        var before = null;
                        if (index < items.length - 1) {
                            nextItem = items[index + 1];
                            if (!nextItem.isPart) {
                                itemTop = nextItem.itemTop;
                                if (typeof nextItem.gridItemContainer !== undefinedType)
                                    before = nextItem.gridItemContainer;
                            }
                        }
                        ganttChartView.gridContent.insertBefore(getGridItem(item, items, settings.columns, ganttChartView.chartContent, settings.toggleButtonAreaWidth, settings, ganttChartView), before);
                    }
                }
                if (typeof itemTop === undefinedType)
                    itemTop = getItemsHeight(items, settings) - settings.itemHeight;
                var actualItemTop = itemTop;
                if (typeof item.displayRowIndex !== undefinedType)
                    actualItemTop = item.displayRowIndex * settings.itemHeight;
                var chartArea = ganttChartView.chartContent.chartArea;
                chartArea.appendChild(getChartItem(item, actualItemTop, settings));
                if (item.isVisible && !(typeof item.isHidden !== undefinedType && item.isHidden))
                    itemTop = Math.max(itemTop, actualItemTop + settings.itemHeight);
                item.itemTop = actualItemTop;

                if (typeof item.parts !== undefinedType) {
                    for (var pi = 0; pi < item.parts.length; pi++) {
                        var part = item.parts[pi];
                        chartArea.appendChild(getChartItem(part, actualItemTop, settings));
                    }
                }

                if (typeof item.displayRowIndex === undefinedType) {
                    for (i = index + 1; i < items.length; i++) {
                        var it = items[i];
                        actualItemTop = itemTop;
                        if (typeof it.displayRowIndex !== undefinedType)
                            actualItemTop = it.displayRowIndex * settings.itemHeight;
                        if (it.isVisible && !(typeof it.isHidden !== undefinedType && it.isHidden))
                            itemTop = Math.max(itemTop, actualItemTop + settings.itemHeight);
                        it.itemTop = actualItemTop;
                        refreshChartItem(it);
                        updateDependencyLines(items, it);
                    }
                }
                for (i = index + 1; i < items.length; i++)
                    refreshGridItem(items[i]);

                if (ganttChartView.isContentHeightInitialized && ganttChartView.isContentHeightAuto) {
                    var contentHeight = getContentHeight(ganttChartView, items, settings);
                    ganttChartView.gridContentContainer.style.height = contentHeight;
                    ganttChartView.chartContentContainer.style.height = contentHeight;
                }
                updateChartHeight(ganttChartView.chartContent, items, settings);
                updateAlternativeStyles(items, ganttChartView.chartContent, settings);
                if (updateToggleAreaWidth(items, settings))
                    refreshItems(items);
                refreshItemNeighbourhood(item, items, ganttChartView, settings);
                updateVirtualizationVisibility(items, ganttChartView.chartContentContainer, settings);
            },
            removeItem = function (item, ganttChartView, items, settings) {
                if (typeof item.parts !== undefinedType) {
                    for (var pi = 0; pi < item.parts.length; pi++) {
                        var part = item.parts[pi];
                        removeItem(part, ganttChartView, items, settings);
                    }
                }

                var index = item.index;
                var parentItem = null, parentItemExpansion = false;
                if (index > 0) {
                    parentItem = items[index - 1];
                    while (parentItem.parent != null)
                        parentItem = parentItem.parent;
                    parentItemExpansion = parentItem.isExpanded;
                    if (item.hasChildren)
                        setItemExpansion(parentItem, item.isExpanded, false, true);
                    if (parentItem.indentation >= item.indentation)
                        parentItem = null;
                }
                else if (!items[0].isExpanded)
                    setItemExpansion(items[0], true, false, true);
                var nextItem = index + 1 < items.length ? items[index + 1] : null;
                if (nextItem != null && !nextItem.isExpanded && nextItem.indentation > item.indentation)
                    setItemExpansion(nextItem, true, false, true);
                var nextIndentation = nextItem != null ? nextItem.indentation : null;
                var successorItem, i, j;
                for (i = 0; i < ganttChartView.items.length; i++) {
                    successorItem = ganttChartView.items[i];
                    if (successorItem.predecessors != null) {
                        for (j = successorItem.predecessors.length; j-- > 0; ) {
                            if (successorItem.predecessors[j].item == item) {
                                successorItem.predecessors.splice(j, 1);
                                onItemPropertyChanged(successorItem, "predecessors", false, true);
                                refreshItem(successorItem);
                                refreshPredecessorItems(successorItem);
                            }
                        }
                    }
                }
                var itemTop = item.itemTop;
                items.splice(index, 1);
                initializeHierarchy(items, ganttChartView);
                initializeTimingInformation(items, settings, ganttChartView);
                if (settings.isGridVisible) {
                    if (typeof item.displayRowIndex === undefinedType && typeof item.gridItemContainer !== undefinedType) {
                        ganttChartView.gridContent.removeChild(item.gridItemContainer);
                    }
                }
                var chartArea = ganttChartView.chartContent.chartArea;
                if (typeof item.chartItem !== undefinedType)
                    chartArea.removeChild(item.chartItem);
                nextItem = index < items.length ? items[index] : null;
                if (nextItem != null && nextItem.indentation < nextIndentation) {
                    onItemPropertyChanged(nextItem, "indentation", false, true);
                    nextItem.predecessors = [];
                    onItemPropertyChanged(nextItem, "predecessors", false, true);
                    for (i = 0; i < items.length; i++) {
                        successorItem = items[i];
                        if (successorItem == nextItem || typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                            continue;
                        for (j = 0; j < successorItem.predecessors.length; j++) {
                            if (successorItem.predecessors[j].item == nextItem) {
                                successorItem.predecessors.splice(j--, 1);
                                onItemPropertyChanged(successorItem, "predecessors", false, true);
                                refreshItem(successorItem);
                                refreshPredecessorItems(successorItem);
                            }
                        }
                    }
                }
                if (parentItem != null)
                    setItemExpansion(parentItem, parentItemExpansion, false, true);
                for (i = index; i < items.length; i++) {
                    var it = items[i];
                    actualItemTop = itemTop;
                    if (typeof it.displayRowIndex !== undefinedType)
                        actualItemTop = it.displayRowIndex * settings.itemHeight;
                    if (it.isVisible && !(typeof it.isHidden !== undefinedType && it.isHidden))
                        itemTop = Math.max(itemTop, actualItemTop + settings.itemHeight);
                    it.itemTop = actualItemTop;
                    refreshItem(it);
                }

                updateChartHeight(ganttChartView.chartContent, items, settings);
                updateAlternativeStyles(items, ganttChartView.chartContent, settings);

                if (updateToggleAreaWidth(items, settings))
                    refreshItems(items);
                if (index >= items.length)
                    index = items.length - 1;
                if (index >= 0) {
                    for (i = 0; i < index; i++)
                        refreshChartItem(items[i]);
                    refreshItemNeighbourhood(items[index], items, ganttChartView, settings);
                }

                updateVirtualizationVisibility(items, ganttChartView.chartContentContainer, settings);
            },
            increaseItemIndentation = function (item, items, ganttChartView, settings) {
                var previousItem = item.index > 0 ? ganttChartView.items[item.index - 1] : null;
                if (previousItem == null || item.indentation > previousItem.indentation)
                    return;
                setItemExpansion(item, true, false, true);
                item.indentation++;
                onItemPropertyChanged(item, "indentation", true, true);
                if (item.predecessors && item.predecessors.length > 0) {
                    var predecessorsChanged = false;
                    for (var i = 0; i < item.predecessors.length; i++) {
                        if (item.predecessors[i].item == previousItem && item.indentation > previousItem.indentation) {
                            item.predecessors.splice(i--, 1);
                            predecessorsChanged = true;
                        }
                    }
                    if (predecessorsChanged)
                        onItemPropertyChanged(item, "predecessors", false, true);
                }
                for (var k = 0; k < items.length; k++) {
                    var successorItem = items[k];
                    if (successorItem != previousItem || typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                        continue;
                    for (var j = 0; j < successorItem.predecessors.length; j++) {
                        if (successorItem.predecessors[j].item == item && previousItem.indentation > successorItem.predecessors[j].item.indentation) {
                            successorItem.predecessors.splice(j--, 1);
                            onItemPropertyChanged(successorItem, "predecessors", false, true);
                            refreshItem(successorItem);
                            refreshPredecessorItems(successorItem);
                        }
                    }
                }

                if (updateToggleAreaWidth(items, settings))
                    refreshItems(items);
                refreshItemNeighbourhood(item, items, ganttChartView, settings);

                var it = item;
                while (it != null) {
                    if (!it.isExpanded)
                        setItemExpansion(it, true, false);
                    it = it.parent;
                }
            },
            decreaseItemIndentation = function (item, items, ganttChartView, settings) {
                var nextItem = item.index < ganttChartView.items.length - 1 ? ganttChartView.items[item.index + 1] : null;
                if (item.indentation <= 0 || (nextItem != null && item.indentation < nextItem.indentation))
                    return;
                item.indentation--;
                onItemPropertyChanged(item, "indentation", true, true);
                if (nextItem && item.predecessors && item.predecessors.length > 0) {
                    var predecessorsChanged = false;
                    for (var i = 0; i < item.predecessors.length; i++) {
                        if (item.predecessors[i].item == nextItem && item.indentation < nextItem.indentation) {
                            item.predecessors.splice(i--, 1);
                            predecessorsChanged = true;
                        }
                    }
                    if (predecessorsChanged)
                        onItemPropertyChanged(item, "predecessors", false, true);
                }
                for (var k = 0; k < items.length; k++) {
                    var successorItem = items[k];
                    if (successorItem != nextItem || typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                        continue;
                    for (var j = 0; j < successorItem.predecessors.length; j++) {
                        var removed = false;
                        if (successorItem.predecessors[j].item == item && nextItem.indentation < successorItem.predecessors[j].item.indentation) {
                            successorItem.predecessors.splice(j--, 1);
                            onItemPropertyChanged(successorItem, "predecessors", false, true);
                            refreshItem(successorItem);
                            refreshPredecessorItems(successorItem);
                        }
                    }
                }

                if (updateToggleAreaWidth(items, settings))
                    refreshItems(items);
                refreshItemNeighbourhood(item, items, ganttChartView, settings);

                var it = item;
                while (it != null) {
                    if (!it.isExpanded)
                        setItemExpansion(it, true, false);
                    it = it.parent;
                }
            },
            getDefaultStyleDefinitionTemplate = function (ganttChartView, settings) {
                var oGanttChartView = ganttChartView;
                return function (ganttChartView) {
                    if (typeof ganttChartView === undefinedType)
                        ganttChartView = oGanttChartView;
                    var document = ganttChartView.ownerDocument;
                    var defs = document.createElementNS(svgns, "defs");
                    var blueGradient = document.createElementNS(svgns, "linearGradient");
                    blueGradient.setAttribute("id", "BlueGradient");
                    blueGradient.setAttribute("x1", "0%");
                    blueGradient.setAttribute("y1", "0%");
                    blueGradient.setAttribute("x2", "0%");
                    blueGradient.setAttribute("y2", "100%");
                    var blueStop1 = document.createElementNS(svgns, "stop");
                    blueStop1.setAttribute("offset", "0%");
                    blueStop1.setAttribute("style", "stop-color: White");
                    var blueStop2 = document.createElementNS(svgns, "stop");
                    blueStop2.setAttribute("offset", "25%");
                    blueStop2.setAttribute("style", "stop-color: LightBlue");
                    var blueStop3 = document.createElementNS(svgns, "stop");
                    blueStop3.setAttribute("offset", "100%");
                    blueStop3.setAttribute("style", "stop-color: Blue");
                    blueGradient.appendChild(blueStop1);
                    blueGradient.appendChild(blueStop2);
                    blueGradient.appendChild(blueStop3);
                    defs.appendChild(blueGradient);
                    var blackGradient = document.createElementNS(svgns, "linearGradient");
                    blackGradient.setAttribute("id", "BlackGradient");
                    blackGradient.setAttribute("x1", "0%");
                    blackGradient.setAttribute("y1", "0%");
                    blackGradient.setAttribute("x2", "0%");
                    blackGradient.setAttribute("y2", "100%");
                    var blackStop1 = document.createElementNS(svgns, "stop");
                    blackStop1.setAttribute("offset", "0%");
                    blackStop1.setAttribute("style", "stop-color: Black");
                    var blackStop2 = document.createElementNS(svgns, "stop");
                    blackStop2.setAttribute("offset", "10%");
                    blackStop2.setAttribute("style", "stop-color: White");
                    var blackStop3 = document.createElementNS(svgns, "stop");
                    blackStop3.setAttribute("offset", "20%");
                    blackStop3.setAttribute("style", "stop-color: Gray");
                    var blackStop4 = document.createElementNS(svgns, "stop");
                    blackStop4.setAttribute("offset", "60%");
                    blackStop4.setAttribute("style", "stop-color: Black");
                    blackGradient.appendChild(blackStop1);
                    blackGradient.appendChild(blackStop2);
                    blackGradient.appendChild(blackStop3);
                    blackGradient.appendChild(blackStop4);
                    defs.appendChild(blackGradient);
                    var arrowMarker = document.createElementNS(svgns, "marker");
                    arrowMarker.setAttribute("id", "ArrowMarker");
                    arrowMarker.setAttribute("viewBox", "0 0 10 10");
                    arrowMarker.setAttribute("refX", "0");
                    arrowMarker.setAttribute("refY", "5");
                    arrowMarker.setAttribute("markerUnits", "strokeWidth");
                    arrowMarker.setAttribute("markerWidth", (4.5 * (settings.arrowSize ? settings.arrowSize : 1)).toString());
                    arrowMarker.setAttribute("markerHeight", (3.5 * (settings.arrowSize ? settings.arrowSize : 1)).toString());
                    arrowMarker.setAttribute("orient", "auto");
                    var arrowPath = document.createElementNS(svgns, "path");
                    switch (settings.theme) {
                        case "Modern": case "ModernBordered": default:
                            arrowPath.setAttribute("fill", "#3b87d9");
                            break;
                        case "Aero":
                            arrowPath.setAttribute("fill", "Blue");
                            break;
                    }
                    arrowPath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
                    arrowPath.setAttribute('fill', settings.arrowFill ? settings.arrowFill : (settings.theme == 'Aero' ? 'Blue' : '#3b87d9'));
                    arrowMarker.appendChild(arrowPath);
                    defs.appendChild(arrowMarker);
                    return defs;
                };
            },
            getDefaultItemTemplate = function (settings) {
                return function (item) {
                    var ganttChartView = item.ganttChartView;
                    var document = item.ganttChartView.ownerDocument;
                    var toolTip = document.createElementNS(svgns, "title");
                    toolTip.appendChild(getTextNode(document, item.content));
                    if (typeof settings.areToolTipsSimplified === undefinedType || !settings.areToolTipsSimplified) {
                        if (typeof item.loadChartView === undefinedType) {
                            if (typeof item.scheduleChartView === undefinedType && item.parent) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                toolTip.appendChild(document.createTextNode("Parent: " + item.parent.content));
                            }
                            if (typeof item.scheduleChartView !== undefinedType && item.scheduleChartItem) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                toolTip.appendChild(document.createTextNode("Row: " + item.scheduleChartItem.content));
                            }
                            if (item.hasChildren) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                toolTip.appendChild(document.createTextNode("Children: " + item.children.length));
                            }
                            toolTip.appendChild(document.createTextNode("\n"));
                            toolTip.appendChild(document.createTextNode((!item.isMilestone ? "Start: " : "") + settings.dateTimeFormatter(getFormattableDate(item.start))));
                            if (!item.isMilestone) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                toolTip.appendChild(document.createTextNode("Finish: " + settings.dateTimeFormatter(getFormattableDate(item.finish))));
                            }
                            if (settings.areTaskAssignmentsVisible && item.assignmentsContent) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                toolTip.appendChild(document.createTextNode("Assignments: " + item.assignmentsContent));
                            }
                            if (!item.isMilestone) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                toolTip.appendChild(document.createTextNode("Effort: " + (ganttChartView.getItemTotalEffort(item) / hourDuration) + "h"));
                                if (settings.isTaskCompletedEffortVisible) {
                                    var completion = ganttChartView.getItemCompletion(item);
                                    if (!isNaN(completion)) {
                                        toolTip.appendChild(document.createTextNode("\n"));
                                        toolTip.appendChild(document.createTextNode("Completed: " + (Math.round(completion * 100 * 100) / 100) + "%"));
                                    }
                                }
                            }
                            if (settings.areTaskDependenciesVisible && item.predecessors && item.predecessors.length > 0) {
                                toolTip.appendChild(document.createTextNode("\n"));
                                var predecessorsString = "";
                                for (var i = 0; i < item.predecessors.length; i++) {
                                    var predecessor = item.predecessors[i];
                                    if (!predecessor.item)
                                        continue;
                                    if (predecessorsString.length > 0)
                                        predecessorsString += ", ";
                                    predecessorsString += predecessor.item.content;
                                    if (predecessor.dependencyType)
                                        predecessorsString += " (" + getDependencyTypeString(predecessor.dependencyType) + ")";
                                }
                                toolTip.appendChild(document.createTextNode("Predecessors: " + predecessorsString));
                            }
                        }
                        else if (!isNaN(item.units)) {
                            toolTip.appendChild(document.createTextNode("\n"));
                            toolTip.appendChild(document.createTextNode("Allocation: " + (Math.round(item.units * 100 * 100) / 100) + "%"));
                        }
                    }
                    return toolTip;
                };
            },
            getDefaultAssignmentsTemplate = function (settings) {
                var oSettings = settings;
                return function (item) {
                    var ganttChartView = item.ganttChartView;
                    var settings = typeof oSettings !== undefinedType ? oSettings : ganttChartView.settings;
                    if (settings.areResourceImagesVisibleAsAssignments) {
                        var svg = ganttChartView.chartContent.childNodes[0];
                        var defs = svg.childNodes[0];
                        if (!ganttChartView.chartContent.hasClipPathForResourceImagesBeenInitialized) {
                            var clipPath = document.createElementNS(svgns, 'clipPath');
                            clipPath.setAttribute('id', 'resourceImageClipPath');
                            clipPath.setAttribute('clipPathUnits', 'objectBoundingBox');
                            var circle = document.createElementNS(svgns, 'circle');
                            circle.setAttribute('cx', 0.5);
                            circle.setAttribute('cy', 0.5);
                            circle.setAttribute('r', 0.5);
                            clipPath.appendChild(circle);
                            defs.appendChild(clipPath);
                            ganttChartView.chartContent.hasClipPathForResourceImagesBeenInitialized = true;
                        }
                        var assignmentsGroup = document.createElementNS(svgns, 'g');
                        assignmentsGroup.setAttribute('id', 'assignmentsGroup');
                        var itemRight = ganttChartView.getChartPosition(item.finish) + settings.barHeight / 3 + 2;
                        if (item.isMilestone || (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)))
                            itemRight += settings.barHeight / 2 + (item.isMilestone ? settings.barHeight / 3 : 0);
                        var assignments = getItemAssignments(item);
                        var indexResource = 0;
                        assignments.forEach(function (assignment) {
                            var resource = assignment.key;
                            var resourceImageUrl;
                            if (typeof settings.resourceImageUrls !== undefinedType) {
                                var i = indexOfKey(settings.resourceImageUrls, resource);
                                if (i >= 0)
                                    resourceImageUrl = settings.resourceImageUrls[i].value;
                            }

                            if (resourceImageUrl && settings.itemHeight > 4) {
                                var imageSize = settings.itemHeight - 4;
                                var icon = document.createElementNS(svgns, 'image');
                                icon.setAttribute('x', itemRight + (24 + 4) * indexResource);
                                icon.setAttribute('y', 2);
                                icon.setAttribute('width', imageSize + 'px');
                                icon.setAttribute('height', imageSize + 'px');
                                if (item.isExported && resourceImageUrl.indexOf('://') != 0) {
                                    var urlPath = resourceImageUrl.indexOf('/') != 0 ? window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/') + 1) : '';
                                    resourceImageUrl = window.location.protocol + "//" + window.location.host + urlPath + resourceImageUrl;
                                }
                                icon.setAttribute('href', resourceImageUrl);
                                icon.setAttribute('clip-path', 'url(#resourceImageClipPath)');
                                assignmentsGroup.appendChild(icon);
                                var resourceSuffix = assignment.value != 1 ? " " + (Math.round(assignment.value * 100 * 100) / 100) + "%" : "";
                                var tooltip = document.createElementNS(svgns, 'title');
                                tooltip.appendChild(document.createTextNode(resource + resourceSuffix));
                                icon.appendChild(tooltip);
                            }
                            indexResource++;
                        });
                        return assignmentsGroup;
                    } else {
                        var text = document.createElementNS(svgns, "text");
                        var itemRight = getChartPosition(item.finish, settings);
                        itemRight += settings.classic || item.hasChildren || item.isMilestone ? 0 : 12 - Math.min(12, itemRight - getChartPosition(item.start, settings));
                        if (item.isMilestone || (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)))
                            itemRight += settings.barHeight / 2;
                        text.setAttribute("x", itemRight + 7);
                        text.setAttribute("y", settings.barMargin + settings.barHeight / 2);
                        text.setAttribute("dominant-baseline", "central");
                        var isPhone = settings.target == "Phone";
                        var content = !isPhone ? item.assignmentsContent : item.content;
                        if (typeof content === undefinedType)
                            content = "";
                        text.appendChild(getSimpleTextNode(document, content));
                        if (typeof settings.assignmentsClass !== undefinedType)
                            text.setAttribute("class", settings.assignmentsClass);
                        else if (typeof settings.assignmentsStyle !== undefinedType)
                            text.setAttribute("style", settings.assignmentsStyle);
                        return text;
                    }
                };
            },
            getChartItemArea = function (item) {
                var document = item.ganttChartView.ownerDocument;
                if (typeof item.chartItemArea === undefinedType)
                    item.chartItemArea = document.createElementNS(svgns, "g");
                for (var i = item.chartItemArea.childNodes.length; i-- > 0; )
                    item.chartItemArea.removeChild(item.chartItemArea.childNodes[i]);
                return item.chartItemArea;
            },
            getLabel = function (item, group, itemLeft, itemRight, labelColor) {
                var ganttChartView = item.ganttChartView;
                var settings = ganttChartView.settings;
                var document = ganttChartView.ownerDocument;
                var barMargin = settings.barMargin;
                var barHeight = settings.barHeight;
                var height = settings.barHeight;
                var index = group.childNodes.length - 6; // Drag thumb.
                var width = itemRight != null ? itemRight - itemLeft - 4 - (item.hasChildren ? 4 : 0) : 200;
                var foreignObject = document.createElementNS(svgns, 'foreignObject');
                foreignObject.setAttribute('width', width);
                foreignObject.setAttribute('height', height);
                if (item.isMilestone) {
                    foreignObject.setAttribute('x', itemLeft - 200 - barHeight);
                    foreignObject.setAttribute('y', barMargin);
                    foreignObject.setAttribute('style', 'line-height: ' + height + 'px; text-overflow: ellipsis; white-space: nowrap; text-align: right; font-size: ' + (barHeight / 2 + 1) + 'px; color: ' + labelColor);
                } else if (item.hasChildren) {
                    foreignObject.setAttribute('x', itemLeft + 4);
                    foreignObject.setAttribute('y', barMargin);
                    foreignObject.setAttribute('style', 'line-height: ' + (height * 2 / 3) + 'px; text-overflow: ellipsis; white-space: nowrap; font-size: ' + (barHeight / 2) + 'px; color: ' + labelColor);
                } else {
                    foreignObject.setAttribute('x', itemLeft + 2);
                    foreignObject.setAttribute('y', barMargin);
                    foreignObject.setAttribute('style', 'line-height: ' + height + 'px; text-overflow: ellipsis; white-space: nowrap; font-size: ' + (barHeight / 2 + 1) + 'px; color: ' + labelColor);
                }
                var text = document.createElement('div');
                var content = document.createTextNode(item.label);
                text.appendChild(content);
                foreignObject.appendChild(text);
                group.insertBefore(foreignObject, group.childNodes[index]);
                return text;
            },
            getDefaultStandardTaskTemplate = function (items, ganttChartView, settings) {
                var oItems = items, oGanttChartView = ganttChartView, oSettings = settings;
                return function (item) {
                    var ganttChartView = typeof oGanttChartView !== undefinedType ? oGanttChartView : item.ganttChartView;
                    var settings = typeof oSettings !== undefinedType ? oSettings : ganttChartView.settings;
                    var items = typeof oItems !== undefinedType ? oItems : ganttChartView.items;
                    var document = ganttChartView.ownerDocument;
                    var group = getChartItemArea(item);
                    if (settings.isBaselineVisible && typeof item.baselineStart !== undefinedType && typeof item.baselineFinish !== undefinedType) {
                        var itemBaselineLeft = getChartPosition(item.baselineStart, settings);
                        var itemBaselineRight = Math.max(getChartPosition(item.baselineFinish, settings), itemBaselineLeft + (settings.classic ? 4 : 12));
                        var baselineBar = document.createElementNS(svgns, "rect");
                        baselineBar.setAttribute("x", itemBaselineLeft);
                        baselineBar.setAttribute("y", settings.barMargin / 2);
                        baselineBar.setAttribute("width", Math.max(0, itemBaselineRight - itemBaselineLeft - 1));
                        baselineBar.setAttribute("height", settings.barHeight);
                        baselineBar.setAttribute("rx", settings.barCornerRadius);
                        baselineBar.setAttribute("ry", settings.barCornerRadius);
                        var baselineBarClass = settings.baselineBarClass;
                        if (typeof item.baselineBarClass !== undefinedType)
                            baselineBarClass = item.baselineBarClass;
                        if (typeof baselineBarClass !== undefinedType)
                            baselineBar.setAttribute("class", baselineBarClass);
                        else {
                            var baselineBarStyle = settings.baselineBarStyle;
                            if (typeof item.baselineBarStyle !== undefinedType)
                                baselineBarStyle = item.baselineBarStyle;
                            if (typeof baselineBarStyle !== undefinedType)
                                baselineBar.setAttribute("style", baselineBarStyle);
                        }
                        group.appendChild(baselineBar);
                    }
                    var itemLeft = getChartPosition(item.start, settings);
                    var itemRight = Math.max(getChartPosition(item.finish, settings), itemLeft + (settings.classic ? 4 : 12));
                    var itemCompletedRight = getChartPosition(item.completedFinish, settings);
                    var bar = document.createElementNS(svgns, "rect");
                    bar.setAttribute("x", itemLeft);
                    bar.setAttribute("y", settings.barMargin);
                    bar.setAttribute("width", Math.max(0, itemRight - itemLeft - 1));
                    bar.setAttribute("height", settings.barHeight);
                    bar.setAttribute("rx", settings.barCornerRadius);
                    bar.setAttribute("ry", settings.barCornerRadius);
                    var barClass = settings.standardBarClass;
                    if (typeof item.standardBarClass !== undefinedType)
                        barClass = item.standardBarClass;
                    if (typeof item.barClass !== undefinedType)
                        barClass = item.barClass;
                    if (typeof barClass !== undefinedType)
                        bar.setAttribute("class", barClass);
                    else {
                        var barStyle = settings.standardBarStyle;
                        if (typeof item.standardBarStyle !== undefinedType)
                            barStyle = item.standardBarStyle;
                        if (typeof item.barStyle !== undefinedType)
                            barStyle = item.barStyle;
                        if (typeof barStyle !== undefinedType)
                            bar.setAttribute("style", barStyle);
                    }
                    group.appendChild(bar);
                    if (settings.isTaskCompletedEffortVisible) {
                        var completedBar = document.createElementNS(svgns, "rect");
                        completedBar.setAttribute("x", itemLeft + 0.65);
                        completedBar.setAttribute("y", settings.barMargin + settings.completedBarMargin - 0.65);
                        completedBar.setAttribute("width", Math.max(0, itemCompletedRight - itemLeft - 1 - 0.65 * 2));
                        completedBar.setAttribute("height", settings.completedBarHeight + 2 * 0.65);
                        completedBar.setAttribute("rx", settings.completedBarCornerRadius);
                        completedBar.setAttribute("ry", settings.completedBarCornerRadius);
                        var completedBarClass = settings.standardCompletedBarClass;
                        if (typeof item.standardCompletedBarClass !== undefinedType)
                            completedBarClass = item.standardCompletedBarClass;
                        if (typeof item.completedBarClass !== undefinedType)
                            completedBarClass = item.completedBarClass;
                        if (typeof completedBarClass !== undefinedType)
                            completedBar.setAttribute("class", completedBarClass);
                        else {
                            var completedBarStyle = settings.standardCompletedBarStyle;
                            if (typeof item.standardCompletedBarStyle !== undefinedType)
                                completedBarStyle = item.standardCompletedBarStyle;
                            if (typeof item.completedBarStyle !== undefinedType)
                                completedBarStyle = item.completedBarStyle;
                            if (typeof completedBarStyle !== undefinedType)
                                completedBar.setAttribute("style", completedBarStyle);
                        }
                        group.appendChild(completedBar);
                    }
                    if (settings.areStandardTaskLabelsVisible && item.label) {
                        var labelColor = item.labelColor ? item.labelColor : (settings.standardLabelColor ? settings.standardLabelColor : 'black');
                        var label = getLabel(item, group, itemLeft, itemRight, labelColor);
                        var labelClass = settings.standardLabelClass;
                        if (typeof item.labelClass !== undefinedType)
                            labelClass = item.labelClass;
                        if (typeof labelClass !== undefinedType)
                            label.setAttribute("class", labelClass);
                        else {
                            var labelStyle = settings.standardLabelStyle;
                            if (typeof item.labelStyle !== undefinedType)
                                labelStyle = item.labelStyle;
                            if (typeof labelStyle !== undefinedType)
                                label.setAttribute("style", labelStyle);
                        }
                    }
                    if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
                        var thumb = document.createElementNS(svgns, "rect");
                        thumb.setAttribute("x", itemLeft);
                        thumb.setAttribute("y", settings.barMargin);
                        thumb.setAttribute("width", Math.max(0, itemRight - itemLeft - 1));
                        thumb.setAttribute("height", settings.barHeight);
                        thumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer");
                        if (!settings.isTaskStartReadOnly)
                            group.appendChild(thumb);
                        var startThumb, finishThumb, completedFinishThumb;
                        startThumb = document.createElementNS(svgns, "rect");
                        startThumb.setAttribute("x", itemLeft - 4);
                        startThumb.setAttribute("y", settings.barMargin);
                        startThumb.setAttribute("width", settings.classic ? 4 : 8);
                        startThumb.setAttribute("height", settings.barHeight);
                        startThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: " + (settings.classic ? "w-resize" : "ew-resize"));
                        if (settings.isDraggingTaskStartEndsEnabled && !settings.isTaskStartReadOnly && settings.interaction != "TouchEnabled")
                            group.appendChild(startThumb);
                        finishThumb = document.createElementNS(svgns, "rect");
                        finishThumb.setAttribute("x", itemRight - 4);
                        finishThumb.setAttribute("y", settings.barMargin);
                        finishThumb.setAttribute("width", 8);
                        finishThumb.setAttribute("height", settings.barHeight);
                        finishThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: " + (settings.classic ? "e-resize" : "ew-resize"));
                        if (!settings.isTaskEffortReadOnly && settings.interaction != "TouchEnabled")
                            group.appendChild(finishThumb);
                        if (settings.classic) {
                            completedFinishThumb = document.createElementNS(svgns, "rect");
                            completedFinishThumb.setAttribute("x", itemCompletedRight - 2);
                            completedFinishThumb.setAttribute("y", settings.barMargin);
                            completedFinishThumb.setAttribute("width", 6);
                            completedFinishThumb.setAttribute("height", settings.barHeight);
                            completedFinishThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: ew-resize");
                        } else {
                            completedFinishThumb = document.createElementNS(svgns, "g");
                            var completedFinishThumbTriangle = document.createElementNS(svgns, "polygon");
                            completedFinishThumb.appendChild(completedFinishThumbTriangle);
                            var left = Math.max(itemCompletedRight - 1 - 10, itemLeft);
                            var right = Math.min(itemCompletedRight - 1 + 10, itemRight - 1);
                            completedFinishThumbTriangle.setAttribute("points",
                                left + "," + (settings.itemHeight - settings.barMargin) + " " +
                                right + "," + (settings.itemHeight - settings.barMargin) + " " +
                                (itemCompletedRight - 1 < itemLeft + 10 ? itemLeft : itemCompletedRight - 1 > itemRight - 1 - 10 ? itemRight - 1 : Math.min(Math.max(itemCompletedRight - 1, itemLeft), itemRight - 2)) +
                                    "," + (settings.itemHeight - settings.barMargin - settings.barHeight / 2));
                            completedFinishThumbTriangle.setAttribute("style", "fill: White; fill-opacity: 0; cursor: ew-resize");
                            var completedFinishThumbRect = document.createElementNS(svgns, "rect");
                            completedFinishThumb.appendChild(completedFinishThumbRect);
                            var left = Math.max(itemLeft, itemCompletedRight - 10);
                            var width = Math.min(20, itemRight - itemCompletedRight);
                            if (width < 20) {
                                left -= 10 - width;
                                width = 20;
                            }
                            completedFinishThumbRect.setAttribute("x", left);
                            completedFinishThumbRect.setAttribute("y", settings.itemHeight / 2);
                            completedFinishThumbRect.setAttribute("width", width);
                            completedFinishThumbRect.setAttribute("height", settings.itemHeight / 2);
                            completedFinishThumbRect.setAttribute("style", "fill: White; fill-opacity: 0;");
                        }
                        if (!settings.isTaskCompletionReadOnly && settings.isTaskCompletedEffortVisible && settings.interaction != "TouchEnabled") {
                            group.appendChild(completedFinishThumb);
                            var completedFinishToolTip = document.createElementNS(svgns, "title");
                            var completion = typeof settings.areToolTipsSimplified === undefinedType || !settings.areToolTipsSimplified ? ganttChartView.getItemCompletion(item) : NaN;
                            completedFinishToolTip.appendChild(getTextNode(document, !isNaN(completion) ? (Math.round(completion * 100 * 100) / 100) + "%" : ""));
                            completedFinishThumb.appendChild(completedFinishToolTip);
                        }
                        setTaskDraggingThumbs(thumb, startThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight, items, ganttChartView, settings);
                        if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
                            var startDependencyThumb, dependencyThumb;
                            startDependencyThumb = null;
                            if (typeof settings.allowCreatingStartDependencies === undefinedType || settings.allowCreatingStartDependencies) {
                                startDependencyThumb = document.createElementNS(svgns, "circle");
                                startDependencyThumb.setAttribute("cx", itemLeft - (settings.classic ? 0 : 8));
                                startDependencyThumb.setAttribute("cy", settings.barMargin + settings.barHeight / 2);
                                startDependencyThumb.setAttribute("r", settings.barHeight / (settings.classic ? 4 : 3));
                                startDependencyThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer");
                                group.appendChild(startDependencyThumb);
                            }
                            dependencyThumb = document.createElementNS(svgns, "circle");
                            dependencyThumb.setAttribute("cx", itemRight - 2 + (settings.classic ? 0 : 9));
                            dependencyThumb.setAttribute("cy", settings.barMargin + settings.barHeight / 2);
                            dependencyThumb.setAttribute("r", settings.barHeight / (settings.classic ? 4 : 3));
                            dependencyThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer;");
                            group.appendChild(dependencyThumb);
                            setDependencyDraggingThumbs(dependencyThumb, startDependencyThumb, group, item, settings.barMargin + settings.barHeight / 2, itemRight - 2, itemLeft, items, ganttChartView, settings);
                        }
                    }
                    return group;
                };
            },
            getDefaultSummaryTaskTemplate = function (items, ganttChartView, settings) {
                var oItems = items, oGanttChartView = ganttChartView, oSettings = settings;
                return function (item) {
                    var ganttChartView = typeof oGanttChartView !== undefinedType ? oGanttChartView : item.ganttChartView;
                    var settings = typeof oSettings !== undefinedType ? oSettings : ganttChartView.settings;
                    var items = typeof oItems !== undefinedType ? oItems : ganttChartView.items;
                    var document = ganttChartView.ownerDocument;
                    var group = getChartItemArea(item);
                    var itemLeft = getChartPosition(item.start, settings);
                    var itemRight = getChartPosition(item.finish, settings);
                    var height = settings.barHeight * 2.15 / 3;
                    var bar = document.createElementNS(svgns, "rect");
                    bar.setAttribute("x", itemLeft);
                    bar.setAttribute("y", settings.barMargin);
                    bar.setAttribute("width", Math.max(0, itemRight - itemLeft - 1));
                    bar.setAttribute("height", height);
                    var barClass = settings.summaryBarClass;
                    if (typeof item.summaryBarClass !== undefinedType)
                        barClass = item.summaryBarClass;
                    if (typeof item.barClass !== undefinedType)
                        barClass = item.barClass;
                    if (typeof barClass !== undefinedType)
                        bar.setAttribute("class", barClass);
                    else {
                        var barStyle = settings.summaryBarStyle;
                        if (typeof item.summaryBarStyle !== undefinedType)
                            barStyle = item.summaryBarStyle;
                        if (typeof item.barStyle !== undefinedType)
                            barStyle = item.barStyle;
                        if (typeof barStyle !== undefinedType)
                            bar.setAttribute("style", barStyle);
                    }
                    group.appendChild(bar);
                    if (settings.isTaskCompletedEffortVisible && settings.isSummaryTaskCompletedEffortVisible) {
                        var completedBar = document.createElementNS(svgns, "rect");
                        completedBar.setAttribute("x", itemLeft);
                        completedBar.setAttribute("y", settings.barMargin + settings.completedBarMargin * 2.15 / 3);
                        completedBar.setAttribute("width", Math.max(0, itemRight - itemLeft - 1) * ganttChartView.getItemCompletion(item));
                        completedBar.setAttribute("height", settings.completedBarHeight * 2.15 / 3);
                        completedBar.setAttribute("rx", settings.completedBarCornerRadius);
                        completedBar.setAttribute("ry", settings.completedBarCornerRadius);
                        var completedBarClass = settings.summaryCompletedBarClass;
                        if (typeof item.summaryCompletedBarClass !== undefinedType)
                            completedBarClass = item.summaryCompletedBarClass;
                        if (typeof item.completedBarClass !== undefinedType)
                            completedBarClass = item.completedBarClass;
                        if (typeof completedBarClass !== undefinedType)
                            completedBar.setAttribute("class", completedBarClass);
                        else {
                            var completedBarStyle = settings.summaryCompletedBarStyle;
                            if (typeof item.summaryCompletedBarStyle !== undefinedType)
                                completedBarStyle = item.summaryCompletedBarStyle;
                            if (typeof item.completedBarStyle !== undefinedType)
                                completedBarStyle = item.completedBarStyle;
                            if (typeof completedBarStyle !== undefinedType)
                                completedBar.setAttribute("style", completedBarStyle);
                        }
                        group.appendChild(completedBar);
                    }
                    if (!item.isExpanded) {
                        var line = document.createElementNS(svgns, "line");
                        line.setAttribute("x1", itemLeft);
                        line.setAttribute("y1", settings.barMargin + height + 2.5);
                        line.setAttribute("x2", itemRight - 1);
                        line.setAttribute("y2", settings.barMargin + height + 2.5);
                        var lineClass = settings.collapsedSummaryLineClass;
                        if (typeof item.collapsedSummaryLineClass !== undefinedType)
                            lineClass = item.collapsedSummaryLineClass;
                        if (typeof lineClass !== undefinedType)
                            line.setAttribute("class", lineClass);
                        else {
                            var lineStyle = settings.collapsedSummaryLineStyle;
                            if (typeof item.collapsedSummaryLineStyle !== undefinedType)
                                lineStyle = item.collapsedSummaryLineStyle;
                            if (typeof lineStyle !== undefinedType)
                                line.setAttribute("style", lineStyle);
                        }
                        group.appendChild(line);
                    }
                    var startTriangle = document.createElementNS(svgns, "polygon"), x;
                    var y = settings.barMargin - 0.25, h = height + 1.5, tw = settings.barHeight * 3 / 4, teh = settings.barHeight / 4;
                    x = itemLeft - 1 - settings.barHeight / 3;
                    startTriangle.setAttribute("points", x + "," + y + " " + x + "," + (y + h) + " " + (x + tw / 2) + "," + (y + h + teh) + " " + (x + tw) + "," + (y + h) + " " + (x + tw) + "," + y);
                    if (typeof barClass !== undefinedType)
                        startTriangle.setAttribute("class", barClass);
                    if (typeof barStyle !== undefinedType)
                        startTriangle.setAttribute("style", barStyle);
                    group.appendChild(startTriangle);
                    var endTriangle = document.createElementNS(svgns, "polygon");
                    x = itemRight + settings.barHeight / 3;
                    endTriangle.setAttribute("points", x + "," + y + " " + x + "," + (y + h) + " " + (x - tw / 2) + "," + (y + h + teh) + " " + (x - tw) + "," + (y + h) + " " + (x - tw) + "," + y);
                    if (typeof barClass !== undefinedType)
                        endTriangle.setAttribute("class", barClass);
                    if (typeof barStyle !== undefinedType)
                        endTriangle.setAttribute("style", barStyle);
                    group.appendChild(endTriangle);
                    if (settings.areSummaryTaskLabelsVisible && item.label) {
                        var labelColor = item.labelColor ? item.labelColor : (settings.summaryLabelColor ? settings.summaryLabelColor : 'white');
                        var label = getLabel(item, group, itemLeft, itemRight, labelColor);
                        var labelClass = settings.summaryLabelClass;
                        if (typeof item.labelClass !== undefinedType)
                            labelClass = item.labelClass;
                        if (typeof labelClass !== undefinedType)
                            label.setAttribute("class", labelClass);
                        else {
                            var labelStyle = settings.summaryLabelStyle;
                            if (typeof item.labelStyle !== undefinedType)
                                labelStyle = item.labelStyle;
                            if (typeof labelStyle !== undefinedType)
                                label.setAttribute("style", labelStyle);
                        }
                    }
                    if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
                        if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
                            var startDependencyThumb = null;
                            if (typeof settings.allowCreatingStartDependencies === undefinedType || settings.allowCreatingStartDependencies) {
                                startDependencyThumb = document.createElementNS(svgns, "circle");
                                startDependencyThumb.setAttribute("cx", itemLeft - 0.5);
                                startDependencyThumb.setAttribute("cy", settings.barMargin + settings.barHeight / 2);
                                startDependencyThumb.setAttribute("r", settings.barHeight / (settings.classic ? 4 : 3));
                                startDependencyThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer");
                                group.appendChild(startDependencyThumb);
                            }
                            var dependencyThumb = document.createElementNS(svgns, "circle");
                            dependencyThumb.setAttribute("cx", itemRight - 0.5);
                            dependencyThumb.setAttribute("cy", settings.barMargin + settings.barHeight / 2);
                            dependencyThumb.setAttribute("r", settings.barHeight / (settings.classic ? 4 : 3));
                            dependencyThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer");
                            group.appendChild(dependencyThumb);
                            setDependencyDraggingThumbs(dependencyThumb, startDependencyThumb, group, item, settings.barMargin + settings.barHeight / 2, itemRight - 1.5, itemLeft, items, ganttChartView, settings);
                        }
                    }
                    return group;
                };
            },
            getDefaultMilestoneTaskTemplate = function (items, ganttChartView, settings) {
                var oItems = items, oGanttChartView = ganttChartView, oSettings = settings;
                return function (item) {
                    var ganttChartView = typeof oGanttChartView !== undefinedType ? oGanttChartView : item.ganttChartView;
                    var settings = typeof oSettings !== undefinedType ? oSettings : ganttChartView.settings;
                    var items = typeof oItems !== undefinedType ? oItems : ganttChartView.items;
                    var document = ganttChartView.ownerDocument;
                    var group = getChartItemArea(item);
                    if (settings.isBaselineVisible && typeof item.baselineStart !== undefinedType) {
                        var itemBaselineLeft = getChartPosition(item.baselineStart, settings);
                        var baselineStartDiamond = document.createElementNS(svgns, "polygon");
                        var xb = itemBaselineLeft, yb = settings.barMargin - 1, hb = settings.barHeight + 1;
                        baselineStartDiamond.setAttribute("points", xb + "," + yb + " " + (xb - hb / 2) + "," + (yb + hb / 2) + " " + xb + "," + (yb + hb) + " " + (xb + hb / 2) + "," + (yb + hb / 2));
                        var baselineBarClass = settings.baselineBarClass;
                        if (typeof item.baselineBarClass !== undefinedType)
                            baselineBarClass = item.baselineBarClass;
                        if (typeof baselineBarClass !== undefinedType)
                            baselineStartDiamond.setAttribute("class", baselineBarClass);
                        else {
                            var baselineBarStyle = settings.baselineBarStyle;
                            if (typeof item.baselineBarStyle !== undefinedType)
                                baselineBarStyle = item.baselineBarStyle;
                        }
                        baselineStartDiamond.setAttribute("style", baselineBarStyle);
                        group.appendChild(baselineStartDiamond);
                    }
                    var itemLeft = getChartPosition(item.start, settings);
                    var startDiamond = document.createElementNS(svgns, "polygon");
                    var x = itemLeft - 1, y = settings.barMargin, h = settings.barHeight + 1;
                    startDiamond.setAttribute("points", x + "," + y + " " + (x - h / 2) + "," + (y + h / 2) + " " + x + "," + (y + h) + " " + (x + h / 2) + "," + (y + h / 2));
                    var barClass = settings.milestoneBarClass;
                    if (typeof item.milestoneBarClass !== undefinedType)
                        barClass = item.milestoneBarClass;
                    if (typeof item.barClass !== undefinedType)
                        barClass = item.barClass;
                    if (typeof barClass !== undefinedType)
                        startDiamond.setAttribute("class", barClass);
                    else {
                        var barStyle = settings.milestoneBarStyle;
                        if (typeof item.milestoneBarStyle !== undefinedType)
                            barStyle = item.milestoneBarStyle;
                        if (typeof item.barStyle !== undefinedType)
                            barStyle = item.barStyle;
                        if (typeof barStyle !== undefinedType)
                            startDiamond.setAttribute("style", barStyle);
                    }
                    group.appendChild(startDiamond);
                    if (settings.areMilestoneTaskLabelsVisible && item.label) {
                        var labelColor = item.labelColor ? item.labelColor : (settings.milestoneLabelColor ? settings.milestoneLabelColor : 'black');
                        var label = getLabel(item, group, itemLeft, null, labelColor);
                        var labelClass = settings.milestoneLabelClass;
                        if (typeof item.labelClass !== undefinedType)
                            labelClass = item.labelClass;
                        if (typeof labelClass !== undefinedType)
                            label.setAttribute("class", labelClass);
                        else {
                            var labelStyle = settings.milestoneLabelStyle;
                            if (typeof item.labelStyle !== undefinedType)
                                labelStyle = item.labelStyle;
                            if (typeof labelStyle !== undefinedType)
                                label.setAttribute("style", labelStyle);
                        }
                    }
                    if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && (typeof item.isBarReadOnly === undefinedType || !item.isBarReadOnly)) {
                        var thumb = document.createElementNS(svgns, "rect");
                        thumb.setAttribute("x", x - h / 2);
                        thumb.setAttribute("y", settings.barMargin);
                        thumb.setAttribute("width", h);
                        thumb.setAttribute("height", h);
                        thumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer");
                        group.appendChild(thumb);
                        setTaskDraggingThumbs(thumb, null, null, null, item, x, x, x, items, ganttChartView, settings);
                        if (settings.areTaskDependenciesVisible && !settings.areTaskPredecessorsReadOnly && !item.isPart) {
                            var dependencyThumb = document.createElementNS(svgns, "circle");
                            dependencyThumb.setAttribute("cx", x);
                            dependencyThumb.setAttribute("cy", settings.barMargin + settings.barHeight / 2 + (settings.classic ? 0 : 0.5));
                            dependencyThumb.setAttribute("r", settings.barHeight / (settings.classic ? 4 : 3));
                            dependencyThumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: pointer");
                            group.appendChild(dependencyThumb);
                            setDependencyDraggingThumbs(dependencyThumb, null, group, item, settings.barMargin + settings.barHeight / 2, x, x, items, ganttChartView, settings);
                        }
                    }
                    return group;
                };
            },
            getDefaultDependencyLineTemplate = function (items, settings) {
                var oItems = items, oSettings = settings;
                return function (item, predecessorItem) {
                    var ganttChartView = item.ganttChartView;
                    var settings = typeof oSettings !== undefinedType ? oSettings : ganttChartView.settings;
                    var items = typeof oItems !== undefinedType ? oItems : ganttChartView.items;
                    var document = ganttChartView.ownerDocument;
                    var group = document.createElementNS(svgns, "g");
                    var data = getDependencyLinePathData(item, predecessorItem, items, settings);
                    var polylineZone = document.createElementNS(svgns, "path");
                    polylineZone.setAttribute("d", data);
                    if (typeof settings.dependencyLineZoneClass !== undefinedType)
                        polylineZone.setAttribute("class", settings.dependencyLineZoneClass);
                    if (typeof settings.dependencyLineZoneStyle !== undefinedType)
                        polylineZone.setAttribute("style", settings.dependencyLineZoneStyle);
                    group.appendChild(polylineZone);
                    var polyline = document.createElementNS(svgns, "path");
                    polyline.setAttribute("d", data);
                    var polylineClass = settings.dependencyLineClass;
                    if (typeof predecessorItem.dependencyLineClass !== undefinedType)
                        polylineClass = predecessorItem.dependencyLineClass;
                    if (typeof polylineClass !== undefinedType)
                        polyline.setAttribute("class", polylineClass);
                    else {
                        var polylineStyle = settings.dependencyLineStyle;
                        if (typeof predecessorItem.dependencyLineStyle !== undefinedType)
                            polylineStyle = predecessorItem.dependencyLineStyle;
                        if (typeof polylineStyle !== undefinedType)
                            polyline.setAttribute("style", polylineStyle);
                    }
                    group.appendChild(polyline);
                    return group;
                };
            },
            getDefaultPredecessorItemTemplate = function (settings) {
                return function (item, predecessorItem) {
                    var document = item.ganttChartView.ownerDocument;
                    var toolTip = document.createElementNS(svgns, "title");
                    toolTip.appendChild(getTextNode(document, predecessorItem.item.content + " - " + item.content));
                    if (typeof settings.areToolTipsSimplified === undefinedType || !settings.areToolTipsSimplified) {
                        if (predecessorItem.dependencyType) {
                            toolTip.appendChild(document.createTextNode("\n"));
                            toolTip.appendChild(getTextNode(document, "Type: " + getDependencyTypeString(predecessorItem.dependencyType)));
                        }
                        if (predecessorItem.lag) {
                            toolTip.appendChild(document.createTextNode("\n"));
                            toolTip.appendChild(getTextNode(document, "Lag: " + (predecessorItem.lag / hourDuration) + "h"));
                        }
                    }
                    return toolTip;
                };
            },
            getDependencyTypeString = function (dependencyType) {
                switch (dependencyType) {
                    case "StartStart":
                    case "SS":
                        return "SS";
                    case "FinishFinish":
                    case "FF":
                        return "FF";
                    case "StartFinish":
                    case "SF":
                        return "SF";
                    case "FinishStart":
                    case "FS":
                    default:
                        return "FS";
                }
            },
            getDependencyLinePathData = function (item, predecessorItem, items, settings) {
                var y = getItemTop(predecessorItem.item, items, settings);
                var y1 = getItemTop(item, items, settings);
                var d = "M ", x, x1, x2, h = settings.itemHeight, h2 = h / 2, extraLineLength = h / 3.5, arrowSpace = 2, horizontal = false, x0;
                if (y == y1 && (typeof predecessorItem.dependencyType === undefinedType || predecessorItem.dependencyType == "FinishStart" || predecessorItem.dependencyType == "FS" || predecessorItem.dependencyType == "StartFinish" || predecessorItem.dependencyType == "SF")) {
                    if (typeof predecessorItem.dependencyType === undefinedType || predecessorItem.dependencyType == "FinishStart" || predecessorItem.dependencyType == "FS") {
                        x = getChartPosition(predecessorItem.item.finish, settings);
                        x1 = getChartPosition(item.start, settings);
                    }
                    else {
                        x = getChartPosition(predecessorItem.item.start, settings);
                        x1 = getChartPosition(item.finish, settings);
                    }
                    y = y - y1 + 0.5;
                    d += x + " " + (y + h2) + " L " + (x1 + (x1 > x ? -1 : +1) * (h / 5 - 1)) + " " + (y + h2);
                }
                else {
                    if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == "StartStart" || predecessorItem.dependencyType == "SS" || predecessorItem.dependencyType == "StartFinish" || predecessorItem.dependencyType == "SF")) {
                        x = getChartPosition(predecessorItem.item.start, settings);
                        if ((predecessorItem.item.hasChildren && (typeof predecessorItem.item.isSummaryEnabled === undefinedType || predecessorItem.item.isSummaryEnabled)))
                            x -= settings.barHeight / 3 + 0.25;
                        else if (predecessorItem.item.isMilestone)
                            x -= h / 4;
                        x1 = x - extraLineLength;
                    }
                    else {
                        x = getChartPosition(predecessorItem.item.finish, settings) - 1;
                        if (predecessorItem.item.hasChildren && (typeof predecessorItem.item.isSummaryEnabled === undefinedType || predecessorItem.item.isSummaryEnabled))
                            x += settings.barHeight / 3 + 0.25;
                        else if (predecessorItem.item.isMilestone)
                            x += h / 4;
                        else {
                            x0 = getChartPosition(predecessorItem.item.start, settings) + (settings.classic ? 4 : 12) - 1;
                            if (x < x0)
                                x = x0;
                        }
                        x1 = x + extraLineLength;
                    }
                    y = y - y1 + 0.5;
                    d += x + " " + (y + h2) + " L " + x1 + " " + (y + h2);
                    if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == "FinishFinish" || predecessorItem.dependencyType == "FF" || predecessorItem.dependencyType == "StartFinish" || predecessorItem.dependencyType == "SF")) {
                        x = getChartPosition(item.finish, settings) - 1;
                        if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == "FinishFinish" || predecessorItem.dependencyType == "FF")) {
                            horizontal = true;
                            if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                                x += settings.barHeight / 3 + 1;
                            else if (item.isMilestone)
                                x += h / 4 + 1;
                            else {
                                x0 = getChartPosition(item.start, settings) + (settings.classic ? 4 : 12) - 1;
                                if (x < x0)
                                    x = x0;
                            }
                            x2 = x + extraLineLength;
                        }
                        else {
                            if (item.isMilestone)
                                x2 = x;
                            else {
                                x0 = getChartPosition(item.start, settings) + (settings.classic ? 4 : 12);
                                if (x < x0)
                                    x = x0;
                                x2 = x - 2.5;
                            }
                        }
                    }
                    else {
                        x = getChartPosition(item.start, settings);
                        if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == "StartStart" || predecessorItem.dependencyType == "SS")) {
                            horizontal = true;
                            if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                                x -= settings.barHeight / 3 + 1;
                            else if (item.isMilestone)
                                x -= h / 4 + 1;
                            x2 = x - extraLineLength;
                        }
                        else {
                            if (item.isMilestone)
                                x2 = x - 1;
                            else {
                                x2 = x + 1.5;
                                var xf = getChartPosition(item.finish, settings);
                                if (x2 < x1 && xf - x1 > extraLineLength * 2 && item.start >= predecessorItem.item.finish)
                                    x2 = x1;
                            }
                        }
                    }
                    if (typeof predecessorItem.dependencyType !== undefinedType && (predecessorItem.dependencyType == "StartStart" || predecessorItem.dependencyType == "SS" || predecessorItem.dependencyType == "StartFinish" || predecessorItem.dependencyType == "SF")) {
                        if (x2 > x1) {
                            y -= extraLineLength / 6;
                            if (y <= 0)
                                y += h2;
                            else
                                y -= h2;
                            d += " " + x1 + " " + (y + h2);
                        }
                        d += " " + x2 + " " + (y + h2);
                    }
                    else {
                        if (x2 < x1) {
                            y -= extraLineLength / 6;
                            if (y <= 0)
                                y += h2;
                            else
                                y -= h2;
                            d += " " + x1 + " " + (y + h2);
                        }
                        d += " " + x2 + " " + (y + h2);
                    }
                    if (horizontal)
                        y = h2 + 0.5;
                    else if (y <= 0)
                        y = settings.barMargin - 1 - arrowSpace;
                    else
                        y = h - settings.barMargin + 1 + arrowSpace;
                    if (horizontal) {
                        if (x2 > x - arrowSpace)
                            arrowSpace = -arrowSpace;
                        x -= arrowSpace;
                    }
                    d += " " + x2 + " " + y;
                    if (horizontal)
                        d += " " + x + " " + y;
                }
                return d;
            },
            onItemExpansionPropertyChanged = function (item) {
                if (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings.itemExpansionChangeHandler !== undefinedType)
                    item.ganttChartView.settings.itemExpansionChangeHandler(item, item.isExpanded);
            },
            onItemSelectionPropertyChanged = function (item, isDirect) {
                if (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings.itemSelectionChangeHandler !== undefinedType)
                    item.ganttChartView.settings.itemSelectionChangeHandler(item, item.isSelected, isDirect);
            },
            onItemPropertyChanged = function (item, propertyName, isDirect, isFinal) {
                if (typeof item.ganttChartView !== undefinedType) {
                    var ganttChartView = item.ganttChartView;
                    var settings = ganttChartView.settings;
                    if (propertyName == "start" || propertyName == "minStart" || propertyName == "maxStart") {
                        if (typeof item.minStart !== undefinedType && item.start < item.minStart) {
                            item.start = item.minStart;
                            if (typeof item.loadChartItem === undefinedType)
                                item.start = ensureWorkingTime(item.start, settings, true, typeof item.isMilestone !== undefinedType && item.isMilestone, getItemSchedule(item));
                            if (isDirect)
                                item.preferredStart = item.start;
                        }
                        else if (typeof item.maxStart !== undefinedType && item.start > item.maxStart) {
                            item.start = item.maxStart;
                            if (typeof item.loadChartItem === undefinedType)
                                item.start = ensureWorkingTime(item.start, settings, true, typeof item.isMilestone !== undefinedType && item.isMilestone, getItemSchedule(item));
                            if (isDirect)
                                item.preferredStart = item.start;
                        }
                        if (item.finish < item.start) {
                            item.finish = item.start;
                            onItemPropertyChanged(item, "finish", false, true);
                        }
                        if (item.completedFinish < item.start) {
                            item.completedFinish = item.start;
                            onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                        else if (item.completedFinish > item.finish) {
                            item.completedFinish = item.finish;
                            onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                    }
                    else if (propertyName == "finish" || propertyName == "minFinish" || propertyName == "maxFinish") {
                        if (typeof item.maxFinish !== undefinedType && item.finish > item.maxFinish) {
                            item.finish = item.maxFinish;
                            if (typeof item.loadChartItem === undefinedType)
                                item.finish = ensureWorkingTime(item.finish, settings, typeof item.isMilestone !== undefinedType && item.isMilestone, true, getItemSchedule(item));
                        }
                        else if (typeof item.minFinish !== undefinedType && item.finish < item.minFinish) {
                            item.finish = item.minFinish;
                            if (typeof item.loadChartItem === undefinedType)
                                item.finish = ensureWorkingTime(item.finish, settings, typeof item.isMilestone !== undefinedType && item.isMilestone, true, getItemSchedule(item));
                        }
                        if (item.finish < item.start) {
                            item.finish = item.start;
                            onItemPropertyChanged(item, "finish", false, true);
                        }
                        if (item.completedFinish < item.start) {
                            item.completedFinish = item.start;
                            onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                        else if (item.completedFinish > item.finish) {
                            item.completedFinish = item.finish;
                            onItemPropertyChanged(item, "completedFinish", false, true);
                        }
                    }
                    if (ganttChartView.isTimingInformationInitialized) {
                        var items = ganttChartView.items, i, it;
                        if (propertyName == "indentation" || propertyName == "predecessors") {
                            for (i = 0; i < items.length; i++) {
                                it = items[i];
                                if (typeof it.dependsOf !== undefinedType)
                                    delete it.dependsOf;
                            }
                        }
                        if (propertyName == "predecessors" && settings.alwaysHandleInvalidDependencies) {
                            it = item;
                            if (typeof it.predecessors !== undefinedType && it.predecessors.length > 0)
                                ensureItemDependencyConstraints(it, items, settings, ganttChartView, true);
                        }
                        else if ((propertyName == "predecessors" || propertyName == "start" || propertyName == "finish") && typeof item.isDuringPropertyChangeTaskDependencyConstraintsEnsuring === undefinedType && settings.areTaskDependencyConstraintsEnabled && (settings.areTaskDependencyConstraintsEnabledWhileDragging || typeof ganttChartView.isDuringTimeDragOperation === undefinedType)) {
                            item.isDuringPropertyChangeTaskDependencyConstraintsEnsuring = true;
                            it = item.parent;
                            while (it != null) {
                                if (typeof it.predecessors !== undefinedType && it.predecessors.length > 0)
                                    ensureItemDependencyConstraints(it, items, settings, ganttChartView);
                                it = it.parent;
                            }
                            it = item;
                            if (typeof it.predecessors !== undefinedType && it.predecessors.length > 0)
                                ensureItemDependencyConstraints(it, items, settings, ganttChartView);
                            else
                                ensureItemPreferredStart(it, settings);
                            while (it != null) {
                                if (typeof it.successors === undefinedType) {
                                    it.successors = [];
                                    for (i = 0; i < items.length; i++) {
                                        var successorItem = items[i];
                                        if (successorItem == it || typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                                            continue;
                                        for (var j = 0; j < successorItem.predecessors.length; j++) {
                                            if (successorItem.predecessors[j].item == it) {
                                                it.successors.push(successorItem);
                                                break;
                                            }
                                        }
                                    }
                                }
                                for (i = 0; i < it.successors.length; i++)
                                    ensureItemDependencyConstraints(it.successors[i], items, settings, ganttChartView);
                                it = it.parent;
                            }
                            delete item.isDuringPropertyChangeTaskDependencyConstraintsEnsuring;
                        }
                        if (item.isPart && item.ganttChartItem)
                            onItemPropertyChanged(item.ganttChartItem, "parts", false, true);
                    }
                    if (propertyName == "assignmentsContent" && !item.hasChildren && item.hasFixedEffort && typeof item.fixedEffortAssignments !== undefinedType && item.fixedEffortUpdatesFinish) {
                        var totalAllocation = 0, fixedTotalAllocation = 0;
                        var assignments = ganttChartView.getItemAssignments(item);
                        for (var i = 0; i < assignments.length; i++)
                            totalAllocation += assignments[i].value;
                        for (var i = 0; i < item.fixedEffortAssignments.length; i++)
                            fixedTotalAllocation += item.fixedEffortAssignments[i].value;
                        if (totalAllocation <= 0)
                            totalAllocation = 1;
                        if (fixedTotalAllocation <= 0)
                            fixedTotalAllocation = 1;
                        ganttChartView.setItemEffort(item, ganttChartView.getItemEffort(item) * fixedTotalAllocation / totalAllocation);
                    }
                    if ((propertyName == "start" || propertyName == "finish") && !item.hasChildren && item.hasFixedEffort && typeof item.fixedEffort !== undefinedType && !item.fixedEffortUpdatesFinish) {
                        var effortChangeRate = ganttChartView.getItemEffort(item) / item.fixedEffort;
                        var assignments = "";
                        for (var i = 0; i < item.fixedEffortAssignments.length; i++) {
                            var assignment = item.fixedEffortAssignments[i];
                            if (assignments.length > 0)
                                assignments += ", ";
                            var value = Math.floor(assignment.value / effortChangeRate * 1000000) / 1000000;
                            assignments += assignment.key + (value != 1 ? " [" + value * 100 + "%]" : "");
                        }
                        ganttChartView.setItemAssignmentsContent(item, assignments);
                    }
                    settings.itemPropertyChangeHandler(item, propertyName, isDirect, isFinal);
                    if (propertyName == "isExpanded")
                        onItemExpansionPropertyChanged(item);
                    else if (propertyName == "isSelected")
                        onItemSelectionPropertyChanged(item, isDirect);
                    if (typeof item.scheduleChartView !== undefinedType && propertyName == "content")
                        item.scheduleChartView.refreshScheduleChartItem(item);
                }
            },
            ensureItemPreferredStart = function (item, settings) {
                if (typeof item.isAwaitingPreferredStartUpdates !== undefinedType)
                    return;
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    for (var i = 0; i < item.children.length; i++)
                        ensureItemPreferredStart(item.children[i], settings);
                    return;
                }
                if (typeof item.preferredStart !== undefinedType && item.preferredStart < item.start) {
                    item.isAwaitingPreferredStartUpdates = true;
                    var originalStart = item.start.valueOf(), originalFinish = item.finish.valueOf(), originalCompletedFinish = item.completedFinish.valueOf();
                    effort = getEffort(item.start, item.finish, settings, getItemSchedule(item));
                    completedEffort = getEffort(item.start, item.completedFinish, settings, getItemSchedule(item));
                    item.start = item.preferredStart;
                    item.finish = getFinish(item.start, effort, settings, getItemSchedule(item));
                    item.completedFinish = getFinish(item.start, completedEffort, settings, getItemSchedule(item));
                    if (item.start.valueOf() != originalStart)
                        onItemPropertyChanged(item, "start", false, false);
                    if (item.finish.valueOf() != originalFinish)
                        onItemPropertyChanged(item, "finish", false, false);
                    if (item.completedFinish.valueOf() != originalCompletedFinish)
                        onItemPropertyChanged(item, "completedFinish", false, false);
                    setTimeout(function () {
                        if (item.start.valueOf() != originalStart)
                            onItemPropertyChanged(item, "start", false, true);
                        if (item.finish.valueOf() != originalFinish)
                            onItemPropertyChanged(item, "finish", false, true);
                        if (item.completedFinish.valueOf() != originalCompletedFinish)
                            onItemPropertyChanged(item, "completedFinish", false, true);
                        if (item.start.valueOf() != originalStart || item.finish.valueOf() != originalFinish || item.completedFinish.valueOf() != originalCompletedFinish)
                            refreshItemPath(item);
                        delete item.isAwaitingPreferredStartUpdates;
                    }, 1);
                }
            },
            ensureItemDependencyConstraints = function (item, items, settings, ganttChartView, onlyDetectInvalidDependencies) {
                if (onlyDetectInvalidDependencies) {
                    if (!ganttChartView.isBasicTimingInformationInitialized)
                        return;
                    var i, newPredecessors = [], predecessorItem, werePredecessorsInvalid = false;
                    for (i = 0; i < item.predecessors.length; i++) {
                        predecessorItem = item.predecessors[i];
                        if (typeof predecessorItem.item === undefinedType || items.indexOf(predecessorItem.item) < 0 || dependsOf(predecessorItem.item, item)) {
                            if (settings.invalidPredecessorDetectionHandler)
                                settings.invalidPredecessorDetectionHandler(predecessorItem, item, predecessorItem.item);
                            werePredecessorsInvalid = true;
                            continue;
                        }
                        newPredecessors.push(predecessorItem);
                    }
                    item.predecessors = newPredecessors;
                    if (werePredecessorsInvalid) {
                        onItemPropertyChanged(item, "predecessors", false, true);
                        if (typeof item.ganttChartView !== undefinedType)
                            refreshItemGraph(item);
                    }
                    return;
                }
                if (!ganttChartView.isBasicTimingInformationInitialized || (typeof item.areDependencyConstraintsEnabled !== undefinedType && !item.areDependencyConstraintsEnabled))
                    return;
                ensureItemPreferredStart(item, settings);
                var i, newPredecessors = [], predecessorItem, werePredecessorsInvalid = false;
                for (i = 0; i < item.predecessors.length; i++) {
                    predecessorItem = item.predecessors[i];
                    if (typeof predecessorItem.item === undefinedType || items.indexOf(predecessorItem.item) < 0 || dependsOf(predecessorItem.item, item)) {
                        if (settings.invalidPredecessorDetectionHandler)
                            settings.invalidPredecessorDetectionHandler(predecessorItem, item, predecessorItem.item);
                        werePredecessorsInvalid = true;
                        continue;
                    }
                    newPredecessors.push(predecessorItem);
                }
                item.predecessors = newPredecessors;
                if (werePredecessorsInvalid) {
                    onItemPropertyChanged(item, "predecessors", false, true);
                    if (typeof item.ganttChartView !== undefinedType)
                        refreshItemGraph(item);
                }
                for (i = 0; i < item.predecessors.length; i++) {
                    predecessorItem = item.predecessors[i];
                    ensurePredecessorItemDependencyConstraints(item, predecessorItem, items, settings);
                }
            },
            ensurePredecessorItemDependencyConstraints = function (targetItem, predecessorItem, items, settings) {
                if (targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled)) {
                    for (var i = 0; i < targetItem.children.length; i++)
                        ensurePredecessorItemDependencyConstraints(targetItem.children[i], predecessorItem, items, settings);
                    return;
                }
                if ((typeof settings.areDependencyConstraintsAppliedOnMilestones !== undefinedType && !settings.areDependencyConstraintsAppliedOnMilestones && targetItem.isMilestone) ||
                    (typeof settings.areDependencyConstraintsAppliedOnStartedTasks !== undefinedType && !settings.areDependencyConstraintsAppliedOnStartedTasks && hasStarted(targetItem)))
                    return;
                var sourceItem = predecessorItem.item;
                var dateValue, effort, completedEffort, changes = false;
                if (typeof predecessorItem.dependencyType === undefinedType || predecessorItem.dependencyType == "" || predecessorItem.dependencyType == "FinishStart" || predecessorItem.dependencyType == "FS") {
                    dateValue = sourceItem.finish;
                    if (typeof predecessorItem.lag !== undefinedType && predecessorItem.lag != 0)
                        dateValue = getFinish(dateValue, predecessorItem.lag, settings, getItemSchedule(targetItem));
                    if (targetItem.start < dateValue) {
                        if (!targetItem.isMilestone && !(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                            effort = getEffort(targetItem.start, targetItem.finish, settings, getItemSchedule(targetItem));
                            completedEffort = getEffort(targetItem.start, targetItem.completedFinish, settings, getItemSchedule(targetItem));
                        }
                        if (!(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                            var originalStart = targetItem.start.valueOf(), originalFinish = targetItem.finish.valueOf(), originalCompletedFinish = targetItem.completedFinish.valueOf();
                            targetItem.start = ensureWorkingTime(applyUpdateScale(dateValue, settings), settings, true, targetItem.isMilestone, getItemSchedule(targetItem));
                            if (targetItem.start.valueOf() != originalStart)
                                onItemPropertyChanged(targetItem, "start", false, true);
                            if (!targetItem.isMilestone) {
                                targetItem.finish = getFinish(targetItem.start, effort, settings, getItemSchedule(targetItem));
                                if (targetItem.finish.valueOf() != originalFinish)
                                    onItemPropertyChanged(targetItem, "finish", false, true);
                                targetItem.completedFinish = getFinish(targetItem.start, completedEffort, settings, getItemSchedule(targetItem));
                                if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                    onItemPropertyChanged(targetItem, "completedFinish", false, true);
                            }
                            else {
                                targetItem.finish = targetItem.start;
                                if (targetItem.finish.valueOf() != originalFinish)
                                    onItemPropertyChanged(targetItem, "finish", false, true);
                                targetItem.completedFinish = targetItem.start;
                                if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                    onItemPropertyChanged(targetItem, "completedFinish", false, true);
                            }
                            changes = true;
                        }
                    }
                }
                else if (predecessorItem.dependencyType == "StartStart" || predecessorItem.dependencyType == "SS") {
                    dateValue = sourceItem.start;
                    if (typeof predecessorItem.lag !== undefinedType && predecessorItem.lag != 0)
                        dateValue = getFinish(dateValue, predecessorItem.lag, settings, getItemSchedule(targetItem));
                    if (targetItem.start < dateValue) {
                        if (!targetItem.isMilestone && !(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                            effort = getEffort(targetItem.start, targetItem.finish, settings, getItemSchedule(targetItem));
                            completedEffort = getEffort(targetItem.start, targetItem.completedFinish, settings, getItemSchedule(targetItem));
                        }
                        if (!(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                            var originalStart = targetItem.start.valueOf(), originalFinish = targetItem.finish.valueOf(), originalCompletedFinish = targetItem.completedFinish.valueOf();
                            targetItem.start = ensureWorkingTime(applyUpdateScale(dateValue, settings), settings, true, targetItem.isMilestone, getItemSchedule(targetItem));
                            if (targetItem.start.valueOf() != originalStart)
                                onItemPropertyChanged(targetItem, "start", false, true);
                            if (!targetItem.isMilestone) {
                                targetItem.finish = getFinish(targetItem.start, effort, settings, getItemSchedule(targetItem));
                                if (targetItem.finish.valueOf() != originalFinish)
                                    onItemPropertyChanged(targetItem, "finish", false, true);
                                targetItem.completedFinish = getFinish(targetItem.start, completedEffort, settings, getItemSchedule(targetItem));
                                if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                    onItemPropertyChanged(targetItem, "completedFinish", false, true);
                            }
                            else {
                                targetItem.finish = targetItem.start;
                                if (targetItem.finish.valueOf() != originalFinish)
                                    onItemPropertyChanged(targetItem, "finish", false, true);
                                targetItem.completedFinish = targetItem.start;
                                if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                    onItemPropertyChanged(targetItem, "completedFinish", false, true);
                            }
                            changes = true;
                        }
                    }
                }
                else if (predecessorItem.dependencyType == "FinishFinish" || predecessorItem.dependencyType == "FF") {
                    dateValue = sourceItem.finish;
                    if (typeof predecessorItem.lag !== undefinedType && predecessorItem.lag != 0)
                        dateValue = getFinish(dateValue, predecessorItem.lag, settings, getItemSchedule(targetItem));
                    if (targetItem.finish > dateValue) {
                        if (!(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                            var originalFinish = targetItem.finish.valueOf(), originalCompletedFinish = targetItem.completedFinish.valueOf();
                            targetItem.finish = ensureWorkingTime(applyUpdateScale(dateValue, settings), settings, targetItem.isMilestone, true, getItemSchedule(targetItem));
                            if (targetItem.finish < targetItem.start)
                                targetItem.finish = targetItem.start;
                            if (targetItem.finish.valueOf() != originalFinish)
                                onItemPropertyChanged(targetItem, "finish", false, true);
                            if (!targetItem.isMilestone) {
                                if (targetItem.completedFinish > targetItem.finish) {
                                    targetItem.completedFinish = targetItem.finish;
                                    if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                        onItemPropertyChanged(targetItem, "completedFinish", false, true);
                                }
                            }
                            else {
                                if (targetItem.completedFinish != targetItem.start) {
                                    targetItem.completedFinish = targetItem.start;
                                    if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                        onItemPropertyChanged(targetItem, "completedFinish", false, true);
                                }
                            }
                            changes = true;
                        }
                    }
                }
                else if (predecessorItem.dependencyType == "StartFinish" || predecessorItem.dependencyType == "SF") {
                    dateValue = sourceItem.start;
                    if (typeof predecessorItem.lag !== undefinedType && predecessorItem.lag != 0)
                        dateValue = getFinish(dateValue, predecessorItem.lag, settings, getItemSchedule(targetItem));
                    if (targetItem.finish > dateValue) {
                        if (!(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                            var originalFinish = targetItem.finish.valueOf(), originalCompletedFinish = targetItem.completedFinish.valueOf();
                            targetItem.finish = ensureWorkingTime(applyUpdateScale(dateValue, settings), settings, targetItem.isMilestone, true, getItemSchedule(targetItem));
                            if (targetItem.finish < targetItem.start)
                                targetItem.finish = targetItem.start;
                            if (targetItem.finish.valueOf() != originalFinish)
                                onItemPropertyChanged(targetItem, "finish", false, true);
                            if (!targetItem.isMilestone) {
                                if (targetItem.completedFinish > targetItem.finish) {
                                    targetItem.completedFinish = targetItem.finish;
                                    if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                        onItemPropertyChanged(targetItem, "completedFinish", false, true);
                                }
                            }
                            else {
                                if (targetItem.completedFinish != targetItem.start) {
                                    targetItem.completedFinish = targetItem.start;
                                    if (targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                        onItemPropertyChanged(targetItem, "completedFinish", false, true);
                                }
                            }
                            if (targetItem.start.valueOf() != originalStart || targetItem.finish.valueOf() != originalFinish || targetItem.completedFinish.valueOf() != originalCompletedFinish)
                                changes = true;
                        }
                    }
                }
                if (!changes)
                    return;
                var item = targetItem;
                if (typeof item.ganttChartView === undefinedType || typeof item.isAwaitingEnsureItemDependencyConstraintsUpdates !== undefinedType)
                    return;
                if (typeof item.ganttChartView !== undefinedType && !item.ganttChartView.isTimingInformationInitialized) {
                    refreshItemPath(item);
                    return;
                }
                item.isAwaitingEnsureItemDependencyConstraintsUpdates = true;
                setTimeout(function () {
                    refreshItemPath(item);
                    delete item.isAwaitingEnsureItemDependencyConstraintsUpdates;
                }, 0);
            },
            dependsOf = function (item, predecessorItem) {
                if (typeof item.dependsOf !== undefinedType && typeof item.dependsOf[predecessorItem.index] !== undefinedType)
                    return item.dependsOf[predecessorItem.index];
                if (typeof item.dependsOf === undefinedType)
                    item.dependsOf = {};
                if (item == predecessorItem)
                    return true;
                var parents = getAllParents(item);
                if (parents.indexOf(predecessorItem) >= 0) {
                    item.dependsOf[predecessorItem.index] = true;
                    return true;
                }
                var predecessorParents = getAllParents(predecessorItem);
                if (predecessorParents.indexOf(item) >= 0) {
                    item.dependsOf[predecessorItem.index] = true;
                    return true;
                }
                var directPredecessors = getPredecessors(item), k, p;
                for (k = 0; k < directPredecessors.length; k++) {
                    p = directPredecessors[k];
                    if (p == predecessorItem || p == item || parents.indexOf(p) >= 0 || predecessorParents.indexOf(p) >= 0 || dependsOf(p, predecessorItem)) {
                        item.dependsOf[predecessorItem.index] = true;
                        return true;
                    }
                }
                for (var i = 0; i < parents.length; i++) {
                    var parent = parents[i];
                    var parentPredecessors = getPredecessors(parent);
                    for (k = 0; k < parentPredecessors.length; k++) {
                        p = parentPredecessors[k];
                        if (p == predecessorItem || p == item || parents.indexOf(p) >= 0 || predecessorParents.indexOf(p) >= 0 || dependsOf(p, predecessorItem)) {
                            item.dependsOf[predecessorItem.index] = true;
                            return true;
                        }
                    }
                }
                var children = item.children;
                for (k = 0; k < children.length; k++) {
                    var child = children[k];
                    if (typeof child.predecessors !== undefinedType && child.predecessors.length > 0 && dependsOf(child, predecessorItem)) {
                        item.dependsOf[predecessorItem.index] = true;
                        return true;
                    }
                }
                item.dependsOf[predecessorItem.index] = false;
                return false;
            },
            getAllParents = function (item) {
                var parents = [];
                while (typeof item.parent !== undefinedType && item.parent != null) {
                    if (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)
                        parents.push(item.parent);
                    item = item.parent;
                }
                return parents;
            },
            getPredecessors = function (item) {
                var predecessors = [];
                if (typeof item.predecessors !== undefinedType && item.predecessors != null) {
                    for (var i = 0; i < item.predecessors.length; i++) {
                        if (typeof item.predecessors[i].item !== undefinedType)
                            predecessors.push(item.predecessors[i].item);
                    }
                }
                return predecessors;
            },
            applyVisibilityFilter = function (items, filter) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var visible = filter == null || filter(item);
                    item.isHidden = !visible;
                    if (visible) {
                        var p = item.parent;
                        while (p != null) {
                            p.isHidden = false;
                            p = p.parent;
                        }
                    }
                }
            },

        // Schedule information.
            getWorkingTime = function (dateTime, settings, schedule) {
                return ensureWorkingTime(dateTime, settings, true, true, schedule);
            },
            getStartWorkingTime = function (dateTime, settings, schedule) {
                return ensureWorkingTime(dateTime, settings, true, false, schedule);
            },
            getFinishWorkingTime = function (dateTime, settings, schedule) {
                return ensureWorkingTime(dateTime, settings, false, true, schedule);
            },
            ensureWorkingTime = function (dateTime, settings, allowStart, allowFinish, schedule) {
                var settingsVisibleDayStart = typeof schedule !== undefinedType && typeof schedule.workingDayStart !== undefinedType ? schedule.workingDayStart : settings.visibleDayStart;
                var settingsVisibleDayFinish = typeof schedule !== undefinedType && typeof schedule.workingDayFinish !== undefinedType ? schedule.workingDayFinish : settings.visibleDayFinish;
                var settingsWorkingWeekStart = typeof schedule !== undefinedType && typeof schedule.workingWeekStart !== undefinedType ? schedule.workingWeekStart : settings.workingWeekStart;
                var settingsWorkingWeekFinish = typeof schedule !== undefinedType && typeof schedule.workingWeekFinish !== undefinedType ? schedule.workingWeekFinish : settings.workingWeekFinish;
                var settingsSpecialNonworkingDays = typeof schedule !== undefinedType && typeof schedule.specialNonworkingDays !== undefinedType ? schedule.specialNonworkingDays : settings.specialNonworkingDays;
                var date = getDate(dateTime);
                var timeOfDay = getTimeOfDay(dateTime);
                if (timeOfDay < settingsVisibleDayStart || (!allowStart && timeOfDay == settingsVisibleDayStart)) {
                    if (!allowStart) {
                        date = subtractDay(date);
                        timeOfDay = settingsVisibleDayFinish;
                    }
                    else {
                        timeOfDay = settingsVisibleDayStart;
                    }
                }
                if (timeOfDay > settingsVisibleDayFinish || (!allowFinish && timeOfDay == settingsVisibleDayFinish)) {
                    if (!allowFinish) {
                        date = addDay(date);
                        timeOfDay = settingsVisibleDayStart;
                    }
                    else {
                        timeOfDay = settingsVisibleDayFinish;
                    }
                }
                var dayOfWeek = getDayOfWeek(date);
                while (dayOfWeek < settingsWorkingWeekStart || dayOfWeek > settingsWorkingWeekFinish || isSpecialNonworkingDay(date, settingsSpecialNonworkingDays)) {
                    if (allowStart) {
                        dayOfWeek++;
                        date = addDay(date);
                        timeOfDay = settingsVisibleDayStart;
                    }
                    else {
                        dayOfWeek--;
                        date = subtractDay(date);
                        timeOfDay = settingsVisibleDayFinish;
                    }
                    while (dayOfWeek < 0)
                        dayOfWeek += 7;
                    while (dayOfWeek >= 7)
                        dayOfWeek -= 7;
                }
                return new Date(date.valueOf() + timeOfDay);
            },
            getEffort = function (start, finish, settings, schedule) {
                if (finish.valueOf() < start.valueOf())
                    return -getEffort(finish, start, settings, schedule);
                if (finish.valueOf() == start.valueOf())
                    return 0;
                var settingsVisibleDayStart = typeof schedule !== undefinedType && typeof schedule.workingDayStart !== undefinedType ? schedule.workingDayStart : settings.visibleDayStart;
                var settingsVisibleDayFinish = typeof schedule !== undefinedType && typeof schedule.workingDayFinish !== undefinedType ? schedule.workingDayFinish : settings.visibleDayFinish;
                var settingsWorkingWeekStart = typeof schedule !== undefinedType && typeof schedule.workingWeekStart !== undefinedType ? schedule.workingWeekStart : settings.workingWeekStart;
                var settingsWorkingWeekFinish = typeof schedule !== undefinedType && typeof schedule.workingWeekFinish !== undefinedType ? schedule.workingWeekFinish : settings.workingWeekFinish;
                var settingsSpecialNonworkingDays = typeof schedule !== undefinedType && typeof schedule.specialNonworkingDays !== undefinedType ? schedule.specialNonworkingDays : settings.specialNonworkingDays;
                var effort = 0;
                var date = getDate(start);
                var timeOfDay = getTimeOfDay(start);
                if (timeOfDay < settingsVisibleDayStart)
                    timeOfDay = settingsVisibleDayStart;
                else if (timeOfDay >= settingsVisibleDayFinish) {
                    date = addDay(date);
                    timeOfDay = settingsVisibleDayStart;
                }
                var finishDate = getDate(finish);
                while (date < finishDate) {
                    var dayOfWeek = getDayOfWeek(date);
                    if (dayOfWeek >= settingsWorkingWeekStart && dayOfWeek <= settingsWorkingWeekFinish && !isSpecialNonworkingDay(date, settingsSpecialNonworkingDays))
                        effort += settingsVisibleDayFinish - timeOfDay;
                    date = addDay(date);
                    timeOfDay = settingsVisibleDayStart;
                }
                var finishTimeOfDay = getTimeOfDay(finish);
                if (finishTimeOfDay < settingsVisibleDayStart)
                    finishTimeOfDay = settingsVisibleDayStart;
                else if (finishTimeOfDay > settingsVisibleDayFinish)
                    finishTimeOfDay = settingsVisibleDayFinish;
                if (finishTimeOfDay > timeOfDay)
                    effort += finishTimeOfDay - timeOfDay;
                return effort;
            },
            getFinish = function (start, effort, settings, schedule) {
                if (effort < 0)
                    return getStart(-effort, start, settings, schedule);
                start = ensureWorkingTime(start, settings, true, false, schedule);
                if (effort == 0)
                    return start;
                var settingsVisibleDayStart = typeof schedule !== undefinedType && typeof schedule.workingDayStart !== undefinedType ? schedule.workingDayStart : settings.visibleDayStart;
                var settingsVisibleDayFinish = typeof schedule !== undefinedType && typeof schedule.workingDayFinish !== undefinedType ? schedule.workingDayFinish : settings.visibleDayFinish;
                var startTimeOfDay = getTimeOfDay(start);
                if (startTimeOfDay + effort < settingsVisibleDayFinish)
                    return new Date(start.valueOf() + effort);
                var deltaEffort = settingsVisibleDayFinish - startTimeOfDay;
                var finish = new Date(start.valueOf() + deltaEffort);
                effort -= deltaEffort;
                while (effort > 0) {
                    var finishTimeOfDay = getTimeOfDay(finish);
                    if (finishTimeOfDay > 0)
                        finish = ensureWorkingTime(addDay(getDate(finish)), settings, true, false, schedule);
                    else
                        finish = ensureWorkingTime(getDate(finish), settings, true, false, schedule);
                    if (settingsVisibleDayStart + effort < settingsVisibleDayFinish)
                        return new Date(finish.valueOf() + effort);
                    deltaEffort = settingsVisibleDayFinish - settingsVisibleDayStart;
                    finish = new Date(finish.valueOf() + deltaEffort);
                    effort -= deltaEffort;
                }
                return new Date(finish.valueOf());
            },
            getStart = function (effort, finish, settings, schedule) {
                if (effort < 0)
                    return getFinish(finish, -effort, settings, schedule);
                finish = ensureWorkingTime(finish, settings, false, true, schedule);
                if (effort == 0)
                    return finish;
                var settingsVisibleDayStart = typeof schedule !== undefinedType && typeof schedule.workingDayStart !== undefinedType ? schedule.workingDayStart : settings.visibleDayStart;
                var settingsVisibleDayFinish = typeof schedule !== undefinedType && typeof schedule.workingDayFinish !== undefinedType ? schedule.workingDayFinish : settings.visibleDayFinish;
                var finishTimeOfDay = getTimeOfDay(finish);
                if (finishTimeOfDay - effort > settingsVisibleDayStart)
                    return new Date(finish.valueOf() - effort);
                var deltaEffort = finishTimeOfDay - settingsVisibleDayStart;
                var start = new Date(finish.valueOf() - deltaEffort);
                effort -= deltaEffort;
                while (effort > 0) {
                    var startTimeOfDay = getTimeOfDay(start);
                    if (startTimeOfDay < dayDuration)
                        start = ensureWorkingTime(getDate(start), settings, false, true, schedule);
                    else
                        start = ensureWorkingTime(subtractDay(getDate(start)), settings, false, true, schedule);
                    if (settingsVisibleDayFinish - effort > settingsVisibleDayStart)
                        return new Date(start.valueOf() - effort);
                    deltaEffort = settingsVisibleDayFinish - settingsVisibleDayStart;
                    start = new Date(start.valueOf() - deltaEffort);
                    effort -= deltaEffort;
                }
                return new Date(start.valueOf());
            },
            getCompletion = function (start, completedFinish, finish, settings, schedule) {
                return getEffort(start, completedFinish, settings, schedule) / getEffort(start, finish, settings, schedule);
            },
            getCompletedFinish = function (start, completion, finish, settings, schedule) {
                return getFinish(start, completion * getEffort(start, finish, settings, schedule), settings, schedule);
            },
            getAllocationUnits = function (item) {
                var allocationUnits = 0, assignments = getItemAssignments(item);
                for (var j = 0; j < assignments.length; j++)
                    allocationUnits += assignments[j].value;
                if (allocationUnits == 0)
                    allocationUnits = 1;
                return allocationUnits;
            },
            getTotalEffort = function (item, effort) {
                return effort * getAllocationUnits(item);
            },
            isOnSchedule = function (item) {
                var current = new Date();
                current = new Date(current.valueOf() - current.getTimezoneOffset() * minuteDuration);
                return item.completedFinish >= current;
            },
            getItemTotalEffort = function (item) {
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    var effort = 0;
                    var children = item.children;
                    for (var i = 0; i < children.length; i++) {
                        var c = children[i];
                        effort += getItemTotalEffort(c);
                    }
                    return effort;
                }
                return getTotalEffort(item, item.ganttChartView.getItemEffort(item));
            },
            getItemTotalCompletedEffort = function (item) {
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    var effort = 0;
                    var children = item.children;
                    for (var i = 0; i < children.length; i++) {
                        var c = children[i];
                        effort += getItemTotalCompletedEffort(c);
                    }
                    return effort;
                }
                return getTotalEffort(item, item.ganttChartView.getItemCompletedEffort(item));
            },
            setItemTotalEffort = function (item, value) {
                item.ganttChartView.setItemEffort(item, value / getAllocationUnits(item));
            },
            setItemTotalCompletedEffort = function (item, value) {
                item.ganttChartView.setItemCompletedEffort(item, value / getAllocationUnits(item));
            },
            setItemHasFixedEffort = function (item, value, settings) {
                item.hasFixedEffort = value;
                if (!item.hasChildren && item.hasFixedEffort) {
                    item.fixedEffort = getItemEffort(item, settings);
                    item.fixedEffortAssignments = getItemAssignments(item);
                }
            },
            getItemSchedule = function (item) {
                if (item.schedule)
                    return item.schedule;
                if (item.scheduleChartItem)
                    return item.scheduleChartItem.schedule;
                var assignments = getItemAssignments(item);
                if (!assignments)
                    return undefined;
                var maxAllocationUnits = -Infinity, maxAssignedResource;
                for (var i = 0; i < assignments.length; i++) {
                    var assignment = assignments[i];
                    if (assignment.value > maxAllocationUnits) {
                        maxAssignedResource = assignment.key;
                        maxAllocationUnits = assignment.value;
                    }
                }
                var ganttChartView = item.ganttChartView;
                if (!ganttChartView || !ganttChartView.settings || !ganttChartView.settings.resourceSchedules)
                    return undefined;
                var maxAssignedResourceIndex = indexOfKey(ganttChartView.settings.resourceSchedules, maxAssignedResource);
                if (maxAssignedResourceIndex < 0 || !ganttChartView.settings.resourceSchedules[maxAssignedResourceIndex])
                    return undefined;
                return ganttChartView.settings.resourceSchedules[maxAssignedResourceIndex].value;
            },

        // Drag and drop.
            setTaskDraggingThumbs = function (thumb, startThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight, items, ganttChartView, settings) {
                var toolTip;
                function startDrag(e, withoutToolTip) {
                    ganttChartView.isDuringTimeDragOperation = true;
                    ganttChartView.draggingItem = item;
                    ganttChartView.dragType = "Start";
                    ganttChartView.style.cursor = thumb.style.cursor;
                    ganttChartView.draggingInitialX = e.clientX;
                    ganttChartView.draggingInitialStartPosition = itemLeft;
                    ganttChartView.draggingInitialFinishPosition = itemRight;
                    ganttChartView.draggingInitialCompletedFinishPosition = itemCompletedRight;
                    if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                        toolTip = DlhSoft.Controls.ToolTip.get(thumb);
                        if (!toolTip) {
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, thumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                        }
                        toolTip.setContent(settings.dateTimeFormatter(getFormattableDate(item.start)) + " – " + settings.dateTimeFormatter(getFormattableDate(item.finish)));
                        toolTip.show();
                        toolTip.originalX = toolTip.x;
                        ganttChartView.toolTip = toolTip;
                    }
                }
                thumb.addEventListener("mousedown", event(ganttChartView, thumb, "mousedown", function (e) {
                    if (e.button != 0)
                        return;
                    startDrag(e);
                    e.preventDefault();
                }, true), true);
                thumb.addEventListener("touchstart", event(ganttChartView, thumb, "touchstart", function (e) {
                    startDrag(e.touches[0], true);
                    e.preventDefault();
                    e.target.addEventListener("touchmove", event(ganttChartView, e.target, "touchmove", item.touchMoveHandler));
                    e.target.addEventListener("touchend", event(ganttChartView, e.target, "touchend", item.touchEndHandler));
                }, true), true);
                thumb.addEventListener("touchend", event(ganttChartView, thumb, "touchend", function (e) {
                    simulateEvent(thumb, "mouseover");
                    simulateEvent(thumb, "mousedown");
                    setTimeout(function () {
                        simulateEvent(thumb, "mouseout");
                    }, 2000);
                }, true), true);
                if (startThumb != null) {
                    function startDragStartOnly(e, withoutToolTip) {
                        ganttChartView.isDuringTimeDragOperation = true;
                        ganttChartView.draggingItem = item;
                        ganttChartView.dragType = "StartOnly";
                        ganttChartView.style.cursor = thumb.style.cursor;
                        ganttChartView.draggingInitialX = e.clientX;
                        ganttChartView.draggingInitialStartPosition = itemLeft;
                        if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                            toolTip = DlhSoft.Controls.ToolTip.get(startThumb);
                            if (!toolTip) {
                                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                                toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, startThumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                            }
                            toolTip.setContent(settings.dateTimeFormatter(getFormattableDate(item.start)) + " –");
                            toolTip.show();
                            toolTip.setHorizontalPosition(toolTip.x + 4);
                            toolTip.originalX = toolTip.x;
                            ganttChartView.toolTip = toolTip;
                        }
                    }
                    startThumb.addEventListener("mousedown", event(ganttChartView, startThumb, "mousedown", function (e) {
                        if (e.button != 0)
                            return;
                        startDragStartOnly(e);
                        e.preventDefault();
                    }, true), true);
                    startThumb.addEventListener("touchstart", event(ganttChartView, startThumb, "touchstart", function (e) {
                        startDragStartOnly(e.touches[0], true);
                        e.preventDefault();
                        e.target.addEventListener("touchmove", event(ganttChartView, e.target, "touchmove", item.touchMoveHandler));
                        e.target.addEventListener("touchend", event(ganttChartView, e.target, "touchend", item.touchEndHandler));
                    }, true), true);
                }
                if (finishThumb != null) {
                    function startDragFinish(e, withoutToolTip) {
                        ganttChartView.isDuringTimeDragOperation = true;
                        ganttChartView.draggingItem = item;
                        ganttChartView.dragType = "Finish";
                        ganttChartView.style.cursor = finishThumb.style.cursor;
                        ganttChartView.draggingInitialX = e.clientX;
                        ganttChartView.draggingInitialFinishPosition = itemRight;
                        if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                            toolTip = DlhSoft.Controls.ToolTip.get(finishThumb);
                            if (!toolTip) {
                                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                                toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, finishThumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                            }
                            toolTip.setContent("– " + settings.dateTimeFormatter(getFormattableDate(item.finish)));
                            toolTip.show();
                            toolTip.setHorizontalPosition(toolTip.x - toolTip.contentContainer.clientWidth);
                            toolTip.originalX = toolTip.x;
                            ganttChartView.toolTip = toolTip;
                        }
                    }
                    finishThumb.addEventListener("mousedown", event(ganttChartView, finishThumb, "mousedown", function (e) {
                        if (e.button != 0)
                            return;
                        startDragFinish(e);
                        e.preventDefault();
                    }, true), true);
                    finishThumb.addEventListener("touchstart", event(ganttChartView, finishThumb, "touchstart", function (e) {
                        startDragFinish(e.touches[0], true);
                        e.preventDefault();
                        e.target.addEventListener("touchmove", event(ganttChartView, e.target, "touchmove", item.touchMoveHandler));
                        e.target.addEventListener("touchend", event(ganttChartView, e.target, "touchend", item.touchEndHandler));
                    }, true), true);
                }
                if (completedFinishThumb != null) {
                    function startCompletedFinishThumbDrag(e, withoutToolTip) {
                        ganttChartView.isDuringTimeDragOperation = true;
                        ganttChartView.draggingItem = item;
                        ganttChartView.dragType = "CompletedFinish";
                        ganttChartView.style.cursor = completedFinishThumb.style.cursor;
                        ganttChartView.draggingInitialX = e.clientX;
                        ganttChartView.draggingInitialCompletedFinishPosition = itemCompletedRight;
                        if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                            toolTip = DlhSoft.Controls.ToolTip.get(completedFinishThumb);
                            if (!toolTip) {
                                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                                toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, completedFinishThumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                            }
                            var completion = getCompletion(item.start, item.completedFinish, item.finish, settings, getItemSchedule(item));
                            if (!isNaN(completion)) {
                                toolTip.setContent(Math.round(completion * 100 * 100) / 100 + "%");
                                toolTip.show();
                                toolTip.setHorizontalPosition(toolTip.x + 2);
                                toolTip.originalX = toolTip.x;
                                ganttChartView.toolTip = toolTip;
                            }
                        }
                    }
                    if (!settings.classic) {
                        function mouseOver(e) {
                            if (typeof ganttChartView.temporaryHoveringCompletedFinishThumb !== undefinedType) {
                                var temporaryThumb = ganttChartView.temporaryHoveringCompletedFinishThumb;
                                delete ganttChartView.temporaryHoveringCompletedFinishThumb;
                                if (typeof temporaryThumb.childNodes[0].originalClass === undefinedType && typeof temporaryThumb.childNodes[0].originalStyle === undefinedType)
                                    return;
                                temporaryThumb.childNodes[0].setAttribute("class", temporaryThumb.childNodes[0].originalClass);
                                temporaryThumb.childNodes[0].setAttribute("style", temporaryThumb.childNodes[0].originalStyle);
                                delete temporaryThumb.childNodes[0].originalClass;
                                delete temporaryThumb.childNodes[0].originalStyle;
                            }
                            if (ganttChartView.draggingItem || item.finish.valueOf() == item.start.valueOf())
                                return;
                            item.temporaryThumb = completedFinishThumb;
                            ganttChartView.temporaryHoveringCompletedFinishThumb = completedFinishThumb;
                            completedFinishThumb.childNodes[0].originalClass = completedFinishThumb.childNodes[0].getAttribute("class");
                            completedFinishThumb.childNodes[0].originalStyle = completedFinishThumb.childNodes[0].getAttribute("style");
                            if (typeof settings.completedBarThumbClass !== undefinedType)
                                completedFinishThumb.childNodes[0].setAttribute("class", settings.completedBarThumbClass);
                            if (typeof settings.completedBarThumbClass !== undefinedType || typeof settings.completedBarThumbStyle !== undefinedType)
                                completedFinishThumb.childNodes[0].setAttribute("style", settings.completedBarThumbStyle);
                            completedFinishThumb.style.cursor = "ew-resize";
                        }
                        function mouseOut(e) {
                            if (typeof ganttChartView.temporaryHoveringCompletedFinishThumb !== undefinedType) {
                                var temporaryThumb = ganttChartView.temporaryHoveringCompletedFinishThumb;
                                if (temporaryThumb != item.temporaryThumb)
                                    return;
                                delete ganttChartView.temporaryHoveringCompletedFinishThumb;
                                if (typeof temporaryThumb.childNodes[0].originalClass === undefinedType && typeof temporaryThumb.childNodes[0].originalStyle === undefinedType)
                                    return;
                                temporaryThumb.childNodes[0].setAttribute("class", temporaryThumb.childNodes[0].originalClass);
                                temporaryThumb.childNodes[0].setAttribute("style", temporaryThumb.childNodes[0].originalStyle);
                                delete temporaryThumb.childNodes[0].originalClass;
                                delete temporaryThumb.childNodes[0].originalStyle;
                            }
                        }
                        thumb.addEventListener("mouseover", event(ganttChartView, thumb, "mouseover", mouseOver, true), true);
                        completedFinishThumb.addEventListener("mouseover", event(ganttChartView, completedFinishThumb, "mouseover", mouseOver, true), true);
                        thumb.addEventListener("mouseout", event(ganttChartView, thumb, "mouseout", mouseOut, true), true);
                        completedFinishThumb.addEventListener("mouseout", event(ganttChartView, completedFinishThumb, "mouseout", mouseOut, true), true);
                    }
                    completedFinishThumb.addEventListener("mousedown", event(ganttChartView, completedFinishThumb, "mousedown", function (e) {
                        if (e.button != 0)
                            return;
                        startCompletedFinishThumbDrag(e);
                        e.preventDefault();
                    }, true), true);
                    completedFinishThumb.addEventListener("touchstart", event(ganttChartView, completedFinishThumb, "touchstart", function (e) {
                        startCompletedFinishThumbDrag(e.touches[0], true);
                        e.preventDefault();
                        e.target.addEventListener("touchmove", event(ganttChartView, e.target, "touchmove", item.touchMoveHandler));
                        e.target.addEventListener("touchend", event(ganttChartView, e.target, "touchend", item.touchEndHandler));
                    }, true), true);
                }
                if (typeof ganttChartView.draggableItems === undefinedType)
                    ganttChartView.draggableItems = [];
                var isDraggableItemProcessed = false;
                for (var i = 0; i < ganttChartView.draggableItems.length; i++) {
                    if (ganttChartView.draggableItems[i] == item) {
                        isDraggableItemProcessed = true;
                        break;
                    }
                }
                if (!isDraggableItemProcessed) {
                    function continueDrag(e, withoutToolTip) {
                        if (typeof ganttChartView.draggingItem === undefinedType || ganttChartView.draggingItem != item || (ganttChartView.dragType != "Start" && ganttChartView.dragType != "StartOnly" && ganttChartView.dragType != "Finish" && ganttChartView.dragType != "CompletedFinish"))
                            return;
                        var delta = e.clientX - ganttChartView.draggingInitialX;
                        ensureHorizontalScrolling(e.clientX, ganttChartView);
                        delete ganttChartView.draggingItem;
                        if (ganttChartView.draggingInitialStartPosition + delta < 0)
                            delta = -ganttChartView.draggingInitialStartPosition;
                        if (ganttChartView.dragType == "Start" || ganttChartView.dragType == "StartOnly") {
                            var effort, completedEffort;
                            if (ganttChartView.dragType != "StartOnly")
                                effort = getEffort(item.start, item.finish, settings, getItemSchedule(item));
                            completedEffort = getEffort(item.start, item.completedFinish, settings, getItemSchedule(item));
                            var start = ensureWorkingTime(applyUpdateScale(getDateTime(ganttChartView.draggingInitialStartPosition + delta, settings), settings), settings, true, item.isMilestone, getItemSchedule(item));
                            if (ganttChartView.dragType == "StartOnly" && start > item.finish)
                                start = item.finish;
                            item.start = start;
                            item.preferredStart = item.start;
                            onItemPropertyChanged(item, "start", true, false);
                            if (ganttChartView.dragType != "StartOnly") {
                                if (!item.isMilestone) {
                                    item.finish = getFinish(item.start, effort, settings, getItemSchedule(item));
                                    onItemPropertyChanged(item, "finish", false, false);
                                    item.completedFinish = getFinish(item.start, completedEffort, settings, getItemSchedule(item));
                                    onItemPropertyChanged(item, "completedFinish", false, false);
                                }
                                else {
                                    item.finish = item.start;
                                    onItemPropertyChanged(item, "finish", false, false);
                                    item.completedFinish = item.start;
                                    onItemPropertyChanged(item, "completedFinish", false, false);
                                }
                                if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                                    toolTip = ganttChartView.toolTip;
                                    toolTip.setContent(settings.dateTimeFormatter(getFormattableDate(item.start)) + " – " + settings.dateTimeFormatter(getFormattableDate(item.finish)));
                                    toolTip.setHorizontalPosition(toolTip.originalX + (getChartPosition(item.start, settings) - ganttChartView.draggingInitialStartPosition));
                                }
                            }
                            else {
                                if (item.finish < item.start) {
                                    item.finish = item.start;
                                    onItemPropertyChanged(item, "finish", false, false);
                                }
                                if (item.completedFinish < item.start || completedEffort <= 0) {
                                    item.completedFinish = item.start;
                                    onItemPropertyChanged(item, "completedFinish", false, false);
                                }
                                if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                                    toolTip = ganttChartView.toolTip;
                                    toolTip.setContent(settings.dateTimeFormatter(getFormattableDate(item.start)) + " –");
                                    toolTip.setHorizontalPosition(toolTip.originalX + (getChartPosition(item.start, settings) - ganttChartView.draggingInitialStartPosition));
                                }
                            }
                            updateDraggingItem(item, items, ganttChartView.chartContent, settings);
                        }
                        else if (ganttChartView.dragType == "Finish") {
                            var finish = ensureWorkingTime(applyUpdateScale(getDateTime(ganttChartView.draggingInitialFinishPosition + delta, settings), settings), settings, item.isMilestone, true, getItemSchedule(item));
                            if (finish < item.start)
                                finish = item.start;
                            if (finish.valueOf() != item.finish.valueOf()) {
                                item.finish = finish;
                                onItemPropertyChanged(item, "finish", true, false);
                            }
                            if (item.completedFinish > finish) {
                                item.completedFinish = finish;
                                onItemPropertyChanged(item, "completedFinish", false, false);
                            }
                            if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                                toolTip = ganttChartView.toolTip;
                                toolTip.setContent("– " + settings.dateTimeFormatter(getFormattableDate(item.finish)));
                                toolTip.setHorizontalPosition(toolTip.originalX + (getChartPosition(item.finish, settings) - ganttChartView.draggingInitialFinishPosition));
                            }
                            updateDraggingItem(item, items, ganttChartView.chartContent, settings);
                        }
                        else if (ganttChartView.dragType == "CompletedFinish") {
                            var completedFinish = ensureWorkingTime(applyUpdateScale(getDateTime(ganttChartView.draggingInitialCompletedFinishPosition + delta, settings), settings), settings, item.isMilestone, true, getItemSchedule(item));
                            if (completedFinish < item.start)
                                completedFinish = item.start;
                            if (completedFinish > item.finish)
                                completedFinish = item.finish;
                            if (completedFinish.valueOf() != item.completedFinish.valueOf()) {
                                item.completedFinish = completedFinish;
                                onItemPropertyChanged(item, "completedFinish", true, false);
                            }
                            if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                                toolTip = ganttChartView.toolTip;
                                var completion = getCompletion(item.start, item.completedFinish, item.finish, settings, getItemSchedule(item));
                                if (!isNaN(completion)) {
                                    toolTip.setContent(Math.round(completion * 100 * 100) / 100 + "%");
                                    toolTip.setHorizontalPosition(toolTip.originalX + (getChartPosition(item.completedFinish, settings) - ganttChartView.draggingInitialCompletedFinishPosition));
                                }
                            }
                            updateDraggingItem(item, items, ganttChartView.chartContent, settings);
                        }
                        ganttChartView.draggingItem = item;
                        ganttChartView.draggingPerformed = true;
                    }
                    ganttChartView.addEventListener("mousemove", event(ganttChartView, ganttChartView, "mousemove", function (e) {
                        continueDrag(e);
                    }, true), true);
                    ganttChartView.addEventListener("touchmove", event(ganttChartView, ganttChartView, "touchmove", function (e) {
                        continueDrag(e.touches[0], true);
                    }, true), true);
                    item.touchMoveHandler = function (e) { continueDrag(e.touches[0], true); }
                    function endDrag() {
                        if (typeof ganttChartView.draggingItem === undefinedType || ganttChartView.draggingItem != item || (ganttChartView.dragType != "Start" && ganttChartView.dragType != "StartOnly" && ganttChartView.dragType != "Finish" && ganttChartView.dragType != "CompletedFinish"))
                            return;
                        delete ganttChartView.isDuringTimeDragOperation;
                        var targetItem = ganttChartView.draggingItem;
                        ganttChartView.style.cursor = "default";
                        if (ganttChartView.draggingPerformed) {
                            if (ganttChartView.dragType == "Start" || ganttChartView.dragType == "StartOnly") {
                                onItemPropertyChanged(targetItem, "start", true, true);
                                onItemPropertyChanged(targetItem, "finish", false, true);
                                onItemPropertyChanged(targetItem, "completedFinish", false, true);
                            }
                            else if (ganttChartView.dragType == "Finish") {
                                onItemPropertyChanged(targetItem, "finish", true, true);
                                onItemPropertyChanged(targetItem, "completedFinish", false, true);
                            }
                            else if (ganttChartView.dragType == "CompletedFinish") {
                                onItemPropertyChanged(targetItem, "completedFinish", true, true);
                            }
                            delete ganttChartView.draggingPerformed;
                        }
                        delete ganttChartView.draggingItem;
                    }
                    document.addEventListener("mouseup", event(ganttChartView, document, "mouseup", function (e) {
                        if (e.button != 0)
                            return;
                        endDrag();
                    }, true), true);
                    document.addEventListener("touchend", event(ganttChartView, document, "touchend", function (e) {
                        endDrag();
                    }, true), true);
                    item.touchEndHandler = function () { endDrag(); };
                    ganttChartView.draggableItems.push(item);
                }
            },
            setDependencyDraggingThumbs = function (thumb, startThumb, group, item, itemTop, itemRight, itemLeft, items, ganttChartView, settings) {
                var document = item.ganttChartView.ownerDocument;
                function startDragDependency(e, withoutToolTip) {
                    delete ganttChartView.cancelDrag;
                    ganttChartView.draggingItem = item;
                    ganttChartView.dragType = "Dependency";
                    ganttChartView.dragDependencyType = "Finish";
                    ganttChartView.style.cursor = thumb.style.cursor;
                    ganttChartView.draggingInitialX = e.clientX;
                    ganttChartView.draggingInitialY = e.clientY;
                    ganttChartView.draggingInitialRightPosition = itemRight;
                    ganttChartView.draggingInitialTopPosition = itemTop;
                    ganttChartView.draggingInitialFinishPosition = itemRight;
                    ganttChartView.draggingInitialThumbPosition = itemTop;
                    if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                        toolTip = DlhSoft.Controls.ToolTip.get(thumb);
                        if (!toolTip) {
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, thumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                        }
                        toolTip.setContent(item.content + " –");
                        toolTip.show();
                        toolTip.setPosition(toolTip.x + 16, toolTip.y - 8);
                        toolTip.originalX = toolTip.x;
                        toolTip.originalY = toolTip.y;
                        ganttChartView.toolTip = toolTip;
                    }
                }
                if (ganttChartView.temporaryHoveringThumb && (ganttChartView.temporaryHoveringThumb.originalClass || ganttChartView.temporaryHoveringThumb.originalStyle)) {
                    ganttChartView.temporaryHoveringThumb.setAttribute("class", ganttChartView.temporaryHoveringThumb.originalClass);
                    ganttChartView.temporaryHoveringThumb.setAttribute("style", ganttChartView.temporaryHoveringThumb.originalStyle);
                    delete ganttChartView.temporaryHoveringThumb.originalClass;
                    delete ganttChartView.temporaryHoveringThumb.originalStyle;
                }
                if (thumb != null) {
                    thumb.addEventListener("mousedown", event(ganttChartView, thumb, "mousedown", function (e) {
                        if (e.button != 0)
                            return;
                        startDragDependency(e);
                        e.preventDefault();
                    }, true), true);
                    thumb.addEventListener("touchstart", event(ganttChartView, thumb, "touchstart", function (e) {
                        startDragDependency(e.touches[0], true);
                        e.preventDefault();
                    }, true), true);
                }
                if (startThumb != null) {
                    function startDragDependencyFromStart(e, withoutToolTip) {
                        delete ganttChartView.cancelDrag;
                        ganttChartView.draggingItem = item;
                        ganttChartView.dragType = "Dependency";
                        ganttChartView.dragDependencyType = "Start";
                        ganttChartView.style.cursor = thumb.style.cursor;
                        ganttChartView.draggingInitialX = e.clientX;
                        ganttChartView.draggingInitialY = e.clientY;
                        ganttChartView.draggingInitialRightPosition = itemLeft;
                        ganttChartView.draggingInitialTopPosition = itemTop;
                        ganttChartView.draggingInitialFinishPosition = itemLeft;
                        ganttChartView.draggingInitialThumbPosition = itemTop;
                        e.preventDefault();
                        if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                            toolTip = DlhSoft.Controls.ToolTip.get(startThumb);
                            if (!toolTip) {
                                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                                toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, startThumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                            }
                            toolTip.setContent(item.content + " –");
                            toolTip.show();
                            toolTip.setPosition(toolTip.x + 16, toolTip.y - 8);
                            toolTip.originalX = toolTip.x;
                            toolTip.originalY = toolTip.y;
                            ganttChartView.toolTip = toolTip;
                        }
                    }
                    startThumb.addEventListener("mousedown", event(ganttChartView, startThumb, "mousedown", function (e) {
                        if (e.button != 0)
                            return;
                        startDragDependencyFromStart(e);
                        e.preventDefault();
                    }, true), true);
                    startThumb.addEventListener("touchstart", event(ganttChartView, startThumb, "touchstart", function (e) {
                        startDragDependencyFromStart(e.touches[0], true);
                        e.preventDefault();
                    }, true), true);
                }
                if (thumb != null) {
                    thumb.addEventListener("mouseover", event(ganttChartView, thumb, "mouseover", function (e) {
                        if (settings.classic && typeof ganttChartView.temporaryHoveringThumb !== undefinedType) {
                            var temporaryThumb = ganttChartView.temporaryHoveringThumb;
                            delete ganttChartView.temporaryHoveringThumb;
                            if (typeof temporaryThumb.originalClass === undefinedType && typeof temporaryThumb.originalStyle === undefinedType)
                                return;
                            temporaryThumb.setAttribute("class", temporaryThumb.originalClass);
                            temporaryThumb.setAttribute("style", temporaryThumb.originalStyle);
                            delete temporaryThumb.originalClass;
                            delete temporaryThumb.originalStyle;
                        }
                        if (typeof ganttChartView.temporaryDependencyLine !== undefinedType || thumb.originalStyle)
                            return;
                        thumb.mouseOver = true;
                        ganttChartView.temporaryHoveringThumb = thumb;
                        thumb.originalClass = thumb.getAttribute("class");
                        thumb.originalStyle = thumb.getAttribute("style");
                        if (typeof settings.dependencyPointerClass !== undefinedType)
                            thumb.setAttribute("class", settings.dependencyPointerClass);
                        if (typeof settings.dependencyPointerClass !== undefinedType || typeof settings.dependencyPointerStyle !== undefinedType)
                            thumb.setAttribute("style", settings.dependencyPointerStyle);
                        thumb.style.cursor = "pointer";
                        setTimeout(function () {
                            simulateEvent(thumb, "mouseout");
                        }, 4000);
                    }, true), true);
                }
                if (startThumb != null) {
                    startThumb.addEventListener("mouseover", event(ganttChartView, startThumb, "mouseover", function (e) {
                        if (settings.classic && typeof ganttChartView.temporaryHoveringThumb !== undefinedType) {
                            var temporaryThumb = ganttChartView.temporaryHoveringThumb;
                            delete ganttChartView.temporaryHoveringThumb;
                            if (typeof temporaryThumb.originalClass === undefinedType && typeof temporaryThumb.originalStyle === undefinedType)
                                return;
                            temporaryThumb.setAttribute("class", temporaryThumb.originalClass);
                            temporaryThumb.setAttribute("style", temporaryThumb.originalStyle);
                            delete temporaryThumb.originalClass;
                            delete temporaryThumb.originalStyle;
                        }
                        if (typeof ganttChartView.temporaryDependencyLine !== undefinedType || startThumb.originalStyle)
                            return;
                        startThumb.mouseOver = true;
                        ganttChartView.temporaryHoveringThumb = startThumb;
                        startThumb.originalClass = startThumb.getAttribute("class");
                        startThumb.originalStyle = startThumb.getAttribute("style");
                        if (typeof settings.dependencyPointerClass !== undefinedType)
                            startThumb.setAttribute("class", settings.dependencyPointerClass);
                        if (typeof settings.dependencyPointerClass !== undefinedType || typeof settings.dependencyPointerStyle !== undefinedType)
                            startThumb.setAttribute("style", settings.dependencyPointerStyle);
                        startThumb.style.cursor = "pointer";
                        setTimeout(function () {
                            simulateEvent(startThumb, "mouseout");
                        }, 4000);
                    }, true), true);
                }
                if (thumb != null) {
                    thumb.addEventListener("mouseout", event(ganttChartView, thumb, "mouseout", function (e) {
                        delete thumb.mouseOver;
                        setTimeout(function () {
                            if ((typeof thumb.originalClass === undefinedType && typeof thumb.originalStyle === undefinedType) || thumb.mouseOver)
                                return;
                            thumb.setAttribute("class", thumb.originalClass);
                            thumb.setAttribute("style", thumb.originalStyle);
                            delete thumb.originalClass;
                            delete thumb.originalStyle;
                        }, settings.classic ? 250 : 0);
                    }, true), true);
                }
                if (startThumb != null) {
                    startThumb.addEventListener("mouseout", event(ganttChartView, startThumb, "mouseout", function (e) {
                        delete startThumb.mouseOver;
                        setTimeout(function () {
                            if ((typeof startThumb.originalClass === undefinedType && typeof startThumb.originalStyle === undefinedType) || startThumb.mouseOver)
                                return;
                            startThumb.setAttribute("class", startThumb.originalClass);
                            startThumb.setAttribute("style", startThumb.originalStyle);
                            delete startThumb.originalClass;
                            delete startThumb.originalStyle;
                        }, settings.classic ? 250 : 0);
                    }, true), true);
                }
                if (thumb != null) {
                    thumb.addEventListener("touchend", event(ganttChartView, thumb, "touchend", function (e) {
                        simulateEvent(thumb, "mouseover");
                        setTimeout(function () {
                            simulateEvent(thumb, "mouseout");
                        }, 2000);
                    }, true), true);
                }
                if (startThumb != null) {
                    startThumb.addEventListener("touchend", event(ganttChartView, startThumb, "touchend", function (e) {
                        simulateEvent(startThumb, "mouseover");
                        setTimeout(function () {
                            simulateEvent(startThumb, "mouseout");
                        }, 2000);
                    }, true), true);
                }
                if (typeof ganttChartView.draggableDependencyItems === undefinedType)
                    ganttChartView.draggableDependencyItems = [];
                var isDraggableItemProcessed = false;
                for (var i = 0; i < ganttChartView.draggableDependencyItems.length; i++) {
                    if (ganttChartView.draggableDependencyItems[i] == item) {
                        isDraggableItemProcessed = true;
                        break;
                    }
                }
                if (!isDraggableItemProcessed) {
                    function continueDragDependency(e, withoutToolTip) {
                        if (typeof ganttChartView.draggingItem === undefinedType || ganttChartView.draggingItem != item || ganttChartView.dragType != "Dependency")
                            return;
                        var deltaX = e.clientX - ganttChartView.draggingInitialX;
                        var deltaY = e.clientY - ganttChartView.draggingInitialY;
                        ensureHorizontalScrolling(e.clientX, ganttChartView);
                        ensureVerticalScrolling(e.clientY, ganttChartView);
                        delete ganttChartView.draggingItem;
                        if (ganttChartView.draggingInitialFinishPosition + deltaX < 0)
                            deltaX = -ganttChartView.draggingInitialFinishPosition;
                        if (typeof ganttChartView.temporaryInitDependencyLine !== undefinedType) {
                            try { group.removeChild(ganttChartView.temporaryInitDependencyLine); } catch (exc) { }
                            delete ganttChartView.temporaryInitDependencyLine;
                        }
                        if (typeof ganttChartView.temporaryDependencyLine !== undefinedType) {
                            try { group.removeChild(ganttChartView.temporaryDependencyLine); } catch (exc) { }
                            delete ganttChartView.temporaryDependencyLine;
                        }
                        if (ganttChartView.cancelDrag) {
                            delete ganttChartView.cancelDrag;
                            delete ganttChartView.draggingItem;
                            ganttChartView.style.cursor = "default";
                            return;
                        }
                        if (!settings.classic) {
                            var line = document.createElementNS(svgns, "line");
                            line.setAttribute("x1", ganttChartView.draggingInitialRightPosition + (ganttChartView.dragDependencyType == "Start" ? -8 : 8) * (item.isMilestone || item.hasChildren ? 2 : 1));
                            line.setAttribute("y1", ganttChartView.draggingInitialTopPosition);
                            line.setAttribute("x2", ganttChartView.draggingInitialRightPosition);
                            line.setAttribute("y2", ganttChartView.draggingInitialTopPosition);
                            if (typeof settings.temporaryDependencyLineClass !== undefinedType)
                                line.setAttribute("class", settings.temporaryDependencyLineClass);
                            if (typeof settings.temporaryDependencyLineStyle !== undefinedType)
                                line.setAttribute("style", settings.temporaryDependencyLineStyle);
                            line.style.markerEnd = "none";
                            ganttChartView.temporaryInitDependencyLine = line;
                            group.appendChild(line);
                        }
                        var line = document.createElementNS(svgns, "line");
                        line.setAttribute("x1", ganttChartView.draggingInitialRightPosition + (settings.classic ? 0 : (ganttChartView.dragDependencyType == "Start" ? -8 : 8) * (item.isMilestone || item.hasChildren ? 2 : 1)));
                        line.setAttribute("y1", ganttChartView.draggingInitialTopPosition);
                        line.setAttribute("x2", ganttChartView.draggingInitialFinishPosition + deltaX);
                        line.setAttribute("y2", ganttChartView.draggingInitialThumbPosition + deltaY);
                        if (typeof settings.temporaryDependencyLineClass !== undefinedType)
                            line.setAttribute("class", settings.temporaryDependencyLineClass);
                        if (typeof settings.temporaryDependencyLineStyle !== undefinedType)
                            line.setAttribute("style", settings.temporaryDependencyLineStyle);
                        ganttChartView.temporaryDependencyLine = line;
                        group.appendChild(line);
                        ganttChartView.draggingItem = item;
                        if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                            toolTip = ganttChartView.toolTip;
                            var index = Math.floor((item.itemTop + ganttChartView.draggingInitialThumbPosition + deltaY) / settings.itemHeight);
                            var targetItem = null;
                            var itemIndex = 0;
                            for (var i = 0; i < items.length; i++) {
                                var itemI = items[i];
                                if (itemI.isVisible && !(typeof itemI.isHidden !== undefinedType && itemI.isHidden) && typeof itemI.displayRowIndex === undefinedType) {
                                    if (itemIndex == index) {
                                        targetItem = itemI;
                                        break;
                                    }
                                    itemIndex++;
                                }
                            }
                            var endType = "Start";
                            if (targetItem != null) {
                                var x = ganttChartView.draggingInitialFinishPosition + deltaX
                                var startX = getChartPosition(targetItem.start, settings);
                                var finishX = getChartPosition(targetItem.finish, settings);
                                if (targetItem.isMilestone || (targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                                    startX -= settings.itemHeight / 2;
                                    finishX += settings.itemHeight / 2;
                                }
                                if (finishX < startX + (settings.classic ? 4 : 12))
                                    finishX = startX + (settings.classic ? 4 : 12);
                                if (x < startX || x > finishX || areTasksOnSameBranch(targetItem, item) || areDependencies(targetItem, item))
                                    targetItem = null;
                                if (targetItem != null && (typeof settings.allowCreatingToFinishDependencies === undefinedType || settings.allowCreatingToFinishDependencies) && !targetItem.isMilestone && x > startX + (finishX - startX) * 3 / 4)
                                    endType = "Finish";
                            }
                            toolTip.setContent(item.content + " –" + (targetItem != null ? " " + targetItem.content + (endType != "Finish" ? "" : " •") : ""));
                            toolTip.setPosition(toolTip.originalX + deltaX, toolTip.originalY + deltaY);
                        }
                    }
                    ganttChartView.addEventListener("mousemove", event(ganttChartView, ganttChartView, "mousemove", function (e) {
                        continueDragDependency(e);
                    }, true), true);
                    ganttChartView.addEventListener("touchmove", event(ganttChartView, ganttChartView, "touchmove", function (e) {
                        continueDragDependency(e.touches[0], true);
                    }, true), true);
                    function endDragDependency(e) {
                        if (typeof ganttChartView.draggingItem === undefinedType || ganttChartView.draggingItem != item || ganttChartView.dragType != "Dependency")
                            return;
                        if (typeof ganttChartView.temporaryInitDependencyLine !== undefinedType) {
                            try { group.removeChild(ganttChartView.temporaryInitDependencyLine); } catch (exc) { }
                            delete ganttChartView.temporaryInitDependencyLine;
                        }
                        if (typeof ganttChartView.temporaryDependencyLine !== undefinedType) {
                            try { group.removeChild(ganttChartView.temporaryDependencyLine); } catch (exc) { }
                            delete ganttChartView.temporaryDependencyLine;
                        }
                        var deltaY = e.clientY - ganttChartView.draggingInitialY;
                        var index = Math.floor((item.itemTop + ganttChartView.draggingInitialThumbPosition + deltaY) / settings.itemHeight);
                        var targetItem = null;
                        var itemIndex = 0;
                        for (var i = 0; i < items.length; i++) {
                            var itemI = items[i];
                            if (itemI.isVisible && !(typeof itemI.isHidden !== undefinedType && itemI.isHidden) && typeof itemI.displayRowIndex === undefinedType) {
                                if (itemIndex == index) {
                                    targetItem = itemI;
                                    break;
                                }
                                itemIndex++;
                            }
                        }
                        if (targetItem != null) {
                            var deltaX = e.clientX - ganttChartView.draggingInitialX;
                            var x = ganttChartView.draggingInitialFinishPosition + deltaX
                            var startX = getChartPosition(targetItem.start, settings);
                            var finishX = getChartPosition(targetItem.finish, settings);
                            if (targetItem.isMilestone || (targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                                startX -= settings.itemHeight / 2;
                                finishX += settings.itemHeight / 2;
                            }
                            if (finishX < startX + (settings.classic ? 4 : 12))
                                finishX = startX + (settings.classic ? 4 : 12);
                            if (x >= startX && x <= finishX) {
                                var endType = targetItem == null || (typeof settings.allowCreatingToFinishDependencies !== undefinedType && !settings.allowCreatingToFinishDependencies) || targetItem.isMilestone || x <= startX + (finishX - startX) * 3 / 4 ? "Start" : "Finish";
                                if (!areTasksOnSameBranch(targetItem, item) && !areDependencies(targetItem, item) && (!settings.alwaysHandleInvalidDependencies || !dependsOf(item, targetItem))) {
                                    delete item.successors;
                                    if (typeof targetItem.predecessors === undefinedType)
                                        targetItem.predecessors = [];
                                    var predecessor = { item: item };
                                    if (ganttChartView.dragDependencyType != "Start") {
                                        if (endType == "Finish")
                                            predecessor.dependencyType = "FF";
                                    }
                                    else {
                                        if (endType != "Finish")
                                            predecessor.dependencyType = "SS";
                                        else
                                            predecessor.dependencyType = "SF";
                                    }
                                    targetItem.predecessors.push(predecessor);
                                    onItemPropertyChanged(targetItem, "predecessors", true, true);
                                    if (targetItem.start < item.finish && !settings.areTaskDependencyConstraintsEnabled && !settings.areTaskDependencyConstraintsDisabledWhenDropping) {
                                        var effort, completedEffort;
                                        if (!targetItem.isMilestone && !(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled))) {
                                            effort = getEffort(targetItem.start, targetItem.finish, settings, getItemSchedule(targetItem));
                                            completedEffort = getEffort(targetItem.start, targetItem.completedFinish, settings, getItemSchedule(targetItem));
                                        }
                                        if (!(targetItem.hasChildren && (typeof targetItem.isSummaryEnabled === undefinedType || targetItem.isSummaryEnabled)) && endType == "Start") {
                                            targetItem.start = ensureWorkingTime(applyUpdateScale(ganttChartView.dragDependencyType != "Start" ? item.finish : item.start, settings), settings, true, targetItem.isMilestone, getItemSchedule(item));
                                            onItemPropertyChanged(targetItem, "start", false, true);
                                            if (!targetItem.isMilestone) {
                                                targetItem.finish = getFinish(targetItem.start, effort, settings, getItemSchedule(targetItem));
                                                onItemPropertyChanged(targetItem, "finish", false, true);
                                                targetItem.completedFinish = getFinish(targetItem.start, completedEffort, settings, getItemSchedule(targetItem));
                                                onItemPropertyChanged(targetItem, "completedFinish", false, true);
                                            }
                                            else {
                                                targetItem.finish = targetItem.start;
                                                onItemPropertyChanged(targetItem, "finish", false, true);
                                                targetItem.completedFinish = targetItem.start;
                                                onItemPropertyChanged(targetItem, "completedFinish", false, true);
                                            }
                                        }
                                    }
                                    updateDraggingItem(targetItem, items, ganttChartView.chartContent, settings);
                                    updateDraggingItem(item, items, ganttChartView.chartContent, settings);
                                } else if (settings.invalidPredecessorDetectionHandler) {
                                    var predecessor = { item: item };
                                    if (ganttChartView.dragDependencyType != "Start") {
                                        if (endType == "Finish")
                                            predecessor.dependencyType = "FF";
                                    }
                                    else {
                                        if (endType != "Finish")
                                            predecessor.dependencyType = "SS";
                                        else
                                            predecessor.dependencyType = "SF";
                                    }
                                    settings.invalidPredecessorDetectionHandler(predecessor, targetItem, item);
                                }
                            }
                        }
                        delete ganttChartView.draggingItem;
                        ganttChartView.style.cursor = "default";
                    }
                    document.addEventListener("mouseup", event(ganttChartView, document, "mouseup", function (e) {
                        if (e.button != 0)
                            return;
                        endDragDependency(e);
                    }, true), true);
                    document.addEventListener("touchend", event(ganttChartView, document, "touchend", function (e) {
                        endDragDependency(e.changedTouches[0]);
                    }, true), true);
                    ganttChartView.draggableDependencyItems.push(item);
                }
            },
            getOffsetX = function (e) {
                var x = 0;
                if (e.offsetParent) {
                    do { x += e.offsetLeft; e = e.offsetParent; } while (e);
                }
                return x;
            },
            ensureHorizontalScrolling = function (x, ganttChartView) {
                if (typeof ganttChartView.draggingItem === undefinedType)
                    return;
                var now = new Date();
                if (ganttChartView.lastXDraggingTime && now > ganttChartView.lastXDraggingTime && now - ganttChartView.lastXDraggingTime < 200)
                    return;
                ganttChartView.lastXDraggingTime = now;
                x -= getOffsetX(ganttChartView);
                var sl, ada;
                if (x < ganttChartView.gridContentContainer.offsetWidth + dragZoneWidth) {
                    sl = ganttChartView.chartContentContainer.scrollLeft;
                    ganttChartView.chartContentContainer.scrollLeft -= dragAmount;
                    ada = sl - ganttChartView.chartContentContainer.scrollLeft;
                    if (typeof ganttChartView.draggingInitialStartPosition !== undefinedType)
                        ganttChartView.draggingInitialStartPosition -= ada;
                    if (typeof ganttChartView.draggingInitialFinishPosition !== undefinedType)
                        ganttChartView.draggingInitialFinishPosition -= ada;
                    if (typeof ganttChartView.draggingInitialCompletedFinishPosition !== undefinedType)
                        ganttChartView.draggingInitialCompletedFinishPosition -= ada;
                }
                else if (x >= ganttChartView.gridContentContainer.offsetWidth + ganttChartView.chartContentContainer.clientWidth - dragZoneWidth) {
                    sl = ganttChartView.chartContentContainer.scrollLeft;
                    ganttChartView.chartContentContainer.scrollLeft += dragAmount;
                    ada = ganttChartView.chartContentContainer.scrollLeft - sl;
                    if (typeof ganttChartView.draggingInitialStartPosition !== undefinedType)
                        ganttChartView.draggingInitialStartPosition += ada;
                    if (typeof ganttChartView.draggingInitialFinishPosition !== undefinedType)
                        ganttChartView.draggingInitialFinishPosition += ada;
                    if (typeof ganttChartView.draggingInitialCompletedFinishPosition !== undefinedType)
                        ganttChartView.draggingInitialCompletedFinishPosition += ada;
                }
            },
            getOffsetY = function (e) {
                var y = 0;
                if (e.offsetParent) {
                    do { y += e.offsetTop; e = e.offsetParent; } while (e);
                }
                return y;
            },
            ensureVerticalScrolling = function (y, ganttChartView) {
                if (typeof ganttChartView.draggingItem === undefinedType)
                    return;
                var now = new Date();
                if (ganttChartView.lastYDraggingTime && now > ganttChartView.lastYDraggingTime && now - ganttChartView.lastYDraggingTime < 200)
                    return;
                ganttChartView.lastYDraggingTime = now;
                y -= getOffsetY(ganttChartView);
                var sl, ada;
                if (y < ganttChartView.chartHeaderContainer.clientHeight + dragZoneWidth) {
                    sl = ganttChartView.chartContentContainer.scrollTop;
                    ganttChartView.chartContentContainer.scrollTop -= dragAmount;
                    if (typeof ganttChartView.isDuringVerticalScrolling === undefinedType) {
                        ganttChartView.isDuringVerticalScrolling = true;
                        setTimeout(function () {
                            ada = sl - ganttChartView.chartContentContainer.scrollTop;
                            ganttChartView.draggingInitialThumbPosition -= ada;
                            delete ganttChartView.isDuringVerticalScrolling;
                        }, 0);
                    }
                }
                else if (y >= ganttChartView.chartHeaderContainer.clientHeight + ganttChartView.chartContentContainer.clientHeight - dragZoneWidth) {
                    sl = ganttChartView.chartContentContainer.scrollTop;
                    ganttChartView.chartContentContainer.scrollTop += dragAmount;
                    if (typeof ganttChartView.isDuringVerticalScrolling === undefinedType) {
                        ganttChartView.isDuringVerticalScrolling = true;
                        setTimeout(function () {
                            ada = ganttChartView.chartContentContainer.scrollTop - sl;
                            ganttChartView.draggingInitialThumbPosition += ada;
                            delete ganttChartView.isDuringVerticalScrolling;
                        }, 0);
                    }
                }
            },
            updateDraggingItem = function (item, items, chartContent, settings) {
                setChartItemContent(item.chartItem, item, settings);
                updateDependencyLines(items, item);
                setTimeout(function () {
                    if (typeof item.gridItem !== undefinedType) {
                        if (typeof item.completedInput !== undefinedType) {
                            var input = item.completedInput;
                            if (typeof input.changeEventListener !== undefinedType)
                                input.removeEventListener("change", input.changeEventListener, true);
                            delete item.completedInput;
                        }
                        setGridItemContent(item.gridItem, item, items, settings.columns, chartContent, settings.toggleButtonAreaWidth, settings);
                    }
                    var parent = item.parent;
                    while (parent != null) {
                        updateParentTimingInformation(parent, false);
                        item = parent;
                        setChartItemContent(item.chartItem, item, settings);
                        updateDependencyLines(items, item);
                        if (typeof item.gridItem !== undefinedType)
                            setGridItemContent(item.gridItem, item, items, settings.columns, chartContent, settings.toggleButtonAreaWidth, settings);
                        parent = item.parent;
                    }
                }, 0);
            },

        // Scrolling.
            scrollToItem = function (item) {
                var diff = item.itemTop - item.ganttChartView.chartContentContainer.scrollTop;
                if (diff < 0)
                    item.ganttChartView.chartContentContainer.scrollTop = item.itemTop;
                else if (diff > item.ganttChartView.chartContentContainer.clientHeight - item.ganttChartView.settings.itemHeight)
                    item.ganttChartView.chartContentContainer.scrollTop = item.itemTop - (item.ganttChartView.chartContentContainer.clientHeight - item.ganttChartView.settings.itemHeight);
            },
            scrollToBottom = function (ganttChartView) {
                ganttChartView.chartContentContainer.scrollTop = ganttChartView.chartContent.clientHeight;
            },
            scrollToDateTime = function (dateTime, ganttChartView) {
                ganttChartView.isDuringScrollToDateTime = true;
                ganttChartView.chartContentContainer.scrollLeft = getChartPosition(dateTime, ganttChartView.settings);
            },
            initializeScrollSynchronization = function (ganttChartView, gridContentContainer, gridContainer, gridHeaderContainer, gridHeaderScrollArea, gridContent, chartContentContainer, chartHeaderContainer, chartContainer, chartHeaderScrollArea, chartContent, splitter, items, settings) {
                var isDuringGridScrollSynchronization, isDuringChartScrollSynchronization;
                gridContentContainer.addEventListener("scroll", event(ganttChartView, gridContentContainer, "scroll", function (e) {
                    if (chartContentContainer.scrollTop != gridContentContainer.scrollTop) {
                        if (!isDuringChartScrollSynchronization) {
                            isDuringGridScrollSynchronization = true;
                            setTimeout(function () {
                                chartContentContainer.scrollTop = gridContentContainer.scrollTop;
                                setTimeout(function () { isDuringGridScrollSynchronization = false; }, 100);
                            }, 200);
                        }
                    }
                    if (gridHeaderContainer.scrollLeft != gridContentContainer.scrollLeft)
                        gridHeaderContainer.scrollLeft = gridContentContainer.scrollLeft;
                }, true), true);
                updateHeaderScrollArea(gridContentContainer, gridContainer, gridHeaderScrollArea, settings);
                if (typeof ganttChartView.updateGridHeaderTimer !== undefinedType)
                    clearInterval(ganttChartView.updateGridHeaderTimer);
                ganttChartView.updateGridHeaderTimer = setInterval(function () {
                    try {
                        updateHeaderScrollArea(gridContentContainer, gridContainer, gridHeaderScrollArea, settings);
                    }
                    catch (exc) {
                        try { clearInterval(ganttChartView.updateGridHeaderTimer); } catch (excC) { }
                    }
                }, 100);
                chartContentContainer.addEventListener("scroll", event(ganttChartView, chartContentContainer, "scroll", function (e) {
                    if (gridContentContainer.scrollTop != chartContentContainer.scrollTop) {
                        if (!isDuringGridScrollSynchronization) {
                            isDuringChartScrollSynchronization = true;
                            setTimeout(function () {
                                gridContentContainer.scrollTop = chartContentContainer.scrollTop;
                                setTimeout(function () { isDuringChartScrollSynchronization = false; }, 100);
                            }, 200);
                        }
                    }
                    if (chartHeaderContainer.scrollLeft != chartContentContainer.scrollLeft)
                        chartHeaderContainer.scrollLeft = chartContentContainer.scrollLeft;
                    updateVirtualizationVisibility(items, chartContentContainer, settings);
                    updateAlternativeStyles(items, chartContent, settings);
                    settings.displayedTime = getDateTime(chartContentContainer.scrollLeft, settings);
                    if ((typeof ganttChartView.isDuringScrollToDateTime === undefinedType || !ganttChartView.isDuringScrollToDateTime) && typeof settings.displayedTimeChangeHandler !== undefinedType)
                        setTimeout(function () { settings.displayedTimeChangeHandler(settings.displayedTime); }, 0);
                    if (typeof ganttChartView.isDuringScrollToDateTime !== undefinedType)
                        delete ganttChartView.isDuringScrollToDateTime;
                }, true), true);
                setTimeout(function () {
                    if (chartHeaderContainer.scrollLeft != chartContentContainer.scrollLeft)
                        chartHeaderContainer.scrollLeft = chartContentContainer.scrollLeft;
                    updateVirtualizationVisibility(items, chartContentContainer, settings);
                }, 1);
                updateHeaderScrollArea(chartContentContainer, chartContainer, chartHeaderScrollArea, settings);
                if (typeof ganttChartView.updateChartHeaderTimer !== undefinedType)
                    clearInterval(ganttChartView.updateChartHeaderTimer);
                ganttChartView.updateChartHeaderTimer = setInterval(function () {
                    try {
                        updateHeaderScrollArea(chartContentContainer, chartContainer, chartHeaderScrollArea, settings);
                    }
                    catch (exc) {
                        try { clearInterval(ganttChartView.updateChartHeaderTimer); } catch (excC) { }
                    }
                }, 100);
                window.addEventListener("mousewheel", event(ganttChartView, window, "mousewheel", function (e) {
                    try { ganttChartView.cancelDrag = true; } catch (exc) { }
                }, true), true);
            },
            setAvailableHeight = function (chartContent, chartContentContainer) {
                if (chartContentContainer.style.height != "auto")
                    chartContent.availableHeight = chartContentContainer.clientHeight;
            },
            updateHeaderScrollArea = function (contentContainer, container, headerScrollArea, settings) {
                setTimeout(function () {
                    try {
                        var width = container.clientWidth - contentContainer.clientWidth;
                        if (width < 0)
                            width = 0;
                        var widthString = width + "px";
                        if (headerScrollArea.style.width == widthString)
                            return;
                        headerScrollArea.style.width = widthString;
                        if (width > 0) {
                            headerScrollArea.style.boxSizing = "border-box";
                            headerScrollArea.style.MozBoxSizing = "border-box";
                            headerScrollArea.style.border = "solid 1px " + settings.border;
                            headerScrollArea.style.borderTop = "none";
                            headerScrollArea.style.borderRight = "none";
                        }
                        else {
                            headerScrollArea.style.border = "";
                            headerScrollArea.style.borderTop = "";
                            headerScrollArea.style.borderRight = "";
                            headerScrollArea.style.boxSizing = "";
                            headerScrollArea.style.MozBoxSizing = "";
                        }
                    }
                    catch (exc) { }
                }, 0);
            },
            updateSplitter = function (splitter, gridContainer, settings) {
                if (!settings.isSplitterEnabled)
                    return;
                splitter.style.height = gridContainer.clientHeight + "px";
                splitter.style.left = Math.max(0, gridContainer.offsetWidth - 1) + "px";
            },
            updateVirtualizationVisibility = function (items, chartContentContainer, settings) {
                if ((typeof chartContentContainer.isInitializing !== undefinedType && chartContentContainer.isInitializing) || !settings.isVirtualizing)
                    return;
                var chartContentContainerScrollTop = chartContentContainer.scrollTop - settings.itemHeight;
                var chartContentContainerScrollHeight = chartContentContainerScrollTop + chartContentContainer.clientHeight + 2 * settings.itemHeight;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.isPart)
                        continue;
                    if (item.scheduleChartItem && item.scheduleChartItem != item) {
                        if (item.itemTop != item.scheduleChartItem.itemTop || item.isVirtuallyVisible != item.scheduleChartItem.isVirtuallyVisible) {
                            item.itemTop = item.scheduleChartItem.itemTop;
                            item.isVirtuallyVisible = item.scheduleChartItem.isVirtuallyVisible;
                            if (item.isVirtuallyVisible) {
                                setChartItemContent(item.chartItem, item, settings);
                                item.chartItem.setAttribute("transform", "translate(0, " + item.itemTop + ")");
                                updateItemParts(item, item.itemTop);
                            }
                        }
                        continue;
                    }
                    if (typeof item.isVirtuallyVisible === undefinedType && (typeof item.isVisible === undefinedType || item.isVisible) && !(typeof item.isHidden !== undefinedType && item.isHidden) && typeof item.itemTop !== undefinedType && item.itemTop >= chartContentContainerScrollTop && item.itemTop < chartContentContainerScrollHeight) {
                        item.isVirtuallyVisible = true;
                        onItemPropertyChanged(item, "isVirtuallyVisible", false, true);
                        if (typeof item.gridItem !== undefinedType)
                            setGridItemContent(item.gridItem, item, items, settings.columns, item.ganttChartView.chartContent, settings.toggleButtonAreaWidth, settings);
                        setChartItemContent(item.chartItem, item, settings);
                        item.chartItem.setAttribute("transform", "translate(0, " + item.itemTop + ")");
                        updateItemParts(item, item.itemTop);
                    }
                    else if (typeof item.isVirtuallyVisible !== undefinedType && (typeof item.isVisible === undefinedType || item.isVisible) && !(typeof item.isHidden !== undefinedType && item.isHidden) && typeof item.itemTop !== undefinedType && (item.itemTop < chartContentContainerScrollTop || item.itemTop >= chartContentContainerScrollHeight))
                        delete item.isVirtuallyVisible;
                }
            },

        // Splitter position.
            setSplitterPosition = function (gridWidth, chartWidth, ganttChartView, settings) {
                var gridContainer = ganttChartView.gridContainer, chartContainer = ganttChartView.chartContainer, splitter = ganttChartView.splitter;
                var percent = Math.ceil(gridWidth * 1000000 / ganttChartView.offsetWidth) / 10000;
                if (typeof gridContainer.percent !== undefinedType)
                    delete gridContainer.percent;
                gridContainer.style.width = percent + "%";
                chartContainer.style.width = (100 - percent) + "%";
                updateSplitter(splitter, gridContainer, settings);
            },

        // Presentation.
            initializePresentation = function (ganttChartView, mainContainer) {
                for (var i = ganttChartView.childNodes.length; i-- > 0; )
                    ganttChartView.removeChild(ganttChartView.childNodes[i]);
                ganttChartView.appendChild(mainContainer);
            },

        // Moving.
            move = function (item, toIndex, ganttChartView, items) {
                var fromIndex = items.indexOf(item);
                if (fromIndex < 0 || toIndex < 0 || toIndex == fromIndex || toIndex >= items.length)
                    return;
                items.splice(fromIndex, 1);
                items.splice(toIndex, 0, item);
                ensureValidHierarchy(items);
                refresh(ganttChartView);
                if (typeof ganttChartView.settings.itemMoveHandler !== undefinedType)
                    ganttChartView.settings.itemMoveHandler(item, fromIndex, toIndex);
            },
            moveRange = function (fromIndex, count, toIndex, ganttChartView, items) {
                if (fromIndex < 0 || toIndex < 0 || toIndex == fromIndex || toIndex > items.length - count)
                    return;
                var movedItems = [], i;
                for (i = fromIndex; i < fromIndex + count; i++)
                    movedItems.push(items[i]);
                items.splice(fromIndex, count);
                for (i = 0; i < movedItems.length; i++)
                    items.splice(toIndex + i, 0, movedItems[i]);
                ensureValidHierarchy(items);
                refresh(ganttChartView);
                if (typeof ganttChartView.settings.itemMoveHandler !== undefinedType) {
                    for (i = 0; i < movedItems.length; i++)
                        ganttChartView.settings.itemMoveHandler(movedItems[i], fromIndex + i, toIndex + i);
                }
            },
            ensureValidHierarchy = function (items) {
                var maxExpectedIndentation = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.indentation > maxExpectedIndentation) {
                        item.indentation = maxExpectedIndentation;
                        onItemPropertyChanged(item, "indentation", false, true);
                    }
                    maxExpectedIndentation = item.indentation + 1;
                }
            },
            setOrderingTaskDraggingThumb = function (thumb, item, items, ganttChartView, settings, isMovingToEnabledGetter, movingTargetHoveringClass, movingTargetHoveringStyle, disabledMovingTargetHoveringClass, disabledMovingTargetHoveringStyle) {
                function startVerticalDrag(e) {
                    delete ganttChartView.cancelDrag;
                    ganttChartView.draggingItem = item;
                    ganttChartView.dragType = "Ordering";
                    ganttChartView.style.cursor = thumb.style.cursor;
                    ganttChartView.draggingInitialY = e.clientY;
                    ganttChartView.draggingInitialThumbPosition = 0;
                    ganttChartView.resetChartAreaDefinitions();
                }
                thumb.addEventListener("mousedown", event(ganttChartView, thumb, "mousedown", function (e) {
                    if (e.button != 0)
                        return;
                    startVerticalDrag(e);
                    e.preventDefault();
                }, true), true);
                thumb.addEventListener("touchstart", event(ganttChartView, thumb, "touchstart", function (e) {
                    startVerticalDrag(e.touches[0]);
                    e.preventDefault();
                }, true), true);
                if (typeof ganttChartView.draggableOrderingItems === undefinedType)
                    ganttChartView.draggableOrderingItems = [];
                var isDraggableItemProcessed = false;
                for (var i = 0; i < ganttChartView.draggableOrderingItems.length; i++) {
                    if (ganttChartView.draggableOrderingItems[i] == item) {
                        isDraggableItemProcessed = true;
                        break;
                    }
                }
                if (!isDraggableItemProcessed) {
                    function continueVerticalDrag(e) {
                        if (typeof ganttChartView.draggingItem === undefinedType || ganttChartView.draggingItem != item || ganttChartView.dragType != "Ordering")
                            return;
                        if (typeof ganttChartView.temporaryHoveredGridItemSelectionContainer !== undefinedType) {
                            ganttChartView.temporaryHoveredGridItemSelectionContainer.setAttribute("class", ganttChartView.temporaryHoveredGridItemClass);
                            ganttChartView.temporaryHoveredGridItemSelectionContainer.setAttribute("style", ganttChartView.temporaryHoveredGridItemStyle);
                            delete ganttChartView.temporaryHoveredGridItemSelectionContainer;
                            delete ganttChartView.temporaryHoveredGridItemClass;
                            delete ganttChartView.temporaryHoveredGridItemStyle;
                        }
                        var deltaY = e.clientY - ganttChartView.draggingInitialY;
                        ensureVerticalScrolling(e.clientY, ganttChartView);
                        delete ganttChartView.draggingItem;
                        if (ganttChartView.cancelDrag) {
                            setCurrentItem(item, settings);
                            delete ganttChartView.cancelDrag;
                            delete ganttChartView.draggingItem;
                            ganttChartView.style.cursor = "default";
                            return;
                        }
                        var index = Math.floor((item.itemTop + ganttChartView.draggingInitialThumbPosition + deltaY) / settings.itemHeight);
                        var targetItem = null;
                        var itemIndex = 0;
                        for (var i = 0; i < items.length; i++) {
                            var itemI = items[i];
                            if (itemI.isVisible && !(typeof itemI.isHidden !== undefinedType && itemI.isHidden) && typeof itemI.displayRowIndex === undefinedType) {
                                if (itemIndex == index) {
                                    targetItem = itemI;
                                    break;
                                }
                                itemIndex++;
                            }
                        }
                        if (targetItem != null && targetItem != item && targetItem.gridItemSelectionContainer != null) {
                            ganttChartView.temporaryHoveredGridItemSelectionContainer = targetItem.gridItemSelectionContainer;
                            ganttChartView.temporaryHoveredGridItemClass = targetItem.gridItemSelectionContainer.getAttribute("class");
                            ganttChartView.temporaryHoveredGridItemStyle = targetItem.gridItemSelectionContainer.getAttribute("style");
                            if (typeof isMovingToEnabledGetter === undefinedType || isMovingToEnabledGetter(index, targetItem)) {
                                if (typeof movingTargetHoveringClass !== undefinedType)
                                    targetItem.gridItemSelectionContainer.setAttribute("class", movingTargetHoveringClass);
                                else if (typeof movingTargetHoveringStyle !== undefinedType)
                                    targetItem.gridItemSelectionContainer.setAttribute("style", movingTargetHoveringStyle);
                            }
                            else {
                                if (typeof disabledMovingTargetHoveringClass !== undefinedType)
                                    targetItem.gridItemSelectionContainer.setAttribute("class", disabledMovingTargetHoveringClass);
                                else if (typeof disabledMovingTargetHoveringStyle !== undefinedType)
                                    targetItem.gridItemSelectionContainer.setAttribute("style", disabledMovingTargetHoveringStyle);
                            }
                        }
                        ganttChartView.draggingItem = item;
                    }
                    ganttChartView.addEventListener("mousemove", event(ganttChartView, ganttChartView, "mousemove", function (e) {
                        continueVerticalDrag(e);
                    }, true), true);
                    ganttChartView.addEventListener("touchmove", event(ganttChartView, ganttChartView, "touchmove", function (e) {
                        continueVerticalDrag(e.touches[0]);
                    }, true), true);
                    function endVerticalDrag(e) {
                        if (typeof ganttChartView.draggingItem === undefinedType || ganttChartView.draggingItem != item || ganttChartView.dragType != "Ordering")
                            return;
                        if (typeof ganttChartView.temporaryHoveredGridItemSelectionContainer !== undefinedType) {
                            ganttChartView.temporaryHoveredGridItemSelectionContainer.setAttribute("class", ganttChartView.temporaryHoveredGridItemClass);
                            ganttChartView.temporaryHoveredGridItemSelectionContainer.setAttribute("style", ganttChartView.temporaryHoveredGridItemStyle);
                            delete ganttChartView.temporaryHoveredGridItemSelectionContainer;
                            delete ganttChartView.temporaryHoveredGridItemClass;
                            delete ganttChartView.temporaryHoveredGridItemStyle;
                        }
                        var deltaY = e.clientY - ganttChartView.draggingInitialY;
                        var index = Math.floor((item.itemTop + ganttChartView.draggingInitialThumbPosition + deltaY) / settings.itemHeight);
                        var targetItem = null;
                        var itemIndex = 0;
                        for (var i = 0; i < items.length; i++) {
                            var itemI = items[i];
                            if (itemI.isVisible && !(typeof itemI.isHidden !== undefinedType && itemI.isHidden) && typeof itemI.displayRowIndex === undefinedType) {
                                if (itemIndex == index) {
                                    targetItem = itemI;
                                    break;
                                }
                                itemIndex++;
                            }
                        }
                        if (targetItem != null && (typeof isMovingToEnabledGetter === undefinedType || isMovingToEnabledGetter(index, targetItem)))
                            ganttChartView.moveItemHierarchy(ganttChartView.draggingItem, targetItem.index);
                        setTimeout(function () { setCurrentItem(item, settings); scrollToItem(item); }, 0);
                        ganttChartView.resetChartAreaDefinitions();
                        delete ganttChartView.draggingItem;
                        ganttChartView.style.cursor = "default";
                    }
                    document.addEventListener("mouseup", event(ganttChartView, document, "mouseup", function (e) {
                        if (e.button != 0)
                            return;
                        endVerticalDrag(e);
                    }, true), true);
                    document.addEventListener("touchend", event(ganttChartView, document, "touchend", function (e) {
                        endVerticalDrag(e.changedTouches[0]);
                    }, true), true);
                    ganttChartView.draggableOrderingItems.push(item);
                }
            },

        // Exporting and printing.
            copyCustomProperties = function (target, source) {
                for (var field in source) {
                    if (field.indexOf("custom") != 0 && field.indexOf("description") != 0)
                        continue;
                    if (typeof target[field] === undefinedType)
                        target[field] = source[field];
                }
            },
            exportContent = function (title, preparingMessage, isGridVisible, columnIndexes, timelineStart, timelineFinish, isRelativeToTimezone, hourWidth, startRowIndex, endRowIndex, output, sendToPrinter, rotate, autoClose, items, settings) {
                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];

                var i;

                var exportColumns = [], column;
                if (typeof columnIndexes !== undefinedType) {
                    for (i = 0; i < columnIndexes.length; i++) {
                        column = settings.columns[columnIndexes[i]];
                        exportColumns.push({
                            isTreeView: column.isTreeView, header: column.header, width: column.width,
                            headerClass: column.headerClass, headerStyle: column.headerStyle, cellClass: column.cellClass, cellStyle: column.cellStyle,
                            cellTemplate: typeof column.exportCellTemplate !== undefinedType ? column.exportCellTemplate : column.cellTemplate
                        });
                    }
                }
                else {
                    for (i = 0; i < settings.columns.length; i++) {
                        column = settings.columns[i];
                        if (column.isSelection)
                            continue;
                        exportColumns.push({
                            isTreeView: column.isTreeView, header: column.header, width: column.width,
                            headerClass: column.headerClass, headerStyle: column.headerStyle, cellClass: column.cellClass, cellStyle: column.cellStyle,
                            cellTemplate: typeof column.exportCellTemplate !== undefinedType ? column.exportCellTemplate : column.cellTemplate
                        });
                    }
                }

                if (typeof isGridVisible === undefinedType)
                    isGridVisible = settings.isGridVisible;
                var gridWidth = isGridVisible ? getGridWidth(exportColumns) + 1 : 0;

                if (typeof timelineStart !== undefinedType) {
                    if (typeof isRelativeToTimezone === undefinedType || !isRelativeToTimezone)
                        timelineStart = new Date(timelineStart.valueOf() - timelineStart.getTimezoneOffset() * minuteDuration);
                }
                else {
                    timelineStart = settings.timelineStart;
                }
                if (typeof timelineFinish !== undefinedType) {
                    if (typeof isRelativeToTimezone === undefinedType || !isRelativeToTimezone)
                        timelineFinish = new Date(timelineFinish.valueOf() - timelineFinish.getTimezoneOffset() * minuteDuration);
                }
                else {
                    timelineFinish = settings.timelineFinish;
                }

                var exportSettings =
                {
                    isExport: true, isReadOnly: true, selectionMode: "None", isVirtualizing: false, isGridVisible: isGridVisible, isSplitterEnabled: false, gridWidth: gridWidth + "px", columns: exportColumns, allowUserToResizeColumns: false, isGridRowClickTimeScrollingEnabled: false, isMouseWheelZoomEnabled: false,
                    timelineStart: timelineStart, timelineFinish: timelineFinish, hourWidth: typeof hourWidth !== undefinedType ? hourWidth : settings.hourWidth, displayedTime: typeof timelineStart !== undefinedType ? timelineStart : settings.timelineStart, currentTime: settings.currentTime, isTaskToolTipVisible: false, isDependencyToolTipVisible: false,
                    containerClass: settings.containerClass, containerStyle: settings.containerStyle, border: settings.border, theme: settings.theme, headerBackground: settings.headerBackground, headerHeight: settings.headerHeight, itemHeight: settings.itemHeight, itemClass: settings.itemClass, itemStyle: settings.itemStyle, standardItemClass: settings.standardItemClass, summaryItemClass: settings.summaryItemClass, milestoneItemClass: settings.milestoneItemClass, standardItemStyle: settings.standardItemStyle, summaryItemStyle: settings.summaryItemStyle, milestoneItemStyle: settings.milestoneItemStyle, indentationLevelWidth: settings.indentationLevelWidth, toggleButtonClass: settings.toggleButtonClass, toggleButtonStyle: settings.toggleButtonStyle, scales: [], visibleWeekStart: settings.visibleWeekStart, visibleWeekFinish: settings.visibleWeekFinish, workingWeekStart: settings.workingWeekStart, workingWeekFinish: settings.workingWeekFinish, visibleDayStart: settings.visibleDayStart, visibleDayFinish: settings.visibleDayFinish, specialNonworkingDays: settings.specialNonworkingDays, barMargin: settings.barMargin, barHeight: settings.barHeight, barCornerRadius: settings.barCornerRadius, completedBarMargin: settings.completedBarMargin, completedBarHeight: settings.completedBarHeight, completedBarCornerRadius: settings.completedBarCornerRadius,
                    standardBarClass: settings.standardBarClass, summaryBarClass: settings.summaryBarClass, milestoneBarClass: settings.milestoneBarClass, standardBarStyle: settings.standardBarStyle, summaryBarStyle: settings.summaryBarStyle, milestoneBarStyle: settings.milestoneBarStyle, standardCompletedBarClass: settings.standardCompletedBarClass, standardCompletedBarStyle: settings.standardCompletedBarStyle, summaryCompletedBarClass: settings.summaryCompletedBarClass, summaryCompletedBarStyle: settings.summaryCompletedBarStyle, dependencyLineClass: settings.dependencyLineClass, dependencyLineStyle: settings.dependencyLineStyle, assignmentsClass: settings.assignmentsClass, assignmentsStyle: settings.assignmentsStyle, areTaskAssignmentsVisible: settings.areTaskAssignmentsVisible, isTaskCompletedEffortVisible: settings.isTaskCompletedEffortVisible, areTaskDependenciesVisible: settings.areTaskDependenciesVisible, areDependencyConstraintsAppliedOnStartedTasks: settings.areDependencyConstraintsAppliedOnMilestones, areDependencyConstraintsAppliedOnMilestones: settings.areDependencyConstraintsAppliedOnMilestones, isBaselineVisible: settings.isBaselineVisible, areStandardTaskLabelsVisible: settings.areStandardTaskLabelsVisible, areSummaryTaskLabelsVisible: settings.areSummaryTaskLabelsVisible, areMilestoneTaskLabelsVisible: settings.areMilestoneTaskLabelsVisible, areResourceImagesVisibleAsAssignments: settings.areResourceImagesVisibleAsAssignments, resourceImageUrls: settings.resourceImageUrls,
                    standardLabelColor: settings.standardLabelColor, summaryLabelColor: settings.summaryLabelColor, milestoneLabelColor: settings.milestoneLabelColor, standardLabelClass: settings.standardLabelClass, standardLabelStyle: settings.standardLabelStyle, summaryLabelClass: settings.summaryLabelClass, summaryLabelStyle: settings.summaryLabelStyle, milestoneLabelClass: settings.milestoneLabelClass, milestoneLabelStyle: settings.milestoneLabelStyle, arrowSize: settings.arrowSize, arrowFill: settings.arrowFill,
                    alternativeItemClass: settings.alternativeItemClass, alternativeChartItemClass: settings.alternativeChartItemClass, alternativeItemStyle: settings.alternativeItemStyle, alternativeChartItemStyle: settings.alternativeChartItemStyle,
                    gridLines: settings.gridLines, horizontalGridLines: settings.horizontalGridLines, verticalGridLines: settings.verticalGridLines, verticalGridHeaderLines: settings.verticalGridHeaderLines, horizontalChartLines: settings.horizontalChartLines, isIndividualItemNonworkingTimeHighlighted: settings.isIndividualItemNonworkingTimeHighlighted, areTaskInterruptionsHighlighted: settings.areTaskInterruptionsHighlighted, isBaselineVisible: settings.isBaselineVisible,
                    taskInitiationCost: settings.taskInitiationCost, defaultResourceUsageCost: settings.defaultResourceUsageCost, specificResourceUsageCosts: settings.specificResourceUsageCosts, defaultResourceHourCost: settings.defaultResourceHourCost, specificResourceHourCosts: settings.specificResourceHourCosts,
                    target: settings.target, months: settings.months, daysOfWeek: settings.daysOfWeek, weekStartDay: settings.weekStartDay, dateFormatter: settings.dateFormatter, dateTimeFormatter: settings.dateTimeFormatter, isRelativeToTimezone: settings.isRelativeToTimezone,
                    standardTaskTemplate: settings.standardTaskTemplate, summaryTaskTemplate: settings.summaryTaskTemplate, milestoneTaskTemplate: settings.milestoneTaskTemplate, assignmentsTemplate: settings.assignmentsTemplate, dependencyLineTemplate: settings.dependencyLineTemplate, styleDefinitionTemplate: settings.styleDefinitionTemplate,
                    classic: settings.classic
                };

                exportSettings.timelineStart = getTimelineStart(exportSettings.timelineStart, exportSettings.weekStartDay);
                exportSettings.timelineFinish = getTimelineFinish(exportSettings.timelineFinish, exportSettings.weekStartDay);

                var chartWidth = getChartWidth(exportSettings);
                exportSettings.chartWidth = chartWidth + "px";

                var width = gridWidth + chartWidth + 2 + (isGridVisible ? 1 : 0);

                for (i = 0; i < settings.scales.length; i++) {
                    var scale = settings.scales[i];
                    exportSettings.scales.push({ scaleType: scale.scaleType, isHeaderVisible: scale.isHeaderVisible, headerHeight: scale.headerHeight, headerTextFormat: scale.headerTextFormat, headerClass: scale.headerClass, headerStyle: scale.headerStyle, isHighlightingVisible: scale.isHighlightingVisible, highlightingClass: scale.highlightingClass, highlightingStyle: scale.highlightingStyle, isSeparatorVisible: scale.isSeparatorVisible, separatorClass: scale.separatorClass, separatorStyle: scale.separatorStyle, intervals: scale.intervals });
                }

                var exportDocument, exportWindow, isWindowInternal = false;
                if (output != null && typeof output.createElement !== undefinedType) {
                    exportDocument = output;
                }
                else {
                    if (output != null && typeof output.focus !== undefinedType) {
                        exportWindow = output;
                    }
                    else {
                        exportWindow = window.open("", output != null ? output : "_blank", typeof sendToPrinter !== undefinedType && sendToPrinter && (typeof autoClose === undefinedType || autoClose) ? "width=800,height=480,location=no,menubar=no,toolbar=no,status=no,scrollbars=yes" : "");
                        isWindowInternal = true;
                    }
                    exportDocument = exportWindow.document;
                    // Support for exporting links (such as CSS styles).
                    try {
                        var links = document.head.getElementsByTagName("link");
                        for (var i = 0; i < links.length; i++) {
                            var link = links[i];
                            var exportLink = exportDocument.adoptNode(link.cloneNode(true));
                            exportLink.href = link.href;
                            exportDocument.head.appendChild(exportLink);
                        }
                    } catch (exc) { }
                }
                exportDocument.title = typeof title !== undefinedType ? title : ("Exported chart" + (typeof sendToPrinter !== undefinedType && sendToPrinter ? " (printable)" : ""));

                if (typeof startRowIndex === undefinedType)
                    startRowIndex = 0;
                if (typeof endRowIndex === undefinedType)
                    endRowIndex = items.length - 1;
                var exportItems = [], item, exportItem, exportIndex = 0;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if ((typeof item.displayRowIndex !== undefinedType && (item.displayRowIndex < startRowIndex || item.displayRowIndex > endRowIndex)) || (typeof item.displayRowIndex === undefinedType && (exportIndex++ < startRowIndex || exportIndex > endRowIndex + 1)))
                        continue;
                    exportItem = {
                        content: item.content, label: item.label, indentation: item.indentation, start: item.start, finish: item.finish, completedFinish: item.completedFinish, isMilestone: item.isMilestone, schedule: getItemSchedule(item), assignmentsContent: item.assignmentsContent, baselineStart: item.baselineStart, baselineFinish: item.baselineFinish, isBarVisible: item.isBarVisible, isRelativeToTimezone: item.isRelativeToTimezone,
                        "class": item["class"], style: item.style, barClass: item.barClass, standardBarClass: item.standardBarClass, standardCompletedBarClass: item.standardCompletedBarClass, summaryBarClass: item.summaryBarClass, milestoneBarClass: item.milestoneBarClass, baselineBarClass: item.baselineBarClass, barStyle: item.barStyle, standardBarStyle: item.standardBarStyle, standardCompletedBarStyle: item.standardCompletedBarStyle, summaryBarStyle: item.summaryBarStyle, milestoneBarStyle: item.milestoneBarStyle, baselineBarStyle: item.baselineBarStyle,
                        labelColor: item.labelColor, labelClass: item.labelClass, labelStyle: item.labelStyle,
                        isSummaryEnabled: item.isSummaryEnabled, isParentSummarizationEnabled: item.isParentSummarizationEnabled, isHidden: item.isHidden,
                        isExported: true, tag: item
                    };
                    if (typeof item.displayRowIndex !== undefinedType)
                        exportItem.displayRowIndex = item.displayRowIndex - startRowIndex;
                    copyCustomProperties(exportItem, item);
                    exportItems.push(exportItem);
                    item.exportItem = exportItem;
                }
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (typeof item.displayRowIndex !== undefinedType && (item.displayRowIndex < startRowIndex || item.displayRowIndex > endRowIndex))
                        continue;
                    exportItem = item.exportItem;
                    if (typeof item.predecessors !== undefinedType) {
                        exportItem.predecessors = [];
                        for (var j = 0; j < item.predecessors.length; j++) {
                            var predecessor = item.predecessors[j];
                            if (typeof predecessor.item.displayRowIndex !== undefinedType && (predecessor.item.displayRowIndex < startRowIndex || predecessor.item.displayRowIndex > endRowIndex))
                                continue;
                            exportItem.predecessors.push({ item: predecessor.item.exportItem, dependencyType: predecessor.dependencyType, lag: predecessor.lag, dependencyLineClass: predecessor.dependencyLineClass, dependencyLineStyle: predecessor.dependencyLineStyle });
                        }
                    }
                }

                var exportingMessage = exportDocument.createElement("p");
                exportingMessage.innerHTML = typeof preparingMessage !== undefinedType ? preparingMessage : "";
                exportDocument.body.appendChild(exportingMessage);

                var ganttChartView = exportDocument.createElement("div");
                ganttChartView.setAttribute("style", "width: " + width + "px");
                try { DlhSoft.Controls.GanttChartView.initialize(ganttChartView, exportItems, exportSettings, internalLicense); } catch (exc) { }

                setTimeout(function () {
                    if (isWindowInternal)
                        exportDocument.body.setAttribute("style", "margin: 0px");
                    var ganttChartViewContainer = exportDocument.createElement("div");
                    ganttChartViewContainer.appendChild(ganttChartView);
                    exportDocument.body.replaceChild(ganttChartViewContainer, exportingMessage);
                    if (rotate) {
                        ganttChartViewContainer.setAttribute("style", "width: " + ganttChartView.offsetHeight + "px; height: " + width + "px; overflow: hidden");
                        var translate = Math.round((ganttChartView.offsetWidth - ganttChartView.offsetHeight) / 2);
                        ganttChartView.setAttribute("style", "width: " + width + "px; transform: rotate(90deg) translateX(" + translate + "px) translateY(" + translate + "px); -webkit-transform: rotate(90deg) translateX(" + translate + "px) translateY(" + translate + "px)");
                    }
                    exportDocument.close();

                    if (typeof exportWindow !== undefined) {
                        exportWindow.focus();
                        if (typeof sendToPrinter !== undefinedType && sendToPrinter) {
                            setTimeout(function () {
                                exportWindow.print();
                                if (typeof autoClose !== undefinedType && !autoClose)
                                    return;
                                setTimeout(function () {
                                    exportWindow.close();
                                });
                            });
                        }
                    }
                }, 0);
            },

        // Project statistics.
            getProjectStart = function (items) {
                var projectStart = maxDate;
                if (typeof items === undefinedType)
                    return projectStart;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                        continue;
                    if (item.start < projectStart)
                        projectStart = item.start;
                }
                return new Date(projectStart.valueOf());
            },
            getProjectFinish = function (items) {
                var projectFinish = minDate;
                if (typeof items === undefinedType)
                    return projectFinish;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                        continue;
                    if (typeof item.isMilestone === undefinedType || !item.isMilestone) {
                        if (item.finish > projectFinish)
                            projectFinish = item.finish;
                    }
                    else {
                        if (item.start > projectFinish)
                            projectFinish = item.start;
                    }
                }
                return new Date(projectFinish.valueOf());
            },
            getProjectEffort = function (items, settings) {
                var effort = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent == null)
                        effort += getItemEffort(item, settings);
                }
                return effort;
            },
            getProjectTotalEffort = function (items, settings) {
                var effort = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent == null)
                        effort += getItemTotalEffort(item);
                }
                return effort;
            },
            getProjectCompletedEffort = function (items, settings) {
                var effort = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent == null)
                        effort += getItemCompletedEffort(item, settings);
                }
                return effort;
            },
            getProjectTotalCompletedEffort = function (items, settings) {
                var effort = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent == null)
                        effort += getItemTotalCompletedEffort(item);
                }
                return effort;
            },
            getProjectCompletion = function (items, settings) {
                return getProjectCompletedEffort(items, settings) / getProjectEffort(items, settings);
            },

        // Successors.
            getSuccessors = function (item, items) {
                var successors = [];
                for (var i = 0; i < items.length; i++) {
                    var successorItem = items[i];
                    if (successorItem == item || typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                        continue;
                    for (var j = 0; j < successorItem.predecessors.length; j++) {
                        if (successorItem.predecessors[j].item == item) {
                            successors.push(successorItem);
                            break;
                        }
                    }
                }
                return successors;
            },
            getSuccessorPredecessorItems = function (item, items) {
                var successorPredecessors = [], successors = getSuccessors(item, items);
                for (var i = 0; i < successors.length; i++) {
                    var successorItem = successors[i];
                    if (typeof successorItem.predecessors === undefinedType || successorItem.predecessors.length == 0)
                        continue;
                    for (var j = 0; j < successorItem.predecessors.length; j++) {
                        if (successorItem.predecessors[j].item == item)
                            successorPredecessors.push({ successor: successorItem, predecessor: successorItem.predecessors[j] });
                    }
                }
                return successorPredecessors;
            },

        // Critical path.
            isItemCritical = function (item, criticalDelay, items, settings, projectFinish) {
                if (typeof criticalDelay === undefinedType)
                    criticalDelay = 0;
                var projectFinish = projectFinish ? projectFinish : getProjectFinish(items);
                if (item.finish >= projectFinish)
                    return true;
                var i;
                if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                    var successorPredecessorItems = item.successorPredecessors ? item.successorPredecessors : getSuccessorPredecessorItems(item, items);
                    for (i = 0; i < successorPredecessorItems.length; i++) {
                        var successor = successorPredecessorItems[i].successor;
                        if (!settings.areTaskDependencyConstraintsEnabled) {
                            var it = item, ok = true;
                            while (it) {
                                if (isDependent(it, successor)) {
                                    ok = false;
                                    break;
                                }
                                it = it.parent;
                            }
                            if (!ok)
                                continue;
                        }
                        var predecessor = successorPredecessorItems[i].predecessor;
                        if ((((typeof predecessor.dependencyType === undefinedType || predecessor.dependencyType == "" || predecessor.dependencyType == "FinishStart" || predecessor.dependencyType == "FS") && getEffort(item.finish, successor.start, settings, getItemSchedule(item)) <= (predecessor.lag ? predecessor.lag : 0) + criticalDelay) ||
                            ((predecessor.dependencyType == "StartStart" || predecessor.dependencyType == "SS") && getEffort(item.start, successor.start, settings, getItemSchedule(item)) <= (predecessor.lag ? predecessor.lag : 0) + criticalDelay)) &&
                            isItemCritical(successor, criticalDelay, items, settings, projectFinish))
                            return true;
                    }
                }
                else {
                    var children = item.children;
                    for (i = 0; i < children.length; i++) {
                        if (isItemCritical(children[i], criticalDelay, items, settings, projectFinish))
                            return true;
                    }
                }
                return false;
            },
            getCriticalItems = function (criticalDelay, items, settings) {
                if (typeof criticalDelay === undefinedType)
                    criticalDelay = 0;
                if (typeof items === undefinedType)
                    return;
                var projectFinish = getProjectFinish(items);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.successorPredecessors = getSuccessorPredecessorItems(item, items);
                }
                var criticalItems = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                        continue;
                    if (isItemCritical(item, criticalDelay, items, settings, projectFinish))
                        criticalItems.push(item);
                }
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    delete item.successorPredecessors;
                }
                return criticalItems;
            },
            getPertCriticalItems = function (ganttChartView, items, settings, maxIndentation) {
                if (typeof items === undefinedType)
                    return;
                var networkDiagramItems = ganttChartView.getNetworkDiagramItems(maxIndentation, undefined, undefined, items);
                var networkDiagramView = ganttChartView.ownerDocument.createElement("div");
                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                DlhSoft.Controls.Pert.NetworkDiagramView.initialize(networkDiagramView, networkDiagramItems, undefined, internalLicense);
                var criticalNetworkDiagramItems = networkDiagramView.getCriticalItems();
                return criticalNetworkDiagramItems.filter(function (item) { return item.tag; }).map(function (item) { return item.tag });
            },

        // Dependency constraints.
            ensureDependencyConstraints = function (items, settings, ganttChartView) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) &&
                        (typeof item.predecessors !== undefinedType && item.predecessors != null && item.predecessors.length > 0))
                        ensureItemDependencyConstraints(item, items, settings, ganttChartView);
                }
            },

        // Baseline setup.
            setupBaseline = function (items) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                        item.baselineStart = item.start;
                        if (!item.isMilestone)
                            item.baselineFinish = item.finish;
                        else
                            delete item.baselineFinish;
                    }
                    else {
                        delete item.baselineFinish;
                        delete item.baselineStart;
                    }
                    refreshItem(item);
                }
            },

        // Reschedule.
            rescheduleItemToStart = function (item, start, items, settings) {
                start = new Date(start.valueOf() - start.getTimezoneOffset() * minuteDuration);
                start = getStartWorkingTime(start, settings, getItemSchedule(item));
                var effort = getItemEffort(item, settings), completedEffort = getItemCompletedEffort(item, settings);
                setItemStart(item, start);
                setItemEffort(item, effort, settings);
                setItemCompletedEffort(item, completedEffort, settings);
                refreshItemPath(item);
            },
            rescheduleItemToFinish = function (item, finish, items, settings) {
                finish = new Date(finish.valueOf() - finish.getTimezoneOffset() * minuteDuration);
                var effort = getItemEffort(item, settings), completedEffort = getItemCompletedEffort(item, settings);
                var start = getStart(effort, finish, settings, getItemSchedule(item));
                start = getStartWorkingTime(start, settings, getItemSchedule(item));
                setItemStart(item, start);
                setItemEffort(item, effort, settings);
                setItemCompletedEffort(item, completedEffort, settings);
                refreshItemPath(item);
            },

        // Remaining work.
            splitRemainingWork = function (item, remainingSuffix, completedSuffix, ganttChartView, items, settings) {
                if (typeof items === undefinedType || item.hasChildren || item.isMilestone || !hasStarted(item) || isCompleted(item))
                    return null;
                var index = items.indexOf(item);
                if (index < 0)
                    return null;
                var remainingWorkItem = { content: typeof remainingSuffix === undefinedType ? item.content : item.content + remainingSuffix, indentation: item.indentation, isExpanded: item.isExpanded, start: item.completedFinish, finish: item.finish, assignmentsContent: item.assignmentsContent, isReadOnly: item.isReadOnly, isHidden: item.isHidden, isBarVisible: item.isBarVisible, isBarReadOnly: item.isBarReadOnly, isSummaryEnabled: item.isSummaryEnabled, isParentSummarizationEnabled: item.isParentSummarizationEnabled, displayRowIndex: item.displayRowIndex, "class": item["class"], style: item.style, barClass: item.barClass, standardBarClass: item.standardBarClass, summaryBarClass: item.summaryBarClass, milestoneBarClass: item.milestoneBarClass, baselineBarClass: item.baselineBarClass, barStyle: item.barStyle, standardBarStyle: item.standardBarStyle, summaryBarStyle: item.summaryBarStyle, milestoneBarStyle: item.milestoneBarStyle, baselineBarStyle: item.baselineBarStyle, taskTemplate: item.taskTemplate, template: item.template, tag: item.tag };
                if (typeof completedSuffix !== undefinedType)
                    item.content += completedSuffix;
                item.finish = item.completedFinish;
                insertItem(index + 1, remainingWorkItem, ganttChartView, items, settings);
                var successorPredecessorItems = getSuccessorPredecessorItems(item, items);
                for (var i = 0; i < successorPredecessorItems.length; i++) {
                    var successorPredecessorItem = successorPredecessorItems[i].predecessor;
                    if (typeof successorPredecessorItem.dependencyType === undefinedType || successorPredecessorItem.dependencyType == "" || successorPredecessorItem.dependencyType == "FinishStart" || successorPredecessorItem.dependencyType == "FS" || successorPredecessorItem.dependencyType == "FinishFinish" || successorPredecessorItem.dependencyType == "FF")
                        successorPredecessorItem.item = remainingWorkItem;
                }
                remainingWorkItem.predecessors = [{ item: item}];
                refreshPredecessorItems(item);
                refreshPredecessorItems(remainingWorkItem);
                return remainingWorkItem;
            },

        // Costs.
            getItemAssignmentsCost = function (item, settings) {
                var cost = 0;
                var assignments = getItemAssignments(item);
                for (var i = 0; i < assignments.length; i++) {
                    var assignment = assignments[i];
                    var resource = assignment.key, j;
                    if (typeof settings.specificResourceUsageCosts !== undefinedType && (j = indexOfKey(settings.specificResourceUsageCosts, resource)) >= 0)
                        cost += settings.specificResourceUsageCosts[j].value * assignment.value;
                    else if (typeof settings.defaultResourceUsageCost !== undefinedType)
                        cost += settings.defaultResourceUsageCost * assignment.value;
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                        var effortHours = getItemEffort(item, settings) / hourDuration;
                        if (typeof settings.specificResourceHourCosts !== undefinedType && (j = indexOfKey(settings.specificResourceHourCosts, resource)) >= 0)
                            cost += settings.specificResourceHourCosts[j].value * effortHours * assignment.value;
                        else if (typeof settings.defaultResourceHourCost !== undefinedType)
                            cost += settings.defaultResourceHourCost * effortHours * assignment.value;
                    }
                }
                return cost;
            },
            getItemExtraCost = function (item, settings) {
                var cost = typeof settings.taskInitiationCost !== undefinedType ? settings.taskInitiationCost : 0;
                cost += getItemAssignmentsCost(item, settings);
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    for (var i = 0; i < item.children.length; i++)
                        cost += getItemCost(item.children[i], settings);
                }
                return cost;
            },
            getItemCost = function (item, settings) {
                return (typeof item.executionCost !== undefinedType ? item.executionCost : 0) + getItemExtraCost(item, settings);
            },
            setItemCost = function (item, value, settings) {
                item.executionCost = value - getItemExtraCost(item, settings);
                onItemPropertyChanged(item, "executionCost", true, true);
            },
            getResourceCost = function (resourceName, items, settings) {
                var cost = 0;
                var assignments = getResourceAssignments(resourceName, items);
                for (var i = 0; i < assignments.length; i++) {
                    var assignment = assignments[i];
                    var j;
                    if (typeof settings.specificResourceUsageCosts !== undefinedType && (j = indexOfKey(settings.specificResourceUsageCosts, resource)) >= 0)
                        cost += settings.specificResourceUsageCosts[j].value * assignment.value;
                    else if (typeof settings.defaultResourceUsageCost !== undefinedType)
                        cost += settings.defaultResourceUsageCost * assignment.value;
                    var item = assignment.key;
                    if (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))) {
                        var effortHours = getItemEffort(item, settings) / hourDuration;
                        if (typeof settings.specificResourceHourCosts !== undefinedType && (j = indexOfKey(settings.specificResourceHourCosts, resource)) >= 0)
                            cost += settings.specificResourceHourCosts[j].value * effortHours * assignment.value;
                        else if (typeof settings.defaultResourceHourCost !== undefinedType)
                            cost += settings.defaultResourceHourCost * effortHours * assignment.value;
                    }
                }
                return cost;
            },
            getProjectCost = function (items, settings) {
                var cost = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.parent == null)
                        cost += getItemCost(item, settings);
                }
                return cost;
            },

        // Optimize work
            optimizeWork = function (dependenciesOnly, includeStartedTasks, start, singlePassTaskLeveling, ganttChartView, items, settings) {
                if (typeof dependenciesOnly === undefinedType)
                    dependenciesOnly = false;
                if (typeof includeStartedTasks === undefinedType)
                    includeStartedTasks = false;
                if (typeof start === undefinedType)
                    start = new Date();
                if (!singlePassTaskLeveling) {
                    start = new Date(start.valueOf() + start.getTimezoneOffset() * minuteDuration);
                    var i, updatedTasks = [];
                    for (i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                            continue;
                        if (item.start <= start || (!includeStartedTasks && hasStarted(item)))
                            continue;
                        if (dependenciesOnly) {
                            var hasPredecessors = false;
                            var it = item;
                            while (it != null) {
                                if (typeof it.predecessors !== undefinedType && it.predecessors.length > 0) {
                                    hasPredecessors = true;
                                    break;
                                }
                                it = it.parent;
                            }
                            if (!hasPredecessors)
                                continue;
                        }
                        rescheduleItemToStart(item, start, items, settings);
                        updatedTasks.push(item);
                    }
                    ensureDependencyConstraints(items, settings, ganttChartView);
                    for (i = 0; i < updatedTasks.length; i++) {
                        var task = updatedTasks[i];
                        onItemPropertyChanged(task, "start", true, true);
                        onItemPropertyChanged(task, "finish", true, true);
                        onItemPropertyChanged(task, "completedFinish", true, true);
                        refreshItemPath(task);
                    }
                    return;
                }
                levelResources(includeStartedTasks, start, items, settings, ganttChartView, true, dependenciesOnly);
            },

        // Allocation leveling.
            levelAllocations = function (items, ganttChartView) {
                if (!items)
                    items = ganttChartView.items;
                if (!items.length)
                    items = [items];
                for (var i = 0; i < items.length; i++) {
                    var task = items[i], j;
                    var updatedAssignmentsContent = "";
                    var assignments = getItemAssignments(task);
                    if (assignments && assignments.length > 0) {
                        var totalAllocationUnits = 0;
                        for (j = 0; j < assignments.length; j++)
                            totalAllocationUnits += assignments[j].value;
                        if (totalAllocationUnits > 0) {
                            for (j = 0; j < assignments.length; j++) {
                                if (updatedAssignmentsContent.length > 0)
                                    updatedAssignmentsContent += ", ";
                                updatedAssignmentsContent += assignments[j].key + (assignments.length > 1 ? " [" + Math.round(assignments[j].value / totalAllocationUnits * 100 * 100) / 100 + "%]" : "");
                            }
                            task.assignmentsContent = updatedAssignmentsContent;
                            onItemPropertyChanged(task, "assignmentsContent", false, true);
                            refreshItemPath(task);
                        }
                    }
                }
            },

        // Resource leveling.
            levelResources = function (includeStartedTasks, start, items, settings, ganttChartView, presumeUndefinedAssignments, dependenciesOnly) {
                if (typeof items === undefinedType)
                    return;
                if (typeof includeStartedTasks === undefinedType)
                    includeStartedTasks = false;
                if (typeof start === undefinedType)
                    start = new Date();
                if (typeof presumeUndefinedAssignments === undefinedType)
                    presumeUndefinedAssignments = false;
                if (typeof dependenciesOnly === undefinedType)
                    dependenciesOnly = false;
                ensureDependencyConstraints(items, settings, ganttChartView);
                // Prepare task dependency information.
                var tasks = [], taskResourceItems = [], task, i, j, updatedTasks = [];
                for (i = 0; i < items.length; i++) {
                    task = items[i];
                    if (task.hasChildren && (typeof task.isSummaryEnabled === undefinedType || task.isSummaryEnabled))
                        continue;
                    if (dependenciesOnly) {
                        var hasPredecessors = false;
                        var it = task;
                        while (it != null) {
                            if (typeof it.predecessors !== undefinedType && it.predecessors.length > 0) {
                                hasPredecessors = true;
                                break;
                            }
                            it = it.parent;
                        }
                        if (!hasPredecessors)
                            continue;
                    }
                    tasks.push({ key: task, value: getLeafPredecessors(task) });
                    var taskAssignments = !presumeUndefinedAssignments ? getItemAssignments(task) : [];
                    var positiveAssignments = [];
                    for (j = 0; j < taskAssignments.length; j++) {
                        var taskAssignment = taskAssignments[j];
                        if (taskAssignment.value > 0)
                            positiveAssignments.push(taskAssignment);
                    }
                    taskResourceItems.push({ key: task, value: positiveAssignments });
                    updatedTasks.push(task);
                }
                var resourceAvailabilityDateTimes = [];
                var taskCount = tasks.length;
                while (taskCount > 0) {
                    // Level resources for tasks, postponing tasks that have predecessors that have not yet been leveled.
                    var leveledTasks = [];
                    for (i = 0; i < tasks.length; i++) {
                        task = tasks[i].key;
                        var canLevel = true;
                        var taskValues = tasks[i].value;
                        for (var p = 0; p < taskValues.length; p++) {
                            var predecessorGanttChartItem = taskValues[p];
                            if (indexOfKey(tasks, predecessorGanttChartItem) >= 0 && leveledTasks.indexOf(predecessorGanttChartItem) < 0) {
                                canLevel = false;
                                break;
                            }
                        }
                        if (!canLevel)
                            continue;
                        // Update start date and time for the task as required by its assigned resources availability date and times.
                        var minStart = getConstrainedStart(task, includeStartedTasks, start, items, settings);
                        var indexOfTaskResourceItems = indexOfKey(taskResourceItems, task), indexOfResourceAvailabilityDateTimes;
                        var assignments = taskResourceItems[indexOfTaskResourceItems].value;
                        var allocationUnits, previousAllocationUnits, resource, k;
                        for (j = 0; j < assignments.length; j++) {
                            resource = assignments[j].key;
                            allocationUnits = assignments[j].value;
                            indexOfResourceAvailabilityDateTimes = indexOfKey(resourceAvailabilityDateTimes, resource);
                            if (indexOfResourceAvailabilityDateTimes >= 0) {
                                var quantity = 1;
                                if (typeof settings.resourceQuantities !== undefinedType) {
                                    var q = indexOfKey(settings.resourceQuantities, resource);
                                    if (q >= 0)
                                        quantity = settings.resourceQuantities[q].value;
                                }
                                previousAllocations = resourceAvailabilityDateTimes[indexOfResourceAvailabilityDateTimes].value;
                                for (k = 0; k < previousAllocations.length; k++) {
                                    previousAllocationUnits = previousAllocations[k].key;
                                    if (previousAllocationUnits + allocationUnits <= quantity)
                                        continue;
                                    var resourceMinStart = previousAllocations[k].value;
                                    if (resourceMinStart > minStart)
                                        minStart = resourceMinStart;
                                }
                            }
                        }
                        if ((includeStartedTasks || !hasStarted(task)) && (minStart = getStartWorkingTime(minStart, settings, getItemSchedule(task))) != task.start) {
                            var originalEffort = getItemEffort(task, settings);
                            var originalCompletedEffort = getItemCompletedEffort(task, settings);
                            setItemStart(task, minStart);
                            setItemEffort(task, originalEffort, settings);
                            setItemCompletedEffort(task, originalCompletedEffort, settings);
                        }
                        var finish = task.finish;
                        for (j = 0; j < assignments.length; j++) {
                            resource = assignments[j].key;
                            allocationUnits = assignments[j].value;
                            indexOfResourceAvailabilityDateTimes = indexOfKey(resourceAvailabilityDateTimes, resource);
                            var allocations;
                            if (indexOfResourceAvailabilityDateTimes < 0) {
                                allocations = [];
                                resourceAvailabilityDateTimes.push({ key: resource, value: allocations });
                            }
                            else {
                                allocations = resourceAvailabilityDateTimes[indexOfResourceAvailabilityDateTimes].value;
                            }
                            var updatingAllocations = [{ key: allocationUnits, value: finish}], indexOfUpdatingAllocationUnits, updatingAllocationUnits, updatingFinish;
                            for (k = 0; k < allocations.length; k++) {
                                previousAllocationUnits = allocations[k].key;
                                var previousFinish = allocations[k].value;
                                if (previousFinish > minStart) {
                                    updatingAllocationUnits = previousAllocationUnits + allocationUnits;
                                    updatingFinish = previousFinish < finish ? previousFinish : finish;
                                    indexOfUpdatingAllocationUnits = indexOfKey(updatingAllocations, updatingAllocationUnits);
                                    if (indexOfUpdatingAllocationUnits < 0)
                                        updatingAllocations.push({ key: updatingAllocationUnits, value: updatingFinish });
                                    else if (updatingFinish > updatingAllocations[updatingAllocationUnits])
                                        updatingAllocations[indexOfUpdatingAllocationUnits].value = updatingFinish;
                                    if (previousFinish < finish)
                                        updatingAllocations.push({ key: previousAllocationUnits + allocationUnits, value: previousFinish });
                                    else
                                        updatingAllocations.push({ key: previousAllocationUnits + allocationUnits, value: finish });
                                }
                            }
                            for (var l = 0; l < updatingAllocations.length; l++) {
                                updatingAllocationUnits = updatingAllocations[l].key;
                                updatingFinish = updatingAllocations[l].value;
                                indexOfUpdatingAllocationUnits = indexOfKey(allocations, updatingAllocationUnits);
                                if (indexOfUpdatingAllocationUnits < 0)
                                    allocations.push({ key: updatingAllocationUnits, value: updatingFinish });
                                else if (updatingFinish > allocations[indexOfUpdatingAllocationUnits].value)
                                    allocations[indexOfUpdatingAllocationUnits].value = updatingFinish;
                            }
                        }
                        leveledTasks.push(task);
                    }

                    // Remove leveled tasks from the collection.
                    for (i = 0; i < leveledTasks.length; i++)
                        tasks.splice(indexOfKey(tasks, leveledTasks[i]), 1);

                    if (tasks.length == taskCount)
                        break;
                    taskCount = tasks.length;
                }
                for (i = 0; i < updatedTasks.length; i++) {
                    task = updatedTasks[i];
                    onItemPropertyChanged(task, "start", true, true);
                    onItemPropertyChanged(task, "finish", true, true);
                    onItemPropertyChanged(task, "completedFinish", true, true);
                    refreshItemPath(task);
                }
            },
            getConstrainedStart = function (task, includeStarted, start, items, settings) {
                if (typeof task.minStart !== undefinedType && start < task.minStart)
                    start = task.minStart;
                if (!includeStarted && hasStarted(task))
                    return start;
                var item = task;
                while (item != null) {
                    if (typeof item.predecessors !== undefinedType) {
                        for (var i = 0; i < item.predecessors.length; i++) {
                            var predecessorItem = item.predecessors[i];
                            if (typeof predecessorItem === undefinedType)
                                continue;
                            var dependencyType = predecessorItem.dependencyType;
                            if (typeof dependencyType === undefinedType)
                                dependencyType = "FinishStart";
                            switch (dependencyType) {
                                case "":
                                case "FinishStart":
                                case "FS":
                                    var predecessorFinish = getFinish(predecessorItem.item.finish, typeof predecessorItem.lag === undefinedType ? 0 : predecessorItem.lag, settings, getItemSchedule(predecessorItem.item));
                                    if (predecessorFinish > start)
                                        start = predecessorFinish;
                                    break;
                                case "StartStart":
                                case "SS":
                                    var predecessorStart = getFinish(predecessorItem.item.start, typeof predecessorItem.lag === undefinedType ? 0 : predecessorItem.lag, settings, getItemSchedule(predecessorItem.item));
                                    if (predecessorStart > start)
                                        start = predecessorStart;
                                    break;
                            }
                        }
                    }
                    item = item.parent;
                    while (item != null && typeof item.isSummaryEnabled !== undefinedType && !item.isSummaryEnabled)
                        item = item.parent;
                }
                return start;
            },
            getLeafPredecessors = function (task) {
                var predecessorGanttChartItems = [];
                var predecessors = getPredecessors(task);
                for (var i = 0; i < predecessors.length; i++) {
                    var predecessorGanttChartItem = predecessors[i];
                    addLeafGanttChartItems(predecessorGanttChartItem, predecessorGanttChartItems);
                }
                return predecessorGanttChartItems;
            },
            addLeafGanttChartItems = function (task, tasks) {
                if (!(task.hasChildren && (typeof task.isSummaryEnabled === undefinedType || task.isSummaryEnabled))) {
                    if (tasks.indexOf(task) < 0)
                        tasks.push(task);
                }
                else {
                    for (var t = 0; t < task.children.length; t++) {
                        addLeafGanttChartItems(task.children[t], tasks);
                    }
                }
            },
            hasStarted = function (item) {
                return !item.isMilestone && item.completedFinish > item.start;
            },
            isCompleted = function (item) {
                return !item.isMilestone && item.completedFinish >= item.finish;
            },
            getItemEffort = function (item, settings) {
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    var effort = 0;
                    var children = item.children;
                    for (var i = 0; i < children.length; i++) {
                        var c = children[i];
                        effort += getItemEffort(c, settings);
                    }
                    return effort;
                }
                return getEffort(item.start, item.finish, settings, getItemSchedule(item));
            },
            getItemCompletedEffort = function (item, settings) {
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)) {
                    var effort = 0;
                    var children = item.children;
                    for (var i = 0; i < children.length; i++) {
                        var c = children[i];
                        effort += getItemCompletedEffort(c, settings);
                    }
                    return effort;
                }
                return getEffort(item.start, item.completedFinish, settings, getItemSchedule(item));
            },
            setItemEffort = function (item, value, settings) {
                setItemFinish(item, getFinish(item.start, value, settings, getItemSchedule(item)));
            },
            setItemCompletedEffort = function (item, value, settings) {
                item.completedFinish = getFinish(item.start, value, settings, getItemSchedule(item));
                onItemPropertyChanged(item, "completedFinish", false, false);
            },
            setItemStart = function (item, value) {
                item.start = value;
                item.preferredStart = value;
                onItemPropertyChanged(item, "start", false, false);
                updateItemParentsTiming(item, false);
            },
            setItemFinish = function (item, value) {
                item.finish = value;
                onItemPropertyChanged(item, "finish", false, false);
                updateItemParentsTiming(item, false);
            },
            updateItemParentsTiming = function (item, isFinal) {
                var parent = item.parent;
                while (parent != null) {
                    updateParentTimingInformation(parent, isFinal);
                    item = parent;
                    parent = item.parent;
                }
            },

        // Predecessors.
            getItemPredecessorsString = function (item, items, zeroBased) {
                if (typeof zeroBased === undefinedType)
                    zeroBased = false;
                var value = "";
                if (typeof item.predecessors === undefinedType || item.predecessors.length == 0)
                    return value;
                for (var i = 0; i < item.predecessors.length; i++) {
                    var predecessorItem = item.predecessors[i];
                    var index = items.indexOf(predecessorItem.item);
                    if (index < 0)
                        continue;
                    if (value.length > 0)
                        value += ", ";
                    value += index + (!zeroBased ? 1 : 0);
                    if (typeof predecessorItem.dependencyType !== undefinedType && predecessorItem.dependencyType != "" && predecessorItem.dependencyType != "FinishStart" && predecessorItem.dependencyType != "FS") {
                        if (predecessorItem.dependencyType == "StartStart" || predecessorItem.dependencyType == "SS")
                            value += "SS";
                        else if (predecessorItem.dependencyType == "FinishFinish" || predecessorItem.dependencyType == "FF")
                            value += "FF";
                        else if (predecessorItem.dependencyType == "StartFinish" || predecessorItem.dependencyType == "SF")
                            value += "SF";
                    }
                    if (typeof predecessorItem.lag !== undefinedType && predecessorItem.lag != 0) {
                        if (predecessorItem.lag > 0)
                            value += "+";
                        value += predecessorItem.lag / hourDuration;
                    }
                }
                return value;
            },
            setItemPredecessorsString = function (item, predecessorsString, items, zeroBased) {
                if (typeof zeroBased === undefinedType)
                    zeroBased = false;
                var itemPredecessors = [];
                item.predecessors = itemPredecessors;
                var predecessorStrings = predecessorsString.split(",");
                for (var i = 0; i < predecessorStrings.length; i++) {
                    var predecessorString = predecessorStrings[i];
                    var predecessorDefinitionString = trim(predecessorString);
                    if (predecessorDefinitionString.length <= 0)
                        continue;
                    var index = 0;
                    while (index < predecessorDefinitionString.length && predecessorDefinitionString.charCodeAt(index) >= 48 && predecessorDefinitionString.charCodeAt(index) <= 48 + 9)
                        index++;
                    var predecessorIndexString = predecessorDefinitionString.substr(0, index);
                    var predecessorIndex = parseInt(predecessorIndexString) - (!zeroBased ? 1 : 0);
                    if (isNaN(predecessorIndex) || predecessorIndex < 0 || predecessorIndex >= items.length)
                        continue;
                    var predecessorItem = items[predecessorIndex];
                    if (areTasksOnSameBranch(item, predecessorItem) || areDependencies(item, predecessorItem))
                        continue;
                    var dependencyString = predecessorDefinitionString.substr(index);
                    var plusIndex = dependencyString.indexOf("+");
                    var minusIndex = dependencyString.indexOf("-");
                    var signIndex = plusIndex >= 0 ? plusIndex : (minusIndex >= 0 ? minusIndex : -1);
                    var lag = 0;
                    if (signIndex >= 0) {
                        var lagHours = parseFloat(dependencyString.substr(signIndex + 1));
                        if (!isNaN(lagHours))
                            lag = lagHours * (plusIndex >= 0 ? 1 : -1) * hourDuration;
                    }
                    var dependencyTypeAbbreviationString = signIndex < 0 ? dependencyString : dependencyString.substr(0, signIndex);
                    var dependencyType = dependencyTypeAbbreviationString.toUpperCase();
                    itemPredecessors.push({ item: predecessorItem, dependencyType: dependencyType, lag: lag });
                }
                for (var ei = 0; ei < items.length; ei++)
                    delete items[ei].successors;
            },

        // WBS indexes.
            getItemWbsIndex = function (item, items, zeroBased) {
                if (typeof zeroBased === undefinedType)
                    zeroBased = false;
                var parent = item.parent;
                var currentIndex = item.index;
                if (parent == null) {
                    var previousItem, count = 0;
                    while (currentIndex-- > 0) {
                        previousItem = items[currentIndex];
                        if (previousItem.indentation == 0)
                            count++;
                    }
                    return count + (!zeroBased ? 1 : 0);
                }
                else {
                    return getItemWbsIndex(parent, items) + "." + (parent.children.indexOf(item) + (!zeroBased ? 1 : 0));
                }
            },

        // Connectors.
            getScheduleChartItems = function (assignableResources, items, settings) {
                var scheduleChartItems = [];
                var resources = typeof assignableResources !== undefinedType ? (typeof assignableResources === arrayType ? assignableResources : [assignableResources]) : (typeof settings.assignableResources !== undefinedType ? settings.assignableResources : []), resource;
                var assignedResources = getAssignedResources(items);
                var i;
                for (i = 0; i < assignedResources.length; i++) {
                    resource = assignedResources[i];
                    if (resources.indexOf(resource) < 0)
                        resources.push(resource);
                }
                for (i = 0; i < resources.length; i++) {
                    resource = resources[i];
                    var scheduleChartItem = { tag: resource, content: resource, ganttChartItems: [] };
                    var assignments = getResourceAssignments(resource, items);
                    for (var j = 0; j < assignments.length; j++) {
                        var assignment = assignments[j];
                        var ganttChartItem = assignment.key;
                        var start = ganttChartItem.start, finish = ganttChartItem.finish, completedFinish = ganttChartItem.completedFinish;
                        var assignmentItem = { tag: ganttChartItem, content: ganttChartItem.content, start: ganttChartItem.start, finish: ganttChartItem.finish, completedFinish: ganttChartItem.completedFinish, isMilestone: ganttChartItem.isMilestone, schedule: getItemSchedule(ganttChartItem), assignmentsContent: assignment.value != 1 ? (Math.round(assignment.value * 100 * 100) / 100) + "%" : "", minStart: ganttChartItem.minStart, maxStart: ganttChartItem.maxStart, minFinish: ganttChartItem.minFinish, maxFinish: ganttChartItem.maxFinish, isHidden: ganttChartItem.isHidden, isBarVisible: ganttChartItem.isBarVisible, isBarReadOnly: ganttChartItem.isBarReadOnly, isReadOnly: ganttChartItem.isReadOnly, isRelativeToTimezone: ganttChartItem.isRelativeToTimezone };
                        scheduleChartItem.ganttChartItems.push(assignmentItem);
                    }
                    scheduleChartItems.push(scheduleChartItem);
                }
                return scheduleChartItems;
            },
            getItemAssignments = function (item) {
                return getAssignmentsInternal(item.assignmentsContent);
            },
            getAssignmentsInternal = function (assignmentsString) {
                if (typeof assignmentsString === undefinedType)
                    return [];
                var assignmentItemStrings = assignmentsString.split(",");
                var assignments = [];
                for (var ai = 0; ai < assignmentItemStrings.length; ai++) {
                    var assignmentItemString = trim(assignmentItemStrings[ai]);
                    var allocationUnits = 1;
                    var i = assignmentItemString.indexOf("[");
                    var j = assignmentItemString.lastIndexOf("]");
                    if (i >= 0 && j >= 0) {
                        var allocationPercentString = trim(assignmentItemString.substr(i + 1, j - i - 1));
                        assignmentItemString = trim(assignmentItemString.substr(0, i));
                        var k = allocationPercentString.indexOf("%");
                        if (k >= 0)
                            allocationPercentString = trim(allocationPercentString.substr(0, k));
                        var allocationPercent;
                        try {
                            allocationPercent = parseFloat(allocationPercentString);
                            allocationUnits = allocationPercent / 100;
                        }
                        catch (exc) { allocationUnits = 1; }
                    }
                    if (assignmentItemString.length <= 0)
                        continue;
                    var assignmentIndex = indexOfKey(assignments, assignmentItemString);
                    if (assignmentIndex < 0)
                        assignments.push({ key: assignmentItemString, value: allocationUnits });
                    else
                        assignments[assignmentIndex].value += allocationUnits;
                }
                return assignments;
            },
            getItemAssignedResources = function (item) {
                var assignedResources = [];
                var assignments = getItemAssignments(item);
                for (var i = 0; i < assignments.length; i++) {
                    var assignmentItem = assignments[i];
                    assignedResources.push(assignmentItem.key);
                }
                return assignedResources;
            },
            getResourceAssignments = function (resourceName, items) {
                if (typeof items === undefinedType)
                    return [];
                var assignments = [];
                for (var i = 0; i < items.length; i++) {
                    var ganttChartItem = items[i];
                    if (ganttChartItem.hasChildren && (typeof ganttChartItem.isSummaryEnabled === undefinedType || ganttChartItem.isSummaryEnabled))
                        continue;
                    var itemAssignments = getItemAssignments(ganttChartItem);
                    for (var j = 0; j < itemAssignments.length; j++) {
                        var assignmentItem = itemAssignments[j];
                        if (assignmentItem.key == resourceName) {
                            assignments.push({ key: ganttChartItem, value: assignmentItem.value });
                            break;
                        }
                    }
                }
                return assignments;
            },
            getResourceAssignedItems = function (resourceName, items) {
                var assignedItems = [];
                var assignments = getResourceAssignments(resourceName, items);
                for (var i = 0; i < assignments.length; i++) {
                    var assignmentItem = assignments[i];
                    assignedItems.push(assignmentItem.key);
                }
                return assignedItems;
            },
            getAssignedResources = function (items) {
                if (typeof items === undefinedType)
                    return [];
                var assignedResources = [];
                for (var i = 0; i < items.length; i++) {
                    var ganttChartItem = items[i];
                    if (ganttChartItem.hasChildren && (typeof ganttChartItem.isSummaryEnabled === undefinedType || ganttChartItem.isSummaryEnabled))
                        continue;
                    var itemAssignedResources = getItemAssignedResources(ganttChartItem);
                    for (var j = 0; j < itemAssignedResources.length; j++) {
                        var resourceName = itemAssignedResources[j];
                        if (assignedResources.indexOf(resourceName) < 0)
                            assignedResources.push(resourceName);
                    }
                }
                return assignedResources;
            },
            getLoadChartItems = function (resources, items, settings) {
                var loadChartItems = [];
                if (typeof resources === undefinedType)
                    resources = getAssignedResources(items);
                else if (typeof resources !== arrayType)
                    resources = [resources];
                for (var i = 0; i < resources.length; i++) {
                    var resource = resources[i];
                    var loadChartItem = { tag: resource, content: resource, ganttChartItems: [] };
                    var allocations = getAllocations(resource, items);
                    for (var j = 0; j < allocations.length; j++) {
                        var allocation = allocations[j];
                        var quantity = 1;
                        if (typeof settings.resourceQuantities !== undefinedType) {
                            var q = indexOfKey(settings.resourceQuantities, resource);
                            if (q >= 0)
                                quantity = settings.resourceQuantities[q].value;
                        }
                        var maxLoadChartDisplayedResourceQuantity = settings.maxLoadChartDisplayedResourceQuantity;
                        if (typeof maxLoadChartDisplayedResourceQuantity === undefinedType)
                            maxLoadChartDisplayedResourceQuantity = 100;
                        if (quantity > maxLoadChartDisplayedResourceQuantity)
                            quantity = maxLoadChartDisplayedResourceQuantity;
                        loadChartItem.ganttChartItems.push({ start: allocation.key.start, finish: allocation.key.finish, units: allocation.value / quantity, content: (Math.round(allocation.value * 100 * 100) / 100) + "%", isRelativeToTimezone: false });
                    }
                    loadChartItems.push(loadChartItem);
                }
                return loadChartItems;
            },
            getAllocations = function (resourceName, items) {
                var allocations = [];
                var assignments = getResourceAssignments(resourceName, items);
                for (var i = 0; i < assignments.length; i++) {
                    var assignment = assignments[i];
                    var ganttChartItem = assignment.key;
                    if (ganttChartItem.hasChildren && (typeof ganttChartItem.isSummaryEnabled === undefinedType || ganttChartItem.isSummaryEnabled))
                        continue;
                    var remainingTimeIntervals = [{ start: ganttChartItem.start, finish: ganttChartItem.finish}];
                    while (remainingTimeIntervals.length > 0) {
                        var newTimeInterval = dequeue(remainingTimeIntervals);
                        if (newTimeInterval.finish <= newTimeInterval.start)
                            continue;
                        if (allocations.length == 0) {
                            allocations.push({ key: newTimeInterval, value: assignment.value });
                        }
                        else {
                            var prevStart = getProjectStart(items);
                            var gotoDequeue = false;
                            for (var j = 0; j < allocations.length; j++) {
                                var existingTimeInterval = allocations[j].key, existingAllocationUnits = allocations[j].value;
                                if (newTimeInterval.start >= existingTimeInterval.finish)
                                    continue;
                                if (newTimeInterval.finish <= existingTimeInterval.start) {
                                    for (var k = 0; k <= j; k++) {
                                        if (allocations[k].key.start >= newTimeInterval.start) {
                                            allocations.splice(k, 0, { key: newTimeInterval, value: assignment.value });
                                            break;
                                        }
                                    }
                                    gotoDequeue = true;
                                    break;
                                }
                                else if (newTimeInterval.start <= existingTimeInterval.start && newTimeInterval.finish >= existingTimeInterval.finish) {
                                    allocations[j].value = existingAllocationUnits + assignment.value;
                                    if (newTimeInterval.start < existingTimeInterval.start)
                                        remainingTimeIntervals.push({ start: newTimeInterval.start, finish: existingTimeInterval.start });
                                    if (newTimeInterval.finish > existingTimeInterval.finish)
                                        remainingTimeIntervals.push({ start: existingTimeInterval.finish, finish: newTimeInterval.finish });
                                    gotoDequeue = true;
                                    break;
                                }
                                else if (newTimeInterval.start >= existingTimeInterval.start && newTimeInterval.finish <= existingTimeInterval.finish) {
                                    allocations.splice(j, 1);
                                    if (newTimeInterval.start > existingTimeInterval.start)
                                        allocations.splice(j++, 0, { key: { start: existingTimeInterval.start, finish: newTimeInterval.start }, value: existingAllocationUnits });
                                    allocations.splice(j++, 0, { key: newTimeInterval, value: existingAllocationUnits + assignment.value });
                                    if (newTimeInterval.finish < existingTimeInterval.finish)
                                        allocations.splice(j++, 0, { key: { start: newTimeInterval.finish, finish: existingTimeInterval.finish }, value: existingAllocationUnits });
                                    gotoDequeue = true;
                                    break;
                                }
                                else if (newTimeInterval.start >= existingTimeInterval.start && newTimeInterval.finish >= existingTimeInterval.finish) {
                                    allocations.splice(j, 1);
                                    if (newTimeInterval.start > existingTimeInterval.start)
                                        allocations.splice(j++, 0, { key: { start: existingTimeInterval.start, finish: newTimeInterval.start }, value: existingAllocationUnits });
                                    allocations.splice(j++, 0, { key: { start: newTimeInterval.start, finish: existingTimeInterval.finish }, value: existingAllocationUnits + assignment.value });
                                    if (newTimeInterval.finish > existingTimeInterval.finish)
                                        remainingTimeIntervals.push({ start: existingTimeInterval.finish, finish: newTimeInterval.finish });
                                    gotoDequeue = true;
                                    break;
                                }
                                else if (newTimeInterval.start <= existingTimeInterval.start && newTimeInterval.finish <= existingTimeInterval.finish) {
                                    allocations.splice(j, 1);
                                    if (newTimeInterval.start < existingTimeInterval.start)
                                        remainingTimeIntervals.push({ start: newTimeInterval.start, finish: existingTimeInterval.start });
                                    allocations.splice(j++, 0, { key: { start: existingTimeInterval.start, finish: newTimeInterval.finish }, value: existingAllocationUnits + assignment.value });
                                    if (newTimeInterval.finish < existingTimeInterval.finish)
                                        allocations.splice(j++, 0, { key: { start: newTimeInterval.finish, finish: existingTimeInterval.finish }, value: existingAllocationUnits });
                                    gotoDequeue = true;
                                    break;
                                }
                            }
                            if (gotoDequeue)
                                continue;
                            allocations.push({ key: newTimeInterval, value: assignment.value });
                        }
                    }
                }
                return allocations;
            },
            getFilteredGanttChartItems = function (resources, items) {
                resources = [resources];
                var usedItems = [];
                for (var i = 0; i < resources.length; i++) {
                    var resource = resources[i];
                    var filteredItems = [];
                    if (typeof resources === undefinedType)
                        resources = getAssignedResources(items);
                    else if (typeof resources !== arrayType)
                        var assignedItems = getResourceAssignments(resource, items);
                    for (var j = 0; j < assignedItems.length; j++) {
                        var item = assignedItems[j].key;
                        if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                            continue;
                        if (usedItems.indexOf(item) >= 0)
                            continue;
                        filteredItems.push({ tag: item, content: item.content, start: item.start, finish: item.finish, completedFinish: item.completedFinish, isMilestone: item.isMilestone, assignmentsContent: resources.length > 1 ? item.assignmentsContent : (assignedItems[j].value != 1 ? (Math.round(assignedItems[j].value * 100 * 100) / 100) + "%" : ""), minStart: item.minStart, maxStart: item.maxStart, minFinish: item.minFinish, maxFinish: item.maxFinish, isHidden: item.isHidden, isBarVisible: item.isBarVisible, isBarReadOnly: item.isBarReadOnly, isReadOnly: true, isRelativeToTimezone: item.isRelativeToTimezone });
                        usedItems.push(item);
                    }
                }
                return filteredItems;
            },
            getPertChartItems = function (maxIndentation, startContent, finishContent, linkContent, completedContentSuffix, startingContentSuffix, items, settings) {
                if (typeof maxIndentation === undefinedType || maxIndentation < 0)
                    maxIndentation = Number.MAX_VALUE;
                if (typeof startContent === undefinedType)
                    startContent = "Start";
                if (typeof finishContent === undefinedType)
                    finishContent = "Finish";
                if (typeof completedContentSuffix === undefinedType)
                    completedContentSuffix = " completed";
                if (typeof startingContentSuffix === undefinedType)
                    startingContentSuffix = " starting";
                var minDate = new Date(1900, 0, 1), maxDate = new Date(new Date(10000, 0, 1).valueOf() - 1);
                var pertChartItems = [];
                var i, item, j, it, k, previousItem, pertItem, nextPertItem, predecessorItem, earlyFinish;
                // Determine dependencies.
                var dependencies = [];
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item.indentation <= maxIndentation && (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible))) || item.indentation == maxIndentation))
                        dependencies.push({ key: item, value: [] });
                }
                for (i = 0; i < dependencies.length; i++) {
                    item = dependencies[i].key;
                    var dependentItems = [item];
                    if (item.indentation == maxIndentation && (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)))) {
                        for (j = 0; j < items.length; j++) {
                            it = items[j];
                            if (isParent(it, item))
                                dependentItems.push(it);
                        }
                    }
                    var itemDependencies = dependencies[i].value;
                    for (j = 0; j < dependentItems.length; j++) {
                        var dependentItem = dependentItems[j];
                        var parentDependentItem = dependentItem;
                        while (parentDependentItem != null) {
                            if (typeof parentDependentItem.predecessors !== undefinedType) {
                                for (k = 0; k < parentDependentItem.predecessors.length; k++) {
                                    if (typeof parentDependentItem.predecessors[k].item === undefinedType || (typeof parentDependentItem.predecessors[k].dependencyType !== undefinedType && parentDependentItem.predecessors[k].dependencyType != "" && parentDependentItem.predecessors[k].dependencyType != "FinishStart" && parentDependentItem.predecessors[k].dependencyType != "FS"))
                                        continue;
                                    predecessorItem = parentDependentItem.predecessors[k].item;
                                    var dependentOfItem = predecessorItem;
                                    while (dependentOfItem != null && indexOfKey(dependencies, dependentOfItem) < 0)
                                        dependentOfItem = dependentOfItem.parent;
                                    if (dependentOfItem == item)
                                        continue;
                                    var dependentOfItems = [];
                                    if (dependentOfItem != null) {
                                        dependentOfItems.push(dependentOfItem);
                                    }
                                    else {
                                        for (var l = 0; l < dependencies.length; l++) {
                                            it = dependencies[l].key;
                                            if (isParent(it, predecessorItem))
                                                dependentOfItems.push(it);
                                        }
                                    }
                                    for (var m = 0; m < dependentOfItems.length; m++) {
                                        var dependentOfItemInstance = dependentOfItems[m];
                                        if (itemDependencies.indexOf(dependentOfItemInstance) < 0) {
                                            var circular = maxIndentation < Number.MAX_VALUE && dependenciesContain(dependencies, dependentOfItemInstance, item);
                                            if (!circular)
                                                itemDependencies.push(dependentOfItemInstance);
                                        }
                                    }
                                }
                            }
                            parentDependentItem = parentDependentItem.parent;
                        }
                    }
                }
                // Determine project start and finish.
                var index = 0;
                var projectStart = null, projectFinish = null;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (projectStart == null || item.start < projectStart)
                        projectStart = item.start;
                    if (projectFinish == null || item.finish > projectFinish)
                        projectFinish = item.finish;
                }
                if (projectStart == null)
                    projectStart = maxDate;
                if (projectFinish == null)
                    projectFinish = minDate;
                // Generate main task items.
                var start = { content: startContent, displayedText: (index++).toString(), displayedRowIndex: 0, displayedColumnIndex: 0 };
                pertChartItems.push(start);
                var previousPertItems = [start];
                var firstItems = [];
                var initial;
                for (i = 0; i < dependencies.length; i++) {
                    if (dependencies[i].value.length == 0)
                        firstItems.push(dependencies[i].key);
                }
                if (firstItems.length > 0) {
                    previousPertItems = [];
                    for (i = 0; i < firstItems.length; i++) {
                        item = firstItems[i];
                        initial = start;
                        var displayedText = (index++).toString();
                        if (item.start > projectStart) {
                            initial = { content: item.content != null ? item.content.toString() + startingContentSuffix : null, displayedText: displayedText, predecessors: [] };
                            pertChartItems.push(initial);
                            initial.predecessors.push({ item: start, content: linkContent, isEffortVirtual: true });
                        }
                        var firstPertItem = { content: item.content + completedContentSuffix, displayedText: displayedText + (initial != start ? "'" : ""), predecessors: [], tag: item };
                        previousPertItems.push(firstPertItem);
                        pertChartItems.push(firstPertItem);
                        firstPertItem.predecessors.push({ item: initial, content: getContentPath(item), displayedText: item.content != null ? item.content.toString() : null, effort: getEffort(item.start, item.finish, settings, getItemSchedule(item)), tag: item });
                    }
                    var moreItemsAreAvailable;
                    do {
                        var nextPreviousPertItems = [];
                        for (i = 0; i < previousPertItems.length; i++)
                            nextPreviousPertItems.push(previousPertItems[i]);
                        moreItemsAreAvailable = false;
                        for (i = 0; i < previousPertItems.length; i++) {
                            pertItem = previousPertItems[i];
                            previousItem = pertItem.tag;
                            var nextItems = [];
                            for (j = 0; j < dependencies.length; j++) {
                                if (dependencies[j].value.indexOf(previousItem) >= 0)
                                    nextItems.push(dependencies[j].key);
                            }
                            if (nextItems.length > 0) {
                                nextPreviousPertItems.splice(nextPreviousPertItems.indexOf(pertItem), 1);
                                for (j = 0; j < nextItems.length; j++) {
                                    item = nextItems[j];
                                    nextPertItem = null;
                                    for (k = 0; k < pertChartItems.length; k++) {
                                        if (pertChartItems[k].tag == item) {
                                            nextPertItem = pertChartItems[k];
                                            break;
                                        }
                                    }
                                    if (nextPertItem == null) {
                                        nextPertItem = { content: item.content + completedContentSuffix, displayedText: (index++).toString(), predecessors: [], tag: item };
                                        nextPreviousPertItems.push(nextPertItem);
                                        pertChartItems.push(nextPertItem);
                                    }
                                    nextPertItem.predecessors.push({ item: pertItem, content: getContentPath(item), displayedText: item.content != null ? item.content.toString() : null, effort: getEffort(item.start, item.finish, settings, getItemSchedule(item)), tag: item });
                                }
                                moreItemsAreAvailable = true;
                            }
                        }
                        previousPertItems = nextPreviousPertItems;
                    }
                    while (moreItemsAreAvailable);
                }
                var finish = { content: finishContent, displayedText: (index++).toString(), predecessors: [], displayedRowIndex: 0 };
                pertChartItems.push(finish);
                var finishPredecessorItems = finish.predecessors;
                for (i = 0; i < previousPertItems.length; i++) {
                    var previousPertItem = previousPertItems[i];
                    previousItem = previousPertItem.tag;
                    finishPredecessorItems.push({ item: previousPertItem });
                }
                // Refactor and remove predecessor duplicates.
                var pertPredecessorItem;
                for (j = 0; j < dependencies.length; j++) {
                    item = dependencies[j].key;
                    pertItem = null;
                    for (k = 0; k < pertChartItems.length; k++) {
                        if (pertChartItems[k].tag == item) {
                            pertItem = pertChartItems[k];
                            break;
                        }
                    }
                    if (pertItem == null)
                        continue;
                    var pertPredecessorItems = [];
                    if (typeof pertItem.predecessors !== undefinedType) {
                        for (k = 0; k < pertItem.predecessors.length; k++) {
                            if (pertItem.predecessors[k].tag == item)
                                pertPredecessorItems.push(pertItem.predecessors[k])
                        }
                    }
                    var previousActivity;
                    if (pertPredecessorItems.length > 1) {
                        var startPertItem = { content: item.content != null ? item.content.toString() + startingContentSuffix : null, displayedText: pertItem.displayedText, predecessors: [] };
                        pertChartItems.splice(pertChartItems.indexOf(pertItem), 0, startPertItem);
                        var startPredecessorItems = startPertItem.predecessors;
                        for (k = 0; k < pertPredecessorItems.length; k++) {
                            pertPredecessorItem = pertPredecessorItems[k];
                            previousActivity = pertPredecessorItem.item.tag;
                            pertItem.predecessors.splice(pertItem.predecessors.indexOf(pertPredecessorItem), 1);
                            startPredecessorItems.push({ item: pertPredecessorItem.item, content: linkContent, isEffortVirtual: true });
                        }
                        pertItem.predecessors.push({ item: startPertItem, content: getContentPath(item), displayedText: item.content != null ? item.content.toString() : null, effort: getEffort(item.start, item.finish, settings, getItemSchedule(item)), tag: item });
                        pertItem.displayedText += "'";
                    }
                    else if (pertPredecessorItems.length == 1) {
                        pertPredecessorItem = pertPredecessorItems[0];
                        previousActivity = pertPredecessorItem.item.tag;
                        if (previousActivity != null && item.start > getStartWorkingTime(previousActivity.finish, settings)) {
                            initial = { content: item.content != null ? item.content.toString() + startingContentSuffix : null, displayedText: pertItem.displayedText, predecessors: [] };
                            pertChartItems.splice(pertChartItems.indexOf(pertItem), 0, initial);
                            initial.predecessors.push({ item: pertPredecessorItem.item, content: linkContent, isEffortVirtual: true });
                            pertItem.predecessors.splice(0, pertItem.predecessors.length);
                            pertItem.predecessors.push({ item: initial, content: getContentPath(item), displayedText: item.content != null ? item.content.toString() : null, effort: getEffort(item.start, item.finish, settings, getItemSchedule(item)), tag: item });
                            pertItem.displayedText += "'";
                        }
                    }
                }
                // Convert milestones to task events.
                for (i = 0; i < dependencies.length; i++) {
                    if (!dependencies[i].key.isMilestone)
                        continue;
                    item = dependencies[i].key;
                    pertItem = null;
                    for (k = 0; k < pertChartItems.length; k++)
                        if (pertChartItems[k].tag == item) {
                            pertItem = pertChartItems[k];
                            break;
                        }
                    if (pertItem == null)
                        continue;
                    if (typeof pertItem.predecessors !== undefinedType && pertItem.predecessors.length == 1) {
                        pertPredecessorItem = pertItem.predecessors[0];
                        if (pertPredecessorItem.item == start)
                            continue;
                        if (pertPredecessorItem.tag == item) {
                            pertItem.predecessors.splice(0, 1);
                            previousItem = pertPredecessorItem.item;
                            for (k = 0; k < previousItem.predecessors.length; k++) {
                                var previousPredecessorItem = previousItem.predecessors[k];
                                pertPredecessorItem.item.predecessors.splice(pertPredecessorItem.item.predecessors.indexOf(previousPredecessorItem), 1);
                                pertItem.predecessors.push(previousPredecessorItem);
                            }
                            for (k = 0; k < pertChartItems.length; k++) {
                                var possibleSuccessorItem = pertChartItems[k];
                                if (!possibleSuccessorItem.predecessors)
                                    continue;
                                for (var l = 0; l < possibleSuccessorItem.predecessors.length; l++) {
                                    var successorPredecessorItem = possibleSuccessorItem.predecessors[l];
                                    if (successorPredecessorItem.item != previousItem)
                                        continue;
                                    successorPredecessorItem.item = pertItem;
                                }
                            }
                            pertItem.content = item.content != null ? item.content.toString() : null;
                            pertItem.displayedText = pertItem.displayedText.replace("'", "");
                            pertChartItems.splice(pertChartItems.indexOf(previousItem), 1);
                        }
                    }
                }
                return pertChartItems;
            },
            getNetworkDiagramItems = function (maxIndentation, startContent, finishContent, items, settings) {
                if (typeof maxIndentation === undefinedType || maxIndentation < 0)
                    maxIndentation = Number.MAX_VALUE;
                if (typeof startContent === undefinedType)
                    startContent = "Start";
                if (typeof finishContent === undefinedType)
                    finishContent = "Finish";
                var minDate = new Date(1900, 0, 1), maxDate = new Date(new Date(10000, 0, 1).valueOf() - 1);
                var networkDiagramItems = [];
                var i, item, j, it, k, previousItem, networkItem, nextNetworkItem, predecessorItem, earlyFinish;
                // Determine dependencies.
                var dependencies = [];
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item.indentation <= maxIndentation && (!(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible))) || item.indentation == maxIndentation))
                        dependencies.push({ key: item, value: [] });
                }
                for (i = 0; i < dependencies.length; i++) {
                    item = dependencies[i].key;
                    var dependentItems = [item];
                    if (item.indentation == maxIndentation && (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)))) {
                        for (j = 0; j < items.length; j++) {
                            it = items[j];
                            if (isParent(it, item))
                                dependentItems.push(it);
                        }
                    }
                    var itemDependencies = dependencies[i].value;
                    for (j = 0; j < dependentItems.length; j++) {
                        var dependentItem = dependentItems[j];
                        var parentDependentItem = dependentItem;
                        while (parentDependentItem != null) {
                            if (typeof parentDependentItem.predecessors !== undefinedType) {
                                for (k = 0; k < parentDependentItem.predecessors.length; k++) {
                                    if (typeof parentDependentItem.predecessors[k].item === undefinedType || (typeof parentDependentItem.predecessors[k].dependencyType !== undefinedType && parentDependentItem.predecessors[k].dependencyType != "" && parentDependentItem.predecessors[k].dependencyType != "FinishStart" && parentDependentItem.predecessors[k].dependencyType != "FS"))
                                        continue;
                                    predecessorItem = parentDependentItem.predecessors[k].item;
                                    var dependentOfItem = predecessorItem;
                                    while (dependentOfItem != null && indexOfKey(dependencies, dependentOfItem) < 0)
                                        dependentOfItem = dependentOfItem.parent;
                                    if (dependentOfItem == item)
                                        continue;
                                    var dependentOfItems = [];
                                    if (dependentOfItem != null) {
                                        dependentOfItems.push(dependentOfItem);
                                    }
                                    else {
                                        for (var l = 0; l < dependencies.length; l++) {
                                            it = dependencies[l].key;
                                            if (isParent(it, predecessorItem))
                                                dependentOfItems.push(it);
                                        }
                                    }
                                    for (var m = 0; m < dependentOfItems.length; m++) {
                                        var dependentOfItemInstance = dependentOfItems[m];
                                        if (itemDependencies.indexOf(dependentOfItemInstance) < 0) {
                                            var circular = maxIndentation < Number.MAX_VALUE && dependenciesContain(dependencies, dependentOfItemInstance, item);
                                            if (!circular)
                                                itemDependencies.push(dependentOfItemInstance);
                                        }
                                    }
                                }
                            }
                            parentDependentItem = parentDependentItem.parent;
                        }
                    }
                }
                // Determine project start and finish.
                var projectStart = null, projectFinish = null;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (projectStart == null || item.start < projectStart)
                        projectStart = item.start;
                    if (projectFinish == null || item.finish > projectFinish)
                        projectFinish = item.finish;
                }
                if (projectStart == null)
                    projectStart = maxDate;
                if (projectFinish == null)
                    projectFinish = minDate;
                // Generate main task items.
                var start = { content: startContent, displayedText: startContent, earlyStart: projectStart, earlyFinish: projectStart, lateStart: maxDate, lateFinish: maxDate, isMilestone: true, effort: 0, displayedRowIndex: 0, displayedColumnIndex: 0 };
                networkDiagramItems.push(start);
                var previousNetworkItems = [start];
                var firstItems = [];
                for (i = 0; i < dependencies.length; i++) {
                    if (dependencies[i].value.length == 0)
                        firstItems.push(dependencies[i].key);
                }
                if (firstItems.length > 0) {
                    previousNetworkItems = [];
                    for (i = 0; i < firstItems.length; i++) {
                        item = firstItems[i];
                        var firstNetworkItem = { content: getContentPath(item), displayedText: getContent(item), earlyStart: minDate, earlyFinish: minDate, lateStart: maxDate, lateFinish: maxDate, effort: getEffort(item.start, item.finish, settings, getItemSchedule(item)), isMilestone: item.isMilestone, predecessors: [], tag: item };
                        previousNetworkItems.push(firstNetworkItem);
                        networkDiagramItems.push(firstNetworkItem);
                        firstNetworkItem.earlyStart = getStartWorkingTime(start.earlyFinish, settings);
                        firstNetworkItem.earlyFinish = getFinish(firstNetworkItem.earlyStart, firstNetworkItem.effort, settings);
                        firstNetworkItem.predecessors.push({ item: start, tag: item });
                    }
                    var moreItemsAreAvailable;
                    do {
                        var nextPreviousNetworkItems = [];
                        for (i = 0; i < previousNetworkItems.length; i++)
                            nextPreviousNetworkItems.push(previousNetworkItems[i]);
                        moreItemsAreAvailable = false;
                        for (i = 0; i < previousNetworkItems.length; i++) {
                            networkItem = previousNetworkItems[i];
                            previousItem = networkItem.tag;
                            var nextItems = [];
                            for (j = 0; j < dependencies.length; j++) {
                                if (dependencies[j].value.indexOf(previousItem) >= 0)
                                    nextItems.push(dependencies[j].key);
                            }
                            if (nextItems.length > 0) {
                                nextPreviousNetworkItems.splice(nextPreviousNetworkItems.indexOf(networkItem), 1);
                                for (j = 0; j < nextItems.length; j++) {
                                    item = nextItems[j];
                                    nextNetworkItem = null;
                                    for (k = 0; k < networkDiagramItems.length; k++) {
                                        if (networkDiagramItems[k].tag == item) {
                                            nextNetworkItem = networkDiagramItems[k];
                                            break;
                                        }
                                    }
                                    if (nextNetworkItem == null) {
                                        nextNetworkItem = { content: getContentPath(item), displayedText: getContent(item), earlyStart: minDate, earlyFinish: minDate, lateStart: maxDate, lateFinish: maxDate, effort: getEffort(item.start, item.finish, settings, getItemSchedule(item)), isMilestone: item.isMilestone, predecessors: [], tag: item };
                                        nextPreviousNetworkItems.push(nextNetworkItem);
                                        networkDiagramItems.push(nextNetworkItem);
                                    }
                                    earlyFinish = getStartWorkingTime(networkItem.earlyFinish, settings);
                                    if (earlyFinish > nextNetworkItem.earlyStart) {
                                        nextNetworkItem.earlyStart = earlyFinish;
                                        nextNetworkItem.earlyFinish = getFinish(nextNetworkItem.earlyStart, nextNetworkItem.effort, settings);
                                    }
                                    nextNetworkItem.predecessors.push({ item: networkItem, tag: item });
                                }
                                moreItemsAreAvailable = true;
                            }
                        }
                        previousNetworkItems = nextPreviousNetworkItems;
                    }
                    while (moreItemsAreAvailable);
                }
                var finish = { content: finishContent, displayedText: finishContent, earlyStart: minDate, earlyFinish: minDate, lateStart: projectFinish, lateFinish: projectFinish, isMilestone: true, effort: 0, predecessors: [], displayedRowIndex: 0 };
                networkDiagramItems.push(finish);
                var finishPredecessorItems = finish.predecessors;
                for (i = 0; i < previousNetworkItems.length; i++) {
                    var previousNetworkItem = previousNetworkItems[i];
                    earlyFinish = previousNetworkItem.earlyFinish;
                    if (earlyFinish > finish.earlyStart) {
                        finish.earlyStart = earlyFinish;
                        finish.earlyFinish = finish.earlyStart;
                    }
                    previousItem = previousNetworkItem.tag;
                    finishPredecessorItems.push({ item: previousNetworkItem });
                }
                // Compute dependent start and finish values.
                previousNetworkItems = [finish];
                while (previousNetworkItems.length > 0) {
                    var nextNetworkItems = [];
                    for (i = 0; i < previousNetworkItems.length; i++) {
                        networkItem = previousNetworkItems[i];
                        if (typeof networkItem.predecessors === undefinedType)
                            continue;
                        for (j = 0; j < networkItem.predecessors.length; j++) {
                            predecessorItem = networkItem.predecessors[j];
                            nextNetworkItem = predecessorItem.item;
                            var nextNetworkItemAlreadyExists = false;
                            for (k = 0; k < nextNetworkItems.length; k++) {
                                if (nextNetworkItems[k] == nextNetworkItem) {
                                    nextNetworkItemAlreadyExists = true;
                                    break;
                                }
                            }
                            if (!nextNetworkItemAlreadyExists)
                                nextNetworkItems.push(nextNetworkItem);
                            var lateStart = networkItem.lateStart;
                            if (lateStart < nextNetworkItem.lateFinish) {
                                nextNetworkItem.lateFinish = nextNetworkItem.effort > 0 ? getFinishWorkingTime(lateStart, settings) : lateStart;
                                nextNetworkItem.lateStart = getStart(nextNetworkItem.effort, nextNetworkItem.lateFinish, settings);
                            }
                        }
                    }
                    previousNetworkItems = nextNetworkItems;
                }
                // Compute slack values.
                if (networkDiagramItems.length > 2) {
                    for (i = 0; i < networkDiagramItems.length; i++) {
                        item = networkDiagramItems[i];
                        item.slack = getEffort(item.earlyStart, item.lateStart, settings);
                    }
                }
                else {
                    start.earlyStart = minDate;
                    start.earlyFinish = minDate;
                    start.lateStart = minDate;
                    start.lateFinish = minDate;
                    finish.earlyStart = maxDate;
                    finish.earlyFinish = maxDate;
                    finish.lateStart = maxDate;
                    finish.lateFinish = maxDate;
                }
                for (i = 0; i < networkDiagramItems.length; i++)
                    networkDiagramItems[i].isRelativeToTimezone = false;
                return networkDiagramItems;
            },
            dependenciesContain = function (dependencies, dependentOfItemInstance, item) {
                for (var n = 0; n < dependencies.length; n++) {
                    var previousDependency = dependencies[n];
                    if (previousDependency.key == dependentOfItemInstance) {
                        var ds = previousDependency.value;
                        if (ds.indexOf(item) >= 0) {
                            return true;
                        }
                        for (var p = 0; p < ds.length; p++) {
                            if (dependenciesContain(dependencies, ds[p], item))
                                return true;
                        }
                        break;
                    }
                }
                return false;
            },
            getContent = function (item) {
                return item.content;
            },
            getContentPath = function (item) {
                var content = getContent(item);
                return item.parent == null ? content : content + " (" + getContentPath(item.parent) + ")";
            },
            isParent = function (item, possibleParent) {
                if (item == possibleParent)
                    return true;
                if (item.parent == null)
                    return false;
                return isParent(item.parent, possibleParent);
            },

        // Common settings.
            copyCommonSettings = function (target, source) {
                if (typeof target === undefinedType)
                    return;
                target.target = source.target;
                target.theme = source.theme;
                target.border = source.border;
                target.containerClass = source.containerClass;
                target.containerStyle = source.containerStyle;
                target.isGridVisible = source.isGridVisible;
                target.gridWidth = source.gridWidth;
                target.chartWidth = source.chartWidth;
                target.isSplitterEnabled = source.isSplitterEnabled;
                target.splitterWidth = source.splitterWidth;
                target.splitterBackground = source.splitterBackground;
                target.minGridWidth = source.minGridWidth;
                target.minChartWidth = source.minChartWidth;
                target.headerBackground = source.headerBackground;
                target.headerHeight = source.headerHeight;
                target.indentationLevelWidth = source.indentationLevelWidth;
                target.gridLines = source.gridLines;
                target.horizontalGridLines = source.horizontalGridLines;
                target.verticalGridLines = source.verticalGridLines;
                target.verticalGridHeaderLines = source.verticalGridHeaderLines;
                target.horizontalChartLines = source.horizontalChartLines;
                target.displayedTime = source.displayedTime;
                target.currentTime = source.currentTime;
                target.timelineStart = source.timelineStart;
                target.timelineFinish = source.timelineFinish;
                target.scales = source.scales;
                target.updateScale = source.updateScale;
                target.hourWidth = source.hourWidth;
                target.workingWeekStart = source.workingWeekStart;
                target.workingWeekFinish = source.workingWeekFinish;
                target.visibleDayStart = source.visibleDayStart;
                target.visibleDayFinish = source.visibleDayFinish;
                target.visibleWeekStart = source.visibleWeekStart;
                target.visibleWeekFinish = source.visibleWeekFinish;
                target.specialNonworkingDays = source.specialNonworkingDays;
                target.months = source.months;
                target.daysOfWeek = source.daysOfWeek;
                target.weekStartDay = source.weekStartDay;
                target.dateFormatter = source.dateFormatter;
                target.dateTimeFormatter = source.dateTimeFormatter;
                target.dateTimeParser = source.dateTimeParser;
                target.isRelativeToTimezone = source.isRelativeToTimezone;
                target.classic = source.classic;
            },

        // Utilities.
            trim = function (value) {
                return value.replace(/^\s*/, "").replace(/\s*$/, "");
            },
            indexOfKey = function (dictionary, key) {
                for (var i = 0; i < dictionary.length; i++) {
                    if (dictionary[i].key == key)
                        return i;
                }
                return -1;
            },
            dequeue = function (queue) {
                var item = queue[0];
                queue.splice(0, 1);
                return item;
            },
            convertToLocalTimezone = function (date) {
                return typeof date !== undefinedType ? new Date(date.valueOf() + date.getTimezoneOffset() * minuteDuration) : date;
            },
            convertToUTC = function (date) {
                return typeof date !== undefinedType ? new Date(date.valueOf() - date.getTimezoneOffset() * minuteDuration) : date;
            },

        // Interface.
            initializeInterface = function (ganttChartView, items, settings) {
                var ci;
                for (ci = 0; ci < items.length; ci++)
                    items[ci].ganttChartView = ganttChartView;
                for (ci = 0; ci < items.length; ci++) {
                    var item = items[ci];
                    if (typeof item.parts !== undefinedType) {
                        if (typeof item.isGroup === undefinedType) {
                            item.isGroup = true;
                            item.isSummaryEnabled = false;
                        }
                        initializeItems(item.parts, settings);
                        if (item.isGroup || typeof item.isBarVisible === undefinedType)
                            item.isBarVisible = false;
                        for (var pi = 0; pi < item.parts.length; pi++) {
                            var part = item.parts[pi];
                            part.ganttChartView = item.ganttChartView;
                            part.ganttChartItem = item;
                            part.isPart = true;
                            part.isVirtuallyVisible = true;
                            if (item.isGroup || typeof part.indentation === undefinedType)
                                part.indentation = 0;
                            if (item.isGroup || typeof part.displayRowIndex === undefinedType)
                                part.displayRowIndex = -1;
                            part.isInternallyHidden = true;
                            if (items.indexOf(part) >= 0)
                                continue;
                            items.splice(items.length, 0, part);
                        }
                    }
                }
                ganttChartView.items = items;
                ganttChartView.settings = settings;
                ganttChartView.refresh = function () { refresh(ganttChartView); }
                ganttChartView.refreshItems = function () { refreshItems(items); }
                ganttChartView.refreshGridItems = function () { refreshGridItems(items); }
                ganttChartView.refreshChartItems = function () { refreshChartItems(items, ganttChartView); }
                ganttChartView.refreshGridItem = refreshGridItem;
                ganttChartView.refreshChartItem = refreshChartItem;
                ganttChartView.refreshItem = refreshItem;
                ganttChartView.refreshPredecessorItems = refreshPredecessorItems;
                ganttChartView.refreshItemGraph = refreshItemGraph;
                ganttChartView.refreshItemPath = refreshItemPath;
                ganttChartView.refreshItemNeighbourhood = function (item) { refreshItemNeighbourhood(item, items, ganttChartView, settings); }
                ganttChartView.refreshCurrentTimeLine = function () { refreshCurrentTimeLine(ganttChartView.chartHeader, ganttChartView.chartContent, items, settings); }
                ganttChartView.setCurrentTime = function (currentTime) { settings.currentTime = currentTime; ganttChartView.refreshCurrentTimeLine(); }
                ganttChartView.updateCurrentTime = function () { var currentTime = new Date(); currentTime = new Date(currentTime.valueOf() - currentTime.getTimezoneOffset() * minuteDuration); ganttChartView.setCurrentTime(currentTime); }
                ganttChartView.getCurrentItem = function () { return ganttChartView.currentItem; }
                ganttChartView.getSelectedItem = function () { return ganttChartView.selectedItem; }
                ganttChartView.getSelectedItems = function () { return ganttChartView.selectedItems; }
                ganttChartView.selectItem = function (item) { selectItem(item, settings); }
                ganttChartView.unselectItem = function (item) { unselectItem(item, settings); }
                ganttChartView.expandItem = function (item) { setItemExpansion(item, true, true); }
                ganttChartView.collapseItem = function (item) { setItemExpansion(item, false, true); }
                ganttChartView.scrollToItem = scrollToItem;
                ganttChartView.scrollToBottom = function () { scrollToBottom(ganttChartView); }
                ganttChartView.scrollToDateTime = function (dateTime) { scrollToDateTime(dateTime, ganttChartView); }
                ganttChartView.increaseTimelinePage = function (timeAmount) { settings.timelineStart = new Date(settings.timelineStart.valueOf() + timeAmount); settings.timelineFinish = new Date(settings.timelineFinish.valueOf() + timeAmount); refresh(ganttChartView); }
                ganttChartView.decreaseTimelinePage = function (timeAmount) { settings.timelineStart = new Date(settings.timelineStart.valueOf() - timeAmount); settings.timelineFinish = new Date(settings.timelineFinish.valueOf() - timeAmount); refresh(ganttChartView); }
                ganttChartView.setSplitterPosition = function (gridWidth, chartWidth) { setSplitterPosition(gridWidth, chartWidth, ganttChartView, settings); }
                ganttChartView.getChartPosition = function (dateTime) { return getChartPosition(dateTime, settings); }
                ganttChartView.getChartWidth = function () { return getChartWidth(settings); }
                ganttChartView.getDateTime = function (chartPosition) { return getDateTime(chartPosition, settings); }
                ganttChartView.getWorkingTime = function (dateTime) { return getWorkingTime(dateTime, settings); }
                ganttChartView.getStartWorkingTime = function (dateTime) { return getStartWorkingTime(dateTime, settings); }
                ganttChartView.getFinishWorkingTime = function (dateTime) { return getFinishWorkingTime(dateTime, settings); }
                ganttChartView.getEffort = function (start, finish) { return getEffort(start, finish, settings); }
                ganttChartView.getFinish = function (start, effort) { return getFinish(start, effort, settings); }
                ganttChartView.getStart = function (effort, finish) { return getStart(effort, finish, settings); }
                ganttChartView.getCompletion = function (start, completedFinish, finish) { return getCompletion(start, completedFinish, finish, settings); }
                ganttChartView.getCompletedFinish = function (start, completion, finish) { return getCompletedFinish(start, completion, finish, settings); }
                ganttChartView.getItemsHeight = function () { return getItemsHeight(items, settings); }
                ganttChartView.getItemTop = function (item) { return getItemTop(item, items, settings); }
                ganttChartView.onItemPropertyChanged = onItemPropertyChanged;
                ganttChartView.initializeTaskDraggingThumbs = function (startThumb, startOnlyThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight) { setTaskDraggingThumbs(startThumb, startOnlyThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight, ganttChartView.items, ganttChartView, ganttChartView.settings); }
                ganttChartView.initializeDependencyDraggingThumbs = function (thumb, startThumb, containerGroup, item, itemTop, itemRight, itemLeft) { setDependencyDraggingThumbs(thumb, startThumb, containerGroup, item, itemTop, itemRight, itemLeft, ganttChartView.items, ganttChartView, ganttChartView.settings); }
                ganttChartView.insertItem = function (index, item) { insertItem(index, item, ganttChartView, items, settings); }
                ganttChartView.addItem = function (item) { ganttChartView.insertItem(items.length, item); }
                ganttChartView.insertItems = function (index, items) { for (var i = 0; i < items.length; i++) ganttChartView.insertItem(index++, items[i]); }
                ganttChartView.addItems = function (items) { for (var i = 0; i < items.length; i++) ganttChartView.addItem(items[i]); }
                ganttChartView.removeItem = function (item) { removeItem(item, ganttChartView, items, settings); }
                ganttChartView.removeItems = function (items) { for (var i = 0; i < items.length; i++) ganttChartView.removeItem(items[i]); }
                ganttChartView.increaseItemIndentation = function (item) { increaseItemIndentation(item, items, ganttChartView, settings); }
                ganttChartView.decreaseItemIndentation = function (item) { decreaseItemIndentation(item, items, ganttChartView, settings); }
                ganttChartView.setItemContent = function (item, value) { item.content = value; onItemPropertyChanged(item, "content", true, true); }
                ganttChartView.setItemStart = function (item, value) { item.start = getStartWorkingTime(value, settings, getItemSchedule(item)); item.preferredStart = item.start; onItemPropertyChanged(item, "start", true, true); if (item.completedFinish < item.start) { item.completedFinish = item.start; onItemPropertyChanged(item, "completedFinish", false, true); } }
                ganttChartView.setItemFinish = function (item, value) { item.finish = getFinishWorkingTime(value, settings, getItemSchedule(item)); onItemPropertyChanged(item, "finish", true, true); if (item.completedFinish > item.finish) { item.completedFinish = item.finish; onItemPropertyChanged(item, "completedFinish", false, true); } }
                ganttChartView.setItemIsMilestone = function (item, value) { item.isMilestone = value; onItemPropertyChanged(item, "isMilestone", true, true); }
                ganttChartView.getItemEffort = function (item) { return getItemEffort(item, settings); }
                ganttChartView.setItemEffort = function (item, value) { item.finish = getFinish(item.start, value, settings, getItemSchedule(item)); onItemPropertyChanged(item, "finish", true, true); if (item.completedFinish > item.finish) { item.completedFinish = item.finish; onItemPropertyChanged(item, "completedFinish", false, true); } }
                ganttChartView.getItemTotalEffort = function (item) { return getItemTotalEffort(item); }
                ganttChartView.setItemTotalEffort = function (item, value) { setItemTotalEffort(item, value); }
                ganttChartView.setItemHasFixedEffort = function (item, value) { setItemHasFixedEffort(item, value, settings); }
                ganttChartView.getItemDuration = function (item) { return getEffort(item.start, item.finish, settings, getItemSchedule(item)); }
                ganttChartView.setItemDuration = ganttChartView.setItemEffort;
                ganttChartView.getItemCompletedEffort = function (item) { return getItemCompletedEffort(item, settings); }
                ganttChartView.setItemCompletedEffort = function (item, value) { item.completedFinish = getFinish(item.start, value, settings, getItemSchedule(item)); if (item.completedFinish > item.finish) item.completedFinish = item.finish; onItemPropertyChanged(item, "completedFinish", true, true); }
                ganttChartView.getItemTotalCompletedEffort = function (item) { return getItemTotalCompletedEffort(item); }
                ganttChartView.setItemTotalCompletedEffort = function (item, value) { setItemTotalCompletedEffort(item, value); }
                ganttChartView.getItemCompletion = function (item) { return ganttChartView.getItemCompletedEffort(item) / ganttChartView.getItemEffort(item); }
                ganttChartView.setItemCompletion = function (item, value) { ganttChartView.setItemCompletedEffort(item, value * ganttChartView.getItemEffort(item)); }
                ganttChartView.isItemCompleted = function (item) { return ganttChartView.getItemCompletion(item) >= 1 || ((item.isMilestone || item.finish.valueOf() <= item.start.valueOf()) && typeof item.isSetAsCompleted !== undefinedType && item.isSetAsCompleted); }
                ganttChartView.setItemAsCompleted = function (item) { if (item.isMilestone || item.finish.valueOf() <= item.start.valueOf()) item.isSetAsCompleted = true; ganttChartView.setItemCompletion(item, 1); }
                ganttChartView.hasItemStarted = function (item) { return hasStarted(item); }
                ganttChartView.setItemAsNotStarted = function (item) { if (item.isMilestone || item.finish.valueOf() <= item.start.valueOf()) item.isSetAsCompleted = false; ganttChartView.setItemCompletion(item, 0); }
                ganttChartView.isItemOnSchedule = function (item) { return isOnSchedule(item); }
                ganttChartView.setItemAssignmentsContent = function (item, value) { item.assignmentsContent = value; onItemPropertyChanged(item, "assignmentsContent", true, true); }
                ganttChartView.getItemPredecessorsString = function (item, zeroBased) { return getItemPredecessorsString(item, items, zeroBased); }
                ganttChartView.setItemPredecessorsString = function (item, value, zeroBased) { setItemPredecessorsString(item, value, items, zeroBased); onItemPropertyChanged(item, "predecessors", true, true); }
                ganttChartView.getItemIndexString = function (item, zeroBased) { if (typeof zeroBased === undefinedType) zeroBased = false; return typeof item.index !== undefinedType ? (item.index + (!zeroBased ? 1 : 0)).toString() : ""; }
                ganttChartView.getItemWbsIndexString = function (item, zeroBased) { return getItemWbsIndex(item, items, zeroBased).toString(); }
                ganttChartView.moveRange = function (fromIndex, count, toIndex) { moveRange(fromIndex, count, toIndex, ganttChartView, items); }
                ganttChartView.moveItem = function (item, toIndex) { move(item, toIndex, ganttChartView, items); }
                ganttChartView.moveItemUp = function (item) { var index = items.indexOf(item); if (index <= 0) return; move(item, index - 1, ganttChartView, items); }
                ganttChartView.moveItemDown = function (item) { var index = items.indexOf(item); if (index < 0 || index >= items.length - 1) return; move(item, index + 1, ganttChartView, items); }
                ganttChartView.moveItemHierarchy = function (item, toIndex) {
                    var index = items.indexOf(item);
                    for (var i = index + 1; i < items.length; i++) {
                        if (items[i].indentation <= item.indentation)
                            break;
                    }
                    var c = i - index;
                    moveRange(index, c, toIndex, ganttChartView, items);
                }
                ganttChartView.moveItemHierarchyUp = function (item) {
                    var index = items.indexOf(item);
                    for (var i = index + 1; i < items.length; i++) {
                        if (items[i].indentation <= item.indentation)
                            break;
                    }
                    var c = i - index;
                    var toIndex = index;
                    while (toIndex-- > 0) {
                        if (items[toIndex].indentation < item.indentation)
                            return;
                        if (items[toIndex].indentation == item.indentation)
                            break;
                    }
                    moveRange(index, c, toIndex, ganttChartView, items);
                }
                ganttChartView.moveItemHierarchyDown = function (item) {
                    var index = items.indexOf(item);
                    for (var i = index + 1; i < items.length; i++) {
                        if (items[i].indentation <= item.indentation)
                            break;
                    }
                    var c = i - index;
                    var toIndex = index + c;
                    while (toIndex++ < items.length - 1) {
                        if (items[toIndex].indentation <= item.indentation)
                            break;
                    }
                    if (items[toIndex - 1].indentation < item.indentation)
                        return;
                    moveRange(index, c, toIndex - c, ganttChartView, items);
                }
                ganttChartView.exportContent = function (exportSettings, output) { if (typeof exportSettings === undefinedType) exportSettings = {}; exportContent(exportSettings.title, exportSettings.preparingMessage, exportSettings.isGridVisible, exportSettings.columnIndexes, exportSettings.timelineStart, exportSettings.timelineFinish, exportSettings.isRelativeToTimezone, exportSettings.hourWidth, exportSettings.startRowIndex, exportSettings.endRowIndex, output, false, exportSettings.rotate, false, items, settings); }
                ganttChartView.print = function (exportSettings) { if (typeof exportSettings === undefinedType) exportSettings = {}; exportContent(exportSettings.title, exportSettings.preparingMessage, exportSettings.isGridVisible, exportSettings.columnIndexes, exportSettings.timelineStart, exportSettings.timelineFinish, exportSettings.isRelativeToTimezone, exportSettings.hourWidth, exportSettings.startRowIndex, exportSettings.endRowIndex, null, true, exportSettings.rotate, exportSettings.autoClose, items, settings); }
                ganttChartView.getRootItems = function () { return getRootItems(items); }
                ganttChartView.getLeafItems = function () { return getLeafItems(items); }
                ganttChartView.getSummaryItems = function () { return getSummaryItems(items); }
                ganttChartView.getProjectStart = function () { return getProjectStart(items); }
                ganttChartView.getProjectFinish = function () { return getProjectFinish(items); }
                ganttChartView.getProjectEffort = function () { return getProjectEffort(items, settings); }
                ganttChartView.getProjectTotalEffort = function () { return getProjectTotalEffort(items, settings); }
                ganttChartView.getProjectCompletedEffort = function () { return getProjectCompletedEffort(items, settings); }
                ganttChartView.getProjectTotalCompletedEffort = function () { return getProjectTotalCompletedEffort(items, settings); }
                ganttChartView.getProjectCompletion = function () { return getProjectCompletion(items, settings); }
                ganttChartView.isItemCritical = function (item, criticalDelay) { return isItemCritical(item, criticalDelay, items, settings); }
                ganttChartView.getCriticalItems = function (criticalDelay, specificItems) { return getCriticalItems(criticalDelay, specificItems ? specificItems : items, settings); }
                ganttChartView.getPertCriticalItems = function (maxIndentation, specificItems) { return getPertCriticalItems(ganttChartView, specificItems ? specificItems : items, settings, maxIndentation); }
                ganttChartView.ensureDependencyConstraints = function () { ensureDependencyConstraints(items, settings, ganttChartView); }
                ganttChartView.setupBaseline = function () { setupBaseline(items); }
                ganttChartView.rescheduleItemToStart = function (item, start) { rescheduleItemToStart(item, start, items, settings); }
                ganttChartView.rescheduleItemToFinish = function (item, finish) { rescheduleItemToFinish(item, finish, items, settings); }
                ganttChartView.splitRemainingWork = function (item, remainingSuffix, completedSuffix) { return splitRemainingWork(item, remainingSuffix, completedSuffix, ganttChartView, items, settings); }
                ganttChartView.optimizeWork = function (dependenciesOnly, includeStartedTasks, start, singlePassTaskLeveling) { return optimizeWork(dependenciesOnly, includeStartedTasks, start, singlePassTaskLeveling, ganttChartView, items, settings); }
                ganttChartView.levelAllocations = function (items) { return levelAllocations(items, ganttChartView); }
                ganttChartView.levelResources = function (includeStartedTasks, start) { return levelResources(includeStartedTasks, start, items, settings, ganttChartView); }
                ganttChartView.getItemSuccessors = function (item) { return getSuccessors(item, items); }
                ganttChartView.getItemSuccessorPredecessorItems = function (item) { return getSuccessorPredecessorItems(item, items); };
                ganttChartView.getItemAllocationUnits = getAllocationUnits;
                ganttChartView.getItemAssignments = getItemAssignments;
                ganttChartView.getItemAssignedResources = getItemAssignedResources;
                ganttChartView.getResourceAssignments = function (resourceName) { return getResourceAssignments(resourceName, items); }
                ganttChartView.getResourceAssignedItems = function (resourceName) { return getResourceAssignedItems(resourceName, items); }
                ganttChartView.getAssignedResources = function () { return getAssignedResources(items); }
                ganttChartView.getItemAssignmentsCost = function (item) { return getItemAssignmentsCost(item, settings); }
                ganttChartView.getItemExtraCost = function (item) { return getItemExtraCost(item, settings); }
                ganttChartView.getItemCost = function (item) { return getItemCost(item, settings); }
                ganttChartView.setItemCost = function (item, value) { setItemCost(item, value, settings); }
                ganttChartView.getResourceCost = function (resourceName) { return getResourceCost(resourceName, items, settings); }
                ganttChartView.getProjectCost = function () { return getProjectCost(items, settings); }
                ganttChartView.getScheduleChartItems = function (assignableResources) { return getScheduleChartItems(assignableResources, items, settings); }
                ganttChartView.getAllocations = function (resourceName) { return getAllocations(resourceName, items); }
                ganttChartView.getLoadChartItems = function (resources) { return getLoadChartItems(resources, items, settings); }
                ganttChartView.getFilteredGanttChartItems = function (resources) { return getFilteredGanttChartItems(resources, items); }
                ganttChartView.copyCommonSettings = function (targetSettings) { copyCommonSettings(targetSettings, settings); };
                ganttChartView.getPertChartItems = function (maxIndentation, startContent, finishContent, linkContent, completedContentSuffix, startingContentSuffix, specificItems) { return getPertChartItems(maxIndentation, startContent, finishContent, linkContent, completedContentSuffix, startingContentSuffix, specificItems ? specificItems : items, settings); }
                ganttChartView.getNetworkDiagramItems = function (maxIndentation, startContent, finishContent, specificItems) { return getNetworkDiagramItems(maxIndentation, startContent, finishContent, specificItems ? specificItems : items, settings); }
                ganttChartView.getOutputDate = convertToLocalTimezone;
                ganttChartView.getInputDate = convertToUTC;
                ganttChartView.itemDependsOf = function (item, otherItem) { return dependsOf(item, otherItem); }
            };

        return {
            initialize: initialize,
            initializeItems: initializeItems,
            refresh: refresh,
            getDefaultColumns: getDefaultColumns,
            getDefaultCollapsedToggleButtonTemplate: getDefaultCollapsedToggleButtonTemplate,
            getDefaultExpandedToggleButtonTemplate: getDefaultExpandedToggleButtonTemplate,
            getDefaultScales: getDefaultScales,
            getDefaultStyleDefinitionTemplate: getDefaultStyleDefinitionTemplate,
            getDefaultStandardTaskTemplate: getDefaultStandardTaskTemplate,
            getDefaultSummaryTaskTemplate: getDefaultSummaryTaskTemplate,
            getDefaultMilestoneTaskTemplate: getDefaultMilestoneTaskTemplate,
            getDefaultItemTemplate: getDefaultItemTemplate,
            getDefaultAssignmentsTemplate: getDefaultAssignmentsTemplate,
            getDefaultDependencyLineTemplate: getDefaultDependencyLineTemplate,
            getDefaultPredecessorItemTemplate: getDefaultPredecessorItemTemplate,
            initializeTaskDraggingThumbs: function (startThumb, startOnlyThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight) { item.ganttChartView.initializeTaskDraggingThumbs(startThumb, startOnlyThumb, finishThumb, completedFinishThumb, item, itemLeft, itemRight, itemCompletedRight); },
            initializeDependencyDraggingThumb: function (thumb, containerGroup, item, itemTop, itemRight) { item.ganttChartView.initializeDependencyDraggingThumb(thumb, containerGroup, item, itemTop, itemRight); },
            getWorkingTime: getWorkingTime,
            getEffort: getEffort,
            getFinish: getFinish,
            getStart: getStart,
            getCompletion: getCompletion,
            getCompletedFinish: getCompletedFinish,
            getWeekStart: getTimelineStart,
            getWeekFinish: getTimelineFinish,
            defaultDateTimeFormatter: function (date) { return getDateTimeText(getFormattableDate(date)); },
            defaultDateFormatter: function (date) { return getDateText(getFormattableDate(date)); },
            defaultDateTimeParser: function (value) { return getParsedDate(parseDateTimeText(value)); },
            textColumnTemplateBase: function (document, valueGetter, isVisibleGetter) {
                var value = valueGetter();
                if (typeof value === undefinedType || (typeof isVisibleGetter !== undefinedType && !isVisibleGetter()))
                    value = "";
                return document.createTextNode(value);
            },
            textInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                var value = valueGetter();
                if (typeof value === undefinedType)
                    value = "";
                input.setAttribute("value", value);
                var hiddenDefinition = "";
                if (typeof isVisibleGetter !== undefinedType && !isVisibleGetter())
                    hiddenDefinition = "; display: none";
                var boldDefinition = "";
                if (typeof isBoldGetter !== undefinedType && isBoldGetter())
                    boldDefinition = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + hiddenDefinition + boldDefinition + (classic ? "" : "; padding: 1px; font-size: inherit;"));
                if (typeof isEnabledGetter !== undefinedType && !isEnabledGetter())
                    input.setAttribute("disabled", "true");
                var onChange = function () { valueSetter(input.value); };
                input.addEventListener("change", function (e) { onChange(); }, true);
                input.addEventListener("keypress", function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange();
                    }
                }, true);
                input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, true);
                input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, true);
                return input;
            },
            optionSelectColumnTemplateBase: function (document, width, optionCollectionGetter, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                var select = document.createElement("select");
                var addOption = function (optionValue, selectedValue) {
                    var option = document.createElement("option");
                    option.appendChild(document.createTextNode(optionValue));
                    if (optionValue == selectedValue)
                        option.setAttribute("selected", true);
                    select.appendChild(option);
                }
                var value = valueGetter();
                if (typeof value === undefinedType)
                    value = "";
                addOption("", value);
                var options = optionCollectionGetter();
                for (var i = 0; i < options.length; i++)
                    addOption(options[i], value);
                var hiddenDefinition = "";
                if (typeof isVisibleGetter !== undefinedType && !isVisibleGetter())
                    hiddenDefinition = "; display: none";
                var boldDefinition = "";
                if (typeof isBoldGetter !== undefinedType && isBoldGetter())
                    boldDefinition = "; font-weight: bold";
                select.setAttribute("style", "background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + hiddenDefinition + boldDefinition + (classic ? "" : "; padding: 1px; font-size: inherit;"));
                if (typeof isEnabledGetter !== undefinedType && !isEnabledGetter())
                    select.setAttribute("disabled", "true");
                var onChange = function () { valueSetter(select.value); };
                select.addEventListener("change", function (e) { onChange(); }, true);
                select.addEventListener("keypress", function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange();
                    }
                }, true);
                select.addEventListener("focus", function (e) { select.style.backgroundColor = "White"; }, true);
                select.addEventListener("blur", function (e) { select.style.backgroundColor = "Transparent"; }, true);
                return select;
            },
            numberInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                return DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase(document, width,
                    function () {
                        var value = valueGetter();
                        if (!isNaN(value))
                            return value;
                        return "";
                    },
                    function (value) {
                        value = parseFloat(value);
                        if (isNaN(value))
                            value = 0;
                        valueSetter(value);
                    },
                    isEnabledGetter, isVisibleGetter, isBoldGetter, classic
                );
            },
            percentInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                return DlhSoft.Controls.GanttChartView.numberInputColumnTemplateBase(document, width,
                    valueGetter,
                    function (value) {
                        if (value < 0)
                            value = 0;
                        if (value > 100)
                            value = 100;
                        valueSetter(value);
                    },
                    isEnabledGetter, isVisibleGetter, isBoldGetter, classic
                );
            },
            timeSpanInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, scale, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                if (typeof scale === undefinedType)
                    scale = 1;
                return DlhSoft.Controls.GanttChartView.numberInputColumnTemplateBase(document, width,
                    function () {
                        var time = valueGetter() / (hourDuration * scale);
                        return Math.round(time * 100) / 100;
                    },
                    function (value) {
                        value = parseFloat(value);
                        if (value < 0)
                            value = 0;
                        valueSetter(value * (hourDuration * scale));
                    },
                    isEnabledGetter, isVisibleGetter, isBoldGetter, classic
                );
            },
            datePickerInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, dateTimeFormatter, dateTimeParser, weekStart, classic) {
                if (!daysOfWeek)
                    daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
                var inputDateTimeFormatter = dateTimeFormatter, inputDateTimeParser = dateTimeParser;
                if (!dateTimeFormatter)
                    dateTimeFormatter = DlhSoft.Controls.GanttChartView.defaultDateTimeFormatter;
                if (!dateTimeParser)
                    dateTimeParser = DlhSoft.Controls.GanttChartView.defaultDateTimeParser;
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                var value = valueGetter();
                if (typeof value === undefinedType)
                    value = "";
                else if (value != null)
                    value = dateTimeFormatter(value);
                input.setAttribute("value", value);
                if (DlhSoft.Controls.DatePicker) {
                    input.addEventListener("focus", function (e) {
                        var datePicker = DlhSoft.Controls.DatePicker.get(input);
                        if (!datePicker || !datePicker.isOpen) {
                            var selectionStart = 0, selectionEnd = 0;
                            try { selectionStart = input.selectionStart; selectionEnd = input.selectionEnd; } catch (exc) { }
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            datePicker = DlhSoft.Controls.DatePicker.initialize(input, undefined, { inputStyle: null, defaultTimeOfDay: defaultTimeOfDay, isDropDownButtonVisible: false, popupStyle: "margin-top: 1px; background-color: White; border: 1px solid #e0e0e0", calendarSelectorLevels: calendarSelectorLevels, months: months, daysOfWeek: getAbbreviations(daysOfWeek), weekStart: weekStart, dateTimeFormatter: inputDateTimeFormatter, dateTimeParser: inputDateTimeParser }, internalLicense);
                            datePicker.openDropDown();
                            setTimeout(function () { try { input.selectionStart = selectionStart; input.selectionEnd = selectionEnd; } catch (exc) { } }, 100);
                            if (navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null) {
                                setTimeout(function () { try { input.focus(); } catch (exc) { } }, 100);
                            }
                            else if (document.createEvent) {
                                setTimeout(function () {
                                    var ev = document.createEvent("MouseEvents");
                                    ev.initEvent("blur", true, false);
                                    input.dispatchEvent(ev);
                                });
                            }
                        }
                    }, true);
                }
                var hiddenDefinition = "";
                if (typeof isVisibleGetter !== undefinedType && !isVisibleGetter())
                    hiddenDefinition = "; display: none";
                var boldDefinition = "";
                if (typeof isBoldGetter !== undefinedType && isBoldGetter())
                    boldDefinition = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + hiddenDefinition + boldDefinition + (classic ? "" : "; padding: 1px; font-size: inherit;"));
                if (typeof isEnabledGetter !== undefinedType && !isEnabledGetter())
                    input.setAttribute("disabled", "true");
                var onChange = function () {
                    var value = input.value;
                    if (value != "")
                        value = dateTimeParser(value);
                    else
                        value = null;
                    valueSetter(value);
                };
                input.addEventListener("change", function (e) { onChange(); }, true);
                input.addEventListener("keypress", function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange();
                    }
                }, true);
                input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, true);
                input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, true);
                return input;
            },
            dateTimePickerInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, dateTimeFormatter, dateTimeParser, weekStart, classic) {
                if (!daysOfWeek)
                    daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
                var inputDateTimeFormatter = dateTimeFormatter, inputDateTimeParser = dateTimeParser;
                if (!dateTimeFormatter)
                    dateTimeFormatter = DlhSoft.Controls.GanttChartView.defaultDateTimeFormatter;
                if (!dateTimeParser)
                    dateTimeParser = DlhSoft.Controls.GanttChartView.defaultDateTimeParser;
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                var value = valueGetter();
                if (typeof value === undefinedType)
                    value = "";
                else if (value != null)
                    value = dateTimeFormatter(value);
                input.setAttribute("value", value);
                if (DlhSoft.Controls.DateTimePicker || DlhSoft.Controls.DatePicker) {
                    input.addEventListener("focus", function (e) {
                        var datePicker = (DlhSoft.Controls.DateTimePicker ? DlhSoft.Controls.DateTimePicker : DlhSoft.Controls.DatePicker).get(input);
                        if (!datePicker || !datePicker.isOpen) {
                            var selectionStart = 0, selectionEnd = 0;
                            try { selectionStart = input.selectionStart; selectionEnd = input.selectionEnd; } catch (exc) { }
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            datePicker = (DlhSoft.Controls.DateTimePicker ? DlhSoft.Controls.DateTimePicker : DlhSoft.Controls.DatePicker).initialize(input, undefined, { inputStyle: null, defaultTimeOfDay: defaultTimeOfDay, isDropDownButtonVisible: false, popupStyle: "margin-top: 1px; background-color: White; border: 1px solid #e0e0e0", calendarSelectorLevels: calendarSelectorLevels, months: months, daysOfWeek: getAbbreviations(daysOfWeek), weekStart: weekStart, dateTimeFormatter: inputDateTimeFormatter, dateTimeParser: inputDateTimeParser }, internalLicense);
                            datePicker.openDropDown();
                            setTimeout(function () { try { input.selectionStart = selectionStart; input.selectionEnd = selectionEnd; } catch (exc) { } }, 100);
                            if (navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null) {
                                setTimeout(function () { try { input.focus(); } catch (exc) { } }, 100);
                            }
                            else if (document.createEvent) {
                                setTimeout(function () {
                                    var ev = document.createEvent("MouseEvents");
                                    ev.initEvent("blur", true, false);
                                    input.dispatchEvent(ev);
                                });
                            }
                        }
                    }, true);
                }
                var hiddenDefinition = "";
                if (typeof isVisibleGetter !== undefinedType && !isVisibleGetter())
                    hiddenDefinition = "; display: none";
                var boldDefinition = "";
                if (typeof isBoldGetter !== undefinedType && isBoldGetter())
                    boldDefinition = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + hiddenDefinition + boldDefinition + (classic ? "" : "; padding: 1px; font-size: inherit;"));
                if (typeof isEnabledGetter !== undefinedType && !isEnabledGetter())
                    input.setAttribute("disabled", "true");
                var onChange = function () {
                    var value = input.value;
                    if (value != "")
                        value = dateTimeParser(value);
                    else
                        value = null;
                    valueSetter(value);
                };
                input.addEventListener("change", function (e) { onChange(); }, true);
                input.addEventListener("keypress", function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange();
                    }
                }, true);
                input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, true);
                input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, true);
                return input;
            },
            multiSelectorComboBoxInputColumnTemplateBase: function (document, width, optionCollectionGetter, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                var value = valueGetter();
                if (typeof value === undefinedType)
                    value = "";
                input.setAttribute("value", value);
                if (DlhSoft.Controls.MultiSelectorComboBox) {
                    input.addEventListener("focus", function (e) {
                        var multiSelectorComboBox = DlhSoft.Controls.MultiSelectorComboBox.get(input);
                        if (!multiSelectorComboBox || (!multiSelectorComboBox.isOpen && multiSelectorComboBox.availableChoices.length > 0)) {
                            var optionCollection = optionCollectionGetter();
                            var selectionStart = 0, selectionEnd = 0;
                            try { selectionStart = input.selectionStart; selectionEnd = input.selectionEnd; } catch (exc) { }
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            multiSelectorComboBox = DlhSoft.Controls.MultiSelectorComboBox.initialize(input, optionCollection, undefined, { inputStyle: null, autoAppendAvailableChoices: false, isDropDownButtonVisible: false, popupStyle: "margin-top: 1px; background-color: White; border: 1px solid #e0e0e0; color: Black; font-size: small; max-height: 188px; overflow-y: auto" }, internalLicense);
                            multiSelectorComboBox.openDropDown();
                            setTimeout(function () { try { input.selectionStart = selectionStart; input.selectionEnd = selectionEnd; } catch (exc) { } }, 100);
                            if (navigator.userAgent.match(/(Android)|(IPad)|(IPhone)/i) == null) {
                                setTimeout(function () { try { input.focus(); } catch (exc) { } }, 100);
                            }
                            else if (document.createEvent) {
                                setTimeout(function () {
                                    var ev = document.createEvent("MouseEvents");
                                    ev.initEvent("blur", true, false);
                                    input.dispatchEvent(ev);
                                });
                            }
                        }
                    }, true);
                }
                var hiddenDefinition = "";
                if (typeof isVisibleGetter !== undefinedType && !isVisibleGetter())
                    hiddenDefinition = "; display: none";
                var boldDefinition = "";
                if (typeof isBoldGetter !== undefinedType && isBoldGetter())
                    boldDefinition = "; font-weight: bold";
                input.setAttribute("style", "boutline: none; ackground-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + hiddenDefinition + boldDefinition + (classic ? "" : "; padding: 1px; font-size: inherit;"));
                if (typeof isEnabledGetter !== undefinedType && !isEnabledGetter())
                    input.setAttribute("disabled", "true");
                var onChange = function () { valueSetter(input.value); };
                input.addEventListener("change", function (e) { onChange(); }, true);
                input.addEventListener("keypress", function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange();
                    }
                }, true);
                input.addEventListener("focus", function (e) { input.style.backgroundColor = "White"; }, true);
                input.addEventListener("blur", function (e) { input.style.backgroundColor = "Transparent"; }, true);
                return input;
            },
            dateTimeInputColumnTemplateBase: function (document, width, valueGetter, valueSetter, isEnabledGetter, isVisibleGetter, isBoldGetter, classic) {
                return DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase(document, width,
                    function () {
                        var value = valueGetter();
                        if (value != null)
                            return DlhSoft.Controls.GanttChartView.defaultDateTimeFormatter(value);
                        return "";
                    },
                    function (value) {
                        if (value != "")
                            value = DlhSoft.Controls.GanttChartView.defaultDateTimeParser(value);
                        else
                            value = null;
                        valueSetter(value);
                    },
                    isEnabledGetter, isVisibleGetter, isBoldGetter, classic
                );
            },
            getIndexColumnTemplate: function () {
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.textColumnTemplateBase(document, function () { return ganttChartView.getItemIndexString(item); });
                }
            },
            getWbsColumnTemplate: function (zeroBased) {
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.textColumnTemplateBase(document, function () { return ganttChartView.getItemWbsIndexString(item, zeroBased); });
                }
            },
            getEffortColumnTemplate: function (inputWidth, scale, isInputDisabled, classic) {
                if (typeof scale === undefinedType)
                    scale = 1;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.timeSpanInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemEffort(item);
                        },
                        function (value) {
                            ganttChartView.setItemEffort(item, value);
                            ganttChartView.refreshItemPath(item);
                        },
                        scale,
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getDurationColumnTemplate: function (inputWidth, scale, isInputDisabled, classic) {
                if (typeof scale === undefinedType)
                    scale = 1;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.timeSpanInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemDuration(item);
                        },
                        function (value) {
                            ganttChartView.setItemDuration(item, value);
                            ganttChartView.refreshItemPath(item);
                        },
                        scale,
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getTotalEffortColumnTemplate: function (inputWidth, scale, isInputDisabled, classic) {
                if (typeof scale === undefinedType)
                    scale = 1;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.timeSpanInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemTotalEffort(item);
                        },
                        function (value) {
                            ganttChartView.setItemTotalEffort(item, value);
                            ganttChartView.refreshItemPath(item);
                        },
                        scale,
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getCompletedEffortColumnTemplate: function (inputWidth, scale, isInputDisabled, classic) {
                if (typeof scale === undefinedType)
                    scale = 1;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.timeSpanInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemCompletedEffort(item);
                        },
                        function (value) {
                            ganttChartView.setItemCompletedEffort(item, value);
                            ganttChartView.refreshItemPath(item);
                        },
                        scale,
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getTotalCompletedEffortColumnTemplate: function (inputWidth, scale, isInputDisabled, classic) {
                if (typeof scale === undefinedType)
                    scale = 1;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.timeSpanInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemTotalCompletedEffort(item);
                        },
                        function (value) {
                            ganttChartView.setItemTotalCompletedEffort(item, value);
                            ganttChartView.refreshItemPath(item);
                        },
                        scale,
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getCompletionColumnTemplate: function (inputWidth, isInputDisabled, classic) {
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.percentInputColumnTemplateBase(document, inputWidth,
                        function () {
                            var completionPercent = ganttChartView.getItemCompletion(item) * 100;
                            return Math.round(completionPercent * 100) / 100;
                        },
                        function (value) {
                            if (typeof item.gridItem !== undefinedType) {
                                if (typeof item.completedInput !== undefinedType) {
                                    var input = item.completedInput;
                                    if (typeof input.changeEventListener !== undefinedType)
                                        input.removeEventListener("change", input.changeEventListener, true);
                                    delete item.completedInput;
                                }
                            }
                            var completion = parseFloat(value) / 100;
                            ganttChartView.setItemCompletion(item, completion);
                            ganttChartView.refreshItemPath(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getCostColumnTemplate: function (inputWidth, isInputDisabled, classic) {
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.numberInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemCost(item);
                        },
                        function (value) {
                            ganttChartView.setItemCost(item, value);
                            ganttChartView.refreshItemPath(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))); },
                        undefined,
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getPredecessorsColumnTemplate: function (inputWidth, isInputDisabled, zeroBased, classic) {
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase(document, inputWidth,
                        function () {
                            return ganttChartView.getItemPredecessorsString(item, zeroBased);
                        },
                        function (value) {
                            ganttChartView.setItemPredecessorsString(item, value, zeroBased);
                            ganttChartView.refreshItemGraph(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))); },
                        function () { return !(typeof item.isBarVisible !== undefinedType && !item.isBarVisible); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getAssignmentSelectorColumnTemplate: function (selectWidth, assignableResourceCollectionGetter, isInputDisabled, classic) {
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    return DlhSoft.Controls.GanttChartView.optionSelectColumnTemplateBase(document, selectWidth,
                        function () {
                            if (typeof assignableResourceCollectionGetter === arrayType)
                                return assignableResourceCollectionGetter;
                            return assignableResourceCollectionGetter(item);
                        },
                        function () {
                            return item.assignmentsContent;
                        },
                        function (value) {
                            item.assignmentsContent = value;
                            ganttChartView.onItemPropertyChanged(item, "assignmentsContent", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))); },
                        function () { return !(typeof item.isBarVisible !== undefinedType && !item.isBarVisible); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        classic
                    );
                }
            },
            getBaselineStartColumnTemplate: function (inputWidth, useDatePicker, useTimePicker, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, isInputDisabled, weekStart, classic) {
                if (typeof useDatePicker === undefinedType)
                    useDatePicker = true;
                if (typeof useTimePicker === undefinedType)
                    useTimePicker = true;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var template = useDatePicker ? (useTimePicker ? DlhSoft.Controls.GanttChartView.dateTimePickerInputColumnTemplateBase : DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase) : DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase;
                    return template(document, inputWidth,
                        function () {
                            return item.baselineStart != null ? getFormattableDate(item.baselineStart) : undefined;
                        },
                        function (value) {
                            if (value != null)
                                item.baselineStart = getParsedDate(value);
                            else
                                delete item.baselineStart;
                            ganttChartView.onItemPropertyChanged(item, "baselineStart", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))); },
                        function () { return !(typeof item.isBarVisible !== undefinedType && !item.isBarVisible); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek,
                        function (value) {
                            if (value == null)
                                return "";
                            return ganttChartView.settings.dateTimeFormatter(value);
                        },
                        function (text) {
                            if (text == "")
                                return null;
                            return ganttChartView.settings.dateTimeParser(text);
                        },
                        weekStart, classic
                    );
                }
            },
            getBaselineFinishColumnTemplate: function (inputWidth, useDatePicker, useTimePicker, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, isInputDisabled, weekStart, classic) {
                if (typeof useDatePicker === undefinedType)
                    useDatePicker = true;
                if (typeof useTimePicker === undefinedType)
                    useTimePicker = true;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var template = useDatePicker ? (useTimePicker ? DlhSoft.Controls.GanttChartView.dateTimePickerInputColumnTemplateBase : DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase) : DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase;
                    return template(document, inputWidth,
                        function () {
                            return item.baselineFinish != null ? getFormattableDate(item.baselineFinish) : undefined;
                        },
                        function (value) {
                            if (value != null)
                                item.baselineFinish = getParsedDate(value);
                            else
                                delete item.baselineFinish;
                            ganttChartView.onItemPropertyChanged(item, "baselineFinish", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        defaultTimeOfDay ? defaultTimeOfDay : dayDuration, calendarSelectorLevels, months, daysOfWeek,
                        function (value) {
                            if (value == null)
                                return "";
                            return ganttChartView.settings.dateTimeFormatter(value);
                        },
                        function (text) {
                            if (text == "")
                                return null;
                            return ganttChartView.settings.dateTimeParser(text);
                        },
                        weekStart, classic
                    );
                }
            },
            getMinStartColumnTemplate: function (inputWidth, useDatePicker, useTimePicker, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, isInputDisabled, weekStart, classic) {
                if (typeof useDatePicker === undefinedType)
                    useDatePicker = true;
                if (typeof useTimePicker === undefinedType)
                    useTimePicker = true;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var template = useDatePicker ? (useTimePicker ? DlhSoft.Controls.GanttChartView.dateTimePickerInputColumnTemplateBase : DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase) : DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase;
                    return template(document, inputWidth,
                        function () {
                            return item.minStart != null ? getFormattableDate(item.minStart) : undefined;
                        },
                        function (value) {
                            if (value != null)
                                item.minStart = getParsedDate(value);
                            else
                                delete item.minStart;
                            ganttChartView.onItemPropertyChanged(item, "minStart", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(typeof item.isBarVisible !== undefinedType && !item.isBarVisible); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek,
                        function (value) {
                            if (value == null)
                                return "";
                            return ganttChartView.settings.dateTimeFormatter(value);
                        },
                        function (text) {
                            if (text == "")
                                return null;
                            return ganttChartView.settings.dateTimeParser(text);
                        },
                        weekStart, classic
                    );
                }
            },
            getMaxStartColumnTemplate: function (inputWidth, useDatePicker, useTimePicker, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, isInputDisabled, weekStart, classic) {
                if (typeof useDatePicker === undefinedType)
                    useDatePicker = true;
                if (typeof useTimePicker === undefinedType)
                    useTimePicker = true;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var template = useDatePicker ? (useTimePicker ? DlhSoft.Controls.GanttChartView.dateTimePickerInputColumnTemplateBase : DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase) : DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase;
                    return template(document, inputWidth,
                        function () {
                            return item.maxStart != null ? getFormattableDate(item.maxStart) : undefined;
                        },
                        function (value) {
                            if (value != null)
                                item.maxStart = getParsedDate(value);
                            else
                                delete item.maxStart;
                            ganttChartView.onItemPropertyChanged(item, "maxStart", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(typeof item.isBarVisible !== undefinedType && !item.isBarVisible); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        defaultTimeOfDay ? defaultTimeOfDay : dayDuration, calendarSelectorLevels, months, daysOfWeek,
                        function (value) {
                            if (value == null)
                                return "";
                            return ganttChartView.settings.dateTimeFormatter(value);
                        },
                        function (text) {
                            if (text == "")
                                return null;
                            return ganttChartView.settings.dateTimeParser(text);
                        },
                        weekStart, classic
                    );
                }
            },
            getMinFinishColumnTemplate: function (inputWidth, useDatePicker, useTimePicker, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, isInputDisabled, weekStart, classic) {
                if (typeof useDatePicker === undefinedType)
                    useDatePicker = true;
                if (typeof useTimePicker === undefinedType)
                    useTimePicker = true;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var template = useDatePicker ? (useTimePicker ? DlhSoft.Controls.GanttChartView.dateTimePickerInputColumnTemplateBase : DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase) : DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase;
                    return template(document, inputWidth,
                        function () {
                            return item.minFinish != null ? getFormattableDate(item.minFinish) : undefined;
                        },
                        function (value) {
                            if (value != null)
                                item.minFinish = getParsedDate(value);
                            else
                                delete item.minFinish;
                            ganttChartView.onItemPropertyChanged(item, "minFinish", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek,
                        function (value) {
                            if (value == null)
                                return "";
                            return ganttChartView.settings.dateTimeFormatter(value);
                        },
                        function (text) {
                            if (text == "")
                                return null;
                            return ganttChartView.settings.dateTimeParser(text);
                        },
                        weekStart, classic
                    );
                }
            },
            getMaxFinishColumnTemplate: function (inputWidth, useDatePicker, useTimePicker, defaultTimeOfDay, calendarSelectorLevels, months, daysOfWeek, isInputDisabled, weekStart, classic) {
                if (typeof useDatePicker === undefinedType)
                    useDatePicker = true;
                if (typeof useTimePicker === undefinedType)
                    useTimePicker = true;
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var template = useDatePicker ? (useTimePicker ? DlhSoft.Controls.GanttChartView.dateTimePickerInputColumnTemplateBase : DlhSoft.Controls.GanttChartView.datePickerInputColumnTemplateBase) : DlhSoft.Controls.GanttChartView.dateTimeInputColumnTemplateBase;
                    return template(document, inputWidth,
                        function () {
                            return item.maxFinish != null ? getFormattableDate(item.maxFinish) : undefined;
                        },
                        function (value) {
                            if (value != null)
                                item.maxFinish = getParsedDate(value);
                            else
                                delete item.maxFinish;
                            ganttChartView.onItemPropertyChanged(item, "maxFinish", true, true);
                            ganttChartView.refreshItem(item);
                        },
                        function () { return !(item.isReadOnly || isInputDisabled || (typeof item.ganttChartView !== undefinedType && typeof item.ganttChartView.settings !== undefinedType && (item.ganttChartView.settings.isReadOnly || item.ganttChartView.settings.isGridReadOnly))) && !(item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        function () { return !(item.isMilestone || (typeof item.isBarVisible !== undefinedType && !item.isBarVisible)); },
                        function () { return (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled)); },
                        defaultTimeOfDay ? defaultTimeOfDay : dayDuration, calendarSelectorLevels, months, daysOfWeek,
                        function (value) {
                            if (value == null)
                                return "";
                            return ganttChartView.settings.dateTimeFormatter(value);
                        },
                        function (text) {
                            if (text == "")
                                return null;
                            return ganttChartView.settings.dateTimeParser(text);
                        },
                        weekStart, classic
                    );
                }
            },
            getIconColumnTemplate: function (imageSourceGetter, imageClass, imageStyle, isMovingEnabledGetter, isMovingToEnabledGetter, movingTargetHoveringClass, movingTargetHoveringStyle, disabledMovingTargetHoveringClass, disabledMovingTargetHoveringStyle) {
                if (typeof imageSourceGetter === stringType) {
                    var originalImageSourceGetter = imageSourceGetter;
                    imageSourceGetter = function (item) { return originalImageSourceGetter; }
                }
                if (typeof isMovingEnabledGetter === undefinedType || isMovingEnabledGetter == false)
                    isMovingEnabledGetter = function (item) { return false; }
                else if (isMovingEnabledGetter == true)
                    isMovingEnabledGetter = function (item) { return true; }
                return function (item) {
                    var ganttChartView = item.ganttChartView, document = ganttChartView.ownerDocument;
                    var img = document.createElement("img");
                    img.setAttribute("src", imageSourceGetter(item));
                    if (typeof imageClass !== undefinedType)
                        img.setAttribute("class", imageClass);
                    if (typeof imageStyle !== undefinedType)
                        img.setAttribute("style", imageStyle);
                    if (!ganttChartView.settings.isReadOnly && !ganttChartView.settings.isGridReadOnly && isMovingEnabledGetter(item)) {
                        img.style.cursor = "move";
                        setOrderingTaskDraggingThumb(img, item, ganttChartView.items, ganttChartView, ganttChartView.settings, isMovingToEnabledGetter, movingTargetHoveringClass, movingTargetHoveringStyle, disabledMovingTargetHoveringClass, disabledMovingTargetHoveringStyle);
                    }
                    return img;
                }
            },
            getOutputDate: convertToLocalTimezone,
            getInputDate: convertToUTC
        };
    } ();
};
if (DlhSoft.Controls.ScheduleChartView == undefined) {
    DlhSoft.Controls.ScheduleChartView = function () {
        //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
        var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];

        var 
            undefinedType = "undefined", objectType = "object", stringType = "string",
            svgns = "http://www.w3.org/2000/svg",
            dragZoneWidth = 24, dragAmount = 2.5 * 8,

            event = function (scheduleChartView, object, event, handler, useCapture) {
                if (scheduleChartView.internalEventListeners)
                    scheduleChartView.internalEventListeners.push({ object: object, event: event, handler: handler, useCapture: useCapture });
                return handler;
            },

            initialize = function (scheduleChartView, items, settings, license) {
                //DlhSoft.Licensing.validate(scheduleChartView, "DlhSoft.Controls", "ScheduleChartView", "DlhSoft.ProjectData.GanttChart.HTML.Controls", "5", license, settings);
                var _0xee50 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73", "\x53\x63\x68\x65\x64\x75\x6C\x65\x43\x68\x61\x72\x74\x56\x69\x65\x77", "\x44\x6C\x68\x53\x6F\x66\x74\x2E\x50\x72\x6F\x6A\x65\x63\x74\x44\x61\x74\x61\x2E\x47\x61\x6E\x74\x74\x43\x68\x61\x72\x74\x2E\x48\x54\x4D\x4C\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73", "\x35", "\x76\x61\x6C\x69\x64\x61\x74\x65", "\x4C\x69\x63\x65\x6E\x73\x69\x6E\x67"]; DlhSoft[_0xee50[5]][_0xee50[4]](scheduleChartView, _0xee50[0], _0xee50[1], _0xee50[2], _0xee50[3], license, settings);

                scheduleChartView.isScheduleChartInitializing = true;

                var scheduleChartItems = items;
                items = getGanttChartItems(scheduleChartItems);

                if (typeof settings !== objectType)
                    settings = {};

                DlhSoft.Controls.GanttChartView.initializeItems(items, settings);

                initializeSettings(settings, items, scheduleChartView);
                initializeInterface(scheduleChartView, items, scheduleChartItems, settings);

                // Presentation.
                DlhSoft.Controls.GanttChartView.initialize(scheduleChartView, items, settings, internalLicense);
                overrideInterface(scheduleChartView, items);

                scheduleChartView.isScheduleChartInitializing = false;
                scheduleChartView.isScheduleChartInitialized = true;

                return scheduleChartView;
            },
            refresh = function (scheduleChartView) {
                initialize(scheduleChartView, scheduleChartView.scheduleChartItems, scheduleChartView.settings, scheduleChartView.license);
            },

        // Settings.
            initializeRequiredSettings = function (settings) {
                if (typeof settings.useUpdatingToolTips === undefinedType)
                    settings.useUpdatingToolTips = true;
                if (typeof settings.target === undefinedType)
                    settings.target = "Standard";
                if (typeof settings.theme === undefinedType)
                    settings.theme = "Modern";
                if (typeof settings.isGridVisible === undefinedType) {
                    switch (settings.target) {
                        case "Standard": default:
                            settings.isGridVisible = true;
                            break;
                        case "Phone":
                            settings.isGridVisible = false;
                            break;
                    }
                }
                if (typeof settings.interaction === undefinedType)
                    settings.interaction = settings.target != "Phone" ? "Standard" : "TouchEnabled";
                if (typeof settings.isReadOnly === undefinedType)
                    settings.isReadOnly = false;
                if (typeof settings.isGridReadOnly === undefinedType)
                    settings.isGridReadOnly = false;
                if (typeof settings.isContentReadOnly === undefinedType)
                    settings.isContentReadOnly = false;
                if (typeof settings.selectionMode === undefinedType)
                    settings.selectionMode = "Focus";
                if (typeof settings.isVirtualizing === undefinedType)
                    settings.isVirtualizing = true;
                if (settings.target == "Phone" && typeof settings.areTaskAssignmentsVisible === undefinedType)
                    settings.areTaskAssignmentsVisible = false;
            },
            initializeSettings = function (settings, items, scheduleChartView) {
                initializeRequiredSettings(settings);
                if (typeof settings.gridWidth === undefinedType)
                    settings.gridWidth = "15%";
                if (typeof settings.chartWidth === undefinedType) {
                    if (settings.isGridVisible)
                        settings.chartWidth = "85%";
                    else
                        settings.chartWidth = "100%";
                }
                if (typeof settings.columns === undefinedType)
                    settings.columns = getDefaultColumns(items, settings);
                if (typeof settings.areTaskDependenciesVisible === undefinedType)
                    settings.areTaskDependenciesVisible = false;
                if (typeof settings.isBaselineVisible === undefinedType)
                    settings.isBaselineVisible = false;
                if (typeof settings.areStandardTaskLabelsVisible === undefinedType)
                    settings.areStandardTaskLabelsVisible = false;
                if (typeof settings.areMilestoneTaskLabelsVisible === undefinedType)
                    settings.areMilestoneTaskLabelsVisible = false;
                if (typeof settings.areAssignmentsReadOnly === undefinedType)
                    settings.areAssignmentsReadOnly = false;
                if (typeof settings.assignmentThumbStyle === undefinedType) {
                    switch (settings.theme) {
                        case "Modern": case "ModernBordered": default:
                            settings.assignmentThumbStyle = "fill: none; stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2";
                            break;
                        case "Aero":
                            settings.assignmentThumbStyle = "fill: none; stroke: Blue; stroke-dasharray: 2, 2";
                            break;
                    }
                }
                if (typeof settings.temporaryAssignmentThumbStyle === undefinedType) {
                    switch (settings.theme) {
                        case "Modern": case "ModernBordered": default:
                            settings.temporaryAssignmentThumbStyle = "fill: none; stroke: #3b87d9; stroke-width: 0.65px; stroke-dasharray: 2, 2";
                            break;
                        case "Aero":
                            settings.temporaryAssignmentThumbStyle = "fill: none; stroke: Blue; stroke-width: 0.65px; stroke-dasharray: 2, 2";
                            break;
                    }
                }
                if (typeof settings.assignmentThumbTemplate === undefinedType)
                    settings.assignmentThumbTemplate = getDefaultAssignmentThumbTemplate(items, scheduleChartView, settings);
                settings.internalExtraTaskTemplate = settings.assignmentThumbTemplate;
            },

        // Values.
            getTextNode = function (document, value) {
                var span = document.createElement("span");
                span.innerHTML = value;
                return span;
            },

        // Columns.
            getDefaultColumns = function (items, settings) {
                if (typeof settings !== objectType)
                    settings = {};
                initializeRequiredSettings(settings);
                var columns = [{ header: "", width: 32, isSelection: true },
                { header: "Resource", width: 120, isTreeView: true }];
                columns[0].cellTemplate = getDefaultSelectionCellTemplate(settings, columns[0], items);
                columns[1].cellTemplate = getDefaultContentCellTreeTemplate(settings, columns[1], items);
                columns[1].exportCellTemplate = getDefaultContentCellTreeTemplate(settings, columns[1], items, false);
                if (settings.selectionMode != "Single" && settings.selectionMode != "Extended" && settings.selectionMode != "ExtendedFocus")
                    columns.splice(0, 1);
                return columns;
            },
            getDefaultSelectionCellTemplate = function (settings, column, items) {
                var defaultReturn = function (item) { return getBooleanNode(item.ganttChartView.ownerDocument, item.isSelected); };
                return function (item) { if (!column.isReadOnly) return getSelectionInputNode(item); return defaultReturn(item); }
            },
            getSelectionInputNode = function (item) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.selectionInput === undefinedType) {
                    input = document.createElement("input");
                    item.selectionInput = input;
                    input.type = "checkbox";
                    input.setAttribute("style", "margin: 0px");
                }
                else {
                    input = item.selectionInput;
                }
                if (item.isSelected) {
                    input.setAttribute("checked", "checked");
                    if (!input.checked)
                        input.checked = true;
                }
                else if (input.checked) {
                    input.checked = false;
                }
                var onChange = function (e) {
                    if (input.checked)
                        selectItem(item);
                    else
                        unselectItem(item);
                };
                if (typeof input.changeEventListener !== undefinedType)
                    input.removeEventListener("change", input.changeEventListener, true);
                input.addEventListener("change", event(item.ganttChartView, input, "change", onChange, true), true);
                input.changeEventListener = onChange;
                var onKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(e);
                    }
                };
                if (typeof input.keyPressEventListener !== undefinedType)
                    input.removeEventListener("keypress", input.keyPressEventListener, true);
                input.addEventListener("keypress", event(item.ganttChartView, input, "keypress", onKeyPress, true), true);
                input.keyPressEventListener = onKeyPress;
                return input;
            },
            selectItem = function (item) {
                if (typeof item.scheduleChartView !== undefinedType)
                    item.scheduleChartView.selectItem(item);
            },
            unselectItem = function (item) {
                if (typeof item.scheduleChartView !== undefinedType)
                    item.scheduleChartView.unselectItem(item);
            },
            setCurrentItem = function (item, settings) {
                if (typeof item.scheduleChartView !== undefinedType)
                    item.scheduleChartView.currentItem = item;
                if ((settings.selectionMode == "Focus" || settings.selectionMode == "ExtendedFocus") && !item.isSelected)
                    selectItem(item);
            },
            getDefaultContentCellTreeTemplate = function (settings, column, items, isEditable) {
                var defaultReturn = function (item) { return getTextNode(item.ganttChartView.ownerDocument, item.content); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly && !settings.isContentReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly)) return getContentInputNode(item, Math.max(0, column.width - item.indentation * item.ganttChartView.settings.indentationLevelWidth - item.ganttChartView.settings.toggleButtonAreaWidth - 16), settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getContentInputNode = function (item, width, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.contentInput === undefinedType) {
                    input = document.createElement("input");
                    item.contentInput = input;
                    input.type = "text";
                    input.addEventListener("focus", event(item.ganttChartView, input, "focus", function (e) { setCurrentItem(item, settings); }));
                    var onChange = function (e) {
                        item.content = input.value;
                        item.scheduleChartView.onItemPropertyChanged(item, "content", true, true);
                        item.scheduleChartView.refreshItem(item);
                    };
                    if (typeof input.changeEventListener !== undefinedType)
                        input.removeEventListener("change", input.changeEventListener, true);
                    input.addEventListener("change", event(item.ganttChartView, input, "change", onChange, true), true);
                    input.changeEventListener = onChange;
                    var onKeyPress = function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            onChange(e);
                        }
                    };
                    if (typeof input.keyPressEventListener !== undefinedType)
                        input.removeEventListener("keypress", input.keyPressEventListener, true);
                    input.addEventListener("keypress", event(item.ganttChartView, input, "keypress", onKeyPress, true), true);
                    input.keyPressEventListener = onKeyPress;
                    input.addEventListener("focus", event(item.ganttChartView, input, "focus", function (e) { input.style.backgroundColor = "White"; }));
                    input.addEventListener("blur", event(item.ganttChartView, input, "blur", function (e) { input.style.backgroundColor = "Transparent"; }));
                }
                else {
                    input = item.contentInput;
                }
                input.value = item.content;
                var isSummary = "";
                if (item.hasChildren && (typeof item.isSummaryEnabled === undefinedType || item.isSummaryEnabled))
                    isSummary = "; font-weight: bold";
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + isSummary + (settings.classic ? "" : "; font-size: 12px; padding: 1px;"));
                return input;
            },

        // Items.
            getGanttChartItems = function (items) {
                var ganttChartItems = [], index = 0, visibilityIndex = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (typeof item.scheduleChartItem !== undefinedType && item.scheduleChartItem != item)
                        continue;
                    item.scheduleChartIndex = index++;
                    if (!item.isHidden)
                        item.scheduleChartVisibilityIndex = visibilityIndex++;
                    item.isBarVisible = false;
                    ganttChartItems.push(item);
                    if (typeof item.ganttChartItems !== undefinedType) {
                        for (var j = 0; j < item.ganttChartItems.length; j++) {
                            var ganttChartItem = item.ganttChartItems[j];
                            ganttChartItem.scheduleChartItem = item;
                            if (item.isHidden)
                                ganttChartItem.isHidden = true;
                            ganttChartItem.displayRowIndex = item.scheduleChartVisibilityIndex;
                            ganttChartItem.indentation = (item.indentation ? item.indentation : 0) + 1;
                            ganttChartItems.push(ganttChartItem);
                        }
                    }
                }
                return ganttChartItems;
            },
            getDefaultAssignmentThumbTemplate = function (items, scheduleChartView, settings) {
                return function (item) {
                    var document = item.ganttChartView.ownerDocument;
                    var group = document.createElementNS(svgns, "g");
                    if (!settings.isReadOnly && !settings.isChartReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly) && !settings.areAssignmentsReadOnly) {
                        var itemLeft = scheduleChartView.getChartPosition(item.start, settings);
                        var itemRight = Math.max(scheduleChartView.getChartPosition(item.finish, settings), itemLeft + 4);
                        var line = document.createElementNS(svgns, "line");
                        line.setAttribute("x1", itemLeft);
                        line.setAttribute("y1", settings.barMargin + settings.barHeight + 2);
                        line.setAttribute("x2", itemRight - 1);
                        line.setAttribute("y2", settings.barMargin + settings.barHeight + 2);
                        var assignmentThumbClass = settings.assignmentThumbClass;
                        if (typeof assignmentThumbClass !== undefinedType)
                            line.setAttribute("class", assignmentThumbClass);
                        var assignmentThumbStyle = settings.assignmentThumbStyle;
                        line.setAttribute("style", assignmentThumbStyle);
                        line.style.visibility = "hidden";
                        group.appendChild(line);
                        var thumb = document.createElementNS(svgns, "rect");
                        thumb.setAttribute("x", itemLeft);
                        thumb.setAttribute("y", settings.barMargin + settings.barHeight - 2);
                        thumb.setAttribute("width", Math.max(0, itemRight - itemLeft - 1));
                        thumb.setAttribute("height", 7);
                        thumb.setAttribute("style", "fill: White; fill-opacity: 0; cursor: move");
                        thumb.addEventListener("mouseover", event(scheduleChartView, thumb, "mouseover", function (e) {
                            if (typeof scheduleChartView.draggingItem === undefinedType)
                                line.style.visibility = "visible";
                        }, true), true);
                        thumb.addEventListener("mouseout", event(scheduleChartView, thumb, "mouseout", function (e) {
                            line.style.visibility = "hidden";
                        }, true), true);
                        group.appendChild(thumb);
                        setAssignmentDraggingThumb(thumb, group, item, itemLeft, itemRight, items, scheduleChartView, settings);
                    }
                    return group;
                };
            },
            refreshScheduleChartItem = function (item) {
                var scheduleChartView = item.scheduleChartView;
                item.itemTop = item.scheduleChartVisibilityIndex * scheduleChartView.settings.itemHeight;
                scheduleChartView.refreshGridItem(item);
                if (typeof item.ganttChartItems === undefinedType)
                    return;
                for (var i = 0; i < item.ganttChartItems.length; i++) {
                    var it = item.ganttChartItems[i];
                    it.itemTop = item.itemTop;
                    scheduleChartView.refreshChartItem(it);
                }
            },
            insertScheduleChartItem = function (index, item, items, scheduleChartItems, scheduleChartView) {
                item.scheduleChartView = scheduleChartView;
                item.isVirtuallyVisible = true;
                item.scheduleChartIndex = index;
                var visibilityIndex = 0, j;
                for (j = 0; j < index; j++) {
                    if (!scheduleChartItems[j].isHidden)
                        visibilityIndex++;
                }
                item.scheduleChartVisibilityIndex = visibilityIndex;
                item.isBarVisible = false;
                index = index < scheduleChartItems.length ? scheduleChartItems[index].index : items.length;
                scheduleChartItems.splice(item.scheduleChartIndex, 0, item);
                scheduleChartView.insertItem(index++, item);
                if (typeof item.ganttChartItems !== undefinedType) {
                    for (var i = 0; i < item.ganttChartItems.length; i++) {
                        var ganttChartItem = item.ganttChartItems[i];
                        ganttChartItem.scheduleChartView = scheduleChartView;
                        ganttChartItem.scheduleChartItem = item;
                        ganttChartItem.isHidden = item.isHidden;
                        ganttChartItem.displayRowIndex = item.scheduleChartVisibilityIndex;
                        ganttChartItem.indentation = item.indentation;
                        scheduleChartView.insertItem(index++, ganttChartItem);
                    }
                }
                for (j = item.scheduleChartIndex + 1; j < scheduleChartItems.length; j++) {
                    var otherItem = scheduleChartItems[j];
                    otherItem.scheduleChartIndex = j;
                    if (typeof otherItem.scheduleChartVisibilityIndex !== undefinedType)
                        otherItem.scheduleChartVisibilityIndex++;
                    if (typeof otherItem.ganttChartItems !== undefinedType) {
                        for (var k = 0; k < otherItem.ganttChartItems.length; k++) {
                            var otherGanttChartItem = otherItem.ganttChartItems[k];
                            otherGanttChartItem.displayRowIndex = otherItem.scheduleChartVisibilityIndex;
                        }
                    }
                    refreshScheduleChartItem(otherItem);
                }
            },
            removeScheduleChartItem = function (item, scheduleChartItems, scheduleChartView) {
                if (typeof item.ganttChartItems !== undefinedType) {
                    for (var i = 0; i < item.ganttChartItems.length; i++)
                        scheduleChartView.removeItem(item.ganttChartItems[i]);
                }
                scheduleChartItems.splice(item.scheduleChartIndex, 1);
                for (var j = item.scheduleChartIndex; j < scheduleChartItems.length; j++) {
                    var otherItem = scheduleChartItems[j];
                    otherItem.scheduleChartIndex = j;
                    if (typeof otherItem.scheduleChartVisibilityIndex !== undefinedType)
                        otherItem.scheduleChartVisibilityIndex--;
                    if (typeof otherItem.ganttChartItems !== undefinedType) {
                        for (var k = 0; k < otherItem.ganttChartItems.length; k++) {
                            var otherGanttChartItem = otherItem.ganttChartItems[k];
                            otherGanttChartItem.displayRowIndex = otherItem.scheduleChartVisibilityIndex;
                        }
                    }
                    refreshScheduleChartItem(otherItem);
                }
                scheduleChartView.removeItem(item);
            },

        // Drag and drop.
            setAssignmentDraggingThumb = function (thumb, group, item, itemLeft, itemRight, items, scheduleChartView, settings) {
                var document = item.ganttChartView.ownerDocument;
                function startDragAssignment(e, withoutToolTip) {
                    delete scheduleChartView.cancelDrag;
                    scheduleChartView.draggingItem = item;
                    scheduleChartView.dragType = "Assignment";
                    scheduleChartView.style.cursor = thumb.style.cursor;
                    scheduleChartView.draggingInitialY = e.clientY;
                    scheduleChartView.draggingInitialThumbPosition = settings.barMargin;
                    group.itemLeft = itemLeft;
                    group.itemRight = itemRight;
                    item.assignmentThumb = group;
                    if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                        toolTip = DlhSoft.Controls.ToolTip.get(thumb);
                        if (!toolTip) {
                            //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                            var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                            toolTip = DlhSoft.Controls.ToolTip.initialize(undefined, thumb, { duration: NaN, containerStyle: "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border: 1px solid " + settings.border + "; background-color: White; color: Black; font-family: " + (settings.classic ? "Arial" : "system-ui, Arial") + "; font-size: 12px; padding: 4px; margin-top: 1px" }, internalLicense);
                        }
                        toolTip.setContent(item.content + " –");
                        toolTip.show();
                        toolTip.setPosition(toolTip.x + (itemRight - itemLeft) + 4, toolTip.y - settings.itemHeight - 1);
                        toolTip.originalY = toolTip.y;
                        scheduleChartView.toolTip = toolTip;
                    }
                }
                thumb.addEventListener("mousedown", event(scheduleChartView, thumb, "mousedown", function (e) {
                    if (e.button != 0)
                        return;
                    startDragAssignment(e);
                    e.preventDefault();
                }, true), true);
                thumb.addEventListener("touchstart", event(scheduleChartView, thumb, "touchstart", function (e) {
                    startDragAssignment(e.touches[0], true);
                    e.preventDefault();
                }, true), true);
                if (typeof scheduleChartView.draggableAssignmentItems === undefinedType)
                    scheduleChartView.draggableAssignmentItems = [];
                var isDraggableItemProcessed = false;
                for (var i = 0; i < scheduleChartView.draggableAssignmentItems.length; i++) {
                    if (scheduleChartView.draggableAssignmentItems[i] == item) {
                        isDraggableItemProcessed = true;
                        break;
                    }
                }
                if (!isDraggableItemProcessed) {
                    function continueDragAssignment(e, withoutToolTip) {
                        if (typeof scheduleChartView.draggingItem === undefinedType || scheduleChartView.draggingItem != item || scheduleChartView.dragType != "Assignment")
                            return;
                        var deltaY = Math.ceil((e.clientY - scheduleChartView.draggingInitialY) / settings.itemHeight) * settings.itemHeight;
                        ensureVerticalScrolling(e.clientY, scheduleChartView);
                        delete scheduleChartView.draggingItem;
                        group = item.assignmentThumb;
                        itemLeft = group.itemLeft;
                        itemRight = group.itemRight;
                        if (typeof scheduleChartView.temporaryAssignmentThumb !== undefinedType) {
                            try { group.removeChild(scheduleChartView.temporaryAssignmentThumb); } catch (exc) { }
                            delete scheduleChartView.temporaryAssignmentThumb;
                        }
                        if (scheduleChartView.cancelDrag) {
                            delete scheduleChartView.cancelDrag;
                            delete scheduleChartView.draggingItem;
                            scheduleChartView.style.cursor = "default";
                            return;
                        }
                        var rectangle;
                        if (settings.temporaryAssignmentThumbTemplate) {
                            rectangle = settings.temporaryAssignmentThumbTemplate(scheduleChartView, itemLeft, scheduleChartView.draggingInitialThumbPosition + deltaY, Math.max(4, itemRight - itemLeft - 1), settings.barHeight);
                        }
                        else {
                            rectangle = document.createElementNS(svgns, "rect");
                            rectangle.setAttribute("x", itemLeft);
                            rectangle.setAttribute("y", scheduleChartView.draggingInitialThumbPosition + deltaY);
                            rectangle.setAttribute("width", Math.max((settings.classic ? 4 : 12), itemRight - itemLeft - 1));
                            rectangle.setAttribute("height", settings.barHeight);
                            if (typeof settings.temporaryAssignmentThumbClass !== undefinedType)
                                rectangle.setAttribute("class", settings.temporaryAssignmentThumbClass);
                            rectangle.setAttribute("style", settings.temporaryAssignmentThumbStyle);
                        }
                        scheduleChartView.temporaryAssignmentThumb = rectangle;
                        group.appendChild(rectangle);
                        scheduleChartView.draggingItem = item;
                        if (DlhSoft.Controls.ToolTip && settings.useUpdatingToolTips && !withoutToolTip) {
                            toolTip = scheduleChartView.toolTip;
                            var index = Math.floor((item.itemTop + scheduleChartView.draggingInitialThumbPosition + deltaY) / settings.itemHeight);
                            var targetItem = null;
                            var itemIndex = 0, i;
                            for (i = 0; i < items.length; i++) {
                                var itemI = items[i];
                                if (itemI.isVisible && !(typeof itemI.isHidden !== undefinedType && itemI.isHidden) && typeof itemI.displayRowIndex === undefinedType) {
                                    if (itemIndex == index) {
                                        if (!itemI.hasChildren)
                                            targetItem = itemI;
                                        break;
                                    }
                                    itemIndex++;
                                }
                            }
                            toolTip.setContent(item.content + " –" + (targetItem != null ? " " + targetItem.content : ""));
                            toolTip.setVerticalPosition(Math.max(getOffsetY(scheduleChartView) + scheduleChartView.chartHeaderContainer.clientHeight, toolTip.originalY + deltaY));
                            if (typeof toolTip.originalX === undefinedType)
                                toolTip.originalX = toolTip.x;
                            toolTip.setHorizontalPosition(toolTip.originalX);
                        }
                    }
                    scheduleChartView.addEventListener("mousemove", event(scheduleChartView, scheduleChartView, "mousemove", function (e) {
                        continueDragAssignment(e);
                    }, true), true);
                    scheduleChartView.addEventListener("touchmove", event(scheduleChartView, scheduleChartView, "touchmove", function (e) {
                        continueDragAssignment(e.touches[0], true);
                    }, true), true);
                    function endDragAssignment(e) {
                        if (typeof scheduleChartView.draggingItem === undefinedType || scheduleChartView.draggingItem != item || scheduleChartView.dragType != "Assignment")
                            return;
                        group = item.assignmentThumb;
                        if (typeof scheduleChartView.temporaryAssignmentThumb !== undefinedType) {
                            try { group.removeChild(scheduleChartView.temporaryAssignmentThumb); } catch (exc) { }
                            delete scheduleChartView.temporaryAssignmentThumb;
                        }
                        var deltaY = Math.ceil((e.clientY - scheduleChartView.draggingInitialY) / settings.itemHeight) * settings.itemHeight;
                        var index = Math.floor((item.itemTop + scheduleChartView.draggingInitialThumbPosition + deltaY) / settings.itemHeight);
                        var targetItem = null;
                        var itemIndex = 0, i;
                        for (i = 0; i < items.length; i++) {
                            var itemI = items[i];
                            if (itemI.isVisible && !(typeof itemI.isHidden !== undefinedType && itemI.isHidden) && typeof itemI.displayRowIndex === undefinedType) {
                                if (itemIndex == index) {
                                    if (!itemI.hasChildren)
                                        targetItem = itemI;
                                    break;
                                }
                                itemIndex++;
                            }
                        }
                        if (targetItem != null) {
                            var originalScheduleChartItem = item.scheduleChartItem;
                            var originalGanttChartItems = originalScheduleChartItem.ganttChartItems;
                            var remainingGanttChartItems = [];
                            for (i = 0; i < originalGanttChartItems.length; i++) {
                                if (originalGanttChartItems[i] != item)
                                    remainingGanttChartItems.push(originalGanttChartItems[i]);
                            }
                            originalScheduleChartItem.ganttChartItems = remainingGanttChartItems;
                            scheduleChartView.onItemPropertyChanged(originalScheduleChartItem, "ganttChartItems", true, true);
                            if (typeof targetItem.ganttChartItems === undefinedType)
                                targetItem.ganttChartItems = [];
                            targetItem.ganttChartItems.push(item);
                            scheduleChartView.onItemPropertyChanged(targetItem, "ganttChartItems", true, true);
                            item.scheduleChartItem = targetItem;
                            scheduleChartView.onItemPropertyChanged(item, "scheduleChartItem", true, true);
                            item.displayRowIndex = index;
                            item.isVirtuallyVisible = true;
                            scheduleChartView.refreshChartItem(item);
                            scheduleChartView.refreshPredecessorItems(item);
                            setCurrentItem(targetItem, settings);
                        }
                        delete scheduleChartView.draggingItem;
                        scheduleChartView.style.cursor = "default";
                    }
                    document.addEventListener("mouseup", event(scheduleChartView, document, "mouseup", function (e) {
                        if (e.button != 0)
                            return;
                        endDragAssignment(e);
                    }, true), true);
                    document.addEventListener("touchend", event(scheduleChartView, document, "touchend", function (e) {
                        endDragAssignment(e.changedTouches[0]);
                    }, true), true);
                    scheduleChartView.draggableAssignmentItems.push(item);
                }
            },
            getOffsetY = function (e) {
                var y = 0;
                if (e.offsetParent) {
                    do { y += e.offsetTop; e = e.offsetParent; } while (e);
                }
                return y;
            },
            ensureVerticalScrolling = function (y, scheduleChartView) {
                if (typeof scheduleChartView.draggingItem === undefinedType)
                    return;
                var now = new Date();
                if (scheduleChartView.lastDraggingTime && now > scheduleChartView.lastDraggingTime && now - scheduleChartView.lastDraggingTime < 200)
                    return;
                scheduleChartView.lastDraggingTime = now;
                y -= getOffsetY(scheduleChartView);
                var sl, ada;
                if (y < scheduleChartView.chartHeaderContainer.clientHeight + dragZoneWidth) {
                    sl = scheduleChartView.chartContentContainer.scrollTop;
                    scheduleChartView.chartContentContainer.scrollTop -= dragAmount;
                    if (typeof scheduleChartView.isDuringVerticalScrolling === undefinedType) {
                        scheduleChartView.isDuringVerticalScrolling = true;
                        setTimeout(function () {
                            ada = sl - scheduleChartView.chartContentContainer.scrollTop;
                            scheduleChartView.draggingInitialThumbPosition -= ada;
                            delete scheduleChartView.isDuringVerticalScrolling;
                        }, 0);
                    }
                }
                else if (y >= scheduleChartView.chartHeaderContainer.clientHeight + scheduleChartView.chartContentContainer.clientHeight - dragZoneWidth) {
                    sl = scheduleChartView.chartContentContainer.scrollTop;
                    scheduleChartView.chartContentContainer.scrollTop += dragAmount;
                    if (typeof scheduleChartView.isDuringVerticalScrolling === undefinedType) {
                        scheduleChartView.isDuringVerticalScrolling = true;
                        setTimeout(function () {
                            ada = scheduleChartView.chartContentContainer.scrollTop - sl;
                            scheduleChartView.draggingInitialThumbPosition += ada;
                            delete scheduleChartView.isDuringVerticalScrolling;
                        }, 0);
                    }
                }
            },

        // Moving.
            move = function (item, toIndex, scheduleChartView, items) {
                var fromIndex = items.indexOf(item);
                if (fromIndex < 0 || toIndex < 0 || toIndex == fromIndex || toIndex >= items.length)
                    return;
                items.splice(fromIndex, 1);
                items.splice(toIndex, 0, item);
                refresh(scheduleChartView);
                if (typeof scheduleChartView.settings.itemMoveHandler !== undefinedType)
                    scheduleChartView.settings.itemMoveHandler(item, fromIndex, toIndex);
            },
            moveRange = function (fromIndex, count, toIndex, scheduleChartView, items) {
                if (fromIndex < 0 || toIndex < 0 || toIndex == fromIndex || toIndex > items.length - count)
                    return;
                var movedItems = [], i;
                for (i = fromIndex; i < fromIndex + count; i++)
                    movedItems.push(items[i]);
                items.splice(fromIndex, count);
                for (i = 0; i < movedItems.length; i++)
                    items.splice(toIndex + i, 0, movedItems[i]);
                refresh(scheduleChartView);
                if (typeof scheduleChartView.settings.itemMoveHandler !== undefinedType) {
                    for (i = 0; i < movedItems.length; i++)
                        scheduleChartView.settings.itemMoveHandler(movedItems[i], fromIndex + i, toIndex + i);
                }
            },

        // Interface.
            initializeInterface = function (scheduleChartView, items, scheduleChartItems, settings) {
                for (var ci = 0; ci < items.length; ci++)
                    items[ci].scheduleChartView = scheduleChartView;
                scheduleChartView.scheduleChartItems = scheduleChartItems;
                scheduleChartView.settings = settings;
                scheduleChartView.refreshScheduleChartItem = refreshScheduleChartItem;
                scheduleChartView.initializeAssignmentDraggingThumb = function (thumb, containerGroup, item, itemLeft, itemRight) { setAssignmentDraggingThumb(thumb, containerGroup, item, itemLeft, itemRight, scheduleChartView.items, scheduleChartView, scheduleChartView.settings); }
                scheduleChartView.insertScheduleChartItem = function (index, item) { insertScheduleChartItem(index, item, items, scheduleChartItems, scheduleChartView); }
                scheduleChartView.addScheduleChartItem = function (item) { scheduleChartView.insertScheduleChartItem(scheduleChartItems.length, item); }
                scheduleChartView.insertScheduleChartItems = function (index, items) { for (var i = 0; i < items.length; i++) scheduleChartView.insertScheduleChartItem(index++, items[i]); }
                scheduleChartView.addScheduleChartItems = function (items) { for (var i = 0; i < items.length; i++) scheduleChartView.addScheduleChartItem(items[i]); }
                scheduleChartView.removeScheduleChartItem = function (item) { return removeScheduleChartItem(item, scheduleChartItems, scheduleChartView); }
                scheduleChartView.removeScheduleChartItems = function (items) { for (var i = 0; i < items.length; i++) scheduleChartView.removeScheduleChartItem(items[i]); }
                scheduleChartView.moveScheduleChartRange = function (fromIndex, count, toIndex) { moveRange(fromIndex, count, toIndex, scheduleChartView, scheduleChartItems); }
                scheduleChartView.moveScheduleChartItem = function (item, toIndex) { move(item, toIndex, scheduleChartView, scheduleChartItems); }
                scheduleChartView.moveScheduleChartItemUp = function (item) { var index = scheduleChartItems.indexOf(item); if (index <= 0) return; move(item, index - 1, scheduleChartView, scheduleChartItems); }
                scheduleChartView.moveScheduleChartItemDown = function (item) { var index = scheduleChartItems.indexOf(item); if (index < 0 || index >= scheduleChartItems.length - 1) return; move(item, index + 1, scheduleChartView, scheduleChartItems); }
                scheduleChartView.moveGanttChartItem = function(ganttChartItem, newScheduleChartItem) {
                    var originalScheduleChartItem = ganttChartItem.scheduleChartItem;
                    var index = originalScheduleChartItem.ganttChartItems.indexOf(ganttChartItem);
                    originalScheduleChartItem.ganttChartItems.splice(index, 1);
                    newScheduleChartItem.ganttChartItems.push(ganttChartItem);
                    ganttChartItem.scheduleChartItem = newScheduleChartItem;
                    ganttChartItem.displayRowIndex = newScheduleChartItem.scheduleChartVisibilityIndex;
                    scheduleChartView.refreshChartItem(ganttChartItem);
                };
            },
            overrideInterface = function (scheduleChartView, items) {
                scheduleChartView.items = items;
                scheduleChartView.refresh = function () { refresh(scheduleChartView); }
            };

        return {
            initialize: initialize,
            refresh: refresh,
            getDefaultColumns: getDefaultColumns,
            getDefaultScales: DlhSoft.Controls.GanttChartView.getDefaultScales,
            getDefaultStyleDefinitionTemplate: DlhSoft.Controls.GanttChartView.getDefaultStyleDefinitionTemplate,
            getDefaultStandardTaskTemplate: DlhSoft.Controls.GanttChartView.getDefaultStandardTaskTemplate,
            getDefaultMilestoneTaskTemplate: DlhSoft.Controls.GanttChartView.getDefaultMilestoneTaskTemplate,
            getDefaultItemTemplate: DlhSoft.Controls.GanttChartView.getDefaultItemTemplate,
            getDefaultAssignmentsTemplate: DlhSoft.Controls.GanttChartView.getDefaultAssignmentsTemplate,
            initializeTaskDraggingThumbs: DlhSoft.Controls.GanttChartView.initializeTaskDraggingThumbs,
            initializeDependencyDraggingThumb: DlhSoft.Controls.GanttChartView.initializeDependencyDraggingThumb,
            initializeAssignmentDraggingThumb: function (thumb, containerGroup, item, itemLeft, itemRight) { item.scheduleChartView.initializeAssignmentDraggingThumb(thumb, containerGroup, item, itemLeft, itemRight); },
            getWorkingTime: DlhSoft.Controls.GanttChartView.getWorkingTime,
            getEffort: DlhSoft.Controls.GanttChartView.getEffort,
            getFinish: DlhSoft.Controls.GanttChartView.getFinish,
            getStart: DlhSoft.Controls.GanttChartView.getStart,
            getCompletion: DlhSoft.Controls.GanttChartView.getCompletion,
            getCompletedFinish: DlhSoft.Controls.GanttChartView.getCompletedFinish,
            textColumnTemplateBase: DlhSoft.Controls.GanttChartView.textColumnTemplateBase,
            textInputColumnTemplateBase: DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase,
            getOutputDate: DlhSoft.Controls.GanttChartView.getOutputDate,
            getInputDate: DlhSoft.Controls.GanttChartView.getInputDate
        };
    } ();
};

// Version 5.1.
if (DlhSoft.Controls.LoadChartView == undefined) {
    DlhSoft.Controls.LoadChartView = function () {
        //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
        var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];

        var
            undefinedType = "undefined", objectType = "object", stringType = "string",
            svgns = "http://www.w3.org/2000/svg",
            secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration, quarterHourDuration = hourDuration / 4, dayDuration = 24 * hourDuration, weekDuration = 7 * dayDuration, initialSundayDateTimeValue = 3 * dayDuration,

            event = function (loadChartView, object, event, handler, useCapture) {
                if (loadChartView.internalEventListeners)
                    loadChartView.internalEventListeners.push({ object: object, event: event, handler: handler, useCapture: useCapture });
                return handler;
            },

            initialize = function (loadChartView, items, settings, license) {
                //DlhSoft.Licensing.validate(loadChartView, "DlhSoft.Controls", "LoadChartView", "DlhSoft.ProjectData.GanttChart.HTML.Controls", "5", license, settings);
                var _0x40c7 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73", "\x4C\x6F\x61\x64\x43\x68\x61\x72\x74\x56\x69\x65\x77", "\x44\x6C\x68\x53\x6F\x66\x74\x2E\x50\x72\x6F\x6A\x65\x63\x74\x44\x61\x74\x61\x2E\x47\x61\x6E\x74\x74\x43\x68\x61\x72\x74\x2E\x48\x54\x4D\x4C\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73", "\x35", "\x76\x61\x6C\x69\x64\x61\x74\x65", "\x4C\x69\x63\x65\x6E\x73\x69\x6E\x67"]; DlhSoft[_0x40c7[5]][_0x40c7[4]](loadChartView, _0x40c7[0], _0x40c7[1], _0x40c7[2], _0x40c7[3], license, settings);

                loadChartView.isLoadChartInitializing = true;

                var loadChartItems = items;
                items = getGanttChartItems(loadChartItems);

                if (typeof settings !== objectType)
                    settings = {};

                DlhSoft.Controls.GanttChartView.initializeItems(items, settings);

                initializeSettings(settings, items, loadChartView);
                initializeInterface(loadChartView, items, loadChartItems, settings);

                DlhSoft.Controls.GanttChartView.initialize(loadChartView, items, settings, internalLicense);
                overrideInterface(loadChartView, items, settings);

                loadChartView.isLoadChartInitializing = false;
                loadChartView.isLoadChartInitialized = true;

                return loadChartView;
            },
            refresh = function (loadChartView) {
                initialize(loadChartView, loadChartView.loadChartItems, loadChartView.settings, loadChartView.license);
            },

            // Settings.
            initializeRequiredSettings = function (settings) {
                if (typeof settings.target === undefinedType)
                    settings.target = "Standard";
                if (typeof settings.theme === undefinedType)
                    settings.theme = "Modern";
                if (typeof settings.isGridVisible === undefinedType) {
                    switch (settings.target) {
                        case "Standard": default:
                            settings.isGridVisible = true;
                            break;
                        case "Phone":
                            settings.isGridVisible = false;
                            break;
                    }
                }
                if (typeof settings.isReadOnly === undefinedType)
                    settings.isReadOnly = true;
                if (typeof settings.selectionMode === undefinedType)
                    settings.selectionMode = "Focus";
                if (typeof settings.isVirtualizing === undefinedType)
                    settings.isVirtualizing = true;
            },
            initializeSettings = function (settings, items, loadChartView) {
                initializeRequiredSettings(settings);
                if (typeof settings.gridWidth === undefinedType)
                    settings.gridWidth = "15%";
                if (typeof settings.chartWidth === undefinedType) {
                    if (settings.isGridVisible)
                        settings.chartWidth = "85%";
                    else
                        settings.chartWidth = "100%";
                }
                if (typeof settings.columns === undefinedType)
                    settings.columns = getDefaultColumns(items, settings);
                if (typeof settings.normalAllocationBarStyle === undefinedType && settings.normalAllocationBarClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                settings.normalAllocationBarStyle = "fill: Blue; fill-opacity: 0.8; stroke: Blue; stroke-width: 0.65px";
                                break;
                            case "Aero":
                                settings.normalAllocationBarStyle = "fill: Blue; stroke: Blue";
                                break;
                        }
                    } else {
                        settings.normalAllocationBarStyle = "fill: #8abbed; fill-opacity: 0.8;";
                    }
                }
                if (typeof settings.underAllocationBarStyle === undefinedType && settings.underAllocationBarClass == null) {
                    settings.underAllocationBarStyle = settings.normalAllocationBarStyle;
                }
                if (typeof settings.overAllocationBarStyle === undefinedType && settings.overAllocationBarClass == null) {
                    if (settings.classic) {
                        switch (settings.theme) {
                            case "Modern": case "ModernBordered": default:
                                settings.overAllocationBarStyle = "fill: Red; fill-opacity: 0.8; stroke: Red; stroke-width: 0.65px";
                                break;
                            case "Aero":
                                settings.overAllocationBarStyle = "fill: Red; stroke: Red";
                                break;
                        }
                    } else {
                        settings.overAllocationBarStyle = "fill: #D03642; fill-opacity: 0.8; stroke-width: 0.65px;";
                    }
                }
                if (typeof settings.maxDisplayedUnits === undefinedType)
                    settings.maxDisplayedUnits = 1.5;
                if (typeof settings.allocationTemplate === undefinedType)
                    settings.allocationTemplate = getDefaultAllocationTemplate();
                settings.standardTaskTemplate = settings.allocationTemplate;
                settings.milestoneTaskTemplate = settings.allocationTemplate;
                settings.areTaskDependenciesVisible = false;
                settings.isBaselineVisible = false;
                settings.isTaskCompletedEffortVisible = false;
                settings.areTaskAssignmentsVisible = false;
            },

            // Values.
            getTextNode = function (document, value) {
                var span = document.createElement("span");
                span.innerHTML = value;
                return span;
            },

            // Columns.
            getDefaultColumns = function (items, settings) {
                if (typeof settings !== objectType)
                    settings = {};
                initializeRequiredSettings(settings);
                var columns = [{ header: "", width: 32, isSelection: true },
                { header: "Resource", width: 120, isTreeView: true }];
                columns[0].cellTemplate = getDefaultSelectionCellTemplate(settings, columns[0], items);
                columns[1].cellTemplate = getDefaultContentCellTemplate(settings, columns[1]);
                columns[1].exportCellTemplate = getDefaultContentCellTemplate(settings, columns[1], false);
                if (settings.selectionMode != "Single" && settings.selectionMode != "Extended" && settings.selectionMode != "ExtendedFocus")
                    columns.splice(0, 1);
                return columns;
            },
            getDefaultSelectionCellTemplate = function (settings, column, items) {
                var defaultReturn = function (item) { return getBooleanNode(item.ganttChartView.ownerDocument, item.isSelected); };
                return function (item) { if (!column.isReadOnly) return getSelectionInputNode(item); return defaultReturn(item); }
            },
            getSelectionInputNode = function (item) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.selectionInput === undefinedType) {
                    input = document.createElement("input");
                    item.selectionInput = input;
                    input.type = "checkbox";
                    input.setAttribute("style", "margin: 0px");
                }
                else {
                    input = item.selectionInput;
                }
                if (item.isSelected) {
                    input.setAttribute("checked", "checked");
                    if (!input.checked)
                        input.checked = true;
                }
                else if (input.checked) {
                    input.checked = false;
                }
                var onChange = function (e) {
                    if (input.checked)
                        selectItem(item);
                    else
                        unselectItem(item);
                };
                if (typeof input.changeEventListener !== undefinedType)
                    input.removeEventListener("change", input.changeEventListener, true);
                input.addEventListener("change", event(item.ganttChartView, input, "change", onChange, true), true);
                input.changeEventListener = onChange;
                var onKeyPress = function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(e);
                    }
                };
                if (typeof input.keyPressEventListener !== undefinedType)
                    input.removeEventListener("keypress", input.keyPressEventListener, true);
                input.addEventListener("keypress", event(item.ganttChartView, input, "keypress", onKeyPress, true), true);
                input.keyPressEventListener = onKeyPress;
                return input;
            },
            selectItem = function (item) {
                if (typeof item.loadChartView !== undefinedType)
                    item.loadChartView.selectItem(item);
            },
            unselectItem = function (item) {
                if (typeof item.loadChartView !== undefinedType)
                    item.loadChartView.unselectItem(item);
            },
            setCurrentItem = function (item, settings) {
                if (typeof item.loadChartView !== undefinedType)
                    item.loadChartView.currentItem = item;
                if ((settings.selectionMode == "Focus" || settings.selectionMode == "ExtendedFocus") && !item.isSelected)
                    selectItem(item);
            },
            getDefaultContentCellTemplate = function (settings, column, isEditable) {
                var defaultReturn = function (item) { return getTextNode(item.ganttChartView.ownerDocument, item.content); };
                if ((typeof isEditable === undefinedType || isEditable) && !settings.isReadOnly && !settings.isGridReadOnly && !settings.isContentReadOnly)
                    return function (item) { if (!column.isReadOnly && (typeof item.isReadOnly === undefinedType || !item.isReadOnly)) return getContentInputNode(item, Math.max(0, column.width - 2), settings); return defaultReturn(item); }
                else
                    return defaultReturn;
            },
            getContentInputNode = function (item, width, settings) {
                var document = item.ganttChartView.ownerDocument;
                var input;
                if (typeof item.contentInput === undefinedType) {
                    input = document.createElement("input");
                    item.contentInput = input;
                    input.type = "text";
                    input.addEventListener("focus", event(item.ganttChartView, input, "focus", function (e) { setCurrentItem(item, settings); }));
                    var onChange = function (e) {
                        item.content = input.value;
                        item.loadChartView.onItemPropertyChanged(item, "content", true, true);
                        item.loadChartView.refreshItem(item);
                    };
                    if (typeof input.changeEventListener !== undefinedType)
                        input.removeEventListener("change", input.changeEventListener, true);
                    input.addEventListener("change", event(item.ganttChartView, input, "change", onChange, true), true);
                    input.changeEventListener = onChange;
                    var onKeyPress = function (e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            e.stopPropagation();
                            onChange(e);
                        }
                    };
                    if (typeof input.keyPressEventListener !== undefinedType)
                        input.removeEventListener("keypress", input.keyPressEventListener, true);
                    input.addEventListener("keypress", event(item.ganttChartView, input, "keypress", onKeyPress, true), true);
                    input.keyPressEventListener = onKeyPress;
                    input.addEventListener("focus", event(item.ganttChartView, input, "focus", function (e) { input.style.backgroundColor = "White"; }));
                    input.addEventListener("blur", event(item.ganttChartView, input, "blur", function (e) { input.style.backgroundColor = "Transparent"; }));
                }
                else {
                    input = item.contentInput;
                }
                input.value = item.content;
                input.setAttribute("style", "outline: none; background-color: Transparent; width: " + width + "px; border-width: 0px; padding: 0px" + (settings.classic ? "" : "; font-size: 12px; padding: 1px;"));
                return input;
            },
            getGridWidth = function (columns) {
                var width = 0;
                for (var i = 0; i < columns.length; i++)
                    width += columns[i].width;
                return width;
            },

            // Items.
            getGanttChartItems = function (items) {
                var ganttChartItems = [], index = 0, visibilityIndex = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (typeof item.isExported !== undefinedType && item.isExported) {
                        ganttChartItems.push(item);
                        continue;
                    }
                    if (typeof item.loadChartItem !== undefinedType && item.loadChartItem != item)
                        continue;
                    item.loadChartIndex = item.scheduleChartIndex = index++;
                    if (!item.isHidden)
                        item.scheduleChartVisibilityIndex = visibilityIndex++;
                    item.isBarVisible = false;
                    ganttChartItems.push(item);
                    if (typeof item.ganttChartItems !== undefinedType) {
                        for (var j = 0; j < item.ganttChartItems.length; j++) {
                            var ganttChartItem = item.ganttChartItems[j];
                            ganttChartItem.loadChartItem = ganttChartItem.scheduleChartItem = item;
                            if (item.isHidden)
                                ganttChartItem.isHidden = true;
                            ganttChartItem.displayRowIndex = item.scheduleChartVisibilityIndex;
                            ganttChartItem.indentation = item.indentation + (item.indentation ? item.indentation : 0);
                            ganttChartItems.push(ganttChartItem);
                        }
                    }
                }
                return ganttChartItems;
            },
            refreshLoadChartItem = function (item) {
                var loadChartView = item.loadChartView;
                item.itemTop = item.scheduleChartVisibilityIndex * loadChartView.settings.itemHeight;
                loadChartView.refreshGridItem(item);
                if (typeof item.ganttChartItems === undefinedType)
                    return;
                for (var i = 0; i < item.ganttChartItems.length; i++) {
                    var it = item.ganttChartItems[i];
                    it.itemTop = item.itemTop;
                    loadChartView.refreshChartItem(it);
                }
            },
            insertLoadChartItem = function (index, item, items, loadChartItems, loadChartView) {
                item.loadChartView = item.scheduleChartView = loadChartView;
                item.isVirtuallyVisible = true;
                item.loadChartIndex = item.scheduleChartIndex = index;
                var visibilityIndex = 0, j;
                for (j = 0; j < index; j++) {
                    if (!loadChartItems[j].isHidden)
                        visibilityIndex++;
                }
                item.scheduleChartVisibilityIndex = visibilityIndex;
                item.isBarVisible = false;
                index = index < loadChartItems.length ? loadChartItems[index].index : items.length;
                loadChartItems.splice(item.loadChartIndex, 0, item);
                loadChartView.insertItem(index++, item);
                if (typeof item.ganttChartItems !== undefinedType) {
                    for (var i = 0; i < item.ganttChartItems.length; i++) {
                        var ganttChartItem = item.ganttChartItems[i];
                        ganttChartItem.loadChartView = ganttChartItem.scheduleChartView = loadChartView;
                        ganttChartItem.loadChartItem = ganttChartItem.scheduleChartItem = item;
                        ganttChartItem.isHidden = item.isHidden;
                        ganttChartItem.displayRowIndex = item.scheduleChartVisibilityIndex;
                        ganttChartItem.indentation = item.indentation;
                        loadChartView.insertItem(index++, ganttChartItem);
                    }
                }
                for (var j = item.loadChartIndex + 1; j < loadChartItems.length; j++) {
                    var otherItem = loadChartItems[j];
                    otherItem.loadChartIndex = otherItem.scheduleChartIndex = j;
                    if (typeof otherItem.scheduleChartVisibilityIndex !== undefinedType)
                        otherItem.scheduleChartVisibilityIndex++;
                    if (typeof otherItem.ganttChartItems !== undefinedType) {
                        for (var k = 0; k < otherItem.ganttChartItems.length; k++) {
                            var otherGanttChartItem = otherItem.ganttChartItems[k];
                            otherGanttChartItem.displayRowIndex = otherItem.scheduleChartVisibilityIndex;
                        }
                    }
                    refreshLoadChartItem(otherItem);
                }
            },
            removeLoadChartItem = function (item, loadChartItems, loadChartView) {
                if (typeof item.ganttChartItems !== undefinedType) {
                    for (var i = 0; i < item.ganttChartItems.length; i++)
                        loadChartView.removeItem(item.ganttChartItems[i]);
                }
                loadChartView.removeItem(item);
                loadChartItems.splice(item.loadChartIndex, 1);
                for (var j = item.loadChartIndex; j < loadChartItems.length; j++) {
                    var otherItem = loadChartItems[j];
                    otherItem.loadChartIndex = otherItem.scheduleChartIndex = j;
                    if (typeof otherItem.scheduleChartVisibilityIndex !== undefinedType)
                        otherItem.scheduleChartVisibilityIndex--;
                    if (typeof otherItem.ganttChartItems !== undefinedType) {
                        for (var k = 0; k < otherItem.ganttChartItems.length; k++) {
                            var otherGanttChartItem = otherItem.ganttChartItems[k];
                            otherGanttChartItem.displayRowIndex = otherItem.scheduleChartVisibilityIndex;
                        }
                    }
                    refreshLoadChartItem(otherItem);
                }
            },
            getChartItemArea = function (item, loadChartView) {
                var document = loadChartView.ownerDocument;
                if (typeof item.chartItemArea === undefinedType)
                    item.chartItemArea = document.createElementNS(svgns, "g");
                for (var i = item.chartItemArea.childNodes.length; i-- > 0;)
                    item.chartItemArea.removeChild(item.chartItemArea.childNodes[i]);
                return item.chartItemArea;
            },
            getDefaultAllocationTemplate = function (items, loadChartView, settings) {
                var oItems = items, oLoadChartView = loadChartView, oSettings = settings;
                return function (item) {
                    var loadChartView = typeof oLoadChartView !== undefinedType ? oLoadChartView : item.loadChartView;
                    var settings = typeof oSettings !== undefinedType ? oSettings : loadChartView.settings;
                    var items = typeof oItems !== undefinedType ? oItems : loadChartView.items;
                    var document = loadChartView.ownerDocument;
                    var group = getChartItemArea(item, loadChartView);
                    var itemLeft = loadChartView.getChartPosition(item.start, settings);
                    var itemRight = Math.max(loadChartView.getChartPosition(item.finish, settings), itemLeft + 4);
                    var bar = document.createElementNS(svgns, "rect");
                    var units = typeof item.units !== undefinedType ? item.units : 1;
                    var height = Math.min(units, settings.maxDisplayedUnits) / settings.maxDisplayedUnits * settings.barHeight;
                    bar.setAttribute("x", itemLeft);
                    bar.setAttribute("y", settings.barMargin + (settings.barHeight - height));
                    bar.setAttribute("width", Math.max(0, itemRight - itemLeft - 1));
                    bar.setAttribute("height", height);
                    var barClass = units == 1 ? settings.normalAllocationBarClass : (units < 1 ? settings.underAllocationBarClass : settings.overAllocationBarClass);
                    if (typeof item.allocationBarClass !== undefinedType)
                        barClass = item.allocationBarClass;
                    if (typeof barClass !== undefinedType)
                        bar.setAttribute("class", barClass);
                    else {
                        var barStyle = units == 1 ? settings.normalAllocationBarStyle : (units < 1 ? settings.underAllocationBarStyle : settings.overAllocationBarStyle);
                        if (typeof item.allocationBarStyle !== undefinedType)
                            barStyle = item.allocationBarStyle;
                        if (typeof barStyle !== undefinedType)
                            bar.setAttribute("style", barStyle);
                    }
                    group.appendChild(bar);
                    return group;
                };
            },
            getChartWidth = function (loadChartView, settings) {
                return (loadChartView.getChartPosition(settings.timelineFinish) - loadChartView.getChartPosition(settings.timelineStart)) / loadChartView.settings.hourWidth * settings.hourWidth;
            },

            // Moving.
            move = function (item, toIndex, loadChartView, items) {
                var fromIndex = items.indexOf(item);
                if (fromIndex < 0 || toIndex < 0 || toIndex == fromIndex || toIndex >= items.length)
                    return;
                items.splice(fromIndex, 1);
                items.splice(toIndex, 0, item);
                refresh(loadChartView);
                if (typeof loadChartView.settings.itemMoveHandler !== undefinedType)
                    loadChartView.settings.itemMoveHandler(item, fromIndex, toIndex);
            },
            moveRange = function (fromIndex, count, toIndex, loadChartView, items) {
                if (fromIndex < 0 || toIndex < 0 || toIndex == fromIndex || toIndex > items.length - count)
                    return;
                var movedItems = [], i;
                for (i = fromIndex; i < fromIndex + count; i++)
                    movedItems.push(items[i]);
                items.splice(fromIndex, count);
                for (i = 0; i < movedItems.length; i++)
                    items.splice(toIndex + i, 0, movedItems[i]);
                refresh(loadChartView);
                if (typeof loadChartView.settings.itemMoveHandler !== undefinedType) {
                    for (i = 0; i < movedItems.length; i++)
                        loadChartView.settings.itemMoveHandler(movedItems[i], fromIndex + i, toIndex + i);
                }
            },

            // Exporting and printing.
            copyCustomProperties = function (target, source) {
                for (var field in source) {
                    if (field.indexOf("custom") != 0 && field.indexOf("description") != 0)
                        continue;
                    if (typeof target[field] === undefinedType)
                        target[field] = source[field];
                }
            },
            exportContent = function (title, preparingMessage, isGridVisible, columnIndexes, timelineStart, timelineFinish, isRelativeToTimezone, hourWidth, startRowIndex, endRowIndex, output, sendToPrinter, rotate, autoClose, originalLoadChartView, items, settings) {
                //var internalLicense = "DlhSoft.Controls: DlhSoft internal usage only. Customers may purchase standard product usage licenses from http://DlhSoft.com/Purchase.";
                var _0x5d06 = ["\x44\x6C\x68\x53\x6F\x66\x74\x2E\x43\x6F\x6E\x74\x72\x6F\x6C\x73\x3A\x20\x44\x6C\x68\x53\x6F\x66\x74\x20\x69\x6E\x74\x65\x72\x6E\x61\x6C\x20\x75\x73\x61\x67\x65\x20\x6F\x6E\x6C\x79\x2E\x20\x43\x75\x73\x74\x6F\x6D\x65\x72\x73\x20\x6D\x61\x79\x20\x70\x75\x72\x63\x68\x61\x73\x65\x20\x73\x74\x61\x6E\x64\x61\x72\x64\x20\x70\x72\x6F\x64\x75\x63\x74\x20\x75\x73\x61\x67\x65\x20\x6C\x69\x63\x65\x6E\x73\x65\x73\x20\x66\x72\x6F\x6D\x20\x68\x74\x74\x70\x3A\x2F\x2F\x44\x6C\x68\x53\x6F\x66\x74\x2E\x63\x6F\x6D\x2F\x50\x75\x72\x63\x68\x61\x73\x65\x2E"]; var internalLicense = _0x5d06[0];
                var i;

                var exportColumns = [], column;
                if (typeof columnIndexes !== undefinedType) {
                    for (i = 0; i < columnIndexes.length; i++) {
                        column = settings.columns[columnIndexes[i]];
                        exportColumns.push({
                            isTreeView: column.isTreeView, header: column.header, width: column.width,
                            headerClass: column.headerClass, headerStyle: column.headerStyle, cellClass: column.cellClass, cellStyle: column.cellStyle,
                            cellTemplate: typeof column.exportCellTemplate !== undefinedType ? column.exportCellTemplate : column.cellTemplate
                        });
                    }
                }
                else {
                    for (i = 0; i < settings.columns.length; i++) {
                        column = settings.columns[i];
                        if (column.isSelection)
                            continue;
                        exportColumns.push({
                            isTreeView: column.isTreeView, header: column.header, width: column.width,
                            headerClass: column.headerClass, headerStyle: column.headerStyle, cellClass: column.cellClass, cellStyle: column.cellStyle,
                            cellTemplate: typeof column.exportCellTemplate !== undefinedType ? column.exportCellTemplate : column.cellTemplate
                        });
                    }
                }

                if (typeof isGridVisible === undefinedType)
                    isGridVisible = settings.isGridVisible;
                var gridWidth = isGridVisible ? getGridWidth(exportColumns) + 1 : 0;

                if (typeof timelineStart !== undefinedType) {
                    if (typeof isRelativeToTimezone === undefinedType || !isRelativeToTimezone)
                        timelineStart = new Date(timelineStart.valueOf() - timelineStart.getTimezoneOffset() * minuteDuration);
                }
                else {
                    timelineStart = settings.timelineStart;
                }
                if (typeof timelineFinish !== undefinedType) {
                    if (typeof isRelativeToTimezone === undefinedType || !isRelativeToTimezone)
                        timelineFinish = new Date(timelineFinish.valueOf() - timelineFinish.getTimezoneOffset() * minuteDuration);
                }
                else {
                    timelineFinish = settings.timelineFinish;
                }

                var exportSettings =
                {
                    isExport: true, isReadOnly: true, selectionMode: "None", isVirtualizing: false, isGridVisible: isGridVisible, isSplitterEnabled: false, gridWidth: gridWidth + "px", columns: exportColumns, allowUserToResizeColumns: false, isGridRowClickTimeScrollingEnabled: false, isMouseWheelZoomEnabled: false,
                    timelineStart: timelineStart, timelineFinish: timelineFinish, hourWidth: typeof hourWidth !== undefinedType ? hourWidth : settings.hourWidth, displayedTime: typeof timelineStart !== undefinedType ? timelineStart : settings.timelineStart, currentTime: settings.currentTime, isTaskToolTipVisible: false, isDependencyToolTipVisible: false, areTaskDependenciesVisible: false, isBaselineVisible: false, isTaskCompletedEffortVisible: false, areTaskAssignmentsVisible: false,
                    containerClass: settings.containerClass, containerStyle: settings.containerStyle, border: settings.border, theme: settings.theme, headerBackground: settings.headerBackground, headerHeight: settings.headerHeight, itemHeight: settings.itemHeight, itemClass: settings.itemClass, itemStyle: settings.itemStyle, indentationLevelWidth: settings.indentationLevelWidth, toggleButtonClass: settings.toggleButtonClass, toggleButtonStyle: settings.toggleButtonStyle, scales: [], visibleWeekStart: settings.visibleWeekStart, visibleWeekFinish: settings.visibleWeekFinish, workingWeekStart: settings.workingWeekStart, workingWeekFinish: settings.workingWeekFinish, visibleDayStart: settings.visibleDayStart, visibleDayFinish: settings.visibleDayFinish, specialNonworkingDays: settings.specialNonworkingDays, barMargin: settings.barMargin, barHeight: settings.barHeight,
                    normalAllocationBarClass: settings.normalAllocationBarClass, underAllocationBarClass: settings.underAllocationBarClass, overAllocationBarClass: settings.overAllocationBarClass, normalAllocationBarStyle: settings.normalAllocationBarStyle, underAllocationBarStyle: settings.underAllocationBarStyle, overAllocationBarStyle: settings.overAllocationBarStyle,
                    alternativeItemClass: settings.alternativeItemClass, alternativeChartItemClass: settings.alternativeChartItemClass, alternativeItemStyle: settings.alternativeItemStyle, alternativeChartItemStyle: settings.alternativeChartItemStyle,
                    gridLines: settings.gridLines, horizontalGridLines: settings.horizontalGridLines, verticalGridLines: settings.verticalGridLines, verticalGridHeaderLines: settings.verticalGridHeaderLines, horizontalChartLines: settings.horizontalChartLines,
                    target: settings.target, months: settings.months, daysOfWeek: settings.daysOfWeek, weekStartDay: settings.weekStartDay, dateFormatter: settings.dateFormatter, dateTimeFormatter: settings.dateTimeFormatter, isRelativeToTimezone: settings.isRelativeToTimezone,
                    allocationTemplate: settings.allocationTemplate,
                    classic: settings.classic
                };

                exportSettings.timelineStart = DlhSoft.Controls.GanttChartView.getWeekStart(exportSettings.timelineStart, exportSettings.weekStartDay);
                exportSettings.timelineFinish = DlhSoft.Controls.GanttChartView.getWeekFinish(exportSettings.timelineFinish, exportSettings.weekStartDay);

                var chartWidth = getChartWidth(originalLoadChartView, exportSettings);
                exportSettings.chartWidth = chartWidth + "px";

                var width = gridWidth + chartWidth + 2 + (isGridVisible ? 1 : 0);

                for (i = 0; i < settings.scales.length; i++) {
                    var scale = settings.scales[i];
                    exportSettings.scales.push({ scaleType: scale.scaleType, isHeaderVisible: scale.isHeaderVisible, headerHeight: scale.headerHeight, headerTextFormat: scale.headerTextFormat, headerClass: scale.headerClass, headerStyle: scale.headerStyle, isHighlightingVisible: scale.isHighlightingVisible, highlightingClass: scale.highlightingClass, highlightingStyle: scale.highlightingStyle, isSeparatorVisible: scale.isSeparatorVisible, separatorClass: scale.separatorClass, separatorStyle: scale.separatorStyle, intervals: scale.intervals });
                }

                var exportDocument, exportWindow, isWindowInternal = false;
                if (output != null && typeof output.createElement !== undefinedType) {
                    exportDocument = output;
                }
                else {
                    if (output != null && typeof output.focus !== undefinedType) {
                        exportWindow = output;
                    }
                    else {
                        exportWindow = window.open("", output != null ? output : "_blank", typeof sendToPrinter !== undefinedType && sendToPrinter && (typeof autoClose === undefinedType || autoClose) ? "width=800,height=640,location=no,menubar=no,toolbar=no,status=no,scrollbars=yes" : "");
                        isWindowInternal = true;
                    }
                    exportDocument = exportWindow.document;
                    // Support for exporting links (such as CSS styles).
                    try {
                        var links = document.head.getElementsByTagName("link");
                        for (var i = 0; i < links.length; i++) {
                            var link = links[i];
                            var exportLink = exportDocument.adoptNode(link.cloneNode(true));
                            exportLink.href = link.href;
                            exportDocument.head.appendChild(exportLink);
                        }
                    } catch (exc) { }
                }
                exportDocument.title = typeof title !== undefinedType ? title : ("Exported chart" + (typeof sendToPrinter !== undefinedType && sendToPrinter ? " (printable)" : ""));

                if (typeof startRowIndex === undefinedType)
                    startRowIndex = 0;
                if (typeof endRowIndex === undefinedType)
                    endRowIndex = items.length - 1;
                var exportItems = [], item, exportItem, exportIndex = 0;
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if ((typeof item.displayRowIndex !== undefinedType && (item.displayRowIndex < startRowIndex || item.displayRowIndex > endRowIndex)) || (typeof item.displayRowIndex === undefinedType && (exportIndex++ < startRowIndex || exportIndex > endRowIndex + 1)))
                        continue;
                    exportItem = {
                        content: item.content, indentation: item.indentation, start: item.start, finish: item.finish, units: item.units, isBarVisible: item.isBarVisible, isRelativeToTimezone: item.isRelativeToTimezone,
                        "class": item["class"], style: item.style, barClass: item.barClass, barStyle: item.barStyle,
                        isSummaryEnabled: item.isSummaryEnabled, isParentSummarizationEnabled: item.isParentSummarizationEnabled, isHidden: item.isHidden,
                        isExported: true, tag: item
                    };
                    if (typeof item.displayRowIndex !== undefinedType)
                        exportItem.displayRowIndex = item.displayRowIndex - startRowIndex;
                    copyCustomProperties(exportItem, item);
                    exportItems.push(exportItem);
                    item.exportItem = exportItem;
                }

                var exportingMessage = exportDocument.createElement("p");
                exportingMessage.innerHTML = typeof preparingMessage !== undefinedType ? preparingMessage : "";
                exportDocument.body.appendChild(exportingMessage);

                var loadChartView = exportDocument.createElement("div");
                loadChartView.setAttribute("style", "width: " + width + "px");
                try { DlhSoft.Controls.LoadChartView.initialize(loadChartView, exportItems, exportSettings, internalLicense); } catch (exc) { }

                setTimeout(function () {
                    if (isWindowInternal)
                        exportDocument.body.setAttribute("style", "margin: 0px");
                    var loadChartViewContainer = exportDocument.createElement("div");
                    loadChartViewContainer.appendChild(loadChartView);
                    exportDocument.body.replaceChild(loadChartViewContainer, exportingMessage);
                    if (rotate) {
                        loadChartViewContainer.setAttribute("style", "width: " + loadChartView.offsetHeight + "px; height: " + width + "px; overflow: hidden");
                        var translate = Math.round((loadChartView.offsetWidth - loadChartView.offsetHeight) / 2);
                        loadChartView.setAttribute("style", "width: " + width + "px; transform: rotate(90deg) translateX(" + translate + "px) translateY(" + translate + "px); -webkit-transform: rotate(90deg) translateX(" + translate + "px) translateY(" + translate + "px)");
                    }
                    exportDocument.close();

                    if (typeof exportWindow !== undefined) {
                        exportWindow.focus();
                        if (typeof sendToPrinter !== undefinedType && sendToPrinter) {
                            exportWindow.print();
                            if (typeof autoClose !== undefinedType && !autoClose)
                                return;
                            setTimeout(function () {
                                exportWindow.close();
                            });
                        }
                    }
                }, 0);
            },

            // Interface.
            initializeInterface = function (loadChartView, items, loadChartItems, settings) {
                for (var ci = 0; ci < items.length; ci++)
                    items[ci].loadChartView = items[ci].scheduleChartView = loadChartView;
                loadChartView.loadChartItems = loadChartView.scheduleChartItems = loadChartItems;
                loadChartView.settings = settings;
                loadChartView.refreshLoadChartItem = refreshLoadChartItem;
                loadChartView.insertLoadChartItem = function (index, item) { insertLoadChartItem(index, item, items, loadChartItems, loadChartView); }
                loadChartView.addLoadChartItem = function (item) { loadChartView.insertLoadChartItem(loadChartItems.length, item); }
                loadChartView.insertLoadChartItems = function (index, items) { for (var i = 0; i < items.length; i++) loadChartView.insertLoadChartItem(index++, items[i]); }
                loadChartView.addLoadChartItems = function (items) { for (var i = 0; i < items.length; i++) loadChartView.addLoadChartItem(items[i]); }
                loadChartView.removeLoadChartItem = function (item) { return removeLoadChartItem(item, loadChartItems, loadChartView); }
                loadChartView.removeLoadChartItems = function (items) { for (var i = 0; i < items.length; i++) loadChartView.removeLoadChartItem(items[i]); }
                loadChartView.moveLoadChartRange = function (fromIndex, count, toIndex) { moveRange(fromIndex, count, toIndex, loadChartView, loadChartItems); }
                loadChartView.moveLoadChartItem = function (item, toIndex) { move(item, toIndex, loadChartView, loadChartItems); }
                loadChartView.moveLoadChartItemUp = function (item) { var index = loadChartItems.indexOf(item); if (index <= 0) return; move(item, index - 1, loadChartView, loadChartItems); }
                loadChartView.moveLoadChartItemDown = function (item) { var index = loadChartItems.indexOf(item); if (index < 0 || index >= loadChartItems.length - 1) return; move(item, index + 1, loadChartView, loadChartItems); }
            },
            overrideInterface = function (loadChartView, items, settings) {
                loadChartView.items = items;
                loadChartView.refresh = function () { refresh(loadChartView); }
                loadChartView.exportContent = function (exportSettings, output) { if (typeof exportSettings === undefinedType) exportSettings = {}; exportContent(exportSettings.title, exportSettings.preparingMessage, exportSettings.isGridVisible, exportSettings.columnIndexes, exportSettings.timelineStart, exportSettings.timelineFinish, exportSettings.isRelativeToTimezone, exportSettings.hourWidth, exportSettings.startRowIndex, exportSettings.endRowIndex, output, false, exportSettings.rotate, false, loadChartView, items, settings); }
                loadChartView.print = function (exportSettings) { if (typeof exportSettings === undefinedType) exportSettings = {}; exportContent(exportSettings.title, exportSettings.preparingMessage, exportSettings.isGridVisible, exportSettings.columnIndexes, exportSettings.timelineStart, exportSettings.timelineFinish, exportSettings.isRelativeToTimezone, exportSettings.hourWidth, exportSettings.startRowIndex, exportSettings.endRowIndex, null, true, exportSettings.rotate, exportSettings.autoClose, loadChartView, items, settings); }
            };

        return {
            initialize: initialize,
            refresh: refresh,
            getDefaultColumns: getDefaultColumns,
            getDefaultScales: DlhSoft.Controls.GanttChartView.getDefaultScales,
            getDefaultAllocationTemplate: getDefaultAllocationTemplate,
            getDefaultItemTemplate: DlhSoft.Controls.GanttChartView.getDefaultItemTemplate,
            getWorkingTime: DlhSoft.Controls.GanttChartView.getWorkingTime,
            textColumnTemplateBase: DlhSoft.Controls.GanttChartView.textColumnTemplateBase,
            textInputColumnTemplateBase: DlhSoft.Controls.GanttChartView.textInputColumnTemplateBase,
            getOutputDate: DlhSoft.Controls.GanttChartView.getOutputDate,
            getInputDate: DlhSoft.Controls.GanttChartView.getInputDate
        };
    } ();
};
