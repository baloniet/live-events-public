import { BaseFormComponent } from '../baseForm.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../../services/label.service';
import { CommuneApi } from '../../../shared/sdk/services/index';
import { Commune } from '../../../shared/sdk/models/index';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'commune-form',
    templateUrl: './commune-form.component.html',
    providers: [LabelService, CommuneApi]
})
export class CommuneFormComponent extends BaseFormComponent implements OnInit {

    private data;

    constructor(
        private _labelService: LabelService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _api: CommuneApi,
        private _fb: FormBuilder
    ) {
        super('commune');
    }

    ngOnInit() {

        this.form = this._fb.group({
            id: [''],
            name: ['']
        });

        this.prepareLabels(this._labelService);
        this.getProvidedRouteParams(this._route);
    }

    back() {
        this._router.navigate(['/genlist/commune']);
    }

    // send model to service and save to db, return to list
    save(model: Commune) {

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
    delete(model: Commune) {

        this._api.deleteById(model.id)
            .subscribe(
            null,
            error => console.log(error),
            () => this.back()
            );

    }
}