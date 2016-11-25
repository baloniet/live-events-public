import { Errors } from './../../../shared/sdk/models/Errors';
import { ErrorsApi } from './../../../shared/sdk/services/custom/Errors';
import { BaseFormComponent } from '../baseForm.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../../services/label.service';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-error-form',
    templateUrl: './error-form.component.html',
    providers: [LabelService, ErrorsApi]
})
export class ErrorFormComponent extends BaseFormComponent implements OnInit {

    private data;

    constructor(
        private _labelService: LabelService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _api: ErrorsApi,
        private _fb: FormBuilder
    ) {
        super('error');
    }

    ngOnInit() {

        this.form = this._fb.group({
            id: [''],
            gui: [''],
            msg: [''],
            response: [''],
            companyId: [''],
            cdate: [],
            fdate: []
        });

        this.prepareLabels(this._labelService);
        this.getProvidedRouteParams(this._route);
    }

    back() {
        this._router.navigate(['/genlist/error']);
    }

    // send model to service and save to db, return to list
    save(model: Errors) {

        if (!this.form.pristine) {
            this._api.upsert(model)
                .subscribe(
                res => this.form.markAsPristine(),
                error => console.log(error),
                () => this.back()
                );
        }

    }

    // call service to find model in db
    selectData(param) {

        if (param.id)
            this._api.findById(param.id)
                .subscribe(res => {
                    this.data = res;
                    (<FormGroup>this.form)
                        .setValue(this.data, { onlySelf: true });
                });
    }

    // delete model with service from db, return to list
    delete(model: Errors) {

        this._api.deleteById(model.id)
            .subscribe(
            null,
            error => console.log(error),
            () => this.back()
            );

    }

    // custom methods
    // close error
    finish(model: Errors) {

        if (model.response) {
            model.fdate = new Date();
            this._api.upsert(model)
                .subscribe(
                res => this.form.markAsPristine(),
                error => console.log(error),
                () => this.back()
                );
        }

    }

}