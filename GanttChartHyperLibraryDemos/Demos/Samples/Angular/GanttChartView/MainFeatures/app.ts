import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import GanttChartSettings = GanttChartView.Settings;
import PredecessorItem = GanttChartView.PredecessorItem;

declare var initializeGanttChartTheme: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-GanttChartViewSampleApp';

  @ViewChild('ganttChartView', { read: ElementRef, static: true }) ganttChartViewRef: ElementRef;
  ganttChartView: GanttChartView.Element; 

  items: GanttChartItem[];
  settings: GanttChartSettings;
  onItemChanged: (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  addNewItem: () => void;
  insertNewItem: () => void;
  editItem: () => void;
  decreaseItemIndentation: () => void;
  increaseItemIndentation: () => void;
  deleteItem: () => void;
  setCustomBarColorToItem: () => void;
  copyItem: () => void;
  pasteItem: () => void;
  moveItemUp: () => void;
  moveItemDown: () => void;
  setCustomScales: () => void;
  zoomIn: () => void;
  decreaseTimelinePage: () => void;
  increaseTimelinePage: () => void;
  toggleBaseline: () => void;
  highlightCriticalPath: () => void;
  splitRemainingWork: () => void;
  toggleDependencyConstraints: () => void;
  levelResources: () => void;
  print: () => void;

  isBaselineVisible: boolean;
  isHighlightCriticalPathVisible: boolean;
  isDependencyConstraintsActive: boolean;

  // Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  queryString = window.location.search;
  theme = this.queryString ? this.queryString.substr(1) : null;
  
  constructor() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
    var items = <GanttChartItem[]>[
      { content: 'Task 1', isExpanded: false, start: date },
      { content: 'Task 1.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) },
      { content: 'Task 1.2', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 5, 12, 0, 0) },
      { content: 'Task 2', isExpanded: true, start: date },
      { content: 'Task 2.1', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 8, 16, 0, 0), completedFinish: new Date(year, month, 5, 16, 0, 0), assignmentsContent: 'Resource 1, Resource 2 [50%]' },
      { content: 'Task 2.2', indentation: 1, start: date},
      { content: 'Task 2.2.1', indentation: 2, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), completedFinish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
      { content: 'Task 2.2.2', indentation: 2, start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 14, 16, 0, 0), assignmentsContent: 'Resource 2' },
      { content: 'Task 3', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), isMilestone: true },
      { content: 'Task 4', indentation: 1, start: new Date(year, month, 15, 16, 0, 0), finish: new Date(year, month, 18, 16, 0, 0) },
      { content: 'Task 5', indentation: 1, start: new Date(year, month, 16, 16, 0, 0), finish: new Date(year, month, 17, 16, 0, 0) }];

    items[2].predecessors = <PredecessorItem[]>[{ item: items[1] }]; // Task 2 depends on Task 1.
    items[7].predecessors = <PredecessorItem[]>[{ item: items[6], dependencyType: 'StartStart' }]; // Task 6 depends on Task 5 using Start-Start dependency type.
    items[8].predecessors = <PredecessorItem[]>[{ item: items[0] }, { item: items[3] }]; // Milestone depends on Story A and Story B.

    this.items = items;

    var settings = <GanttChartSettings>{
      // Auto-scheduling is initially turned on.
      areTaskDependencyConstraintsEnabled: true,

      // Set the current time value to automatically scroll to a specific chart coordinate, and display a vertical bar highlighter at the specified point.
      currentTime: new Date(year, month, 2, 12, 0, 0)
    };

    // Optionally, set baseline properties.
    items[6].baselineStart = new Date(year, month, 10, 8, 0, 0);
    items[6].baselineFinish = new Date(year, month, 11, 16, 0, 0);
    items[7].baselineStart = new Date(year, month, 8, 8, 0, 0);
    items[7].baselineFinish = new Date(year, month, 11, 16, 0, 0);
    items[8].baselineStart = new Date(year, month, 12, 8, 0, 0);

    // Customize columns.
    var columns = GanttChartView.getDefaultColumns(items, settings);
    var indexOffset = columns[0].isSelection ? 1 : 0;
    columns.splice(0 + indexOffset, 0, { header: '', width: 40, cellTemplate: GanttChartView.getIndexColumnTemplate() });
    columns.splice(3 + indexOffset, 0, { header: 'Effort (h)', width: 80, cellTemplate: GanttChartView.getTotalEffortColumnTemplate(64) });
    columns.splice(4 + indexOffset, 0, { header: 'Duration (d)', width: 80, cellTemplate: GanttChartView.getDurationColumnTemplate(64, 8) });
    columns.splice(8 + indexOffset, 0, { header: '%', width: 80, cellTemplate: GanttChartView.getCompletionColumnTemplate(64) });
    columns.splice(9 + indexOffset, 0, { header: 'Predecessors', width: 100, cellTemplate: GanttChartView.getPredecessorsColumnTemplate(84) });
    columns.push({ header: 'Cost ($)', width: 100, cellTemplate: GanttChartView.getCostColumnTemplate(84) });
    columns.push({ header: 'Est. start', width: 140, cellTemplate: GanttChartView.getBaselineStartColumnTemplate(124, true, true, 8 * 60 * 60 * 1000) }); // 8 AM
    columns.push({ header: 'Est. finish', width: 140, cellTemplate: GanttChartView.getBaselineFinishColumnTemplate(124, true, true, 16 * 60 * 60 * 1000) }); // 4 PM
    settings.columns = columns;

    // Optionally, define assignable resources.
    settings.assignableResources = [
      'Resource 1', 'Resource 2', 'Resource 3',
      'Material 1', 'Material 2'];
    //settings.autoAppendAssignableResources = true;
    // Optionally, define the quantity values to consider when leveling resources, indicating maximum material amounts available for use at the same time.
    settings.resourceQuantities = [{ key: 'Material 1', value: 4 }, { key: 'Material 2', value: Infinity }];
    items[9].assignmentsContent = 'Material 1 [250%], Material 2';
    items[10].assignmentsContent = 'Material 1, Material 2 [200%]';
    // Optionally, define task and resource costs.
    settings.taskInitiationCost = 5;
    items[4].executionCost = 50;
    settings.defaultResourceUsageCost = 1;
    settings.specificResourceUsageCosts = [{ key: 'Resource 1', value: 2 }, { key: 'Material 1', value: 7}];
    settings.defaultResourceHourCost = 10;
    settings.specificResourceHourCosts = [{ key: 'Resource 1', value: 20 }, { key: 'Material 2', value: 0.5 }];

    this.settings = settings;
    this.settings.isBaselineVisible = true;
    this.isBaselineVisible = settings.isBaselineVisible;
    this.isHighlightCriticalPathVisible = false;
    this.isDependencyConstraintsActive = settings.areTaskDependencyConstraintsEnabled;

    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
        return;
      console.log(propertyName + ' changed for ' + item.content + '.');
    }

    this.addNewItem = () => {
      var item = <GanttChartItem>{ content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
      this.ganttChartView.addItem(item);
      this.ganttChartView.selectItem(item);
      this.ganttChartView.scrollToItem(item);
      this.ganttChartView.scrollToDateTime(new Date(year, month, 1));
    }
    this.insertNewItem = () => {
      if (this.ganttChartView.getSelectedItem() == null)
        return;
      var item = <GanttChartItem>{ content: 'New task', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0) };
      this.ganttChartView.insertItem(this.ganttChartView.getSelectedItem().index, item);
      this.ganttChartView.selectItem(item);
      this.ganttChartView.scrollToItem(item);
      this.ganttChartView.scrollToDateTime(new Date(year, month, 1));
    }
    this.increaseItemIndentation = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.increaseItemIndentation(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.decreaseItemIndentation = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.decreaseItemIndentation(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.deleteItem = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.removeItem(item);
    }
    this.setCustomBarColorToItem = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      item.barStyle = 'stroke: Green; fill: LightGreen';
      item.completedBarStyle = 'stroke: Gray; fill: Gray';
      this.ganttChartView.refreshChartItem(item);
    }
    var copiedItem;
    this.copyItem = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      copiedItem = item;
    }
    this.pasteItem = () => {
      var selectedItem = this.ganttChartView.getSelectedItem();
      if (copiedItem == null || selectedItem == null)
        return;
      var item = <GanttChartItem>{ content: copiedItem.content, start: copiedItem.start, finish: copiedItem.finish, completedFinish: copiedItem.completedFinish, isMilestone: copiedItem.isMilestone, assignmentsContent: copiedItem.assignmentsContent, isRelativeToTimezone: copiedItem.isRelativeToTimezone };
      this.ganttChartView.insertItem(selectedItem.index + 1, item);
      this.ganttChartView.selectItem(item);
      this.ganttChartView.scrollToItem(item);
      this.ganttChartView.scrollToDateTime(item.start);
    }
    this.moveItemUp = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.moveItemHierarchyUp(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.moveItemDown = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      this.ganttChartView.moveItemHierarchyDown(item);
      this.ganttChartView.scrollToItem(item);
    }
    this.setCustomScales = () => {
      settings.headerHeight = 21 * 3;
      settings.scales = [
        { scaleType: 'NonworkingTime', isHeaderVisible: false, isHighlightingVisible: true, highlightingStyle: 'stroke-width: 0; fill: #f8f8f8; fill-opacity: 0.65' },
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
      this.ganttChartView.refresh();
    }
    this.zoomIn = () => {
      this.ganttChartView.setHourWidth(settings.hourWidth * 2);
    }
    this.increaseTimelinePage = () => {
      this.ganttChartView.increaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    }
    this.decreaseTimelinePage = () => {
      this.ganttChartView.decreaseTimelinePage(4 * 7 * 24 * 60 * 60 * 1000); // 4 weeks
    }
    this.toggleBaseline = () => {
      settings.isBaselineVisible = !settings.isBaselineVisible;
      this.isBaselineVisible = settings.isBaselineVisible;
      this.ganttChartView.refresh();
    }
    this.highlightCriticalPath = () => {
      for (var i = 0; i < this.ganttChartView.items.length; i++) {
        var item = this.ganttChartView.items[i];
        delete item.barStyle;
        if (!item.hasChildren && this.ganttChartView.isItemCritical(item))
          item.barStyle = 'stroke: #e31d3b; fill: #e31d3b';
        this.ganttChartView.refreshChartItem(item);
        this.isHighlightCriticalPathVisible = true;
      }
    }
    this.splitRemainingWork = () => {
      var item = this.ganttChartView.getSelectedItem();
      if (item == null)
        return;
      var remainingWorkItem = this.ganttChartView.splitRemainingWork(item);
      if (remainingWorkItem == null)
        return;
    }
    this.toggleDependencyConstraints = () => {
      settings.areTaskDependencyConstraintsEnabled = !settings.areTaskDependencyConstraintsEnabled;
      this.isDependencyConstraintsActive = settings.areTaskDependencyConstraintsEnabled;
      this.ganttChartView.refresh();
    }
    this.levelResources = () => {
      // Level the assigned resources for all tasks, including the already started ones, considering the current time displayed in the chart.
      this.ganttChartView.levelResources(true, this.ganttChartView.settings.currentTime);
    // Alternatively, optimize work to obtain the minimum project finish date and time assuming unlimited resource availability:
    // ganttChartView.optimizeWork(false, true, ganttChartView.settings.currentTime);
    }
    this.print = () => {
      // Print the task hierarchy column and a selected timeline page of 5 weeks (timeline end week extensions would be added automatically, if necessary).
      // Optionally, to rotate the print output and simulate Landscape printing mode (when the end user keeps Portrait selection in the Print dialog), append the rotate parameter set to true to the method call: rotate: true.
      this.ganttChartView.print({ title: 'Gantt Chart (printable)', isGridVisible: true, columnIndexes: [1], timelineStart: new Date(year, month, 1), timelineFinish: new Date(new Date(year, month, 1).valueOf() + 5 * 7 * 24 * 60 * 60 * 1000), preparingMessage: '...' });
    }
  }

  ngOnInit() {
    this.ganttChartView = <GanttChartView.Element>(<HTMLElement>this.ganttChartViewRef.nativeElement).firstChild;

    // Optionally, initialize custom themes (themes.js).
    initializeGanttChartTheme(this.settings, this.theme);
  }
}
