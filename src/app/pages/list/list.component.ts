import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, of, tap } from 'rxjs';
import { StorageService } from '../../shared/storage.service';
import { mockdate } from '../mockdata';
import { Attraction, Favorite } from '../model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private storageService = inject(StorageService);
  private httpClient = inject(HttpClient);

  dataList = signal<Attraction[]>([]);

  categoryIds = signal<string>('');

  ngOnInit(): void {}

  toggleFavorite(item: Attraction) {
    const isToggleToFavorite = !item.isFavorite;
    const favorite = this.storageService.getFavorite();
    const index = favorite.findIndex((f: Favorite) => f.id === item.id);

    if (isToggleToFavorite) {
      if (index === -1) {
        favorite.push({
          ...item,
          isFavorite: true,
          memo: '',
        });
      }
    } else {
      if (index !== -1) {
        favorite.splice(index, 1);
      }
    }

    this.storageService.setFavorite(favorite);

    item.isFavorite = isToggleToFavorite;
  }

  search() {
    console.log(this.categoryIds());

    of(mockdate)
      .pipe(
        map((data) => {
          const favorite = this.storageService.getFavorite();
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            distric: item.distric,
            open_time: item.open_time,
            tel: item.tel,
            isFavorite:
              favorite.findIndex((item: Favorite) => item.id === item.id) === -1
                ? false
                : true,
          }));
        }),
        tap((res) => this.dataList.set(res))
      )
      .subscribe();
  }
}
