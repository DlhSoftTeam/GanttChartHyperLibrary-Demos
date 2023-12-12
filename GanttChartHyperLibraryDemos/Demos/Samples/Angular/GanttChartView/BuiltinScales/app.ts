import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import GanttChartSettings = GanttChartView.Settings;
import PredecessorItem = GanttChartView.PredecessorItem;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-Scss-GanttChartViewSample';

  @ViewChild('ganttChartView', { read: ElementRef, static: true }) ganttChartViewRef: ElementRef;
  ganttChartView: GanttChartView.Element; 

  items: GanttChartItem[];
  settings: GanttChartSettings;
  license = '…'; // upon purchasing a product license from DlhSoft
  onItemChanged: (item: GanttChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  scaleType = "Weeks";
  onScaleChanged: () => void;

  constructor() {
    var date = new Date(), year = date.getFullYear(), month = date.getMonth();
    var items = <GanttChartItem[]>[{ content: 'Planning', label: 'Planning', isExpanded: false },
      { content: 'Analysis', indentation: 1, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 3, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
      { content: 'Requirements', indentation: 1, start: new Date(year, month, 3, 8, 0, 0), finish: new Date(year, month, 4, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria  [50%], Tyson Lamberson' },
      { content: 'Review', label: 'Review', indentation: 1, start: new Date(year, month, 2, 16, 0, 0), isMilestone: true, assignmentsContent: 'Clarissa Candelaria' },
      { content: 'Arhitecture', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 6, 12, 0, 0), assignmentsContent: 'Steven Rush [50%], Meeting room' },
      { content: 'Design', indentation: 1, start: new Date(year, month, 6, 10, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
      { content: 'Development', label: 'Development', isExpanded: true },
      { content: 'Start development', label: 'Start development', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), isMilestone: true, assignmentsContent: 'Steven Rush' },
      { content: 'Date-times', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Joanna Mcamis' },
      { content: 'Schedules', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 7, 12, 0, 0), completedFinish: new Date(year, month, 5, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Steven Rush [50%]' },
      { content: 'Automation testing functions', label: 'Very important!', indentation: 1, start: new Date(year, month, 4, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
      { content: 'Chart', label: 'Chart', indentation: 1 },
      { content: 'Bars', indentation: 2, start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 5, 16, 0, 0), completedFinish: new Date(year, month, 7, 16, 0, 0), assignmentsContent: 'Clarissa Candelaria [50%]' },
      { content: 'Summary bars', indentation: 2, start: new Date(year, month, 6, 8, 0, 0), finish: new Date(year, month, 9, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
      { content: 'Review', indentation: 2, start: new Date(year, month, 9, 16, 0, 0), isMilestone: true },
      { content: 'Links', indentation: 2, start: new Date(year, month, 7, 8, 0, 0), finish: new Date(year, month, 10, 16, 0, 0), assignmentsContent: 'Steven Rush [50%]' },
      { content: 'Diagram functions', indentation: 2, start: new Date(year, month, 5, 8, 0, 0), finish: new Date(year, month, 8, 12, 0, 0), assignmentsContent: 'Tyson Lamberson [50%]' },
      { content: 'Quality assurance', label: 'Very important!', start: new Date(year, month, 2, 8, 0, 0), finish: new Date(year, month, 17, 16, 0, 0), hasMilestoneAtFinish: true, assignmentsContent: 'Denis Kaelin, Printer' },
      { content: 'Project delivery', start: new Date(year, month, 10, 8, 0, 0), finish: new Date(year, month, 12, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria, Meeting room' },
      { content: 'Maintenance', start: new Date(year, month, 12, 12, 0, 0), finish: new Date(year, month, 18, 12, 0, 0) },
      { content: 'Marketing', label: 'Marketing', start: new Date(year, month, 10, 12, 0, 0), finish: new Date(year, month, 15, 12, 0, 0) },
      { content: 'Preparations', indentation: 1, start: new Date(year, month, 10, 8, 0, 0), isMilestone: true, assignmentsContent: 'Joanna Mcamis, Alicia Rock' },
      { content: 'Colors', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Joanna Mcamis [25%]' },
      { content: 'Logo', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 14, 12, 0, 0), assignmentsContent: 'Alicia Rock [25%]' },
      { content: 'Samples app', indentation: 1, start: new Date(year, month, 11, 8, 0, 0), finish: new Date(year, month, 16, 12, 0, 0), assignmentsContent: 'Clarissa Candelaria' },
      { content: 'Screenshots', indentation: 1, start: new Date(year, month, 12, 8, 0, 0), finish: new Date(year, month, 15, 16, 0, 0), assignmentsContent: 'Joanna Mcamis' },
      { content: 'Videos', indentation: 1, start: new Date(year, month, 15, 8, 0, 0), finish: new Date(year, month, 18, 16, 0, 0), assignmentsContent: 'Alicia Rock [50%]' }];

    items[6].predecessors = <PredecessorItem[]>[{ item: items[0], dependencyType: 'StartStart' }];
    items[4].predecessors = <PredecessorItem[]>[{ item: items[2], lag: 2 * 60 * 60 * 1000 }];
    items[8].predecessors = <PredecessorItem[]>[{ item: items[4] }, { item: items[5] }];
    items[9].assignmentsContent = 'Clarissa Candelaria';
    items[10].predecessors = <PredecessorItem[]>[{ item: items[9] }];
    this.items = items;

    this.settings = { 
      containerClass: 'container',
      standardItemClass: 'task',
      milestoneItemClass: 'milestone',
      summaryBarClass: 'summaryBar',
      standardBarClass: 'standardBar',
      standardCompletedBarClass: 'standardCompletedBar',
      milestoneBarClass: 'milestoneBar',
      dependencyLineClass: 'dependencyLine',
      assignmentsClass: 'assignments',
      arrowFill: '#f1c232',
      currentTime: new Date(year, month, 2, 12, 0, 0)
    };
    this.onItemChanged = (item, propertyName, isDirect, isFinal) => {
      console.log(propertyName + ' changed for ' + item.content + '.');
    }
    this.onScaleChanged = () => {
      this.settings.scales[1].scaleType = this.scaleType;
      switch (this.scaleType) {
        case 'Years':
          this.settings.scales[1].headerTextFormat = 'Year';
          this.settings.scales[2].scaleType = 'Months';
          this.settings.scales[2].headerTextFormat = 'Month';
          this.settings.hourWidth = 1;
          break;
        case 'Months':
          this.settings.scales[1].headerTextFormat = 'MonthYear';
          this.settings.scales[2].scaleType = 'Weeks';
          this.settings.scales[2].headerTextFormat = 'Date';
          this.settings.hourWidth = 2.5;
          break;
        case 'Weeks':
          this.settings.scales[1].headerTextFormat = 'Date';
          this.settings.scales[2].scaleType = 'Days';
          this.settings.scales[2].headerTextFormat = 'DayOfWeekAbbreviation';
          this.settings.hourWidth = 5;
          break;
        case 'Days':
          this.settings.scales[1].headerTextFormat = 'Date';
          this.settings.scales[2].scaleType = 'Hours';
          this.settings.scales[2].headerTextFormat = 'Hour';
          this.settings.hourWidth = 25;
          break;
        }
      this.ganttChartView.refresh();
    }
  }

  ngOnInit() {
    this.ganttChartView = <GanttChartView.Element>(<HTMLElement>this.ganttChartViewRef.nativeElement).firstChild;
  }
}
