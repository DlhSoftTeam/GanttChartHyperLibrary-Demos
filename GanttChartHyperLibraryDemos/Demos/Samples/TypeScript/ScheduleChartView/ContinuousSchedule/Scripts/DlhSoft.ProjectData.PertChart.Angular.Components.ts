import { Component, OnInit, ElementRef, Input } from '@angular/core';
import PertChartItem = DlhSoft.Controls.Pert.PertChartView.Item;
import PertChartSettings = DlhSoft.Controls.Pert.PertChartView.Settings;
import NetworkDiagramItem = DlhSoft.Controls.Pert.NetworkDiagramView.Item;
import NetworkDiagramSettings = DlhSoft.Controls.Pert.NetworkDiagramView.Settings;

@Component({
  selector: 'pertchartview',
  template: '<div><ng-content></ng-content></div>'
})
export class PertChartView implements OnInit {
  rootElement: HTMLElement;
  @Input() style: string = "";
  @Input() items: PertChartItem[] = [];
  @Input() settings: PertChartSettings = {};
  @Input() license: string;
  @Input() change: (item: PertChartItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
  constructor(elementRef: ElementRef) { 
    this.rootElement = <HTMLElement>elementRef.nativeElement;
  }
  ngOnInit() {
    var element = <HTMLElement>this.rootElement.firstChild;
    element.setAttribute('style', this.style);
    var changeHandler = this.settings.itemPropertyChangeHandler;
    DlhSoft.Controls.Pert.PertChartView.initialize(element, this.items, this.settings, this.license);
    if (this.change) {
      this.settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
        if (changeHandler)
          changeHandler(item, propertyName, isDirect, isFinal);
        this.change(item, propertyName, isDirect, isFinal);
      }
    }
  }
}

@Component({
    selector: 'networkdiagramview',
    template: '<div><ng-content></ng-content></div>'
  })
  export class NetworkDiagramView implements OnInit {
    rootElement: HTMLElement;
    @Input() style: string = "";
    @Input() items: NetworkDiagramItem[] = [];
    @Input() settings: NetworkDiagramSettings = {};
    @Input() license: string;
    @Input() change: (item: NetworkDiagramItem, propertyName: string, isDirect: boolean, isFinal: boolean) => void;
    constructor(elementRef: ElementRef) { 
      this.rootElement = <HTMLElement>elementRef.nativeElement;
    }
    ngOnInit() {
      var element = <HTMLElement>this.rootElement.firstChild;
      element.setAttribute('style', this.style);
      var changeHandler = this.settings.itemPropertyChangeHandler;
      DlhSoft.Controls.Pert.NetworkDiagramView.initialize(element, this.items, this.settings, this.license);
      if (this.change) {
        this.settings.itemPropertyChangeHandler = (item, propertyName, isDirect, isFinal) => {
          if (changeHandler)
            changeHandler(item, propertyName, isDirect, isFinal);
          this.change(item, propertyName, isDirect, isFinal);
        }
      }
    }
  }
