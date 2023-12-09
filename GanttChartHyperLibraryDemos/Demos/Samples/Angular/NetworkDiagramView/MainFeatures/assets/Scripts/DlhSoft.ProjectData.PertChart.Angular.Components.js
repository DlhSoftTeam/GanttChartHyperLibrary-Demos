"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkDiagramView = exports.PertChartView = void 0;
var core_1 = require("@angular/core");
var PertChartView = (function () {
    function PertChartView(elementRef) {
        this.style = "";
        this.items = [];
        this.settings = {};
        this.rootElement = elementRef.nativeElement;
    }
    PertChartView.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.rootElement.firstChild;
        element.setAttribute('style', this.style);
        var changeHandler = this.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.Pert.PertChartView.initialize(element, this.items, this.settings, this.license);
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
    ], PertChartView.prototype, "style", void 0);
    __decorate([
        (0, core_1.Input)()
    ], PertChartView.prototype, "items", void 0);
    __decorate([
        (0, core_1.Input)()
    ], PertChartView.prototype, "settings", void 0);
    __decorate([
        (0, core_1.Input)()
    ], PertChartView.prototype, "license", void 0);
    __decorate([
        (0, core_1.Input)()
    ], PertChartView.prototype, "change", void 0);
    PertChartView = __decorate([
        (0, core_1.Component)({
            selector: 'pertchartview',
            template: '<div><ng-content></ng-content></div>'
        })
    ], PertChartView);
    return PertChartView;
}());
exports.PertChartView = PertChartView;
var NetworkDiagramView = (function () {
    function NetworkDiagramView(elementRef) {
        this.style = "";
        this.items = [];
        this.settings = {};
        this.rootElement = elementRef.nativeElement;
    }
    NetworkDiagramView.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.rootElement.firstChild;
        element.setAttribute('style', this.style);
        var changeHandler = this.settings.itemPropertyChangeHandler;
        DlhSoft.Controls.Pert.NetworkDiagramView.initialize(element, this.items, this.settings, this.license);
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
    ], NetworkDiagramView.prototype, "style", void 0);
    __decorate([
        (0, core_1.Input)()
    ], NetworkDiagramView.prototype, "items", void 0);
    __decorate([
        (0, core_1.Input)()
    ], NetworkDiagramView.prototype, "settings", void 0);
    __decorate([
        (0, core_1.Input)()
    ], NetworkDiagramView.prototype, "license", void 0);
    __decorate([
        (0, core_1.Input)()
    ], NetworkDiagramView.prototype, "change", void 0);
    NetworkDiagramView = __decorate([
        (0, core_1.Component)({
            selector: 'networkdiagramview',
            template: '<div><ng-content></ng-content></div>'
        })
    ], NetworkDiagramView);
    return NetworkDiagramView;
}());
exports.NetworkDiagramView = NetworkDiagramView;
