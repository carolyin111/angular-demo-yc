import { Component, OnInit, signal } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { mockdate } from '../mockdata';
import { Attraction } from '../model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  dataList = signal<Attraction[]>([]);

  ngOnInit(): void {
    of(mockdate)
      .pipe(
        map((data) => {
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            distric: item.distric,
            open_time: item.open_time,
            tel: item.tel,
            isFavorite: false,
          }));
        }),
        tap((res) => console.log(res)),
        tap((res) => this.dataList.set(res))
      )
      .subscribe();
  }

  toggleFavorite(item: Attraction) {
    if (!item.isFavorite) {
      item.isFavorite = true;
    }
  }
}
