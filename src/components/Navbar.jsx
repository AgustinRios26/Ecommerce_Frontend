import React, { useContext, useState } from 'react'
import { FaBars, FaSearch, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { get } from '../api'
import { authContext } from '../context/Auth'
import { cartContext } from '../context/Cart'
import digitalMarket from '../resources/DigitalMarket.png'

export default function Navbar() {
    const {user,logged,setUser} = useContext(authContext)
    const {items} = useContext(cartContext)
    const navigate = useNavigate()
    const [open, setOpen]=useState(false)

    const logout = () =>{
        get("/api/auth/logout")
        .then(result=>{
            console.log(result)
            setUser({type:'LOGOUT'})
            navigate("/")
        })
    }

    return (
        <nav className=" mx-auto shadow-md w-full top-0 left-0 py-4 bg-white">
            <div className='container mx-auto flex items-center justify-between'>
            <Link to="/">
            <img className='max-w-[300px]' src={digitalMarket} alt="Digital Market"/>
            </Link>
            <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
            {open ? <FaTimes/> : <FaBars/>}
            </div>
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-50 left-0 w-full md:w-auto md:pl-0 transition-all duration-500 ease-in md:pr-5  ${open ? 'top-16 mt-4 bg-gray-50 md:bg-white opacity-100' : 'top-[-490px]'} opacity-100 `}>
                <li className='md:-ml-8 text-xl md:my-0 my-7 xl:mr-12'><div className='w-full max-w-xl relative flex ml-5'>
                <span className='absolute left-4 top-4 text-lg text-gray-400 '>
                    <FaSearch/>
                </span>
                <input type="text" placeholder='Buscar Producto...' className='w-full border border-[#FA4300] border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none focus:outline-transparent'/>
                <button className='bg-[#FA4300] border border-[#FA4300] text-white px-8 md:px-2 lg:px-8 rounded-r-md hover:bg-[#fa4300ae] hover:text-orange-700 transition duration-500' >Buscar</button>
            </div>
            </li>
            <li className='md:ml-8 text-xl md:my-0 my-7'>
            <div className='flex flex-col md:flex-row md:space-x-7 ml-4 pr-5'>
            {
                !logged?<>
                <Link to="/login" className='text-gray-700 hover:text-[#FA4300] transition relative text-xl mx-6 pb-6 md:pb-0 py-2 text-center' >Iniciar Sesion</Link>
                <Link to="/signup" className=' bg-[#525053] text-white hover:text-[#FA4300] hover:bg-gray-900 transition relative text-xl py-2 px-6 rounded-lg duration-500 md:self-center text-center'>Registrarse</Link>
                </>:
                <>
                <Link to="/cart" className='text-center text-gray-700 hover:text-[#FA4300] transition relative mx-2'>
                    <div className='text-2xl'>
                        <FaShoppingCart/>
                    </div>
                    <div className='text-xs leading-3 mt-1 -ml-2'>Carrito</div>
                </Link>
                <Link to="/profile" className='text-center text-gray-700 hover:text-[#FA4300] transition relative mx-2'>
                    <div className='text-2xl'>
                        <FaUser/>
                    </div>
                    <div className='text-xs leading-3 mt-1 -ml-1'>Cuenta</div>
                </Link>
                </>
            }
            </div>
            </li>
            </ul>
            </div>
        </nav>
    )
}