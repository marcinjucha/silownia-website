import { fetchProducts } from "@/app/purchase/_action/fetch-products"
import ProductList from "@/app/purchase/_components/product-list"

export default async function PurchaseListPage() {
  console.log(process.env.TOKEN, process.env.CMS_URL)
  const products = await fetchProducts()

  return <ProductList />
}
