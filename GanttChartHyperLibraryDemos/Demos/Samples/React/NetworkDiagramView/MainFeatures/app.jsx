var networkDiagramView;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.networkDiagramViewRef = React.createRef();
    }
    componentDidMount() {
        networkDiagramView = this.networkDiagramViewRef.current;
    }
    render() {
        // Query string syntax: ?theme
        // Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
        var queryString = window.location.search;
        var theme = queryString ? queryString.substr(1) : null;

        // Prepare data items.
        var date = new Date(), year = date.getFullYear(), month = date.getMonth(), secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
        var items = [{ content: 'Start milestone', displayedText: 'Start', isMilestone: true, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 8, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0) },
                     { content: 'First task', displayedText: 'Task 1', effort: 8 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 16, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 0 },
                     { content: 'Second task', displayedText: 'Task 2', effort: 4 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 12, 0, 0), lateStart: new Date(year, month, 2, 12, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 4 * hourDuration },
                     { content: 'Third task', displayedText: 'Task 3', effort: 16 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 4, 16, 0, 0), lateStart: new Date(year, month, 3, 8, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 0 },
                     { content: 'Fourth task', displayedText: 'Task 4', effort: 4 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 3, 12, 0, 0), lateStart: new Date(year, month, 4, 12, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 12 * hourDuration },
                     { content: 'Fifth task (middle milestone)', displayedText: 'Task 5', isMilestone: true, effort: 12 * hourDuration, earlyStart: new Date(year, month, 5, 8, 0, 0), earlyFinish: new Date(year, month, 6, 12, 0, 0), lateStart: new Date(year, month, 5, 8, 0, 0), lateFinish: new Date(year, month, 6, 12, 0, 0), slack: 0 },
                     { content: 'Sixth task', displayedText: 'Task 6', effort: 48 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 6, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 0 },
                     { content: 'Seventh task', displayedText: 'Task 7', effort: 20 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 8, 16, 0, 0), lateStart: new Date(year, month, 10, 8, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 28 * hourDuration },
                     { content: 'Finish milestone', displayedText: 'Finish', isMilestone: true, earlyStart: new Date(year, month, 12, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 12, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0) }];
        items[1].predecessors = [{ item: items[0] }];
        items[2].predecessors = [{ item: items[0] }];
        items[3].predecessors = [{ item: items[1] }, { item: items[2] }];
        items[4].predecessors = [{ item: items[1] }];
        items[5].predecessors = [{ item: items[3] }, { item: items[4] }];
        items[6].predecessors = [{ item: items[5] }];
        items[7].predecessors = [{ item: items[5] }];
        items[8].predecessors = [{ item: items[6] }, { item: items[7] }];

        var settings = {  };

        // Optionally, initialize custom themes (themes.js).
        initializePertChartTheme(settings, theme);

        function setCustomBarColorToItem() {
            var item = networkDiagramView.items[2];
            item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
            networkDiagramView.refreshItem(item);
        }
        function highlightCriticalPath() {
            var i;
            for (i = 0; i < networkDiagramView.items.length; i++)
                delete networkDiagramView.items[i].shapeStyle;
            var criticalItems = networkDiagramView.getCriticalItems();
            for (i = 0; i < criticalItems.length; i++) {
                var item = criticalItems[i];
                item.shapeStyle = 'stroke: Red; fill: White';
            }
            networkDiagramView.refreshChartItems();
        }
        function print() {
            networkDiagramView.print({ title: 'Network Diagram (printable)', preparingMessage: '...' });
        }
        return (
            <div>
                <div className="ribbonContainer">
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Items</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={setCustomBarColorToItem} title="Set custom bar color to Task event 2"><img src="Images/SetColor.png" alt="Set color" /></a></div>
                        </div>
                    </div>
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Project tools</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={highlightCriticalPath} title="Highlight critical path"><img src="Images/CriticalPath.png" alt="Critical path" /></a></div>
                        </div>
                    </div>
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Printing</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={print} title="Print"><img src="Images/Print.png" alt="Print" /></a></div>
                        </div>
                    </div>
                </div>
                <NetworkDiagramView ref={this.networkDiagramViewRef} items={items} settings={settings} style={{ minHeight: '388px' }}>...</NetworkDiagramView>
            </div>);
    }
}