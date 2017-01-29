import { Project } from './../../../shared/sdk/models/Project';
import { ProjectApi } from './../../../shared/sdk/services/custom/Project';
import { Location } from '@angular/common';
import { BaseFormComponent } from '../baseForm.component';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../../services/label.service';
import { StatementApi } from '../../../shared/sdk/services/index';
import { Statement } from '../../../shared/sdk/models/index';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-statement-form',
    templateUrl: './statement-form.component.html',
    providers: [LabelService, StatementApi]
})
export class StatementFormComponent extends BaseFormComponent implements OnInit {

    @ViewChild('dataContainer') dataContainer: ElementRef;

    private data;
    private projectItems;
    private projectSel = [];

    constructor(
        private _labelService: LabelService,
        private _location: Location,
        private _route: ActivatedRoute,
        private _api: StatementApi,
        private _projectApi: ProjectApi,
        private _fb: FormBuilder
    ) {
        super('statement');
    }

    ngOnInit() {

        this.form = this._fb.group({
            id: [''],
            name: [''],
            content: [''],
            projectId: [''],
            ismember: [''],
            year: ['']
        });

        this.prepareLabels(this._labelService);
        this.getProvidedRouteParams(this._route);
    }

    back() {
        this._location.back();
    }

    // send model to service and save to db, return to list
    save(model: Statement) {

        // 1. save model - activity project
        if (this.projectSel[0])
            model.projectId = this.projectSel[0].id;

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

        // get project values
        this._projectApi.find({ order: "name" }).subscribe(res => {
            this.projectItems = [];
            for (let one of res)
                this.projectItems.push({ id: (<Project>one).id, text: (<Project>one).name });
            this.projectSel = this.selectFirst(this.projectItems);
        });

        if (param.id)
            this._api.findById(param.id)
                .subscribe(res => {
                    this.data = res;
                    this.projectSel = this.data.projectId ? this.fromId(this.projectItems, this.data.projectId) : '';
                    this.loadData(this.data.content);
                    (<FormGroup>this.form)
                        .setValue(this.data, { onlySelf: true });
                });
    }

    // delete model with service from db, return to list
    delete(model: Statement) {

        this._api.deleteById(model.id)
            .subscribe(
            null,
            error => console.log(error),
            () => this.back()
            );

    }

    loadData(data) {
        this.dataContainer.nativeElement.innerHTML = data;
    }

    print() {
        window.print();
    }

    //method for select boxes
    public selected(value: any, type: string): void {

        if (type == "project")
            this.projectSel = [{ id: value.id, text: value.text }];

        this.form.markAsDirty();
    }

}