import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './layouts/dashboard/pages/users/users.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { AboutComponent } from './home/pages/about/about.component';
import { HelpComponent } from './home/pages/help/help.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CarrerasCursosComponent } from './layouts/dashboard/pages/degree/carreras-cursos/carreras-cursos.component';
const routes: Routes = [
  { 
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  { 
    path: 'home', loadChildren: () => import ('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'auth', component: AuthComponent
  }, 
  {
    path: 'estudiantes',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carreras',
    component: CarrerasCursosComponent,
    canActivate: [AuthGuard]
  },
  { path: 'Ingresantes', 
    component: ReactiveFormComponent,
    canActivate: [AuthGuard]
  },
  { path: 'about', 
    component: AboutComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'help', 
    component: HelpComponent,
    canActivate: [AuthGuard]
  },
  { path: 'carreras-cursos', loadChildren: () => import('./layouts/dashboard/pages/degree/degree.module').then(m => m.DegreeModule),
    canActivate: [AuthGuard]
   }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }