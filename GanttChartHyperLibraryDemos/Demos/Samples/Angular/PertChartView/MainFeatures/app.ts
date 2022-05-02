import { Component, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import PertChartView = DlhSoft.Controls.Pert.PertChartView;
import PertChartItem = PertChartView.Item;
import PertChartSettings = PertChartView.Settings;
import PredecessorItem = PertChartView.PredecessorItem;

declare var initializePertChartTheme: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-PertChartViewSampleApp';

  @ViewChild('pertChartView', { read: ElementRef, static: true }) pertChartViewRef: ElementRef;
  pertChartView: PertChartView.Element; 

  items: PertChartItem[];
  settings: PertChartSettings;
  onItemChanged: (item: PertChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  setCustomBarColorToItem: () => void;
  setCustomDependencyLineColorToPredecessorItem: () => void;
  highlightCriticalPath: () => void;
  print: () => void;

  // Query string syntax: ?theme
// Supported themes: Default, Generic-bright, Generic-blue, DlhSoft-gray, Purple-green, Steel-blue, Dark-black, Cyan-green, Blue-navy, Orange-brown, Teal-green, Purple-beige, Gray-blue, Aero.
  queryString = window.location.search;
  theme = this.queryString ? this.queryString.substr(1) : null;
  
  constructor() {
    var secondDuration = 1000, minuteDuration = 60 * secondDuration, hourDuration = 60 * minuteDuration;
    var items = <PertChartItem[]>[{ displayedText: '0', content: 'Start' },
                 { displayedText: '1', content: 'Task event 1' },
                 { displayedText: '2', content: 'Task event 2' },
                 { displayedText: '3', content: 'Task event 3' },
                 { displayedText: '4', content: 'Finish', displayedRowIndex: 0 }];
    items[1].predecessors = <PredecessorItem[]>[{ item: items[0], displayedText: 'A', content: 'Task A', effort: 4 * hourDuration }];
    items[2].predecessors = <PredecessorItem[]>[{ item: items[0], displayedText: 'B', content: 'Task B', effort: 2 * hourDuration }];
    items[3].predecessors = <PredecessorItem[]>[{ item: items[2], displayedText: 'C', content: 'Task C', effort: 1 * hourDuration }];
    items[4].predecessors = <PredecessorItem[]>[{ item: items[1], displayedText: 'D', content: 'Task D', effort: 5 * hourDuration },
                                                { item: items[2], displayedText: 'E', content: 'Task E', effort: 3 * hourDuration },
                                                { item: items[3], displayedText: 'F', content: 'Task F', effort: 2 * hourDuration }];

    this.items = items;

    var settings = <PertChartSettings>{ };

    this.settings = settings;

    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
        return;
      console.log(propertyName + ' changed for ' + item.content + '.');
    }

    this.setCustomBarColorToItem = () => {
      var item = this.pertChartView.items[2];
      item.shapeStyle = 'stroke: DarkMagenta; fill: LightYellow';
      this.pertChartView.refreshItem(item);
    }
    this.setCustomDependencyLineColorToPredecessorItem = () => {
      var item = this.pertChartView.items[2];
      var predecessorItem = this.pertChartView.items[2].predecessors[0];
      predecessorItem.dependencyLineStyle = 'stroke: DarkMagenta; fill: none; marker-end: url(#' + (this.theme != 'Default' ? 'Pert' : '') + 'ArrowMarker)';
      this.pertChartView.refreshPredecessorItems(item);
    }
    this.highlightCriticalPath = () => {
      var i, j;
      for (i = 0; i < this.pertChartView.items.length; i++) {
        var item = this.pertChartView.items[i];
        delete item.shapeStyle;
        if (item.predecessors) {
          for (j = 0; j < item.predecessors.length; j++)
            delete item.predecessors[j].dependencyLineStyle;
        }
      }
      var criticalDependencies = this.pertChartView.getCriticalDependencies();
      for (i = 0; i < criticalDependencies.length; i++) {
        var predecessorItem = criticalDependencies[i];
        predecessorItem.dependencyLineStyle = 'stroke: Red; fill: none: none; marker-end: url(#' + (this.theme != 'Default' ? 'Pert' : '') + 'ArrowMarker)';
        predecessorItem.item.shapeStyle = 'stroke: Red; fill: White';
        if (i >= criticalDependencies.length - 1)
          predecessorItem["dependentItem"].shapeStyle = 'stroke: Red; fill: White';
      }
      this.pertChartView.refreshItems();
    }
    this.print = () => {
      this.pertChartView.print({ title: 'PERT Chart (printable)', preparingMessage: '...' });
    }
  }

  ngOnInit() {
    this.pertChartView = <PertChartView.Element>(<HTMLElement>this.pertChartViewRef.nativeElement).firstChild;

    // Optionally, initialize custom themes (themes.js).
    initializePertChartTheme(this.settings, this.theme);
  }
}

