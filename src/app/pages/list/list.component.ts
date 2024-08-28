import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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

  progressEffect = effect(
    () => {
      this.filter();
    },
    { allowSignalWrites: true }
  );

  //#region 分頁
  itemsPerPage = signal<number>(10); // 每頁顯示的項目數
  currentPage = signal<number>(1);

  totalPages = computed(() =>
    Math.ceil(this.filterData().length / this.itemsPerPage())
  );

  paginatedData = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.filterData().slice(startIndex, endIndex);
  });
  //#endregion

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
    this.currentPage.set(1); // 重置到第一頁
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
