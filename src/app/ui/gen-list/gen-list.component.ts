import { environment } from './../../../environments/environment';
import { LoopBackFilter } from './../../shared/sdk/models/BaseModels';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../services/label.service';

// poskus uporabe loopback sdk 
import { LoopBackConfig } from '../../shared/sdk/index';
//import { Post, AccessToken } from '../../shared/sdk/models/index';
import {
	PostApi, CommuneApi, EducationApi, StatementApi,
	CitizenshipApi, PersonApi, VActivityApi, ThemeApi, ErrorsApi, RoomApi
} from '../../shared/sdk/services/index';
import { EventApi } from '../../shared/sdk/services/custom/Event';
import { Http } from '@angular/http';
import { API_VERSION } from '../../shared/base.url';

@Component({
	selector: 'genlist',
	templateUrl: './gen-list.component.html',
	providers: [LabelService]
})

export class GenListComponent implements OnInit {

	private id;

	private data = [];

	private tableLabels;

	private labels;

	_id: string;

	paginatorInitPage = 1;
	paginatorPageSize = 10;
	paginatorCount = 0;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _labelService: LabelService,
		private _postApi: PostApi,
		private _communeApi: CommuneApi,
		private _educationApi: EducationApi,
		private _statementApi: StatementApi,
		private _citizenshipApi: CitizenshipApi,
		private _personApi: PersonApi,
		private _themeApi: ThemeApi,
		private _actVApi: VActivityApi,
		private _errApi: ErrorsApi,
		private _roomApi: RoomApi,
		private _eventApi: EventApi
	) {
		LoopBackConfig.setBaseURL(environment.BASE_API_URL);
		LoopBackConfig.setApiVersion(API_VERSION);

	}

	ngOnInit() {

		this._route.params
			.subscribe(
			res =>
				(

					this.data = [],

					this.id = res,
					this._id = this.id.type ? this.id.type : this.id.id,
					this.paginatorInitPage = 1,

					this._labelService.getLabels('sl', this._id)
						.subscribe(res => {
							this.prepareStrings(res);
							this.selectData(this._id, 1, '')
						},
						err => {
							console.log("LabelService error: " + err);
						})


				)
			);
	}

	selectData(id: string, page: number, value: string) {

		// set errorTracker location
		sessionStorage.setItem('guiErrorTracker', id + ' genlist');

		let lbf: LoopBackFilter = this.prepareSearchCondition(this.labels.searchFields, value);

		if (id == "post")
			this._postApi.find({ where: lbf.where, order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._postApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "commune")
			this._communeApi.find({ where: lbf.where, order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._communeApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "education")
			this._educationApi.find({ where: lbf.where, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._educationApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "statement")
			this._statementApi.find({ where: lbf.where, order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._statementApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "citizenship")
			this._citizenshipApi.find({ where: lbf.where, order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._citizenshipApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "person")
			this._personApi.find({ where: lbf.where, order: ["lastname", "firstname"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._personApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "theme")
			this._themeApi.find({ where: lbf.where, order: ["name"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._themeApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "activity")
			this._actVApi.find({ where: lbf.where, order: ["name"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._actVApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "error")
			this._errApi.find({ where: lbf.where, order: ["cDate desc"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._errApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "room")
			this._roomApi.find({ where: lbf.where, order: ["name"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this.fixListLength(this.paginatorPageSize, res);
					this._roomApi.count(lbf.where).subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "event")
			if (this.id.id)
				this._eventApi.find({ order: ["starttime", "name"], where: { "activityId": this.id.id, "meventId": null }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
					.subscribe(res => {
						this.data = res;
						this.fixListLength(this.paginatorPageSize, res);
						this._eventApi.count({ "activityId": this.id.id, "meventId": "null" }).subscribe(res => this.paginatorCount = res.count);
					});

	}

	navigate(link) {
		this._router.navigate([link]);
	}

	prepareStrings(labels) {
		this.labels = labels;
	}

	pageChange(value, page) {
		this.selectData(this._id, page, value);
	}

	// add empty values to to short list
	fixListLength(size, list) {
		for (let i = (size - list.length); i > 0; i--)
			<[any]>list.push('');
	}

	// prepare search conditon based on provided value and settings from json
	prepareSearchCondition(fields: [string], value: string): LoopBackFilter {
		let lbf: LoopBackFilter = {};
		let orArray = [];
		value = '%' + value + '%';

		if (value)
			for (let i = 0; i < fields.length; i++) {
				orArray.push({ [fields[i]]: { like: value } });
			}
		lbf.where = { or: orArray };
	
		return lbf;
	}

}