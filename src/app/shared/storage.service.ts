import { Injectable } from '@angular/core';
import { FavoriteTableProps } from './model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setFavorite(data: FavoriteTableProps[]) {
    localStorage.setItem('yc-favorite', JSON.stringify(data));
  }

  getFavorite(): FavoriteTableProps[] {
    return JSON.parse(localStorage.getItem('yc-favorite') || '[]');
  }
}
