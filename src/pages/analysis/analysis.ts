import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Person } from '../../providers/person/person';
import { IPerson } from '../../models/person';

import { Chart } from 'chart.js';
import { IEmotion } from '../../models/emotion';

@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  person: IPerson;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private personService: Person) { }


  /**
   * Get fresh data from the person service and build the charts.
   */
  ionViewWillEnter(): void {
    this.person = this.personService.getPerson();
    this.buildDoughnutChart();
  }


  private buildDoughnutChart(): void {
    let emotionData: number[] = [];

    emotionData.push(this.person.emotion.sadness);
    emotionData.push(this.person.emotion.anger);
    emotionData.push(this.person.emotion.disgust);
    emotionData.push(this.person.emotion.fear);
    emotionData.push(this.person.emotion.contempt);
    emotionData.push(this.person.emotion.neutral);
    emotionData.push(this.person.emotion.surprise);
    emotionData.push(this.person.emotion.happiness);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ["Sadness", "Anger", "Disgust", "Fear", "Contempt", "Neutral", "Suprise", "Happiness"],
        datasets: [{
          data: emotionData,
          backgroundColor: [
            'rgba(33,150,243,0.2)',
            'rgba(229,57,53,0.2)',
            'rgba(76,175,80,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(121,85,72,0.2)',
            'rgba(158,158,158,0.2)',
            'rgba(255,87,34,0.2)',
            'rgba(255,193,7,0.2)'
          ],
          hoverBackgroundColor: [
            'rgba(33,150,243,0.2)',
            'rgba(229,57,53,0.2)',
            'rgba(76,175,80,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(121,85,72,0.2)',
            'rgba(158,158,158,0.2)',
            'rgba(255,87,34,0.2)',
            'rgba(255,193,7,0.2)'
          ]
        }]
      }
    });
  }
}
