var pertChartView;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.pertChartViewRef = React.createRef();
    }
    componentDidMount() {
        pertChartView = this.pertChartViewRef.current;
    }
    render() {
        // Query string syntax: ?theme
        // Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
        var queryString = window.location.search;
        var theme = queryString ? queryString.substr(1) : null;

        // Prepare data items.
        var secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
        var items = [{ displayedText: '0', content: 'Start' },
                     { displayedText: '1', content: 'Task event 1' },
                     { displayedText: '2', content: 'Task event 2' },
                     { displayedText: '3', content: 'Task event 3' },
                     { displayedText: '4', content: 'Finish', displayedRowIndex: 0 }];
        items[1].predecessors = [{ item: items[0], displayedText: 'A', content: 'Task A', effort: 4 * hourDuration }];
        items[2].predecessors = [{ item: items[0], displayedText: 'B', content: 'Task B', effort: 2 * hourDuration }];
        items[3].predecessors = [{ item: items[2], displayedText: 'C', content: 'Task C', effort: 1 * hourDuration }];
        items[4].predecessors = [{ item: items[1], displayedText: 'D', content: 'Task D', effort: 5 * hourDuration },
                                 { item: items[2], displayedText: 'E', content: 'Task E', effort: 3 * hourDuration },
                                 { item: items[3], displayedText: 'F', content: 'Task F', effort: 2 * hourDuration }];

        var settings = {  };

        // Optionally, initialize custom themes (themes.js).
        initializePertChartTheme(settings, theme);

        function setCustomBarColorToItem() {
            var item = pertChartView.items[2];
            item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
            pertChartView.refreshItem(item);
        }
        function setCustomDependencyLineColorToPredecessorItem() {
            var item = pertChartView.items[2];
            var predecessorItem = pertChartView.items[2].predecessors[0];
            predecessorItem.dependencyLineStyle = 'stroke: DarkMagenta; fill: none; marker-end: url(#ArrowMarker)';
            pertChartView.refreshPredecessorItems(item);
        }
        function highlightCriticalPath() {
            var i, j;
            for (i = 0; i < pertChartView.items.length; i++) {
                var item = pertChartView.items[i];
                delete item.shapeStyle;
                if (item.predecessors) {
                    for (j = 0; j < item.predecessors.length; j++)
                        delete item.predecessors[j].dependencyLineStyle;
                }
            }
            var criticalDependencies = pertChartView.getCriticalDependencies();
            for (i = 0; i < criticalDependencies.length; i++) {
                var predecessorItem = criticalDependencies[i];
                predecessorItem.dependencyLineStyle = 'stroke: Red; fill: none: none; marker-end: url(#ArrowMarker)';
                predecessorItem.item.shapeStyle = 'stroke: Red; fill: White';
                if (i >= criticalDependencies.length - 1) {
                    for (var p in predecessorItem)
                        predecessorItem.dependentItem.shapeStyle = 'stroke: Red; fill: White';
                }
            }

            pertChartView.refreshChartItems();
        }
        function print() {
            pertChartView.print({ title: 'PERT Chart (printable)', preparingMessage: '...' });
        }
        return (
            <div>
                <div className="ribbonContainer">
                    <div className="ribbonPanel">
                        <div className="ribbonHeader">Items</div>
                        <div className="ribbonCommandsArea">
                            <div className="ribbonCommand"><a href="#" onClick={setCustomBarColorToItem} title="Set custom bar color to Task event 2"><img src="Images/SetColor.png" alt="Set color" /></a></div>
                            <div className="ribbonCommand"><a href="#" onClick={setCustomDependencyLineColorToPredecessorItem} title="Set custom dependency line color to Task B"><img src="Images/SetDependencyColor.png" alt="Set custom dependency" /></a></div>
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
                <PertChartView ref={this.pertChartViewRef} items={items} settings={settings} style={{ minHeight: '388px' }}>...</PertChartView>
            </div>);
    }
}