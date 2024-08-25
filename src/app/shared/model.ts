export interface OpenAPIResponseModel {
  /** 社會住宅名稱 */
  name: string;
  /** 區域 */
  distict: string;
  /** 地址 */
  address: string;
  /** 緯度 */
  lat: string;
  /** 經度 */
  lng: string;
  /** 規劃戶數 */
  houseHolds: string;
  /** 居住人口 */
  persons: string;
  /** 樓層數 */
  floors: string;
  /** 興建進度 */
  progress: string;
}

export type MainTableProps = Pick<
  OpenAPIResponseModel,
  'name' | 'distict' | 'address' | 'houseHolds' | 'progress' | 'lat' | 'lng'
> & {
  /** 是否加入最愛 */
  isFavorite: boolean;
};

export interface FavoriteTableProps extends MainTableProps {
  memo: string;
}
