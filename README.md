# AngularDemoYc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 需求

1. 資料來源請使用 Open API。舉例:台北旅遊網 Open API https://www.travel.taipei/open-api
2. 網站需包含以下所有功能 (以呼叫台北旅遊網 遊憩景點 API 為例):

   1. 網頁 1-資料列表 (包含分頁)。 舉例:列出所有景點資訊,並可切換「上一頁」、「下一頁」
   2. 資料可篩選。 舉例:以下拉式選單切換不同分類編號(categoryIds),得到不同的景點資料列表
   3. 可勾選單筆或多筆資料,加入我的最愛 (資料儲存在 client 端,網頁重整後需保留)
   4. 網頁 2-我的最愛列表 (包含分頁),列出已加入我的最愛的景點清單
   5. 我的最愛-可單筆編輯後更新 client 端資料,欄位需包含至少一種驗證,通過驗證才
      可送出儲存。 舉例:景點名稱必填 / 電話不可輸入中文...等格式判斷
   6. 我的最愛-可勾選單筆或多筆資料,從我的最愛中移除後更新 client 端資料
   7. 網頁 1 與 2 需提供連結可互相切換

3. 需以 SCSS 切版 (可自行設計簡單樣式,或參考 UI 框架的樣式,勿直接套用 UI 框架)
4. 網站需隨寬度變化排版 (RWD)
