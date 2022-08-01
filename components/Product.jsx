import Link from 'next/link'
import {urlFor} from '../lib/client'

function Product({product: {image, name, slug, price}}) {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img src={urlFor(image && image[0])} width="250px" height={'250px'} className="product-image" alt="" />
          <p className="product-name">{name}</p>
          <p className="product-price">R{price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product