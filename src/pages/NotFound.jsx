import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
    <div class="flex h-[calc(80vh-60px)] items-center justify-center p-5 bg-white w-full">
  <div class="text-center">
    <div class="inline-flex rounded-full bg-yellow-100 p-4">
      <div class="rounded-full stroke-yellow-600 bg-yellow-200 p-4">
        <svg class="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
    <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">404 - Página no encontrada</h1>
    <p class="text-slate-600 mt-5 lg:text-lg">La página que estás buscando no existe o <br />ha sido eliminada</p>
  </div>
</div>
  <div className='bg-white flex pb-5'><Link className="px-8 py-3 font-semibold rounded bg-[#FA4300] hover:bg-[#fa4300ae] text-white mx-auto" to="/">Volver al Inicio</Link>
  </div>
</div>
  )
}