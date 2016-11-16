import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../../services/label.service';
import { PostApi } from '../../../shared/sdk/services/index';
import { Post } from '../../../shared/sdk/models/index';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({

    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    providers: [LabelService, PostApi]
})
export class PostFormComponent implements OnInit {

    private formTitles;
    private formLabels;
    private param;
    private data;
    private isDelete;

    public form: FormGroup;

    constructor(
        private _labelService: LabelService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _api: PostApi,
        private _fb: FormBuilder
    ) { }

    ngOnInit() {

        this.isDelete = false;

        this.form = this._fb.group({
            id: [''],
            name: [''],
            zipcode: ['']
        });

        this._labelService.getLabels('sl', 'post')
            .subscribe(
            res => this.prepareStrings(res),
            err => {
                console.log("LabelService error: " + err);
            });

        this._route.params
            .subscribe(
            res => {
                this.param = res;
                if (this.param.action == 'b'){ 
                    this.isDelete = true;
                    this.form.disable();
                }
                this.selectData(this.param);
            });

    }

    prepareStrings(labels) {
        this.formTitles = labels.titles;
        this.formLabels = labels.properties;
    }

    back() {
        this._router.navigate(['/genlist/post']);
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