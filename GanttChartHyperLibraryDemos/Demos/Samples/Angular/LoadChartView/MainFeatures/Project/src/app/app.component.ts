import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import LoadChartView = DlhSoft.Controls.LoadChartView;
import LoadChartItem = LoadChartView.Item;
import LoadChartSettings = LoadChartView.Settings;

declare var initializeLoadChartTheme: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-LoadChartViewSampleApp';

  @ViewChild('loadChartView', { read: ElementRef, static: true }) loadChartViewRef: ElementRef;
  loadChartView: LoadChartView.Element; 

  items: LoadChartItem[];
  settings: LoadChartSettings;
  onItemChanged: (item: LoadChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  setCustomBarColorToItem: () => void;
  moveItemUp: () => void;
  moveItemDown: () => void;
  setCustomScales: () => void;
  zoomIn: () => void;
  decreaseTimelinePage: () => void;
  increaseTimelinePage: () => void;
  print: () => void;

  // Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  queryString = window.location.search;
  theme = this.queryString ? this.queryString.substr(1) : null;
  
  constructor() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
    var loadChartItems = <LoadChartItem[]>[{
          content: 'Resource 1', ganttChartItems: [{ content: 'Task 1 (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 2, 16, 0, 0) },
            { content: 'Task 1, Task 2 [50%] (Resource 1): 150%', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 3, 12, 0, 0), units: 1.5 },
            { content: 'Task 2 [50%] (Resource 1)', start: new Date(year, month, 3, 12, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), units: 0.5 },
            { content: 'Task 3 (Resource 1)', start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 6, 16, 0, 0) }] },
          { content: 'Resource 2', ganttChartItems: [{ content: 'Task 2 (Resource 2)', start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) }] }];
    for (var i = 3; i <= 16; i++)
      loadChartItems.push(<LoadChartItem>{
        content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
          { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }] });

    this.items = loadChartItems;

    var settings = <LoadChartSettings>{
      // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
      currentTime: new Date(year, month, 2, 12, 0, 0)
    };

    this.settings = settings;

    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
        return;
      console.log(propertyName + ' changed for ' + item.content + '.');
    }

    this.setCustomBarColorToItem = () => {
      if (this.loadChartView.loadChartItems.length <= 1)
        return;
      var LoadChartItem = this.loadChartView.loadChartItems[1];
      if (LoadChartItem.ganttChartItems.length <= 2)
        return;
      var item = LoadChartItem.ganttChartItems[2];
      item.barStyle = 'stroke: Green; fill: LightGreen';
      item.completedBarStyle = 'stroke: Gray; fill: Gray';
      this.loadChartView.refreshChartItem(item);
      this.loadChartView.scrollToItem(LoadChartItem);
    }
    this.moveItemUp = () => {
      if (this.loadChartView.getSelectedItem() == null)
        return;
      var item = this.loadChartView.getSelectedItem();
      this.loadChartView.moveLoadChartItemUp(item);
      this.loadChartView.scrollToItem(item);
    }
    this.moveItemDown = () => {
      if (this.loadChartView.getSelectedItem() == null)
        return;
      var item = this.loadChartView.getSelectedItem();
      this.loadChartView.moveLoadChartItemDown(item);
      this.loadChartView.scrollToItem(item);
    }
    this.setCustomScales = () => {
      this.settings.headerHeight = 21 * 3;
      this.settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
        { scaleType: 'Months', headerTextFormat: 'Month', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray; white-space: nowrap; overflow: hidden; text-overflow: ellipsis', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
        { scaleType: 'Weeks', headerTextFormat: 'Date', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
        { scaleType: 'Days', headerTextFormat: 'Day', headerStyle: 'padding: 2.25px; border-right: solid 1px White; color: gray' },
        { scaleType: 'CurrentTime', isHeaderVisible: false, isSeparatorVisible: true, separatorStyle: 'stroke: #e31d3b; stroke-width: 0.5px' }];
      this.settings.updateScale = 60 * 60 * 1000; // 1 hour
      this.settings.hourWidth = 5;
      this.settings.visibleWeekStart = 1; // Monday
      this.settings.visibleWeekFinish = 5; // Friday
      this.settings.workingWeekStart = 1; // Monday
      this.settings.workingWeekFinish = 4; // Thursday
      this.settings.visibleDayStart = 10 * 60 * 60 * 1000; // 10 AM
      this.settings.visibleDayFinish = 20 * 60 * 60 * 1000; // 8 PM
      this.settings.specialNonworkingDays = [new Date(year, month, 24), new Date(year, month, 25)];
      this.loadChartView.refresh();
    }
    this.zoomIn = () => {
      this.settings.hourWidth *= 2;
      this.loadChartView.refresh();
    }
    this.increaseTimelinePage = () => {
      this.loadChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    }
    this.decreaseTimelinePage = () => {
      this.loadChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    }
    this.print = () => {
      // Print the resource list column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
      this.loadChartView.print({ title: 'Load Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
    }
  }

  ngOnInit() {
    this.loadChartView = <LoadChartView.Element>(<HTMLElement>this.loadChartViewRef.nativeElement).firstChild;

    // Optionally, initialize custom themes (themes.js).
    initializeLoadChartTheme(this.settings, this.theme);
  }
}

