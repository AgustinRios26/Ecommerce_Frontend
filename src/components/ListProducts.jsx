import React, { useContext, useEffect, useState } from 'react'
import {FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom' 
import { get, post } from '../api'
import { cartContext } from '../context/Cart'

export default React.memo(function ListProducts() {
  const {setItems} = useContext(cartContext)
  const [products,setProducts] = useState([])
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);

    const getAllProducts = () => {
      get(`/api/products?page=${actualPage}&limit=${limit}`,{
      })
      .then((data)=>{
        setProducts(data.data)
        setTotalPages(data.totalPages)
      })
      .catch(error=>{
      })
    }

  useEffect(() => {
  getAllProducts();
  }, [actualPage, totalPages])

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
      <>

{products.map(product=>(
            <article className='w-full max-w-sm bg-white rounded-lg shadow-md mx-auto' key={product._id}><Link to={`/productos/${product._id}`}>
              <img className='p-8 rounded-t-lg max-h-[250px] m-auto' src={product.image[0]} alt={product.name} />
              <div className='border bg-gray-400 mx-5 mb-5'></div>
              <div className='px-5 pb-5'>
              <h3 className='text-xl font-semibold tracking-tight text-gray-900 pb-2'>{product.name}</h3>
              </div>
              </Link>
              <div className='px-5 pb-5'>
              <span className='text-lg font-bold text-gray-900'>$ {product.price}</span>
              <button className='mt-4 w-full max-w-[90%] mx-auto flex items-center justify-center text-white bg-[#FA4300] hover:bg-[#fa7500] focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm py-2.5 text-center' onClick={()=>{ addToCart(product._id)}}>Agregar <FaCartPlus className="ml-2 text-lg"/> </button>
              </div>
            </article>
          ))}
      </>
    )
})