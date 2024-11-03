var ganttChartView;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.ganttChartViewRef = React.createRef();
    }
    componentDidMount() {
        ganttChartView = this.ganttChartViewRef.current;
    }
    render() {
        // Query string syntax: ?theme
        // Supported themes: Default, Generic-bright, Generic-blue, Blue-green, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
        var queryString = window.location.search;
        var theme = queryString ? queryString.substr(1) : null;

        var date = new Date(), year = date.getFullYear(), month = date.getMonth();
        var items = [{ content: 'Planning', label: 'Planning', isExpanded: false },
        { content: 'Analysis', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
        { content: 'Requirements', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria  [50%], Tyson Lamberson' },
        { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
        { content: 'Arhitecture', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush [50%], Meeting room' },
        { content: 'Design', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
        { content: 'Development', label: 'Development', isExpanded: true },
        { content: 'Start development', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), isMilestone: true, assignmentsContent: 'Steven Rush' },
        { content: 'Date-times', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
        { content: 'Schedules', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush [50%]' },
        { content: 'Automation testing functions', label: 'Very important!', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
        { content: 'Chart', label: 'Chart', indentation: 1 },
        { content: 'Bars', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 7, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
        { content: 'Summary bars', indentation: 2, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
        { content: 'Review', indentation: 2, start: new Date(year, month, 9, 16, 0, 0), isMilestone: true },
        { content: 'Links', indentation: 2, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
        { content: 'Diagram functions', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
        { content: 'Quality assurance', label: 'Very important!', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0), hasMilestoneAtFinish: true, assignmentsContent: 'Denis Kaelin, Printer' },
        { content: 'Project delivery', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Meeting room' },
        { content: 'Maintenance', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) },
        { content: 'Marketing', label: 'Marketing', start: new Date(year, month, 10, 12, 0, 0), finish: new Date(year, month, 15, 12, 0, 0) },
        { content: 'Preparations', indentation: 1, start: new Date(year, month, 10, 8, 0, 0), isMilestone: true, assignmentsContent: 'Joanna Mcamis, Alicia Rock' },
        { content: 'Colors', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Joanna Mcamis [25%]' },
        { content: 'Logo', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Alicia Rock [25%]' },
        { content: 'Samples app', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 16, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
        { content: 'Screenshots', indentation: 1, start: new Date(year, month, 12, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), assignmentsContent: 'Joanna Mcamis' },
        { content: 'Videos', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0), assignmentsContent: 'Alicia Rock [50%]' }];
        items[3].predecessors = [{ item: items[0], dependencyType: 'SS' }];
        items[7].predecessors = [{ item: items[6], lag: 2 * 60 * 60 * 1000 }];
        items[8].predecessors = [{ item: items[4] }, { item: items[5] }];
        items[9].finish.setDate(items[9].finish.getDate() + 2);
        items[10].predecessors = [{ item: items[9] }];

        var settings = {
            // Auto-scheduling is initially turned on.
            areTaskDependencyConstraintsEnabled: true,
            // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
            currentTime: new Date(year, month, 2, 12, 0, 0),
            itemClass: 'grid-item'
        };

        // Optionally, set baseline properties.
        items[6].baselineStart = new Date(year, month, 10, 8, 0, 0);
        items[6].baselineFinish = new Date(year, month, 11, 16, 0, 0);
        items[7].baselineStart = new Date(year, month, 8, 8, 0, 0);
        items[7].baselineFinish = new Date(year, month, 11, 16, 0, 0);
        items[8].baselineStart = new Date(year, month, 12, 8, 0, 0);

        // Customize columns.
        var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
        var indexOffset = columns[0].isSelection ? 1 : 0;
        columns.splice(0 + indexOffset, 0, { header: '', width: 32, cellTemplate: DlhSoft.Controls.GanttChartView.getIconColumnTemplate('Images/checkmark.png', null, 'width: 16px; height: 16px; margin-top: 2px', true, undefined, undefined, 'background: #f8f8f8') });
        columns.splice(1 + indexOffset, 0, { header: '', width: 40, cellTemplate: DlhSoft.Controls.GanttChartView.getIndexColumnTemplate() });
        columns.splice(4 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getTotalEffortColumnTemplate(64) });
        columns.splice(5 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getDurationColumnTemplate(64, 8) });
        columns.splice(9 + indexOffset, 0, { header: '%', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getCompletionColumnTemplate(64) });
        columns.splice(10 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getPredecessorsColumnTemplate(84) });
        columns.push({ header: 'Cost ($)', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getCostColumnTemplate(84) });
        columns.push({ header: 'Est. start', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getBaselineStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
        columns.push({ header: 'Est. finish', width: 140, cellTemplate: DlhSoft.Controls.GanttChartView.getBaselineFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM
        settings.columns = columns;
        // Optionally, initialize custom themes (themes.js).
        initializeGanttChartTheme(settings, theme);
        function onItemChanged(item, propertyName, isDirect, isFinal) {
            if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
                return;
            console.log(propertyName + ' changed for ' + item.content + '.');
        }
        function addNewItem() {
            var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
            ganttChartView.addItem(item);
            ganttChartView.selectItem(item);
            ganttChartView.scrollToItem(item);
            ganttChartView.scrollToDateTime(new Date(year, month, 1));
        }
        function insertNewItem() {
            if (ganttChartView.selectedItem == null)
                return;
            var item = { content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
            ganttChartView.insertItem(ganttChartView.selectedItem.index, item);
            ganttChartView.selectItem(item);
            ganttChartView.scrollToItem(item);
            ganttChartView.scrollToDateTime(new Date(year, month, 1));
        }
        function increaseItemIndentation() {
            var item = ganttChartView.selectedItem;
            if (item == null)
                return;
            ganttChartView.increaseItemIndentation(item);
            ganttChartView.scrollToItem(item);
        }
        function decreaseItemIndentation() {
            var item = ganttChartView.selectedItem;
            if (item == null)
                return;
            ganttChartView.decreaseItemIndentation(item);
            ganttChartView.scrollToItem(item);
        }
        function deleteItem() {
            if (ganttChartView.selectedItem == null)
                return;
            ganttChartView.removeItem(ganttChartView.selectedItem, true); // Also remove successors' predecessor information.
        }
        function setCustomBarColorToItem() {
            if (ganttChartView.selectedItem == null)
                return;
            var item = ganttChartView.selectedItem;
            item.barStyle = 'stroke: Green; fill: LightGreen';
            item.completedBarStyle = 'stroke: Gray; fill: Gray';
            ganttChartView.refreshChartItem(item);
        }
        function copyItem() {
            if (ganttChartView.selectedItem == null)
                return;
            copiedItem = ganttChartView.selectedItem;
        }
        var copiedItem = null;
        function pasteItem() {
            if (copiedItem == null || ganttChartView.selectedItem == null)
                return;
            var item = { content: copiedItem.content, start: copiedItem.start, finish: copiedItem.finish, completedFinish: copiedItem.completedFinish, isMilestone: copiedItem.isMilestone, assignmentsContent: copiedItem.assignmentsContent, isRelativeToTimezone: copiedItem.isRelativeToTimezone };
            ganttChartView.insertItem(ganttChartView.selectedItem.index + 1, item);
            ganttChartView.selectItem(item);
            ganttChartView.scrollToItem(item);
            ganttChartView.scrollToDateTime(item.start);
        }
        function moveItemUp() {
            if (ganttChartView.selectedItem == null)
                return;
            var item = ganttChartView.selectedItem;
            ganttChartView.moveItemHierarchyUp(item);
            ganttChartView.scrollToItem(item);
        }
        function moveItemDown() {
            if (ganttChartView.selectedItem == null)
                return;
            var item = ganttChartView.selectedItem;
            ganttChartView.moveItemHierarchyDown(item);
            ganttChartView.scrollToItem(item);
        }
        function increaseTimelinePage() {
            ganttChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        }
        function decreaseTimelinePage() {
            ganttChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        }
        function setCustomScales() {
            var settings = ganttChartView.settings;
            settings.headerHeight = 21 * 3;
            settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
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
            settings.specialNonworkingDays = [new Date(year, month, 24), new Date(year, month, 25)];
            ganttChartView.refresh();
        }
        function zoomIn() {
            var settings = ganttChartView.settings;
            ganttChartView.setHourWidth(settings.hourWidth * 2);
        }
        function toggleBaseline() {
            var settings = ganttChartView.settings;
            settings.isBaselineVisible = !settings.isBaselineVisible;
            toggleBaselineCommand.className = settings.isBaselineVisible ? 'ribbonCommand toggle pressed' : 'ribbonCommand toggle';
            ganttChartView.refresh();
        }
        function highlightCriticalPath() {
            highlightCriticalPathCommand.className = 'ribbonCommand toggle pressed';
            for (var i = 0; i < ganttChartView.items.length; i++) {
                var item = ganttChartView.items[i];
                delete item.barStyle;
                if (!item.hasChildren && ganttChartView.isItemCritical(item))
                    item.barStyle = 'stroke: #e31d3b; fill: #e31d3b';
                ganttChartView.refreshChartItem(item);
            }
        }
        function splitRemainingWork() {
            if (ganttChartView.selectedItem == null)
                return;
            var remainingWorkItem = ganttChartView.splitRemainingWork(ganttChartView.selectedItem, ' (rem. work)', ' (compl. work)');
            if (remainingWorkItem == null)
                return;
            ganttChartView.scrollToItem(remainingWorkItem);
        }
        function toggleDependencyConstraints() {
            var settings = ganttChartView.settings;
            settings.areTaskDependencyConstraintsEnabled = !settings.areTaskDependencyConstraintsEnabled;
            toggleDependencyConstraintsCommand.className = settings.areTaskDependencyConstraintsEnabled ? 'ribbonCommand toggle pressed' : 'ribbonCommand toggle';
            ganttChartView.refresh();
        }
        function levelResources() {
            // Level the assigned resources for all tasks, including the already started ones, considering the current time displayed in the chart.
            ganttChartView.levelResources(true, ganttChartView.settings.currentTime);
            // Alternatively, optimize work to obtain the minimum project finish date and time assuming unlimited resource availability:
            // ganttChartView.optimizeWork(false, true, ganttChartView.settings.currentTime);
        }
        function print() {
            // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
            ganttChartView.print({ title: 'Gantt Chart (printable)', isGridVisible: true, columnIndexes: [1], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        }
        return (
            <div>
                <div className="ribbonContainer">
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Items</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={addNewItem} title="Add new item"><img src="Images/AddNew.png" alt="Add new" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={insertNewItem} title="Insert new item before selection"><img src="Images/InsertNew.png" alt="Insert new" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={decreaseItemIndentation} title="Decrease selected item indentation"><img src="Images/DecreaseIndentation.png" alt="Increase indentation" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={increaseItemIndentation} title="Increase selected item indentation"><img src="Images/IncreaseIndentation.png" alt="Increase indentation" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={deleteItem} title="Delete selected item"><img src="Images/Delete.png" alt="Delete selected item" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={setCustomBarColorToItem} title="Set custom bar color to selected item"><img src="Images/SetColor.png" alt="Set color" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={copyItem} title="Copy selected item"><img src="Images/Copy.png" alt="Copy" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={pasteItem} title="Paste after selected item"><img src="Images/Paste.png" alt="Paste" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={moveItemUp} title="Move selected item up"><img src="Images/MoveUp.png" alt="Move up" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={moveItemDown} title="Move selected item down"><img src="Images/MoveDown.png" alt="Move down" /></a></div>
                        </div>
                    </div>
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Timeline/Schedule</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={setCustomScales} title="Set custom scales"><img src="Images/CustomScales.png" alt="Custom scales" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={zoomIn} title="Zoom in"><img src="Images/ZoomIn.png" alt="Zoom in" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={decreaseTimelinePage} title="Move towards past"><img src="Images/DecreaseTimelinePage.png" alt="Decrease timeline page" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={increaseTimelinePage} title="Move towards future"><img src="Images/IncreaseTimelinePage.png" alt="Increase timeline page" /></a></div>
                        </div>
                    </div>
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Project tools</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand toggle pressed" id="toggleBaselineCommand"><a href="#" onClick={toggleBaseline} title="Hide/display baseline"><img src="Images/Baseline.png" alt="Baseline" /></a></div>
                            <div className="ribbonCommand toggle" id="highlightCriticalPathCommand"><a href="#" onClick={highlightCriticalPath} title="Highlight/refresh critical path"><img src="Images/CriticalPath.png" alt="Critical path" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={splitRemainingWork} title="Split work upon completion point in order to be able to reschedule remaining work separately"><img src="Images/SplitRemainingWork.png" alt="Split remaining work" /></a></div>
                            <div className="ribbonCommand toggle pressed" id="toggleDependencyConstraintsCommand"><a href="#" onClick={toggleDependencyConstraints} title="Disable/enable automatic scheduling"><img src="Images/DependencyConstraints.png" alt="Dependency constraints" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={levelResources} title="Level resources"><img src="Images/LevelResources.png" alt="Level resources" /></a></div>
                        </div>
                    </div>
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Printing</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={print} title="Print"><img src="Images/Print.png" alt="Print" /></a></div>
                        </div>
                    </div>
                </div>
                <div id="ganttChartViewContainer">
                    <GanttChartView ref={this.ganttChartViewRef} items={items} settings={settings} change={onItemChanged} style={{ minHeight: '388px' }}>...</GanttChartView>
                </div>
            </div>);
    }
}