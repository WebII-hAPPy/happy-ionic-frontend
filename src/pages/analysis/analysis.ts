import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Face, User } from '../../providers';
import { IFace } from '../../models/face';

import { Chart } from 'chart.js';
import { IUser } from '../../models/user';
import { IEmotion } from '../../models/emotion';

@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: Chart;
  user: IUser;
  face: IFace;
  glasses: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faceService: Face,
    private userService: User) { }


  /**
   * Get fresh data from the face service and build the charts.
   */
  ionViewWillEnter(): void {
    this.user = this.userService.getUser();
    this.face = this.faceService.getPerson();
    this.glasses = this.face.glasses;
  }

  /**
   * After the view is loaded we can fill in the data.
   */
  ionViewDidEnter(): void {
    this.buildDoughnutChart(this.face);
  }

  /**
   * Builds the Emotions-Doughnut Chart by filling the Chart Object with relevant data.
   * @param face The personal data to be analyzed.
   */
  private buildDoughnutChart(face: IFace): void {

    const emotionData: number[] = this.sortedEmotionsArray(face.emotion);

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        animation: {
          duration: 3000
        },
        legend: {
          position: 'bottom'
        }
      },
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

  private sortedEmotionsArray(emotion: IEmotion) {

    let emotionData: number[] = [];

    emotionData.push(emotion.sadness);
    emotionData.push(emotion.anger);
    emotionData.push(emotion.disgust);
    emotionData.push(emotion.fear);
    emotionData.push(emotion.contempt);
    emotionData.push(emotion.neutral);
    emotionData.push(emotion.surprise);
    emotionData.push(emotion.happiness);

    return emotionData;
  }
}