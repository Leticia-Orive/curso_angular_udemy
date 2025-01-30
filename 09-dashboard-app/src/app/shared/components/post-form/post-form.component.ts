import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IPost } from '../../../models/post.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [
    DatePipe
  ],
})
export class PostFormComponent {

  private formBuilder = inject(FormBuilder)
  private datePipe = inject(DatePipe)

  @Input() post?: IPost;
  //Devolveremos un IPost, que luego cambiamos, void lo cambio por IPost
  @Output() submitForm: EventEmitter<IPost> = new EventEmitter<IPost>();


  public formPost: FormGroup = new FormGroup({})

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
