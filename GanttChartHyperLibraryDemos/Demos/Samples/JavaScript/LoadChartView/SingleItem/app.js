// Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, Royal-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
var queryString = window.location.search;
var theme = queryString ? queryString.substr(1) : null;

// Retrieve and store the control element for reference purposes.
var loadChartView = document.querySelector('#loadChartView');

// Prepare a single data item with multiple allocations.
var date = new Date(), year = date.getFullYear(), month = date.getMonth();
var loadChartItems = [{ content: 'Resource 1', ganttChartItems: [{ content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
                                                                 { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
                                                                 { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
                                                                 { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }] }];

// Prepare control settings.
var settings = {
    // Optionally, hide data grid or set grid and chart widths, clear read only settings, and/or disable virtualization.
    // isGridVisible: false,
    // gridWidth: '20%',
    // chartWidth: '80%',
    // isReadOnly: false,
    // isVirtualizing: false,

    // Optionally, set the scrollable timeline to present.
    // timelineStart: new Date(year, month, 1),
    // timelineFinish: new Date(year + 2, month, 1),

    // Optionally, set application target, and theme and/or custom styles.
    // target: 'Phone', // Supported values: Standard, Phone.
    // theme: 'Aero', // Supported values: Modern, ModernBordered, Aero.
    // border: 'Gray',
    // normalAllocationBarStyle: 'stroke: Green; fill: Green',
    // underAllocationBarStyle: 'stroke: Yellow; fill: Yellow',

    // Optionally, set item template used when displaying task bar tool tips in the chart area.
    // itemTemplate: function (item) {
    //     var toolTip = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    //     var toolTipContent = item.content + '\n' + item.start.toLocaleString() + '-' + 'Finish: ' + item.finish.toLocaleString();
    //     toolTip.appendChild(document.createTextNode(toolTipContent));
    //     return toolTip;
    // },

    // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
    currentTime: new Date(year, month, 2, 12, 0, 0)
};

// Optionally, handle item property change notifications.
// settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
//     if (isDirect && isFinal && propertyName != 'isSelected')
//         alert(item.content + '.' + propertyName + ' has changed.');
// }

// Optionally, initialize custom themes (themes.js).
initializeLoadChartTheme(settings, theme);

// settings.isGridVisible = false;
settings.itemHeight = 312;
settings.barMargin = 8;
settings.barHeight = settings.itemHeight - settings.barMargin * 2;

// Initialize the component.
DlhSoft.Controls.LoadChartView.initialize(loadChartView, loadChartItems, settings);
