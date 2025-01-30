import { Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { IPost } from '../../../models/post.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { RouterLink } from '@angular/router';
import { WidgetComponent } from '../widget/widget.component';


@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, NgxEditorModule, RouterLink, WidgetComponent],
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
 

  ngOnInit(){
    this.formPost = this.formBuilder.group({
      _id: new FormControl(this.post?._id),
      title: new FormControl(this.post?.title ?? '', Validators.required),
      content: new FormControl(this.post?.content ?? '', Validators.required),
      publishedDate: new FormControl(this.post ? this.datePipe.transform(this.post.publishedDate, 'YYYY-MM-ddTHH:mm:ss') : ''),
      categories: new FormControl(this.post ? this.post.categories.map(category => category._id) : []),
      img: new FormControl(null)
    })
  }

  submit(){
    const post = this.formPost.value as IPost;
    this.submitForm.emit(post)
  }

  

 

}
