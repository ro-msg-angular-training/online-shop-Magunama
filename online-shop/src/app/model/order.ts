export interface Order {
  customer: string,
  products:({
    productId: number,
    quantity: number
  })[]
}
