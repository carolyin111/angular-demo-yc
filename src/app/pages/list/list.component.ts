import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, of, tap } from 'rxjs';
import { mockdate } from '../mockdata';
import { Attraction } from '../model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  dataList = signal<Attraction[]>([]);

  categoryIds = signal<string>('');

  ngOnInit(): void {}

  toggleFavorite(item: Attraction) {
    if (!item.isFavorite) {
      item.isFavorite = true;
    }
  }

  search() {
    console.log(this.categoryIds());

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
        tap((res) => this.dataList.set(res))
      )
      .subscribe();
  }
}
