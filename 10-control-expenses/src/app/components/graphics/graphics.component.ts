import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
@Component({
  selector: 'app-graphics',
  imports: [],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent {
  public chartBar!: Chart

  ngOnInit(){
    this.createChartBar();
  }


  createChartBar(){

    this.chartBar = new Chart("chartBar", {
      type: 'bar' as ChartType,
      data: {
        datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40]
        }, {
            type: 'line',
            label: 'Line Dataset',
            data: [15, 25, 15, 35],
        }],
        labels: ['January', 'February', 'March', 'April']
      }
    })


  }

}
