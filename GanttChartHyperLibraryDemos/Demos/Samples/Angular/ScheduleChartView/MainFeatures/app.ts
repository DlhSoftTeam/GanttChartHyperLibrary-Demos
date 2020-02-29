import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import ScheduleChartView = DlhSoft.Controls.ScheduleChartView;
import ScheduleChartItem = ScheduleChartView.Item;
import ScheduleChartSettings = ScheduleChartView.Settings;

declare var initializeGanttChartTheme, initializeGanttChartTemplates: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-ScheduleChartViewSampleApp';

  @ViewChild('scheduleChartView', { read: ElementRef, static: true }) scheduleChartViewRef: ElementRef;
  scheduleChartView: ScheduleChartView.Element; 

  items: ScheduleChartItem[];
  settings: ScheduleChartSettings;
  onItemChanged: (item: ScheduleChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  addNewItem: () => void;
  insertNewItem: () => void;
  deleteItem: () => void;
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
    var scheduleChartItems = <ScheduleChartItem[]>
          [{ content: 'Resource 1', ganttChartItems: [{ content: 'Task A (Resource 1)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0) }] },
           { content: 'Resource 2', ganttChartItems: [{ content: 'Task A (Resource 2)', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: '50%' },
                                                      { content: 'Task B (Resource 2)', start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 12, 16, 0, 0), completedFinish: new Date(year, month, 12, 16, 0, 0) },
                                                      { content: 'Task C (Resource 2)', start: new Date(year, month, 14, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] },
           { content: 'Resource 3', ganttChartItems: [{ content: 'Task D (Resource 3)', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0) }] }];

    for (var i = 4; i <= 16; i++)
      scheduleChartItems.push(<ScheduleChartItem>{
        content: 'Resource ' + i, ganttChartItems: [{ content: 'Task X (Resource ' + i + ')', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0) },
        { content: 'Task Y (Resource ' + i + ')', start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0) }]
      });

    this.items = scheduleChartItems;

    var settings = <ScheduleChartSettings>{
      // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
      currentTime: new Date(year, month, 2, 12, 0, 0)
    };

    this.settings = settings;

    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
        return;
      console.log(propertyName + ' changed for ' + item.content + '.');
    }

    this.addNewItem = () => {
      var item = <ScheduleChartItem>{ content: 'New resource', ganttChartItems: [] };
      this.scheduleChartView.addScheduleChartItem(item);
      this.scheduleChartView.selectItem(item);
      this.scheduleChartView.scrollToItem(item);
    }
    this.insertNewItem = () => {
      if (this.scheduleChartView.getSelectedItem() == null)
        return;
      var item = <ScheduleChartItem>{ content: 'New resource', ganttChartItems: [] };
      this.scheduleChartView.insertScheduleChartItem(this.scheduleChartView.getSelectedItem().scheduleChartIndex, item);
      this.scheduleChartView.selectItem(item);
      this.scheduleChartView.scrollToItem(item);
    }
    this.deleteItem = () => {
      if (this.scheduleChartView.getSelectedItem() == null)
        return;
      this.scheduleChartView.removeScheduleChartItem(this.scheduleChartView.getSelectedItem());
    }
    this.setCustomBarColorToItem = () => {
      if (this.scheduleChartView.scheduleChartItems.length <= 1)
        return;
      var scheduleChartItem = this.scheduleChartView.scheduleChartItems[1];
      if (scheduleChartItem.ganttChartItems.length <= 2)
        return;
      var item = scheduleChartItem.ganttChartItems[2];
      item.barStyle = 'stroke: Green; fill: LightGreen';
      item.completedBarStyle = 'stroke: Gray; fill: Gray';
      this.scheduleChartView.refreshChartItem(item);
      this.scheduleChartView.scrollToItem(scheduleChartItem);
    }
    this.moveItemUp = () => {
      if (this.scheduleChartView.getSelectedItem() == null)
        return;
      var item = this.scheduleChartView.getSelectedItem();
      this.scheduleChartView.moveScheduleChartItemUp(item);
      this.scheduleChartView.scrollToItem(item);
    }
    this.moveItemDown = () => {
      if (this.scheduleChartView.getSelectedItem() == null)
        return;
      var item = this.scheduleChartView.getSelectedItem();
      this.scheduleChartView.moveScheduleChartItemDown(item);
      this.scheduleChartView.scrollToItem(item);
    }
    this.setCustomScales = () => {
      this.settings.headerHeight = 21 * 3;
      this.settings.scales = [{ scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
          { scaleType: 'Months', headerTextFormat: 'Month', headerStyle: 'padding: 2.25px; border-right: solid 1px White; border-bottom: solid 1px White; color: gray', isSeparatorVisible: true, separatorStyle: 'stroke: #c8bfe7; stroke-width: 0.5px' },
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
      this.scheduleChartView.refresh();
    }
    this.zoomIn = () => {
      this.settings.hourWidth *= 2;
      this.scheduleChartView.refresh();
    }
    this.increaseTimelinePage = () => {
      this.scheduleChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    }
    this.decreaseTimelinePage = () => {
      this.scheduleChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    }
    this.print = () => {
      // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
      // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
      this.scheduleChartView.print({ title: 'Schedule Chart (printable)', isGridVisible: true, columnIndexes: [0], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
    }
  }

  ngOnInit() {
    this.scheduleChartView = <ScheduleChartView.Element>(<HTMLElement>this.scheduleChartViewRef.nativeElement).firstChild;

    // Optionally, initialize custom theme and templates (themes.js, templates.js).
    initializeGanttChartTheme(this.settings, this.theme);
    initializeGanttChartTemplates(this.settings, this.theme);
  }
}

