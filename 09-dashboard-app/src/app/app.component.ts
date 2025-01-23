import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './state/auth/auth.state';
import { AsyncPipe, NgClass } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, SidebarComponent, NgClass], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store = inject(Store);
   // observable para comprobar si estamos autenticados
  public isAuthenticated$: Observable<boolean> = this.store.select(AuthState.isAuthenticated);
}
