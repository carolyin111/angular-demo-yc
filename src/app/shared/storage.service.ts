import { Injectable } from '@angular/core';
import { Favorite } from '../pages/model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setFavorite(data: Favorite[]) {
    localStorage.setItem('yc-favorite', JSON.stringify(data));
  }

  getFavorite(): Favorite[] {
    return JSON.parse(localStorage.getItem('yc-favorite') || '[]');
  }
}
