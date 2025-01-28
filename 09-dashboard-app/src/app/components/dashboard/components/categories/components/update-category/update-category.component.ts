import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update-category',
  imports: [],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {

  @Input() id!: string;


  ngOnInit(){
    console.log(this.id);
  }

}
