import { Pagination } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { get, post } from '../api'
import { cartContext } from '../context/Cart'

export default function Products() {
  const {setItems} = useContext(cartContext)
  const [products,setProducts] = useState([])
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const previousPage = () => {
    return actualPage > 1 ? setActualPage(actualPage - 1) : null;
  };

  const nextPage = () =>{ 
    return actualPage < totalPages ? setActualPage(actualPage + 1): null};

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
      })}

    let itemSelected = (e) => {
      let actualPage1 = e
      return setActualPage(actualPage1)
    }

  return (
    <div>
      <h3 className='text-center mt-4 text-2xl font-bold'>Productos</h3>
    <section className='grid grid-flow-row grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-2 mt-5'>
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
        </section>
        <div className='flex justify-around pb-6 mt-5 sm:hidden' >
            <button onClick={previousPage} className={`flex px-7 py-3 bg-[#525053] text-white font-medium text-sm rounded shadow-md hover:bg-gray-900 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}>
						<FaArrowLeft className="mr-7 text-xl " />Anterior</button>
        <button	onClick={nextPage}	className="flex px-7 py-3 bg-[#525053] text-white font-medium text-sm rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"	>
						Siguiente	<FaArrowRight className="ml-7 text-xl " /></button>
      </div>
      <h4 className='text-center text-xs sm:mt-6'>Pagina {actualPage} de {totalPages}</h4>
      <div className="py-3 items-center justify-center text-center hidden sm:block" >
        <Pagination
        currentPage={actualPage}
        totalPages={totalPages}
        onPageChange={itemSelected}
        previousLabel=" Anterior"
        nextLabel="Siguiente "
        
       
/>
</div>
        </div>
  )
}
