import { Routes } from '@angular/router';



export const routes: Routes = [
  { path: '', redirectTo: '/data-list', pathMatch: 'full' },
  { path: 'data-list', loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent) }, // 修正為正確的動態載入方式
  { path: 'favorites', loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent) }, // 修正為正確的動態載入方式
  { path: '**', redirectTo: '/data-list' } // 這行是處理未知路徑的情況，導向首頁
];
