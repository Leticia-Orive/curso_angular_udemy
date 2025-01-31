import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPage } from '../../../../models/page.model';
import { IPost } from '../../../../models/post.model';
import { PostsState } from '../../../../state/posts/posts.state';
import { TableDataComponent } from '../../../../shared/components/table-data/table-data.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { GetPostsAction, UpdatePostAction } from '../../../../state/posts/posts.actions';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IColumn } from '../../../../shared/components/table-data/models/column.model';
import { IAction, IActionSelected } from '../../../../shared/components/table-data/models/action.model';
import { TAction } from '../../../../types';
import { ToastrService } from 'ngx-toastr';
import { TSort } from '../../../../shared/components/table-data/types/sort.type';
import { IModal } from '../../../../shared/components/modal/models/modal.model';
import { ModalService } from '../../../../shared/components/modal/services/modal.service';
import moment from 'moment';


@Component({
  selector: 'app-posts',
  imports: [TableDataComponent, AsyncPipe, RouterLink, DatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [
    ModalService
  ]
})
export class PostsComponent {

  private store = inject(Store)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private toastrService = inject(ToastrService)
  private modalService = inject(ModalService)


  // Paginacion de posts
  public pagination$: Observable<IPage<IPost> | null> = this.store.select(PostsState.pagination)

  // parametros de busquedas
  private sortBy = 'publishedDate'
  private sort?: TSort = 'DESC'
  private page = 1;
  private searchText = '';

   // Columnas
   public columns: IColumn[] = [
    {
      display: 'Titulo',
      property: 'title',
      canSort: true
    },
    {
      display: 'Fecha publicación',
      property: 'publishedDate',
      sort: 'DESC',
      canSort: true
    },
    {
      display: 'Categorías',
      property: 'categories',
      canSort: false
    }
  ]
   // Acciones disponibles
   public actionsAvailables: IAction<TAction>[] = [
    {
      name: 'publish',
      display: 'Publicar'
    },
    {
      name: 'unpublish',
      display: 'Despublicar'
    },
    {
      name: 'delete',
      display: 'Borrar'
    }
  ]


  ngOnInit(){
    this.getPosts()
  }
  /**
   * Obtenemos los posts paginados
   */
  getPosts(){
    this.store.dispatch(new GetPostsAction({
      page: this.page,
      q: this.searchText,
      sort: this.sort,
      sortBy: this.sortBy
    }))
  }

  /**
   * Cambiamos de pagina
   * @param page 
   */
  changePage(page: number){
    this.page = page;
    this.getPosts()
  }

  /**
   * Modificamos la ordenación de la columna
   * @param column 
   */
  sortData(column: IColumn){
    this.sort = column.sort;
    this.sortBy = column.property
    this.getPosts();
  }

  selectAction(selectedAction: IActionSelected<IPost, TAction>){
    console.log(selectedAction);

    switch(selectedAction.action){
      case 'delete':
        
        break;
      case 'publish':
        const modalPublish: IModal = {
          content: '¿Estas seguro de querer publicar estas entradas?'
        }

        this.modalService.open(modalPublish).subscribe({
          next: () => {
            this.publishPosts(selectedAction.items)
          }
        })
        break;
      case 'unpublish':
        const modalUnpublish: IModal = {
          content: '¿Estas seguro de querer despublicar estas entradas?'
        }

        this.modalService.open(modalUnpublish).subscribe({
          next: () => {
            this.unpublishPosts(selectedAction.items)
          }
        })
        
        break;
    }

  }
  /**
   * Publica los posts
   * @param posts 
   */
  private publishPosts(posts: IPost[]){

    const actions: UpdatePostAction[] = []
    for (const post of posts) {
      // Solo sino esta publicado
      if(!post.publishedDate){
        post.publishedDate = moment().toISOString()
        actions.push(new UpdatePostAction({ post }))
      }
    }

    // Solo si hay alguna acción a realizar
    if(actions.length > 0){
      this.store.dispatch(actions).subscribe({
        next: () => {
          this.toastrService.success(
            'Entradas publicadas',
            'Éxito'
          )
          this.getPosts();
        }, error: () => {
          this.toastrService.error(
            'Ha habido un error al publicar las entradas',
            'Error'
          )
        }
      })
    }else{
      this.toastrService.error(
        'No hay entradas para publicar',
        'Error'
      )
    }

  }
  /**
   * Despublica los posts
   * @param posts 
   */
  private unpublishPosts(posts: IPost[]){

    const actions: UpdatePostAction[] = []
    for (const post of posts) {
      // Solo si esta publicado
      if(post.publishedDate){
        post.publishedDate = null
        actions.push(new UpdatePostAction({ post }))
      }
    }

    // Solo si hay alguna acción a realizar
    if(actions.length > 0){
      this.store.dispatch(actions).subscribe({
        next: () => {
          this.toastrService.success(
            'Entradas despublicadas',
            'Éxito'
          )
          this.getPosts();
        }, error: () => {
          this.toastrService.error(
            'Ha habido un error al despublicar las entradas',
            'Error'
          )
        }
      })
    }else{
      this.toastrService.error(
        'No hay entradas para despublicar',
        'Error'
      )
    }

  }


   /**
   * Modifica el texto a buscar
   * @param text 
   */
   searchByTitle(search: string){
    this.searchText = search;
    this.getPosts();
  }

  /**
   * Redirigimos a actualizar el post
   * @param category 
   */
  goToUpdate(post: IPost){
    this.router.navigate(['update', post._id], { relativeTo: this.route })
  }

  /**
   * Evento al no seleccionar elementos
   */
  noItemsSelected(){
    this.toastrService.error(
      'Debes seleccionar entradas',
      'Error'
    )
  }


}
