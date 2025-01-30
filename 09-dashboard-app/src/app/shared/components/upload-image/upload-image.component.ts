import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() srcImage: string | ArrayBuffer | null | undefined = null;

  @Output() selectImage = new EventEmitter<File | null>();
  @Output() errorSelectImage = new EventEmitter<void>();

  private extensionsAllowed = ['image/jpeg', 'image/png'];

 
  fileSelected(){
    // Obtenemos el input file
    const input = this.fileInput.nativeElement;

    if(input.files && input.files[0]){
      const file = input.files[0];

      // sino incluye la extension, emitimos un error
      if(!this.extensionsAllowed.includes(file.type)){
        this.selectImage.emit(null);
        this.errorSelectImage.emit();
        this.srcImage = null;
       
      }else{

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.srcImage = e.target?.result; // actualizamos la previsualizacion
          this.selectImage.emit(file);
        }

        reader.readAsDataURL(file);

      }


    }

  }

}
