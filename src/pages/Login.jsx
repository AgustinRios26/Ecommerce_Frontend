import React, { useContext, useState } from 'react'
import { post } from '../api'
import Errors from '../components/Errors'
import {FaFacebook, FaGithub, FaGoogle, FaTwitter} from 'react-icons/fa'
import { authContext } from '../context/Auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const {setUser} = useContext(authContext)

    const navigate = useNavigate()

    const [errors,setErrors] = useState({
        isErrors:false,
        errors:[]
    })
     const [data,setData] = useState({
        email:"",
        password:""
    })

    const handleFormChange = (event)=>{
        const {name,value} = event.target
        setData({
            ...data,
            [name]:value
        })
    }

    const login = (event)=>{
        event.preventDefault()
        post("/api/auth/login",data).then(({user})=>{
            setUser({type:'LOGIN',payload:user}) 
            navigate("/")
        })
        .catch(error=>{
            setErrors({
                isErrors:true,
                errors:error.errors
            })
        })

    }

    return (
        <>
    <div className="items-center mx-auto w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 mt-8 shadow-2xl">
	<h3 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h3>
	<form onSubmit={login} className="space-y-6 ng-untouched ng-pristine ng-valid">
		<div className="space-y-1 text-sm">
			<label for="Correo" className="block text-gray-600 mb-2">Email</label>
			<input type="email" name="email" placeholder="Correo@email.com" value={data.email} onChange={handleFormChange} className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
		</div>
		<div className="space-y-1 text-sm">
			<label for="password" className="block text-gray-600">Contraseña</label>
			<input type="password" name="password" placeholder="••••••••" value={data.password} onChange={handleFormChange} className="w-full px-4 py-4 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
		</div>
		<button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-[#fa6000] hover:bg-[#FA4300] duration-200">Iniciar Sesión</button>
	</form>
	<div className="flex items-center pt-4 space-x-1">
		<div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
		<p className="px-3 text-sm text-gray-600">También puedes iniciar sesión con</p>
		<div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
	</div>
	<div className="flex justify-center space-x-4">
		<button aria-label="Log in with Google" className="p-3 rounded-sm text-2xl">
            <a href="https://ecommerce-agr.herokuapp.com/api/auth/google"> <FaGoogle/> </a> 
		</button>
		<button aria-label="Log in with Twitter" className="p-3 rounded-sm text-2xl">
            <a href="https://ecommerce-agr.herokuapp.com/api/auth/twitter"> <FaTwitter/> </a> 
		</button>
		<button aria-label="Login with Facebook" className="p-3 rounded-sm text-2xl">
                <a href="https://ecommerce-agr.herokuapp.com/api/auth/facebook"> <FaFacebook/> </a> 
		</button>
		<button aria-label="Login with GitHub" className="p-3 rounded-sm text-2xl">
                <a href="https://ecommerce-agr.herokuapp.com/api/auth/github"> <FaGithub/> </a> 
		</button>
	</div>
	<p className="text-xs text-center sm:px-6 text-gray-600">¿No tienes cuenta?  
		<Link to="/signup" className="underline text-gray-800 ml-2">Registrate aquí</Link>
	</p>
</div>
            <Errors errors={errors}/>
        </>
    )
}