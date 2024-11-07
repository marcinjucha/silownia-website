import { fetchProductList } from "@/features/product-list/actions/fetch-product-list"
import ProductList from "@/features/product-list/components/product-list"

export default async function PurchaseListPage() {
  const products = await fetchProductList()

  return (
    <div className="space-container">
      <ProductList products={products} />
    </div>
  )
}
