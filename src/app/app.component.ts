import {Component, OnInit} from '@angular/core';
import '@vaadin/vaadin-charts/vaadin-chart.js';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private httpService: HttpClient) {
  }

  num = 78;
  max = 300;
  arrayTest = [50, 60, 65, 76, 85, 95];
  arrayTestCa = ['aaa', 'ccc', 'vvv', 'zzz', 'www', 'hhh'];
  dataVaadin;
  array = [];
  dataColumn = [];
  percents = [];
  columns = [];
  lines = [];
  points = [];
  values = [];
  dates = [];
  namePercent = [];
  titlePercent = [];
  valueStackColumnSlot1 = [];
  valueStackColumnSlot2 = [];
  valueStackColumnSlot3 = [];
  valueStackColumnSlot4 = [];
  valueStackColumnSlot5 = [];


  ngOnInit() {
    // this.vaadinService.getData()
    //   .subscribe(resVaadinData => this.dataVaadin = resVaadinData);

    this.httpService.get('./assets/database.json').subscribe(
      data => {
        this.dataVaadin = data;  // FILL THE ARRAY WITH DATA.
        this.columns = this.dataVaadin['content']['listBlock'][1]['data']['stackBarChartData']['columns'];
        this.points = this.dataVaadin['content']['listBlock'][1]['data']['lineChartData']['lines'][0]['points'];
        this.namePercent = this.dataVaadin['content']['listBlock'][1]['data']['stackBarChartData']['columnPieceStyles'];
        this.namePercent.forEach(arr => {
          this.titlePercent.push(arr['title']);
        });

        this.columns.forEach(arr => {
          this.dataColumn.push(arr['dataColumnPieces']);

        });
        this.dataColumn.forEach(arr => {
          this.percents.push([arr[0]['percent'], arr[1]['percent'], arr[2]['percent'], arr[3]['percent'], arr[4]['percent']]);
        });

        this.points.forEach(arr => {
          this.values.push(arr['value']);

        });
        this.points.forEach(arr => {
          this.dates.push(arr['date']);

        });
        this.percents.forEach(arr => {
          this.valueStackColumnSlot1.push(arr[0]);
          this.valueStackColumnSlot2.push(arr[1]);
          this.valueStackColumnSlot3.push(arr[2]);
          this.valueStackColumnSlot4.push(arr[3]);
          this.valueStackColumnSlot5.push(arr[4]);
        });


      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );


    console.log('point');
    console.log(this.points);

    console.log('percents');
    console.log(this.percents);

    console.log('title');
    console.log(this.titlePercent);

    console.log('S0');
    console.log(this.valueStackColumnSlot1);

    console.log('values');
    console.log(this.values);
  }

}
