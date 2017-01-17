import { VPersonApi } from './../../shared/sdk/services/custom/VPerson';
import { VStatTchExtApi } from './../../shared/sdk/services/custom/VStatTchExt';
import { VFeventTApi } from './../../shared/sdk/services/custom/VFeventT';
import { LabelService } from './../../services/label.service';
import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../forms/baseForm.component';

var moment = require('./../../../assets/js/moment.min.js');

@Component({
  selector: 'app-teach-stat',
  templateUrl: './teach-stat.component.html'
})
export class TeachStatComponent extends BaseFormComponent implements OnInit {

  data;
  stat;
  stat2;
  stat2Cnt;
  stat2Off;
  stat2Ack;
  stat2Reg;

  teachers;
  selTeacher;

  paginatorPCount = 0;
  paginatorInitPage = 1;
  paginatorPageSize = 20;

  month;
  year;
  off = 0;

  constructor(
    private _labelService: LabelService,
    private _personApi: VPersonApi,
    private _eventApi: VFeventTApi,
    private _statApi: VStatTchExtApi
  ) {
    super('person', 'teacher stat');
  }

  ngOnInit() {

    // this is extremely ugly, but moment somehow does not change locale, it is connected with fullcalendar TODO fix this!
    moment.updateLocale('en', {
      weekdays: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
      months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"]
    });

    this.prepareLabels(this._labelService);

    this.findTeacher('', 1);

  }

  private findTeacher(value, page) {

    value = '%' + value + '%';

    this._personApi.find({
      where: {
        and: [
          { or: [{ isteacher: 1 }, { isvolunteer: 1 }, { isrenter: 1 }] },
          { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }
        ]
      },
      limit: this.paginatorPageSize, skip: this.paginatorPageSize * (page - 1), order: "lastname"
    })
      .subscribe(res => {
        this.teachers = res;
        this.fixListLength(this.paginatorPageSize, this.teachers);
        this._personApi.count({
          and: [
            { or: [{ isteacher: 1 }, { isvolunteer: 1 }, { isrenter: 1 }] },
            { or: [{ firstname: { like: value } }, { lastname: { like: value } }] }
          ]
        })
          .subscribe(res2 => this.paginatorPCount = res2.count);
      }
      , err => console.log(err));

  }

  selectTeacher(id) {
    this.selTeacher = id;
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

    this._eventApi.find({ where: { personId: this.selTeacher.id, starttime: { gt: new Date(start) }, endtime: { lt: new Date(end) } }, order: "starttime" })
      .subscribe(
      res => this.data = res,
      err => console.log(err));

    this._statApi.find({ where: { personId: this.selTeacher.id, year: year, month: month } })
      .subscribe(res => this.stat = res,
      err => console.log(err)
      );

    this._statApi.find({ where: { personId: this.selTeacher.id, year: year } })
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

        //ugly fix for chart refresh
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