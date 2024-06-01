import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './layouts/dashboard/pages/users/users.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { AboutComponent } from './home/pages/about/about.component';
import { HelpComponent } from './home/pages/help/help.component';
import { AuthComponent } from './layouts/auth/auth.component';

const routes: Routes = [
  { 
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  { 
    path: 'home', loadChildren: () => import ('./home/home.module').then((m) => m.HomeModule)
  },
  { 
    path: 'auth', component: AuthComponent
  }, 
  {
    path: 'estudiantes',
    component: UsersComponent,
  },
  
  { path: 'Ingresantes', 
    component: ReactiveFormComponent,
  },
  { path: 'about', 
    component: AboutComponent 
  },
  { path: 'help', 
    component: HelpComponent
  },
  { path: 'carreras-cursos', loadChildren: () => import('./layouts/dashboard/pages/degree/degree.module').then(m => m.DegreeModule) }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }