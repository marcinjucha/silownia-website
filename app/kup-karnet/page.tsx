import { fetchProductList } from "@/app/kup-karnet/_action/fetch-product-list"
import ProductList from "@/app/kup-karnet/_components/product-list"

export default async function PurchaseListPage() {
  const products = await fetchProductList()

  return (
    <div className="space-container">
      <ProductList products={products} />
    </div>
  )
}
