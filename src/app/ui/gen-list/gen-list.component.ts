import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LabelService } from '../../services/label.service';

// poskus uporabe loopback sdk 
import { LoopBackConfig } from '../../shared/sdk/index';
import { Post, AccessToken } from '../../shared/sdk/models/index';
import { PostApi, CommuneApi, EducationApi, StatementApi, CitizenshipApi, PersonApi } from '../../shared/sdk/services/index';
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
	) {
		LoopBackConfig.setBaseURL(BASE_API_URL);
		LoopBackConfig.setApiVersion(API_VERSION);

	}

	ngOnInit() {

		this.route.params
			.subscribe(
			res =>
				(
					this.data = [],
					this.id = res,
					this.selectData(this.id),
					this._labelService.getLabels('sl', this.id.id)
						.subscribe(
						res => this.prepareStrings(res),
						err => {
							console.log("LabelService error: " + err);
						})
				)
			);
	}

	selectData(id) {

		if (id.id == "post")
			this._postApi.find({order:"name"}).subscribe(res => this.data = res);

		if (id.id == "commune")
			this._communeApi.find({order:"name"}).subscribe(res => this.data = res);

		if (id.id == "education")
			this._educationApi.find().subscribe(res => this.data = res);

		if (id.id == "statement")
			this._statementApi.find({order:"name"}).subscribe(res => this.data = res);

		if (id.id == "citizenship")
			this._citizenshipApi.find({order:"name"}).subscribe(res => this.data = res);

		if (id.id == "person")
			this._personApi.find({order:["lastname","firstname"]}).subscribe(res => this.data = res);

	}

	newRecord(link) {
		this.router.navigate([link]);
	}

	prepareStrings(labels) {
		this.labels = labels;
	}

}