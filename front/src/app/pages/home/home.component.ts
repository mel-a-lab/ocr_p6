import { Component, HostListener, OnInit } from '@angular/core';
import { ArticleResponseDTO } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  sortOptions = ['newst','oldest'];
  selectedSort = 'newst';
  // Sample data for articles
  ngOnInit(): void {

  }
}
