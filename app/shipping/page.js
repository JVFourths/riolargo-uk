export const metadata = {
  title: 'Shipping & Returns | Rio Largo',
}

export default function ShippingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-olive-900 mb-8">Shipping & Returns</h1>

      <div className="space-y-10 text-olive-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-olive-900 mb-4">Delivery</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Orders are dispatched within 1-2 working days of payment</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> We ship via Royal Mail Tracked across the UK</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Delivery typically takes 2-3 working days after dispatch</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Free delivery on all orders over £40</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Standard shipping: £4.95 on orders under £40</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> You will receive a tracking number by email once dispatched</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-olive-900 mb-4">Returns</h2>
          <p className="text-sm mb-3">We want you to love your Rio Largo. If for any reason you are not satisfied:</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Contact us within 14 days of receiving your order</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> Unopened items can be returned for a full refund</li>
            <li className="flex gap-3"><span className="text-green-500 font-bold">✓</span> If your order arrives damaged, email us a photo and we will replace it immediately</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-olive-900 mb-4">Contact</h2>
          <p className="text-sm">For any questions about your order, email us at <a href="mailto:orders@riolargo.co.uk" className="text-olive-700 underline font-medium">orders@riolargo.co.uk</a> and we will get back to you within one working day.</p>
        </section>
      </div>
    </div>
  )
}
