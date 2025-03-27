export interface ResPagination<T> {
  meta: Meta,
  data: T[]
}

export interface Meta {
  // Trang hiện tại
  page: number,
  // Số phần tu trên mỗi trang
  pageSize: number,
  // Tổng số trang
  pages: number,
  // Tổng so phần tử
  total: number
}
