import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import clsx from 'clsx'

const ProductModal = ({show, setShow, product}) => {
  return (
    <div className='w-[100vw] h-[100vh] transition-all overflow-y-hidden fixed top-0 left-0 z-[100] bg-[#00000195] backdrop-blur-sm flex flex-row justify-center items-center'>
        <div id="product-modal" className='w-[50vw] h-[60vh] bg-white mx-auto my-auto p-5 slide-in-top fixed flex flex-row'>
        
            <div className={"text-3xl hover:opacity-80 transition-all cursor-pointer"} 
                onClick={()=>{
                  if(typeof document !==undefined){
                    const doc = document.getElementById('product-modal')
                    doc.classList.remove('slide-in-top')
                    doc.classList.add('slide-out-bottom')
                    setTimeout(()=>{setShow(false)},500)
                    // setShow(false)
                  }
                }}
            >
            <AiOutlineClose />
                
            </div>
            <div className='flex flex-row mt-10 w-full gap-x-5'>
                <div className='max-w-[15vw] object-fit max-h-[90%] '>
                    <img src={product.image} />
                </div>
                <div className='flex flex-col w-full mt-5'>
                    <div className='flex flex-row justify-between items-center w-[100%] flex-wrap'>
                        <div className='text-3xl font-bold basis-[60%]'>
                            {product.title}
                        </div>
                        <div className='text-3xl'>
                            $ {product.price}
                        </div>
                    </div>
                    <div className='text-xl mt-2 text-[#00000060] flex flex-row flex-wrap'>
                        {product.category}
                    </div>
                    <div className='text-l mt-4 flex flex-row flex-wrap'>
                        {product.description}
                    </div>
                    <div className='flex flex-row justify-center items-center w-[100%] gap-10'>
                        <div>
                            <button className='text-[#ffffff] bg-[#323232] text-xs mt-5 px-14 py-2 border-2 border-black hover:text-[#323232] hover:bg-[#ffffff] hover:border-black-500'>Buy Now</button>
                        </div>
                        <div>
                            <button className='text-[#323232] bg-[#ffffff] text-xs mt-5 px-12 py-2 border-2 border-black border-opacity-100'>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default ProductModal