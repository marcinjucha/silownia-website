"use client"

export function OrderSummary() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b ">
          <th className="py-2 text-left">Product</th>
          <th className="py-2 text-right">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b ">
          <td className="py-2">
            <div className="flex items-center gap-2">
              <div className="w-8  p-1 text-center">1</div>
              <span>Bangtao Brawl 2 (Fight Night)</span>
            </div>
          </td>
          <td className="py-2 text-right">฿800.00</td>
        </tr>
        <tr className="border-b ">
          <td className="py-2">Subtotal</td>
          <td className="py-2 text-right">฿800.00</td>
        </tr>
        <tr className="border-b ">
          <td className="py-2">VAT</td>
          <td className="py-2 text-right">฿56.00</td>
        </tr>
        <tr>
          <td className="py-2 font-bold">Total</td>
          <td className="py-2 text-right font-bold">฿856.00</td>
        </tr>
      </tbody>
    </table>
  )
}
