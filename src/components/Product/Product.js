import React from 'react'
import product1 from '../../assets/products/product1.svg'

const Product = ({product}) => {
  return (
    <div className='flex flex-col'>
      <a href='#'>
        <img
            src={product1.src}
            alt="product1"
            className="object-contain w-[200px] md:w-[350px]"
        />
        <div className='flex flex-col px-2'>
            <div className="text-xl font-black capitalize ">{product.title}</div>
            <div className="text-lg capitalize">{product.category}</div>
            <div className="text-lg font-bold">$ {product.price}</div>
        </div>
        </a>
    </div>
  )
}

export default Product