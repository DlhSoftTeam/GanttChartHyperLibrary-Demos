var loadChartView;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.loadChartViewRef = React.createRef();
    }
    componentDidMount() {
        loadChartView = this.loadChartViewRef.current;
    }
    render() {
        // Query string syntax: ?theme
        // Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
        var queryString = window.location.search;
        var theme = queryString ? queryString.substr(1) : null;

        var date = new Date(), year = date.getFullYear(), month = date.getMonth();
        var loadChartItems = [{
            content: 'Resource 1', ganttChartItems: [{ content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
            { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
            { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
            { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }]},
            { content: 'Resource 2', ganttChartItems: [{ content: 'Task 2 (Resource 2)', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) }] }];

        for (var i = 3; i <= 16; i++)
            loadChartItems.push({
                content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
                { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
            });

        var settings = {
            // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
            currentTime: new Date(year, month, 2, 12, 0, 0)
        };

        // Optionally, initialize custom themes (themes.js).
        initializeLoadChartTheme(settings, theme);

        function onItemChanged(item, propertyName, isDirect, isFinal) {
            if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
                return;
            console.log(propertyName + ' changed for ' + item.content + '.');
        }
        function moveItemUp() {
            if (loadChartView.selectedItem == null)
                return;
            var item = loadChartView.selectedItem;
            loadChartView.moveLoadChartItemUp(item);
            loadChartView.scrollToItem(item);
        }
        function moveItemDown() {
            if (loadChartView.selectedItem == null)
                return;
            var item = loadChartView.selectedItem;
            loadChartView.moveLoadChartItemDown(item);
            loadChartView.scrollToItem(item);
        }
        function increaseTimelinePage() {
            loadChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        }
        function decreaseTimelinePage() {
            loadChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
        }
        function setCustomScales() {
            settings.headerHeight = 21 * 3;
            settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
            { scaleType: 'Months', headerTextFormat: 'Month', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
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
            loadChartView.refresh();
        }
        function zoomIn() {
            loadChartView.setHourWidth(settings.hourWidth * 2);
        }
        function print() {
            // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
            // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
            loadChartView.print({ title: 'Load Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
        }
        return (
            <div>
                <div className="ribbonContainer">
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Items</div>
                        <div className="ribbonCommandsArea">
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
                <LoadChartView ref={this.loadChartViewRef} items={loadChartItems} settings={settings} change={onItemChanged} style={{ minHeight: '388px' }}>...</LoadChartView>
            </div>);
    }
}