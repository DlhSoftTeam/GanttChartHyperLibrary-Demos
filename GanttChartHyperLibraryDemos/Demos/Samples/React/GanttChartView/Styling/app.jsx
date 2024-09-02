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
        // Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
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
        for (var i = 4; i <= 16; i++)
            items.push({ content: 'Task ' + i, indentation: i >= 8 && i % 3 == 2 ? 0 : 1, start: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 : i - 8), 8, 0, 0), finish: new Date(year, month, 2 + (i <= 8 ? (i - 4) * 3 + (i > 8 ? 6 : 1) : i - 2), 16, 0, 0) });
        items[9].finish.setDate(items[9].finish.getDate() + 2);
        items[10].predecessors = [{ item: items[9] }];

        var settings = {
            // Auto-scheduling is initially turned on.
            areTaskDependencyConstraintsEnabled: true,
            // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
            currentTime: new Date(year, month, 2, 12, 0, 0), arrowSize: 1,
            itemHeight: 32, barHeight: 20, barMargin: 6,
            containerClass: 'container', selectedItemClass: 'selectedItem',
            cellClass: theme == 'Dark-black' ? 'cell-dark' : 'cell',
            standardBarClass: 'standardBar', standardCompletedBarClass: 'standardCompletedBar',
            summaryBarClass: 'summaryBar', milestoneBarClass: 'milestoneBar',
            assignmentsClass: 'assignments', dependencyLineClass: 'dependencyLine',
            baselineBarClass: 'baselineBar',
            alternativeItemClass: theme == 'Dark-black' ? 'alternativeGridItem-dark' : (theme == 'Steel-blue' ? 'alternativeGridItem-steel' : 'alternativeGridItem'),
            alternativeChartItemClass: theme == 'Dark-black' ? 'alternativeChartItem-dark' : 'alternativeChartItem'
        };

        // Optionally, set labels visibility.
        settings.areStandardTaskLabelsVisible = true;
        settings.areSummaryTaskLabelsVisible = true;
        settings.areMilestoneTaskLabelsVisible = true;

        // Optionally, set baseline properties.
        items[6].baselineStart = new Date(year, month, 10, 8, 0, 0);
        items[6].baselineFinish = new Date(year, month, 11, 16, 0, 0);
        items[7].baselineStart = new Date(year, month, 8, 8, 0, 0);
        items[7].baselineFinish = new Date(year, month, 11, 16, 0, 0);
        items[8].baselineStart = new Date(year, month, 12, 8, 0, 0);

        // Customize columns.
        var columns = DlhSoft.Controls.GanttChartView.getDefaultColumns(items, settings);
        var indexOffset = columns[0].isSelection ? 1 : 0;
        columns.splice(0 + indexOffset, 0, { header: '', width: 40, cellTemplate: DlhSoft.Controls.GanttChartView.getIndexColumnTemplate() });
        columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getTotalEffortColumnTemplate(64) });
        columns.splice(4 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getDurationColumnTemplate(64, 8) });
        columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: DlhSoft.Controls.GanttChartView.getCompletionColumnTemplate(64) });
        columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: DlhSoft.Controls.GanttChartView.getPredecessorsColumnTemplate(84) });
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
                            <div className="ribbonCommand"><a id="addNewItemButton" href="#" title="Add new item" onClick={addNewItem}><img src="Images/AddNew.png" alt="Add new" /></a></div>
                            <div className="ribbonCommand"><a id="insertNewItemButton" href="#" title="Insert new item before selection" onClick={insertNewItem}><img src="Images/InsertNew.png" alt="Insert new" /></a></div>
                            <div className="ribbonCommand"><a id="decreaseItemIndentationButton" href="#" title="Decrease selected item indentation" onClick={decreaseItemIndentation}><img src="Images/DecreaseIndentation.png" alt="Increase indentation" /></a></div>
                            <div className="ribbonCommand"><a id="increaseItemIndentationButton" href="#" title="Increase selected item indentation" onClick={increaseItemIndentation}><img src="Images/IncreaseIndentation.png" alt="Increase indentation" /></a></div>
                            <div className="ribbonCommand"><a id="deleteItemButton" href="#" title="Delete selected item" onClick={deleteItem}><img src="Images/Delete.png" alt="Delete selected item" /></a></div>
                            <div className="ribbonCommand"><a id="moveItemUpButton" href="#" title="Move selected item up" onClick={moveItemUp}><img src="Images/MoveUp.png" alt="Move up" /></a></div>
                            <div className="ribbonCommand"><a id="moveItemDownButton" href="#" title="Move selected item down" onClick={moveItemDown}><img src="Images/MoveDown.png" alt="Move down" /></a></div>
                        </div>
                    </div>
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Printing</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a id="printButton" href="#" title="Print" onClick={print}><img src="Images/Print.png" alt="Print" /></a></div>
                        </div>
                    </div>
                </div>
                <GanttChartView ref={this.ganttChartViewRef} items={items} settings={settings} change={onItemChanged} style={{ minHeight: '388px' }}>...</GanttChartView>
            </div>);
    }
}