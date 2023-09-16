var scheduleChartView;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.scheduleChartViewRef = React.createRef();
    }
    componentDidMount() {
        scheduleChartView = this.scheduleChartViewRef.current;
    }
    render() {
        // Query string syntax: ?theme
        // Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
        var queryString = window.location.search;
        var theme = queryString ? queryString.substr(1) : null;

        var date = new Date(), year = date.getFullYear(), month = date.getMonth();
        var scheduleChartItems = [{ content: 'Resource 1', ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
        {
            content: 'Resource 2', ganttChartItems: [{ content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
            { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
            { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }]
        },
        { content: 'Resource 3', ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];
        for (var i = 4; i <= 16; i++)
            scheduleChartItems.push({
                content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
                { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
            });

        var settings = {
            // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
            currentTime: new Date(year, month, 2, 12, 0, 0)
        };

        // Optionally, initialize custom themes (themes.js).
        initializeGanttChartTheme(settings, theme);

        function onItemChanged(item, propertyName, isDirect, isFinal) {
            if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
                return;
            console.log(propertyName + ' changed for ' + item.content + '.');
        }
        function addNewItem() {
            var item = { content: 'New resource', ganttChartItems: [] };
            scheduleChartView.addScheduleChartItem(item);
            scheduleChartView.selectItem(item);
            scheduleChartView.scrollToItem(item);
        }
        function insertNewItem() {
            if (scheduleChartView.selectedItem == null)
                return;
            var item = { content: 'New resource', ganttChartItems: [] };
            scheduleChartView.insertScheduleChartItem(scheduleChartView.selectedItem.scheduleChartIndex, item);
            scheduleChartView.selectItem(item);
            scheduleChartView.scrollToItem(item);
        }
        function deleteItem() {
            if (scheduleChartView.selectedItem == null)
                return;
            scheduleChartView.removeScheduleChartItem(scheduleChartView.selectedItem);
        }
        function setCustomBarColorToItem() {
            if (scheduleChartView.scheduleChartItems.length <= 1)
                return;
            var scheduleChartItem = scheduleChartView.scheduleChartItems[1];
            if (scheduleChartItem.ganttChartItems.length <= 2)
                return;
            var item = scheduleChartItem.ganttChartItems[2];
            item.barStyle = 'stroke: Green; fill: LightGreen';
            item.completedBarStyle = 'stroke: Gray; fill: Gray';
            scheduleChartView.refreshChartItem(item);
            scheduleChartView.scrollToItem(scheduleChartItem);
        }
        function moveItemUp() {
            if (scheduleChartView.selectedItem == null)
                return;
            var item = scheduleChartView.selectedItem;
            scheduleChartView.moveScheduleChartItemUp(item);
            scheduleChartView.scrollToItem(item);
        }
        function moveItemDown() {
            if (scheduleChartView.selectedItem == null)
                return;
            var item = scheduleChartView.selectedItem;
            scheduleChartView.moveScheduleChartItemDown(item);
            scheduleChartView.scrollToItem(item);
        }
        function increaseTimelinePage() {
            scheduleChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        }
        function decreaseTimelinePage() {
            scheduleChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        }
        function setCustomScales() {
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
            scheduleChartView.refresh();
        }
        function zoomIn() {
            scheduleChartView.setHourWidth(settings.hourWidth * 2);
        }
        function print() {
            // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
            scheduleChartView.print({ title: 'Schedule Chart (printable)', isGridVisible: true, columnIndexes: [1], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        }
        return (
            <div>
                <div className="ribbonContainer">
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Items</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={addNewItem} title="Add new item"><img src="Images/AddNew.png" alt="Add new" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={insertNewItem} title="Insert new item before selection"><img src="Images/InsertNew.png" alt="Insert new" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={deleteItem} title="Delete selected item"><img src="Images/Delete.png" alt="Delete selected item" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={setCustomBarColorToItem} title="Set custom bar color to selected item"><img src="Images/SetColor.png" alt="Set color" /></a></div>
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
                        <div className="ribbonHeader">Printing</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={print} title="Print"><img src="Images/Print.png" alt="Print" /></a></div>
                        </div>
                    </div>
                </div>
                <ScheduleChartView ref={this.scheduleChartViewRef} items={scheduleChartItems} settings={settings} change={onItemChanged} style={{ minHeight: '388px' }}>...</ScheduleChartView>
            </div>);
    }
}