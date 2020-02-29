import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import NetworkDiagramView = DlhSoft.Controls.Pert.NetworkDiagramView;
import NetworkDiagramItem = NetworkDiagramView.Item;
import NetworkDiagramSettings = NetworkDiagramView.Settings;
import PredecessorItem = NetworkDiagramView.PredecessorItem;

declare var initializePertChartTheme, initializePertChartTemplates: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-NetworkDiagramViewSampleApp';

  @ViewChild('networkDiagramView', { read: ElementRef, static: true }) networkDiagramViewRef: ElementRef;
  networkDiagramView: NetworkDiagramView.Element; 

  items: NetworkDiagramItem[];
  settings: NetworkDiagramSettings;
  onItemChanged: (item: NetworkDiagramItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  setCustomBarColorToItem: () => void;
  highlightCriticalPath: () => void;
  print: () => void;

  // Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  queryString = window.location.search;
  theme = this.queryString ? this.queryString.substr(1) : null;
  
  constructor() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth(), secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
    var items = <NetworkDiagramItem[]>[{ content: 'Start milestone', displayedText: 'Start', isMilestone: true, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 8, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0) },
      { content: 'First task', displayedText: 'Task 1', effort: 8 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 16, 0, 0), lateStart: new Date(year, month, 2, 8, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 0 },
      { content: 'Second task', displayedText: 'Task 2', effort: 4 * hourDuration, earlyStart: new Date(year, month, 2, 8, 0, 0), earlyFinish: new Date(year, month, 2, 12, 0, 0), lateStart: new Date(year, month, 2, 12, 0, 0), lateFinish: new Date(year, month, 2, 8, 0, 0), slack: 4 * hourDuration },
      { content: 'Third task', displayedText: 'Task 3', effort: 16 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 4, 16, 0, 0), lateStart: new Date(year, month, 3, 8, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 0 },
      { content: 'Fourth task', displayedText: 'Task 4', effort: 4 * hourDuration, earlyStart: new Date(year, month, 3, 8, 0, 0), earlyFinish: new Date(year, month, 3, 12, 0, 0), lateStart: new Date(year, month, 4, 12, 0, 0), lateFinish: new Date(year, month, 4, 16, 0, 0), slack: 12 * hourDuration },
      { content: 'Fifth task (middle milestone)', displayedText: 'Task 5', isMilestone: true, effort: 12 * hourDuration, earlyStart: new Date(year, month, 5, 8, 0, 0), earlyFinish: new Date(year, month, 6, 12, 0, 0), lateStart: new Date(year, month, 5, 8, 0, 0), lateFinish: new Date(year, month, 6, 12, 0, 0), slack: 0 },
      { content: 'Sixth task', displayedText: 'Task 6', effort: 48 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 6, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 0 },
      { content: 'Seventh task', displayedText: 'Task 7', effort: 20 * hourDuration, earlyStart: new Date(year, month, 6, 12, 0, 0), earlyFinish: new Date(year, month, 8, 16, 0, 0), lateStart: new Date(year, month, 10, 8, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0), slack: 28 * hourDuration },
      { content: 'Finish milestone', displayedText: 'Finish', isMilestone: true, earlyStart: new Date(year, month, 12, 12, 0, 0), earlyFinish: new Date(year, month, 12, 12, 0, 0), lateStart: new Date(year, month, 12, 12, 0, 0), lateFinish: new Date(year, month, 12, 12, 0, 0) }];
    items[1].predecessors = <PredecessorItem[]>[{ item: items[0] }];
    items[2].predecessors = <PredecessorItem[]>[{ item: items[0] }];
    items[3].predecessors = <PredecessorItem[]>[{ item: items[1] }, { item: items[2] }];
    items[4].predecessors = <PredecessorItem[]>[{ item: items[1] }];
    items[5].predecessors = <PredecessorItem[]>[{ item: items[3] }, { item: items[4] }];
    items[6].predecessors = <PredecessorItem[]>[{ item: items[5] }];
    items[7].predecessors = <PredecessorItem[]>[{ item: items[5] }];
    items[8].predecessors = <PredecessorItem[]>[{ item: items[6] }, { item: items[7] }];

    this.items = items;

    var settings = <NetworkDiagramSettings>{ };

    this.settings = settings;

    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
        return;
      console.log(propertyName + ' changed for ' + item.content + '.');
    }

    this.setCustomBarColorToItem = () => {
      var item = this.networkDiagramView.items[2];
      item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
      this.networkDiagramView.refreshItem(item);
    }
    this.highlightCriticalPath = () => {
      var i;
      for (i = 0; i < this.networkDiagramView.items.length; i++)
        delete this.networkDiagramView.items[i].shapeStyle;
      var criticalItems = this.networkDiagramView.getCriticalItems();
      for (i = 0; i < criticalItems.length; i++) {
        var item = criticalItems[i];
        item.shapeStyle = 'stroke: Red; fill: White';
      }
      this.networkDiagramView.refreshItems();
    }
    this.print = () => {
      this.networkDiagramView.print({ title: 'Network Diagram (printable)', preparingMessage: '...' });
    }
  }

  ngOnInit() {
    this.networkDiagramView = <NetworkDiagramView.Element>(<HTMLElement>this.networkDiagramViewRef.nativeElement).firstChild;

    // Optionally, initialize custom theme and templates (themes.js, templates.js).
    initializePertChartTheme(this.settings, this.theme);
    initializePertChartTemplates(this.settings, this.theme);
  }
}

