import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BaseFormComponent } from '../baseForm.component';
import { LabelService } from '../../../services/label.service';
import { PostApi } from '../../../shared/sdk/services/index';
import { Post } from '../../../shared/sdk/models/index';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({

    selector: 'post-form',
    templateUrl: './post-form.component.html',
    providers: [LabelService, PostApi]
})
export class PostFormComponent extends BaseFormComponent implements OnInit {

    private data;

    constructor(
        private _labelService: LabelService,
        private _location: Location,
        private _route: ActivatedRoute,
        private _api: PostApi,
        private _fb: FormBuilder
    ) {
        super('post');
    }

    ngOnInit() {

        this.form = this._fb.group({
            id: [''],
            name: [''],
            zipcode: ['']
        });

        this.prepareLabels(this._labelService);
        this.getProvidedRouteParams(this._route);

    }

    back() {
        this._location.back();
    }

    // send model to service and save to db, return to list
    save(model: Post) {

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
    delete(model: Post) {

        this._api.deleteById(model.id)
            .subscribe(
            null,
            error => console.log(error),
            () => this.back()
            );

    }
}