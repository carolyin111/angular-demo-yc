export interface Attraction {
  /** 編號 */
  id: number;
  /** 標題 */
  name: string;
  /** 行政區 */
  distric: string;
  /** 開放時間 */
  open_time: string;
  /** 電話 */
  tel: string;
  /** 是否加入最愛 */
  isFavorite: boolean;
}

export interface Favorite {
  id: number;
  name: string;
  distric: string;
  open_time: string;
  tel: string;
  isFavorite: boolean;
  memo: string;
}
