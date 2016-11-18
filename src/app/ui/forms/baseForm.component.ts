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

    constructor(name) {
        this._name = name;
        this.formLabels = {};
    }

    getName(): string {
        return this._name;
    }

    setName(name: string) {
        this._name = name;
    }

    setTitle(value) {
        this.title = value;
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

    protected selectData(param){};
}

