import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IDataPoint } from '../../models/dataPoint';
import { IColor } from '../../models/color';
import { IChartData } from '../../models/chartData';
import { Api, User } from '../../providers';
import { Storage } from '@ionic/storage';
import { IUser } from '../../models/user';
import Chart from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: Api,
    private user: User,
    private storage: Storage) {
  }

  public chart;
  public scaleLabel = [];

  /**
   * Reset the data before the view loads.
   */
  ionViewWillEnter() {
    this.clearLineChartData();
    this.scaleLabel = [];
  }

  ionViewDidEnter() {
    this.storage.get('jwt_token').then((jwt_token) => {
      const user: IUser = this.user.getUser();
      this.api.get('api/statistics/' + user.id, null, { headers: { authorization: jwt_token } }).subscribe((resp: any) => {

        let i: number = 0;
        resp.data.forEach((data) => {
          i++;
          this.scaleLabel.push(i);
          this.addDataPointToChart(data);
        });
      }, (err) => {

      }, () => {
        this.options.data.datasets = this.lineChartData;
        this.options.data.labels = this.scaleLabel;
        const canvas: any = document.getElementById('chartCanvas');
        this.chart = new Chart(canvas.getContext('2d'), this.options);
      });
    });


  }

  /**
   * Adds a datapoint to the chart by mapping the values of the datapoint to each graph.
   * @param dataPoint An object containing all emotions as key value pairs.
   */
  private addDataPointToChart(dataPoint: IDataPoint): void {
    this.lineChartData.forEach(emotion => {
      for (let key in dataPoint.emotions) {
        if (key === emotion.label && dataPoint.emotions.hasOwnProperty(key)) {
          emotion.data.push(dataPoint.emotions[key])
        }
      }
    });
  }

  /**
   * Clears the line chart data.
   */
  private clearLineChartData(): void {
    this.lineChartData.forEach((emotion) => {
      emotion.data = [];
    });
  }


  private lineChartData: Array<any> = [
    {
      data: [],
      label: 'sadness',
      backgroundColor: 'rgba(33,150,243,0.2)',
      borderColor: 'rgba(33,150,243,1)',
      pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'
    },
    {
      data: [],
      label: 'anger',
      backgroundColor: 'rgba(229,57,53,0.2)',
      borderColor: 'rgba(229,57,53,1)',
      pointBackgroundColor: 'rgba(229,57,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(229,57,53,1)'
    },
    {
      data: [],
      label: 'disgust',
      backgroundColor: 'rgba(76,175,80,0.2)',
      borderColor: 'rgba(76,175,80,1)',
      pointBackgroundColor: 'rgba(76,175,80,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76,175,80,0.8)'
    },
    {
      data: [],
      label: 'fear',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderColor: 'rgba(0,0,0,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,0,0.8)'
    },
    {
      data: [],
      label: 'contempt',
      backgroundColor: 'rgba(121,85,72,0.2)',
      borderColor: 'rgba(121,85,72,1)',
      pointBackgroundColor: 'rgba(121,85,72,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(121,85,72,0.8)'
    },
    {
      data: [],
      label: 'neutral',
      backgroundColor: 'rgba(158,158,158,0.2)',
      borderColor: 'rgba(158,158,158,1)',
      pointBackgroundColor: 'rgba(158,158,158,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(158,158,158,0.8)'
    },
    {
      data: [],
      label: 'surprise',
      backgroundColor: 'rgba(255,87,34,0.2)',
      borderColor: 'rgba(255,87,34,1)',
      pointBackgroundColor: 'rgba(255,87,34,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,87,34,0.8)'
    },
    {
      data: [],
      label: 'happiness',
      backgroundColor: 'rgba(255,193,7,0.2)',
      borderColor: 'rgba(255,193,7,1)',
      pointBackgroundColor: 'rgba(255,193,7, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,193,7,0.8)'
    },
  ];
  private options = {
    type: 'line',
    data: {
      labels: [],
      datasets: null
    },
    options: {
      responsive: true,
      title: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            label: '->',
            display: false
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: false,
          }
        }]
      }
    }
  };
}
