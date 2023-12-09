"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadChartView = exports.ScheduleChartView = exports.GanttChartView = void 0;
var core_1 = require("@angular/core");
var GanttChartView = (function () {
    function GanttChartView(elementRef) {
        this.style = "";
        this.items = [];
        this.settings = {};
        this.rootElement = elementRef.nativeElement;
    }
    GanttChartView.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.rootElement.firstChild;
        element.setAttribute('style', this.style);
        var changeHandler = this.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.GanttChartView.initialize(element, this.items, this.settings, this.license);
        if (this.change) {
            this.settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
                if (changeHandler)
                    changeHandler(item, propertyName, isDirect, isFinal);
                _this.change(item, propertyName, isDirect, isFinal);
            };
        }
    };
    __decorate([
        (0, core_1.Input)()
    ], GanttChartView.prototype, "style", void 0);
    __decorate([
        (0, core_1.Input)()
    ], GanttChartView.prototype, "items", void 0);
    __decorate([
        (0, core_1.Input)()
    ], GanttChartView.prototype, "settings", void 0);
    __decorate([
        (0, core_1.Input)()
    ], GanttChartView.prototype, "license", void 0);
    __decorate([
        (0, core_1.Input)()
    ], GanttChartView.prototype, "change", void 0);
    GanttChartView = __decorate([
        (0, core_1.Component)({
            selector: 'ganttchartview',
            template: '<div><ng-content></ng-content></div>'
        })
    ], GanttChartView);
    return GanttChartView;
}());
exports.GanttChartView = GanttChartView;
var ScheduleChartView = (function () {
    function ScheduleChartView(elementRef) {
        this.style = "";
        this.items = [];
        this.settings = {};
        this.rootElement = elementRef.nativeElement;
    }
    ScheduleChartView.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.rootElement.firstChild;
        element.setAttribute('style', this.style);
        var changeHandler = this.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.ScheduleChartView.initialize(element, this.items, this.settings, this.license);
        if (this.change) {
            this.settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
                if (changeHandler)
                    changeHandler(item, propertyName, isDirect, isFinal);
                _this.change(item, propertyName, isDirect, isFinal);
            };
        }
    };
    __decorate([
        (0, core_1.Input)()
    ], ScheduleChartView.prototype, "style", void 0);
    __decorate([
        (0, core_1.Input)()
    ], ScheduleChartView.prototype, "items", void 0);
    __decorate([
        (0, core_1.Input)()
    ], ScheduleChartView.prototype, "settings", void 0);
    __decorate([
        (0, core_1.Input)()
    ], ScheduleChartView.prototype, "license", void 0);
    __decorate([
        (0, core_1.Input)()
    ], ScheduleChartView.prototype, "change", void 0);
    ScheduleChartView = __decorate([
        (0, core_1.Component)({
            selector: 'schedulechartview',
            template: '<div><ng-content></ng-content></div>'
        })
    ], ScheduleChartView);
    return ScheduleChartView;
}());
exports.ScheduleChartView = ScheduleChartView;
var LoadChartView = (function () {
    function LoadChartView(elementRef) {
        this.style = "";
        this.items = [];
        this.settings = {};
        this.rootElement = elementRef.nativeElement;
    }
    LoadChartView.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.rootElement.firstChild;
        element.setAttribute('style', this.style);
        var changeHandler = this.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.LoadChartView.initialize(element, this.items, this.settings, this.license);
        if (this.change) {
            this.settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
                if (changeHandler)
                    changeHandler(item, propertyName, isDirect, isFinal);
                _this.change(item, propertyName, isDirect, isFinal);
            };
        }
    };
    __decorate([
        (0, core_1.Input)()
    ], LoadChartView.prototype, "style", void 0);
    __decorate([
        (0, core_1.Input)()
    ], LoadChartView.prototype, "items", void 0);
    __decorate([
        (0, core_1.Input)()
    ], LoadChartView.prototype, "settings", void 0);
    __decorate([
        (0, core_1.Input)()
    ], LoadChartView.prototype, "license", void 0);
    __decorate([
        (0, core_1.Input)()
    ], LoadChartView.prototype, "change", void 0);
    LoadChartView = __decorate([
        (0, core_1.Component)({
            selector: 'loadchartview',
            template: '<div><ng-content></ng-content></div>'
        })
    ], LoadChartView);
    return LoadChartView;
}());
exports.LoadChartView = LoadChartView;
