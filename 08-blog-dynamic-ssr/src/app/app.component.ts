import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  private meta = inject(Meta)

  ngOnInit(){

    this.meta.addTags([
      {
        name: 'description',
        content: 'Disco duro de roer es una web donde encontrarás tutoriales y ejercicios sobre informática, centrándose sobre todo en programación, para aprender más.'
      },
      {
        name: 'keywords',
        content: 'disco duro de roer,programacion,tutoriales,aprender,programar,aprender a programar,informatica'
      }
    ])

  }




}