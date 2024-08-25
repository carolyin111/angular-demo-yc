import { Component } from '@angular/core';
import { Attraction } from '../model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  dataList: Attraction[] = [];

  toggleFavorite(item: Attraction) {
    if (!item.isFavorite) {
      item.isFavorite = true;
    }
  }
}
