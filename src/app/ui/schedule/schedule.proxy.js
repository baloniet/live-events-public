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
var eventModal_component_1 = require('./eventModal.component');
var core_1 = require('@angular/core');
var event_service_1 = require('../../shared/data/event.service');
var router_1 = require('@angular/router');
var ng_bootstrap_1 = require('@ng-bootstrap/ng-bootstrap');
var ScheduleProxy = (function () {
    function ScheduleProxy(_eventService, _cd, _route, _modalService) {
        this._eventService = _eventService;
        this._cd = _cd;
        this._route = _route;
        this._modalService = _modalService;
        this.dialogVisible = false;
        this.idGen = 100;
    }
    ScheduleProxy.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params
            .subscribe(function (res) {
            return (_this.defaultView = res['view'],
                console.log(res));
        });
        this.events = this._eventService.getEvents();
        this.header = {
            left: 'prev, next, today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay' //,agendaWeek,agendaDay,listYear,listMonth,listWeek,listDay'		
        };
    };
    ScheduleProxy.prototype.openModal = function (value) {
        var modalRef = this._modalService.open(eventModal_component_1.EventModalContent, { size: "lg" });
        modalRef.componentInstance.name = value;
    };
    ScheduleProxy.prototype.handleDayClick = function (event) {
        this.event = new MyEvent();
        this.event.start = event.date.format();
        this.dialogVisible = true;
        // TODO tu bi lahko bil if da se ne bi spodnje zgodilo če je že agendaDay
        event.view.calendar.gotoDate(event.date);
        //   event.view.calendar.changeView('agendaDay');
        //trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this._cd.detectChanges();
        this.openModal(this.event);
        console.log('day clicked' + JSON.stringify(this.event));
    };
    ScheduleProxy.prototype.handleEventClick = function (e) {
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;
        var start = e.calEvent.start;
        var end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }
        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }
        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
        console.log('event clicked' + JSON.stringify(this.event));
    };
    ScheduleProxy.prototype.saveEvent = function () {
        //update
        if (this.event.id) {
            var index = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        }
        else {
            this.event.id = this.idGen;
            this.events.push(this.event);
            this.event = null;
        }
        this.dialogVisible = false;
    };
    ScheduleProxy.prototype.deleteEvent = function () {
        var index = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    };
    ScheduleProxy.prototype.findEventIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.events.length; i++) {
            if (id == this.events[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScheduleProxy.prototype, "events", void 0);
    ScheduleProxy = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'schedule',
            templateUrl: 'schedule.html',
            providers: [event_service_1.EventService]
        }), 
        __metadata('design:paramtypes', [event_service_1.EventService, core_1.ChangeDetectorRef, router_1.ActivatedRoute, ng_bootstrap_1.NgbModal])
    ], ScheduleProxy);
    return ScheduleProxy;
}());
exports.ScheduleProxy = ScheduleProxy;
var MyEvent = (function () {
    function MyEvent() {
        this.allDay = true;
    }
    return MyEvent;
}());
exports.MyEvent = MyEvent;
//# sourceMappingURL=schedule.proxy.js.map