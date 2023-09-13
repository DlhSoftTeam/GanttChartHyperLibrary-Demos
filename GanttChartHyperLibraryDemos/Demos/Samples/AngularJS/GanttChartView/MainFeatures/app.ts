/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.Extras.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;

// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;
declare var initializeGanttChartTheme;

declare var angular;
angular.module('GanttChartViewSample', ['DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', ($scope, $http, $timeout) => {
        // URL for Project data access Web API, to support loading items and saving item changes to a server side database.
        var projectDataAccessWebApiUrl = 'http://localhost:53722/api';
        // Internal functions.
        function refresh(): void {
            $scope.$apply();
        }
        // Prepare Gantt Chart data items and settings.
        var items = <GanttChartItem[]>[
            { content: 'Story A' },
            { content: 'Task 1', indentation: 1, start: new Date(2016, 2 - 1, 11, 08), finish: new Date(2016, 2 - 1, 12, 12), completedFinish: new Date(2016, 2 - 1, 12, 12), assignmentsContent: 'Resource 1', baselineStart: new Date(2016, 2 - 1, 10, 08), baselineFinish: new Date(2016, 2 - 1, 11, 16) },
            { content: 'Task 2', indentation: 1, start: new Date(2016, 2 - 1, 12, 08), finish: new Date(2016, 2 - 1, 12, 16), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
            { content: 'Story B' },
            { content: 'Task 3', indentation: 1, start: new Date(2016, 2 - 1, 15, 08), finish: new Date(2016, 2 - 1, 15, 16), completedFinish: new Date(2016, 2 - 1, 15, 12), assignmentsContent: 'Resource 2 [50%]'},
            { content: 'Task 4', indentation: 1, start: new Date(2016, 2 - 1, 15, 08), finish: new Date(2016, 2 - 1, 16, 16), assignmentsContent: 'Resource 2' },
            { content: 'Task 5', indentation: 1, start: new Date(2016, 2 - 1, 16, 08), finish: new Date(2016, 2 - 1, 17, 16) },
            { content: 'Task 6', indentation: 1, start: new Date(2016, 2 - 1, 16, 08), finish: new Date(2016, 2 - 1, 19, 16) },
            { content: 'Milestone', start: new Date(2016, 2 - 1, 16, 08), isMilestone: true }];
        items[2].predecessors = <PredecessorItem[]>[{ item: items[1] }]; // Task 2 depends on Task 1.
        items[7].predecessors = <PredecessorItem[]>[{ item: items[6], dependencyType: 'StartStart' }]; // Task 6 depends on Task 5 using Start-Start dependency type.
        items[8].predecessors = <PredecessorItem[]>[{ item: items[0] }, { item: items[3] }]; // Milestone depends on Story A and Story B.
        $scope.items = items;
        var settings = <GanttChartView.Settings>{
            // Auto-scheduling is initially turned on.
            areTaskDependencyConstraintsEnabled: true,
            // Other settings that you can enable and customize as needed in your application.
            // isGridVisible: false,
            // gridWidth: '30%',
            // chartWidth: '70%',
            // isGridReadOnly: true,
            // isChartReadOnly: true,
            // isVirtualizing: false,
            // isTaskEffortPreservedWhenStartChangesInGrid: true,
            // border: 'Gray',
            // gridLines: 'LightGray',
            // standardBarStyle: 'stroke: Green; fill: LightGreen',
            // standardCompletedBarStyle: 'stroke: DarkGreen; fill: DarkGreen',
            // dependencyLineStyle: 'stroke: Green; fill: none; marker-end: url(#ArrowMarker)',
            // alternativeItemStyle: 'background-color: #f9f9f9', alternativeChartItemStyle: 'fill: #f9f9f9',
            // itemTemplate: (item) => {
            //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            //     var toolTipContent = item.content + ' • ' + 'Start: ' + item.start.toLocaleString();
            //     if (!item.isMilestone)
            //         toolTipContent += ' • ' + 'Finish: ' + item.finish.toLocaleString();
            //     toolTip.appendChild(document.createTextNode(toolTipContent));
            //     return toolTip;
            // },
            currentTime: new Date(2016, 2 - 1, 12) // Display the current time vertical line of the chart at the project start date.
        };
        // Define schedule.
        // settings.schedule = {
        //      workingWeekStart: 1, workingWeekFinish: 5, // Monday - Friday
        //      visibleDayStart: 8 * 60 * 60 * 1000, visibleDayFinish: 16 * 60 * 60 * 1000 // 8 AM - 4 PM
        //      // , specialNonworkingDays: [new Date(2016, 2 - 1, 19), new Date(2016, 2 - 1, 21)] // excluded
        // };
        // var specialSchedule = <GanttChartView.Schedule>{
        //      workingWeekStart: 0, workingWeekFinish: 3, // Sunday - Wednesday
        //      workingDayStart: 9 * 60 * 60 * 1000, workingDayFinish: 19 * 60 * 60 * 1000 // 9 AM - 7 PM, exceeding visible 4 PM
        //      // , specialNonworkingDays: [new Date(2016, 2 - 1, 18), new Date(2016, 2 - 1, 21), new Date(2016, 2 - 1, 22)] // partial replacement for excluded dates
        // };
        // items[4].schedule = specialSchedule;
        // items[5].schedule = specialSchedule;
        // Configure selection.
        // settings.selectionMode = 'Extended'; // Supported values: None, Focus (default), Single, Extended, ExtendedFocus.
        // settings.selectedItemStyle = 'background: LightCyan';
        // items[6].isSelected = true;
        // Customize columns.
        var columns = GanttChartView.getDefaultColumns(items, settings);
        var indexOffset = columns[0].isSelection ? 1 : 0;
        // columns[0 + indexOffset].header = 'Work items';
        // columns[0 + indexOffset].width = 240;
        columns.splice(0 + indexOffset, 0, { header: '', width: 40, cellTemplate: DlhSoft.Controls.GanttChartView.getIndexColumnTemplate() });
        columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: GanttChartView.getTotalEffortColumnTemplate(64) });
        columns.splice(4 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: GanttChartView.getDurationColumnTemplate(64, 8) });
        columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: GanttChartView.getCompletionColumnTemplate(64) });
        columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: GanttChartView.getPredecessorsColumnTemplate(84) });
        columns.push({ header: 'Cost ($)', width: 100, cellTemplate: GanttChartView.getCostColumnTemplate(84) });
        columns.push({ header: 'Est. start', width: 140, cellTemplate: GanttChartView.getBaselineStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
        columns.push({ header: 'Est. finish', width: 140, cellTemplate: GanttChartView.getBaselineFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM
        // items[7]['description'] = 'Custom description';
        // columns.push({ header: 'Description', width: 200, cellTemplate: (item) => { return item['ganttChartView'].ownerDocument.createTextNode(item['description']); } });
        // columns[10 + indexOffset].cellTemplate = GanttChartView.getAssignmentSelectorColumnTemplate(184, (item) { return ['Resource 1', 'Resource 2'] });
        // items[7]['targetDate'] = new Date(2016, 2 - 1, 28, 12, 0, 0);
        // columns.push({ header: 'Target date', width: 140, cellTemplate: (item)  => {
        //     return GanttChartView.datePickerInputColumnTemplateBase(item['ganttChartView'].ownerDocument, 140,
        //         function () { return GanttChartView.getInputDate(item['targetDate']); }, 
        //         function (value) { item['targetDate'] = GanttChartView.getOutputDate(value); }); } });
        settings.columns = columns;
        // Optionally, initialize custom themes (themes.js).
        initializeGanttChartTheme(settings, theme);
        $scope.settings = settings;
        // Underlying GanttChartView component reference.
        var ganttChartView = <GanttChartView.Element>document.getElementById('ganttChartView');
        // Data transfer object conversions to support loading and saving items from and to a server side database.
        var getItems = (taskDtos) => {
            var items = taskDtos;
            var getItemById = (id) => {
                for (var k = 0; k < items.length; k++) {
                    if (items[k]['Id'] == id)
                        return items[k];
                }
            };
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item.content = item['Name'];
                item.start = item['Start'];
                item.finish = item['Finish'];
                item.completedFinish = item['CompletedFinish'];
                if (item['Assignments'])
                    item.assignmentsContent = item['Assignments'];
                item.indentation = item['Indentation'];
                if (item['Predecessors'].length > 0) {
                    item.predecessors = [];
                    for (var j = 0; j < item['Predecessors'].length; j++) {
                        var predecessor: PredecessorItem = item['Predecessors'][j];
                        predecessor.item = getItemById(predecessor['SourceTaskId']);
                        predecessor.dependencyType = predecessor['DependencyType'];
                        item.predecessors.push(predecessor);
                    }
                }
            }
            return items;
        };
        var getTaskDto = (item) => {
            var taskDto = { Name: item.content, Start: item.start, Finish: item.finish, CompletedFinish: item.completedFinish ? item.completedFinish : item.start, Assignments: item.assignmentsContent, Indentation: item.indentation, Predecessors: [] };
            if (item.predecessors) {
                for (var i = 0; i < item.predecessors.length; i++) {
                    var predecessor: PredecessorItem = item.predecessors[i];
                    if (!predecessor.item['Id'])
                        continue;
                    var predecessorDto = { SourceTaskId: predecessor.item['Id'], DependencyType: predecessor.dependencyType };
                    taskDto.Predecessors.push(predecessorDto);
                }
            }
            return taskDto;
        };
        // Prepare command handlers.
        var usingDatabase = false;
        $scope.usingDatabase = usingDatabase;
        $scope.addNewItem = () => {
            var item: GanttChartItem = { content: 'New task', start: new Date(2016, 2 - 1, 11, 08), finish: new Date(2016, 2 - 1, 11, 16) };
            items.push(item);
            var selectedItem = ganttChartView.getSelectedItem();
            if (selectedItem)
                ganttChartView.unselectItem(selectedItem);
            $timeout(() => {
                ganttChartView.selectItem(item);
                if (usingDatabase) {
                    $http.put(projectDataAccessWebApiUrl + '/Tasks', getTaskDto(item))
                        .then((response) => {
                            item['Id'] = response.data.Id;
                        });
                }
            }, 100);
        };
        $scope.insertNewItem = () => {
            var selectedItem = ganttChartView.getSelectedItem();
            if (!selectedItem)
                return;
            var item: GanttChartItem = { content: 'New task', indentation: selectedItem.indentation, start: new Date(2016, 2 - 1, 11, 08), finish: new Date(2016, 2 - 1, 11, 16) };
            items.splice(selectedItem.index, 0, item);
            ganttChartView.unselectItem(selectedItem);
            $timeout(() => {
                ganttChartView.selectItem(item);
            }, 100);
        };
        $scope.increaseItemIndentation = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            ganttChartView.increaseItemIndentation(item);
        };
        $scope.decreaseItemIndentation = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            ganttChartView.decreaseItemIndentation(item);
        };
        $scope.deleteItem = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            if (usingDatabase && item['Id'])
                $http.delete(projectDataAccessWebApiUrl + '/Tasks/' + item['Id']);
            items.splice(item.index, 1);
        };
        $scope.setCustomBarColorToItem = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            // Note: You can use barClass instead of barStyle fields to point to custom CSS classes.
            item.barStyle = 'stroke: Green; fill: LightGreen';
            item.completedBarStyle = 'stroke: Gray; fill: Gray';
        };
        var copiedItem: GanttChartItem = null;
        $scope.copyItem = () => {
            copiedItem = ganttChartView.getSelectedItem();
        };
        $scope.pasteItem = () => {
            var selectedItem = ganttChartView.getSelectedItem();
            if (!copiedItem || !selectedItem)
                return;
            var item: GanttChartItem = { content: copiedItem.content, indentation: selectedItem.indentation, start: copiedItem.start, finish: copiedItem.finish, completedFinish: copiedItem.completedFinish, isMilestone: copiedItem.isMilestone, assignmentsContent: copiedItem.assignmentsContent, isRelativeToTimezone: copiedItem.isRelativeToTimezone };
            items.splice(selectedItem.index + 1, 0, item);
            $timeout(() => {
                ganttChartView.selectItem(item);
            }, 100);
            ganttChartView.selectItem(item);
        };
        $scope.moveItemDown = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            ganttChartView.moveItemHierarchyDown(item);
        };
        $scope.moveItemUp = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            ganttChartView.moveItemHierarchyUp(item);
        };
        $scope.increaseTimelinePage = () => {
            ganttChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        };
        $scope.decreaseTimelinePage = () => {
            ganttChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        };
        $scope.setCustomScales = () => {
            settings.headerHeight = 21 * 3;
            settings.scales = [
                { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
                { scaleType: 'Months', headerTextFormat: 'Month', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
                { scaleType: 'Days', headerTextFormat: 'Day', headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: gray' },
                { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #e31d3b; stroke-width: 0.5px' }];
            settings.updateScale = 60 * 60 * 1000; // 1 hour
            settings.hourWidth = 5;
            settings.visibleWeekStart = 1; // Monday
            settings.visibleWeekFinish = 5; // Friday
            settings.workingWeekStart = 1; // Monday
            settings.workingWeekFinish = 4; // Thursday
            settings.visibleDayStart = 10 * 60 * 60 * 1000; // 10 AM
            settings.visibleDayFinish = 20 * 60 * 60 * 1000; // 8 PM
            settings.specialNonworkingDays = [new Date(2016, 2 - 1, 24), new Date(2016, 2 - 1, 25)];
        };
        $scope.zoomIn = () => {
            ganttChartView.setHourWidth(settings.hourWidth * 2);
        };
        $scope.toggleBaseline = () => {
            settings.isBaselineVisible = !settings.isBaselineVisible;
        };
        $scope.isCriticalPathTogglePressed = false;
        $scope.highlightCriticalPath = () => {
            $scope.isCriticalPathTogglePressed = true;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                delete item.barStyle;
                if (!item.hasChildren && ganttChartView.isItemCritical(item))
                    item.barStyle = 'stroke: #e31d3b; fill: #e31d3b';
            }
        };
        $scope.splitRemainingWork = () => {
            var item = ganttChartView.getSelectedItem();
            if (!item)
                return;
            ganttChartView.splitRemainingWork(item);
        };
        $scope.isAutoScheduling = settings.areTaskDependencyConstraintsEnabled;
        $scope.toggleAutoScheduling = () => {
            $scope.isAutoScheduling = settings.areTaskDependencyConstraintsEnabled = !settings.areTaskDependencyConstraintsEnabled;
        };
        $scope.levelResources = () => {
            // Level the assigned resources for all tasks, including the already started ones, considering the current time displayed in the chart.
            ganttChartView.levelResources(true, settings.currentTime);
            // Alternatively, optimize work to obtain the minimum project finish date and time assuming unlimited resource availability:
            // ganttChartView.optimizeWork(false, true, settings.currentTime);
        };
        $scope.loadItemsFromDatabase = () => {
            $scope.usingDatabase = usingDatabase = true;
            $http.get(projectDataAccessWebApiUrl + '/Tasks')
                .then((response) => {
                    $scope.items = items = getItems(response.data);
                });
        };
        $scope.isLoadProjectXmlPanelVisible = false;
        $scope.loadProjectXml = () => {
            $scope.isSaveProjectXmlPanelVisible = false;
            $scope.isLoadProjectXmlPanelVisible = true;
        };
        $scope.loadProjectXmlInput = '<Project/>';
        $scope.loadProjectXmlContent = () => {
            var projectSerializer = GanttChartView.ProjectSerializer.initialize(ganttChartView);
            projectSerializer.loadXml($scope.loadProjectXmlInput);
            $scope.isLoadProjectXmlPanelVisible = false;
        };
        $scope.closeLoadProjectXml = () => {
            $scope.isLoadProjectXmlPanelVisible = false;
        };
        $scope.isSaveProjectXmlPanelVisible = false;
        $scope.saveProjectXml = () => {
            $scope.isLoadProjectXmlPanelVisible = false;
            $scope.isSaveProjectXmlPanelVisible = true;
            var projectXmlSerializerSettings = <GanttChartView.ProjectSerializer.Settings>{ compact: true, spaceSeparated: true };
            var projectSerializer = GanttChartView.ProjectSerializer.initialize(ganttChartView, projectXmlSerializerSettings);
            $scope.saveProjectXmlOutput = projectSerializer.getXml();
        };
        $scope.closeSaveProjectXml = () => {
            $scope.isSaveProjectXmlPanelVisible = false;
        };
        $scope.print = () => {
            // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
            ganttChartView.print({ title: 'Gantt Chart (printable)', isGridVisible: true, columnIndexes: [1], timelineStart: new Date(2016, 2 - 1, 1), timelineFinish: new Date(new Date(2016, 2 - 1, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        };
        // Handle item changes.
        var lastChangedItem: GanttChartItem = null, updateItemTimeout;
        var saveLastChangedItemToDatabase = () => {
            var item = lastChangedItem;
            if (!item)
                return;
            $http.post(projectDataAccessWebApiUrl + '/Tasks/' + item['Id'], getTaskDto(item));
            lastChangedItem = null;
        };
        $scope.onItemChanged = (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean): void => {
            if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
                return;
            console.log(propertyName + ' changed for ' + item.content + '.');
            if (!item['Id'] || (propertyName != 'content' && propertyName != 'start' && propertyName != 'finish' && propertyName != 'completedFinish' && propertyName != 'assignmentsContent' && propertyName != 'indentation' && propertyName != 'predecessors'))
                return;
            if (item != lastChangedItem && updateItemTimeout) {
                clearTimeout(updateItemTimeout);
                delete updateItemTimeout;
                saveLastChangedItemToDatabase();
            }
            if (updateItemTimeout)
                clearTimeout(updateItemTimeout);
            lastChangedItem = item;
            updateItemTimeout = setTimeout(() => {
                saveLastChangedItemToDatabase();
                delete updateItemTimeout;
            }, 500); // Do not save changes immediately, to avoid too many server calls for the same item.
        };
    });
