import { Component, effect, inject, Injector, signal, WritableSignal } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { RegistryService } from '../../services/registry.service';
import { IFilter } from '../../shared/filter/models/filter.model';
import moment from 'moment';
import { IRegistry } from '../../models/registry.model';

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss'
})
export class GraphicsComponent {

  private registryService = inject(RegistryService)
  private injector = inject(Injector)

  public chartBar!: Chart
  public emptyData: boolean = false;
  public filterSignal: WritableSignal<IFilter>= signal({
    category: '',
    dateStart: moment().startOf('year').format('YYYY-MM-DD'),
    dateEnd: moment().endOf('year').format('YYYY-MM-DD')
  })

  ngOnInit(){

    this.registryService.getRegistries(this.filterSignal())

    effect(() => {
      const registries = this.registryService.registriesSignal.asReadonly();
      this.emptyData = registries().length == 0;
      console.log(registries());
      
      if(!this.emptyData){
        setTimeout(() => {
          this.createChartBar(registries());
        });
      }
    }, { injector: this.injector })

  }


  createChartBar(registries: IRegistry[]){

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

