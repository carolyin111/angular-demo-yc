import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavoriteTableProps } from '../../shared/model';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private storageService = inject(StorageService);

  dataList = signal<FavoriteTableProps[]>([]);

  editingItem = signal<FavoriteTableProps | null>(null);
  editingItemEffect = effect(
    () => {
      this.editingMemo.set(this.editingItem()?.memo || '');
    },
    { allowSignalWrites: true }
  );

  editingMemo = signal<string>('');

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

  editFavorite(item: FavoriteTableProps) {
    this.editingItem.set({ ...item });
  }

  saveEdit() {
    const editMemo = this.editingMemo();
    if (editMemo.length > 10) {
      alert('不允許超過10字');
      return;
    }

    if (this.editingItem()) {
      const updatedList = this.dataList().map((item) =>
        item.name === this.editingItem()?.name
          ? { ...item, memo: this.editingMemo() }
          : item
      );
      this.dataList.set(updatedList);
      this.storageService.setFavorite(updatedList);
      this.closeModal();
    }
  }

  closeModal() {
    this.editingItem.set(null);

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
