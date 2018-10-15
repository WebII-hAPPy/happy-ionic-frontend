import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IDataPoint } from '../../models/dataPoint';
import { IColor } from '../../models/color';
import { IChartData } from '../../models/chartData';


@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  public lineChartData: Array<IChartData> = [
    { data: [], label: 'sadness' },
    { data: [], label: 'anger' },
    { data: [], label: 'disgust' },
    { data: [], label: 'fear' },
    { data: [], label: 'contempt' },
    { data: [], label: 'neutral' },
    { data: [], label: 'suprise' },
    { data: [], label: 'happiness' },
  ];

  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time >'
        },
        ticks: {
          display: false
        }
      }]
    }
  };

  // TODO: Usefull?
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  /**
   * Adds a datapoint to the chart by mapping the values of the datapoint to each graph.
   * @param dataPoint An object containing all emotions as key value pairs.
   */
  public addDataPointToChart(dataPoint: IDataPoint): void {
    this.lineChartData.forEach(emotion => {
      for (let key in dataPoint.emotion) {
        if (key === emotion.label && dataPoint.hasOwnProperty(key)) {
          emotion.data.append(dataPoint[key])
        }
      }
    });
  }

  public lineChartColors: Array<IColor> = [
    { // blue - sadness
      backgroundColor: 'rgba(33,150,243,0.2)',
      borderColor: 'rgba(33,150,243,1)',
      pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'
    },
    { // red - anger
      backgroundColor: 'rgba(229,57,53,0.2)',
      borderColor: 'rgba(229,57,53,1)',
      pointBackgroundColor: 'rgba(229,57,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(229,57,53,1)'
    },
    { // green - disgust
      backgroundColor: 'rgba(76,175,80,0.2)',
      borderColor: 'rgba(76,175,80,1)',
      pointBackgroundColor: 'rgba(76,175,80,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76,175,80,0.8)'
    },
    { // black - fear
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderColor: 'rgba(0,0,0,1)',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,0,0.8)'
    },
    { // brown - contempt
      backgroundColor: 'rgba(121,85,72,0.2)',
      borderColor: 'rgba(121,85,72,1)',
      pointBackgroundColor: 'rgba(121,85,72,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(121,85,72,0.8)'
    },
    { // grey - neutral
      backgroundColor: 'rgba(158,158,158,0.2)',
      borderColor: 'rgba(158,158,158,1)',
      pointBackgroundColor: 'rgba(158,158,158,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(158,158,158,0.8)'
    },
    { // deep orange - suprise
      backgroundColor: 'rgba(255,87,34,0.2)',
      borderColor: 'rgba(255,87,34,1)',
      pointBackgroundColor: 'rgba(255,87,34,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,87,34,0.8)'
    },
    { // amber - happiness
      backgroundColor: 'rgba(255,193,7,0.2)',
      borderColor: 'rgba(255,193,7,1)',
      pointBackgroundColor: 'rgba(255,193,7, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,193,7,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';



}
