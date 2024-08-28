import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, map, tap } from 'rxjs';
import {
  FavoriteTableProps,
  MainTableProps,
  OpenAPIResponseModel,
  ProgressTypes,
} from '../../shared/model';
import { StorageService } from '../../shared/storage.service';

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

  ProgressTypes = ProgressTypes;

  dataList = signal<MainTableProps[]>([]);
  filterData = signal<MainTableProps[]>([]);

  progress = signal<string>('全部');

  isLoading = signal<boolean>(false);

  currentPage = signal<number>(1);
  // pageEffect = effect(
  //   () => {
  //    // TODO: 分頁
  //   },
  //   { allowSignalWrites: true }
  // );

  progressEffect = effect(
    () => {
      this.filter();
    },
    { allowSignalWrites: true }
  );

  ngOnInit(): void {
    this.isLoading.set(true);

    this.httpClient
      .get<OpenAPIResponseModel[]>(`/api/BigData/project`, {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      })
      .pipe(
        map((res) => {
          const favorite = this.storageService.getFavorite();
          return res.map((item) => ({
            ...item,
            isFavorite:
              favorite.findIndex(
                (favItem: FavoriteTableProps) =>
                  `${favItem.lng}${favItem.lat}` === `${item.lng}${item.lat}`
              ) === -1
                ? false
                : true,
          }));
        }),
        tap((res) => this.dataList.set(res)),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

  toggleFavorite(item: MainTableProps) {
    const isToggleToFavorite = !item.isFavorite;
    const favorite = this.storageService.getFavorite();
    const index = favorite.findIndex(
      (f: MainTableProps) => `${f.lng}${f.lat}` === `${item.lng}${item.lat}`
    );

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

  filter() {
    const progress = this.progress();

    const filterData = this.dataList().filter((item) => {
      return progress === '全部' || item.progress === progress;
    });
    this.filterData.set(filterData);
  }

  prevPage() {
    this.currentPage.set(this.currentPage() - 1);
  }

  nextPage() {
    this.currentPage.set(this.currentPage() + 1);
  }
}
