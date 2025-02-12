import { Component, effect, inject, Injector, signal, WritableSignal } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { RegistryService } from '../../services/registry.service';
import { IFilter } from '../../shared/filter/models/filter.model';
import moment from 'moment';
import 'moment/locale/es';
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

    const registriesMonths = registries.reduce( (acc, registry) => {
      const month = moment(registry.date).format('MMMM').toLowerCase()
      if(!acc[month]){
        acc[month] = [];
      }
      acc[month].push(registry);
      return acc;
    }, {} as any)

    console.log(registriesMonths);

    const dataDeposit: number[] = [];
    const dataExpense: number[] = [];
    const dataDifference: number[] = [];

    const monthNames: string[] = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre"
    ]

    for (const month of monthNames) {
      if(registriesMonths[month]){
        const deposit = registriesMonths[month].reduce( (acc: number, registry: IRegistry) => {
          if(registry.type == 'deposit'){
            return acc + registry.quantity
          }
          return acc;
        }, 0);
        const expense = registriesMonths[month].reduce( (acc: number, registry: IRegistry) => {
          if(registry.type == 'expense'){
            return acc + registry.quantity
          }
          return acc;
        }, 0);
        dataDeposit.push(deposit);
        dataExpense.push(expense);
        dataDifference.push(deposit - expense)
      }else{
        dataDeposit.push(0);
        dataExpense.push(0);
        dataDifference.push(0);
      }
    }
    
    console.log("Ingresos: ", dataDeposit);
    console.log("Gastos: ", dataExpense);
    console.log("Diferencia: ", dataDifference);
    
    
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
