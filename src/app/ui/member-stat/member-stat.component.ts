import { VEpersonApi } from './../../shared/sdk/services/custom/VEperson';
import { VFeventMApi } from './../../shared/sdk/services/custom/VFeventM';
import { EPerson } from './../../shared/sdk/models/EPerson';
import { EPersonApi, VStatPerExtApi } from './../../shared/sdk';
import { LabelService } from './../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../forms/baseForm.component';

let moment = require('./../../../assets/js/moment.min.js');

@Component({
  selector: 'app-member-stat',
  templateUrl: './member-stat.component.html'
})
export class MemberStatComponent extends BaseFormComponent implements OnInit {

  data;
  stat;
  stat2;
  stat2Cnt;
  stat2Off;
  stat2Ack;
  stat2Reg;

  members;
  selMember;

  paginatorPCount = 0;
  paginatorInitPage = 1;
  paginatorPageSize = 20;

  month;
  year;
  off = 0;

  constructor(
    private _labelService: LabelService,
    private _personApi: VEpersonApi,
    private _eventApi: VFeventMApi,
    private _epersApi: EPersonApi,
    private _statApi: VStatPerExtApi
  ) {
    super('person', 'member stat');
  }

  ngOnInit() {

    // this is extremely ugly, but moment somehow does not change locale, it is connected with fullcalendar TODO fix this!
    moment.updateLocale('en', {
      weekdays: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota'],
      months: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December']
    });

    this.prepareLabels(this._labelService);

    this.findMember('', 1);

  }

  private findMember(value, page) {

    value = '%' + value + '%';

    this._personApi.find({
      where: { or: [{ firstname: { like: value } }, { lastname: { like: value } }] },
      limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1), order: 'lastname'
    })
      .subscribe(res => {
        this.members = res;
        this.fixListLength(this.paginatorPageSize, this.members);
        this._personApi.count({ or: [{ firstname: { like: value } }, { lastname: { like: value } }] })
          .subscribe(res2 => this.paginatorPCount = res2.count);
      }
      , err => console.log(err));

  }

  selectMember(id) {
    this.selMember = id;
    this.selectData(null);
  }

  selectData(param) {
    let start;
    let end;
    let date;
    let year;
    let month;

    date = moment().startOf('month');
    start = date.clone().add(this.off, 'month').format();
    end = date.add(this.off + 1, 'month').format();
    this.month = moment(start).format('MMMM YYYY');
    year = moment(start).year();
    this.year = year;
    month = moment(start).month() + 1;

    this._eventApi.find(
      {
        where: { personId: this.selMember.personId, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } },
        order: 'starttime'
      })
      .subscribe(
      res => this.data = res,
      err => console.log(err));

    this._statApi.find({ where: { personId: this.selMember.personId, year: year, month: month } })
      .subscribe(res => this.stat = res,
      err => console.log(err)
      );

    this._statApi.find({ where: { personId: this.selMember.personId, year: year } })
      .subscribe(res => {
        this.stat2 = res;
        this.stat2Cnt = 0;
        this.stat2Off = 0;
        this.stat2Ack = 0;
        this.stat2Reg = 0;

        this.barChartData[0].data = [];
        this.barChartData[1].data = [];
        this.barChartData[2].data = [];

        for (let s of this.stat2) {
          if (s.off) {
            this.stat2Off += s.cnt;
            this.barChartData[2].data[s.month - 1] = s.cnt;
          }
          else if (s.ack) {
            this.stat2Ack += s.cnt;
            this.barChartData[1].data[s.month - 1] = s.cnt;
          }
          else {
            this.stat2Reg += s.cnt;
            this.barChartData[0].data[s.month - 1] = s.cnt;
          }
          this.stat2Cnt += s.cnt;
        }

        // ugly fix for chart refresh
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        this.barChartData = clone;

      },
      err => console.log(err)
      );

  }

  next() {
    this.off++;
    this.selectData(null);
  }

  previous() {
    this.off--;
    this.selectData(null);
  }

  // toggle acknowledge and offcheck for person and specified event
  private toggle(p, type: string) {
    if (type === 'off') {
      if (p.odate)
        p.odate = null;
      else p.odate = moment().format();
    } else if (type = 'ack') {
      if (p.adate)
        p.adate = null;
      else p.adate = moment().format();
    }

    let ep = new EPerson;
    ep.personId = p.personId;
    ep.eventId = p.id;
    ep.adate = p.adate;
    ep.odate = p.odate;
    ep.id = p.epersonId;
    this._epersApi.upsert(ep)
      .subscribe(null, err => console.log(err));
  }

  print() {
    window.print();
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        }
      }]
    }
  };

  // chart 
  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Registracije' },
    { data: [], label: 'Potrditve' },
    { data: [], label: 'Preklici' }
  ];

  public barChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark green
      backgroundColor: 'lightgreen',
      borderColor: 'green',
      pointBackgroundColor: 'lightgreen',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'green'
    },
    { // red
      backgroundColor: 'salmon',
      borderColor: 'darkred',
      pointBackgroundColor: 'salmon',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'darkred'
    }
  ];
}