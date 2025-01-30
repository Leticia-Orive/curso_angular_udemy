import { Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { IPost } from '../../../models/post.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { RouterLink } from '@angular/router';
import { WidgetComponent } from '../widget/widget.component';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, NgxEditorModule, RouterLink, WidgetComponent, SelectCategoryComponent, UploadImageComponent],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [
    DatePipe
  ],
  encapsulation: ViewEncapsulation.None
})
export class PostFormComponent {

  private formBuilder = inject(FormBuilder)
  private datePipe = inject(DatePipe)
  private toastrService = inject(ToastrService)
  

  @Input() post?: IPost;
  //Devolveremos un IPost, que luego cambiamos, void lo cambio por IPost
  @Output() submitForm: EventEmitter<IPost> = new EventEmitter<IPost>();


  public formPost: FormGroup = new FormGroup({})

  // Necesario para el ngx-editor
  public editor: Editor = new Editor();
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  // Ruta de la imagen del post
  public srcImage: string = '';

  

  ngOnInit(){
    this.formPost = this.formBuilder.group({
      _id: new FormControl(this.post?._id),
      title: new FormControl(this.post?.title ?? '', Validators.required),
      content: new FormControl(this.post?.content ?? '', Validators.required),
      publishedDate: new FormControl(this.post ? this.datePipe.transform(this.post.publishedDate, 'YYYY-MM-ddTHH:mm:ss') : null),
      categories: new FormControl(this.post ? this.post.categories.map(category => category._id) : []),
      img: new FormControl(null)
    })
    // Formamos la ruta del post
  if(this.post?.img){
    this.srcImage = `${environment.urlServerImages}${this.post.img}`;
  }
  }

  submit(){
    const post = this.formPost.value as IPost;
    console.log(post);
    this.submitForm.emit(post)
  }

  /**
   * Limpiamos la fecha
   */
  clearDate(){
    this.formPost.get('publishedDate')?.setValue(null)
  }

   /**
   * Guardamos la informacion de la imagen
   * @param file 
   */
   selectImage(file: File | null){
    this.formPost.get('img')?.setValue(file);
  }

  /**
   * Evento cuando hay un error al seleccionar una imagen
   */
  errorSelectImage(){
    this.toastrService.error(
      'Debes seleccionar una imagen con la extensión correcta',
      'Error'
    )
  }

  

 

}
