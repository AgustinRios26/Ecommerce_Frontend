import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaCartPlus } from 'react-icons/fa';
import {useNavigate, useParams } from 'react-router-dom';
import { get, post } from '../api';
import { cartContext } from '../context/Cart';

export default function Product() {
  const {id} = useParams();
  const navigate = useNavigate()
  const [oneProduct, setOneProduct] = useState([]);
  const {setItems} = useContext(cartContext)


  useEffect(() => {
    get(`/api/products/${id}`,{
    })
    .then((data)=>{
       setOneProduct(data)
       console.log(oneProduct)
 
    })
    .catch(error=>{
      console.log(error)
    })
  }, []);

  const addToCart = (id) =>{
    post("/api/cart/add",{
      idProduct:id,
      amount:1
    }).then(data=>{
      console.log(data)
      setItems({
        type:"UPDATE",
        payload:data.items
      })

    })
  }


  return (
    <div className="max-w-[1800px] mx-auto" >
    <div className="min-w-screen min-h-screen bg-amber-200 flex items-center p-5 lg:p-10 overflow-hidden relative">
    <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
    <button onClick={() => navigate(-1)} className='mb-5 flex w-max-[150px] justify-center px-4 py-3 bg-[#525053] hover:bg-gray-900 text-center text-lg text-white rounded duration-300'><FaArrowLeft className="mt-1 mr-5 text-xl"/>Volver</button>
        <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                    <img className='w-full relative z-10' src={oneProduct.image} alt={oneProduct.name} />
                    <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                    <h2 className="font-bold uppercase text-2xl mb-5">{oneProduct.name}</h2>
                    <p className="text-sm first-letter:uppercase">{oneProduct.description} Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis...</p>
                </div>
                <div>
                    <div className="inline-block align-bottom mr-8">
                        <span className="text-4xl leading-none align-baseline">$ </span>
                        <span className="font-bold text-5xl leading-none align-baseline">{oneProduct.price}</span>
                    </div>
                    <div className="inline-block align-bottom">
                        <button className='mt-4 w-full mx-auto flex items-center px-10 justify-center text-white bg-[#FA4300] hover:bg-[#fa7500] focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm py-2.5 text-center' onClick={()=>{ addToCart(oneProduct._id)}}>Agregar <FaCartPlus className="ml-2 text-lg"/> </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}
