import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FavoriteTableProps } from '../../shared/model';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private storageService = inject(StorageService);

  dataList = signal<FavoriteTableProps[]>([]);

  //#region 分頁
  itemsPerPage = signal<number>(10); // 每頁顯示的項目數
  currentPage = signal<number>(1);

  totalPages = computed(() =>
    Math.ceil(this.dataList().length / this.itemsPerPage())
  );

  paginatedData = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this.dataList().slice(startIndex, endIndex);
  });
  //#endregion

  ngOnInit(): void {
    this.dataList.set(this.storageService.getFavorite());
  }

  removeFavorite(item: FavoriteTableProps) {
    const newDataList = this.dataList().filter((i) => i !== item);
    this.storageService.setFavorite(newDataList);
    this.dataList.set(newDataList);
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
