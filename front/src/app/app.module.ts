import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarLandingComponent } from './components/nav-bar-landing/nav-bar-landing.component';
import { NavBarHomeComponent } from './components/nav-bar-home/nav-bar-home.component';
import { LoginComponent } from './pages/login/login.component';


import { CoreModule } from './core/core.module';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './pages/landing/landing.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { ThemeCardComponent } from './components/theme-card/theme-card.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { CreateThemeComponent } from './pages/create-theme/create-theme.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NavBarLandingComponent, NavBarHomeComponent, LoginComponent, RegisterComponent, ProfileComponent, LandingComponent, ArticleCardComponent, ThemeComponent, ThemeCardComponent, ArticleDetailsComponent, CreateArticleComponent, CreateThemeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    CoreModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
