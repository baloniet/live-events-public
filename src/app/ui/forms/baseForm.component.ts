import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { LabelService } from './../../services/label.service';
import { FormGroup } from '@angular/forms';
/**
 * abstract BaseFormComponent
 */
export abstract class BaseFormComponent {

    // form object name
    private _name: string;

    private title: string;

    private formLabels;
    private formTitles;
    private param;

    private _isDelete;

    form: FormGroup;
    private userProfile;
    private userAppData;

    constructor(name, postfix?: string) {

        this._name = name;
        this.formLabels = {};

        // set errorTracker location
        if (postfix)
            sessionStorage.setItem('guiErrorTracker', this._name + ' ' + postfix);
        else
            sessionStorage.setItem('guiErrorTracker', this._name + ' form');

        // user data
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        // user app data
        this.userAppData = JSON.parse(localStorage.getItem('app_le_user'));
    }

    getName(): string {
        return this._name;
    }

    setName(name: string) {
        this._name = name;
    }

    // get route param value
    getParam(key: string): string {
        return this.param[key];
    }

    // get user profile data value
    getUserProfileData(key: string): string {
        return this.userProfile[key];
    }

    // get user profile data value
    getUserProfileDataInt(key: string): number {
        return parseInt(this.userProfile[key]);
    }

    // get user app data value
    getUserAppData(key: string): string {
        return this.userAppData[key];
    }

    // get user app data value
    getUserAppDataInt(key: string): number {
        return parseInt(this.userAppData[key]);
    }

    setTitle(value) {
        this.title = value;
    }

    getFTitle(key: string): string {
        return this.formTitles[key];
    }

    setDelete(value: boolean) {
        this._isDelete = value;
    }

    isDelete(): boolean {
        return this._isDelete;
    }

    getFCValue(control: string): any {
        return this.form.controls[control].value;
    }

    setFCValue(control: string, value: any) {
        this.form.controls[control].setValue(value);
    }

    private prepareStrings(value) {
        this.formTitles = value.titles;
        this.formLabels = value.properties;
    }

    prepareLabels(service: LabelService) {
        service.getLabels('sl', this.getName())
            .subscribe(
            res => this.prepareStrings(res),
            err => {
                console.log("LabelService error: " + err);
            });
    }

    getProvidedRouteParams(route: ActivatedRoute) {

        route.params
            .subscribe(
            res => {
                this.param = res;
                if (this.param.action == 'b') {
                    this.setDelete(true);
                    this.form.disable();
                }
                this.selectData(this.param);
            });
    }

    //form value browser
    fromId(object: any, value: number): any {
        //console.log(value);
        for (let o of object) {
            if (o.id == value)
                return [{ id: o.id, text: o.text }];
        }
        return [];
    }

    //form value browser
    fromIdO(object: any, value: number): any {
        //console.log(value);
        for (let o of object) {
            if (o.id == value)
                return o;
        }
        return null;
    }

    // add empty values to to short list
    fixListLength(size, list) {
        for (let i = (size - list.length); i > 0; i--)
            <[any]>list.push('');
    }

    // select first element from array for select items
    selectFirst(items): any {
        return [items[0]];
    }



    protected selectData(param) { };

    // methods for datepicker
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }
}

