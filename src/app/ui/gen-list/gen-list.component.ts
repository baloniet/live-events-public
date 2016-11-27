import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../services/label.service';

// poskus uporabe loopback sdk 
import { LoopBackConfig } from '../../shared/sdk/index';
import { Post, AccessToken } from '../../shared/sdk/models/index';
import {
	PostApi, CommuneApi, EducationApi, StatementApi,
	CitizenshipApi, PersonApi, VActivityApi, ThemeApi, ErrorsApi, RoomApi
} from '../../shared/sdk/services/index';
import { EventApi } from '../../shared/sdk/services/custom/Event';
import { Http } from '@angular/http';
import { BASE_API_URL, API_VERSION } from '../../shared/base.url';

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
		private route: ActivatedRoute,
		private router: Router,
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
		LoopBackConfig.setBaseURL(BASE_API_URL);
		LoopBackConfig.setApiVersion(API_VERSION);

	}

	ngOnInit() {

		this.route.params
			.subscribe(
			res =>
				(
console.log(res),
					this.data = [],
					
					this.id = res,
					this._id = this.id.type?this.id.type:this.id.id,
					console.log(this._id),
					this.paginatorInitPage = 1,
					this.selectData(this._id, 1),
					this._labelService.getLabels('sl', this._id)
						.subscribe(
						res => this.prepareStrings(res),
						err => {
							console.log("LabelService error: " + err);
						})
				)
			);
	}

	selectData(id: string, page: number) {

		// set errorTracker location
		sessionStorage.setItem('guiErrorTracker', id + ' genlist')

		if (id == "post")
			this._postApi.find({ order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._postApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "commune")
			this._communeApi.find({ order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._communeApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "education")
			this._educationApi.find({ limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._educationApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "statement")
			this._statementApi.find({ order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._statementApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "citizenship")
			this._citizenshipApi.find({ order: "name", limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._citizenshipApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "person")
			this._personApi.find({ order: ["lastname", "firstname"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._personApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "theme")
			this._themeApi.find({ order: ["name"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._themeApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "activity")
			this._actVApi.find({ order: ["name"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._actVApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "error")
			this._errApi.find({ order: ["cDate desc"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._errApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "room")
			this._roomApi.find({ order: ["name"], limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
				.subscribe(res => {
					this.data = res;
					this._roomApi.count().subscribe(res => this.paginatorCount = res.count);
				});

		if (id == "event")
			if (this.id.id)
				this._eventApi.find({ order: ["name"], where: { "activityId": this.id.id }, limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1) })
					.subscribe(res => {
						this.data = res;
						this._eventApi.count().subscribe(res => this.paginatorCount = res.count);
					});

	}

	navigate(link) {
		this.router.navigate([link]);
	}

	prepareStrings(labels) {
		this.labels = labels;
	}

	pageChange(page) {
		this.selectData(this._id, page);
	}

}