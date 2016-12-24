import { VReport } from './../shared/sdk/models/VReport';
import { VReportApi } from './../shared/sdk/services/custom/VReport';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LabelService } from './../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../ui/forms/baseForm.component';
import { TemplateApi } from '../shared/sdk/services/index';
import { Template } from '../shared/sdk/models/index';
var moment = require('../../assets/js/moment.min.js');

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent extends BaseFormComponent implements OnInit {

  private templateItems;
  private templateSel = [];
  private selTplId;
  private repLines;

  constructor(
    private _labelService: LabelService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _tempApi: TemplateApi,
    private _repApi: VReportApi
  ) {
    super('report');
  }

  ngOnInit() {
    // this extremely ugly, but moment somehow does not change locale, it is connected with fullcalendar TODO fix this!
    moment.updateLocale('en', { weekdays: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"] });

    this.prepareLabels(this._labelService);
    this.getProvidedRouteParams(this._route);

  }

  back() {
    this._location.back();
  }

  selectData(param) {
    this._tempApi.find({ where: { active: true } })
      .subscribe(res => {
        this.templateItems = [];

        for (let one of res)
          this.templateItems.push({ id: (<Template>one).id, text: (<Template>one).name });
      });
  }

  selected(event) {
    this.selTplId = event.id;
    this.repLines = [];
    let start = moment().startOf('isoWeek');
    let end = start.clone().add(7, 'd');
    console.log(start, end);
    this._repApi.find({ where: { templateId: event.id, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } } })
      .subscribe(res => {
        for (let r of res){
          let e = <VReport>r;
          let st = moment(e.starttime);
          this.repLines.push({ e, day: st.format('dddd')});
        }
      }
      );
  }

  saveFilet(){
    
  }
}
