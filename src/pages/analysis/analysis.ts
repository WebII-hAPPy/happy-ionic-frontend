import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Face } from '../../providers';
import { IFace } from '../../models/face';

import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faceService: Face) { }


  /**
   * Get fresh data from the person service and build the charts.
   */
  ionViewWillEnter(): void {
    const person = this.faceService.getPerson();
    this.buildDoughnutChart(person);
  }

  /**
   * Builds the Emotions-Doughnut Chart by filling the Chart Object with relevant data.
   * @param person The personal data to be analyzed.
   */
  private buildDoughnutChart(person: IFace): void {
    let emotionData: number[] = [];

    // Be carefull the sorting matters!
    emotionData.push(person.emotion.sadness);
    emotionData.push(person.emotion.anger);
    emotionData.push(person.emotion.disgust);
    emotionData.push(person.emotion.fear);
    emotionData.push(person.emotion.contempt);
    emotionData.push(person.emotion.neutral);
    emotionData.push(person.emotion.surprise);
    emotionData.push(person.emotion.happiness);

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
