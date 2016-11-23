"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var EventModalContent = (function () {
    function EventModalContent(_activeModal, _formBuilder) {
        this._activeModal = _activeModal;
        this._formBuilder = _formBuilder;
        this.form = this._formBuilder.group({});
    }
    EventModalContent.prototype.isWeekend = function (date) {
        var d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EventModalContent.prototype, "name", void 0);
    EventModalContent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'event-modal-content',
            templateUrl: 'eventModal.content.html',
            styles: ["\n    .custom-day {      \n      text-align: center;\n      padding: 0.185rem 0.25rem;\n      border-radius: 0.25rem;\n      display: inline-block;\n      width: 2rem;\n    }\n    .custom-day:hover {\n      background-color: #e6e6e6;\n    }\n    .weekend {\n      background-color: #f0ad4e;\n      border-radius: 1rem;\n      color: white;\n    }\n    .hidden {\n      display: none;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbActiveModal, forms_1.FormBuilder])
    ], EventModalContent);
    return EventModalContent;
}());
exports.EventModalContent = EventModalContent;
var EventModalComponent = (function () {
    function EventModalComponent(_modalService) {
        this._modalService = _modalService;
    }
    EventModalComponent.prototype.open = function () {
        var modalRef = this._modalService.open(EventModalContent);
        modalRef.componentInstance.name = 'live-events-event';
    };
    EventModalComponent = __decorate([
        core_1.Component({
            selector: 'event-modal-component',
            template: ''
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbModal])
    ], EventModalComponent);
    return EventModalComponent;
}());
exports.EventModalComponent = EventModalComponent;
//# sourceMappingURL=eventModal.component.js.map