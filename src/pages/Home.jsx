import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {Carousel} from 'flowbite-react'
import { cartContext } from '../context/Cart'
import imgBanner1 from '../resources/Banner1.png'
import imgBanner2 from '../resources/Banner2.png'
import imgBanner3 from '../resources/Banner3.png'
import imgBanner4 from '../resources/Banner4.png'
import ListProducts from '../components/ListProducts'

export default function Home() {
  const {setItems} = useContext(cartContext)

  return (
    <>
        <div className='container mx-auto'>
        <div className="container mx-auto h-56 sm:h-64 xl:h-96 2xl:h-[450px] max-w-[1400px] py-6 px-5">
  <Carousel slideInterval={5000}>
    <img src={imgBanner1} alt="Banner 1"/>
    <img src={imgBanner2} alt="Banner 2"/>
    <img src={imgBanner3} alt="Banner 3"/>
    <img src={imgBanner4} alt="Banner 4"/>
  </Carousel>
</div>
        <h3 className='text-center text-xl font-bold mb-4'>Productos Destacados</h3>
        <section className='grid grid-flow-row grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-2'>
          <ListProducts/>
        </section>
        <div className='py-5 text-center'><Link to="/productos" className='rounded-lg border border-gray-300 bg-white py-3 px-4 leading-tight text-gray-700 hover:bg-gray-100 hover:text-gray-900'>Ver mas</Link>
        </div>
        </div>
    </>
  )
}