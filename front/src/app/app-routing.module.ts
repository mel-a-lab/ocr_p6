import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { CreateThemeComponent } from './pages/create-theme/create-theme.component';
import { ProfileComponent } from './pages/profile/profile.component';



// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch : 'full',canActivate: [AuthGuard]},
  {path : 'landing', component: LandingComponent, pathMatch : 'full'},
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path : 'themes',
    component : ThemeComponent,
    pathMatch : 'full',
    canActivate: [AuthGuard]
  },{
    path : 'article/:id',
    component : ArticleDetailsComponent,
    pathMatch : 'full',
    canActivate: [AuthGuard]
  },{
    path : 'create',
    component : CreateArticleComponent,
    pathMatch : 'full',
    canActivate: [AuthGuard]
  },
  {
    path : 'createTheme',
    component : CreateThemeComponent,
    pathMatch : 'full',
    canActivate: [AuthGuard]
  },{
    path : 'profile',
    component : ProfileComponent,
    pathMatch : 'full',
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
