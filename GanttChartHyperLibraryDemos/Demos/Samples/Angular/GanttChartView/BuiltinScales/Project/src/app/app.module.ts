import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { GanttChartView } from './DlhSoft/DlhSoft.ProjectData.GanttChart.Angular.Components';
import { ScheduleChartView } from './DlhSoft/DlhSoft.ProjectData.GanttChart.Angular.Components';
import { LoadChartView } from './DlhSoft/DlhSoft.ProjectData.GanttChart.Angular.Components';
import { PertChartView } from './DlhSoft/DlhSoft.ProjectData.PertChart.Angular.Components';
import { NetworkDiagramView } from './DlhSoft/DlhSoft.ProjectData.PertChart.Angular.Components';

@NgModule({
  declarations: [
    AppComponent,
    GanttChartView, ScheduleChartView, LoadChartView,
    PertChartView, NetworkDiagramView
  ],
  imports: [
    BrowserModule, FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
