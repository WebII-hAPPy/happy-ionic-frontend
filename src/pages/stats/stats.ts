import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import Chart from "chart.js";
import {
    AlertController,
    IonicPage,
    NavController,
    NavParams,
    Platform,
    ToastController
} from "ionic-angular";
import { IChartData } from "../../models/chartData";
import { IDataPoint } from "../../models/dataPoint";
import { IUser } from "../../models/user";
import { Api, User, Utils } from "../../providers";
import { BackButtonOverwrite } from "../../providers/backButton/backButton";

@IonicPage()
@Component({
    selector: "page-stats",
    templateUrl: "stats.html"
})
export class StatsPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private api: Api,
        private user: User,
        private storage: Storage,
        private utils: Utils,
        private platform: Platform,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {
        this.exitCounter = 0;
        const overwrite: BackButtonOverwrite = new BackButtonOverwrite(
            this.alertCtrl,
            this.platform,
            this.navCtrl,
            this.toastCtrl
        );
        overwrite.overwriteBackButtonToast();
    }

    public chart: Chart;
    public scaleLabel = [];
    private noDataFlag: boolean = true;
    exitCounter: number;

    /**
     * Reset the data before the view loads.
     */
    ionViewWillEnter() {
        this.clearLineChartData();
        this.scaleLabel = [];
        this.noDataFlag = true;
        this.setView(true, true, true, true, true);
    }

    /**
     * When the view enters the chart is build.
     */
    ionViewDidEnter() {
        this.storage.get("jwt_token").then(jwt_token => {
            const user: IUser = this.user.getUser();
            this.api
                .get("api/statistics/" + user.id, null, {
                    headers: { authorization: jwt_token }
                })
                .subscribe(
                    (resp: any) => {
                        let i: number = 0;
                        if (resp.data.length > 0) {
                            this.noDataFlag = false;
                            resp.data.forEach(data => {
                                i++;
                                this.scaleLabel.push(i);
                                this.addDataPointToChart(data);
                            });
                        } else {
                            this.noDataFlag = true;
                            this.setView(true, true, true, false, false);
                        }
                    },
                    err => {
                        this.noDataFlag = true;
                        this.setView(true, true, true, false, false);
                        console.error(err);
                    },
                    () => {
                        if (this.noDataFlag === false) {
                            this.options.data.datasets = this.lineChartData;
                            this.options.data.labels = this.scaleLabel;
                            const canvas: any = document.getElementById(
                                "chartCanvas"
                            );
                            this.chart = new Chart(
                                canvas.getContext("2d"),
                                this.options
                            );
                            this.setView(false, false, false, true, true);
                        } else {
                            this.setView(true, true, true, false, false);
                        }
                    }
                );
        });
    }

    /**
     * Deletes the history of the current user.
     */
    public deleteHistory(): void {
        this.storage.get("jwt_token").then(jwt_token => {
            const user: IUser = this.user.getUser();
            this.api
                .delete("api/statistics/" + user.id, {
                    headers: { authorization: jwt_token }
                })
                .subscribe(
                    resp => {
                        this.utils.presentToast("We deleted your history.");
                        this.clearLineChartData();
                        this.chart.destroy();
                        this.navCtrl.parent.select(0);
                    },
                    err => {
                        console.error(err);
                    }
                );
        });
    }

    /**
     * Set view by hiding parts of the html template
     * @param deleteHistoryButton true to hide | false to show
     * @param graphCard true to hide | false to show
     * @param introductionCard true to hide | false to show
     * @param noDataIntroductionCard true to hide | false to show
     * @param noGraphCard true to hide | false to show
     */
    private setView(
        deleteHistoryButton: boolean,
        graphCard: boolean,
        introductionCard: boolean,
        noDataIntroductionCard: boolean,
        noGraphCard: boolean
    ) {
        document.getElementById(
            "deleteHistoryButton"
        ).hidden = deleteHistoryButton;
        document.getElementById("graphCard").hidden = graphCard;
        document.getElementById("introductionCard").hidden = introductionCard;
        document.getElementById(
            "noDataIntroductionCard"
        ).hidden = noDataIntroductionCard;
        document.getElementById("noGraphCard").hidden = noGraphCard;
    }

    /**
     * Clears the line chart data.
     */
    private clearLineChartData(): void {
        this.lineChartData.forEach(emotion => {
            emotion.data = [];
        });
    }

    /**
     * Defines the data for the line chart and its colors.
     */
    private lineChartData: Array<IChartData> = [
        {
            data: [],
            label: "sadness",
            backgroundColor: "rgba(33,150,243,0.2)",
            borderColor: "rgba(33,150,243,1)",
            pointBackgroundColor: "rgba(33,150,243,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(33,150,243,0.8)"
        },
        {
            data: [],
            label: "anger",
            backgroundColor: "rgba(229,57,53,0.2)",
            borderColor: "rgba(229,57,53,1)",
            pointBackgroundColor: "rgba(229,57,53,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(229,57,53,1)"
        },
        {
            data: [],
            label: "disgust",
            backgroundColor: "rgba(76,175,80,0.2)",
            borderColor: "rgba(76,175,80,1)",
            pointBackgroundColor: "rgba(76,175,80,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(76,175,80,0.8)"
        },
        {
            data: [],
            label: "fear",
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "rgba(0,0,0,1)",
            pointBackgroundColor: "rgba(0,0,0,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0,0,0,0.8)"
        },
        {
            data: [],
            label: "contempt",
            backgroundColor: "rgba(121,85,72,0.2)",
            borderColor: "rgba(121,85,72,1)",
            pointBackgroundColor: "rgba(121,85,72,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(121,85,72,0.8)"
        },
        {
            data: [],
            label: "neutral",
            backgroundColor: "rgba(158,158,158,0.2)",
            borderColor: "rgba(158,158,158,1)",
            pointBackgroundColor: "rgba(158,158,158,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(158,158,158,0.8)"
        },
        {
            data: [],
            label: "surprise",
            backgroundColor: "rgba(255,87,34,0.2)",
            borderColor: "rgba(255,87,34,1)",
            pointBackgroundColor: "rgba(255,87,34,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,87,34,0.8)"
        },
        {
            data: [],
            label: "happiness",
            backgroundColor: "rgba(255,193,7,0.2)",
            borderColor: "rgba(255,193,7,1)",
            pointBackgroundColor: "rgba(255,193,7, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,193,7,0.8)"
        }
    ];

    /**
     * Adds a datapoint to the chart by mapping the values of the datapoint to each graph.
     * @param dataPoint An object containing all emotions as key value pairs.
     */
    private addDataPointToChart(dataPoint: IDataPoint): void {
        this.lineChartData.forEach(emotion => {
            for (let key in dataPoint.emotions) {
                if (
                    key === emotion.label &&
                    dataPoint.emotions.hasOwnProperty(key)
                ) {
                    emotion.data.push(
                        Math.trunc(dataPoint.emotions[key] * 100)
                    );
                }
            }
        });
    }
    /**
     * Defines the options of the chart.
     */
    private options = {
        type: "line",
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
                mode: "index",
                intersect: false
            },
            hover: {
                mode: "nearest",
                intersect: true
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            label: "->",
                            display: false
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: false
                        }
                    }
                ]
            }
        }
    };
}
